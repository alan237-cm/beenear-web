import React, {useEffect, useRef, useState} from 'react';
import {Head, Link} from '@inertiajs/react';
import {useTranslation} from 'react-i18next';
import {Globe2, Menu, X, ArrowLeft, ArrowDownRight, ArrowUpRight, Bot, Mail, Phone} from 'lucide-react';

/**
 * Bee Near — IntakeSales / Portfolio Editorial Edition.
 * Ruta: resources/js/Pages/IntakeSales.jsx
 * Mantiene los textos existentes de i18next; no requiere nuevas librerías.
 */

const STYLES = String.raw`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.bp { --gold:#f5be1e;--cream:#f1eee7;--charcoal:#101112;--ink:#1b1d1c;--line:#393b3b;--slate:#abb0a9;min-height:100vh;background:var(--charcoal);color:var(--cream);font-family:'DM Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
.bp *,.bp *::before,.bp *::after{box-sizing:border-box}
.bp a{text-decoration:none;color:inherit}
.bp button{font:inherit;cursor:pointer}
.bp h1,.bp h2,.bp h3,.bp h4,.bp p{margin:0}
.bp ::selection{background:var(--gold);color:#141414}
.bp :is(a,button):focus-visible{outline:2px solid var(--gold);outline-offset:4px}
.bp-shell{width:min(1230px,calc(100% - 88px));margin-inline:auto}
.bp-nav{position:fixed;z-index:100;top:18px;left:50%;transform:translateX(-50%);width:min(1252px,calc(100% - 64px));min-height:83px;padding:5px 18px 5px 20px;display:flex;align-items:center;justify-content:space-between;gap:20px;border-radius:12px;border:1px solid #ffffff1e;box-shadow:0 14px 40px #0005;background:#111314e8;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:top .3s,background .3s}
.bp-nav--scrolled{top:9px;background:#101112fb}
.bp-logo{display:flex;align-items:center;gap:9px;min-width:max-content}
.bp-logo-img{display:block;height:68px;width:auto;max-width:200px;object-fit:contain;object-position:left center;background:transparent;border:0;border-radius:0;padding:0;filter:drop-shadow(0 3px 8px #0003)}
.bp-logo-img--footer{height:45px;width:auto;max-width:55px;object-fit:contain;padding:0;background:transparent;filter:none}
.bp-logo--footer{gap:12px}
.bp-mark{display:inline-flex;width:34px;height:36px;color:var(--gold)}
.bp-mark svg{width:100%;height:100%}
.bp-logo-text strong{display:block;font:700 19px/1.12 Manrope,Arial,sans-serif;letter-spacing:-.8px;color:#f5f3ee}
.bp-logo-text strong span{color:var(--gold)}
.bp-logo-text small{display:block;color:#858a84;font-size:7px;font-weight:700;letter-spacing:1.5px;margin-top:4px}
.bp-links{display:flex;align-items:center;gap:27px}
.bp-links a{position:relative;color:#aeb1ab;font-size:12px;font-weight:600;transition:color .2s;white-space:nowrap}
.bp-links a:hover,.bp-links a[aria-current=page]{color:#fff}
.bp-links a[aria-current=page]::after{content:'';position:absolute;width:100%;height:2px;background:var(--gold);bottom:-12px;left:0}
.bp-nav-actions{display:flex;align-items:center;gap:16px}
.bp-lang{border:0;background:transparent;color:#e9e9e4;font-size:11px;font-weight:700;display:flex;align-items:center;gap:7px;padding:9px 0}
.bp-nav-cta,.bp-primary,.bp-secondary{display:inline-flex;align-items:center;justify-content:center;gap:12px;font-size:12px;font-weight:800;white-space:nowrap;border-radius:6px;transition:background .2s,border-color .2s,transform .2s}
.bp-nav-cta{min-height:43px;padding:0 17px;background:var(--gold);color:#141414!important}
.bp-primary{min-height:47px;background:var(--gold);color:#141414!important;padding:0 22px}
.bp-secondary{min-height:47px;padding:0 22px;border:1px solid #555956;color:#f3f1e8}
.bp-nav-cta:hover,.bp-primary:hover{background:#ffd356;transform:translateY(-2px)}
.bp-secondary:hover{border-color:var(--gold);transform:translateY(-2px)}
.bp-hamb{display:none;align-items:center;justify-content:center;width:40px;height:40px;background:#232526;border:1px solid #484b49;border-radius:8px;color:#f6f4ec}
.bp-mobile{position:fixed;z-index:99;top:99px;left:12px;right:12px;padding:9px 12px;background:#1a1c1d;border:1px solid #3b3d3c;border-radius:11px;box-shadow:0 25px 50px #000a}
.bp-mobile a,.bp-mobile button{display:flex;align-items:center;justify-content:space-between;padding:14px 7px;width:100%;background:none;border:0;border-bottom:1px solid #383a39;color:#e7e7e1;font-size:13px;font-weight:600;text-align:left}
.bp-mobile a:last-child{border-bottom:0}
.bp-eyebrow{display:flex;align-items:center;gap:11px;color:#e4bc4f;font-size:10px;letter-spacing:1.7px;font-weight:800;text-transform:uppercase}
.bp-eyebrow::before{content:'';display:inline-block;width:24px;height:1px;background:currentColor}
.bp-eyebrow--dark{color:#967a33}
.bp-hero{position:relative;overflow:hidden;isolation:isolate;background:#111314;padding:165px 0 73px}
.bp-hero:before{content:'';z-index:-1;position:absolute;inset:0;background:radial-gradient(ellipse at 80% 35%,#f5be1e0d,transparent 40%),radial-gradient(ellipse at 18% 10%,#ffffff08,transparent 43%)}
.bp-hero-mesh{position:absolute;pointer-events:none;inset:0;opacity:.23;background-image:linear-gradient(90deg,#ffffff18 1px,transparent 1px),linear-gradient(#ffffff18 1px,transparent 1px);background-size:88px 88px;mask-image:linear-gradient(#000,transparent 89%)}
.bp-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(35px,5vw,72px)}
.bp-hero-copy h1{font:700 clamp(40px,4.2vw,63px)/1.13 Manrope,Arial,sans-serif;letter-spacing:-.06em;max-width:670px;margin:20px 0}
.bp-hero-copy h1 em{font-style:normal;color:var(--gold)}
.bp-hero-copy>p{color:#afb3ac;line-height:1.85;font-size:15px;max-width:550px}
.bp-hero-buttons{display:flex;align-items:center;flex-wrap:wrap;gap:11px;margin-top:30px}
.bp-hero-index{display:flex;gap:19px;flex-wrap:wrap;align-items:center;margin-top:42px;border-top:1px solid #393c39;padding-top:17px;color:#888e87;font-size:10px;font-weight:800;letter-spacing:1.1px}
.bp-hero-index span:first-child{color:#d9b761}
.bp-stage{position:relative;min-width:0;min-height:396px;border:1px solid #3e413e;border-radius:10px;background:linear-gradient(145deg,#212423,#171919 65%,#111313);box-shadow:0 27px 75px #0006;overflow:hidden;padding:24px}
.bp-stage:before{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0,transparent 34px,#ffffff05 35px),repeating-linear-gradient(90deg,transparent 0,transparent 34px,#ffffff05 35px);mask-image:radial-gradient(ellipse at center,#000,transparent 83%)}
.bp-stage-top,.bp-stage-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#acada6;font-size:10px;letter-spacing:1px;font-weight:800;position:relative;z-index:2}
.bp-stage-top small,.bp-stage-foot small{color:#7e837e;font-size:9px}
.bp-stage-foot{border-top:1px solid #3f4140;padding-top:15px;position:absolute;bottom:21px;left:24px;right:24px}
.bp-led{display:inline-flex;align-items:center;gap:7px;color:#dbbe72}
.bp-led:before{content:'';width:6px;height:6px;border-radius:50%;background:#f5be1e;box-shadow:0 0 10px #f5be1e9c;animation:bp-pulse 2s ease-in-out infinite}
.bp-section{padding:88px 0 99px}
.bp-section--light{background:#f1eee7;color:#1d201f}
.bp-section--dark{background:#181b1b;color:#f0eee8}
.bp-section--deep{background:#101213;color:#f0eee8}
.bp-section-title{font:700 clamp(29px,3.25vw,47px)/1.17 Manrope,Arial,sans-serif;letter-spacing:-.055em;max-width:770px;margin:15px 0 18px!important}
.bp-section-lead{font-size:15px;line-height:1.9;color:#6a6f69;max-width:690px}
.bp-section--dark .bp-section-lead,.bp-section--deep .bp-section-lead{color:#a5aba5}
.bp-2col{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(38px,5vw,80px);align-items:start}
.bp-prose{color:#626861;line-height:1.9;font-size:15px}
.bp-prose+.bp-prose{margin-top:18px!important}
.bp-lead-quote{border-left:2px solid #bc9537;padding:13px 0 13px 22px;margin-top:27px;color:#333733;font-size:17px;line-height:1.7;font-weight:600}
.bp-section--dark .bp-lead-quote{color:#ece9e0}
.bp-steps{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border-top:1px solid #484a46;border-left:1px solid #484a46;margin-top:33px}
.bp-step{border-right:1px solid #484a46;border-bottom:1px solid #484a46;padding:27px 27px 32px;min-height:206px;position:relative;transition:background .2s}
.bp-step:hover{background:#ffffff07}
.bp-step-number{display:block;color:#c6a144;font:800 11px Manrope,Arial,sans-serif;letter-spacing:1px;margin-bottom:26px}
.bp-step h3{font:700 18px/1.35 Manrope,Arial,sans-serif;letter-spacing:-.025em;margin-bottom:10px}
.bp-step p{color:#aab0a9;font-size:13px;line-height:1.75}
.bp-toprow{display:flex;align-items:end;justify-content:space-between;gap:35px;margin-bottom:37px}
.bp-list{border-top:1px solid #cfcec6}
.bp-list-row{display:grid;grid-template-columns:65px minmax(0,.48fr) minmax(0,.52fr);align-items:start;gap:24px;padding:24px 0;border-bottom:1px solid #cfcec6}
.bp-list-row strong{font:800 12px Manrope,Arial,sans-serif;color:#9a7d36;padding-top:4px}
.bp-list-row h3{font:700 19px/1.38 Manrope,Arial,sans-serif;letter-spacing:-.035em}
.bp-list-row p,.bp-list-row li{font-size:13px;line-height:1.8;color:#626862}
.bp-list-row ul{margin:0 0 12px;padding-left:20px}
.bp-list-row .bp-prose-strong{font-weight:700;color:#292e29}
.bp-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:35px}
.bp-tile{border:1px solid #cbc9bf;padding:28px 25px;min-height:260px;display:flex;flex-direction:column;align-items:start;gap:14px;transition:transform .2s,border-color .2s;background:#f8f6f0;border-radius:7px}
.bp-tile:hover{transform:translateY(-5px);border-color:#b8974b}
.bp-tile-index{font-size:10px;color:#987b32;letter-spacing:1.2px;font-weight:800}
.bp-tile-icon{color:#a58433;margin:10px 0}
.bp-tile h3{font:700 19px/1.4 Manrope,Arial,sans-serif;letter-spacing:-.025em}
.bp-tile p{color:#686d66;font-size:13px;line-height:1.8}
.bp-kpi-line{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #484a46;border-bottom:1px solid #484a46;margin-top:33px}
.bp-kpi{padding:24px 23px;border-right:1px solid #484a46}
.bp-kpi:first-child{padding-left:0}
.bp-kpi:last-child{border-right:0}
.bp-kpi strong{font:700 clamp(29px,3.5vw,46px)/1.1 Manrope,Arial,sans-serif;letter-spacing:-.065em;color:#f5cd65;display:block}
.bp-kpi span{display:block;margin-top:11px;color:#b2b5ac;font-size:12px;line-height:1.55}
.bp-stats-note{color:#8d938d;font-size:11px;line-height:1.7;margin-top:17px}
.bp-logic{border:1px solid #484a45;background:#1c201f;padding:25px 27px;border-radius:9px}
.bp-logic-label{font-weight:800;color:#dbbd71;font-size:10px;letter-spacing:1.25px;margin-bottom:25px}
.bp-logic-row{display:flex;gap:16px;align-items:center;padding:18px 0;border-top:1px solid #3d403b}
.bp-logic-row span{width:37px;height:37px;flex:none;display:flex;align-items:center;justify-content:center;border-radius:50%;color:#e7bc43;border:1px solid #887342}
.bp-logic-row p{font-size:14px;font-weight:600;color:#eeeae0}
.bp-logic-foot{font-size:10px;color:#888f87;margin-top:26px;letter-spacing:1.2px}
.bp-motto{margin-top:38px;padding-top:26px;border-top:1px solid #d0cec5;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px}
.bp-motto div{font:700 clamp(16px,1.7vw,22px)/1.28 Manrope,Arial,sans-serif;letter-spacing:-.045em;border-left:2px solid #bc983e;padding:5px 12px;min-height:70px}
.bp-close{background:#1b1e1e;border-top:1px solid #353936;padding:76px 0;color:#f4f0e8}
.bp-close-inner{display:flex;align-items:center;justify-content:space-between;gap:35px}
.bp-close h2{font:700 clamp(30px,3.1vw,45px)/1.2 Manrope,Arial,sans-serif;letter-spacing:-.055em;margin:16px 0!important}
.bp-close p{font-size:14px;line-height:1.75;color:#aeb2ab;max-width:600px}
.bp-close-link{display:grid;place-items:center;width:89px;height:89px;flex:none;border-radius:50%;border:1px solid #8f7944;color:#f5be1e!important;transition:background .2s,transform .2s}
.bp-close-link:hover{background:#2b291d;transform:rotate(42deg)}
.bp-footer{background:#101112;border-top:1px solid #343737;padding:60px 0 28px}
.bp-footer-cols{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:30px;padding-bottom:54px}
.bp-footer-cols h4{font-size:10px;letter-spacing:1.4px;color:#e8bc47;margin-bottom:20px;font-weight:800}
.bp-footer-cols p,.bp-footer-cols a,.bp-footer-cols > div:not(.bp-footer-brand) > span{display:block;font-size:12px;line-height:1.85;color:#9fa49c}
.bp-footer-cols > div:not(.bp-footer-brand) a{display:block}
.bp-footer-cols a{margin-bottom:8px}
.bp-footer-cols a:hover{color:#f5be1e}
.bp-footer-brand p{margin-top:21px!important;max-width:255px}
.bp-footer-bottom{border-top:1px solid #343737;padding-top:23px;display:flex;justify-content:space-between;gap:20px;color:#7f8680;font-size:11px}
.bp-reveal{opacity:0;transform:translateY(17px);transition:opacity .65s ease,transform .65s ease}
.bp-reveal--on{opacity:1;transform:none}
/* CONTACT CENTER: diagram */
.bp-connection{position:absolute;inset:63px 25px 66px;display:flex;align-items:center;justify-content:center}
.bp-connection-svg{width:100%;max-width:470px;overflow:visible;filter:drop-shadow(0 7px 17px #0005)}
.bp-orbit-dash{transform-origin:50% 50%;animation:bp-orbit 45s linear infinite}
.bp-core-hex{animation:bp-coreglow 3s ease-in-out infinite alternate}
.bp-connect-caption{position:absolute;inset:auto 0 11px;color:#d4caab;text-align:center;font-size:10px;letter-spacing:1px;font-weight:800}
/* INTAKE: interactive six stage overview */
.bp-stage--sales{min-height:455px}
.bp-pipeline-hint{position:relative;z-index:1;margin-top:12px!important;font-size:11px;line-height:1.45;color:#999d95}
.bp-pipeline{position:relative;z-index:1;margin:26px 0 25px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.bp-pipeline-btn{border:1px solid #494b47;border-radius:6px;min-width:0;background:#1a1d1c;color:#aeb3ad;padding:12px;display:flex;align-items:center;gap:11px;text-align:left;transition:background .2s,border-color .2s;color .2s}
.bp-pipeline-btn[aria-pressed=true]{background:#292618;border-color:#af8c35;color:#f5e3b6}
.bp-pipeline-btn:hover{border-color:#ae8e43}
.bp-pipeline-btn strong{font:700 11px Manrope,Arial,sans-serif;color:#dab65b}
.bp-pipeline-btn span{font:600 11px/1.4 'DM Sans',sans-serif;min-width:0}
.bp-pipeline-desc{position:relative;z-index:1;border-top:1px solid #484a46;padding-top:13px;min-height:71px}
.bp-pipeline-desc span{display:block;color:#ddbb63;font-size:9px;font-weight:800;letter-spacing:1.2px;margin-bottom:7px}
.bp-pipeline-desc p{font-size:12px;line-height:1.65;color:#c6c7bf}
@keyframes bp-pulse{50%{opacity:.45}}
@keyframes bp-orbit{to{transform:rotate(360deg)}}
@keyframes bp-coreglow{to{filter:drop-shadow(0 0 8px #f5be1e66)}}
@media(max-width:1020px){.bp-links{gap:15px}.bp-hero-grid{gap:26px}.bp-stage{min-height:370px}.bp-footer-cols{gap:20px}}
@media(max-width:900px){.bp-links{display:none}.bp-hamb{display:flex}.bp-hero-grid{grid-template-columns:1fr}.bp-hero-copy{max-width:720px}.bp-stage{max-width:600px;width:100%;margin-inline:auto}.bp-2col{grid-template-columns:1fr}.bp-footer-cols{grid-template-columns:repeat(2,1fr)}.bp-footer-brand{grid-column:1/-1}}
@media(max-width:690px){.bp-logo-img{height:51px;max-width:155px}.bp-logo-img--footer{height:42px} .bp-shell{width:calc(100% - 36px)}.bp-nav{width:calc(100% - 24px);top:10px;padding:7px 12px;min-height:66px}.bp-mobile{top:82px}.bp-nav-cta{display:none}.bp-nav-actions{gap:10px}.bp-hero{padding:124px 0 56px}.bp-hero-copy h1{font-size:clamp(34px,9vw,46px)}.bp-hero-copy>p{font-size:14px}.bp-hero-index{margin-top:28px}.bp-stage{min-height:348px;padding:18px}.bp-stage-foot{left:18px;right:18px;bottom:17px}.bp-connection{inset:57px 15px 60px}.bp-section{padding:65px 0 73px}.bp-section-title{font-size:clamp(28px,7.5vw,37px)}.bp-toprow{align-items:start;flex-direction:column}.bp-steps{grid-template-columns:1fr 1fr}.bp-step{padding:22px 16px;min-height:194px}.bp-step h3{font-size:16px}.bp-step p{font-size:12px}.bp-tiles{grid-template-columns:1fr}.bp-tile{min-height:0}.bp-list-row{grid-template-columns:38px 1fr;gap:11px}.bp-list-row p,.bp-list-row ul{grid-column:2}.bp-kpi-line{grid-template-columns:1fr}.bp-kpi{border-right:0;border-bottom:1px solid #494b47;padding:18px 0}.bp-kpi:last-child{border-bottom:0}.bp-motto{grid-template-columns:1fr 1fr}.bp-close{padding:64px 0}.bp-close-link{width:65px;height:65px}.bp-footer-bottom{flex-direction:column}.bp-pipeline{gap:6px;margin-top:21px}.bp-pipeline-btn{padding:9px;gap:7px}.bp-pipeline-btn span{font-size:10px}}
@media(max-width:410px){.bp-steps{grid-template-columns:1fr}.bp-step{min-height:0}.bp-motto{grid-template-columns:1fr}.bp-footer-cols{grid-template-columns:1fr}.bp-footer-brand{grid-column:auto}.bp-pipeline{grid-template-columns:1fr 1fr}}
@media(prefers-reduced-motion:reduce){.bp-reveal{opacity:1;transform:none;transition:none}.bp-orbit-dash,.bp-core-hex,.bp-led:before{animation:none!important}}
`;

function BeeMark(){return <span className="bp-mark" aria-hidden="true"><svg viewBox="0 0 38 40" fill="none"><path d="M18.9 2 3 11.1v17.8L18.9 38 35 28.9V11.1L18.9 2Z" stroke="currentColor" strokeWidth="1.7"/><path d="M19 3v34M3.5 11.5 35 29M35 11.5 3.5 29" stroke="currentColor" strokeWidth="1.3" opacity=".7"/><circle cx="19" cy="20" r="5.2" fill="currentColor"/></svg></span>}
function Brand({footer=false}){return footer ? <span className="bp-logo bp-logo--footer"><img className="bp-logo-img bp-logo-img--footer" src="/images/beenear-isotipo.png" alt="Logo de Bee Near"/><span className="bp-logo-text"><strong>Bee<span>Near</span></strong><small>HUMAN × INTELLIGENCE</small></span></span> : <span className="bp-logo"><img className="bp-logo-img" src="/images/beenear-imagotipo-dark.png" alt="Bee Near"/></span>}
function Eyebrow({children,dark=false}){return <div className={`bp-eyebrow${dark?' bp-eyebrow--dark':''}`}>{children}</div>}
function Reveal({children,className=''}){
  const node=useRef(null);
  useEffect(()=>{
    const el=node.current;if(!el)return;
    if(typeof IntersectionObserver==='undefined'||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){el.classList.add('bp-reveal--on');return;}
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.classList.add('bp-reveal--on');observer.unobserve(el)}},{threshold:.06,rootMargin:'0px 0px -22px 0px'});
    observer.observe(el);return()=>observer.disconnect();
  },[]);
  return <div ref={node} className={`bp-reveal ${className}`}>{children}</div>;
}
function PortfolioNav({t,i18n,spanish}){
  const [menu,setMenu]=useState(false),[scrolled,setScrolled]=useState(false);
  useEffect(()=>{const handler=()=>setScrolled(window.scrollY>40);handler();window.addEventListener('scroll',handler,{passive:true});return()=>window.removeEventListener('scroll',handler)},[]);
  const links=[{href:'/',label:t('nav_home')},{href:'/nosotros',label:t('nav_about')},{href:'/servicios',label:t('nav_services')},{href:'/blog',label:'Blog'}];
  return <>
    <header className={`bp-nav${scrolled?' bp-nav--scrolled':''}`}>
      <Link href="/" aria-label="Bee Near"><Brand/></Link>
      <nav className="bp-links" aria-label={spanish?'Navegación principal':'Main navigation'}>{links.map(link=><Link key={link.href} href={link.href} aria-current={link.href==='/servicios'?'page':undefined}>{link.label}</Link>)}</nav>
      <div className="bp-nav-actions"><button type="button" className="bp-lang" onClick={()=>i18n.changeLanguage(spanish?'en':'es')} aria-label={spanish?'Change language to English':'Cambiar idioma a español'}><Globe2 size={15}/>{spanish?'EN':'ES'}</button><Link href="/contacto" className="bp-nav-cta">{t('nav_contact')}<ArrowUpRight size={15}/></Link><button type="button" className="bp-hamb" onClick={()=>setMenu(!menu)} aria-label={menu?(spanish?'Cerrar menú':'Close menu'):(spanish?'Abrir menú':'Open menu')} aria-expanded={menu}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div>
    </header>
    {menu&&<nav className="bp-mobile" aria-label={spanish?'Navegación móvil':'Mobile navigation'}>{links.map(link=><Link href={link.href} key={link.href} onClick={()=>setMenu(false)}>{link.label}<ArrowUpRight size={16}/></Link>)}<Link href="/contacto" onClick={()=>setMenu(false)}>{t('nav_contact')}<ArrowUpRight size={16}/></Link></nav>}
  </>;
}
function PortfolioClose({spanish}){
  return <section className="bp-close"><div className="bp-shell bp-close-inner"><div><Eyebrow>{spanish?'EL SIGUIENTE PASO':'THE NEXT STEP'}</Eyebrow><h2>{spanish?'Conversemos sobre tu siguiente proyecto.':'Let’s discuss your next project.'}</h2><p>{spanish?'Explora cómo nuestra combinación de tecnología y operación puede conectar mejor a tu empresa con sus clientes.':'Explore how our blend of technology and operations can help your business connect with its customers.'}</p></div><Link href="/contacto" aria-label={spanish?'Ir a contacto':'Go to contact'} className="bp-close-link"><ArrowUpRight size={33}/></Link></div></section>;
}
function PortfolioFooter({t,spanish}){
  return <footer className="bp-footer"><div className="bp-shell"><div className="bp-footer-cols"><div className="bp-footer-brand"><Link href="/"><Brand footer/></Link><p>{t('footer_desc')}</p></div><div><h4>{t('footer_links')}</h4><Link href="/">{t('nav_home')}</Link><Link href="/nosotros">{t('nav_about')}</Link><Link href="/servicios">{t('nav_services')}</Link></div><div><h4>{spanish?'EXPLORAR':'EXPLORE'}</h4><Link href="/blog">Blog</Link><Link href="/contacto">{t('nav_contact')}</Link><a href="/docs/privacy_policy_for_website.pdf" target="_blank" rel="noopener noreferrer">{t('footer_privacy')}</a></div><div><h4>{t('footer_contact')}</h4><a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a><a href="tel:+12153180179">+1 (215) 318-0179</a><span>Ejército Nacional 373, CDMX</span></div></div><div className="bp-footer-bottom"><span>© {new Date().getFullYear()} Bee Near. {t('footer_rights')}</span><span>HUMAN × INTELLIGENCE</span></div></div></footer>;
}

const COPY={
 es:{
  eyebrow:'03 / INTAKE SALES OPERATIONS',hero1:'De cada contacto,',hero2:'una oportunidad.',explore:'Explorar proceso',back:'Volver a servicios',
  panel:'CICLO DE CONVERSIÓN', panelSub:'Selecciona una etapa para consultar su función', panelFoot:'PROCESO COMERCIAL · 06 ETAPAS',
  intro:'01 / QUÉ HACEMOS',tag:'ESTRATEGIA DE CAPTACIÓN',lead:'Cada etapa tiene un propósito. El valor está en mantenerlas conectadas.',
  path:'02 / PROCESO COMERCIAL',mass:'03 / PROSPECCIÓN A ESCALA',charge:'04 / MODELO COMERCIAL',manifesto:'BEE NEAR / ENFOQUE',
  closing:'Conectamos el primer contacto con lo que sigue.',
 },
 en:{
  eyebrow:'03 / INTAKE SALES OPERATIONS',hero1:'Turn every contact',hero2:'into an opportunity.',explore:'Explore the process',back:'Back to services',
  panel:'CONVERSION JOURNEY',panelSub:'Select a stage to explore its role',panelFoot:'COMMERCIAL FLOW · 06 STAGES',
  intro:'01 / WHAT WE DO',tag:'LEAD GENERATION STRATEGY',lead:'Every stage serves a purpose. The value lies in keeping them connected.',
  path:'02 / SALES JOURNEY',mass:'03 / PROSPECTING AT SCALE',charge:'04 / COMMERCIAL MODEL',manifesto:'BEE NEAR / APPROACH',
  closing:'From the first interaction to the next opportunity.',
 }
};
const MOTTOS=['Bee Efective','Bee Competitive','Bee Productive',"Bee what you've always wanted"];

function IntakePanel({t,w}){
 const [selected,setSelected]=useState(0);
 const steps=Array.from({length:6},(_,index)=>({label:t(`is_proc_${index+1}_title`),desc:t(`is_proc_${index+1}_desc`)}));
 return <div className="bp-stage bp-stage--sales" aria-label={w.panel}>
  <div className="bp-stage-top"><span className="bp-led">{w.panel}</span><small>BN / 02</small></div><p className="bp-pipeline-hint">{w.panelSub}</p>
  <div className="bp-pipeline" role="group" aria-label={w.panelSub}>
    {steps.map((step,index)=><button key={index} type="button" className="bp-pipeline-btn" aria-pressed={selected===index} onClick={()=>setSelected(index)}><strong>{String(index+1).padStart(2,'0')}</strong><span>{step.label}</span></button>)}
  </div>
  <div className="bp-pipeline-desc" aria-live="polite"><span>{String(selected+1).padStart(2,'0')} / 06 — {steps[selected].label}</span><p>{steps[selected].desc}</p></div>
  <div className="bp-stage-foot"><span>{w.panelFoot}</span><small>HUMAN × INTELLIGENCE</small></div>
 </div>;
}

export default function IntakeSales(){
 const {t,i18n}=useTranslation();
 const spanish=(i18n.resolvedLanguage||i18n.language||'es').toLowerCase().startsWith('es');
 const w=spanish?COPY.es:COPY.en;
 const steps=Array.from({length:6},(_,i)=>({title:t(`is_proc_${i+1}_title`),desc:t(`is_proc_${i+1}_desc`)}));
 const channels=[{icon:Bot,title:t('is_mass_1_title'),desc:t('is_mass_1_desc')},{icon:Mail,title:t('is_mass_2_title'),desc:t('is_mass_2_desc')},{icon:Phone,title:t('is_mass_3_title'),desc:t('is_mass_3_desc')}];
 const charging=[{title:t('is_charge_1_title'),desc:t('is_charge_1_desc')},{title:t('is_charge_2_title'),desc:t('is_charge_2_desc')}];
 return <>
  <Head title="Intake Sales | Bee Near"><meta name="description" content={t('is_hero_desc')}/></Head>
  <div className="bp"><style>{STYLES}</style><PortfolioNav t={t} i18n={i18n} spanish={spanish}/>
   <header className="bp-hero"><div className="bp-hero-mesh" aria-hidden="true"/><div className="bp-shell bp-hero-grid"><div className="bp-hero-copy">
     <Eyebrow>{w.eyebrow}</Eyebrow><h1>{w.hero1}<br/><em>{w.hero2}</em></h1><p>{t('is_hero_desc')}</p>
     <div className="bp-hero-buttons"><a href="#is-proceso" className="bp-primary">{w.explore}<ArrowDownRight size={17}/></a><Link href="/servicios" className="bp-secondary"><ArrowLeft size={16}/>{w.back}</Link></div>
     <div className="bp-hero-index"><span>INTAKE SALES / BEENEAR</span><span>PROSPECTING · QUALIFICATION · SALES</span></div>
    </div><IntakePanel t={t} w={w}/></div></header>
   <main>
    <section className="bp-section bp-section--light"><div className="bp-shell"><Reveal><div className="bp-2col">
      <div><Eyebrow dark>{w.intro}</Eyebrow><h2 className="bp-section-title">{t('is_what_title')}</h2><p className="bp-prose">{t('is_what_desc')}</p><blockquote className="bp-lead-quote">{t('is_quote')}</blockquote></div>
      <div style={{paddingTop:14}}><Eyebrow dark>{w.tag}</Eyebrow><h2 className="bp-section-title" style={{fontSize:'clamp(25px,2.5vw,35px)',marginTop:21}}>{t('is_lead_gen_title')}</h2><p className="bp-prose">{t('is_lead_gen_desc')}</p><div style={{marginTop:28,paddingTop:21,borderTop:'1px solid #d1cec4',fontSize:13,lineHeight:1.7,color:'#85713b',fontWeight:700}}>{w.lead}</div></div>
     </div></Reveal></div></section>

    <section className="bp-section bp-section--deep" id="is-proceso"><div className="bp-shell"><Reveal><Eyebrow>{w.path}</Eyebrow><h2 className="bp-section-title">{t('is_process_title')}</h2></Reveal>
     <div className="bp-steps">{steps.map((step,i)=><Reveal key={i}><div className="bp-step"><span className="bp-step-number">{String(i+1).padStart(2,'0')} / 06</span><h3>{step.title}</h3><p>{step.desc}</p></div></Reveal>)}</div>
    </div></section>

    <section className="bp-section bp-section--light"><div className="bp-shell"><Reveal><Eyebrow dark>{w.mass}</Eyebrow><h2 className="bp-section-title">{t('is_massive_title')}</h2></Reveal>
      <div className="bp-tiles">{channels.map((item,i)=><Reveal key={i}><div className="bp-tile"><span className="bp-tile-index">0{i+1} / 03</span><item.icon className="bp-tile-icon" size={30} strokeWidth={1.55}/><h3>{item.title}</h3><p>{item.desc}</p></div></Reveal>)}</div>
    </div></section>

    <section className="bp-section bp-section--light" style={{background:'#e8e4db',borderTop:'1px solid #d7d3c9'}}><div className="bp-shell"><Reveal><Eyebrow dark>{w.charge}</Eyebrow><h2 className="bp-section-title">{t('is_charge_title')}</h2></Reveal>
     <div className="bp-list">{charging.map((item,i)=><Reveal key={i}><div className="bp-list-row"><strong>0{i+1}</strong><h3>{item.title}</h3><p>{item.desc}</p></div></Reveal>)}</div>
     <Reveal><div className="bp-motto" aria-label={w.manifesto}>{MOTTOS.map(motto=><div key={motto}>{motto}</div>)}</div></Reveal>
    </div></section>
   </main>
   <PortfolioClose spanish={spanish}/><PortfolioFooter t={t} spanish={spanish}/>
  </div>
 </>;
}
