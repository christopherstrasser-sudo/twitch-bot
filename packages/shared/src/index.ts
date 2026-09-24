export type ConnectionState = "disconnected" | "connecting" | "connected" | "error";

export interface BotStatus {
  version: string;
  uptimeSeconds: number;
  twitchConfigured: boolean;
  twitchConnection: ConnectionState;
  broadcasterIdConfigured: boolean;
  botUserIdConfigured: boolean;
  databaseReady: boolean;
}
