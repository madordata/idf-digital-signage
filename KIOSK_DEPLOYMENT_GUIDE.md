# IDF Digital Signage — Kiosk Deployment Guide (Windows TV)

This guide explains **what was changed in the code** and **exactly what to do on
the TV computer** so the signage starts by itself on power‑up, runs full‑screen,
and recovers automatically from crashes or power cuts.

---

## 1. What changed in the code

| Area | File | What it does now |
| --- | --- | --- |
| One process / one port | [`server/server.js`](server/server.js) | The Express server now serves **both** the compiled React app **and** the API on a single port **4100**. No separate Vite dev server in production. |
| Same‑origin API | [`src/lib/config.ts`](src/lib/config.ts) | In a production build the frontend calls the API with a **relative path**, so it just works on `http://localhost:4100`. |
| Run scripts | [`package.json`](package.json) | Added `npm start` (build → serve) and `npm run kiosk`. |
| Kiosk launcher | [`launch-signage.bat`](launch-signage.bat) | Builds if needed, starts the server with an **auto‑restart watchdog**, waits until it is healthy, then opens Chrome/Edge in hardened **full‑screen kiosk** mode. A second watchdog **reopens the browser** if it is closed, and the Chrome "restore pages" popup is suppressed. |
| Auto‑start setup | [`setup-autostart.ps1`](setup-autostart.ps1) | One‑time script that registers a Windows **Task Scheduler** task ("IDF Signage", runs at logon, restart‑on‑failure) and disables sleep / monitor‑timeout / screensaver. |

### How content is loaded (unchanged, online‑first)
1. **Google Sheet** (needs internet) →
2. local **`server/updates.xlsx`** fallback →
3. built‑in **default messages**.

The display never shows an error screen — if the network or the Excel file
fails, it quietly falls back to the next source.

### How it all runs
```
launch-signage.bat
   ├─ builds dist/ (first run only)
   ├─ starts: node server/server.js  ──► http://localhost:4100  (app + API)
   │     └─ watchdog restarts it if it crashes
   └─ opens Chrome/Edge --kiosk http://localhost:4100  (full screen)
         └─ watchdog reopens it if it is closed
```

---

## 2. What YOU need to do on the TV computer

> Do these steps **once** on the Windows PC connected to the TV.

### Step 0 — Copy the project & install Node.js
1. Install **Node.js (LTS)** from <https://nodejs.org> (just click Next/Next).
2. Copy the whole project folder onto the PC (e.g. `C:\signage`).

### Step 1 — First test run (manual)
1. Open the project folder.
2. Double‑click **`launch-signage.bat`**.
   - The first run installs dependencies and builds the app — this can take a
     couple of minutes. Later runs are fast.
3. Chrome (or Edge) should open **full screen** showing the signage.
   - To exit the kiosk for testing press **Alt + F4** (closes the browser; the
     watchdog window will try to reopen it — close the black launcher window to
     stop everything).

### Step 2 — Enable auto‑start on boot
1. Right‑click **`setup-autostart.ps1`** → **Run with PowerShell**.
   - If Windows blocks it: open **PowerShell as Administrator** and run:
     ```powershell
     Set-ExecutionPolicy -Scope Process Bypass -Force
     .\setup-autostart.ps1
     ```
2. This registers the **"IDF Signage"** scheduled task and turns off sleep /
   screensaver.
3. Test it without rebooting:
   ```
   schtasks /run /tn "IDF Signage"
   ```

### Step 3 — Make it survive reboots & power cuts (recommended)
These two settings make it a true "turn the TV on and it just works" kiosk.
They **cannot be scripted safely**, so set them by hand:

1. **Windows auto‑login** (so no password is needed after a reboot):
   - Press **Win + R**, type **`netplwiz`**, press Enter.
   - Select the user, **uncheck** "Users must enter a user name and password",
     click **Apply**, and type the password when asked.
2. **BIOS — Restore on AC Power Loss = ON** (so the PC powers itself back on
   after an outage):
   - Restart, enter BIOS (usually **Del** or **F2** during boot).
   - Find a setting like *"Restore on AC Power Loss" / "AC Power Recovery"* and
     set it to **On / Power On**. Save & exit.

### Done ✅
From now on: power on the TV + PC → Windows logs in automatically → the signage
launches full‑screen by itself.

---

## 3. Everyday tasks

| I want to… | Do this |
| --- | --- |
| Update the ticker / screen text | Edit the **Google Sheet** (online) or `server/updates.xlsx` (local). Changes appear automatically within ~1 minute. |
| Apply a code change | Run `npm run build` once, then restart (or just reboot). |
| Start manually | Double‑click `launch-signage.bat`. |
| Stop the signage | Close the black **launcher** window (and the "Signage Server" window). |
| Run the kiosk now (test) | `schtasks /run /tn "IDF Signage"` |
| Turn OFF auto‑start | `schtasks /delete /tn "IDF Signage" /f` |

---

## 4. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Browser not full screen | The launcher uses `--kiosk`; if a non‑Chrome/Edge browser opened, install **Google Chrome**, then re‑run. As a stopgap press **F11**. |
| "Restore pages" popup after power cut | Already suppressed by the launcher. If it ever appears, it will be cleared on the next relaunch. |
| Screen goes black / sleeps | Re‑run `setup-autostart.ps1` (it disables sleep & screensaver). |
| Ticker shows default text only | No internet **and** no `server/updates.xlsx`. Add the Excel file or connect the network. |
| Port 4100 already in use | The launcher frees it automatically on start; otherwise reboot. |
| Nothing starts on boot | Confirm the scheduled task exists: `schtasks /query /tn "IDF Signage"`, and that **auto‑login** (Step 3) is enabled. |

---

## 5. Quick reference

```
Project URL (local):   http://localhost:4100
Server health check:   http://localhost:4100/api/health
Ticker API:            http://localhost:4100/api/updates
Launcher:              launch-signage.bat
Auto-start setup:      setup-autostart.ps1
Scheduled task name:   IDF Signage
```
