/**
 * AquaTrack Global Header Component v4.5
 * DNA: Tailwind Integrated, Hybrid Theme Sync, and Recursive Navigation.
 */
import { logout } from './auth.js';
import { setTheme, initTheme } from './utils.js';

// Athletic SVG Definitions
const sunPath = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />';
const moonPath = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />';
const backChevron = '<path d="M15 18l-6-6 6-6" />';
const brandDrop = '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />';

/**
 * @param {string} roleName - Label for the role context (e.g., "Reader Dashboard").
 * @param {string} backLink - Optional path for the back button.
 */
export const injectHeader = (roleName, backLink = null) => {
    const header = document.querySelector('header');
    if (!header) return;

    // Apply Tailwind wrapper classes to the header element itself
    header.className = "fixed top-0 left-0 w-full z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300";

    const leftContent = backLink 
        ? `<a href="${backLink}" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 haptic group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-600 dark:text-slate-300 group-active:scale-90 transition-transform">${backChevron}</svg>
           </a>`
        : `<div class="p-2 bg-water/10 rounded-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--water, #4facfe)">${brandDrop}</svg>
           </div>`;

    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                ${leftContent}
                <div class="flex flex-col">
                    <span class="text-sm font-bold tracking-tight text-slate-800 dark:text-white">AquaTrack</span>
                    <span class="text-[10px] uppercase tracking-widest font-bold text-water opacity-80">${roleName}</span>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <button id="theme-toggle" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors haptic">
                    <svg id="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-600 dark:text-slate-300"></svg>
                </button>
                <button id="logout-btn" class="ml-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors haptic">
                    Exit
                </button>
            </div>
        </div>
    `;

    // 1. Theme Logic
    const updateIcon = (theme) => {
        const iconEl = document.getElementById('theme-icon');
        if (iconEl) iconEl.innerHTML = theme === 'dark' ? sunPath : moonPath;
    };

    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.onclick = () => {
        const current = document.documentElement.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        updateIcon(next);
    };

    // 2. Logout Logic
    document.getElementById('logout-btn').onclick = () => logout();

    // 3. Initial Sync
    initTheme();
    updateIcon(document.documentElement.dataset.theme);
};
