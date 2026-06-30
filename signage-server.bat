@echo off
:: =====================================================================
:: IDF Digital Signage - Server watchdog
:: =====================================================================
:: Runs the Express server (app + API on port 4100) and automatically
:: restarts it if it ever stops. Started minimized by launch-signage.bat.
:: You normally do not run this file directly.
:: =====================================================================
title Signage Server
cd /d "%~dp0"

:loop
echo [%date% %time%] Starting signage server...
node --env-file-if-exists=.env server\server.js
echo [%date% %time%] Server stopped - restarting in 3 seconds...
timeout /t 3 /nobreak >nul
goto loop
