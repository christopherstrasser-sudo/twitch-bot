# Architecture

## Runtime target

- Windows Server
- Node.js 22+
- One long-running backend process
- React dashboard served by the backend
- SQLite database in `/data`
- Twitch only

## Main modules

1. **Twitch Core**
   - OAuth and refresh tokens
   - EventSub WebSocket
   - Helix API client
   - rate-limit handling
2. **Chat Engine**
   - custom commands
   - aliases
   - variables
   - permissions
   - cooldowns
   - timers
3. **Moderation Engine**
4. **Loyalty / Presence Engine**
5. **Giveaways / Viewer Queue**
6. **Automation Engine**
7. **Stream Control**
8. **Statistics / Audit**
9. **OBS Widgets**

## Design rule

Twitch events enter one internal event bus. Features subscribe to those events instead
of calling one another directly. This keeps commands, loyalty, automations, statistics
and widgets independent and testable.
