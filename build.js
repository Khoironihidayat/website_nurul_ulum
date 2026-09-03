const fs = require('fs');
const path = require('path');

const sharedHead = (title) => `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>${title} - Pondok Pesantren Nurul Ulum</title>
    <meta name="description" content="Pondok Pesantren Nurul Ulum - Membentuk Generasi Qur'ani, Cerdas, dan Berakhlak Mulia. Pendidikan terpadu Salaf & Modern jenjang TK, MI, MTs, dan MA."/>
    <!-- Tailwind CSS CDN with plugins -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#004532",
                        "primary-container": "#065f46",
                        "primary-fixed": "#a6f2d1",
                        "primary-fixed-dim": "#8bd6b6",
                        "on-primary": "#ffffff",
                        "on-primary-container": "#8bd6b7",
                        "on-primary-fixed": "#002116",
                        "on-primary-fixed-variant": "#00513b",
                        "secondary": "#5d5f5f",
                        "secondary-container": "#dfe0e0",
                        "secondary-fixed": "#e2e2e2",
                        "secondary-fixed-dim": "#c6c6c7",
                        "on-secondary": "#ffffff",
                        "on-secondary-container": "#616363",
                        "on-secondary-fixed": "#1a1c1c",
                        "on-secondary-fixed-variant": "#454747",
                        "tertiary": "#735c00",
                        "tertiary-container": "#cca730",
                        "tertiary-fixed": "#ffe088",
                        "tertiary-fixed-dim": "#e9c349",
                        "on-tertiary": "#ffffff",
                        "on-tertiary-container": "#4f3d00",
                        "on-tertiary-fixed": "#241a00",
                        "on-tertiary-fixed-variant": "#574500",
                        "surface": "#f8f9fb",
                        "surface-dim": "#d9dadc",
                        "surface-bright": "#f8f9fb",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#f3f4f6",
                        "surface-container": "#edeef0",
                        "surface-container-high": "#e7e8ea",
                        "surface-container-highest": "#e1e2e4",
                        "surface-variant": "#e1e2e4",
                        "on-surface": "#191c1e",
                        "on-surface-variant": "#3f4944",
                        "background": "#f8f9fb",
                        "on-background": "#191c1e",
                        "inverse-surface": "#2e3132",
                        "inverse-on-surface": "#f0f1f3",
                        "inverse-primary": "#8bd6b6",
                        "outline": "#6f7973",
                        "outline-variant": "#bec9c2",
                        "surface-tint": "#1b6b51",
                        "error": "#ba1a1a",
                        "error-container": "#ffdad6",
                        "on-error": "#ffffff",
                        "on-error-container": "#93000a"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "sm": "0.25rem",
                        "md": "0.5rem",
                        "lg": "0.75rem",
                        "xl": "1rem",
                        "2xl": "1.5rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "margin-desktop": "40px",
                        "unit": "8px",
                        "container-max": "1280px",
                        "margin-mobile": "16px",
                        "gutter": "24px"
                    },
                    fontFamily: {
                        "headline-sm": ["Montserrat", "sans-serif"],
                        "headline-md": ["Montserrat", "sans-serif"],
                        "display-lg-mobile": ["Montserrat", "sans-serif"],
                        "display-lg": ["Montserrat", "sans-serif"],
                        "body-lg": ['"Source Sans 3"', "sans-serif"],
                        "body-md": ['"Source Sans 3"', "sans-serif"],
                        "label-caps": ['"Source Sans 3"', "sans-serif"]
                    },
                    fontSize: {
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "headline-md": ["30px", { "lineHeight": "38px", "fontWeight": "600" }],
                        "display-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "label-caps": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
    <style>
        .pattern-bg {
            background-image: url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><path d='M20 0l20 20-20 20L0 20z' fill='rgba(6, 95, 70, 0.03)'/></svg>");
        }
        .pattern-overlay {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .hover-gold-accent:hover {
            border-top: 4px solid #cca730;
            transform: translateY(-2px);
        }
        .ambient-shadow {
            box-shadow: 0 10px 25px -3px rgba(6, 95, 70, 0.08), 0 4px 6px -2px rgba(6, 95, 70, 0.04);
        }
        .shadow-ambient {
            box-shadow: 0 4px 20px rgba(6, 95, 70, 0.08);
        }
        .shadow-ambient-hover:hover {
            box-shadow: 0 10px 30px rgba(6, 95, 70, 0.12);
        }
        .text-shadow-sm {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
        }
        .text-shadow-md {
            text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        }
        .timeline-line::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 2px;
            background-color: #cca730;
            transform: translateX(-50%);
        }
        @media (max-width: 768px) {
            .timeline-line::before {
                left: 20px;
                transform: none;
            }
        }

        /* ================================================
           CINEMATIC ANIMATION SYSTEM — Nurul Ulum v4
        ================================================ */

        /* --- Ambient Floating Orbs (Ultra-Slow & Silky) --- */
        @keyframes float-gentle {
            0%, 100% { transform: translate3d(0, 0px, 0); }
            50%       { transform: translate3d(0, -12px, 0); }
        }
        @keyframes float-gentle-delay {
            0%, 100% { transform: translate3d(0, 0px, 0); }
            50%       { transform: translate3d(0, -8px, 0); }
        }
        .float-anim       { animation: float-gentle 8s ease-in-out infinite; }
        .float-anim-delay { animation: float-gentle-delay 10s ease-in-out 2.5s infinite; }

        /* --- Fluid Intelligent Header --- */
        header {
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.45s ease,
                        background-color 0.45s ease;
        }
        .header-shrunk {
            box-shadow: 0 4px 20px -2px rgba(0, 69, 50, 0.08), 0 2px 6px -1px rgba(0, 69, 50, 0.04);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
        }

        /* --- Hero Cinematic Slide-In (Blur-to-Clear) --- */
        @keyframes cinematicFadeUp {
            from {
                opacity: 0;
                transform: translate3d(0, 36px, 0) scale(0.98);
                filter: blur(8px);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1);
                filter: blur(0px);
            }
        }
        .slide-in-left {
            opacity: 0;
            animation: cinematicFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
        }
        .slide-in-right {
            opacity: 0;
            animation: cinematicFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.22s forwards;
        }
        .pop-in {
            opacity: 0;
            animation: cinematicFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.38s forwards;
        }

        /* --- Luxury Ink Ripple --- */
        @keyframes nu-ripple {
            to { transform: scale(3); opacity: 0; }
        }

        /* --- Interactive Spring Card with Spotlight Glow --- */
        .tilt-card {
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.35s ease;
            will-change: transform, box-shadow;
            position: relative;
            overflow: hidden;
        }
        .tilt-card::before {
            content: '';
            position: absolute;
            top: var(--mouse-y, -200px);
            left: var(--mouse-x, -200px);
            transform: translate(-50%, -50%);
            width: 320px;
            height: 320px;
            background: radial-gradient(circle, rgba(204, 167, 48, 0.12) 0%, rgba(27, 107, 81, 0.04) 50%, transparent 75%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 1;
        }
        .tilt-card:hover::before {
            opacity: 1;
        }
        .tilt-card:hover {
            transform: translate3d(0, -6px, 0);
            box-shadow: 0 20px 45px -10px rgba(0, 69, 50, 0.18),
                        0 8px 16px -4px rgba(0, 69, 50, 0.08);
            border-color: rgba(204, 167, 48, 0.4) !important;
        }

        /* --- Shimmer Sheen on Badges --- */
        @keyframes sheen {
            0%   { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .badge-sheen {
            background-size: 200% 100%;
            background-image: linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.4) 50%, transparent 65%);
            animation: sheen 4s infinite linear;
        }

        /* --- Gradient Text (Deep Emerald to Warm Gold) --- */
        .grad-text {
            background: linear-gradient(125deg, #004532 0%, #1b6b51 50%, #b88b14 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* --- Understated Luxury CTA Breathing Glow --- */
        @keyframes subtleBreathe {
            0%, 100% {
                box-shadow: 0 4px 14px 0 rgba(0, 69, 50, 0.25), 0 0 0 0 rgba(27, 107, 81, 0);
            }
            50% {
                box-shadow: 0 6px 20px 0 rgba(0, 69, 50, 0.35), 0 0 0 6px rgba(204, 167, 48, 0.18);
            }
        }
        .pulse-ring {
            animation: subtleBreathe 3.5s ease-in-out infinite;
        }

        /* --- Smooth Cinematic Image Zoom --- */
        .img-zoom {
            overflow: hidden;
        }
        .img-zoom img {
            transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s ease;
            will-change: transform;
        }
        .img-zoom:hover img {
            transform: scale3d(1.06, 1.06, 1);
        }

        /* --- Islamic Geometric Background --- */
        .geometric-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* --- Gold Glow Aura --- */
        .gold-glow {
            box-shadow: 0 0 0 2px rgba(204, 167, 48, 0.25),
                        0 8px 30px rgba(204, 167, 48, 0.15);
        }

        /* --- Clean Selection Highlight --- */
        ::selection {
            background: rgba(27, 107, 81, 0.2);
            color: #004532;
        }

        /* --- Global GPU Acceleration & Smoothing --- */
        *, *::before, *::after {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        html {
            text-size-adjust: 100%;
            scroll-behavior: smooth;
        }

    </style>
</head>
<body class="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pattern-bg antialiased selection:bg-primary-container selection:text-on-primary-container">
`;

const whatsappNumbers = {
    kb: '6287849764847',
    tk: '6287850951572',
    mi: '6287866122352',
    mts: '6287866186894',
    ma: '6287721032572'
};

const renderNavbar = (activeKey) => {
    const isBeranda = activeKey === 'beranda';
    const isProfil = activeKey === 'profil';
    const isUnit = ['kb', 'tk', 'mi', 'mts', 'ma'].includes(activeKey);
    const unitLogos = {
        kb: 'images/unit-logos/kb-logo.png',
        tk: 'images/unit-logos/tk-logo.png',
        mi: 'images/unit-logos/mi-logo.png',
        mts: 'images/unit-logos/mts-logo.png',
        ma: 'images/unit-logos/ma-logo.png'
    };
    const brandMark = activeKey === 'tk'
        ? '<img src="images/profil/logo-yayasan.png" alt="Logo Yayasan Nurul Ulum" class="w-full h-full object-contain p-1"/>'
        : isUnit
            ? `<img src="${unitLogos[activeKey]}" alt="Logo Unit ${activeKey.toUpperCase()}" class="w-full h-full object-contain p-1"/>`
        : '<span class="material-symbols-outlined text-[22px]">mosque</span>';
    const contactNumber = whatsappNumbers[activeKey] || '6281234567890';

    return `
<!-- TopAppBar (Sticky Navigation) -->
<header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 transition-all duration-300">
    <div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
        <div class="flex items-center gap-3">
            <button id="mobile-menu-btn" aria-label="Buka Menu" class="md:hidden text-primary p-1.5 rounded-lg hover:bg-primary/5 focus:outline-none transition-colors">
                <span class="material-symbols-outlined text-[28px]">menu</span>
            </button>
            <a href="index.html" class="flex items-center gap-2.5 group">
                <div class="w-10 h-10 rounded-full bg-white/90 text-tertiary-fixed flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden border border-primary/10">
                    ${brandMark}
                </div>
                <div>
                    <span class="font-headline-md text-xl md:text-2xl font-bold tracking-tight text-primary block leading-none">NURUL ULUM</span>
                    <span class="text-[10px] md:text-xs text-tertiary font-medium tracking-wider uppercase block">Pesantren & Madrasah</span>
                </div>
            </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-7">
            <a href="index.html" class="font-semibold text-sm ${isBeranda ? 'text-primary border-b-2 border-primary py-1' : 'text-on-surface-variant hover:text-primary transition-colors'}">
                Beranda
            </a>
            <a href="profil.html" class="font-semibold text-sm ${isProfil ? 'text-primary border-b-2 border-primary py-1' : 'text-on-surface-variant hover:text-primary transition-colors'}">
                Profil & Sejarah
            </a>

            <!-- Dropdown Unit Pendidikan -->
            <div class="relative group py-2">
                <button class="font-semibold text-sm flex items-center gap-1.5 ${isUnit ? 'text-primary' : 'text-on-surface-variant hover:text-primary transition-colors'}">
                    Unit Pendidikan <span class="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-200">expand_more</span>
                </button>
                <div class="absolute top-full left-0 mt-1 w-60 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50">
                    <a href="unit-kb.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activeKey === 'kb' ? 'bg-primary-container/10 text-primary font-semibold' : 'text-on-surface hover:bg-surface-container-low transition-colors'}">
                        <span class="material-symbols-outlined text-primary text-[20px]">toys</span>
                        <div>
                            <div class="font-semibold">Kelompok Bermain (KB)</div>
                            <div class="text-[11px] text-on-surface-variant">Pendidikan Usia 2-4 Tahun</div>
                        </div>
                    </a>
                    <a href="unit-tk.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activeKey === 'tk' ? 'bg-primary-container/10 text-primary font-semibold' : 'text-on-surface hover:bg-surface-container-low transition-colors'}">
                        <span class="material-symbols-outlined text-primary text-[20px]">child_care</span>
                        <div>
                            <div class="font-semibold">TK / RA</div>
                            <div class="text-[11px] text-on-surface-variant">Pendidikan Usia Dini</div>
                        </div>
                    </a>
                    <a href="unit-mi.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activeKey === 'mi' ? 'bg-primary-container/10 text-primary font-semibold' : 'text-on-surface hover:bg-surface-container-low transition-colors'}">
                        <span class="material-symbols-outlined text-primary text-[20px]">local_library</span>
                        <div>
                            <div class="font-semibold">Madrasah Ibtidaiyah</div>
                            <div class="text-[11px] text-on-surface-variant">Setingkat SD</div>
                        </div>
                    </a>
                    <a href="unit-mts.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activeKey === 'mts' ? 'bg-primary-container/10 text-primary font-semibold' : 'text-on-surface hover:bg-surface-container-low transition-colors'}">
                        <span class="material-symbols-outlined text-primary text-[20px]">menu_book</span>
                        <div>
                            <div class="font-semibold">Madrasah Tsanawiyah</div>
                            <div class="text-[11px] text-on-surface-variant">Setingkat SMP</div>
                        </div>
                    </a>
                    <a href="unit-ma.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${activeKey === 'ma' ? 'bg-primary-container/10 text-primary font-semibold' : 'text-on-surface hover:bg-surface-container-low transition-colors'}">
                        <span class="material-symbols-outlined text-primary text-[20px]">school</span>
                        <div>
                            <div class="font-semibold">Madrasah Aliyah</div>
                            <div class="text-[11px] text-on-surface-variant">Setingkat SMA / Aliyah</div>
                        </div>
                    </a>
                </div>
            </div>

            <a href="#kontak" class="font-semibold text-sm text-on-surface-variant hover:text-primary transition-colors">
                Kontak
            </a>
        </nav>

        <!-- CTA Action -->
        <div class="hidden md:flex items-center gap-3">
            <a href="https://wa.me/${contactNumber}?text=Assalamu'alaikum%20Admin%20Pondok%20Pesantren%20Nurul%20Ulum,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santri%20baru" target="_blank" class="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md hover:-translate-y-0.5 transition-all">
                <span class="material-symbols-outlined text-[18px]">how_to_reg</span>
                Pendaftaran (PPDB)
            </a>
        </div>
    </div>
</header>

<!-- Mobile Navigation Drawer Backdrop -->
<div id="drawer-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] hidden opacity-0 transition-opacity duration-300 md:hidden"></div>

<!-- Mobile Navigation Drawer -->
<div id="mobile-drawer" class="fixed inset-y-0 left-0 z-[70] flex flex-col py-6 bg-primary dark:bg-primary-container h-full w-80 shadow-2xl transform -translate-x-full transition-transform duration-300 md:hidden overflow-y-auto">
    <div class="px-6 pb-5 border-b border-primary-fixed/20 mb-4 flex justify-between items-center">
        <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">mosque</span>
            </div>
            <h2 class="font-headline-sm text-lg font-bold text-tertiary-fixed">PP. Nurul Ulum</h2>
        </div>
        <button id="mobile-close-btn" class="text-on-primary p-1 rounded-lg hover:bg-white/10" aria-label="Tutup Menu">
            <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
    </div>

    <nav class="flex flex-col px-3 font-body-lg text-base space-y-1">
        <a href="index.html" class="flex items-center gap-3.5 px-4 py-3 rounded-lg ${isBeranda ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/90 hover:bg-white/10'}">
            <span class="material-symbols-outlined text-[22px]">home</span> Beranda
        </a>
        <a href="profil.html" class="flex items-center gap-3.5 px-4 py-3 rounded-lg ${isProfil ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/90 hover:bg-white/10'}">
            <span class="material-symbols-outlined text-[22px]">account_balance</span> Profil & Sejarah
        </a>

        <!-- Mobile Unit Submenu Accordion -->
        <div>
            <button id="mobile-unit-btn" class="w-full flex items-center justify-between px-4 py-3 rounded-lg ${isUnit ? 'bg-white/15 text-tertiary-fixed font-semibold' : 'text-on-primary/90 hover:bg-white/10'}">
                <div class="flex items-center gap-3.5">
                    <span class="material-symbols-outlined text-[22px]">school</span> Unit Pendidikan
                </div>
                <span id="mobile-unit-arrow" class="material-symbols-outlined text-[20px] transition-transform duration-200 ${isUnit ? 'rotate-180' : ''}">expand_more</span>
            </button>
            <div id="mobile-unit-submenu" class="pl-6 pr-2 py-1 space-y-1 ${isUnit ? '' : 'hidden'}">
                <a href="unit-kb.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${activeKey === 'kb' ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/80 hover:bg-white/10'}">
                    <span class="material-symbols-outlined text-[18px]">toys</span> KB Nurul Ulum
                </a>
                <a href="unit-tk.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${activeKey === 'tk' ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/80 hover:bg-white/10'}">
                    <span class="material-symbols-outlined text-[18px]">child_care</span> TK / RA Nurul Ulum
                </a>
                <a href="unit-mi.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${activeKey === 'mi' ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/80 hover:bg-white/10'}">
                    <span class="material-symbols-outlined text-[18px]">local_library</span> MI Nurul Ulum
                </a>
                <a href="unit-mts.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${activeKey === 'mts' ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/80 hover:bg-white/10'}">
                    <span class="material-symbols-outlined text-[18px]">menu_book</span> MTs Nurul Ulum
                </a>
                <a href="unit-ma.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${activeKey === 'ma' ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-primary/80 hover:bg-white/10'}">
                    <span class="material-symbols-outlined text-[18px]">school</span> MA Nurul Ulum
                </a>
            </div>
        </div>

        <a href="#kontak" class="flex items-center gap-3.5 px-4 py-3 rounded-lg text-on-primary/90 hover:bg-white/10">
            <span class="material-symbols-outlined text-[22px]">contact_support</span> Kontak & Lokasi
        </a>
    </nav>

    <div class="mt-auto px-5 pt-6 border-t border-primary-fixed/20">
                <a href="https://wa.me/${contactNumber}?text=Assalamu'alaikum%20Admin%20Pondok%20Pesantren%20Nurul%20Ulum" target="_blank" class="w-full flex items-center justify-center gap-2 bg-tertiary-container text-on-tertiary-container font-bold text-sm uppercase py-3 rounded-xl shadow-lg">
            <span class="material-symbols-outlined text-[20px]">how_to_reg</span> Pendaftaran Santri
        </a>
        <div class="text-center mt-4 text-xs text-on-primary/60">
            © 2026 PP. Nurul Ulum
        </div>
    </div>
</div>
`;
};

const renderFooter = () => `
<!-- Global Footer -->
<footer id="kontak" class="bg-primary text-on-primary pt-16 pb-8 border-t-4 border-tertiary-container">
    <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <!-- Brand & Info -->
            <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                        <span class="material-symbols-outlined text-[24px]">mosque</span>
                    </div>
                    <span class="font-headline-md text-xl font-bold text-tertiary-fixed">NURUL ULUM</span>
                </div>
                <p class="font-body-md text-sm text-surface-container/90 leading-relaxed">
                    Lembaga Pendidikan Islam yang memadukan kedalaman ilmu salaf dengan keunggulan ilmu pengetahuan modern berlandaskan Ahlussunnah wal Jama'ah.
                </p>
                <div class="flex items-center gap-3 mt-2">
                    <a href="#" class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors" aria-label="Facebook">
                        <span class="material-symbols-outlined text-[18px]">public</span>
                    </a>
                    <a href="#" class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors" aria-label="Instagram">
                        <span class="material-symbols-outlined text-[18px]">photo_camera</span>
                    </a>
                    <a href="#" class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary-fixed hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors" aria-label="YouTube">
                        <span class="material-symbols-outlined text-[18px]">smart_display</span>
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="flex flex-col gap-3">
                <h4 class="font-headline-sm text-base font-bold text-tertiary-fixed tracking-wide">Navigasi Cepat</h4>
                <ul class="flex flex-col gap-2 font-body-md text-sm text-surface-container/80">
                    <li><a href="index.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> Beranda Utama</a></li>
                    <li><a href="profil.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> Profil & Sejarah</a></li>
                    <li><a href="profil.html#visi-misi" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> Visi & Misi</a></li>
                    <li><a href="profil.html#masyayikh" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> Dewan Masyayikh</a></li>
                </ul>
            </div>

            <!-- Unit Pendidikan -->
            <div class="flex flex-col gap-3">
                <h4 class="font-headline-sm text-base font-bold text-tertiary-fixed tracking-wide">Unit Pendidikan</h4>
                <ul class="flex flex-col gap-2 font-body-md text-sm text-surface-container/80">
                    <li><a href="unit-kb.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> KB Nurul Ulum</a></li>
                    <li><a href="unit-tk.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> TK / RA Nurul Ulum</a></li>
                    <li><a href="unit-mi.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> MI Nurul Ulum</a></li>
                    <li><a href="unit-mts.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> MTs Nurul Ulum</a></li>
                    <li><a href="unit-ma.html" class="hover:text-tertiary-fixed transition-colors flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">chevron_right</span> MA Nurul Ulum</a></li>
                </ul>
            </div>

            <!-- Contact Information -->
            <div class="flex flex-col gap-3">
                <h4 class="font-headline-sm text-base font-bold text-tertiary-fixed tracking-wide">Kontak & Informasi</h4>
                <ul class="flex flex-col gap-3 font-body-md text-sm text-surface-container/90">
                    <li class="flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-tertiary-fixed text-[20px] shrink-0 mt-0.5">location_on</span>
                        <span>Jl. Raya Desa Banmaleng PP. Nurul Ulum, Sumenep, Indonesia, East Java</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-tertiary-fixed text-[20px] shrink-0">call</span>
                        <span>0878-6618-6894</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-tertiary-fixed text-[20px] shrink-0">mail</span>
                        <span>nurululum1banmaleng@gmail.com</span>
                    </li>
                    <li class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-tertiary-fixed text-[20px] shrink-0">schedule</span>
                        <span>Selalu Buka</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="pt-8 border-t border-primary-fixed/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-surface-container/70">
            <div>
                © 2026 Pondok Pesantren Nurul Ulum. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div class="flex gap-6">
                <a href="#" class="hover:underline">Kebijakan Privasi</a>
                <a href="#" class="hover:underline">Syarat & Ketentuan</a>
                <a href="#" class="hover:underline">Peta Situs</a>
            </div>
        </div>
    </div>
</footer>

<!-- Interactive Scripts -->
<script src="js/main.js"></script>
</body>
</html>
`;

// Helper to patch raw main contents for smooth interconnected links
function patchMainContent(html, pageKey) {
    let main = html;

    if (whatsappNumbers[pageKey]) {
        main = main.replace(/628123456789\d?/g, whatsappNumbers[pageKey]);
    }

    // Fix empty href="#" in unit cards to proper pages
    if (pageKey === 'beranda') {
        main = main.replace(/(Kelompok Bermain[\s\S]*?<a[^>]*href=")(#)(")/i, '$1unit-kb.html$3');
        main = main.replace(/(Taman Kanak-Kanak[\s\S]*?<a[^>]*href=")(#)(")/i, '$1unit-tk.html$3');
        main = main.replace(/(Madrasah Ibtidaiyah[\s\S]*?<a[^>]*href=")(#)(")/i, '$1unit-mi.html$3');
        main = main.replace(/(Madrasah Tsanawiyah[\s\S]*?<a[^>]*href=")(#)(")/i, '$1unit-mts.html$3');
        main = main.replace(/(Madrasah Aliyah[\s\S]*?<a[^>]*href=")(#)(")/i, '$1unit-ma.html$3');
        main = main.replace(/(Informasi Pendaftaran[\s\S]*?<a[^>]*href=")(#)(")/i, '$1#ppdb$3');
        main = main.replace(/(Jelajahi Pesantren[\s\S]*?<a[^>]*href=")(#)(")/i, '$1#tentang$3');
        // Replace hero secondary button if structured differently
        main = main.replace(/href="#"([^>]*>Jelajahi Pesantren)/gi, 'href="#tentang"$1');
        main = main.replace(/href="#"([^>]*>Informasi Pendaftaran)/gi, 'href="#ppdb"$1');
    }

    if (pageKey === 'profil') {
        main = main.replace(/href="#"([^>]*>Daftar Sekarang)/gi, 'href="https://wa.me/6281234567890?text=Assalamu\'alaikum%20Admin%20Pesantren%20Nurul%20Ulum"$1');
        main = main.replace(/href="#"([^>]*>Unduh Brosur)/gi, 'href="#kontak"$1');
    }

    // Fix other general links to WhatsApp
    main = main.replace(/href="#"([^>]*>Daftar Online)/gi, 'href="https://wa.me/6281234567890?text=Assalamu\'alaikum%20Admin%20Pendaftaran"$1');
    main = main.replace(/href="#"([^>]*>Hubungi Kami)/gi, 'href="https://wa.me/6281234567890"$1');
    main = main.replace(/href="#"([^>]*>Konsultasi)/gi, 'href="https://wa.me/6281234567890"$1');

    return main;
}

const pageConfigs = [
    {
        rawFile: 'index.html',
        outFile: 'index.html',
        title: 'Beranda - Website Resmi',
        key: 'beranda'
    },
    {
        rawFile: 'profil.html',
        outFile: 'profil.html',
        title: 'Profil & Sejarah Pesantren',
        key: 'profil'
    },
    {
        rawFile: 'unit-kb.html',
        outFile: 'unit-kb.html',
        title: 'Unit Kelompok Bermain (KB) Nurul Ulum',
        key: 'kb'
    },
    {
        rawFile: 'unit-tk.html',
        outFile: 'unit-tk.html',
        title: 'Unit TK / RA Nurul Ulum',
        key: 'tk'
    },
    {
        rawFile: 'unit-mi.html',
        outFile: 'unit-mi.html',
        title: 'Unit Madrasah Ibtidaiyah (MI) Nurul Ulum',
        key: 'mi'
    },
    {
        rawFile: 'unit-mts.html',
        outFile: 'unit-mts.html',
        title: 'Unit Madrasah Tsanawiyah (MTs) Nurul Ulum',
        key: 'mts'
    },
    {
        rawFile: 'unit-ma.html',
        outFile: 'unit-ma.html',
        title: 'Unit Madrasah Aliyah (MA) Nurul Ulum',
        key: 'ma'
    }
];

for (const cfg of pageConfigs) {
    const rawFilePath = path.join('raw', cfg.rawFile);
    if (!fs.existsSync(rawFilePath)) {
        console.warn('Warning: File does not exist yet:', rawFilePath);
        continue;
    }
    const rawContent = fs.readFileSync(rawFilePath, 'utf8');
    const mainMatch = rawContent.match(/<main[\s\S]*?<\/main>/i);
    if (!mainMatch) {
        console.error('Error: <main> not found in', cfg.rawFile);
        continue;
    }
    const patchedMain = patchMainContent(mainMatch[0], cfg.key);
    const finalHtml = sharedHead(cfg.title) + renderNavbar(cfg.key) + '\n' + patchedMain + '\n' + renderFooter();
    fs.writeFileSync(cfg.outFile, finalHtml, 'utf8');
    console.log('Successfully built:', cfg.outFile, 'size:', finalHtml.length, 'bytes');
}

