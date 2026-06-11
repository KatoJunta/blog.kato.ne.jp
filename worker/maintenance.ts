export const MAINTENANCE_HTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>準備中 | 学びて厭わず</title>
    <style>
      :root {
        color-scheme: light dark;
        --background: oklch(0.98 0.01 85);
        --foreground: oklch(0.2 0.02 90);
        --muted-foreground: oklch(0.45 0.02 90);
        --primary: oklch(0.55 0.22 29);
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --background: oklch(0.18 0.02 90);
          --foreground: oklch(0.97 0.01 85);
          --muted-foreground: oklch(0.7 0.02 85);
          --primary: oklch(0.77 0.18 29);
        }
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        font-family:
          'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
          'Hiragino Sans', Meiryo, sans-serif;
        background: var(--background);
        color: var(--foreground);
      }

      main {
        max-width: 28rem;
        text-align: center;
      }

      h1 {
        margin: 0 0 0.75rem;
        font-size: 1.75rem;
        font-weight: 500;
        color: var(--primary);
      }

      p {
        margin: 0;
        line-height: 1.7;
      }

      .message {
        margin-bottom: 0.75rem;
      }

      .note {
        color: var(--muted-foreground);
        font-size: 0.95rem;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>学びて厭わず</h1>
      <p class="message">現在、サイトを準備中です。</p>
      <p class="note">しばらくお待ちください。</p>
    </main>
  </body>
</html>`
