// ============================================================
// Nurul Ulum — Cinematic Ultra-Smooth Animation Engine v4.0
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Mobile Navigation Drawer
    // ============================================================
    const mobileMenuBtn  = document.getElementById('mobile-menu-btn');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileDrawer   = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('-translate-x-full');
        if (drawerBackdrop) {
            drawerBackdrop.classList.remove('hidden');
            requestAnimationFrame(() => {
                drawerBackdrop.classList.remove('opacity-0');
                drawerBackdrop.classList.add('opacity-100');
            });
        }
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('-translate-x-full');
        if (drawerBackdrop) {
            drawerBackdrop.classList.remove('opacity-100');
            drawerBackdrop.classList.add('opacity-0');
            setTimeout(() => drawerBackdrop.classList.add('hidden'), 350);
        }
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn)  mobileMenuBtn.addEventListener('click', openDrawer);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    const mobileUnitBtn     = document.getElementById('mobile-unit-btn');
    const mobileUnitSubmenu = document.getElementById('mobile-unit-submenu');
    const mobileUnitArrow   = document.getElementById('mobile-unit-arrow');

    if (mobileUnitBtn && mobileUnitSubmenu) {
        mobileUnitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileUnitSubmenu.classList.toggle('hidden');
            if (mobileUnitArrow) mobileUnitArrow.classList.toggle('rotate-180');
        });
    }

    // ============================================================
    // 2. Intelligent Fluid Navbar Header
    // ============================================================
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let isTicking = false;

    function onScrollHeader() {
        const currentY = window.scrollY;
        if (!header) return;

        if (currentY > 30) {
            header.classList.add('header-shrunk');
        } else {
            header.classList.remove('header-shrunk');
        }

        // Hide when scrolling down past 160px, reveal instantly when scrolling up
        if (currentY > lastScrollY && currentY > 160) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = currentY;
        isTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            requestAnimationFrame(onScrollHeader);
            isTicking = true;
        }
    }, { passive: true });

    // ============================================================
    // 3. Ultra-Smooth Scroll for Anchor Links
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                closeDrawer();
            }
        });
    });

    // ============================================================
    // 4. Video Mute / Unmute Controller
    // ============================================================
    const institutionVideo = document.getElementById('institution-video');
    const videoUnmuteBtn   = document.getElementById('video-unmute-btn');
    const videoSoundIcon   = document.getElementById('video-sound-icon');
    const videoSoundText   = document.getElementById('video-sound-text');

    if (institutionVideo && videoUnmuteBtn) {
        institutionVideo.pause();
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    institutionVideo.play().catch(() => {});
                } else {
                    institutionVideo.pause();
                }
            });
        }, { threshold: 0.25 });
        videoObserver.observe(institutionVideo);

        videoUnmuteBtn.addEventListener('click', () => {
            const muted = institutionVideo.muted;
            institutionVideo.muted = !muted;
            if (videoSoundIcon) videoSoundIcon.textContent = muted ? 'volume_up' : 'volume_off';
            if (videoSoundText) videoSoundText.textContent = muted ? 'Suara: Aktif' : 'Suara: Mati';
            videoUnmuteBtn.classList.toggle('bg-primary/10', !muted);
            videoUnmuteBtn.classList.toggle('text-primary', !muted);
            videoUnmuteBtn.classList.toggle('bg-tertiary-container', muted);
            videoUnmuteBtn.classList.toggle('text-on-tertiary-container', muted);
        });
    }

    // ============================================================
    // 5. Glowing Precision Scroll Progress Bar
    // ============================================================
    const progressBar = document.createElement('div');
    progressBar.setAttribute('aria-hidden', 'true');
    Object.assign(progressBar.style, {
        position:      'fixed',
        top:           '0',
        left:          '0',
        height:        '3px',
        width:         '0%',
        background:    'linear-gradient(90deg, #004532 0%, #1b6b51 60%, #cca730 100%)',
        zIndex:        '99999',
        pointerEvents: 'none',
        borderRadius:  '0 3px 3px 0',
        transition:    'width 0.15s ease-out',
        boxShadow:     '0 0 10px rgba(204,167,48,0.5), 0 0 4px rgba(27,107,81,0.6)'
    });
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        progressBar.style.width = pct.toFixed(2) + '%';
    }, { passive: true });

    // ============================================================
    // 6. Cinematic Blur-to-Clear Reveal (Bidirectional Scroll)
    // ============================================================
    // Mark staggered child indexes
    document.querySelectorAll(
        '.grid > *, [class*="grid-cols"] > *, [class*="flex-row"] > *'
    ).forEach((child, i) => {
        if (child.closest('header') || child.closest('footer') || child.closest('#mobile-drawer')) return;
        child.dataset.staggerIdx = i % 8;
    });

    const revealTargets = document.querySelectorAll(
        'section > div, .ambient-shadow, [class*="rounded-2xl"], [class*="rounded-3xl"], h2, h3, .grid > *, .img-zoom, #video-kegiatan, #video-profil'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const stagger = parseInt(el.dataset.staggerIdx || 0, 10);
            const delay = stagger * 45; // 45ms harmonic stagger

            if (entry.isIntersecting) {
                // Smooth Cinematic Entrance
                setTimeout(() => {
                    el.style.opacity   = '1';
                    el.style.transform = 'translate3d(0, 0, 0) scale(1)';
                    el.style.filter    = 'blur(0px)';
                }, delay);
            } else {
                // Soft Exit reset for repeating scroll up & down
                const rect = el.getBoundingClientRect();
                if (rect.top > window.innerHeight) {
                    el.style.opacity   = '0';
                    el.style.transform = 'translate3d(0, 26px, 0) scale(0.985)';
                    el.style.filter    = 'blur(4px)';
                } else if (rect.bottom < 0) {
                    el.style.opacity   = '0';
                    el.style.transform = 'translate3d(0, -26px, 0) scale(0.985)';
                    el.style.filter    = 'blur(4px)';
                }
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '50px 0px -40px 0px'
    });

    revealTargets.forEach(el => {
        if (el.closest('header') || el.closest('footer') || el.closest('#mobile-drawer')) return;
        Object.assign(el.style, {
            opacity:    '0',
            transform:  'translate3d(0, 26px, 0) scale(0.985)',
            filter:     'blur(4px)',
            transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'opacity, transform, filter'
        });
        revealObserver.observe(el);
    });

    // ============================================================
    // 7. Smooth Fluid Counter Animation
    // ============================================================
    function easeOutQuint(t) {
        return 1 - Math.pow(1 - t, 5);
    }

    function animateCounter(el, target, duration = 1900) {
        const suffix = el.dataset.suffix || '';
        const start  = performance.now();

        function step(now) {
            const p     = Math.min((now - start) / duration, 1);
            const value = Math.round(easeOutQuint(p) * target);
            el.textContent = value.toLocaleString('id-ID') + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) return;

            if (entry.isIntersecting) {
                animateCounter(el, target);
            } else {
                el.textContent = '0' + (el.dataset.suffix || '');
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // ============================================================
    // 8. Dynamic 3D Light Glow on Cards Hover
    // ============================================================
    document.querySelectorAll('.tilt-card, [class*="hover-gold-accent"]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ============================================================
    // 9. Luxurious Ink Ripple on Click
    // ============================================================
    document.querySelectorAll('.tilt-card, .ambient-shadow').forEach(card => {
        card.addEventListener('pointerdown', (e) => {
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x    = e.clientX - rect.left - size / 2;
            const y    = e.clientY - rect.top  - size / 2;

            const ink = document.createElement('span');
            Object.assign(ink.style, {
                position:      'absolute',
                left:          x + 'px',
                top:           y + 'px',
                width:         size + 'px',
                height:        size + 'px',
                borderRadius:  '50%',
                background:    'radial-gradient(circle, rgba(204,167,48,0.18) 0%, rgba(27,107,81,0.06) 60%, transparent 80%)',
                transform:     'scale(0)',
                animation:     'nu-ripple 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                pointerEvents: 'none',
                zIndex:        '1'
            });
            card.appendChild(ink);
            setTimeout(() => ink.remove(), 700);
        });
    });

    // ============================================================
    // 10. Smooth Parallax on Hero Images & Shapes
    // ============================================================
    const heroSection = document.querySelector('section:first-of-type');
    const heroBg      = heroSection?.querySelector('[style*="background-image"]');
    const floatingOrbs = document.querySelectorAll('.float-anim, .float-anim-delay');

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        if (heroBg && sy < 800) {
            heroBg.style.transform = `translate3d(0, ${sy * 0.2}px, 0)`;
        }
        floatingOrbs.forEach((orb, i) => {
            const speed = (i % 2 === 0) ? 0.03 : 0.015;
            orb.style.transform = `translate3d(0, ${sy * speed}px, 0)`;
        });
    }, { passive: true });

    // ============================================================
    // 11. Subtle Magnetic Pull on Primary Action Buttons
    // ============================================================
    document.querySelectorAll('a.pulse-ring, button.pulse-ring, a[class*="bg-primary"]').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x    = (e.clientX - rect.left - rect.width  / 2) * 0.06;
            const y    = (e.clientY - rect.top  - rect.height / 2) * 0.06;
            btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0, 0, 0)';
        });
    });

    // ============================================================
    // 12. Active Section Highlight in Navigation
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const active = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('text-primary', active);
                    link.classList.toggle('text-on-surface-variant', !active);
                });
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(s => sectionObserver.observe(s));

    // ============================================================
    // 13. Auto-load latest videos from the official YouTube channel
    // ============================================================
    let allYoutubeVideos = [];
    let displayedCount = 0;

    async function fetchAllYoutubeVideos() {
        try {
            const response = await fetch('/api/youtube-videos?limit=50');
            if (!response.ok) {
                throw new Error('Gagal mengambil data video dari kanal YouTube');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            return [];
        }
    }

    function renderYoutubeGallery(videos, count) {
        const gallery = document.getElementById('youtube-video-gallery');
        if (!gallery) return;

        if (videos.length === 0) {
            gallery.innerHTML = `
                <div class="col-span-full rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center text-sm text-on-surface-variant">
                    Video terbaru sedang tidak bisa dimuat saat ini. Silakan cek kanal YouTube resmi: <a href="https://www.youtube.com/@Media_Nurul_Ulum" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold underline">Media Nurul Ulum</a>
                </div>
            `;
            return;
        }

        const visibleVideos = videos.slice(0, count);
        gallery.innerHTML = visibleVideos.map(video => {
            const image = video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
            const title = video.title || 'Video Nurul Ulum';
            const videoId = video.videoId || '';

            return `
                <button type="button" data-video-id="${videoId}" class="youtube-video-trigger group block w-full text-left rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div class="relative overflow-hidden">
                        <img src="${image}" alt="${title}" class="w-full h-52 object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <span class="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/65 text-white px-2 py-1 text-[10px] font-medium">
                            <span class="material-symbols-outlined text-[12px]">play_circle</span>
                            YouTube
                        </span>
                    </div>
                    <div class="p-4">
                        <h5 class="text-sm md:text-base font-bold text-on-surface line-clamp-2 leading-snug">${title}</h5>
                    </div>
                </button>
            `;
        }).join('');

        // Attach click handlers to video triggers
        document.querySelectorAll('.youtube-video-trigger').forEach(button => {
            button.addEventListener('click', () => {
                const videoId = button.getAttribute('data-video-id');
                if (videoId) openYoutubeVideo(videoId);
            });
        });
    }

    async function initYoutubeGallery() {
        allYoutubeVideos = await fetchAllYoutubeVideos();
        displayedCount = 6;
        renderYoutubeGallery(allYoutubeVideos, displayedCount);
        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-youtube-videos');
        if (!loadMoreBtn) return;

        if (displayedCount >= allYoutubeVideos.length) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.5';
            loadMoreBtn.innerHTML = '<span class="material-symbols-outlined">done_all</span><span>Semua video sudah ditampilkan</span>';
        } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.style.opacity = '1';
            loadMoreBtn.innerHTML = '<span class="material-symbols-outlined">video_library</span><span>Tampilkan video lainnya</span>';
        }
    }

    const loadMoreBtn = document.getElementById('load-more-youtube-videos');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedCount += 6;
            renderYoutubeGallery(allYoutubeVideos, displayedCount);
            updateLoadMoreButton();
        });
    }

    function openYoutubeVideo(videoId) {
        const modal = document.getElementById('youtube-video-modal');
        const iframe = document.getElementById('youtube-video-iframe');
        if (!modal || !iframe) return;

        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeYoutubeVideo() {
        const modal = document.getElementById('youtube-video-modal');
        const iframe = document.getElementById('youtube-video-iframe');
        if (!modal || !iframe) return;

        iframe.src = '';
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    const closeModalBtn = document.getElementById('close-youtube-video-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeYoutubeVideo);
    }

    const modal = document.getElementById('youtube-video-modal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeYoutubeVideo();
        });
    }

    initYoutubeGallery();

});
