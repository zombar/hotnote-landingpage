/* hotnote landing page — main.js */

// ── Theme toggle ────────────────────────────────────────────────────────────
const THEME_KEY = 'hotnote-landing-theme';

function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
}

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Sun icon for dark (click → go light), moon icon for light (click → go dark)
    if (theme === 'dark') {
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        btn.title = 'Switch to light theme';
    } else {
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        btn.title = 'Switch to dark theme';
    }
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || getSystemTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Init icon on load
updateThemeIcon(document.documentElement.getAttribute('data-theme') || getSystemTheme());

// ── Demo tab toggle ──────────────────────────────────────────────────────────
const tabSource = document.getElementById('tab-source');
const tabPreview = document.getElementById('tab-preview');
const demoSource = document.getElementById('demo-source');
const demoPreview = document.getElementById('demo-preview');

function setDemoTab(tab) {
    if (tab === 'source') {
        tabSource?.classList.add('active');
        tabPreview?.classList.remove('active');
        demoSource?.classList.add('active');
        demoPreview?.classList.remove('active');
    } else {
        tabPreview?.classList.add('active');
        tabSource?.classList.remove('active');
        demoPreview?.classList.add('active');
        demoSource?.classList.remove('active');
    }
}

tabSource?.addEventListener('click', () => setDemoTab('source'));
tabPreview?.addEventListener('click', () => setDemoTab('preview'));

// ── CVD filter toggle ────────────────────────────────────────────────────────
const cvdStrip = document.querySelector('.cvd-left-strip');
const cvdBtns = document.querySelectorAll('.cvd-btn');

cvdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cvdBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cvdStrip?.classList.remove('filter-deuteranopia', 'filter-protanopia');
        const f = btn.dataset.filter;
        if (f && f !== 'normal') {
            cvdStrip?.classList.add(`filter-${f}`);
        }
    });
});

// ── Scroll animation (IntersectionObserver) ──────────────────────────────────
const cards = document.querySelectorAll('.feature-card');

if (cards.length && 'IntersectionObserver' in window) {
    let visibleCount = 0;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                visibleCount++;
                if (visibleCount >= cards.length) observer.disconnect();
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.06}s`;
        observer.observe(card);
    });
}

// ── Smooth scroll ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
