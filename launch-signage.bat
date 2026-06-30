@echo off
:: =====================================================================
:: IDF Digital Signage - Windows Desktop Launcher
:: =====================================================================
:: This script automatically starts the backend server, frontend app,
:: and launches Google Chrome or Microsoft Edge in Kiosk (Full-Screen) mode.
::
:: INSTRUCTIONS:
:: 1. Keep this file in the project folder ("%~dp0" is the current folder).
:: 2. Right-click this file -> Send to -> Desktop (create shortcut).
:: 3. Double-click the shortcut on your Desktop to run the display!
:: =====================================================================

title IDF Digital Signage Launcher
echo =====================================================================
echo          IDF Digital Signage - Launching System (Windows)
echo =====================================================================
echo.

:: Get the directory where the script is located
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install it first from https://nodejs.org
    pause
    exit /b 1
)

:: Free up ports 5173 and 4100 if they are currently occupied to avoid port collision
echo [1/4] Checking and clearing ports 5173 & 4100...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4100 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo [2/4] Installing dependencies. This might take a minute...
    call npm install --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed! Please check your internet connection.
        pause
        exit /b 2
    )
) else (
    echo [2/4] Dependencies already installed. Skipping...
)

:: Seed Excel updates.xlsx template if not exists
if not exist "server\updates.xlsx" (
    echo [3/4] Generating updates.xlsx sample template...
    call npm run seed
)

:: Start the system (Vite Frontend + Express Backend) in the background
echo [4/4] Launching digital signage system in the background...
start /b cmd /c "npm run dev:all"

:: Wait for Vite to compile and start serving
echo Waiting for server to initialize (6 seconds)...
ping 127.0.0.1 -n 7 >nul

:: Launch the default browser in Fullscreen/Kiosk Mode pointing to localhost:5173
echo Launching browser in continuous full-screen view...

:: Check for Chrome path, then Edge, then default
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --kiosk http://localhost:5173 --no-first-run --user-data-dir="%temp%\chrome-kiosk"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --kiosk http://localhost:5173 --no-first-run --user-data-dir="%temp%\chrome-kiosk"
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --kiosk http://localhost:5173 --edge-kiosk-type=fullscreen --no-first-run
) else (
    :: Fallback to default browser but let user know they should press F11
    start "" http://localhost:5173
    echo [TIP] If the browser is not in full-screen, please click on its window and press F11!
)

echo.
echo =====================================================================
echo ✓ System successfully active!
echo Keep this window open. Minimizing in 5 seconds...
echo =====================================================================
ping 127.0.0.1 -n 6 >nul
