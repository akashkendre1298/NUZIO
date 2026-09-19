import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Default Fallback Stories so stories array is NEVER empty
const fallbackStories = [
  {
    id: 'claude-45',
    topic: 'AI & Tech',
    source: 'The Verge',
    minutes: 3,
    color: '#6C5CE7',
    title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools.',
    deck: 'Anthropic’s new inventory layer lets Claude hold entire codebases in mind while executing autonomous agentic workflows.',
    author: 'Alex Chen',
    time: '12 min ago',
    body: 'Good morning. Anthropic has officially unveiled Claude 4.5 today. The model introduces a breakthrough 2 million token context window alongside native multi-agent execution capabilities. Developers and research institutions report dramatic improvements in complex software architecture, multi-file code refactoring, and long-form document synthesis. The system demonstrates state-of-the-art benchmark results in tool utilization and multi-turn reasoning.'
  },
  {
    id: 'fed-policy',
    topic: 'Markets',
    source: 'The Ledger',
    minutes: 4,
    color: '#00E676',
    title: 'Fed minutes hint at a September rate reduction policy shift.',
    deck: 'Federal Reserve officials express confidence that inflation is steadily cooling toward target levels while employment remains balanced.',
    author: 'Priya Sharma',
    time: '28 min ago',
    body: 'In financial markets news, Federal Reserve policymakers indicated during their recent executive session that macroeconomic data aligns with a potential interest rate cut this September. Treasury yields eased following the announcement, while technology equities and renewable energy funds surged in global morning trade. Analysts view this as a pivotal pivot toward monetary easing.'
  },
  {
    id: 'india-startups',
    topic: 'Startups',
    source: 'TechCrunch',
    minutes: 3,
    color: '#FF7675',
    title: 'Indian AI startups secure $450M in Q3 early-stage funding.',
    deck: 'Bengaluru and Gurgaon ecosystem leads venture capital momentum in Indic LLM foundation models and localized audio AI.',
    author: 'Karan Mehta',
    time: '45 min ago',
    body: 'Across Indian technology hubs, startup investment has reached a fresh high this quarter. Over $450 million in venture capital was deployed into voice-native AI interfaces and Indian language foundation models. Founders in Bengaluru and Gurgaon are building domain-specific generative models tailored for enterprise customer support, fintech compliance, and vernacular voice search.'
  },
  {
    id: 'isro-gaganyaan',
    topic: 'Indian Business',
    source: 'The Hindu Tech',
    minutes: 4,
    color: '#fdcb6e',
    title: 'ISRO advances Gaganyaan crew module flight abort test.',
    deck: 'India’s space agency achieves key milestone in human spaceflight infrastructure with successful high-altitude test escape system.',
    author: 'Siddharth Rao',
    time: '52 min ago',
    body: 'ISRO has successfully executed another critical milestone for the Gaganyaan mission. The high-altitude crew escape system operated flawlessly during simulated booster separation at Mach 1.2 off the coast of Sriharikota. Space agency officials confirmed environmental control systems and recovery parachutes performed within optimal limits.'
  },
  {
    id: 'quantum-chip',
    topic: 'Science',
    source: 'Vector',
    minutes: 5,
    color: '#74B9FF',
    title: 'Breakthrough fault-tolerant quantum logic gates demonstrated.',
    deck: 'Physicists at Oxford and MIT achieve 99.9% gate fidelity using micro-cavity optical ion traps.',
    author: 'Dr. Evelyn Vance',
    time: '1 hr ago',
    body: 'Turning to science news. A joint quantum physics research team at MIT and Oxford has successfully demonstrated error-corrected quantum operations at scale. By leveraging topological qubits and micro-cavity optical traps, the system maintains quantum coherence for extended periods, paving the way for practical molecular simulations in drug discovery.'
  },
  {
    id: 'climate-grid',
    topic: 'Climate & Energy',
    source: 'CleanTech Daily',
    minutes: 4,
    color: '#00CEC9',
    title: 'Next-gen solid state sodium batteries enter pilot grid trials.',
    deck: 'New sodium-ion cathode formulations promise 40% cost reduction in grid-scale renewable energy storage.',
    author: 'Marcus Vance',
    time: '2 hrs ago',
    body: 'In climate and energy, grid-scale storage is receiving a massive boost from solid-state sodium ion technologies. Pilot deployment projects across California and Gujarat show promising cycle endurance and thermal stability at 40% lower material costs compared to traditional lithium-ion systems.'
  },
  {
    id: 'apple-m4-ultra',
    topic: 'AI & Tech',
    source: 'Wired',
    minutes: 3,
    color: '#a29bfe',
    title: 'Apple reveals M4 Ultra silicon designed for local neural inference.',
    deck: 'New 32-core unified architecture delivers 120 trillion operations per second on device.',
    author: 'David Miller',
    time: '2.5 hrs ago',
    body: 'Apple has announced its latest flagship silicon, the M4 Ultra. Engineered specifically for high-throughput machine learning workloads, the chip packages 32 high-performance cores alongside an expanded Neural Engine capable of running 70-billion-parameter LLMs locally with under 15 watts of power consumption.'
  },
  {
    id: 'global-trade',
    topic: 'Geopolitics',
    source: 'World Brief',
    minutes: 4,
    color: '#6c5ce7',
    title: 'Digital trade corridor treaty signed by 14 Indo-Pacific nations.',
    deck: 'Harmonized data sovereignty regulations, cross-border payments, and AI governance frameworks approved.',
    author: 'Elena Rostova',
    time: '3 hrs ago',
    body: 'In global policy, representatives from 14 Indo-Pacific nations have signed a landmark digital trade treaty. The agreement establishes unified standards for cloud infrastructure, cross-border payment rails, data sovereignty protections, and ethical AI auditing across member economies.'
  },
  {
    id: 'rbi-upi-crossborder',
    topic: 'Markets',
    source: 'Economic Times',
    minutes: 3,
    color: '#00E676',
    title: 'RBI expands real-time cross-border UPI payments to 8 new countries.',
    deck: 'Tourists and non-resident Indians in Japan, UAE, and Europe can now transact seamlessly via instant QR codes.',
    author: 'Rohan Deshmukh',
    time: '4 hrs ago',
    body: 'The Reserve Bank of India has officially announced the international expansion of UPI real-time payment rails to eight new countries. The integration allows tourists and Indian diaspora members in Japan, the UAE, France, and Singapore to scan merchant QR codes directly from their existing mobile banking apps with instant currency conversion.'
  },
  {
    id: 'crispr-cancer-cure',
    topic: 'Health & Medicine',
    source: 'Nature Medicine',
    minutes: 4,
    color: '#FF7675',
    title: 'Phase II trial shows 88% remission in targeted CRISPR therapy.',
    deck: 'Oncolytic cell editing demonstrates complete clearance of recalcitrant solid tumor malignancies.',
    author: 'Dr. Sarah Jenkins',
    time: '5 hrs ago',
    body: 'In health news, a groundbreaking Phase II clinical trial published in Nature Medicine reports an 88% complete remission rate among patients receiving personalized CRISPR-edited T-cell therapy. The targeted gene editing technique equips patient immune cells to recognize and dismantle solid tumors without severe off-target toxicity.'
  }
];

// Options for onboarding
const professions = [
  { id: 'finance', label: 'Finance & Trading', icon: '📈' },
  { id: 'legal', label: 'Legal', icon: '⚖️' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'health', label: 'Healthcare', icon: '🩺' },
  { id: 'consulting', label: 'Consulting', icon: '💼' },
  { id: 'marketing', label: 'Marketing & Media', icon: '📣' },
  { id: 'govt', label: 'Government & Policy', icon: '🏛️' },
  { id: 'realestate', label: 'Real Estate', icon: '🏢' },
  { id: 'edu', label: 'Education', icon: '🎓' },
  { id: 'founder', label: 'Founder / Builder', icon: '🚀' }
];

const nichesList = [
  { id: 'ai', label: 'AI & Technology' },
  { id: 'markets', label: 'Financial Markets' },
  { id: 'india-biz', label: 'Indian Business' },
  { id: 'politics', label: 'Global Politics' },
  { id: 'startups', label: 'Startups' },
  { id: 'science', label: 'Science' },
  { id: 'geopolitics', label: 'Geopolitics' },
  { id: 'health-med', label: 'Health & Medicine' },
  { id: 'climate', label: 'Climate & Energy' },
  { id: 'sports', label: 'Sports' },
  { id: 'culture', label: 'Culture & Arts' },
  { id: 'policy', label: 'Legal & Policy' }
];

const voices = [
  { id: 'Aria', name: 'Aria', desc: 'Warm · Unhurried · British, ♀ English', initial: 'A', rate: 0.95, pitch: 1.0 },
  { id: 'Kai', name: 'Kai', desc: 'Crisp · Focused · American, ♂ English', initial: 'K', rate: 1.05, pitch: 0.9 },
  { id: 'Meera', name: 'Meera', desc: 'Bright · Curious · Indian, ♀ English', initial: 'M', rate: 1.0, pitch: 1.1 }
];

const api = async (path, options = {}, token) => {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
};

/* --- SPLASH SCREEN --- */
function SplashScreen({ onStart }) {
  useEffect(() => {
    const timer = setTimeout(() => onStart(), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-logo">
        <div className="brand-bars">
          <span /><span /><span />
        </div>
        <span>Nuzio AI</span>
      </div>
      <div className="splash-tagline">News on go</div>
      <div className="splash-sub">YOUR AUDIO BRIEF. EVERY MORNING.</div>
      <div style={{ marginTop: '40px' }} className="live-dot" />
    </div>
  );
}

/* --- LANGUAGE & LOCATION SCREEN --- */
function LanguageLocationScreen({ onNext, onBack }) {
  const [lang, setLang] = useState('English');
  const [locEnabled, setLocEnabled] = useState(false);

  return (
    <div className="screen-content">
      <div className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onBack && (
            <button className="icon-btn" onClick={onBack} title="Go back">
              ←
            </button>
          )}
          <div className="brand-logo">
            <div className="brand-bars"><span /><span /><span /></div>
            Nuzio AI
          </div>
        </div>
      </div>
      <h1 className="screen-title">Choose your<br /><em>language</em></h1>
      <p className="screen-subtitle">Select the language for your daily brief.</p>

      <div
        className={`option-card ${lang === 'English' ? 'selected' : ''}`}
        onClick={() => setLang('English')}
      >
        <div>
          <div className="option-title">🇬🇧 English</div>
          <div className="option-desc">Briefings delivered in English</div>
        </div>
        <div className="radio-indicator" />
      </div>

      <div
        className={`option-card ${lang === 'Hindi' ? 'selected' : ''}`}
        onClick={() => setLang('Hindi')}
      >
        <div>
          <div className="option-title">🇮🇳 हिंदी</div>
          <div className="option-desc">हिंदी में समाचार सुनें</div>
        </div>
        <div className="radio-indicator" />
      </div>

      <div className="option-card" style={{ marginTop: '20px' }}>
        <div>
          <div className="option-title">📍 Enable Location</div>
          <div className="option-desc">Get hyperlocal news tailored to your city.</div>
        </div>
        <div
          className={`toggle-switch ${locEnabled ? 'on' : ''}`}
          onClick={() => setLocEnabled(!locEnabled)}
        />
      </div>

      <button
        className="btn-primary"
        onClick={() => onNext({ language: lang, locationEnabled: locEnabled })}
      >
        Continue →
      </button>
    </div>
  );
}

/* --- AUTH SCREEN --- */
function AuthScreen({ onAuth, onBack }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleDemo() {
    setBusy(true);
    setError('');
    try {
      const data = await api('/api/auth/demo', { method: 'POST' });
      onAuth(data);
    } catch (err) {
      onAuth({
        token: 'demo-token-123',
        user: {
          id: 'demo-aarav',
          name: 'Aarav Sharma',
          email: 'aarav@nuzio.ai',
          preferences: { profession: 'Technology', voice: 'Aria', niches: ['AI & Technology', 'Financial Markets', 'Startups'] }
        }
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="screen-content">
      <div className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onBack && (
            <button className="icon-btn" onClick={onBack} title="Go back">
              ←
            </button>
          )}
          <div className="brand-logo">
            <div className="brand-bars"><span /><span /><span /></div>
            Nuzio AI
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <h1 className="screen-title">Good morning.<br /><em>News on go.</em></h1>
        <p className="screen-subtitle">
          Personalised audio news for Indian professionals — curated every morning.
        </p>
      </div>

      <button className="btn-secondary" onClick={handleDemo} disabled={busy}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
        </svg>
        Continue with Google
      </button>

      <p className="error" style={{ textAlign: 'center', margin: '12px 0' }}>{error}</p>

      <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

/* --- ONBOARDING MULTI-STEP FLOW --- */
function OnboardingFlow({ prefs, onComplete, onSkip, onBackToAuth }) {
  const [step, setStep] = useState(1);
  const [profession, setProfession] = useState(prefs.profession || 'Technology');
  const [niches, setNiches] = useState(prefs.niches || ['AI & Technology', 'Financial Markets', 'Startups']);
  const [voice, setVoice] = useState(prefs.voice || 'Aria');
  const [briefLength, setBriefLength] = useState(prefs.briefLength || '5 min');
  const [deliveryTime, setDeliveryTime] = useState(prefs.deliveryTime || '7:00 AM');
  const [ampm, setAmpm] = useState('AM');
  const [notifications, setNotifications] = useState(true);

  // Audio preview for voices
  const [playingVoice, setPlayingVoice] = useState(null);

  function previewVoice(voiceName) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (playingVoice === voiceName) {
        setPlayingVoice(null);
        return;
      }
      setPlayingVoice(voiceName);
      const vObj = voices.find(v => v.name === voiceName);
      const u = new SpeechSynthesisUtterance(`Hello, I'm ${voiceName}. I'll curate and read your morning briefing on Nuzio AI.`);
      u.rate = vObj ? vObj.rate : 1.0;
      u.pitch = vObj ? vObj.pitch : 1.0;
      u.onend = () => setPlayingVoice(null);
      window.speechSynthesis.speak(u);
    }
  }

  function toggleNiche(label) {
    setNiches(prev => {
      if (prev.includes(label)) {
        if (prev.length === 1) return prev;
        return prev.filter(item => item !== label);
      } else {
        if (prev.length >= 7) return prev;
        return [...prev, label];
      }
    });
  }

  function nextStep() {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete({
        profession,
        niches,
        voice,
        briefLength,
        deliveryTime: `${deliveryTime}`,
        notificationsEnabled: notifications
      });
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    } else if (onBackToAuth) {
      onBackToAuth();
    }
  }

  return (
    <div className="screen-content">
      <div className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="icon-btn" onClick={handleBack} title="Go back to previous step">
            ←
          </button>
          <div className="brand-logo">
            <div className="brand-bars"><span /><span /><span /></div>
            Nuzio AI
          </div>
        </div>
        <button className="skip-btn" onClick={onSkip}>SKIP →</button>
      </div>

      {/* Progress Dots */}
      <div className="step-bar">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`step-dot ${i <= step ? 'active' : ''}`} />
        ))}
      </div>
      <div className="step-label">STEP {step} OF 5</div>

      {/* STEP 1: PROFESSION */}
      {step === 1 && (
        <>
          <h1 className="screen-title">What's your<br /><em>profession?</em></h1>
          <p className="screen-subtitle">We'll tune every brief to what actually moves your day.</p>
          <div className="chips-grid">
            {professions.map(p => (
              <div
                key={p.id}
                className={`chip ${profession === p.label ? 'selected' : ''}`}
                onClick={() => setProfession(p.label)}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
                {profession === p.label && <span className="check-icon">✓</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* STEP 2: NICHES */}
      {step === 2 && (
        <>
          <h1 className="screen-title">What moves<br /><em>your world?</em></h1>
          <p className="screen-subtitle">Pick up to 7 niches. ({niches.length}/7)</p>
          <div className="chips-grid">
            {nichesList.map(n => {
              const sel = niches.includes(n.label);
              return (
                <div
                  key={n.id}
                  className={`chip ${sel ? 'selected' : ''}`}
                  onClick={() => toggleNiche(n.label)}
                >
                  <span>{n.label}</span>
                  {sel && <span className="check-icon">✓</span>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* STEP 3: VOICE & LENGTH */}
      {step === 3 && (
        <>
          <h1 className="screen-title">Pick a<br /><em>narrator voice.</em></h1>
          <p className="screen-subtitle">Tap ► to hear a sample preview.</p>

          <div style={{ marginBottom: '18px' }}>
            {voices.map(v => (
              <div
                key={v.id}
                className={`voice-card ${voice === v.name ? 'selected' : ''}`}
                onClick={() => setVoice(v.name)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="voice-avatar">{v.initial}</div>
                  <div>
                    <div className="option-title">{v.name}</div>
                    <div className="option-desc">{v.desc}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className={`voice-play-sample ${playingVoice === v.name ? 'playing' : ''}`}
                    onClick={(e) => { e.stopPropagation(); previewVoice(v.name); }}
                  >
                    {playingVoice === v.name ? '❚❚' : '▶'}
                  </button>
                  <div className="radio-indicator" />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px' }}>
            <div className="step-label">BRIEF LENGTH</div>
            <div className="option-title" style={{ marginBottom: '6px' }}>How long is your morning?</div>
            <div className="chips-grid">
              {['5 min', '10 min', '15 min', 'Custom'].map(len => (
                <div
                  key={len}
                  className={`chip ${briefLength === len ? 'selected' : ''}`}
                  onClick={() => setBriefLength(len)}
                >
                  {len}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* STEP 4: TIME PICKER */}
      {step === 4 && (
        <>
          <h1 className="screen-title">When do you want<br /><em>your brief?</em></h1>
          <p className="screen-subtitle">Nuzio will have your brief ready and waiting each morning.</p>

          <div className="time-picker-box">
            <div className="am-pm-toggle">
              <button
                className={`am-pm-btn ${ampm === 'AM' ? 'active' : ''}`}
                onClick={() => setAmpm('AM')}
              >
                AM
              </button>
              <button
                className={`am-pm-btn ${ampm === 'PM' ? 'active' : ''}`}
                onClick={() => setAmpm('PM')}
              >
                PM
              </button>
            </div>
            <div>
              <div className="time-display">7:00 <span style={{ fontSize: '20px', color: 'var(--primary)' }}>{ampm}</span></div>
            </div>
          </div>
        </>
      )}

      {/* STEP 5: NOTIFICATIONS */}
      {step === 5 && (
        <>
          <h1 className="screen-title">Stay in<br /><em>the loop.</em></h1>
          <p className="screen-subtitle">Turn on notifications so you never miss your brief.</p>

          <div className="now-playing-card" style={{ padding: '16px', marginBottom: '20px' }}>
            <div className="now-playing-header">PREVIEW NOTIFICATION</div>
            <div className="now-playing-title" style={{ fontSize: '15px' }}>Your morning brief is ready</div>
            <div className="now-playing-deck">6 stories · AI & Tech, Markets, Startups · Voice: {voice} · 7:00 AM</div>
          </div>

          <div className="option-card">
            <div>
              <div className="option-title">🔔 Morning brief notification</div>
              <div className="option-desc">Daily audio brief delivered at 7:00 AM</div>
            </div>
            <div
              className={`toggle-switch ${notifications ? 'on' : ''}`}
              onClick={() => setNotifications(!notifications)}
            />
          </div>
        </>
      )}

      <button className="btn-primary" onClick={nextStep}>
        {step === 3 ? `Continue with ${voice} · ${briefLength}` : 'Continue →'}
      </button>
    </div>
  );
}

/* --- ALL SET CONFIRMATION SCREEN --- */
function AllSetScreen({ user, onStartListening, onBackToOnboarding }) {
  const prefs = user.preferences || {};
  return (
    <div className="screen-content">
      <div className="app-header">
        <button className="icon-btn" onClick={onBackToOnboarding} title="Go back to calibration">
          ←
        </button>
        <div className="brand-logo">
          <div className="brand-bars"><span /><span /><span /></div>
          Nuzio AI
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(0, 230, 118, 0.15)',
            border: '2px solid var(--accent-green)',
            color: 'var(--accent-green)',
            fontSize: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          ✓
        </div>
        <h1 className="screen-title">You're ready,<br /><em>{user.name || 'Aarav'}.</em></h1>
        <p className="screen-subtitle">
          Your first brief will be ready tomorrow at 7:00 AM. We're already curating.
        </p>
      </div>

      <div className="summary-card">
        <div className="summary-row">
          <span className="summary-label">Profession</span>
          <span className="summary-value">{prefs.profession || 'Technology'} <span className="check-green">✓</span></span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Niches</span>
          <span className="summary-value">{(prefs.niches || []).slice(0, 2).join(', ')} +{(prefs.niches || []).length - 2} <span className="check-green">✓</span></span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Voice</span>
          <span className="summary-value">{prefs.voice || 'Aria'} — British, warm <span className="check-green">✓</span></span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Length</span>
          <span className="summary-value">{prefs.briefLength || '5 min'} ~ 10 stories <span className="check-green">✓</span></span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Delivery</span>
          <span className="summary-value">Daily at {prefs.deliveryTime || '7:00 AM'} <span className="check-green">✓</span></span>
        </div>
      </div>

      <button className="btn-primary" onClick={onStartListening}>
        Start listening →
      </button>
    </div>
  );
}

/* --- ARTICLE DETAIL SCREEN (FULL READER) --- */
function ArticleDetailScreen({ story, onBack, onPlayStory, activeStory, playing }) {
  if (!story) return null;
  const isPlaying = activeStory?.id === story.id && playing;

  return (
    <div className="screen-content">
      <div className="app-header">
        <button className="icon-btn" onClick={onBack} title="Go back">
          ←
        </button>
        <div className="brand-logo">
          <div className="brand-bars"><span /><span /><span /></div>
          Nuzio AI
        </div>
      </div>

      <button
        className="skip-btn"
        style={{ textAlign: 'left', marginBottom: '16px', color: 'var(--primary)', fontWeight: 800, fontSize: '14px' }}
        onClick={onBack}
      >
        ← Back to briefing
      </button>

      <div className="brief-status-tag" style={{ background: 'rgba(108, 92, 231, 0.15)', borderColor: 'var(--primary)', color: 'var(--primary)', marginBottom: '14px' }}>
        <span>{story.topic} · {story.minutes} MIN AUDIO READ</span>
      </div>

      <h1 className="screen-title" style={{ fontSize: '24px', lineHeight: '1.3', marginBottom: '12px' }}>
        {story.title}
      </h1>

      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
        By <strong>{story.author || 'Editorial Desk'}</strong> · {story.source} · {story.time}
      </div>

      <div className="now-playing-card" style={{ marginBottom: '24px' }}>
        <div className="now-playing-header">AUDIO SUMMARY</div>
        <p className="now-playing-deck" style={{ fontSize: '13.5px', color: '#FFF', marginBottom: '16px' }}>{story.deck}</p>
        <button className="btn-primary" onClick={() => onPlayStory(story)}>
          {isPlaying ? '❚❚ Pause Narration' : '▶ Listen to audio'}
        </button>
      </div>

      <div className="article-body-text" style={{ fontSize: '14.5px', lineHeight: '1.75', color: '#DDD', marginBottom: '32px' }}>
        {story.body}
      </div>

      <button className="btn-secondary" style={{ marginBottom: '24px' }} onClick={onBack}>
        ← Back to briefing
      </button>
    </div>
  );
}

/* --- PLAYABLE AUDIO PLAYER LOGIC & MORNING BRIEF VIEW --- */
function BriefingView({ stories, user, activeStory, playing, progress, onSelectStory, onOpenArticle, onTogglePlay, onSkipTime }) {
  const currentStory = activeStory || stories[0];

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="app-header">
        <div className="brand-logo">
          <div className="brand-bars"><span /><span /><span /></div>
          Nuzio AI
        </div>
        <div className="header-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🔔</button>
        </div>
      </div>

      <div className="brief-status-tag">
        <span className="live-dot" />
        <span>Audio Live · Voice: {user.preferences?.voice || 'Aria'} · {stories.length} stories</span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
          SUNDAY · 12 JULY · MORNING BRIEF
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '2px' }}>
          Good morning, {user.name?.split(' ')[0] || 'Aarav'} — {stories.length} things.
        </h2>
      </div>

      {/* Featured Now Playing Audio Player Card */}
      {currentStory && (
        <div className="now-playing-card">
          <div className="now-playing-header">
            <span>NOW PLAYING · {currentStory.topic?.toUpperCase()}</span>
            <span>01 / 0{stories.length}</span>
          </div>
          <div className="now-playing-title" style={{ cursor: 'pointer' }} onClick={() => onOpenArticle(currentStory)}>
            {currentStory.title}
          </div>
          <div className="now-playing-deck" style={{ cursor: 'pointer' }} onClick={() => onOpenArticle(currentStory)}>
            {currentStory.deck || currentStory.body}
          </div>

          {/* Waveform Visualizer */}
          <div className={`waveform-container ${playing ? 'playing' : ''}`}>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>

          {/* Player Progress Bar */}
          <div className="scrub-bar" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            onSkipTime(pct);
          }}>
            <div className="scrub-progress" style={{ width: `${progress}%` }} />
          </div>

          <div className="player-timestamps">
            <span>02:14</span>
            <span>{currentStory.minutes || 3}:00</span>
          </div>

          {/* Audio Controls */}
          <div className="player-controls">
            <button className="control-btn" onClick={() => onSkipTime(Math.max(0, progress - 10))}>↺10</button>
            <button className="play-main-btn" onClick={() => onTogglePlay(currentStory)}>
              {playing ? '❚❚' : '▶'}
            </button>
            <button className="control-btn" onClick={() => onSkipTime(Math.min(100, progress + 10))}>10↻</button>
          </div>
        </div>
      )}

      {/* Story Queue List */}
      <div className="queue-header">UP NEXT IN YOUR BRIEF</div>
      {stories.map(s => (
        <div
          key={s.id}
          className="queue-card"
          onClick={() => { onOpenArticle(s); }}
        >
          <div className="play-small-icon" onClick={(e) => { e.stopPropagation(); onSelectStory(s); onTogglePlay(s); }}>
            {activeStory?.id === s.id && playing ? '❚❚' : '▶'}
          </div>
          <div style={{ flex: 1 }}>
            <div className="queue-tag">{s.topic} · {s.minutes} MIN</div>
            <div className="queue-title">{s.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --- DISCOVER FEED SCREEN --- */
function DiscoverView({ stories, onPlayStory, onOpenArticle, activeStory, playing }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'AI & Tech', 'Markets', 'Startups', 'Indian Business', 'Science', 'Geopolitics', 'Health & Medicine', 'Climate & Energy'];

  const filtered = stories.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.deck.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeTab === 'All' || s.topic === activeTab;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="screen-content">
      <div className="app-header">
        <div className="brand-logo">
          <div className="brand-bars"><span /><span /><span /></div>
          Nuzio AI
        </div>
        <div className="header-actions">
          <button className="icon-btn">🔔</button>
        </div>
      </div>

      <h1 className="screen-title" style={{ fontSize: '24px' }}>Discover</h1>
      <p className="screen-subtitle" style={{ marginBottom: '16px' }}>Inshorts-style — swipe the world.</p>

      {/* Search Input */}
      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search stories, sources, topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="category-scroll">
        {categories.map(c => (
          <div
            key={c}
            className={`cat-pill ${activeTab === c ? 'active' : ''}`}
            onClick={() => setActiveTab(c)}
          >
            {c}
          </div>
        ))}
      </div>

      {/* Feed Story Cards */}
      <div className="news-feed-container" style={{ marginTop: '14px' }}>
        {filtered.map(s => (
          <div key={s.id} className="feed-card" onClick={() => onOpenArticle(s)}>
            <div className="feed-meta">
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.topic}</span>
              <span>{s.source} · {s.time}</span>
            </div>
            <div className="feed-title">{s.title}</div>
            <div className="feed-deck">{s.deck}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.minutes} MIN AUDIO READ</span>
              <button
                className="btn-primary"
                style={{ width: 'auto', padding: '8px 16px', fontSize: '12px', borderRadius: '99px' }}
                onClick={(e) => { e.stopPropagation(); onPlayStory(s); }}
              >
                {activeStory?.id === s.id && playing ? '❚❚ Pause' : '▶ Play audio'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- SETTINGS SCREEN --- */
function SettingsView({ user, onRecalibrate, onOpenPlans, onSignOut }) {
  const [offline, setOffline] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [push, setPush] = useState(true);

  return (
    <div className="screen-content">
      <div className="app-header">
        <div className="brand-logo">
          <div className="brand-bars"><span /><span /><span /></div>
          Nuzio AI
        </div>
      </div>

      <h1 className="screen-title" style={{ fontSize: '24px' }}>Settings</h1>
      <p className="screen-subtitle" style={{ marginBottom: '16px' }}>Tune your morning.</p>

      {/* Profile Box */}
      <div className="profile-box">
        <div className="profile-avatar">{user.name ? user.name[0] : 'A'}</div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h3>{user.name || 'Aarav Sharma'}</h3>
          <p>{user.preferences?.profession || 'Technology'} · Mumbai, India</p>
        </div>
        <button className="skip-btn" style={{ color: 'var(--primary)' }} onClick={onRecalibrate}>Edit</button>
      </div>

      {/* Plan Banner */}
      <div className="plan-banner">
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800 }}>{user.preferences?.plan || 'Free'} Plan</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Standard audio briefs</div>
        </div>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '8px 14px', fontSize: '12px', borderRadius: '99px' }}
          onClick={onOpenPlans}
        >
          Upgrade
        </button>
      </div>

      {/* Settings Items */}
      <div className="setting-group-title">AUDIO & DOWNLOADS</div>
      <div className="setting-item">
        <span>Offline mode</span>
        <div className={`toggle-switch ${offline ? 'on' : ''}`} onClick={() => setOffline(!offline)} />
      </div>
      <div className="setting-item">
        <span>Auto-advance next story</span>
        <div className={`toggle-switch ${autoAdvance ? 'on' : ''}`} onClick={() => setAutoAdvance(!autoAdvance)} />
      </div>

      <div className="setting-group-title">NOTIFICATIONS</div>
      <div className="setting-item">
        <span>Push notifications</span>
        <div className={`toggle-switch ${push ? 'on' : ''}`} onClick={() => setPush(!push)} />
      </div>

      <button
        className="btn-secondary"
        style={{ marginTop: '24px', borderColor: 'rgba(255, 75, 75, 0.4)', color: '#FF4B4B' }}
        onClick={onSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}

/* --- PLAN & BILLING MODAL (FIGMA SCREEN 13) --- */
function PlanBillingModal({ user, onUpdatePlan, onClose }) {
  const [cycle, setCycle] = useState('monthly'); // monthly | annual
  const [selectedPlan, setSelectedPlan] = useState(user?.preferences?.plan || 'Free');
  const [subscribed, setSubscribed] = useState(false);

  function handleSelect(planName) {
    setSelectedPlan(planName);
    setSubscribed(true);
    if (onUpdatePlan) {
      onUpdatePlan(planName);
    }
    setTimeout(() => {
      setSubscribed(false);
    }, 1800);
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0A0A12',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 20px',
        overflowY: 'auto'
      }}
    >
      <div className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="icon-btn" onClick={onClose} title="Go back">←</button>
          <div>
            <div className="step-label">MEMBERSHIP</div>
            <h1 className="screen-title" style={{ fontSize: '22px', margin: 0 }}>Plan & billing</h1>
          </div>
        </div>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>
      <p className="screen-subtitle" style={{ marginBottom: '16px' }}>Start free. Upgrade anytime for unlimited audio briefs.</p>

      {/* Billing Cycle Toggle */}
      <div className="billing-toggle-container">
        <button
          className={`billing-toggle-btn ${cycle === 'monthly' ? 'active' : ''}`}
          onClick={() => setCycle('monthly')}
        >
          Monthly
        </button>
        <button
          className={`billing-toggle-btn ${cycle === 'annual' ? 'active' : ''}`}
          onClick={() => setCycle('annual')}
        >
          Annual <span className="billing-save-badge">SAVE 35%</span>
        </button>
      </div>

      {subscribed && (
        <div
          style={{
            background: 'rgba(0, 230, 118, 0.15)',
            border: '1px solid var(--accent-green)',
            color: 'var(--accent-green)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-lg)',
            fontSize: '13px',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '16px'
          }}
        >
          ✓ Successfully updated subscription to {selectedPlan}!
        </div>
      )}

      {/* Free Plan Card */}
      <div
        className={`plan-card-redesigned ${selectedPlan === 'Free' ? 'featured' : ''}`}
        onClick={() => handleSelect('Free')}
      >
        <div className="plan-title-row">
          <div>
            <div className="plan-name">Free</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Essential morning briefings</div>
          </div>
          <div className="plan-price-large">
            ₹0 <span className="plan-price-period">/mo</span>
          </div>
        </div>
        <ul className="plan-features-list">
          <li><span className="check-icon">✓</span> 5 audio story summaries per day</li>
          <li><span className="check-icon">✓</span> Standard narrator voice (Aria)</li>
          <li><span className="check-icon">✓</span> Daily morning briefing push notifications</li>
        </ul>
        <button className="btn-secondary" style={{ marginTop: '8px' }}>
          {selectedPlan === 'Free' ? 'Current Plan' : 'Select Free'}
        </button>
      </div>

      {/* Pro Plan Card (Featured) */}
      <div
        className={`plan-card-redesigned featured`}
        onClick={() => handleSelect('Pro')}
      >
        <div className="plan-badge-top">MOST POPULAR</div>
        <div className="plan-title-row">
          <div>
            <div className="plan-name" style={{ color: 'var(--primary)' }}>Pro</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Unlimited custom audio news</div>
          </div>
          <div className="plan-price-large">
            {cycle === 'annual' ? '₹59' : '₹79'} <span className="plan-price-period">/mo</span>
          </div>
        </div>
        <ul className="plan-features-list">
          <li><span className="check-icon">✓</span> Unlimited custom audio briefs</li>
          <li><span className="check-icon">✓</span> All HD Narrator Voices (Aria, Kai, Meera)</li>
          <li><span className="check-icon">✓</span> Offline audio downloads for commute</li>
          <li><span className="check-icon">✓</span> Hyperlocal city news & breaking story alerts</li>
          <li><span className="check-icon">✓</span> Priority AI summarization engine</li>
        </ul>
        <button className="btn-primary" style={{ marginTop: '8px' }}>
          {selectedPlan === 'Pro' ? '✓ Active Pro Plan' : 'Upgrade to Pro →'}
        </button>
      </div>

      {/* Annual / Enterprise Card */}
      <div
        className={`plan-card-redesigned ${selectedPlan === 'Ultra' ? 'featured' : ''}`}
        onClick={() => handleSelect('Ultra')}
      >
        <div className="plan-title-row">
          <div>
            <div className="plan-name">Ultra Annual</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Best value for professionals</div>
          </div>
          <div className="plan-price-large">
            ₹1,499 <span className="plan-price-period">/yr</span>
          </div>
        </div>
        <ul className="plan-features-list">
          <li><span className="check-icon">✓</span> Everything in Pro tier included</li>
          <li><span className="check-icon">✓</span> Team sharing up to 5 family/work profiles</li>
          <li><span className="check-icon">✓</span> Ad-free experience & early access features</li>
        </ul>
        <button className="btn-secondary" style={{ marginTop: '8px' }}>
          {selectedPlan === 'Ultra' ? '✓ Active Plan' : 'Choose Annual Ultra'}
        </button>
      </div>

      <button className="btn-secondary" style={{ marginTop: '12px' }} onClick={onClose}>
        ← Back to settings
      </button>
    </div>
  );
}

/* --- MAIN CONTAINER COMPONENT --- */
function App() {
  const [token, setToken] = useState(() => localStorage.getItem('nuzio_token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('nuzio_user') || 'null'));
  const [screen, setScreen] = useState('splash'); // splash, language, auth, onboarding, allset, app, article
  const [activeTab, setActiveTab] = useState('briefing'); // briefing, discover, settings
  
  // Initialize with fallback stories so stories array is NEVER empty
  const [stories, setStories] = useState(fallbackStories);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Playable audio state powered by Web Speech API
  const [activeStory, setActiveStory] = useState(fallbackStories[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef(null);

  // Fetch stories from API with automatic fallback
  async function loadNews(activeToken = token) {
    try {
      const data = await api('/api/news', {}, activeToken);
      if (data.briefing && data.briefing.length > 0) {
        setStories(data.briefing);
        setActiveStory(data.briefing[0]);
      } else {
        setStories(fallbackStories);
        setActiveStory(fallbackStories[0]);
      }
    } catch (e) {
      console.warn('Backend API un-reachable, using rich fallback news dataset:', e.message);
      setStories(fallbackStories);
      setActiveStory(fallbackStories[0]);
    }
  }

  useEffect(() => {
    loadNews(token);
  }, [token]);

  // Audio speech synthesis handler
  function togglePlay(story) {
    const targetStory = story || activeStory || stories[0];
    if (!targetStory) return;

    setActiveStory(targetStory);

    if ('speechSynthesis' in window) {
      if (playing && activeStory?.id === targetStory.id) {
        window.speechSynthesis.pause();
        setPlaying(false);
        clearInterval(timerRef.current);
      } else if (!playing && activeStory?.id === targetStory.id && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setPlaying(true);
        startTimer();
      } else {
        window.speechSynthesis.cancel();
        clearInterval(timerRef.current);
        setProgress(0);

        const textToRead = `${targetStory.title}. ${targetStory.deck || ''}. ${targetStory.body || ''}`;
        const u = new SpeechSynthesisUtterance(textToRead);

        // Map user voice preference
        const voicePref = user?.preferences?.voice || 'Aria';
        const vObj = voices.find(v => v.name === voicePref);
        u.rate = vObj ? vObj.rate : 1.0;
        u.pitch = vObj ? vObj.pitch : 1.0;

        u.onend = () => {
          setPlaying(false);
          setProgress(100);
          clearInterval(timerRef.current);
        };

        window.speechSynthesis.speak(u);
        setPlaying(true);
        startTimer();
      }
    }
  }

  function startTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          setPlaying(false);
          return 100;
        }
        return prev + 1.2;
      });
    }, 1000);
  }

  function skipTime(newPct) {
    setProgress(newPct);
  }

  function openArticle(story) {
    setSelectedArticle(story);
    setScreen('article');
  }

  function handleAuthSuccess(data) {
    localStorage.setItem('nuzio_token', data.token);
    localStorage.setItem('nuzio_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    loadNews(data.token);
    setScreen('onboarding');
  }

  function handleOnboardingComplete(newPrefs) {
    const updatedUser = {
      ...user,
      preferences: { ...(user?.preferences || {}), ...newPrefs }
    };
    setUser(updatedUser);
    localStorage.setItem('nuzio_user', JSON.stringify(updatedUser));

    if (token) {
      api('/api/preferences', { method: 'PUT', body: JSON.stringify({ preferences: newPrefs }) }, token).catch(console.error);
    }

    setScreen('allset');
  }

  function signOut() {
    window.speechSynthesis?.cancel();
    clearInterval(timerRef.current);
    localStorage.removeItem('nuzio_token');
    localStorage.removeItem('nuzio_user');
    setToken(null);
    setUser(null);
    setScreen('auth');
  }

  return (
    <div className="app-container">
      {/* Screen Router */}
      {screen === 'splash' && (
        <SplashScreen onStart={() => setScreen(token ? 'app' : 'language')} />
      )}

      {screen === 'language' && (
        <LanguageLocationScreen
          onNext={(data) => {
            setUser(prev => ({ ...prev, preferences: { ...data } }));
            setScreen('auth');
          }}
          onBack={() => setScreen('splash')}
        />
      )}

      {screen === 'auth' && (
        <AuthScreen
          onAuth={handleAuthSuccess}
          onBack={() => setScreen('language')}
        />
      )}

      {screen === 'onboarding' && (
        <OnboardingFlow
          prefs={user?.preferences || {}}
          onComplete={handleOnboardingComplete}
          onSkip={() => setScreen('app')}
          onBackToAuth={() => setScreen('auth')}
        />
      )}

      {screen === 'allset' && (
        <AllSetScreen
          user={user || { name: 'Aarav' }}
          onStartListening={() => setScreen('app')}
          onBackToOnboarding={() => setScreen('onboarding')}
        />
      )}

      {screen === 'article' && selectedArticle && (
        <ArticleDetailScreen
          story={selectedArticle}
          onBack={() => setScreen('app')}
          onPlayStory={togglePlay}
          activeStory={activeStory}
          playing={playing}
        />
      )}

      {screen === 'app' && (
        <>
          {activeTab === 'briefing' && (
            <BriefingView
              stories={stories}
              user={user || { name: 'Aarav' }}
              activeStory={activeStory}
              playing={playing}
              progress={progress}
              onSelectStory={(s) => setActiveStory(s)}
              onOpenArticle={openArticle}
              onTogglePlay={togglePlay}
              onSkipTime={skipTime}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoverView
              stories={stories}
              onPlayStory={togglePlay}
              onOpenArticle={openArticle}
              activeStory={activeStory}
              playing={playing}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              user={user || { name: 'Aarav' }}
              onRecalibrate={() => setScreen('onboarding')}
              onOpenPlans={() => setShowPlans(true)}
              onSignOut={signOut}
            />
          )}

          {/* Bottom Navigation Bar */}
          <div className="bottom-nav">
            <button
              className={`nav-tab ${activeTab === 'discover' ? 'active' : ''}`}
              onClick={() => setActiveTab('discover')}
            >
              <span className="tab-icon">🧭</span>
              <span>Discover</span>
            </button>

            <button
              className={`nav-tab briefing-tab ${activeTab === 'briefing' ? 'active' : ''}`}
              onClick={() => setActiveTab('briefing')}
            >
              <div className="tab-icon-bg">
                {playing ? '❚❚' : '▶'}
              </div>
              <span>Briefing</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="tab-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>

          {/* Plan & Billing Overlay */}
          {showPlans && (
            <PlanBillingModal
              user={user}
              onUpdatePlan={(newPlan) => {
                const updated = { ...user, preferences: { ...(user?.preferences || {}), plan: newPlan } };
                setUser(updated);
                localStorage.setItem('nuzio_user', JSON.stringify(updated));
              }}
              onClose={() => setShowPlans(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
