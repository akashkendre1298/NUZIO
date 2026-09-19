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
- **🔙 Full Navigation & Back Controls**: Interactive back buttons across onboarding steps, Auth, Settings, Plan Modal, and Article Reader view.

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

### Testing & Quality Assurance
- **Vitest**: Next-generation unit & integration testing runner
- **Supertest**: Express API HTTP endpoint assertion library
- **@vitest/coverage-v8**: Automated V8 code coverage report generator

---

## 🧪 Automated Testing & Coverage Reports

The project includes **20 comprehensive automated test cases** spanning Express REST API endpoints, user authentication handshakes, news feed fallback datasets, search & category filtering logic, and voice/billing specifications.

### 📋 Test Suites Breakdown

1. **Backend Integration & Authentication Suite (`tests/backend_extended.test.js` - 10 Tests)**:
   - Registration validation (missing fields, passwords < 6 characters).
   - Successful user signup & credential normalization.
   - Prevention of duplicate email registrations (`409 Conflict`).
   - Login credential authentication & session token generation.
   - Demo guest session authorization (`aarav@nuzio.ai`).
   - News feed retrieval with multi-paragraph story bodies.
   - Preference persistence (*voice, profession, niches, plan*).
   - Security verification rejecting unauthenticated requests without authorization header (`401 Unauthorized`).

2. **Frontend & Data Logic Suite (`tests/frontend_logic.test.js` - 6 Tests)**:
   - Verification of 10 multi-paragraph news briefing dataset properties.
   - Search keyword filtering (*e.g. searching "Claude"*).
   - Category topic filtering (*AI & Tech, Markets, Startups, Science, etc.*).
   - Category reset on selecting "All".
   - Narrator voice parameter specifications (**Aria**, **Kai**, **Meera**).
   - Subscription pricing & 35% annual discount calculation accuracy.

3. **Core API Integration Suite (`tests/backend.test.js` - 4 Tests)**:
   - End-to-end token handshakes, user state updates, and error handling.

### 🏃 Running Tests & Generating Coverage Reports

```bash
# Run all 20 test cases
npm test

# Run tests with V8 coverage and generate HTML/JSON reports
npm run test:coverage

# Run tests with verbose output
npm run test:report
```

### 📊 Code Coverage Metrics

Executing `npm run test:coverage` automatically generates an interactive HTML coverage report in `./coverage/index.html` and a JSON report in `./coverage/coverage-final.json`:

```
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
 server/data       |     100 |    66.66 |     100 |     100 |
  stories.js       |     100 |      100 |     100 |     100 |
  users.js         |     100 |    66.66 |     100 |     100 |
 server/routes     |     100 |    84.61 |     100 |     100 |
  authRoutes.js    |     100 |       90 |     100 |     100 |
  newsRoutes.js    |     100 |      100 |     100 |     100 |
  prefRoutes.js    |     100 |       50 |     100 |     100 |
-------------------|---------|----------|---------|---------|
```

---

## 📁 Repository Structure

```
NUZIO/
├── index.html                  # Root HTML template
├── package.json                # Project dependencies & npm scripts
├── server.js                   # Node.js Express server entry point
├── vite.config.js              # Vite configuration & API proxy
├── vitest.config.js            # Vitest configuration & coverage settings
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
├── tests/                      # Automated Test Suites (20 Tests)
│   ├── backend.test.js         # Core API & session tests
│   ├── backend_extended.test.js # Extended API, signup, login & validation tests
│   └── frontend_logic.test.js  # Data filtering, search & pricing logic tests
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
   git clone https://github.com/<YOUR_USERNAME>/nuzio.git
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
| `npm test` | Runs all 20 automated test cases |
| `npm run test:coverage` | Runs test suite and generates HTML & JSON coverage reports in `coverage/` |
| `npm run test:report` | Runs test suite with verbose output |
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
