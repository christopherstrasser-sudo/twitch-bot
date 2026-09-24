$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Raku Twitch Bot - Windows bootstrap" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor DarkGray

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js wurde nicht gefunden. Bitte Node.js 22 LTS installieren."
}

$nodeVersion = node -p "process.versions.node"
$major = [int]($nodeVersion.Split('.')[0])

if ($major -lt 22) {
    throw "Node.js 22 oder neuer wird benoetigt. Gefunden: $nodeVersion"
}

Write-Host "Node.js $nodeVersion gefunden." -ForegroundColor Green

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host ".env wurde aus .env.example erstellt." -ForegroundColor Yellow
}

Write-Host "Installiere Abhaengigkeiten..."
npm install

Write-Host "Baue Server und Dashboard..."
npm run build

Write-Host ""
Write-Host "Fertig." -ForegroundColor Green
Write-Host "1. .env mit Twitch-Daten fuellen"
Write-Host "2. Start: powershell -ExecutionPolicy Bypass -File .\scripts\start-windows.ps1"
Write-Host "3. Dashboard: http://localhost:3210"
