#!/bin/bash
# =====================================================================
# IDF Digital Signage - macOS Launcher Script
# =====================================================================
# This script automatically starts the backend server, frontend app,
# and launches Google Chrome in Kiosk (Full-Screen) mode.
# =====================================================================

clear
echo "====================================================================="
echo "         IDF Digital Signage - Launching System (macOS)"
echo "====================================================================="
echo ""

# Get current script directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed! Please install it first from https://nodejs.org"
    exit 1
fi

# Free up ports 5173 and 4100 if occupied
echo "[1/4] Checking and clearing ports 5173 & 4100..."
lsof -ti :5173 | xargs kill -9 2>/dev/null
lsof -ti :4100 | xargs kill -9 2>/dev/null

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "[2/4] Installing dependencies. This might take a minute..."
    npm install --no-audit --no-fund
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed! Please check your internet connection."
        exit 1
    fi
else
    echo "[2/4] Dependencies already installed. Skipping..."
fi

# Seed Excel content if template not exists
if [ ! -f "server/updates.xlsx" ]; then
    echo "[3/4] Generating updates.xlsx sample template..."
    npm run seed
fi

# Start the system (Vite + Express backend)
echo "[4/4] Launching digital signage system in the background..."
npm run dev:all &
SYSTEM_PID=$!

# Wait for Vite to build
echo "Waiting for server to initialize (6 seconds)..."
sleep 6

# Open Chrome in Kiosk mode
echo "Opening browser in continuous full-screen view..."

if [ -d "/Applications/Google Chrome.app" ]; then
    open -a "Google Chrome" --args --kiosk "http://localhost:5173" --no-first-run --user-data-dir="/tmp/chrome-kiosk"
elif command -v google-chrome &> /dev/null; then
    google-chrome --kiosk "http://localhost:5173" --no-first-run --user-data-dir="/tmp/chrome-kiosk" &
else
    open "http://localhost:5173"
    echo "[TIP] If the browser is not in full-screen, please click on its window and press F11 or Command+Control+F!"
fi

echo ""
echo "====================================================================="
echo "✓ System successfully active!"
echo "Keep this Terminal window open to keep the server running."
echo "====================================================================="

# Wait for background system process
wait $SYSTEM_PID
