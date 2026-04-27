/**
 * AquaTrack Global Header Component v2.0
 * Now supports recursive navigation flow. 
 */

import { logout } from './auth.js';
import { setTheme, initTheme } from './utils.js';

const sunPath = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const backChevron = '<polyline points="15 18 9 12 15 6"></polyline>';
const brandDrop = '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>';

/**
 * @param {string} roleName - Label for the role.
 * @param {string} backLink - Optional path to the parent page (e.g., 'dashboard.html').
 */
export const injectHeader = (roleName, backLink = null) => {
    const header = document.querySelector('header');
    if (!header) return;

    // 1. Determine Left Side (Logo or Back Button)
    const leftContent = backLink 
        ? `<button class="btn-icon" onclick="window.location.href='${backLink}'" aria-label="Go Back" style="box-shadow: none; background: transparent; border: none;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${backChevron}</svg>
           </button>`
        : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${brandDrop}</svg>`;

    // 2. Inject the HTML Structure
    header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            ${leftContent}
            <span style="font-weight: 900; letter-spacing: -0.04em; font-size: 1.1rem;">
                AquaTrack <span style="color: var(--text-muted); font-weight: 500; font-size: 0.9rem; letter-spacing: 0;">${roleName}</span>
            </span>
        </div>
        
        <div class="header-actions">
            <button class="btn-icon" id="theme-toggle" aria-label="Toggle Theme">
                <svg id="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
            </button>
            <button class="btn btn-secondary" id="logout-btn" style="width: auto; padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 700;">
                Logout
            </button>
        </div>
    `;

    // 3. Setup Logic
    const updateIcon = (theme) => {
        const iconEl = document.getElementById('theme-icon');
        if (iconEl) iconEl.innerHTML = theme === 'dark' ? sunPath : moonPath;
    };

    initTheme();
    updateIcon(document.documentElement.dataset.theme);

    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.onclick = () => {
        const current = document.documentElement.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        updateIcon(next);
    };

    document.getElementById('logout-btn').onclick = logout;
};
