#!/bin/bash
# =====================================================================
# IDF Digital Signage - macOS Launcher Script
# =====================================================================
# This script automatically starts the backend server, frontend app,
# and launches Google Chrome in Kiosk (Full-Screen) mode.
#
# INSTRUCTIONS:
# 1. Open Terminal and run: chmod +x launch-signage.sh
# 2. You can create an alias or drag this script to your Dock/Desktop.
# 3. Double-click or run from Terminal to play!
# =====================================================================

clear
echo "====================================================================="
echo "         IDF Digital Signage - הדיגיטל של היחידה - הפעלה (macOS)"
echo "====================================================================="
echo ""

# Get current script directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed! Please install it first from https://nodejs.org"
    echo "[שגיאה] Node.js לא מותקן במחשב זה. נא להתקין אותו תחילה."
    read -p "Press enter to exit..."
    exit 1
fi

# Free up ports 5173 and 4100 if occupied
echo "[1/4] Checking and clearing ports 5173 & 4100..."
echo "[1/4] בודק ומפנה פורטים בשימוש..."
lsof -ti :5173 | xargs kill -9 2>/dev/null
lsof -ti :4100 | xargs kill -9 2>/dev/null

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "[2/4] Installing dependencies. This might take a minute..."
    echo "[2/4] מתקין ספריות קוד (עשוי לקחת מספר דקות)..."
    npm install --no-audit --no-fund
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed!"
        echo "[שגיאה] ההתקנה נכשלה! ודא שיש חיבור אינטרנט תקין."
        read -p "Press enter to exit..."
        exit 1
    fi
else
    echo "[2/4] Dependencies already installed. Skipping..."
    echo "[2/4] ספריות הקוד כבר מותקנות. מדלג..."
fi

# Seed Excel content if template not exists
if [ ! -f "server/updates.xlsx" ]; then
    echo "[3/4] Generating updates.xlsx sample template..."
    echo "[3/4] מייצר קובץ עדכונים ראשוני updates.xlsx..."
    npm run seed
fi

# Start the system (Vite + Express backend)
echo "[4/4] Launching digital signage system in the background..."
echo "[4/4] מפעיל את השרת והאתר ברקע..."
npm run dev:all &
SYSTEM_PID=$!

# Wait for Vite to build
echo "Waiting for server to initialize (6 seconds)..."
echo "ממתין לעליית המערכת (6 שניות)..."
sleep 6

# Open Chrome in Kiosk mode
echo "Opening browser in continuous full-screen view..."
echo "פותח את הדפדפן במצב תצוגה מלאה (Kiosk Mode)..."

if [ -d "/Applications/Google Chrome.app" ]; then
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk "http://localhost:5173" --no-first-run --user-data-dir="/tmp/chrome-kiosk" &
elif command -v google-chrome &> /dev/null; then
    google-chrome --kiosk "http://localhost:5173" --no-first-run --user-data-dir="/tmp/chrome-kiosk" &
else
    open "http://localhost:5173"
    echo "[TIP] If browser is not in full-screen, please click on the browser and press F11 / Command+Control+F!"
    echo "[טיפ] אם הדפדפן לא נפתח במסך מלא, לחצו עליו ולחצו על מקשי קיצור המסך המלא בדפדפן!"
fi

echo ""
echo "====================================================================="
echo "✓ System successfully active!"
echo "✓ המערכת הופעלה בהצלחה!"
echo "Keep this Terminal window open to keep the server running."
echo "השאירו חלון טרמינל זה פתוח כדי שהשרת ימשיך לפעול ברקע."
echo "====================================================================="

# Wait for background system process
wait $SYSTEM_PID
