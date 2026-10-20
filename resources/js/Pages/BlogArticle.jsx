import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe2, ArrowLeft, ArrowRight, ArrowDownRight, ArrowUpRight, Bot, Headphones, Zap, BarChart3, Clock3 } from 'lucide-react';

const BLOG_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.bn-blog { --bk-yellow:#f5be1e; --bk-cream:#f2f0eb; --bk-bg:#101112; --bk-line:#353637; font-family:'DM Sans',Arial,sans-serif; background:var(--bk-bg); color:#f1eee8; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
.bn-blog *,.bn-blog *::before,.bn-blog *::after { box-sizing:border-box; }
.bn-blog a { text-decoration:none; }
.bn-blog button { cursor:pointer; font-family:inherit; }
.bn-blog h1,.bn-blog h2,.bn-blog h3,.bn-blog h4,.bn-blog p { margin:0; }
.bn-blog ::selection { background:var(--bk-yellow);color:#141414; }
.bk-wrap { width:min(1240px,calc(100% - 96px));margin-inline:auto; }
.bk-logo { display:inline-flex;align-items:center;gap:10px;color:#fff;white-space:nowrap; }
.bk-logo-mark { display:inline-flex;width:32px;height:34px;color:var(--bk-yellow); }
.bk-logo-mark svg { width:100%;height:100%; }
.bk-logo-name { display:block;font:700 18px/1.1 Manrope,Arial,sans-serif;letter-spacing:-.8px; }
.bk-logo-name b { color:var(--bk-yellow); }
.bk-logo-sub { display:block;margin-top:4px;font-size:7px;letter-spacing:1.55px;color:#888c87;font-weight:700; }
.bk-nav { position:fixed;z-index:100;top:18px;left:50%;transform:translateX(-50%);width:min(1252px,calc(100% - 64px));min-height:63px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:9px 14px 9px 21px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(16,17,18,.9);box-shadow:0 12px 40px rgba(0,0,0,.25);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:top .25s,background .25s; }
.bk-nav.scrolled { top:9px;background:rgba(14,15,16,.97); }
.bk-nav-links { display:flex;align-items:center;gap:29px; }
.bk-nav-links a { color:#aeb0aa;font-size:12px;font-weight:500;position:relative;transition:color .2s; }
.bk-nav-links a:hover,.bk-nav-links a[aria-current='page'] { color:#f1eee8; }
.bk-nav-links a[aria-current='page']::after { content:'';position:absolute;height:2px;width:100%;left:0;bottom:-11px;background:var(--bk-yellow); }
.bk-nav-right { display:flex;align-items:center;gap:16px; }
.bk-lang { display:flex;align-items:center;gap:6px;border:0;background:none;color:#dddcd7;font-weight:700;font-size:11px;padding:9px 1px; }
.bk-contact { display:flex;gap:15px;align-items:center;justify-content:center;border-radius:6px;background:var(--bk-yellow);padding:12px 15px;color:#171717!important;font-size:11px;font-weight:800;transition:background .2s,transform .2s; }
.bk-contact:hover { transform:translateY(-2px);background:#ffcd42; }
.bk-menu-btn { display:none;align-items:center;justify-content:center;width:40px;height:40px;background:#242627;color:#f8f8f8;border:1px solid #424242;border-radius:8px; }
.bk-mobile { position:fixed;z-index:99;top:83px;left:12px;right:12px;padding:10px;border:1px solid #383a3a;border-radius:10px;background:#1a1c1e;box-shadow:0 22px 60px #000b; }
.bk-mobile a,.bk-mobile button { width:100%;display:flex;align-items:center;justify-content:space-between;text-align:left;padding:14px 12px;font-size:13px;font-weight:600;color:#e4e4df;background:transparent;border:0;border-bottom:1px solid #383939; }
.bk-mobile a:last-child { border-bottom:0; }
.bk-eyebrow { display:flex;align-items:center;gap:10px;font-size:10px;font-weight:700;letter-spacing:1.65px;color:var(--bk-yellow);text-transform:uppercase; }
.bk-eyebrow::before { content:'';width:23px;height:1px;background:currentColor; }
.bk-eyebrow.dark { color:#8f7229; }
.bk-outline-btn,.bk-yellow-btn { min-height:46px;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;gap:15px;border-radius:6px;font-size:12px;font-weight:700;transition:transform .2s,border-color .2s,background .2s; }
.bk-outline-btn { border:1px solid #565653;color:#f2f0ea; }
.bk-outline-btn:hover { transform:translateY(-2px);border-color:var(--bk-yellow); }
.bk-yellow-btn { background:var(--bk-yellow);color:#121212; }
.bk-yellow-btn:hover { transform:translateY(-2px);background:#ffce4c; }
.bk-hero { position:relative;isolation:isolate;background:#111213;padding:149px 0 92px;overflow:hidden; }
.bk-hero::before { content:'';position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse at 73% 50%,rgba(245,190,30,.065),transparent 37%),radial-gradient(ellipse at 10% 5%,rgba(255,255,255,.022),transparent 45%); }
.bk-grid { pointer-events:none;position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px);background-size:92px 92px;mask-image:linear-gradient(#000,transparent);opacity:.35; }
.bk-hero-inner { display:grid;grid-template-columns:minmax(0,1.06fr) minmax(0,.94fr);align-items:center;gap:clamp(28px,5vw,75px); }
.bk-hero h1 { font:700 clamp(40px,4vw,62px)/1.14 Manrope,Arial,sans-serif;letter-spacing:-.058em;margin:20px 0 20px;max-width:690px; }
.bk-hero h1 em { color:var(--bk-yellow);font-style:normal; }
.bk-hero-desc { color:#abb0ab;font-size:15px;line-height:1.8;max-width:530px; }
.bk-hero-actions { display:flex;gap:11px;flex-wrap:wrap;margin-top:30px; }
.bk-hero-bottom { margin-top:44px;border-top:1px solid #393c3b;padding-top:19px;display:flex;gap:25px;flex-wrap:wrap;align-items:center;font-size:10px;letter-spacing:1.3px;color:#929590;font-weight:700; }
.bk-hero-bottom span:first-child { color:#e4c474; }
.bk-graphic { position:relative;min-height:380px;aspect-ratio:1.18;background:linear-gradient(142deg,#202223,#151718 63%,#111213);border:1px solid #393b3a;border-radius:10px;overflow:hidden;box-shadow:0 22px 60px #0007; }
.bk-graphic::after { content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent 49%,#ffffff06 50%,transparent 51%),linear-gradient(transparent 49%,#ffffff06 50%,transparent 51%);background-size:30px 30px;mask-image:radial-gradient(ellipse at center,#000,transparent 72%); }
.bk-graphic-top { position:absolute;z-index:2;left:24px;right:24px;top:21px;display:flex;justify-content:space-between;gap:10px;color:#979992;font-size:9px;letter-spacing:1.4px;font-weight:700; }
.bk-graphic svg.bk-orbit-art { position:absolute;inset:8% 5%;width:90%;height:85%;animation:bk-float 9s ease-in-out infinite alternate; }
.bk-graphic-foot { position:absolute;bottom:20px;left:24px;right:24px;display:flex;gap:9px;align-items:center;border-top:1px solid #464744;padding-top:15px;font-size:9px;letter-spacing:1.25px;font-weight:700;color:#beb8a7; }
.bk-live { width:6px;height:6px;background:var(--bk-yellow);border-radius:50%;box-shadow:0 0 12px #f5be1e80;animation:bk-pulse 2s infinite; }
.bk-mini-index { margin-left:auto;color:#777b77; }
.bk-index-section { background:var(--bk-cream);color:#191b1b;padding:84px 0 109px; }
.bk-section-top { display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:31px; }
.bk-section-top h2 { font:700 clamp(28px,3vw,43px)/1.19 Manrope,Arial,sans-serif;letter-spacing:-.05em;margin-top:16px;max-width:660px; }
.bk-count { font-size:11px;letter-spacing:1.4px;font-weight:800;color:#74766f;white-space:nowrap; }
.bk-filters { display:flex;flex-wrap:wrap;gap:8px;padding:0 0 29px;border-bottom:1px solid #d7d5d0; }
.bk-filter { border:1px solid #d9d8d2;background:transparent;color:#555a57;padding:10px 14px;border-radius:5px;font-size:12px;font-weight:700;transition:background .2s,color .2s,border .2s; }
.bk-filter:hover { color:#141515;border-color:#a3a09a; }
.bk-filter[aria-pressed='true'] { background:#1c1e1e;color:#f5be1e;border-color:#1c1e1e; }
.bk-cards { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px; }
.bk-card { display:flex;flex-direction:column;border:1px solid #d8d6d0;background:#fbfaf7;border-radius:8px;min-width:0;overflow:hidden;transition:transform .25s,border .25s,box-shadow .25s; }
.bk-card:hover { transform:translateY(-5px);border-color:#c2a65c;box-shadow:0 22px 35px #27231b12; }
.bk-cover { display:flex;flex-direction:column;position:relative;justify-content:space-between;min-height:184px;padding:18px 20px;overflow:hidden;background:#1c1e1e;color:#b3b5ae; }
.bk-cover::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 72% 35%,rgba(245,190,30,.10),transparent 44%);pointer-events:none; }
.bk-cover::after { content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0,transparent 45px,#ffffff07 46px),repeating-linear-gradient(0deg,transparent 0,transparent 45px,#ffffff07 46px);opacity:.6;pointer-events:none; }
.bk-cover-top,.bk-cover-footer { z-index:1;display:flex;align-items:center;justify-content:space-between;font-size:9px;font-weight:700;letter-spacing:1.3px; }
.bk-cover-mid { z-index:1;display:flex;align-items:center;gap:20px;margin:auto 0;color:#f1ead6; }
.bk-cover-icon { width:73px;height:73px;border:1px solid #6b613e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--bk-yellow);box-shadow:0 0 0 21px #f5be1e0b;flex:none; }
.bk-cover-mid b { font:700 clamp(33px,3.2vw,44px)/1 Manrope,Arial,sans-serif;letter-spacing:-.06em;color:#e3d8ba; }
.bk-cover[data-kind='Automation'] .bk-cover-icon,.bk-cover[data-kind='Automatización'] .bk-cover-icon { border-radius:8px;transform:rotate(7deg); }
.bk-card-body { padding:24px 22px 21px;display:flex;flex-direction:column;flex:1;gap:12px; }
.bk-meta { font-size:10px;letter-spacing:.2px;font-weight:700;color:#8c7040;display:flex;gap:8px;align-items:center;flex-wrap:wrap; }
.bk-meta i { width:3px;height:3px;background:#aaa;display:inline-block;border-radius:50%; }
.bk-card h3 { font:700 clamp(17px,1.55vw,21px)/1.32 Manrope,Arial,sans-serif;letter-spacing:-.036em; }
.bk-card-desc { font-size:13px;line-height:1.7;color:#656861;flex:1; }
.bk-card-link { margin-top:12px;border-top:1px solid #dedcd5;padding-top:17px;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:800;color:#202221; }
.bk-card-link svg { transition:transform .25s;color:#8c6c22; }
.bk-card:hover .bk-card-link svg { transform:translate(3px,-3px); }
.bk-featured { background:#1d1f20;color:#f3f1eb;display:grid;grid-template-columns:44% 56%;border-radius:8px;overflow:hidden;margin:29px 0 23px;border:1px solid #343634; }
.bk-featured .bk-cover { min-height:370px;background:#181b1c; }
.bk-featured .bk-cover-mid { flex-direction:column;gap:27px; }
.bk-featured .bk-cover-icon { width:104px;height:104px; }
.bk-featured .bk-cover-mid b { font-size:64px; }
.bk-featured-body { padding:clamp(27px,3.8vw,55px);display:flex;flex-direction:column;justify-content:center;align-items:start;gap:19px; }
.bk-featured-tag { border:1px solid #63552e;border-radius:3px;padding:7px 10px;color:#f5be1e;font-size:9px;font-weight:800;letter-spacing:1.15px; }
.bk-featured h3 { font:700 clamp(26px,2.7vw,40px)/1.22 Manrope,Arial,sans-serif;letter-spacing:-.05em; }
.bk-featured p { color:#b0b3ac;font-size:14px;line-height:1.75; }
.bk-featured a { color:#f5be1e;display:inline-flex;gap:15px;align-items:center;font-size:12px;font-weight:800;border-bottom:1px solid #f5be1e55;padding-bottom:8px; }
.bk-empty { margin:25px 0;text-align:center;border:1px dashed #c8c6bf;border-radius:8px;padding:65px 20px;color:#666; }
.bk-close { background:#191b1c;color:#f2f0eb;padding:84px 0; }
.bk-close-row { display:flex;gap:32px;justify-content:space-between;align-items:center; }
.bk-close h2 { font:700 clamp(29px,3.1vw,45px)/1.2 Manrope,Arial,sans-serif;letter-spacing:-.055em;margin:17px 0 15px;max-width:700px; }
.bk-close p { color:#a6aaa3;font-size:14px;line-height:1.7;max-width:560px; }
.bk-close-link { width:94px;height:94px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid #817046;color:var(--bk-yellow);flex:none;transition:transform .25s,background .25s; }
.bk-close-link:hover { transform:rotate(45deg);background:#29251a; }
.bk-footer { background:#101112;border-top:1px solid #343534;padding:61px 0 28px; }
.bk-footer-cols { display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:39px;padding-bottom:58px; }
.bk-footer-cols h4 { font-size:10px;letter-spacing:1.5px;color:#deb947;margin-bottom:20px;font-weight:800; }
.bk-footer-cols p,.bk-footer-cols a,.bk-footer-cols span:not(.bk-logo-name):not(.bk-logo-sub):not(.bk-logo-mark) { color:#9ca09a;font-size:12px;line-height:1.8; }
.bk-footer-cols a { display:block;margin-bottom:9px; }
.bk-footer-cols a:hover { color:#f5be1e; }
.bk-footer-brand p { max-width:250px;margin-top:18px; }
.bk-footer-bottom { border-top:1px solid #343534;padding-top:24px;display:flex;justify-content:space-between;gap:18px;color:#81837e;font-size:11px; }
.bk-footer-bottom a { color:#bbb6a5; }
.bk-reveal { opacity:0;transform:translateY(17px);transition:opacity .65s,transform .65s; }
.bk-reveal.in { opacity:1;transform:none; }
.bk-reader-hero { position:relative;overflow:hidden;padding:157px 0 77px;background:#131516;isolation:isolate; }
.bk-reader-hero::before { content:'';position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse at 85% 45%,rgba(245,190,30,.085),transparent 42%); }
.bk-reader-hero-layout { display:grid;grid-template-columns:1fr 300px;align-items:center;gap:55px; }
.bk-back { display:inline-flex;gap:10px;align-items:center;color:#c4bfaf;font-size:11px;font-weight:700;margin-bottom:34px; }
.bk-back:hover { color:var(--bk-yellow); }
.bk-reader-hero h1 { font:700 clamp(34px,4.1vw,61px)/1.15 Manrope,Arial,sans-serif;letter-spacing:-.058em;max-width:830px;margin:18px 0 18px; }
.bk-reader-intro { color:#b1b5af;line-height:1.8;font-size:15px;max-width:820px; }
.bk-reader-graphic { position:relative;aspect-ratio:1;border:1px solid #41423c;border-radius:8px;background:linear-gradient(135deg,#202223,#141616);display:flex;align-items:center;justify-content:center; }
.bk-reader-graphic::before,.bk-reader-graphic::after { content:'';position:absolute;width:77%;height:77%;border:1px solid #5c5137;border-radius:50%; }
.bk-reader-graphic::after { width:55%;height:55%;border-color:#34393a;border-style:dashed;animation:bk-spin 42s linear infinite; }
.bk-reader-graphic-icon { color:var(--bk-yellow); }
.bk-reader-bar { display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin-top:27px;color:#b3ab92;font-size:11px;font-weight:700;letter-spacing:.3px; }
.bk-reader { background:var(--bk-cream);color:#1b1c1b;padding:81px 0 90px; }
.bk-reader-layout { display:grid;grid-template-columns:minmax(0,760px) minmax(0,270px);justify-content:space-between;gap:50px; }
.bk-prose-lead { font:500 clamp(18px,1.7vw,22px)/1.75 'DM Sans',sans-serif;color:#333532;margin-bottom:43px; }
.bk-prose-section { border-top:1px solid #d1d0ca;padding:34px 0 38px; }
.bk-prose-n { display:flex;gap:15px;align-items:center;color:#9c782d;font:800 10px Manrope,Arial,sans-serif;letter-spacing:1.4px;margin-bottom:16px; }
.bk-prose-n:after { content:'';height:1px;width:36px;background:#b69b5d; }
.bk-prose-section h2 { font:700 clamp(23px,2.4vw,33px)/1.3 Manrope,Arial,sans-serif;letter-spacing:-.038em;margin:0 0 16px; }
.bk-prose-section p { color:#5b605a;font-size:16px;line-height:1.9; }
.bk-pullquote { border-left:3px solid #c2a04d;padding:18px 24px;background:#e8e4d9;margin:16px 0 30px;font-size:15px;font-weight:600;line-height:1.9;color:#3a3a35; }
.bk-side { position:relative; }
.bk-side-inner { position:sticky;top:105px;border:1px solid #d3d0c8;background:#ebe8df;padding:25px;border-radius:7px; }
.bk-side-label { color:#806a40;font-weight:800;font-size:10px;letter-spacing:1.2px;margin-bottom:15px; }
.bk-side a { display:flex;gap:11px;align-items:start;color:#51544e;border-top:1px solid #d2cfc7;padding:15px 0;font-size:12px;line-height:1.5; }
.bk-side a:hover { color:#a2781d; }
.bk-side a span { color:#aa8834;font-weight:800; }
.bk-side-note { margin-top:19px;color:#72776e;font-size:11px;line-height:1.65; }
.bk-more { border-top:1px solid #d1d0ca;padding-top:36px;margin-top:20px; }
.bk-more h3 { font:700 20px Manrope,Arial,sans-serif;letter-spacing:-.03em;margin-bottom:21px; }
.bk-more-link { display:inline-flex;align-items:center;gap:15px;font-size:12px;font-weight:800;color:#1b1c1b;border-bottom:1px solid #c9a246;padding-bottom:8px; }
.bk-progress { position:fixed;z-index:110;top:0;left:0;height:2px;background:var(--bk-yellow);transition:width .15s; }
@keyframes bk-float { from {transform:translateY(-5px)} to {transform:translateY(7px)} }
@keyframes bk-pulse { 50% { opacity:.45; } }
@keyframes bk-spin { to { transform:rotate(360deg); } }
@media(max-width:1050px) { .bk-nav-links {gap:16px} .bk-reader-hero-layout {grid-template-columns:minmax(0,1fr) 230px} .bk-reader-layout {grid-template-columns:1fr 230px;gap:30px} .bk-footer-cols {gap:22px} }
@media(max-width:920px) { .bk-nav-links {display:none} .bk-menu-btn {display:flex} .bk-hero-inner {grid-template-columns:1fr} .bk-hero {padding:132px 0 70px} .bk-graphic {max-width:600px;width:100%;min-height:330px;margin-inline:auto} .bk-featured {grid-template-columns:1fr 1fr} .bk-reader-hero-layout {grid-template-columns:1fr 190px;gap:26px} .bk-reader-layout {grid-template-columns:1fr} .bk-side {display:none} .bk-footer-cols {grid-template-columns:repeat(2,1fr)} }
@media(max-width:700px) { .bk-wrap {width:calc(100% - 36px)} .bk-nav {top:10px;width:calc(100% - 24px);min-height:59px;padding:8px 11px} .bk-contact {display:none} .bk-logo-name {font-size:17px} .bk-hero {padding:120px 0 60px} .bk-hero h1 {font-size:clamp(34px,9.5vw,47px)} .bk-hero-desc {font-size:14px} .bk-hero-bottom {margin-top:30px} .bk-graphic {min-height:280px} .bk-index-section {padding:64px 0 75px} .bk-section-top {align-items:start} .bk-cards {grid-template-columns:1fr} .bk-featured {display:flex;flex-direction:column} .bk-featured .bk-cover {min-height:240px} .bk-featured .bk-cover-mid {flex-direction:row} .bk-featured .bk-cover-icon {width:76px;height:76px} .bk-featured .bk-cover-mid b {font-size:45px} .bk-featured-body {padding:26px} .bk-close {padding:66px 0} .bk-close-row {align-items:start} .bk-close-link {width:67px;height:67px} .bk-footer-cols {grid-template-columns:1fr 1fr;gap:33px} .bk-footer-brand {grid-column:1/-1} .bk-footer-bottom {flex-direction:column} .bk-reader-hero {padding:127px 0 58px} .bk-reader-hero-layout {grid-template-columns:1fr} .bk-reader-graphic {display:none} .bk-reader-hero h1 {font-size:clamp(32px,8.3vw,49px)} .bk-reader {padding:57px 0 72px} .bk-prose-section p {font-size:15px} }
@media(max-width:390px) { .bk-nav-right {gap:7px} .bk-filters {gap:6px} .bk-filter {padding:9px;font-size:11px} .bk-hero h1 {font-size:33px} }
@media(prefers-reduced-motion:reduce) { .bk-reveal {opacity:1;transform:none} .bk-reader-graphic::after,.bk-graphic svg.bk-orbit-art,.bk-live {animation:none} }
`;

function BeeLogo() {
  return <span className="bk-logo"><span className="bk-logo-mark"><svg viewBox="0 0 38 40" fill="none" aria-hidden="true"><path d="M18.9 2 3 11.1v17.8L18.9 38 35 28.9V11.1L18.9 2Z" stroke="currentColor" strokeWidth="1.7"/><path d="M19 3v34M3.5 11.5 35 29M35 11.5 3.5 29" stroke="currentColor" strokeWidth="1.3" opacity=".7"/><circle cx="19" cy="20" r="5.2" fill="currentColor"/></svg></span><span><span className="bk-logo-name">Bee<b>Near</b></span><span className="bk-logo-sub">HUMAN × INTELLIGENCE</span></span></span>;
}
function BlogNav({ t, i18n, spanish }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
    return () => window.removeEventListener('scroll',onScroll);
  },[]);
  const links = [{href:'/',name:t('nav_home')},{href:'/nosotros',name:t('nav_about')},{href:'/servicios',name:t('nav_services')},{href:'/blog',name:'Blog'}];
  return <>
    <header className={`bk-nav${scrolled?' scrolled':''}`}>
      <Link href="/" aria-label="Bee Near — Inicio"><BeeLogo/></Link>
      <nav className="bk-nav-links" aria-label={spanish?'Menú principal':'Main navigation'}>{links.map(x=><Link key={x.href} href={x.href} aria-current={x.href==='/blog'?'page':undefined}>{x.name}</Link>)}</nav>
      <div className="bk-nav-right"><button className="bk-lang" type="button" onClick={()=>i18n.changeLanguage(spanish?'en':'es')} aria-label={spanish?'Switch to English':'Cambiar a español'}><Globe2 size={14}/>{spanish?'EN':'ES'}</button><Link className="bk-contact" href="/contacto">{t('nav_contact')}<ArrowUpRight size={15}/></Link><button type="button" className="bk-menu-btn" onClick={()=>setMenu(!menu)} aria-label={menu?(spanish?'Cerrar menú':'Close menu'):(spanish?'Abrir menú':'Open menu')} aria-expanded={menu}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div>
    </header>
    {menu&&<nav className="bk-mobile" aria-label={spanish?'Navegación móvil':'Mobile navigation'}>{links.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenu(false)}>{x.name}<ArrowUpRight size={15}/></Link>)}<Link href="/contacto" onClick={()=>setMenu(false)}>{t('nav_contact')}<ArrowUpRight size={15}/></Link></nav>}
  </>;
}
function BlogFooter({t,spanish}) {
  return <footer className="bk-footer"><div className="bk-wrap"><div className="bk-footer-cols">
      <div className="bk-footer-brand"><Link href="/"><BeeLogo/></Link><p>{t('footer_desc')}</p></div>
      <div><h4>{t('footer_links')}</h4><Link href="/">{t('nav_home')}</Link><Link href="/nosotros">{t('nav_about')}</Link><Link href="/servicios">{t('nav_services')}</Link></div>
      <div><h4>{spanish?'EXPLORAR':'EXPLORE'}</h4><Link href="/blog">Blog</Link><Link href="/contacto">{t('nav_contact')}</Link><a href="/docs/privacy_policy_for_website.pdf" target="_blank" rel="noopener noreferrer">{t('footer_privacy')}</a></div>
      <div><h4>{t('footer_contact')}</h4><a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a><a href="tel:+12153180179">+1 (215) 318-0179</a><span>Ejército Nacional 373, CDMX</span></div>
    </div><div className="bk-footer-bottom"><span>© {new Date().getFullYear()} Bee Near. {t('footer_rights')}</span><span>HUMAN × INTELLIGENCE</span></div></div></footer>;
}
function Eyebrow({children,dark=false}) { return <div className={`bk-eyebrow${dark?' dark':''}`}>{children}</div>; }
function BlogCover({article,featured=false}) {
  const Icon=article.icon;
  return <div className="bk-cover" data-kind={article.category} aria-hidden="true"><div className="bk-cover-top"><span>BEE NEAR / INSIGHTS</span><span>2026</span></div><div className="bk-cover-mid"><span className="bk-cover-icon"><Icon size={featured?48:35} strokeWidth={1.45}/></span><b>{String(article.id).padStart(2,'0')}</b></div><div className="bk-cover-footer"><span>HUMAN × INTELLIGENCE</span><span>↗</span></div></div>;
}
function ContactClose({spanish}) {
  return <section className="bk-close"><div className="bk-wrap bk-close-row"><div><Eyebrow>{spanish?'EL SIGUIENTE PASO':'THE NEXT STEP'}</Eyebrow><h2>{spanish?'Conversemos sobre lo que viene.':'Let’s talk about what comes next.'}</h2><p>{spanish?'Conoce cómo podemos ayudarte a conectar tecnología, operación y experiencia humana.':'See how we can help connect technology, operations, and human experience.'}</p></div><Link className="bk-close-link" href="/contacto" aria-label={spanish?'Ir a contacto':'Go to contact'}><ArrowUpRight size={34}/></Link></div></section>;
}
function useReveal(dependency = null) {
  useEffect(()=>{
    const nodes=[...document.querySelectorAll('.bk-reveal')];
    if (!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches) {nodes.forEach(n=>n.classList.add('in'));return;}
    const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ob.unobserve(e.target)}}),{threshold:.05,rootMargin:'0px 0px -26px 0px'});
    nodes.forEach(n=>ob.observe(n));return ()=>ob.disconnect();
  },[dependency]);
}

export default function BlogArticle({id}) {
  const {t,i18n}=useTranslation();
  const isSpanish=i18n.language?.toLowerCase().startsWith('es');
  const [progress,setProgress]=useState(0);
  useReveal();
  useEffect(()=>{
    const update=()=>{const doc=document.documentElement;const d=Math.max(1,doc.scrollHeight-window.innerHeight);setProgress(Math.min(100,Math.max(0,window.scrollY/d*100)));};
    update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};
  },[]);
    const articles = {

        1: {
            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',

            title: isSpanish
                ? '¿Cómo puede la inteligencia artificial mejorar la atención al cliente?'
                : 'How can artificial intelligence improve customer service?',

            date: '14 Sep 2026',

            icon: Bot,

            intro: isSpanish
                ? 'La inteligencia artificial está transformando la manera en que las empresas se relacionan con sus clientes. Desde respuestas más rápidas hasta procesos automatizados, la tecnología permite ofrecer experiencias más eficientes y personalizadas.'
                : 'Artificial intelligence is transforming the way companies interact with their customers. From faster responses to automated processes, technology enables more efficient and personalized experiences.',

            sections: isSpanish
                ? [
                    {
                        title: 'Una atención más rápida',
                        text: 'Los clientes esperan respuestas cada vez más rápidas. Las herramientas basadas en inteligencia artificial pueden ayudar a atender consultas frecuentes y proporcionar información de manera inmediata, reduciendo los tiempos de espera.'
                    },
                    {
                        title: 'Experiencias más personalizadas',
                        text: 'La inteligencia artificial permite analizar información de las conversaciones y utilizarla para comprender mejor las necesidades de cada cliente. Esto ayuda a ofrecer respuestas y soluciones más relacionadas con su situación.'
                    },
                    {
                        title: 'La tecnología trabaja junto con las personas',
                        text: 'La inteligencia artificial no necesariamente reemplaza al equipo humano. Puede encargarse de tareas repetitivas mientras los colaboradores se concentran en situaciones que requieren experiencia, criterio y atención personalizada.'
                    }
                ]
                : [
                    {
                        title: 'Faster customer service',
                        text: 'Customers expect faster responses. Artificial intelligence tools can help handle frequent questions and provide information immediately, reducing waiting times.'
                    },
                    {
                        title: 'More personalized experiences',
                        text: 'Artificial intelligence can analyze conversation data and use it to better understand each customer’s needs, helping provide more relevant responses and solutions.'
                    },
                    {
                        title: 'Technology working alongside people',
                        text: 'Artificial intelligence does not necessarily replace human teams. It can handle repetitive tasks while employees focus on situations that require experience and judgment.'
                    }
                ]
        },

        2: {
            category: isSpanish
                ? 'Atención al cliente'
                : 'Customer Service',

            title: isSpanish
                ? 'La atención al cliente también es parte de tu crecimiento'
                : 'Customer service is also part of your growth',

            date: '10 Sep 2026',

            icon: Headphones,

            intro: isSpanish
                ? 'Una conversación con un cliente puede ser mucho más que una simple interacción. Una buena experiencia puede fortalecer la relación con una empresa y convertirse en una oportunidad de crecimiento.'
                : 'A conversation with a customer can be much more than a simple interaction. A great experience can strengthen the relationship with a company and become an opportunity for growth.',

            sections: isSpanish
                ? [
                    {
                        title: 'Cada conversación cuenta',
                        text: 'La atención al cliente representa uno de los principales puntos de contacto entre una empresa y sus clientes. Cada llamada, mensaje o consulta puede influir en la percepción que una persona tiene de la marca.'
                    },
                    {
                        title: 'Escuchar también es una estrategia',
                        text: 'Comprender las necesidades y comentarios de los clientes permite detectar oportunidades de mejora y conocer mejor aquello que realmente valoran.'
                    },
                    {
                        title: 'Una buena experiencia genera confianza',
                        text: 'Cuando una empresa responde de manera clara, rápida y cercana, aumenta la posibilidad de construir relaciones duraderas con sus clientes.'
                    }
                ]
                : [
                    {
                        title: 'Every conversation matters',
                        text: 'Customer service is one of the main contact points between a company and its customers. Every call, message or inquiry can influence how people perceive a brand.'
                    },
                    {
                        title: 'Listening is also a strategy',
                        text: 'Understanding customer needs and feedback helps identify opportunities for improvement and discover what customers truly value.'
                    },
                    {
                        title: 'Great experiences build trust',
                        text: 'When a company responds clearly, quickly and personally, it becomes easier to build long-lasting customer relationships.'
                    }
                ]
        },

        3: {
            category: isSpanish
                ? 'Automatización'
                : 'Automation',

            title: isSpanish
                ? 'Automatiza procesos y deja que tu equipo se enfoque en lo importante'
                : 'Automate processes and let your team focus on what matters',

            date: '05 Sep 2026',

            icon: Zap,

            intro: isSpanish
                ? 'La automatización permite que las empresas reduzcan el tiempo dedicado a tareas repetitivas y concentren sus recursos en actividades que realmente generan valor.'
                : 'Automation allows companies to reduce the time spent on repetitive tasks and focus their resources on activities that create real value.',

            sections: isSpanish
                ? [
                    {
                        title: 'Menos tareas repetitivas',
                        text: 'Registrar información, organizar datos o realizar seguimientos constantemente puede consumir una gran cantidad de tiempo. Automatizar estos procesos ayuda a reducir trabajo manual.'
                    },
                    {
                        title: 'Procesos más consistentes',
                        text: 'Los procesos automatizados pueden seguir reglas definidas, ayudando a mantener una operación más organizada y consistente.'
                    },
                    {
                        title: 'Más tiempo para tu equipo',
                        text: 'Cuando la tecnología se encarga de determinadas tareas, las personas pueden dedicar más tiempo a atender clientes, resolver problemas y desarrollar nuevas oportunidades.'
                    }
                ]
                : [
                    {
                        title: 'Fewer repetitive tasks',
                        text: 'Recording information, organizing data and constantly following up can consume a significant amount of time. Automating these processes reduces manual work.'
                    },
                    {
                        title: 'More consistent processes',
                        text: 'Automated processes can follow predefined rules, helping maintain a more organized and consistent operation.'
                    },
                    {
                        title: 'More time for your team',
                        text: 'When technology handles certain tasks, people can spend more time helping customers, solving problems and developing new opportunities.'
                    }
                ]
        },

        4: {
            category: isSpanish
                ? 'Ventas'
                : 'Sales',

            title: isSpanish
                ? 'Cada contacto puede convertirse en una oportunidad'
                : 'Every contact can become an opportunity',

            date: '01 Sep 2026',

            icon: BarChart3,

            intro: isSpanish
                ? 'No todos los contactos se convierten inmediatamente en clientes. El seguimiento adecuado puede hacer la diferencia entre perder una oportunidad y construir una relación comercial.'
                : 'Not every contact immediately becomes a customer. Proper follow-up can make the difference between losing an opportunity and building a business relationship.',

            sections: isSpanish
                ? [
                    {
                        title: 'Conocer a tus prospectos',
                        text: 'Tener información organizada sobre cada contacto permite comprender mejor quién es, qué necesita y en qué etapa del proceso comercial se encuentra.'
                    },
                    {
                        title: 'El seguimiento es fundamental',
                        text: 'Una persona que hoy no está preparada para comprar puede convertirse en un cliente posteriormente. Mantener un seguimiento adecuado ayuda a no perder estas oportunidades.'
                    },
                    {
                        title: 'Datos para tomar mejores decisiones',
                        text: 'Registrar las interacciones comerciales permite identificar qué estrategias funcionan mejor y dónde existen oportunidades para mejorar.'
                    }
                ]
                : [
                    {
                        title: 'Know your prospects',
                        text: 'Organized information about each contact makes it easier to understand who they are, what they need and where they are in the sales process.'
                    },
                    {
                        title: 'Follow-up is essential',
                        text: 'Someone who is not ready to buy today may become a customer later. Proper follow-up helps prevent these opportunities from being lost.'
                    },
                    {
                        title: 'Data for better decisions',
                        text: 'Recording commercial interactions makes it possible to identify which strategies work best and where improvements can be made.'
                    }
                ]
        },

        5: {
            category: isSpanish
                ? 'Automatización'
                : 'Automation',

            title: isSpanish
                ? 'Menos tareas repetitivas, más tiempo para tu negocio'
                : 'Less repetitive work, more time for your business',

            date: '28 Ago 2026',

            icon: Clock3,

            intro: isSpanish
                ? 'La tecnología puede encargarse de procesos que consumen tiempo todos los días, permitiendo que los equipos se concentren en actividades más importantes para el negocio.'
                : 'Technology can handle processes that consume time every day, allowing teams to focus on activities that matter more to the business.',

            sections: isSpanish
                ? [
                    {
                        title: 'Identifica qué tareas consumen más tiempo',
                        text: 'Antes de automatizar es importante identificar las actividades repetitivas que ocupan una parte importante de la jornada laboral.'
                    },
                    {
                        title: 'Automatizar no significa complicar',
                        text: 'Una buena solución tecnológica debe facilitar el trabajo. La automatización debe integrarse de manera sencilla en los procesos existentes.'
                    },
                    {
                        title: 'Convierte tiempo en oportunidades',
                        text: 'Reducir tareas manuales permite dedicar más tiempo a los clientes, las ventas y el crecimiento de la empresa.'
                    }
                ]
                : [
                    {
                        title: 'Identify time-consuming tasks',
                        text: 'Before automating, it is important to identify repetitive activities that take up a significant part of the workday.'
                    },
                    {
                        title: 'Automation should not complicate things',
                        text: 'A good technology solution should make work easier. Automation should integrate naturally into existing processes.'
                    },
                    {
                        title: 'Turn time into opportunities',
                        text: 'Reducing manual tasks allows teams to spend more time with customers, sales and business growth.'
                    }
                ]
        },

        6: {
            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',

            title: isSpanish
                ? 'El futuro de las conversaciones entre empresas y clientes'
                : 'The future of conversations between businesses and customers',

            date: '22 Ago 2026',

            icon: Bot,

            intro: isSpanish
                ? 'La manera en que las empresas se comunican con sus clientes está evolucionando. Nuevas tecnologías están permitiendo crear conversaciones más rápidas, inteligentes y conectadas.'
                : 'The way companies communicate with their customers is evolving. New technologies are enabling faster, smarter and more connected conversations.',

            sections: isSpanish
                ? [
                    {
                        title: 'Conversaciones más inteligentes',
                        text: 'Las nuevas herramientas permiten analizar conversaciones y obtener información que ayuda a comprender mejor las necesidades de los clientes.'
                    },
                    {
                        title: 'Tecnología disponible en todo momento',
                        text: 'Las soluciones digitales permiten mantener canales de comunicación disponibles durante más tiempo, facilitando que los clientes puedan interactuar cuando lo necesitan.'
                    },
                    {
                        title: 'El futuro será híbrido',
                        text: 'La combinación entre tecnología y atención humana permitirá crear experiencias más completas, donde cada una cumpla una función diferente.'
                    }
                ]
                : [
                    {
                        title: 'Smarter conversations',
                        text: 'New tools make it possible to analyze conversations and obtain information that helps better understand customer needs.'
                    },
                    {
                        title: 'Technology available around the clock',
                        text: 'Digital solutions allow communication channels to remain available for longer periods, making it easier for customers to interact when needed.'
                    },
                    {
                        title: 'The future will be hybrid',
                        text: 'Combining technology with human service will create more complete experiences, with each one serving a different purpose.'
                    }
                ]
        }
    };



  const article=articles[id]||articles[1];
  const Icon=article.icon;
  const topicLabel=isSpanish?'PERSPECTIVAS / LECTURA':'PERSPECTIVES / READING';
  return <>
    <Head title={`${article.title} | Bee Near`}><meta name="description" content={article.intro}/></Head>
    <div className="bn-blog"><style>{BLOG_CSS}</style><div className="bk-progress" style={{width:`${progress}%`}} aria-hidden="true"/><BlogNav t={t} i18n={i18n} spanish={isSpanish}/>
      <header className="bk-reader-hero"><div className="bk-grid" aria-hidden="true"/><div className="bk-wrap bk-reader-hero-layout"><div><Link className="bk-back" href="/blog"><ArrowLeft size={16}/>{isSpanish?'Volver al blog':'Back to the journal'}</Link><Eyebrow>04 / BEE NEAR JOURNAL</Eyebrow><h1>{article.title}</h1><p className="bk-reader-intro">{article.intro}</p><div className="bk-reader-bar"><span>{article.category}</span><span>·</span><span>{article.date}</span><span>·</span><span>BEENEAR INSIGHTS</span></div></div><div className="bk-reader-graphic" aria-hidden="true"><span className="bk-reader-graphic-icon"><Icon size={76} strokeWidth={1.1}/></span><span style={{position:'absolute',bottom:22,left:22,fontSize:9,letterSpacing:1.4,color:'#8e918b',fontWeight:700}}>BN / {String(id).padStart(2,'0')}</span></div></div></header>
      <main className="bk-reader"><div className="bk-wrap bk-reader-layout"><article><div className="bk-reveal"><div className="bk-eyebrow dark" style={{marginBottom:21}}>{topicLabel}</div><p className="bk-prose-lead">{article.intro}</p></div>{article.sections.map((section,index)=><section className="bk-prose-section bk-reveal" id={`seccion-${index+1}`} key={index}><div className="bk-prose-n">{String(index+1).padStart(2,'0')} / 03</div><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className="bk-pullquote bk-reveal">{isSpanish?'En Bee Near creemos que la tecnología debe ayudar a las empresas a conectar mejor con sus clientes y construir relaciones más eficientes.':'At Bee Near, we believe technology should help businesses connect with their customers and build more effective relationships.'}</div><div className="bk-more bk-reveal"><h3>{isSpanish?'Sigue explorando':'Keep exploring'}</h3><Link href="/blog" className="bk-more-link"><ArrowLeft size={15}/>{isSpanish?'Ver todos los artículos':'See all articles'}</Link></div></article><aside className="bk-side"><div className="bk-side-inner"><div className="bk-side-label">{isSpanish?'EN ESTE ARTÍCULO':'IN THIS ARTICLE'}</div>{article.sections.map((section,index)=><a key={index} href={`#seccion-${index+1}`}><span>{String(index+1).padStart(2,'0')}</span>{section.title}</a>)}<p className="bk-side-note">{isSpanish?'Contenido editorial de Bee Near sobre tecnología y experiencia humana.':'Bee Near editorial content on technology and human experience.'}</p></div></aside></div></main>
      <ContactClose spanish={isSpanish}/><BlogFooter t={t} spanish={isSpanish}/>
    </div>
  </>;
}
