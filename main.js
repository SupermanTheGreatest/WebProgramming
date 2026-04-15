/* ============================================================
   TrialBridge — main.js
   Consolidated JavaScript for all pages.
   Loaded via: <script src="main.js" defer></script>
   Supabase CDN must be loaded before this file.
   ============================================================ */

// ── Supabase Config ───────────────────────────────────────────
const SUPABASE_URL  = 'https://cflrajzjlphqacrjutcz.supabase.co';
const SUPABASE_ANON = 'sb_publishable_tK-HD0ODb5LM0TWZKRS5wg_xVch6VYs';

let _sb = null;
function getSB() {
    if (!_sb) {
        if (!window.supabase) {
            showError('Auth service still loading — wait a moment then try again.');
            return null;
        }
        _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    }
    return _sb;
}

// ── Shared error helpers (used by login.html) ─────────────────
function showError(msg) {
    let el = document.getElementById('authError');
    if (!el) {
        el = document.createElement('p');
        el.id = 'authError';
        el.style.cssText = 'color:#E76F51;font-size:.85rem;text-align:center;margin-top:12px;font-family:Outfit,sans-serif;';
        const card = document.querySelector('.login-card');
        if (card) card.appendChild(el);
    }
    if (el) el.textContent = msg;
}
function clearError() {
    const el = document.getElementById('authError');
    if (el) el.textContent = '';
}

// ── Nav Profile Avatar (runs on every page that has #navCta) ──
async function initNavProfile() {
    const sb = getSB();
    if (!sb) return;
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return;
    const u    = session.user;
    const name = u.user_metadata?.full_name || u.email.split('@')[0];
    const init = name.charAt(0).toUpperCase();
    const cta  = document.getElementById('navCta');
    if (!cta) return;
    cta.outerHTML = `
      <div class="nav-profile" tabindex="0">
        <div class="nav-avatar">${init}</div>
        <div class="nav-profile-dropdown">
          <div class="nav-profile-name">${name}</div>
          <div class="nav-profile-email">${u.email}</div>
          <a href="profile.html">View Profile</a>
          <a href="#" class="signout-link" onclick="handleSignOut();return false;">Sign Out</a>
        </div>
      </div>`;
}

async function handleSignOut() {
    const sb = getSB();
    if (sb) await sb.auth.signOut();
    window.location.reload();
}

// ── Login Page ───────────────────────────────────────────────
// Redirect destination: ?redirect=find-trials.html
const _redirectTo = new URLSearchParams(window.location.search).get('redirect') || 'profile.html';

function switchTab(tab) {
    const si = document.getElementById('signinForm');
    const su = document.getElementById('signupForm');
    if (!si || !su) return;
    si.classList.toggle('hidden', tab !== 'signin');
    su.classList.toggle('hidden', tab !== 'signup');
    document.getElementById('tabSignIn')?.classList.toggle('active', tab === 'signin');
    document.getElementById('tabSignUp')?.classList.toggle('active', tab === 'signup');
    clearError();
}

async function handleSignIn(e) {
    e.preventDefault();
    const sb    = getSB(); if (!sb) return;
    const btn   = document.getElementById('signinBtn');
    const email = document.getElementById('loginEmail')?.value.trim();
    const pass  = document.getElementById('loginPassword')?.value;
    if (!email || !pass) { showError('Please enter your email and password.'); return; }
    btn.textContent = 'Signing in…'; btn.disabled = true; clearError();
    const { error } = await sb.auth.signInWithPassword({ email, password: pass });
    if (error) { showError(error.message); btn.textContent = 'Sign In →'; btn.disabled = false; }
    else { window.location.href = _redirectTo; }
}

async function handleSignUp(e) {
    e.preventDefault();
    const sb    = getSB(); if (!sb) return;
    const btn   = document.getElementById('signupBtn');
    const name  = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const pass  = document.getElementById('signupPassword')?.value;
    if (!name || !email || !pass) { showError('Please fill in all fields.'); return; }
    if (pass.length < 8) { showError('Password must be at least 8 characters.'); return; }
    btn.textContent = 'Creating account…'; btn.disabled = true; clearError();
    const { error } = await sb.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
    if (error) { showError(error.message); btn.textContent = 'Create Account →'; btn.disabled = false; }
    else { btn.textContent = '✓ Check your email to confirm!'; btn.style.background = 'var(--success)'; }
}

async function signInWithGoogle() {
    clearError();
    if (window.location.protocol === 'file:') {
        showError('⚠ Google sign-in needs a web server. Open via Live Server or deploy the site first.');
        return;
    }
    const sb = getSB(); if (!sb) return;
    let basePath = window.location.pathname.replace('login.html', '');
    if (!basePath.endsWith('/')) basePath += '/';
    const { error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + basePath + _redirectTo }
    });
    if (error) showError(error.message);
}

async function sendPasswordReset(e) {
    e.preventDefault();
    const sb = getSB(); if (!sb) return;
    const email = document.getElementById('loginEmail')?.value.trim();
    if (!email) { showError('Enter your email address above first.'); return; }
    clearError();
    const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login.html'
    });
    if (error) showError(error.message);
    else showError('✓ Password reset email sent!');
}

// ── Profile Page ─────────────────────────────────────────────
async function initProfilePage() {
    const sb = getSB();
    if (!sb) return;
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { window.location.href = 'login.html?redirect=profile.html'; return; }
    const user     = session.user;
    const fullName = user.user_metadata?.full_name || 'Patient';
    const initial  = fullName.charAt(0).toUpperCase();
    const card     = document.getElementById('profileCard');
    if (!card) return;
    card.innerHTML = `
      <div class="profile-avatar">${initial}</div>
      <div>
        <h2 style="font-family:'DM Serif Display',serif;font-size:1.8rem;">${fullName}</h2>
        <p style="color:var(--muted);font-size:.95rem;">Active TrialBridge Member</p>
      </div>
      <div style="display:grid;gap:16px;margin-top:16px;">
        <div class="data-group">
          <div><label>Email Address</label><div class="val">${user.email}</div></div>
          <span>✓ Verified</span>
        </div>
        <div class="data-group">
          <div><label>Account Created</label><div class="val">${new Date(user.created_at).toLocaleDateString()}</div></div>
        </div>
      </div>
      <button class="logout-btn" onclick="handleLogout()">Sign Out securely</button>`;
}

async function handleLogout() {
    const sb = getSB();
    if (sb) await sb.auth.signOut();
    window.location.href = 'index.html';
}

// ── Find Trials Page ──────────────────────────────────────────
let _activeFilter = 'All';

function applyTrial(name) {
    window.location.href = 'login.html?redirect=find-trials.html&trial=' + encodeURIComponent(name);
}

function setFilter(status, el) {
    _activeFilter = status;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    filterTrials();
}

function filterTrials() {
    const q = (document.getElementById('trialSearch')?.value || '').toLowerCase();
    document.querySelectorAll('.trial-card').forEach(card => {
        const keywords   = (card.dataset.keywords || '') + ' ' + (card.querySelector('h3')?.textContent || '');
        const statusMatch  = _activeFilter === 'All' || card.dataset.status === _activeFilter;
        const keywordMatch = !q || keywords.toLowerCase().includes(q);
        card.style.display = (statusMatch && keywordMatch) ? '' : 'none';
    });
}

// ── How It Works Page scroll & reveals ────────────────────────
function initHowItWorks() {
    const progressBar  = document.getElementById('progressBar');
    const timelineFill = document.getElementById('timelineFill');
    const finalCta     = document.getElementById('finalCta');
    const steps        = document.querySelectorAll('.step');
    if (!steps.length) return;

    function onScroll() {
        const pct = Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100);
        if (progressBar) progressBar.style.width = pct + '%';
        const vc = document.querySelectorAll('.step.visible').length;
        if (timelineFill) timelineFill.style.height = ((vc / steps.length) * 100) + '%';
    }
    window.addEventListener('scroll', onScroll);

    const stepObs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('visible');
                const vc = document.querySelectorAll('.step.visible').length;
                if (timelineFill) timelineFill.style.height = ((vc / steps.length) * 100) + '%';
            }
        });
    }, { threshold: 0.25, rootMargin: '0px 0px -60px 0px' });
    steps.forEach(s => stepObs.observe(s));

    if (finalCta) {
        new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.3 }).observe(finalCta);
    }
}

// ── Scroll reveal (About + MedStudies) ───────────────────────
function initScrollReveal(selector) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll(selector).forEach(el => obs.observe(el));
}

// ── MedStudies filter tabs ────────────────────────────────────
function initMedStudiesFilters() {
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ── Find Trials scroll progress bar ──────────────────────────
function initScrollProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = Math.min(pct, 100) + '%';
    });
}

// ── Login page: skip if already signed in ────────────────────
async function initLoginPage() {
    const sb = getSB();
    if (!sb) return;
    const { data: { session } } = await sb.auth.getSession();
    if (session) window.location.href = _redirectTo;
}

// ============================================================
// AUTO-INIT — detects which page we're on and runs the right code
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // Nav profile avatar on all pages (except login itself)
    if (!path.endsWith('login.html')) {
        initNavProfile();
    }

    // Login page
    if (path.endsWith('login.html')) {
        initLoginPage();
    }

    // Profile page
    if (path.endsWith('profile.html')) {
        initProfilePage();
    }

    // How It Works
    if (path.endsWith('how-it-works.html')) {
        initHowItWorks();
    }

    // About
    if (path.endsWith('about.html')) {
        initScrollReveal('.reveal, .value-card, .team-card');
    }

    // Medical Studies
    if (path.endsWith('medstudies.html')) {
        initScrollReveal('.study-card, .reveal');
        initMedStudiesFilters();
    }

    // Find Trials
    if (path.endsWith('find-trials.html')) {
        initScrollProgressBar();
    }
});
