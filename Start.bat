@echo off
setlocal EnableExtensions
title Raku Twitch Bot
cd /d "%~dp0"

echo.
echo ==========================================
echo          RAKU TWITCH BOT
echo ==========================================
echo.

where node.exe >nul 2>&1
if errorlevel 1 (
  echo [FEHLER] Node.js wurde nicht gefunden.
  echo Bitte Node.js 22 LTS oder neuer installieren.
  echo.
  pause
  exit /b 1
)

where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo [FEHLER] npm wurde nicht gefunden.
  echo Bitte Node.js 22 LTS oder neuer installieren.
  echo.
  pause
  exit /b 1
)

for /f "tokens=1 delims=." %%V in ('node -p "process.versions.node"') do set NODE_MAJOR=%%V
if %NODE_MAJOR% LSS 22 (
  echo [FEHLER] Node.js 22 oder neuer wird benoetigt.
  node --version
  echo.
  pause
  exit /b 1
)

if not exist ".env" (
  if not exist ".env.example" (
    echo [FEHLER] .env.example fehlt.
    echo.
    pause
    exit /b 1
  )

  copy /Y ".env.example" ".env" >nul
  echo [INFO] Erste Einrichtung erkannt.
  echo [INFO] .env wurde erstellt und wird jetzt geoeffnet.
  echo.
  echo Twitch-Zugangsdaten eintragen, speichern und Notepad schliessen.
  echo Danach geht der Start automatisch weiter.
  echo.
  notepad.exe ".env"
)

echo [INFO] Pruefe Abhaengigkeiten...
call npm.cmd install --no-package-lock
if errorlevel 1 (
  echo.
  echo [FEHLER] npm install ist fehlgeschlagen.
  pause
  exit /b 1
)
echo [OK] Abhaengigkeiten bereit.
echo.

echo [INFO] Baue Twitch Bot...
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo [FEHLER] Build ist fehlgeschlagen.
  pause
  exit /b 1
)
echo [OK] Build erfolgreich.
echo.

echo [INFO] Starte Raku Twitch Bot...
echo [INFO] Dashboard: http://localhost:3210
echo [INFO] Beenden mit STRG+C
echo.
call npm.cmd start

set EXITCODE=%ERRORLEVEL%
echo.
if not "%EXITCODE%"=="0" (
  echo [FEHLER] Twitch Bot wurde mit Exit-Code %EXITCODE% beendet.
) else (
  echo [INFO] Twitch Bot wurde beendet.
)
echo.
pause
exit /b %EXITCODE%
