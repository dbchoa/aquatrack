/**
 * AquaTrack Global Header Component v4.6
 * DNA: Compact Gamer HUD, Horizontal Split, and Logout Integration.
 */
import { logout } from './auth.js';
import { setTheme } from './utils.js';

const sunPath = `<path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`;
const moonPath = `<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`;

export const injectHeader = (roleName) => {
    const header = document.querySelector('header');
    if (!header) return;

    header.className = "fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300";
    
    header.innerHTML = `
        <div class="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-water rounded-lg flex items-center justify-center shadow-lg shadow-water/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-bold tracking-tighter dark:text-white">Aqua<span class="text-water">Track</span></span>
                    <span class="text-[8px] uppercase tracking-[0.15em] text-slate-400 font-bold leading-none">${roleName}</span>
                </div>
            </div>

            <div class="flex items-center gap-1">
                <button id="theme-toggle" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <svg id="theme-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-500 dark:text-amber-400">
                        ${document.documentElement.classList.contains('dark') ? sunPath : moonPath}
                    </svg>
                </button>
                <button id="logout-btn" class="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 group transition-colors">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400 group-hover:text-red-500">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </div>
    `;

    // 1. Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    const iconEl = document.getElementById('theme-icon');
    
    themeBtn.onclick = () => {
        const isDark = document.documentElement.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
        iconEl.innerHTML = next === 'dark' ? sunPath : moonPath;
        iconEl.className = next === 'dark' ? 'text-amber-400' : 'text-slate-500';
    };

    // 2. Logout Logic
    document.getElementById('logout-btn').onclick = () => logout();
};
