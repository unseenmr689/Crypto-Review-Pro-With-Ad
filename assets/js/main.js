import { db, collection, getDocs, query, where, orderBy, limit, getDoc, doc } from './firebase.js';

// Global UI components and shared logic
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initMobileNav();
    initScrollAnimations();
});

// Search functionality
function initSearch() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = e.target.querySelector('input').value.trim();
            if (query) {
                window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Mobile Nav
function initMobileNav() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Helper to render post cards
export function renderPostCard(post) {
    const date = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : new Date(post.createdAt).toLocaleDateString();
    return `
        <article class="glass-card overflow-hidden group scroll-reveal hover:bg-white/[0.02]">
            <a href="/post.html?slug=${post.slug}" class="block h-full">
                <div class="aspect-[16/10] overflow-hidden relative">
                    <img src="${post.featuredImage || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2000'}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-primary-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="absolute top-4 left-4">
                        <span class="px-2 py-1 bg-accent-green text-primary-bg text-[9px] font-black uppercase tracking-widest rounded-sm">${post.category}</span>
                    </div>
                </div>
                <div class="p-8">
                    <span class="text-[9px] text-accent-blue/40 uppercase tracking-[0.2em] font-bold block mb-3">${date} • Database Updated</span>
                    <h3 class="text-xl font-bold mb-4 group-hover:text-accent-green transition-colors leading-tight line-clamp-2">${post.title}</h3>
                    <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                        <span>Examine Intel</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-accent-green"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                </div>
            </a>
        </article>
    `;
}

// Dynamic Header Banner logic
export function renderAds() {
    // This function can be used to inject actual ad scripts
    console.log('Ad slots ready');
}
