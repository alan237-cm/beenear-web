import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Globe2, Menu, X,
  Target, Compass, Puzzle, ShieldCheck, Scale, CheckCircle2,
  Users, Layers3, MessageSquare, Mail, Phone, MapPin,
} from 'lucide-react';

/*
 * BEE NEAR — ABOUT / EDITORIAL EDITION
 * Replace: resources/js/Pages/About.jsx
 * Uses existing translation keys, React, Inertia and lucide-react.
 * No additional npm packages or external design assets required.
 */

const WORDS = {
  es: {
    section: 'LA EMPRESA',
    navModel: 'Nuestro enfoque',
    intro: 'Una forma más inteligente de conectar.',
    introKicker: 'LA FILOSOFÍA BEE NEAR',
    heroNote: 'TECNOLOGÍA · PERSONAS · CONEXIONES',
    heroVisual: 'DISEÑADO PARA CONECTAR',
    source: 'ORIGEN',
    system: 'TECNOLOGÍA',
    people: 'PERSONAS',
    connected: 'UNA MISMA OPERACIÓN',
    discover: 'Conoce nuestros principios',
    storyOverline: '01 / LO QUE NOS MUEVE',
    storyTitle: 'La conexión importa. La forma de construirla, también.',
    storyDesc: 'Nuestro trabajo nace de unir criterio humano y tecnología en un mismo servicio. Cada decisión parte de entender el negocio, simplificar su operación y cuidar la experiencia de las personas.',
    foundation: 'NUESTRA DIRECCIÓN',
    principlesOverline: '03 / NUESTRA CULTURA',
    principlesIndex: 'PRINCIPIOS / 07',
    valuesLead: 'Los principios que definen nuestra manera de trabajar.',
    partnership: 'HUMAN × INTELLIGENCE',
    closingNote: 'EL SIGUIENTE PASO',
    returnHome: 'Inicio',
    footerTag: 'Conexiones inteligentes. Relaciones humanas.',
    exploreServices: 'Explorar servicios',
    reach: 'CONVERSEMOS',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    section: 'THE COMPANY',
    navModel: 'Our approach',
    intro: 'A more intelligent way to connect.',
    introKicker: 'THE BEE NEAR PHILOSOPHY',
    heroNote: 'TECHNOLOGY · PEOPLE · CONNECTIONS',
    heroVisual: 'BUILT TO CONNECT',
    source: 'PURPOSE',
    system: 'TECHNOLOGY',
    people: 'PEOPLE',
    connected: 'ONE CONNECTED OPERATION',
    discover: 'Explore our principles',
    storyOverline: '01 / WHAT MOVES US',
    storyTitle: 'Connection matters. So does the way we build it.',
    storyDesc: 'Our work brings human judgment and technology into the same service. Every decision begins with understanding the business, simplifying operations and respecting the people on the other side of every interaction.',
    foundation: 'OUR DIRECTION',
    principlesOverline: '03 / OUR CULTURE',
    principlesIndex: 'PRINCIPLES / 07',
    valuesLead: 'The principles behind the way we work.',
    partnership: 'HUMAN × INTELLIGENCE',
    closingNote: 'THE NEXT STEP',
    returnHome: 'Home',
    footerTag: 'Intelligent connections. Human relationships.',
    exploreServices: 'Explore services',
    reach: 'LET’S CONNECT',
    rights: 'All rights reserved.',
  },
};

const VALUES = [
  { key: 'val_1', icon: Puzzle },
  { key: 'val_2', icon: ShieldCheck },
  { key: 'val_3', icon: Scale },
  { key: 'val_4', icon: CheckCircle2 },
  { key: 'val_5', icon: Users },
  { key: 'val_6', icon: Layers3 },
  { key: 'val_7', icon: MessageSquare },
];

function BeeMark({ small = false }) {
  return (
    <span className={`ab-mark${small ? ' ab-mark--small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 38 40" fill="none">
        <path d="M18.9 2 3 11.1v17.8L18.9 38 35 28.9V11.1L18.9 2Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M19 3v34M3.5 11.5 35 29M35 11.5 3.5 29" stroke="currentColor" strokeWidth="1.3" opacity=".7" />
        <circle cx="19" cy="20" r="5.2" fill="currentColor" />
      </svg>
    </span>
  );
}

function Brand() {
  return (
    <span className="ab-brand">
      <BeeMark />
      <span className="ab-brand-wording">
        <span className="ab-brand-name">Bee<b>Near</b></span>
        <span className="ab-brand-tag">HUMAN × INTELLIGENCE</span>
      </span>
    </span>
  );
}

function Eyebrow({ children, dark = false }) {
  return <div className={`ab-eyebrow${dark ? ' ab-eyebrow--dark' : ''}`}><i />{children}</div>;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('ab-in');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('ab-in');
        observer.unobserve(node);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`ab-reveal ${className}`}>{children}</div>;
}

function ConnectionArtwork({ w }) {
  return (
    <div className="ab-visual" aria-label={w.heroVisual} role="img">
      <div className="ab-visual-grid" aria-hidden="true" />
      <div className="ab-visual-top" aria-hidden="true"><span>BN—01</span><span>CONNECTION / SYSTEM</span></div>
      <svg className="ab-network" viewBox="0 0 480 430" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="ab-gold" cx="0" cy="0" r="1" gradientTransform="translate(240 210) rotate(90) scale(178)"><stop stopColor="#F5BE1E" stopOpacity=".12" /><stop offset="1" stopColor="#F5BE1E" stopOpacity="0" /></radialGradient>
          <linearGradient id="ab-line" x1="35" x2="443" y1="110" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#F5BE1E" stopOpacity=".14"/><stop offset=".55" stopColor="#F5BE1E" stopOpacity=".65"/><stop offset="1" stopColor="#F5BE1E" stopOpacity=".14"/></linearGradient>
        </defs>
        <circle cx="240" cy="215" r="185" fill="url(#ab-gold)" />
        <circle cx="240" cy="215" r="154" stroke="#D5A428" strokeOpacity=".15" strokeDasharray="2 8" />
        <circle cx="240" cy="215" r="112" stroke="#D5A428" strokeOpacity=".22" />
        <circle cx="240" cy="215" r="72" stroke="#E8BB49" strokeOpacity=".27" />
        <path d="M240 215 94 126M240 215 391 120M240 215 387 315M240 215 98 316" stroke="url(#ab-line)" strokeWidth="1.3" />
        <path className="ab-network-pulse" d="M94 126 240 215 391 120" stroke="#F5BE1E" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="12 350" />
        <path className="ab-network-pulse ab-network-pulse--slow" d="M98 316 240 215 387 315" stroke="#F5BE1E" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="12 350" />
        {[[94,126],[391,120],[387,315],[98,316]].map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r="22" fill="#17191B" stroke="#484339"/><circle cx={x} cy={y} r="5" fill="#E3B84B"/></g>)}
        <circle cx="240" cy="215" r="46" fill="#101112" stroke="#BA963B" strokeWidth="1.1" />
        <circle className="ab-heart" cx="240" cy="215" r="27" stroke="#F5BE1E" strokeOpacity=".43" />
        <path d="M240 196 223 206v19l17 10 17-10v-19l-17-10ZM240 196v39M223 206l34 19M257 206l-34 19" stroke="#F5BE1E" strokeWidth="1.6" />
        <circle cx="240" cy="215" r="5" fill="#F5BE1E" />
        <g fill="#D4C8A8" opacity=".75"><circle cx="161" cy="151" r="2"/><circle cx="327" cy="161" r="2"/><circle cx="162" cy="286" r="2"/><circle cx="315" cy="282" r="2"/></g>
      </svg>
      <div className="ab-visual-label ab-visual-label--a"><span>01</span>{w.source}</div>
      <div className="ab-visual-label ab-visual-label--b"><span>02</span>{w.system}</div>
      <div className="ab-visual-label ab-visual-label--c"><span>03</span>{w.people}</div>
      <div className="ab-visual-footer"><span className="ab-live-dot"/>{w.connected}<span> / BN</span></div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.ab { --ab-bg:#101112; --ab-ink:#17191a; --ab-panel:#1a1c1d; --ab-cream:#f2f0eb; --ab-yellow:#f5be1e; color:#f2f0eb; background:var(--ab-bg); font-family:'DM Sans',Arial,sans-serif; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
.ab *, .ab *:before, .ab *:after { box-sizing:border-box; }
.ab a { text-decoration:none; }
.ab button { cursor:pointer; }
.ab h1,.ab h2,.ab h3,.ab h4,.ab p { margin:0; }
.ab ::selection { background:#f5be1e; color:#101112; }
.ab-shell { width:min(1260px,calc(100% - 104px)); margin-inline:auto; }
.ab-mark { display:inline-flex; width:31px; height:34px; flex:none; color:var(--ab-yellow); }
.ab-mark svg { width:100%; height:100%; }
.ab-mark--small { width:24px; height:27px; }
.ab-brand { display:inline-flex; gap:10px; align-items:center; color:#f4f3ed; white-space:nowrap; }
.ab-brand-wording { display:flex; flex-direction:column; }
.ab-brand-name { font-family:Manrope,Arial,sans-serif; font-weight:700; font-size:18px; line-height:1.1; letter-spacing:-.8px; }
.ab-brand-name b { color:var(--ab-yellow); }
.ab-brand-tag { font-size:7px; letter-spacing:1.55px; font-weight:700; margin-top:4px; color:#858b89; }
.ab-nav { position:fixed; z-index:100; left:50%; transform:translateX(-50%); top:18px; width:min(1252px,calc(100% - 64px)); min-height:63px; padding:9px 14px 9px 21px; display:flex; align-items:center; justify-content:space-between; gap:20px; border:1px solid rgba(255,255,255,.12); border-radius:12px; background:rgba(16,17,18,.85); box-shadow:0 12px 40px rgba(0,0,0,.2); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); transition:top .25s,background .25s; }
.ab-nav--scroll { top:9px; background:rgba(14,15,16,.97); }
.ab-nav-links { display:flex; align-items:center; gap:29px; }
.ab-nav-links a { position:relative; font-size:12px; color:#aaaead; font-weight:500; transition:color .2s; }
.ab-nav-links a:hover,.ab-nav-links a[aria-current="page"] { color:#f0ede5; }
.ab-nav-links a[aria-current="page"]:after { content:''; position:absolute; width:100%; height:2px; left:0; bottom:-10px; background:var(--ab-yellow); }
.ab-nav-ops { display:flex; align-items:center; gap:17px; }
.ab-language { display:flex; gap:7px; align-items:center; border:0; background:none; color:#d7d6d0; font-size:11px; font-weight:700; letter-spacing:.6px; padding:10px 2px; }
.ab-nav-cta { display:flex; align-items:center; justify-content:center; gap:17px; padding:13px 15px; background:var(--ab-yellow); color:#121212; border-radius:6px; font-size:11px; font-weight:700; white-space:nowrap; transition:transform .2s,background .2s; }
.ab-nav-cta:hover { transform:translateY(-2px); background:#fbd15b; }
.ab-menu-button { display:none; align-items:center; justify-content:center; width:40px; height:40px; border-radius:7px; background:#252729; border:1px solid #3a3b3b; color:#fff; }
.ab-mobile-nav { position:fixed; z-index:99; left:12px; right:12px; top:84px; padding:10px; background:#1b1d1e; border-radius:11px; border:1px solid #383a3a; box-shadow:0 28px 65px #000a; }
.ab-mobile-nav a,.ab-mobile-nav button { display:flex; align-items:center; justify-content:space-between; width:100%; padding:15px 12px; border:0; border-bottom:1px solid #353636; color:#eee; background:transparent; font:600 13px 'DM Sans',Arial,sans-serif; text-align:left; }
.ab-mobile-nav a:last-child { border-bottom:0; }
.ab-progress { height:2px; background:var(--ab-yellow); position:fixed; z-index:110; left:0; top:0; transition:width .1s linear; }
.ab-eyebrow { display:flex; align-items:center; gap:11px; font-size:9px; font-weight:700; letter-spacing:1.6px; color:var(--ab-yellow); text-transform:uppercase; }
.ab-eyebrow i { width:23px; height:1px; display:inline-block; background:currentColor; flex:none; }
.ab-eyebrow--dark { color:#947321; }
.ab-hero { position:relative; background:#101112; min-height:680px; padding:144px 0 88px; isolation:isolate; overflow:hidden; }
.ab-hero:before { content:''; position:absolute; z-index:-1; inset:0; background:radial-gradient(ellipse at 78% 39%,rgba(245,190,30,.06),transparent 38%),radial-gradient(ellipse at 5% 92%,rgba(245,190,30,.025),transparent 35%); }
.ab-hero-gridlines { position:absolute; inset:0; opacity:.13; pointer-events:none; background:linear-gradient(90deg,rgba(255,255,255,.17) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px); background-size:104px 104px; mask-image:linear-gradient(to bottom,black,transparent 92%); }
.ab-hero-layout { display:grid; grid-template-columns:minmax(0,.98fr) minmax(0,1.02fr); gap:clamp(36px,6vw,90px); align-items:center; position:relative; }
.ab-hero-text { min-width:0; }
.ab-hero h1 { font-family:Manrope,Arial,sans-serif; max-width:630px; margin:23px 0 20px; font-weight:700; font-size:clamp(39px,3.65vw,58px); line-height:1.14; letter-spacing:-.055em; }
.ab-hero-desc { color:#adb0ac; font-size:15px; line-height:1.77; max-width:560px; }
.ab-hero-rule { margin:26px 0 23px; display:flex; align-items:center; gap:15px; color:#8b8e8b; font-size:9px; letter-spacing:1.5px; font-weight:700; }
.ab-hero-rule:after { content:''; display:block; height:1px; flex:1; background:linear-gradient(90deg,rgba(255,255,255,.2),transparent); }
.ab-hero-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:26px; }
.ab-button { display:inline-flex; align-items:center; justify-content:center; gap:13px; min-height:48px; border-radius:6px; padding:0 18px; font-weight:700; font-size:11px; transition:transform .2s,border .2s,background .2s; }
.ab-button:hover { transform:translateY(-2px); }
.ab-button--yellow { background:var(--ab-yellow); color:#111; }
.ab-button--yellow:hover { background:#fbd15b; }
.ab-button--outline { border:1px solid #494b49; color:#eae9e5; }
.ab-button--outline:hover { border-color:var(--ab-yellow); }
.ab-visual { position:relative; width:100%; aspect-ratio:1.07; max-height:485px; border-radius:11px; border:1px solid rgba(255,255,255,.13); background:linear-gradient(145deg,#202224,#151718 55%,#101112); box-shadow:0 22px 60px #0005,inset 0 1px rgba(255,255,255,.03); overflow:hidden; }
.ab-visual-grid { position:absolute; inset:0; background:linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px); background-size:28px 28px; mask-image:radial-gradient(ellipse at center,black 25%,transparent 85%); }
.ab-visual-top { position:absolute; z-index:2; left:23px; right:23px; top:23px; display:flex; align-items:center; justify-content:space-between; color:#8f938f; font-size:9px; letter-spacing:1.5px; font-weight:700; }
.ab-network { width:100%; height:100%; position:absolute; inset:0; animation:ab-breathe 9s ease-in-out infinite alternate; }
.ab-network-pulse { animation:ab-dash 5s linear infinite; }
.ab-network-pulse--slow { animation-duration:6.5s; animation-delay:-2.4s; }
.ab-heart { animation:ab-breathe 3.7s ease-in-out infinite alternate; transform-origin:240px 215px; }
.ab-visual-label { position:absolute; z-index:2; color:#d0d0cb; border:1px solid rgba(255,255,255,.11); border-radius:5px; padding:8px 10px; background:rgba(18,19,20,.86); font-size:9px; font-weight:700; letter-spacing:.8px; display:flex; align-items:center; gap:10px; }
.ab-visual-label span { color:var(--ab-yellow); font-size:8px; }
.ab-visual-label--a { left:20px; top:24%; }
.ab-visual-label--b { right:18px; top:27%; }
.ab-visual-label--c { right:32px; bottom:19%; }
.ab-visual-footer { position:absolute; z-index:2; bottom:22px; left:23px; right:23px; border-top:1px solid #353535; padding-top:16px; display:flex; align-items:center; gap:8px; font-size:9px; letter-spacing:1.15px; color:#afada8; font-weight:700; }
.ab-visual-footer>span:last-child { margin-left:auto; color:#797b77; }
.ab-live-dot { background:#d9b54b; width:6px; height:6px; border-radius:50%; box-shadow:0 0 9px #e3b94470; animation:ab-blink 2s ease-in-out infinite; }
.ab-ribbon { background:#1a1c1d; border-top:1px solid #333534; border-bottom:1px solid #333534; padding:16px 0; overflow:hidden; }
.ab-ribbon-inner { display:flex; gap:0; white-space:nowrap; width:max-content; animation:ab-marquee 42s linear infinite; }
.ab-ribbon-inner:hover { animation-play-state:paused; }
.ab-ribbon-group { display:flex; gap:31px; padding-right:31px; }
.ab-ribbon-item { display:flex; gap:31px; align-items:center; color:#bebfbc; font-size:9px; font-weight:700; letter-spacing:1.3px; }
.ab-ribbon-item svg { color:#c7a13b; }
.ab-story { background:var(--ab-cream); color:#18191a; padding:102px 0 107px; }
.ab-story-grid { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,.78fr); gap:clamp(44px,8vw,126px); align-items:end; }
.ab-story h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(33px,3.55vw,53px); letter-spacing:-.057em; font-weight:700; line-height:1.18; margin:23px 0 0; }
.ab-story p { color:#5e625d; font-size:14px; line-height:1.87; }
.ab-story-notation { border-top:1px solid #d0ccc1; padding-top:15px; margin-top:28px; color:#7a7c74; font-size:10px; letter-spacing:1.4px; font-weight:700; display:flex; justify-content:space-between; }
.ab-direction { background:#151718; border-top:1px solid #393936; padding:97px 0 108px; }
.ab-direction-head { display:flex; justify-content:space-between; align-items:end; gap:25px; margin-bottom:36px; }
.ab-direction-head h2 { margin-top:16px; font-family:Manrope,Arial,sans-serif; font-size:clamp(30px,3vw,45px); letter-spacing:-.05em; font-weight:700; line-height:1.21; }
.ab-direction-cards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); border-top:1px solid #4b4b48; border-bottom:1px solid #4b4b48; }
.ab-direction-card { position:relative; padding:35px 46px 39px 0; min-width:0; }
.ab-direction-card+.ab-direction-card { border-left:1px solid #454643; padding-left:46px; padding-right:0; }
.ab-card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; color:#d5ad45; }
.ab-card-index { font-size:10px; font-weight:700; letter-spacing:1.3px; }
.ab-card-icon { color:#e2bc59; opacity:.85; }
.ab-direction-card h3 { font:700 clamp(24px,2.7vw,36px)/1.2 Manrope,Arial,sans-serif; letter-spacing:-.048em; margin-bottom:17px; }
.ab-direction-card p { color:#a7a9a5; font-size:14px; line-height:1.82; max-width:515px; }
.ab-card-bottom { height:1px; width:38px; background:#ddaf3a; margin-top:33px; transition:width .3s; }
.ab-direction-card:hover .ab-card-bottom { width:90px; }
.ab-values { background:#101112; padding:101px 0 110px; }
.ab-values-head { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.75fr); gap:75px; align-items:end; margin-bottom:39px; }
.ab-values-head h2 { font:700 clamp(33px,3.35vw,49px)/1.2 Manrope,Arial,sans-serif; letter-spacing:-.052em; margin:18px 0 0; }
.ab-values-head p { color:#9d9f9d; font-size:14px; line-height:1.84; }
.ab-values-ledger { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:0 42px; }
.ab-value { position:relative; display:grid; grid-template-columns:42px 35px 1fr; gap:13px; align-items:center; border-top:1px solid #333534; padding:21px 12px 21px 0; transition:background .2s,padding .2s; }
.ab-value:hover { background:#1a1c1d; padding-left:12px; }
.ab-values-ledger>.ab-reveal:nth-last-child(-n+2) .ab-value { border-bottom:1px solid #333534; }
.ab-value-index { font-size:9px; font-weight:700; letter-spacing:1px; color:#7f817e; }
.ab-value-icon { color:#c8a346; }
.ab-value h3 { font:600 16px/1.45 Manrope,Arial,sans-serif; letter-spacing:-.02em; }
.ab-values-ledger>.ab-reveal:last-child { grid-column:1/-1; max-width:calc(50% - 21px); }
.ab-values-ledger>.ab-reveal:last-child .ab-value { border-bottom:1px solid #333534; }
.ab-values-footnote { margin-top:28px; display:flex; align-items:center; gap:10px; color:#858884; font-size:10px; letter-spacing:1.25px; font-weight:700; }
.ab-values-footnote>span { height:1px; width:24px; background:#cba644; }
.ab-close { background:#e8e5dc; color:#191a1b; padding:100px 0 103px; border-top:3px solid #d6ae44; }
.ab-close-grid { display:grid; grid-template-columns:minmax(0,1fr) 188px; align-items:center; gap:60px; }
.ab-close h2 { font:700 clamp(37px,4.15vw,59px)/1.14 Manrope,Arial,sans-serif; letter-spacing:-.058em; margin:18px 0; max-width:780px; }
.ab-close h2 span { color:#967521; }
.ab-close p { font-size:14px; line-height:1.76; max-width:600px; color:#686963; }
.ab-close-link { width:174px; min-height:138px; display:flex; flex-direction:column; justify-content:space-between; align-items:start; background:#191b1c; color:#faf9f5; padding:22px; border-radius:7px; transition:transform .2s,background .2s; }
.ab-close-link:hover { transform:translateY(-4px); background:#2a2b2a; }
.ab-close-link svg { align-self:end; }
.ab-close-link span { max-width:130px; font-size:12px; line-height:1.55; font-weight:700; }
.ab-footer { background:#111314; padding:68px 0 26px; }
.ab-footer-grid { display:grid; grid-template-columns:1.5fr .85fr .85fr 1.2fr; gap:37px; padding-bottom:61px; }
.ab-footer-brand p { font-size:13px; line-height:1.8; color:#929592; max-width:270px; margin-top:21px; }
.ab-footer-col { display:flex; flex-direction:column; align-items:start; gap:13px; }
.ab-footer-col h3 { color:#d8b65d; font-size:10px; font-weight:700; letter-spacing:1.5px; margin-bottom:9px; }
.ab-footer-col a,.ab-footer-col span { color:#a4a5a2; font-size:12px; line-height:1.65; transition:color .2s; }
.ab-footer-col a:hover { color:var(--ab-yellow); }
.ab-footer-bottom { display:flex; justify-content:space-between; align-items:center; gap:18px; flex-wrap:wrap; padding-top:23px; border-top:1px solid #373938; color:#858784; font-size:11px; }
.ab-footer-bottom a { color:#9c9f9b; }
.ab-footer-bottom a:hover { color:var(--ab-yellow); }
.ab-reveal { opacity:0; transform:translateY(19px); transition:opacity .7s ease,transform .7s ease; }
.ab-reveal.ab-in { opacity:1; transform:none; }
@keyframes ab-breathe { from { transform:scale(.985); opacity:.8; } to { transform:scale(1.018); opacity:1; } }
@keyframes ab-dash { to { stroke-dashoffset:-362; } }
@keyframes ab-blink { 50% { opacity:.32; } }
@keyframes ab-marquee { to { transform:translateX(-50%); } }
@media (max-width:1100px) {
  .ab-shell { width:calc(100% - 72px); }
  .ab-nav-links { gap:18px; }
  .ab-hero-layout { gap:30px; }
  .ab-hero h1 { font-size:clamp(37px,4.2vw,50px); }
  .ab-visual-label--b { right:10px; }
  .ab-direction-card { padding-right:30px; }
  .ab-direction-card+.ab-direction-card { padding-left:30px; }
}
@media (max-width:920px) {
  .ab-nav-links { display:none; }
  .ab-menu-button { display:flex; }
  .ab-hero { padding:134px 0 80px; }
  .ab-hero-layout { grid-template-columns:1fr; gap:42px; }
  .ab-hero h1 { max-width:760px; font-size:clamp(38px,6vw,54px); }
  .ab-visual { max-width:640px; margin:auto; max-height:490px; }
  .ab-story-grid { gap:40px; }
  .ab-values-head { gap:35px; }
  .ab-footer-grid { grid-template-columns:1.15fr 1fr 1fr; }
  .ab-footer-col:last-child { grid-column:2 / 4; }
}
@media (max-width:690px) {
  .ab-shell { width:calc(100% - 40px); }
  .ab-nav { top:10px; width:calc(100% - 24px); padding:8px 11px; min-height:59px; }
  .ab-brand-name { font-size:17px; }
  .ab-mark { width:29px; height:32px; }
  .ab-nav-cta { display:none; }
  .ab-mobile-nav { top:76px; }
  .ab-hero { min-height:0; padding:120px 0 76px; }
  .ab-hero h1 { font-size:clamp(33px,8vw,44px); }
  .ab-hero-desc { font-size:13px; }
  .ab-hero-actions { flex-direction:column; }
  .ab-button { width:100%; }
  .ab-visual { max-height:none; }
  .ab-visual-top { left:14px; right:14px; top:15px; font-size:8px; }
  .ab-visual-label { font-size:7px; padding:6px; gap:6px; }
  .ab-visual-label--a { left:8px; }
  .ab-visual-label--b { right:8px; }
  .ab-visual-label--c { right:10px; }
  .ab-visual-footer { bottom:14px; left:14px; right:14px; font-size:8px; }
  .ab-story { padding:76px 0 84px; }
  .ab-story-grid { grid-template-columns:1fr; gap:27px; }
  .ab-story h2 { font-size:clamp(31px,7.8vw,43px); }
  .ab-direction { padding:78px 0 86px; }
  .ab-direction-cards { grid-template-columns:1fr; }
  .ab-direction-card,.ab-direction-card+.ab-direction-card { padding:27px 0 30px; }
  .ab-direction-card+.ab-direction-card { border-left:0; border-top:1px solid #454643; }
  .ab-direction-head h2 { font-size:34px; }
  .ab-card-top { margin-bottom:21px; }
  .ab-values { padding:76px 0 86px; }
  .ab-values-head { grid-template-columns:1fr; gap:20px; }
  .ab-values-ledger { grid-template-columns:1fr; gap:0; }
  .ab-values-ledger>.ab-reveal:last-child { grid-column:auto; max-width:none; }
  .ab-value { border-bottom:0; }
  .ab-values-ledger>.ab-reveal:last-child .ab-value { border-bottom:1px solid #333534; }
  .ab-close { padding:80px 0 85px; }
  .ab-close-grid { grid-template-columns:1fr; gap:25px; }
  .ab-close-link { width:max-content; min-height:0; min-width:215px; flex-direction:row; align-items:center; gap:20px; }
  .ab-close-link svg { align-self:center; }
  .ab-footer { padding:60px 0 25px; }
  .ab-footer-grid { grid-template-columns:1fr 1fr; gap:37px 16px; }
  .ab-footer-brand { grid-column:1/-1; }
  .ab-footer-col:last-child { grid-column:1/-1; }
}
@media (max-width:370px) { .ab-shell { width:calc(100% - 28px); } .ab-hero h1 { font-size:32px; } .ab-visual-label--a { display:none; } }
@media (prefers-reduced-motion:reduce) {
  .ab *, .ab *:before, .ab *:after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; }
  .ab-reveal { opacity:1; transform:none; }
}
`;

export default function About() {
  const { t, i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('es');
  const w = spanish ? WORDS.es : WORDS.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLanguage = () => {
    i18n.changeLanguage(spanish ? 'en' : 'es');
    setMenuOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Head title={`${t('nav_about')} | Bee Near`}>
        <meta name="description" content={spanish ? 'Conoce Bee Near: misión, visión y valores de una empresa que combina inteligencia artificial con talento humano.' : 'Discover Bee Near: our mission, vision and principles at the intersection of AI and human expertise.'} />
      </Head>
      <style>{CSS}</style>
      <div className="ab" id="top">
        <div className="ab-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

        <header className={`ab-nav${scrolled ? ' ab-nav--scroll' : ''}`}>
          <Link href="/" aria-label="Bee Near — Home"><Brand /></Link>
          <nav className="ab-nav-links" aria-label={spanish ? 'Navegación principal' : 'Main navigation'}>
            <Link href="/">{t('nav_home')}</Link>
            <Link href="/servicios">{t('nav_services')}</Link>
            <Link href="/nosotros" aria-current="page">{t('nav_about')}</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className="ab-nav-ops">
            <button type="button" className="ab-language" onClick={switchLanguage} aria-label={spanish ? 'Switch to English' : 'Cambiar a español'}><Globe2 size={15} />{spanish ? 'EN' : 'ES'}</button>
            <Link href="/contacto" className="ab-nav-cta">{t('nav_contact')}<ArrowUpRight size={15}/></Link>
            <button type="button" className="ab-menu-button" aria-expanded={menuOpen} aria-label={spanish ? 'Abrir menú' : 'Toggle navigation'} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
          </div>
        </header>
        {menuOpen && <nav className="ab-mobile-nav" aria-label={spanish ? 'Navegación móvil' : 'Mobile navigation'}>
          <Link href="/" onClick={closeMenu}>{t('nav_home')}<ArrowUpRight size={15}/></Link>
          <Link href="/servicios" onClick={closeMenu}>{t('nav_services')}<ArrowUpRight size={15}/></Link>
          <Link href="/nosotros" aria-current="page" onClick={closeMenu}>{t('nav_about')}<ArrowUpRight size={15}/></Link>
          <Link href="/blog" onClick={closeMenu}>Blog<ArrowUpRight size={15}/></Link>
          <Link href="/contacto" onClick={closeMenu}>{t('nav_contact')}<ArrowUpRight size={15}/></Link>
        </nav>}

        <main>
          <section className="ab-hero" aria-labelledby="ab-about-title">
            <div className="ab-hero-gridlines" aria-hidden="true"/>
            <div className="ab-shell ab-hero-layout">
              <div className="ab-hero-text">
                <Eyebrow>{w.section} / BEE NEAR</Eyebrow>
                <h1 id="ab-about-title">{t('about_hero_title')}</h1>
                <p className="ab-hero-desc">{t('about_hero_desc')}</p>
                <div className="ab-hero-rule">{w.heroNote}</div>
                <div className="ab-hero-actions">
                  <a className="ab-button ab-button--yellow" href="#our-story">{w.discover}<ArrowDownRight size={16}/></a>
                  <Link className="ab-button ab-button--outline" href="/contacto">{t('nav_contact')}<ArrowUpRight size={16}/></Link>
                </div>
              </div>
              <ConnectionArtwork w={w}/>
            </div>
          </section>

          <div className="ab-ribbon" aria-label="Bee Near">
            <div className="ab-ribbon-inner">
              {[0,1].map((copy) => <div className="ab-ribbon-group" key={copy} aria-hidden={copy === 1}>
                {[w.partnership,w.intro,w.connected,w.partnership,w.intro,w.connected].map((item,i) => <span className="ab-ribbon-item" key={i}>{item}<BeeMark small /></span>)}
              </div>)}
            </div>
          </div>

          <section className="ab-story" id="our-story">
            <div className="ab-shell">
              <Reveal className="ab-story-grid">
                <div>
                  <Eyebrow dark>{w.storyOverline}</Eyebrow>
                  <h2>{w.storyTitle}</h2>
                </div>
                <div>
                  <p>{w.storyDesc}</p>
                  <div className="ab-story-notation"><span>{w.introKicker}</span><span>BN / 2026</span></div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="ab-direction" aria-labelledby="ab-direction-title">
            <div className="ab-shell">
              <Reveal className="ab-direction-head">
                <div>
                  <Eyebrow>02 / {w.foundation}</Eyebrow>
                  <h2 id="ab-direction-title">{t('about_direction_title_1')} <span style={{color:'#d9b356'}}>{t('about_direction_title_highlight')}</span></h2>
                </div>
              </Reveal>
              <Reveal className="ab-direction-cards">
                <article className="ab-direction-card">
                  <div className="ab-card-top"><span className="ab-card-index">01 / {t('about_mission_title')}</span><Target className="ab-card-icon" size={26} strokeWidth={1.4}/></div>
                  <h3>{t('about_mission_title')}</h3>
                  <p>{t('about_mission_desc')}</p>
                  <div className="ab-card-bottom" aria-hidden="true"/>
                </article>
                <article className="ab-direction-card">
                  <div className="ab-card-top"><span className="ab-card-index">02 / {t('about_vision_title')}</span><Compass className="ab-card-icon" size={26} strokeWidth={1.4}/></div>
                  <h3>{t('about_vision_title')}</h3>
                  <p>{t('about_vision_desc')}</p>
                  <div className="ab-card-bottom" aria-hidden="true"/>
                </article>
              </Reveal>
            </div>
          </section>

          <section className="ab-values" id="principles" aria-labelledby="ab-values-title">
            <div className="ab-shell">
              <Reveal className="ab-values-head">
                <div>
                  <Eyebrow>{w.principlesOverline}</Eyebrow>
                  <h2 id="ab-values-title">{t('about_values_title')}</h2>
                </div>
                <p>{t('about_values_desc')}</p>
              </Reveal>
              <div className="ab-values-ledger">
                {VALUES.map(({key,icon:Icon},index) => <Reveal key={key}>
                  <div className="ab-value"><span className="ab-value-index">0{index+1}</span><Icon size={19} className="ab-value-icon" strokeWidth={1.55}/><h3>{t(key)}</h3></div>
                </Reveal>)}
              </div>
              <div className="ab-values-footnote"><span/>{w.principlesIndex}</div>
            </div>
          </section>

          <section className="ab-close">
            <div className="ab-shell">
              <Reveal className="ab-close-grid">
                <div>
                  <Eyebrow dark>{w.closingNote}</Eyebrow>
                  <h2>{t('about_cta_title_1')} <span>{t('about_cta_title_highlight')}</span></h2>
                  <p>{t('about_cta_desc')}</p>
                </div>
                <Link className="ab-close-link" href="/contacto"><span>{t('nav_contact')}</span><ArrowUpRight size={23}/></Link>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="ab-footer">
          <div className="ab-shell">
            <div className="ab-footer-grid">
              <div className="ab-footer-brand"><Link href="/"><Brand/></Link><p>{t('footer_desc')}</p></div>
              <div className="ab-footer-col"><h3>{t('footer_links')}</h3><Link href="/">{t('nav_home')}</Link><Link href="/nosotros">{t('nav_about')}</Link><Link href="/servicios">{t('nav_services')}</Link></div>
              <div className="ab-footer-col"><h3>{w.reach}</h3><Link href="/contacto">{t('nav_contact')}</Link><Link href="/blog">Blog</Link><a href="/docs/privacy_policy_for_website.pdf" target="_blank" rel="noopener noreferrer">{t('footer_privacy')}</a></div>
              <div className="ab-footer-col"><h3>{t('footer_contact')}</h3><a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a><a href="tel:+12153180179">+1 (215) 318-0179</a><span>Ejército Nacional 373, CDMX</span></div>
            </div>
            <div className="ab-footer-bottom"><span>© {new Date().getFullYear()} Bee Near. {t('footer_rights')}</span><span>{w.partnership}</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}
