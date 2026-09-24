$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Starte Raku Twitch Bot..." -ForegroundColor Cyan
npm start
