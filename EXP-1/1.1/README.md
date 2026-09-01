# EXP-1/1.1 — Multi-Platform Post Composer

This small React + Vite app implements a dynamic post composer that validates content against multiple platform constraints (character limits, media rules, hashtag checks) in real time.

Quick start

1. Install dependencies

```bash
cd EXP-1/1.1
npm install
```

2. Start dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

What it includes
- Platform selection (Twitter/X, Instagram, Facebook, LinkedIn, Mastodon, SMS)
- Real-time character counters and per-platform validation
- Media attachments with previews and simple media limit warnings
- Responsive UI

Notes
- This is a front-end experiment; publish is simulated via console log / alert.
