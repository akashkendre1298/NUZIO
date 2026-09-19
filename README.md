# 🎙️ Nuzio AI — Personalized Audio News Briefings

> **News on go. Your daily audio briefing, curated every morning.**

Nuzio AI is a modern full-stack mobile web application designed to deliver personalized, text-to-speech audio news briefings for busy professionals. Built with a sleek dark-mode violet UI based on Figma design system specifications, Nuzio features a 5-step calibration onboarding flow, Web Speech API audio narration engine, Inshorts-style news discovery feed, and subscription management.

---

## ✨ Features

- **🎨 Modern Dark Theme UI**: Crafted with deep dark backgrounds (`#0A0A12`), glowing purple accents (`#6C5CE7`), glassmorphism cards, and responsive mobile-first styling.
- **🔊 Web Speech API Audio Narration Engine**: Every news story is fully playable in real-time with text-to-speech narration, adjustable playback speed, pitch tuning, animated waveform visualizer, 10-second skip controls, and progress scrubbing.
- **⚙️ 5-Step Calibration Onboarding**:
  1. **Profession**: Tailor news to your role (*Technology, Finance, Legal, Healthcare, Founder/Builder, etc.*).
  2. **Niches**: Choose up to 7 news topics (*AI & Tech, Markets, Startups, Indian Business, Science, Geopolitics, etc.*).
  3. **Voice & Length**: Select narrator voices (**Aria** [British warm], **Kai** [American crisp], **Meera** [Indian bright]) with live audio previews & duration selection (*5 min, 10 min, 15 min*).
  4. **Delivery Time**: Set AM/PM morning brief schedule (*7:00 AM*).
  5. **Notifications**: Configure push notifications & morning brief readiness alerts.
- **🧭 Inshorts-Style Discover Feed**: Real-time keyword search, category filter pills, and instant inline audio play buttons.
- **⚙️ Settings & Recalibration**: Profile details, offline mode toggles, push notification controls, and 1-click preference recalibration.
- **💳 Plan & Billing Screen**: Tier comparisons for **Free** (`₹0/mo`), **Pro** (`₹79/mo` or `₹59/mo` annual), and **Ultra Annual** (`₹1,499/yr`).

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: Server runtime (`v24+`)
- **Express.js**: REST API server handling authentication, news feeds, and preference state
- **Modular Architecture**: Decoupled routes (`server/routes/`), middleware (`server/middleware/`), and data storage (`server/data/`)

### Frontend
- **React 18**: UI component framework
- **Vite 5**: Next-generation frontend build tool & dev server
- **Web Speech API**: Browser-native `window.speechSynthesis` audio playback
- **CSS3 / Plus Jakarta Sans**: Custom design tokens & mobile web application layout

---

## 📁 Repository Structure

```
NUZIO/
├── index.html                  # Root HTML template
├── package.json                # Project dependencies & npm scripts
├── server.js                   # Node.js Express server entry point
├── vite.config.js              # Vite configuration & API proxy
├── render.yaml                 # Render infrastructure deployment blueprint
├── public/
│   └── favicon.svg             # Web application icon
├── server/                     # Modular Node.js Backend
│   ├── data/
│   │   ├── stories.js          # News briefing dataset (10+ multi-paragraph stories)
│   │   └── users.js            # User sessions & default preferences
│   ├── middleware/
│   │   └── auth.js             # Express session authentication middleware
│   └── routes/
│       ├── authRoutes.js       # Auth endpoints (/api/auth)
│       ├── newsRoutes.js       # News briefing feed endpoints (/api/news)
│       └── prefRoutes.js       # User preferences endpoints (/api/preferences)
└── src/                        # React 18 Frontend
    ├── main.jsx                # React app views, Web Speech API audio player & onboarding
    └── styles.css              # Dark mode CSS design system
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akashkendre1298/NUZIO.git
   cd nuzio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   This concurrently launches:
   - **Node.js Express API Server**: `http://localhost:3001`
   - **Vite React Frontend**: `http://localhost:5173`

4. **Open in browser**:
   Navigate to `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both Node.js backend (`port 3001`) and Vite frontend (`port 5173`) concurrently |
| `npm run server` | Starts only the Node.js Express server |
| `npm run client` | Starts only the Vite React development server |
| `npm run build` | Builds the production bundle in `dist/` |
| `npm start` | Production server start command (`node server.js`) |

---

## 🌐 Production Deployment (Render.com)

This repository includes a `render.yaml` blueprint for 1-click full-stack deployment on Render:

1. Push your code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + → Web Service**.
3. Connect your repository.
4. Render will auto-detect the configuration:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click **Create Web Service**. Your live production URL will be ready in under 2 minutes.

---

## 📄 License

This project is licensed under the MIT License.
