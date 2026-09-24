import { config } from "../config.js";
import type { ConnectionState } from "@raku/shared";

export class TwitchService {
  private state: ConnectionState = "disconnected";

  get connectionState(): ConnectionState {
    return this.state;
  }

  async start(): Promise<void> {
    if (!config.twitchConfigured) {
      this.state = "disconnected";
      return;
    }

    // v0.2: OAuth token manager + EventSub WebSocket session.
    // Keeping this explicit prevents the app from pretending Twitch is connected
    // before credentials and token refresh are fully implemented.
    this.state = "disconnected";
  }

  async stop(): Promise<void> {
    this.state = "disconnected";
  }
}
