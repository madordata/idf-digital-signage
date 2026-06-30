# =====================================================================
#  IDF Digital Signage - Auto-start setup (Windows)
# =====================================================================
#  Run ONCE on the display PC:
#    Right-click this file  ->  Run with PowerShell
#  (If blocked, open PowerShell as Administrator and run:
#       Set-ExecutionPolicy -Scope Process Bypass -Force
#   then:  .\setup-autostart.ps1 )
#
#  What it does:
#   1. Registers a Scheduled Task "IDF Signage" that runs launch-signage.bat
#      at every logon and restarts it automatically if it ever stops.
#   2. Disables sleep, monitor timeout and screensaver so the TV stays on.
#
#  To remove later:  schtasks /delete /tn "IDF Signage" /f
# =====================================================================

$ErrorActionPreference = 'Stop'

$taskName  = 'IDF Signage'
$projectDir = $PSScriptRoot
$launcher   = Join-Path $projectDir 'launch-signage.bat'

if (-not (Test-Path $launcher)) {
    Write-Host "[ERROR] launch-signage.bat not found next to this script." -ForegroundColor Red
    Write-Host "        Keep setup-autostart.ps1 inside the project folder." -ForegroundColor Red
    Read-Host 'Press Enter to exit'
    exit 1
}

Write-Host '=====================================================================' -ForegroundColor Cyan
Write-Host '   IDF Digital Signage - configuring unattended auto-start'           -ForegroundColor Cyan
Write-Host '=====================================================================' -ForegroundColor Cyan
Write-Host ''

# --- 1. Keep the display awake --------------------------------------------
Write-Host '[1/2] Disabling sleep, monitor timeout and screensaver...'
try {
    powercfg /change standby-timeout-ac 0      | Out-Null
    powercfg /change standby-timeout-dc 0      | Out-Null
    powercfg /change monitor-timeout-ac 0      | Out-Null
    powercfg /change monitor-timeout-dc 0      | Out-Null
    powercfg /change disk-timeout-ac 0         | Out-Null
    powercfg /change hibernate-timeout-ac 0    | Out-Null

    # Disable the screensaver for the current user
    Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name ScreenSaveActive -Value '0' -ErrorAction SilentlyContinue
    Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name ScreenSaveTimeOut -Value '0' -ErrorAction SilentlyContinue
    Write-Host '      Power and screensaver settings updated.' -ForegroundColor Green
} catch {
    Write-Host "      [WARN] Could not change all power settings: $($_.Exception.Message)" -ForegroundColor Yellow
}

# --- 2. Register the scheduled task ---------------------------------------
Write-Host "[2/2] Registering scheduled task '$taskName' (runs at logon)..."

# Remove any previous version so re-running this script is safe
schtasks /delete /tn "$taskName" /f *> $null

$action    = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c `"$launcher`"" -WorkingDirectory $projectDir
$trigger   = New-ScheduledTaskTrigger -AtLogOn
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Highest
$settings  = New-ScheduledTaskSettingsSet `
                -AllowStartIfOnBatteries `
                -DontStopIfGoingOnBatteries `
                -StartWhenAvailable `
                -RestartCount 999 `
                -RestartInterval (New-TimeSpan -Minutes 1) `
                -ExecutionTimeLimit ([TimeSpan]::Zero)

Register-ScheduledTask -TaskName $taskName `
    -Action $action -Trigger $trigger -Principal $principal -Settings $settings `
    -Description 'Launches the IDF Digital Signage kiosk on logon and keeps it running.' `
    -Force | Out-Null

Write-Host "      Task '$taskName' registered." -ForegroundColor Green
Write-Host ''
Write-Host '=====================================================================' -ForegroundColor Cyan
Write-Host '  Done. The signage will start automatically at every logon.'          -ForegroundColor Green
Write-Host ''
Write-Host '  RECOMMENDED for a true power-on kiosk:'                              -ForegroundColor Yellow
Write-Host '   - Enable Windows AUTO-LOGIN so no one has to type a password'       -ForegroundColor Yellow
Write-Host '     after a reboot/power outage (run: netplwiz).'                     -ForegroundColor Yellow
Write-Host '   - In BIOS, set "Restore on AC Power Loss" to ON so the PC'          -ForegroundColor Yellow
Write-Host '     powers itself back up after an outage.'                           -ForegroundColor Yellow
Write-Host ''
Write-Host '  Test now without rebooting:  schtasks /run /tn "IDF Signage"'         -ForegroundColor Gray
Write-Host '  Remove auto-start later:     schtasks /delete /tn "IDF Signage" /f'   -ForegroundColor Gray
Write-Host '=====================================================================' -ForegroundColor Cyan
Read-Host 'Press Enter to close'
