import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Globe2, Menu, X,
  Headphones, TrendingUp, Check, Sparkles, Mail, Phone, MapPin,
  AudioLines, BrainCircuit, UserRoundCheck, ScanSearch, Workflow,
  ChevronRight, ShieldCheck, MoveUpRight,
} from 'lucide-react';

/**
 * BEE NEAR / SERVICES — EDITORIAL EDITION
 * Reemplazar: resources/js/Pages/Services.jsx
 * Mantiene los textos existentes de i18next, las rutas Inertia y los diez beneficios originales.
 * No utiliza librerías nuevas.
 */

const COPY = {
  es: {
    index: '02 / NUESTROS SERVICIOS',
    heroLabel: 'UNA OPERACIÓN, DOS ESPECIALIDADES',
    heroCaption: 'HUMAN × INTELLIGENCE',
    heroExplore: 'Explorar soluciones',
    heroContact: 'Hablemos de tu operación',
    consoleTitle: 'ARQUITECTURA DE SERVICIO',
    consoleNote: 'Visualización conceptual del flujo de atención y ventas',
    consoleHint: 'Selecciona una solución para explorar su flujo',
    contactName: 'Atención inteligente',
    salesName: 'Ventas inteligentes',
    careFlow: ['Contacto entrante', 'COMI identifica', 'Equipo humano', 'Seguimiento'],
    salesFlow: ['Prospección', 'Calificación IA', 'Transferencia', 'Cierre'],
    careDiagram: 'COORDINACIÓN DE ATENCIÓN',
    salesDiagram: 'CICLO COMERCIAL',
    careKicker: '01 / CUSTOMER OPERATIONS',
    salesKicker: '02 / SALES OPERATIONS',
    solutionsNote: 'SOLUCIONES / 02',
    deeper: 'Conocer solución',
    careMini: 'ATENCIÓN · SOPORTE · RETENCIÓN',
    salesMini: 'PROSPECCIÓN · CALIFICACIÓN · VENTAS',
    editorialIndex: '03 / EL DIFERENCIAL',
    editorialBadge: 'INTELIGENCIA CON CONTINUIDAD',
    editorialLead: 'Tecnología para escalar. Personas para conectar.',
    editorialSub: 'No son dos sistemas separados. Es una experiencia continua, desde el primer contacto hasta la siguiente acción.',
    combined: 'CONEXIÓN OPERATIVA',
    first: 'AUTOMATIZACIÓN',
    second: 'EXPERIENCIA HUMANA',
    third: 'RESULTADOS',
    closingKicker: 'EL SIGUIENTE PASO',
    footerTag: 'Interacciones inteligentes. Resultados humanos.',
    footerServices: 'SOLUCIONES',
    footerCompany: 'EMPRESA',
    footerContact: 'CONTACTO',
    rights: 'Todos los derechos reservados.',
    privacy: 'Aviso de privacidad',
  },
  en: {
    index: '02 / OUR SERVICES',
    heroLabel: 'ONE OPERATION, TWO DISCIPLINES',
    heroCaption: 'HUMAN × INTELLIGENCE',
    heroExplore: 'Explore solutions',
    heroContact: 'Talk about your operation',
    consoleTitle: 'SERVICE ARCHITECTURE',
    consoleNote: 'Conceptual visualization of service and sales workflows',
    consoleHint: 'Select a solution to explore its workflow',
    contactName: 'Intelligent care',
    salesName: 'Intelligent sales',
    careFlow: ['First contact', 'COMI detects', 'Human team', 'Follow-up'],
    salesFlow: ['Prospecting', 'AI qualification', 'Live handoff', 'Closing'],
    careDiagram: 'CARE COORDINATION',
    salesDiagram: 'SALES JOURNEY',
    careKicker: '01 / CUSTOMER OPERATIONS',
    salesKicker: '02 / SALES OPERATIONS',
    solutionsNote: 'SOLUTIONS / 02',
    deeper: 'Discover solution',
    careMini: 'CARE · SUPPORT · RETENTION',
    salesMini: 'PROSPECTING · QUALIFICATION · SALES',
    editorialIndex: '03 / THE DIFFERENCE',
    editorialBadge: 'INTELLIGENCE WITH CONTINUITY',
    editorialLead: 'Technology for scale. People for connection.',
    editorialSub: 'Not two disconnected systems. One continuous experience, from the first interaction to the next action.',
    combined: 'CONNECTED OPERATIONS',
    first: 'AUTOMATION',
    second: 'HUMAN EXPERTISE',
    third: 'OUTCOMES',
    closingKicker: 'THE NEXT STEP',
    footerTag: 'Intelligent interactions. Human outcomes.',
    footerServices: 'SOLUTIONS',
    footerCompany: 'COMPANY',
    footerContact: 'GET IN TOUCH',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
  },
};

function BeeMark({ small = false }) {
  return (
    <span className={`sv-mark${small ? ' sv-mark--small' : ''}`} aria-hidden="true">
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
    <span className="sv-brand">
      <BeeMark />
      <span className="sv-brand-wording"><span className="sv-brand-name">Bee<b>Near</b></span><span className="sv-brand-tag">HUMAN × INTELLIGENCE</span></span>
    </span>
  );
}

function Eyebrow({ children, dark = false }) {
  return <div className={`sv-eyebrow${dark ? ' sv-eyebrow--dark' : ''}`}><i />{children}</div>;
}

function Reveal({ children, className = '' }) {
  const node = useRef(null);
  useEffect(() => {
    const element = node.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('sv-in');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('sv-in'); observer.unobserve(element); }
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={node} className={`sv-reveal ${className}`}>{children}</div>;
}

function RouteDiagram({ type, names, compact = false }) {
  const isSales = type === 'sales';
  return (
    <div className={`sv-flow sv-flow--${type}${compact ? ' sv-flow--compact' : ''}`} aria-label={names.join(' → ')}>
      <div className="sv-flow-lines" aria-hidden="true">
        <svg viewBox="0 0 600 114" preserveAspectRatio="none" fill="none">
          <path className="sv-flow-base" d="M54 57H546" stroke="currentColor" strokeWidth="1" strokeDasharray="5 8" />
          <path className="sv-flow-active" d="M54 57H546" stroke="currentColor" strokeWidth="1.7" strokeDasharray="24 468" />
        </svg>
      </div>
      <div className="sv-flow-steps">
        {names.map((name, index) => (
          <div className="sv-flow-step" key={`${type}-${index}`}>
            <span className={`sv-flow-node${index === 1 || (isSales && index === 2) ? ' sv-flow-node--accent' : ''}`}>
              {index === 0 ? <ScanSearch size={compact ? 13 : 17} /> : index === 1 ? <BrainCircuit size={compact ? 13 : 17} /> : index === 2 ? <UserRoundCheck size={compact ? 13 : 17} /> : <Check size={compact ? 13 : 17} />}
            </span>
            <span className="sv-flow-step-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceConsole({ w, t }) {
  const [selected, setSelected] = useState('care');
  const isCare = selected === 'care';
  const names = isCare ? w.careFlow : w.salesFlow;
  const feature = isCare ? t('cc_item1') : t('is_item1');
  return (
    <div className="sv-console">
      <div className="sv-console-head">
        <div className="sv-console-label"><span className="sv-console-light" />{w.consoleTitle}</div>
        <span className="sv-console-id">BN / 02</span>
      </div>
      <div className="sv-console-selector" role="group" aria-label={w.consoleHint}>
        <button type="button" className={isCare ? 'sv-console-tab sv-console-tab--active' : 'sv-console-tab'} onClick={() => setSelected('care')} aria-pressed={isCare}>
          <Headphones size={15} /> {w.contactName}
        </button>
        <button type="button" className={!isCare ? 'sv-console-tab sv-console-tab--active' : 'sv-console-tab'} onClick={() => setSelected('sales')} aria-pressed={!isCare}>
          <TrendingUp size={15} /> {w.salesName}
        </button>
      </div>
      <div className="sv-console-body" key={selected}>
        <div className="sv-console-body-head"><span>{isCare ? w.careDiagram : w.salesDiagram}</span><span>0{isCare ? '1' : '2'} / 02</span></div>
        <div className="sv-console-center">
          <div className="sv-console-halo" aria-hidden="true" />
          <div className="sv-console-core"><BeeMark small /><strong>COMI</strong><small>AI ENGINE</small></div>
          <div className="sv-console-orbit sv-console-orbit--one" aria-hidden="true" />
          <div className="sv-console-orbit sv-console-orbit--two" aria-hidden="true" />
        </div>
        <RouteDiagram type={selected} names={names} compact />
        <div className="sv-console-bottom"><span className="sv-console-pulse" /><span>{feature}</span></div>
      </div>
      <p className="sv-console-footnote">{w.consoleNote}</p>
    </div>
  );
}

function ServicePanel({ type, number, title, points, label, href, w }) {
  const isCare = type === 'care';
  const Icon = isCare ? Headphones : TrendingUp;
  return (
    <article className={`sv-service sv-service--${type}`}>
      <div className="sv-service-top">
        <span className="sv-service-index">{number} <span>/ 02</span></span>
        <span className="sv-service-cat">{isCare ? w.careKicker : w.salesKicker}</span>
      </div>
      <div className="sv-service-icon"><Icon size={22} strokeWidth={1.6}/></div>
      <h3>{title}</h3>
      <p className="sv-service-mini">{isCare ? w.careMini : w.salesMini}</p>
      <div className="sv-service-diagram"><RouteDiagram type={type} names={isCare ? w.careFlow : w.salesFlow} /></div>
      <div className="sv-service-details"><span>{isCare ? w.careDiagram : w.salesDiagram}</span><span>BN / {number}</span></div>
      <ul className="sv-service-list">
        {points.map((point, i) => (
          <li key={i}><span className="sv-service-tick"><Check size={14} strokeWidth={2.3} /></span><span>{point}</span></li>
        ))}
      </ul>
      <Link href={href} className="sv-service-link" aria-label={`${w.deeper}: ${title}`}><span>{label}</span><ArrowUpRight size={19}/></Link>
    </article>
  );
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.sv { --sv-yellow:#f5be1e; --sv-cream:#f2f0eb; --sv-ink:#101112; color:var(--sv-cream); background:var(--sv-ink); font-family:'DM Sans',Arial,sans-serif; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
.sv *,.sv *:before,.sv *:after { box-sizing:border-box; }
.sv a { text-decoration:none; }
.sv button { cursor:pointer; }
.sv h1,.sv h2,.sv h3,.sv h4,.sv p { margin:0; }
.sv ::selection { background:var(--sv-yellow); color:var(--sv-ink); }
.sv-shell { width:min(1260px,calc(100% - 104px)); margin:auto; }
.sv-mark { display:inline-flex; width:31px; height:34px; flex:none; color:var(--sv-yellow); }
.sv-mark svg { width:100%; height:100%; }
.sv-mark--small { width:26px; height:28px; }
.sv-brand { display:inline-flex; align-items:center; gap:10px; color:#f5f3ed; white-space:nowrap; }
.sv-brand-wording { display:flex; flex-direction:column; }
.sv-brand-name { font:700 18px/1.1 Manrope,Arial,sans-serif; letter-spacing:-.8px; }
.sv-brand-name b { color:var(--sv-yellow); }
.sv-brand-tag { margin-top:4px; color:#858b89; font-size:7px; letter-spacing:1.55px; font-weight:700; }
.sv-nav { position:fixed; z-index:100; left:50%; transform:translateX(-50%); top:18px; width:min(1252px,calc(100% - 64px)); min-height:63px; padding:9px 14px 9px 21px; display:flex; align-items:center; justify-content:space-between; gap:20px; border:1px solid rgba(255,255,255,.12); border-radius:12px; background:rgba(16,17,18,.85); box-shadow:0 12px 40px rgba(0,0,0,.2); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); transition:top .25s,background .25s; }
.sv-nav--scroll { top:9px; background:rgba(14,15,16,.97); }
.sv-nav-links { display:flex; align-items:center; gap:29px; }
.sv-nav-links a { position:relative; color:#aaaead; font-size:12px; font-weight:500; transition:color .2s; }
.sv-nav-links a:hover,.sv-nav-links a[aria-current=page] { color:#f0ede5; }
.sv-nav-links a[aria-current=page]:after { content:''; position:absolute; bottom:-10px; left:0; width:100%; height:2px; background:var(--sv-yellow); }
.sv-nav-ops { display:flex; align-items:center; gap:17px; }
.sv-language { display:inline-flex; align-items:center; gap:7px; border:0; background:transparent; padding:10px 2px; font-size:11px; letter-spacing:.6px; font-weight:700; color:#d7d6d0; }
.sv-nav-cta { display:inline-flex; align-items:center; gap:17px; padding:13px 15px; background:var(--sv-yellow); border-radius:6px; color:#121212; font-size:11px; font-weight:700; white-space:nowrap; transition:transform .2s,background .2s; }
.sv-nav-cta:hover { transform:translateY(-2px); background:#fbd15b; }
.sv-menu-button { display:none; align-items:center; justify-content:center; width:40px; height:40px; background:#252729; border:1px solid #3a3b3b; border-radius:7px; color:#fff; }
.sv-mobile-nav { position:fixed; z-index:99; top:84px; left:12px; right:12px; padding:10px; border:1px solid #383a3a; border-radius:11px; background:#1b1d1e; box-shadow:0 28px 65px #000a; }
.sv-mobile-nav a,.sv-mobile-nav button { width:100%; display:flex; justify-content:space-between; align-items:center; background:transparent; border:0; border-bottom:1px solid #353636; color:#eee; padding:15px 12px; font:600 13px 'DM Sans',Arial,sans-serif; text-align:left; }
.sv-progress { position:fixed; top:0; left:0; height:2px; z-index:110; background:var(--sv-yellow); transition:width .1s linear; }
.sv-eyebrow { display:flex; align-items:center; gap:11px; font-size:9px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; color:var(--sv-yellow); }
.sv-eyebrow i { display:block; width:23px; height:1px; background:currentColor; flex:none; }
.sv-eyebrow--dark { color:#947321; }
.sv-hero { position:relative; isolation:isolate; min-height:700px; padding:145px 0 87px; background:#101112; overflow:hidden; }
.sv-hero:before { content:''; position:absolute; inset:0; z-index:-1; background:radial-gradient(ellipse at 76% 39%,rgba(245,190,30,.065),transparent 38%),radial-gradient(ellipse at 0% 89%,rgba(245,190,30,.025),transparent 34%); }
.sv-gridlines { position:absolute; inset:0; pointer-events:none; opacity:.13; background-image:linear-gradient(90deg,rgba(255,255,255,.17) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px); background-size:104px 104px; mask-image:linear-gradient(to bottom,black,transparent 92%); }
.sv-hero-layout { display:grid; grid-template-columns:minmax(0,.97fr) minmax(0,1.03fr); gap:clamp(32px,5.5vw,80px); align-items:center; position:relative; }
.sv-hero-copy { min-width:0; }
.sv-hero h1 { font:700 clamp(39px,3.65vw,57px)/1.14 Manrope,Arial,sans-serif; letter-spacing:-.055em; margin:24px 0 20px; max-width:630px; }
.sv-hero-desc { color:#adb0ac; font-size:15px; line-height:1.8; max-width:560px; }
.sv-hero-specialties { display:flex; align-items:center; flex-wrap:wrap; gap:12px; margin-top:24px; color:#a7a9a6; font-size:10px; font-weight:700; letter-spacing:.6px; }
.sv-hero-specialties svg { color:#d1af5b; }
.sv-hero-specialties em { font-style:normal; color:#50514d; }
.sv-hero-actions { display:flex; align-items:center; flex-wrap:wrap; gap:10px; margin-top:27px; }
.sv-button { min-height:48px; border-radius:6px; padding:0 18px; font-size:11px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:13px; transition:transform .2s,background .2s,border-color .2s; }
.sv-button:hover { transform:translateY(-2px); }
.sv-button--yellow { color:#121212; background:var(--sv-yellow); }
.sv-button--yellow:hover { background:#fbd15b; }
.sv-button--outline { border:1px solid #484a48; color:#eae9e5; }
.sv-button--outline:hover { border-color:var(--sv-yellow); }
.sv-console { width:100%; max-width:630px; margin-left:auto; overflow:hidden; border-radius:11px; border:1px solid rgba(255,255,255,.13); background:linear-gradient(145deg,#222425,#171819 58%,#111314); box-shadow:0 22px 60px #0005,inset 0 1px rgba(255,255,255,.03); }
.sv-console-head { display:flex; justify-content:space-between; align-items:center; gap:15px; padding:17px 20px; border-bottom:1px solid rgba(255,255,255,.09); }
.sv-console-label { display:flex; align-items:center; gap:9px; color:#deddd8; font-size:9px; font-weight:700; letter-spacing:1.12px; }
.sv-console-light { display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--sv-yellow); box-shadow:0 0 11px rgba(245,190,30,.5); }
.sv-console-id { color:#7c7e7b; font-size:9px; letter-spacing:1.2px; }
.sv-console-selector { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; padding:13px 15px; }
.sv-console-tab { display:flex; align-items:center; justify-content:center; gap:9px; padding:10px 8px; border:1px solid rgba(255,255,255,.075); border-radius:6px; background:#17191a; color:#8c8f8d; font-size:11px; font-weight:700; transition:background .2s,color .2s,border-color .2s; }
.sv-console-tab:hover { color:#eee; }
.sv-console-tab--active { border-color:rgba(245,190,30,.32); color:#ead7a0; background:#2b271e; }
.sv-console-body { margin:0 15px; min-height:348px; background:linear-gradient(180deg,#161819,#121416); border:1px solid rgba(255,255,255,.075); border-radius:7px; padding:15px 13px 12px; animation:sv-change .35s ease-out both; }
.sv-console-body-head { display:flex; justify-content:space-between; color:#8a8d88; font-size:9px; font-weight:700; letter-spacing:1.05px; }
.sv-console-center { position:relative; height:172px; display:grid; place-items:center; overflow:hidden; }
.sv-console-halo { position:absolute; width:150px; height:150px; background:radial-gradient(circle,rgba(245,190,30,.07),transparent 70%); }
.sv-console-orbit { position:absolute; width:145px; height:145px; border-radius:50%; border:1px solid rgba(245,190,30,.22); border-top-color:rgba(245,190,30,.9); animation:sv-spin 17s linear infinite; }
.sv-console-orbit--two { width:116px; height:116px; border-top-color:#e0b94b; border-left-color:rgba(245,190,30,.38); animation-duration:11s; animation-direction:reverse; }
.sv-console-core { position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1px; width:88px; height:88px; border:1px solid rgba(245,190,30,.35); border-radius:50%; background:#111314; box-shadow:0 0 35px rgba(245,190,30,.12); }
.sv-console-core strong { color:#f3f2ed; font:800 15px Manrope,Arial,sans-serif; letter-spacing:1.4px; }
.sv-console-core small { color:#c3a457; font-size:6px; letter-spacing:1.5px; }
.sv-console-bottom { display:flex; align-items:center; gap:9px; min-height:35px; margin-top:10px; padding:10px 8px 1px; border-top:1px solid rgba(255,255,255,.065); color:#aaaead; font-size:10px; line-height:1.4; }
.sv-console-pulse { width:6px; height:6px; flex:none; border-radius:50%; background:#d9b34e; animation:sv-glow 2.1s ease-in-out infinite; }
.sv-console-footnote { padding:12px 19px 16px; color:#7e827e; font-size:9px; line-height:1.5; }
.sv-flow { position:relative; min-height:138px; display:flex; align-items:center; justify-content:center; width:100%; overflow:hidden; }
.sv-flow-lines { position:absolute; inset:0; color:#c9a64c; opacity:.65; pointer-events:none; }
.sv-flow-lines svg { width:100%; height:100%; }
.sv-flow-active { animation:sv-travel 4.2s linear infinite; }
.sv-flow-steps { position:relative; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); width:100%; gap:3px; align-items:start; }
.sv-flow-step { display:flex; flex-direction:column; align-items:center; gap:12px; min-width:0; text-align:center; }
.sv-flow-node { display:grid; place-items:center; border-radius:50%; width:43px; height:43px; flex:none; background:#252728; color:#bdbeb8; border:1px solid #494943; box-shadow:0 0 0 6px rgba(16,17,18,.78); }
.sv-flow-node--accent { border-color:#b08a31; color:#f5be1e; box-shadow:0 0 0 6px rgba(16,17,18,.78),0 0 22px rgba(245,190,30,.1); }
.sv-flow-step-name { max-width:105px; color:#c6c6bf; font-size:10px; font-weight:600; line-height:1.4; }
.sv-flow--compact { min-height:95px; }
.sv-flow--compact .sv-flow-node { width:32px; height:32px; box-shadow:0 0 0 5px #141618; }
.sv-flow--compact .sv-flow-step { gap:8px; }
.sv-flow--compact .sv-flow-step-name { font-size:9px; }
.sv-services { padding:108px 0 118px; background:#141617; }
.sv-section-header { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.78fr); gap:60px; align-items:end; margin-bottom:37px; }
.sv-section-header h2 { font:700 clamp(36px,3.8vw,56px)/1.13 Manrope,Arial,sans-serif; letter-spacing:-.055em; margin-top:20px; }
.sv-section-header h2 em { font-style:normal; color:#d9b356; }
.sv-section-note { text-align:right; max-width:400px; margin-left:auto; }
.sv-section-note span { display:block; color:#bb9950; font-size:10px; font-weight:700; letter-spacing:1.4px; margin-bottom:12px; }
.sv-section-note p { color:#9b9d99; font-size:13px; line-height:1.75; }
.sv-service-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
.sv-service { position:relative; min-width:0; display:flex; flex-direction:column; padding:33px 34px 30px; border-radius:9px; overflow:hidden; transition:transform .35s,box-shadow .35s; }
.sv-service:hover { transform:translateY(-5px); box-shadow:0 28px 55px #0003; }
.sv-service--care { background:#ebe9e2; color:#171819; }
.sv-service--sales { background:#202223; color:#f1f0e9; border:1px solid rgba(255,255,255,.09); }
.sv-service-top { display:flex; align-items:center; justify-content:space-between; gap:15px; }
.sv-service-index { font:700 12px Manrope,Arial,sans-serif; }
.sv-service-index span { opacity:.45; font-weight:500; }
.sv-service-cat { font-size:9px; font-weight:700; letter-spacing:1px; text-align:right; }
.sv-service-icon { display:grid; place-items:center; width:46px; height:46px; border:1px solid currentColor; border-radius:50%; opacity:.74; margin:32px 0 19px; }
.sv-service--care .sv-service-icon { color:#997b2c; }
.sv-service--sales .sv-service-icon { color:#f5be1e; }
.sv-service h3 { font:700 clamp(25px,2.4vw,35px)/1.18 Manrope,Arial,sans-serif; letter-spacing:-.045em; max-width:470px; }
.sv-service-mini { color:#98731c; font-size:10px; font-weight:700; letter-spacing:.9px; margin-top:13px!important; }
.sv-service--sales .sv-service-mini { color:#d9b356; }
.sv-service-diagram { margin-top:24px; padding:11px 0 7px; border-top:1px solid currentColor; border-bottom:1px solid currentColor; border-color:rgba(130,125,113,.24); }
.sv-service--care .sv-flow-lines { color:#9b7f38; }
.sv-service--care .sv-flow-node { background:#e8e5dd; box-shadow:0 0 0 6px #ebe9e2; }
.sv-service--care .sv-flow-step-name { color:#5d5c55; }
.sv-service--care .sv-flow-node--accent { color:#a57d1c; }
.sv-service-details { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:14px; color:#86857c; font-size:9px; font-weight:700; letter-spacing:1.05px; }
.sv-service--sales .sv-service-details { color:#828581; }
.sv-service-list { list-style:none; padding:0; margin:26px 0 28px; display:flex; flex-direction:column; gap:17px; flex:1; }
.sv-service-list li { display:flex; align-items:flex-start; gap:11px; font-size:13px; line-height:1.6; }
.sv-service--care .sv-service-list li { color:#4b4c49; }
.sv-service--sales .sv-service-list li { color:#c4c4bf; }
.sv-service-tick { width:20px; height:20px; flex:none; display:grid; place-items:center; border:1px solid rgba(166,136,51,.55); border-radius:50%; color:#a58229; margin-top:1px; }
.sv-service--sales .sv-service-tick { color:#e5bd54; border-color:rgba(245,190,30,.4); }
.sv-service-link { display:flex; align-items:center; justify-content:space-between; gap:15px; color:inherit; padding-top:18px; border-top:1px solid rgba(125,121,108,.26); font-size:12px; font-weight:700; }
.sv-service--sales .sv-service-link { color:#ebc05b; }
.sv-service-link svg { transition:transform .25s; }
.sv-service-link:hover svg { transform:translate(4px,-4px); }
.sv-difference { position:relative; padding:110px 0; color:#161819; background:#f2f0eb; overflow:hidden; }
.sv-difference-grid { display:grid; grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr); gap:clamp(38px,6vw,90px); align-items:center; }
.sv-difference h2 { font:700 clamp(34px,3.4vw,50px)/1.19 Manrope,Arial,sans-serif; letter-spacing:-.053em; margin:21px 0; }
.sv-difference h2 em { font-style:normal; color:#a68125; }
.sv-difference-lead { color:#686960; font-size:14px; line-height:1.85; max-width:515px; }
.sv-difference-signature { padding-top:24px; margin-top:28px; border-top:1px solid #d7d2c8; font-size:12px; font-weight:700; color:#78776e; }
.sv-equation { border:1px solid #d9d4c9; border-radius:10px; padding:24px 26px 23px; background:#e9e6de; box-shadow:0 16px 50px rgba(0,0,0,.045); }
.sv-equation-head { display:flex; align-items:center; justify-content:space-between; gap:14px; font-size:10px; font-weight:700; letter-spacing:1.25px; color:#77786f; padding-bottom:22px; border-bottom:1px solid #d1ccc1; }
.sv-equation-head svg { color:#a78637; }
.sv-equation-row { display:grid; grid-template-columns:39px minmax(0,1fr) auto; align-items:center; gap:14px; min-height:81px; border-bottom:1px solid #d3cfc5; }
.sv-equation-number { color:#ae8b35; font-size:10px; font-weight:800; }
.sv-equation-name { color:#242625; font:700 13px/1.5 Manrope,Arial,sans-serif; }
.sv-equation-operator { color:#b3934f; font-size:17px; }
.sv-equation-total { margin-top:20px; padding:20px; background:#151719; border-radius:6px; display:flex; justify-content:space-between; align-items:center; gap:14px; color:#f3f0e8; }
.sv-equation-total span { font-size:12px; font-weight:700; }
.sv-equation-total svg { color:#e9bc52; }
.sv-bridge { background:#1b1d1e; padding:82px 0; border-top:1px solid rgba(255,255,255,.08); }
.sv-bridge-layout { display:grid; grid-template-columns: .55fr 1.45fr; gap:70px; align-items:center; }
.sv-bridge-signature { color:#e4b953; display:flex; flex-direction:column; align-items:flex-start; gap:19px; }
.sv-bridge-signature .sv-mark { width:55px; height:60px; }
.sv-bridge-signature span { font-size:9px; letter-spacing:1.5px; font-weight:700; }
.sv-bridge h2 { font:700 clamp(29px,3vw,43px)/1.18 Manrope,Arial,sans-serif; letter-spacing:-.048em; }
.sv-bridge p { margin-top:17px; color:#949792; font-size:14px; line-height:1.75; }
.sv-cta { background:#e8e5dc; color:#17191a; padding:95px 0 100px; border-top:4px solid #e5b73d; position:relative; overflow:hidden; }
.sv-cta:before { content:''; position:absolute; width:520px; height:520px; right:-40px; top:-320px; border:1px solid rgba(24,24,20,.055); border-radius:50%; box-shadow:0 0 0 85px rgba(24,24,20,.01); }
.sv-cta-layout { position:relative; display:grid; grid-template-columns:1fr auto; gap:45px; align-items:center; }
.sv-cta-kicker { font-size:9px; letter-spacing:1.6px; color:#937019; font-weight:700; }
.sv-cta h2 { font:700 clamp(39px,4.2vw,61px)/1.17 Manrope,Arial,sans-serif; letter-spacing:-.06em; margin:18px 0; }
.sv-cta h2 em { font-style:normal; color:#a88123; }
.sv-cta p { color:#60605a; font-size:14px; line-height:1.75; max-width:515px; }
.sv-cta-link { min-width:160px; height:155px; background:#17191a; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between; gap:12px; color:#f0eee9; padding:23px; transition:transform .2s,background .2s; }
.sv-cta-link:hover { transform:translateY(-4px); background:#242626; }
.sv-cta-link span { font-size:12px; font-weight:700; max-width:110px; }
.sv-cta-link svg { align-self:flex-end; }
.sv-footer { background:#111314; padding:65px 0 24px; }
.sv-footer-grid { display:grid; grid-template-columns:1.5fr .78fr .78fr 1fr; gap:40px; padding-bottom:55px; }
.sv-footer-description { max-width:280px; margin-top:20px!important; color:#858789; font-size:13px; line-height:1.75; }
.sv-footer-col { display:flex; flex-direction:column; align-items:flex-start; gap:14px; }
.sv-footer-col h4 { margin:0 0 8px; color:#d2ac49; font-size:9px; font-weight:700; letter-spacing:1.5px; }
.sv-footer-col a,.sv-footer-col span { color:#aaaead; font-size:12px; line-height:1.6; transition:color .2s; overflow-wrap:anywhere; }
.sv-footer-col a:hover { color:var(--sv-yellow); }
.sv-footer-bottom { border-top:1px solid rgba(255,255,255,.12); padding-top:24px; color:#7b7e7b; font-size:11px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; }
.sv-footer-bottom a { color:#aaaead; }
.sv-reveal { opacity:0; transform:translateY(19px); transition:opacity .7s ease,transform .7s ease; }
.sv-reveal.sv-in { opacity:1; transform:none; }
@keyframes sv-spin { to { transform:rotate(360deg); } }
@keyframes sv-glow { 50% { opacity:.34; box-shadow:0 0 10px #f5be1e; } }
@keyframes sv-travel { to { stroke-dashoffset:-492; } }
@keyframes sv-change { from { opacity:.6; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
@media(max-width:1200px) {
 .sv-shell { width:calc(100% - 70px); }
 .sv-nav-links { gap:17px; }
 .sv-hero-layout { gap:36px; }
 .sv-service { padding:27px; }
}
@media(max-width:960px) {
 .sv-nav-links { display:none; }
 .sv-menu-button { display:flex; }
 .sv-hero { min-height:auto; padding:140px 0 94px; }
 .sv-hero-layout { grid-template-columns:1fr; gap:36px; }
 .sv-hero-copy { max-width:700px; }
 .sv-console { margin-inline:auto; max-width:640px; }
 .sv-section-header { grid-template-columns:1fr; gap:20px; }
 .sv-section-note { margin:0; text-align:left; }
 .sv-difference-grid { grid-template-columns:1fr; gap:40px; }
 .sv-bridge-layout { grid-template-columns:1fr 1.5fr; gap:28px; }
 .sv-footer-grid { grid-template-columns:repeat(3,1fr); }
 .sv-footer-grid > :first-child { grid-column:1/4; }
}
@media(max-width:700px) {
 .sv-shell { width:calc(100% - 40px); }
 .sv-nav { top:10px; width:calc(100% - 24px); padding:9px 12px; }
 .sv-nav-ops { gap:9px; }
 .sv-nav-cta { display:none; }
 .sv-hero { padding:123px 0 68px; }
 .sv-hero h1 { font-size:clamp(34px,8.3vw,46px); }
 .sv-hero-desc { font-size:13px; }
 .sv-hero-actions .sv-button { width:100%; }
 .sv-console-head { padding:14px; }
 .sv-console-selector { padding:10px; }
 .sv-console-tab { font-size:10px; gap:5px; }
 .sv-console-body { margin:0 10px; min-height:326px; }
 .sv-console-center { height:164px; }
 .sv-flow-step-name { font-size:8.4px; }
 .sv-flow-node { width:36px; height:36px; }
 .sv-services { padding:80px 0; }
 .sv-section-header h2 { font-size:clamp(34px,8vw,44px); }
 .sv-service-grid { grid-template-columns:1fr; }
 .sv-service { padding:27px 24px; }
 .sv-service h3 { font-size:28px; }
 .sv-service-list li { font-size:13px; }
 .sv-difference { padding:80px 0; }
 .sv-difference h2 { font-size:clamp(32px,7.5vw,42px); }
 .sv-equation { padding:17px; }
 .sv-bridge { padding:72px 0; }
 .sv-bridge-layout { grid-template-columns:1fr; }
 .sv-cta { padding:80px 0 84px; }
 .sv-cta-layout { grid-template-columns:1fr; gap:23px; }
 .sv-cta h2 { font-size:clamp(36px,8.5vw,49px); }
 .sv-cta-link { width:max-content; height:auto; min-width:200px; padding:19px 22px; flex-direction:row; align-items:center; }
 .sv-footer-grid { grid-template-columns:1fr 1fr; gap:28px 20px; }
 .sv-footer-grid > :first-child { grid-column:1/3; }
 .sv-footer-grid > :last-child { grid-column:1/3; }
}
@media(max-width:380px) {
 .sv-shell { width:calc(100% - 28px); }
 .sv-hero h1 { font-size:32px; }
 .sv-console-tab { font-size:9px; }
 .sv-flow--compact .sv-flow-step-name { font-size:8px; }
}
@media(prefers-reduced-motion:reduce) {
 .sv *, .sv *:before, .sv *:after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; }
 .sv-reveal { opacity:1; transform:none; }
}
`;

export default function Services() {
  const { t, i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('es');
  const w = spanish ? COPY.es : COPY.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 35);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, (window.scrollY / max) * 100));
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive:true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  useEffect(() => { document.documentElement.lang = spanish ? 'es' : 'en'; }, [spanish]);

  const flipLanguage = () => { i18n.changeLanguage(spanish ? 'en' : 'es'); setMenuOpen(false); };
  const closeMenu = () => setMenuOpen(false);
  const carePoints = Array.from({ length:5 }, (_, i) => t(`cc_item${i + 1}`));
  const salesPoints = Array.from({ length:5 }, (_, i) => t(`is_item${i + 1}`));
  const difference = ['srv_blackcard_item1','srv_blackcard_item2','srv_blackcard_item3'].map(key => t(key));

  return (
    <>
      <Head title={`${t('nav_services')} | Bee Near`}>
        <meta name="description" content={spanish ? 'Soluciones Bee Near de Contact Center inteligente e Intake Sales: IA conversacional y talento humano en una operación conectada.' : 'Explore Bee Near intelligent Contact Center and Intake Sales solutions, combining conversational AI with human expertise.'}/>
      </Head>
      <style>{STYLES}</style>
      <div className="sv" id="top">
        <div className="sv-progress" aria-hidden="true" style={{ width:`${progress}%` }}/>
        <header className={`sv-nav${scrolled ? ' sv-nav--scroll' : ''}`}>
          <Link href="/" aria-label="Bee Near home"><Brand /></Link>
          <nav className="sv-nav-links" aria-label="Main navigation">
            <Link href="/">{t('nav_home')}</Link>
            <Link href="/servicios" aria-current="page">{t('nav_services')}</Link>
            <Link href="/nosotros">{t('nav_about')}</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className="sv-nav-ops">
            <button className="sv-language" onClick={flipLanguage} type="button" aria-label={spanish ? 'Switch to English' : 'Cambiar a español'}><Globe2 size={15}/>{spanish ? 'EN' : 'ES'}</button>
            <Link href="/contacto" className="sv-nav-cta">{t('nav_contact')}<ArrowUpRight size={16}/></Link>
            <button className="sv-menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
          </div>
        </header>
        {menuOpen && <nav className="sv-mobile-nav" aria-label="Mobile navigation">
          <Link onClick={closeMenu} href="/">{t('nav_home')}<ArrowUpRight size={15}/></Link>
          <Link onClick={closeMenu} href="/servicios" aria-current="page">{t('nav_services')}<ArrowUpRight size={15}/></Link>
          <Link onClick={closeMenu} href="/nosotros">{t('nav_about')}<ArrowUpRight size={15}/></Link>
          <Link onClick={closeMenu} href="/blog">Blog<ArrowUpRight size={15}/></Link>
          <Link onClick={closeMenu} href="/contacto">{t('nav_contact')}<ArrowUpRight size={15}/></Link>
          <button onClick={flipLanguage} type="button">{spanish ? 'English' : 'Español'}<Globe2 size={15}/></button>
        </nav>}

        <main>
          <section className="sv-hero" aria-labelledby="sv-title">
            <div className="sv-gridlines" aria-hidden="true"/>
            <div className="sv-shell sv-hero-layout">
              <div className="sv-hero-copy">
                <Eyebrow>{w.heroLabel}</Eyebrow>
                <h1 id="sv-title">{t('portfolio_title')}</h1>
                <p className="sv-hero-desc">{t('portfolio_desc')}</p>
                <div className="sv-hero-specialties"><AudioLines size={15}/><span>CONTACT CENTER</span><em>/</em><TrendingUp size={15}/><span>INTAKE SALES</span></div>
                <div className="sv-hero-actions">
                  <a href="#solutions" className="sv-button sv-button--yellow">{w.heroExplore}<ArrowDownRight size={17}/></a>
                  <Link href="/contacto" className="sv-button sv-button--outline">{w.heroContact}<ArrowUpRight size={16}/></Link>
                </div>
              </div>
              <ServiceConsole w={w} t={t}/>
            </div>
          </section>

          <section className="sv-services" id="solutions">
            <div className="sv-shell">
              <Reveal className="sv-section-header">
                <div><Eyebrow>{t('services_what_pretitle')}</Eyebrow><h2>{t('services_what_title_1')} <em>{t('services_what_title_highlight')}</em></h2></div>
                <div className="sv-section-note"><span>{w.solutionsNote}</span><p>{w.heroCaption} / {w.editorialSub}</p></div>
              </Reveal>
              <Reveal className="sv-service-grid">
                <ServicePanel type="care" number="01" title={t('cc_title')} points={carePoints} label={t('btn_more_info')} href="/servicios/contact-center" w={w}/>
                <ServicePanel type="sales" number="02" title={t('is_title')} points={salesPoints} label={t('btn_more_info')} href="/servicios/intake-sales" w={w}/>
              </Reveal>
            </div>
          </section>

          <section className="sv-difference" id="why-bee-near">
            <div className="sv-shell sv-difference-grid">
              <Reveal>
                <Eyebrow dark>{t('services_why_pretitle')}</Eyebrow>
                <h2>{t('services_why_title_1')} <em>{t('services_why_title_highlight')}</em></h2>
                <p className="sv-difference-lead">{t('services_why_desc')}</p>
                <div className="sv-difference-signature">{w.editorialBadge}</div>
              </Reveal>
              <Reveal className="sv-equation">
                <div className="sv-equation-head"><span>{t('srv_blackcard_title')}</span><Workflow size={21}/></div>
                {difference.map((name, index) => (
                  <div className="sv-equation-row" key={index}>
                    <span className="sv-equation-number">0{index + 1}</span>
                    <span className="sv-equation-name">{name}</span>
                    <span className="sv-equation-operator" aria-hidden="true">{index < 2 ? '+' : '='}</span>
                  </div>
                ))}
                <div className="sv-equation-total"><span>{t('srv_blackcard_result')}</span><Sparkles size={20}/></div>
              </Reveal>
            </div>
          </section>

          <section className="sv-bridge">
            <div className="sv-shell">
              <Reveal className="sv-bridge-layout">
                <div className="sv-bridge-signature"><BeeMark/><span>{w.combined}</span></div>
                <div><h2>{w.editorialLead}</h2><p>{w.editorialSub}</p></div>
              </Reveal>
            </div>
          </section>

          <section className="sv-cta">
            <div className="sv-shell">
              <Reveal className="sv-cta-layout">
                <div><span className="sv-cta-kicker">{w.closingKicker}</span><h2>{t('services_cta_title_1')} <em>{t('services_cta_title_highlight')}</em></h2><p>{t('services_cta_desc')}</p></div>
                <Link href="/contacto" className="sv-cta-link"><span>{t('nav_contact')}</span><ArrowUpRight size={26}/></Link>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="sv-footer">
          <div className="sv-shell">
            <div className="sv-footer-grid">
              <div><Link href="/"><Brand /></Link><p className="sv-footer-description">{t('footer_desc')}</p></div>
              <div className="sv-footer-col"><h4>{w.footerServices}</h4><Link href="/servicios/contact-center">Contact Center</Link><Link href="/servicios/intake-sales">Intake Sales</Link><Link href="/servicios">{t('nav_services')}</Link></div>
              <div className="sv-footer-col"><h4>{w.footerCompany}</h4><Link href="/nosotros">{t('nav_about')}</Link><Link href="/blog">Blog</Link><Link href="/contacto">{t('nav_contact')}</Link></div>
              <div className="sv-footer-col"><h4>{w.footerContact}</h4><a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a><a href="tel:+12153180179">+1 (215) 318-0179</a><span>Ejército Nacional 373, CDMX</span></div>
            </div>
            <div className="sv-footer-bottom"><span>© {new Date().getFullYear()} Bee Near. {t('footer_rights')}</span><a href="/docs/privacy_policy_for_website.pdf" rel="noopener noreferrer" target="_blank">{t('footer_privacy')}</a><span>{w.heroCaption}</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}
