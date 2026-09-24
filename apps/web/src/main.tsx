import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { BotStatus } from "@raku/shared";
import "./styles.css";

function App() {
  const [status, setStatus] = useState<BotStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(setStatus)
      .catch((err: Error) => setError(err.message));
  }, []);

  const connectionLabel =
    status?.twitchConnection === "connected"
      ? "Verbunden"
      : status?.twitchConfigured
        ? "Bereit für OAuth"
        : "Nicht konfiguriert";

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <div className="eyebrow">TWITCH CONTROL CENTER</div>
          <h1>Raku Twitch Bot</h1>
          <p>
            Twitch-only. Keine Premium-Schranken. Commands, Moderation,
            Automationen, Loyalty und Stream-Control in einem System.
          </p>
        </div>
        <div className="version">v{status?.version ?? "0.1.0"}</div>
      </header>

      {error && <div className="error">Backend nicht erreichbar: {error}</div>}

      <section className="grid">
        <article className="card">
          <span className="label">Bot Core</span>
          <strong>{status?.databaseReady ? "Online" : "Lädt…"}</strong>
          <small>API + SQLite + Dashboard</small>
        </article>

        <article className="card">
          <span className="label">Twitch</span>
          <strong>{connectionLabel}</strong>
          <small>EventSub + Helix werden als Nächstes aktiviert.</small>
        </article>

        <article className="card">
          <span className="label">Broadcaster</span>
          <strong>{status?.broadcasterIdConfigured ? "Konfiguriert" : "Fehlt"}</strong>
          <small>Twitch Broadcaster User ID</small>
        </article>

        <article className="card">
          <span className="label">Bot Account</span>
          <strong>{status?.botUserIdConfigured ? "Konfiguriert" : "Fehlt"}</strong>
          <small>Separater Twitch-Bot-Account empfohlen</small>
        </article>
      </section>

      <section className="module">
        <div>
          <span className="label">FOUNDATION</span>
          <h2>v0.1.0 steht</h2>
        </div>
        <div className="steps">
          <span>01 · Server Core</span>
          <span>02 · OAuth</span>
          <span>03 · EventSub Chat</span>
          <span>04 · Commands</span>
          <span>05 · Timer</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
