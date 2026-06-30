@echo off
:: =====================================================================
:: IDF Digital Signage - Windows Kiosk Launcher (production)
:: =====================================================================
:: Runs the whole signage as a SINGLE process: the Express server serves
:: both the compiled React app and the API on http://localhost:4100, then
:: Chrome (or Edge) is opened in a hardened full-screen kiosk window.
::
:: A watchdog keeps both the server and the browser alive - if either one
:: dies (crash, accidental close, power blip) it is relaunched automatically.
::
:: To start automatically on boot, run setup-autostart.ps1 once
:: (right-click -> Run with PowerShell) to register a Task Scheduler task.
:: =====================================================================

setlocal enabledelayedexpansion
title IDF Digital Signage Launcher

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

set "PORT=4100"
set "URL=http://localhost:%PORT%"
set "KIOSK_PROFILE=%TEMP%\signage-kiosk"

echo =====================================================================
echo          IDF Digital Signage - Launching System (Windows)
echo =====================================================================
echo.

:: --- Node.js check ---------------------------------------------------
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Install it from https://nodejs.org
    pause
    exit /b 1
)

:: --- Free the port ---------------------------------------------------
echo [1/5] Clearing port %PORT% if occupied...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT% ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

:: --- Dependencies ----------------------------------------------------
if not exist "node_modules\" (
    echo [2/5] Installing dependencies. This might take a minute...
    call npm install --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed! Check your internet connection.
        pause
        exit /b 2
    )
) else (
    echo [2/5] Dependencies already installed. Skipping...
)

:: --- Seed local Excel fallback --------------------------------------
if not exist "server\updates.xlsx" (
    echo [3/5] Generating updates.xlsx sample template...
    call npm run seed
)

:: --- Production build ------------------------------------------------
if not exist "dist\index.html" (
    echo [4/5] Building production app. This might take a minute...
    call npm run build
    if %errorlevel% neq 0 (
        echo [ERROR] Build failed! See the messages above.
        pause
        exit /b 3
    )
) else (
    echo [4/5] Production build found. Skipping build...
)

:: --- Start the server watchdog (separate, auto-restarting window) -----
echo [5/5] Starting signage server (auto-restart watchdog)...
start "Signage Server" /min cmd /c "cd /d \"%PROJECT_DIR%\" & :loop & node --env-file-if-exists=.env server\server.js & echo Server stopped - restarting in 3s... & timeout /t 3 /nobreak >nul & goto loop"

:: --- Wait until the server answers on /api/health -------------------
echo Waiting for server to become healthy...
set /a tries=0
:waithealth
set /a tries+=1
powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 '%URL%/api/health') ^| Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 goto healthy
if %tries% geq 30 (
    echo [WARN] Server did not report healthy in time - opening anyway...
    goto healthy
)
timeout /t 1 /nobreak >nul
goto waithealth
:healthy
echo Server is up at %URL%

:: --- Locate a Chromium browser --------------------------------------
set "BROWSER="
set "BROWSER_KIND="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
    set "BROWSER_KIND=chrome"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
    set "BROWSER_KIND=chrome"
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
    set "BROWSER_KIND=edge"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
    set "BROWSER_KIND=edge"
)

if "%BROWSER%"=="" (
    echo [TIP] No Chrome/Edge found. Opening default browser - press F11 for full screen.
    start "" "%URL%"
    echo System active. Keep this window open.
    pause
    exit /b 0
)

:: Hardening flags shared by Chrome and Edge (both Chromium based)
set "FLAGS=--kiosk %URL% --user-data-dir=\"%KIOSK_PROFILE%\" --no-first-run --no-default-browser-check --disable-session-crashed-bubble --disable-infobars --noerrdialogs --disable-features=TranslateUI --disable-translate --disable-pinch --overscroll-history-navigation=0 --check-for-update-interval=31536000 --disable-component-update --autoplay-policy=no-user-gesture-required --start-fullscreen"
if "%BROWSER_KIND%"=="edge" set "FLAGS=%FLAGS% --edge-kiosk-type=fullscreen"

echo Launching %BROWSER_KIND% in kiosk mode...

:: --- Browser watchdog loop ------------------------------------------
:browserloop
:: Clear any "did not shut down correctly / restore pages" state so a power
:: cut never leaves a restore bubble on screen.
if exist "%KIOSK_PROFILE%\Default\Preferences" (
    powershell -NoProfile -Command "$p='%KIOSK_PROFILE%\Default\Preferences'; $j=Get-Content $p -Raw; $j=$j -replace '\"exit_type\":\"[^\"]*\"','\"exit_type\":\"Normal\"' -replace '\"exited_cleanly\":false','\"exited_cleanly\":true'; Set-Content $p $j -NoNewline" >nul 2>&1
)

start "" /wait "%BROWSER%" %FLAGS%

echo Browser closed - relaunching in 3s... (close this window to stop the signage)
timeout /t 3 /nobreak >nul
goto browserloop
