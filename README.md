# Raku Twitch Bot

Twitch-only chatbot and control center for Windows Server.

The goal is one self-hosted bot that combines commands, timers, moderation,
loyalty, giveaways, channel point automation, stream controls, statistics,
OBS widgets and a rule-based automation engine without artificial premium tiers.

## Current version

**v0.1.0 - Foundation**

- Node.js 22 + TypeScript backend
- React/Vite dashboard
- SQLite storage
- health/status API
- Windows bootstrap and start scripts
- base tables for commands, timers, settings and audit log
- Twitch service boundary prepared for OAuth + EventSub

## Windows Server setup

Requirements:

- Windows Server
- Git
- Node.js 22 LTS or newer

Clone and bootstrap:

```powershell
git clone https://github.com/christopherstrasser-sudo/twitch-bot.git
cd twitch-bot
powershell -ExecutionPolicy Bypass -File .\scripts\bootstrap-windows.ps1
```

The bootstrap creates `.env` from `.env.example`, installs dependencies and
builds server + dashboard.

Then edit `.env` and start:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-windows.ps1
```

Dashboard:

```text
http://localhost:3210
```

The backend binds to `0.0.0.0` by default, so the port can also be exposed on
the LAN after configuring Windows Firewall.

## Project layout

```text
apps/
  server/       Fastify API, SQLite, Twitch core
  web/          React dashboard
packages/
  shared/       shared TypeScript contracts
scripts/
  bootstrap-windows.ps1
  start-windows.ps1
docs/
  ARCHITECTURE.md
  ROADMAP.md
```

## Twitch

The production Twitch integration will use:

- Twitch OAuth
- EventSub WebSocket
- Twitch Helix API
- separate broadcaster and bot identities
- automatic token refresh

Real credentials and tokens belong only in `.env` / the local database and
must never be committed.

## Scope

Twitch only. No TikTok, YouTube or other chat platforms are planned.
