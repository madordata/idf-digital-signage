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
echo          IDF Digital Signage - הדיגיטל של היחידה - הפעלה
echo =====================================================================
echo.

:: Get the directory where the script is located
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install it first.
    echo [שגיאה] Node.js לא מותקן במחשב זה. נא להתקין אותו תחילה.
    pause
    exit /b 1
)

:: Free up ports 5173 and 4100 if they are currently occupied to avoid port collision
echo [1/4] Checking and clearing ports 5173 & 4100...
echo [1/4] בודק ומפנה פורטים בשימוש...
powershell -Command "Get-Process -Id (Get-NetTCPConnection -LocalPort 5173,4100 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force" >nul 2>&1

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo [2/4] Installing dependencies. This might take a dynamic minute...
    echo [2/4] מתקין ספריות קוד (עשוי לקחת מספר דקות)...
    call npm install --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed!
        echo [שגיאה] ההתקנה נכשלה! נקה את החלון ונסה שנית עם חיבור לאינטרנט.
        pause
        exit /b 2
    )
) else (
    echo [2/4] Dependencies already installed. skipping...
    echo [2/4] ספריות הקוד כבר מותקנות. מדלג...
)

:: Seed Excel updates.xlsx template if not exists
if not exist "server\updates.xlsx" (
    echo [3/4] Generating updates.xlsx sample template...
    echo [3/4] מייצר קובץ עדכונים ראשוני updates.xlsx...
    call npm run seed
)

:: Start the system (Vite Frontend + Express Backend) in the background
echo [4/4] Launching digital signage system in the background...
echo [4/4] מפעיל את השרת והאתר ברקע...
start /b cmd /c "npm run dev:all"

:: Wait for Vite to compile and start serving
echo Waiting for server to initialize (6 seconds)...
echo ממתין לעליית המערכת (6 שניות)...
timeout /t 6 /nobreak >nul

:: Launch the default browser in Fullscreen/Kiosk Mode pointing to localhost:5173
echo Launching browser in continuous full-screen view...
echo פותח את הדפדפן במצב תצוגה מלאה ללא כפתורים (Kiosk Mode)...

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
    echo [TIP] If browser is not in full-screen, please click on the browser and press F11!
    echo [טיפ] אם הדפדפן לא נפתח במסך מלא, לחצו עליו ולחצו על מקש F11 במקלדת!
)

echo.
echo =====================================================================
echo ✓ System successfully active!
echo ✓ המערכת הופעלה בהצלחה!
echo Keep this window open. Minimizing in 5 seconds...
echo נא להשאיר חלון זה פתוח (ניתן למזער אותו). נסגר זמנית עוד 5 שניות...
echo =====================================================================
timeout /t 5 >nul
