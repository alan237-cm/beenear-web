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
.bk-logo { display:inline-flex;align-items:center;flex:none;gap:10px;color:#fff;white-space:nowrap;max-width:160px;max-height:62px;overflow:hidden; }
.bk-logo img { display:block !important; width:160px !important; height:62px !important; max-width:160px !important; max-height:62px !important; object-fit:contain;object-position:left center; }
.bk-nav > a:first-child { display:flex;align-items:center;flex:0 0 160px;max-width:160px;height:62px;overflow:hidden; }
.bk-footer-brand > a:first-child { display:inline-flex;max-width:160px;overflow:hidden; }
@media(max-width:700px) { .bk-logo,.bk-nav>a:first-child { max-width:132px; } .bk-nav>a:first-child { flex-basis:132px;height:54px; } .bk-logo img { width:132px !important;height:54px !important;max-width:132px !important;max-height:54px !important; } }
.bk-logo-mark { display:inline-flex;width:32px;height:34px;color:var(--bk-yellow); }
.bk-logo-mark svg { width:100%;height:100%; }
.bk-logo-name { display:block;font:700 18px/1.1 Manrope,Arial,sans-serif;letter-spacing:-.8px; }
.bk-logo-name b { color:var(--bk-yellow); }
.bk-logo-sub { display:block;margin-top:4px;font-size:7px;letter-spacing:1.55px;color:#888c87;font-weight:700; }
.bk-nav { position:fixed;z-index:100;top:18px;left:50%;transform:translateX(-50%);width:min(1252px,calc(100% - 64px));min-height:63px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:9px 14px 9px 21px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(16,17,18,.9);box-shadow:0 12px 40px rgba(0,0,0,.25);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:top .25s,background .25s; }
.bk-nav.scrolled { top:9px;background:rgba(14,15,16,.97); }
.bk-nav-links { display:flex;align-items:center;gap:24px; }
.bk-nav-links a { color:#aeb0aa;font-size:12px;font-weight:500;position:relative;transition:color .2s; }
.bk-nav-links a:hover,.bk-nav-links a[aria-current='page'] { color:#f1eee8; }
.bk-nav-links a[aria-current='page']::after { content:'';position:absolute;height:2px;width:100%;left:0;bottom:-11px;background:var(--bk-yellow); }
.bk-nav-right { display:flex;align-items:center;gap:16px; }
.bk-lang { display:flex;align-items:center;gap:6px;border:0;background:none;color:#dddcd7;font-weight:700;font-size:11px;padding:9px 1px; }
.bk-contact { display:flex;gap:12px;align-items:center;justify-content:center;border-radius:6px;background:var(--bk-yellow);padding:11px 20px;color:#171717!important;font-size:12px;font-weight:800;transition:background .2s,transform .2s; }
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
@media(max-width:1180px) { .bk-nav-links {gap:16px} .bk-nav-links a {font-size:11px} }
@media(max-width:1050px) { .bk-nav-links {display:none} .bk-menu-btn {display:flex} .bk-reader-hero-layout {grid-template-columns:minmax(0,1fr) 230px} .bk-reader-layout {grid-template-columns:1fr 230px;gap:30px} .bk-footer-cols {gap:22px} }
@media(max-width:920px) { .bk-hero-inner {grid-template-columns:1fr} .bk-hero {padding:132px 0 70px} .bk-graphic {max-width:600px;width:100%;min-height:330px;margin-inline:auto} .bk-featured {grid-template-columns:1fr 1fr} .bk-reader-hero-layout {grid-template-columns:1fr 190px;gap:26px} .bk-reader-layout {grid-template-columns:1fr} .bk-side {display:none} .bk-footer-cols {grid-template-columns:repeat(2,1fr)} }
@media(max-width:700px) { .bk-wrap {width:calc(100% - 36px)} .bk-nav {top:10px;width:calc(100% - 24px);min-height:59px;padding:8px 11px} .bk-contact {display:none} .bk-logo-name {font-size:17px} .bk-hero {padding:120px 0 60px} .bk-hero h1 {font-size:clamp(34px,9.5vw,47px)} .bk-hero-desc {font-size:14px} .bk-hero-bottom {margin-top:30px} .bk-graphic {min-height:280px} .bk-index-section {padding:64px 0 75px} .bk-section-top {align-items:start} .bk-cards {grid-template-columns:1fr} .bk-featured {display:flex;flex-direction:column} .bk-featured .bk-cover {min-height:240px} .bk-featured .bk-cover-mid {flex-direction:row} .bk-featured .bk-cover-icon {width:76px;height:76px} .bk-featured .bk-cover-mid b {font-size:45px} .bk-featured-body {padding:26px} .bk-close {padding:66px 0} .bk-close-row {align-items:start} .bk-close-link {width:67px;height:67px} .bk-footer-cols {grid-template-columns:1fr 1fr;gap:33px} .bk-footer-brand {grid-column:1/-1} .bk-footer-bottom {flex-direction:column} .bk-reader-hero {padding:127px 0 58px} .bk-reader-hero-layout {grid-template-columns:1fr} .bk-reader-graphic {display:none} .bk-reader-hero h1 {font-size:clamp(32px,8.3vw,49px)} .bk-reader {padding:57px 0 72px} .bk-prose-section p {font-size:15px} }
@media(max-width:390px) { .bk-nav-right {gap:7px} .bk-filters {gap:6px} .bk-filter {padding:9px;font-size:11px} .bk-hero h1 {font-size:33px} }
@media(prefers-reduced-motion:reduce) { .bk-reveal {opacity:1;transform:none} .bk-reader-graphic::after,.bk-graphic svg.bk-orbit-art,.bk-live {animation:none} }
`;

function BeeLogo() {
  return (
    <span className="bk-logo" >
      <img
        src="/images/beenear-imagotipo-dark.png"
        alt="Bee Near"
        width="160"
        height="62"
        style={{ objectFit: 'contain', objectPosition: 'left center', flexShrink: 0 }}
      />
    </span>
  );
}

function BlogNav({ t, i18n, spanish }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
    return () => window.removeEventListener('scroll',onScroll);
  },[]);
  const links = [
    { href: '/#soluciones', name: spanish ? 'Soluciones' : 'Solutions' },
    { href: '/#modelo', name: spanish ? 'El modelo' : 'The model' },
    { href: '/nosotros', name: spanish ? 'Nosotros' : 'About' },
    { href: '/servicios', name: spanish ? 'Servicios' : 'Services' },
    { href: '/blog', name: 'Blog' },
    { href: '/calculadora', name: spanish ? 'Calculadora de personal' : 'Staff calculator' }
  ];
  return <>
    <header className={`bk-nav${scrolled?' scrolled':''}`}>
      <Link href="/" aria-label="Bee Near — Inicio"><BeeLogo/></Link>
      <nav className="bk-nav-links" aria-label={spanish?'Menú principal':'Main navigation'}>
        {links.map(x=><Link key={x.href} href={x.href} aria-current={x.href==='/blog'?'page':undefined}>{x.name}</Link>)}
      </nav>
      <div className="bk-nav-right">
        <button className="bk-lang" type="button" onClick={()=>i18n.changeLanguage(spanish?'en':'es')} aria-label={spanish?'Switch to English':'Cambiar a español'}>
          <Globe2 size={14}/>{spanish?'EN':'ES'}
        </button>
        <Link className="bk-contact" href="/contacto">
          {spanish ? 'Hablemos' : 'Let’s talk'}<ArrowUpRight size={15}/>
        </Link>
        <button type="button" className="bk-menu-btn" onClick={()=>setMenu(!menu)} aria-label={menu?(spanish?'Cerrar menú':'Close menu'):(spanish?'Abrir menú':'Open menu')} aria-expanded={menu}>
          {menu?<X size={20}/>:<Menu size={20}/>}
        </button>
      </div>
    </header>
    {menu&&<nav className="bk-mobile" aria-label={spanish?'Navegación móvil':'Mobile navigation'}>
      {links.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenu(false)}>{x.name}<ArrowUpRight size={15}/></Link>)}
      <Link href="/contacto" onClick={()=>setMenu(false)}>{spanish ? 'Hablemos' : 'Let’s talk'}<ArrowUpRight size={15}/></Link>
    </nav>}
  </>;
}

function BlogFooter({t,spanish}) {
  return <footer className="bk-footer"><div className="bk-wrap"><div className="bk-footer-cols">
      <div className="bk-footer-brand"><Link href="/"><BeeLogo/></Link><p>{t('footer_desc')}</p></div>
      <div>
        <h4>{t('footer_links')}</h4>
        <Link href="/">{spanish ? 'Soluciones' : 'Solutions'}</Link>
        <Link href="/nosotros">{spanish ? 'Nosotros' : 'About'}</Link>
        <Link href="/servicios">{spanish ? 'Servicios' : 'Services'}</Link>
      </div>
      <div>
        <h4>{spanish?'EXPLORAR':'EXPLORE'}</h4>
        <Link href="/blog">Blog</Link>
        <Link href="/contacto">{spanish ? 'Hablemos' : 'Let’s talk'}</Link>
        <a href="/docs/privacy_policy_for_website.pdf" target="_blank" rel="noopener noreferrer">{t('footer_privacy')}</a>
      </div>
      <div>
        <h4>{t('footer_contact')}</h4>
        <a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a>
        <a href="tel:+12153180179">+1 (215) 318-0179</a>
        <span>Ejército Nacional 373, CDMX</span>
      </div>
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

export default function Blog() {
  const {t,i18n}=useTranslation();
  const isSpanish=i18n.language?.toLowerCase().startsWith('es');
  const [activeCategory,setActiveCategory]=useState('all');
  useReveal(activeCategory);
  const categories=[
    {key:'all',es:'Todos',en:'All'},
    {key:'ai',es:'Inteligencia Artificial',en:'Artificial Intelligence'},
    {key:'care',es:'Atención al cliente',en:'Customer Service'},
    {key:'automation',es:'Automatización',en:'Automation'},
    {key:'sales',es:'Ventas',en:'Sales'},
  ];
  const categoryKeys={ 'Inteligencia Artificial':'ai','Artificial Intelligence':'ai','Atención al cliente':'care','Customer Service':'care','Automatización':'automation','Automation':'automation','Ventas':'sales','Sales':'sales' };
  const articles = [

        {
            id: 1,

            slug: 'inteligencia-artificial-atencion-cliente',

            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',

            title: isSpanish
                ? '¿Cómo puede la inteligencia artificial mejorar la atención al cliente?'
                : 'How can artificial intelligence improve customer service?',

            description: isSpanish
                ? 'Descubre cómo la IA puede ayudar a las empresas a ofrecer experiencias más rápidas, eficientes y personalizadas.'
                : 'Discover how AI can help companies provide faster, more efficient and personalized experiences.',

            date: '14 Sep 2026',

            icon: Bot,

            featured: true,
        },

        {
            id: 2,

            slug: 'atencion-cliente-crecimiento',

            category: isSpanish
                ? 'Atención al cliente'
                : 'Customer Service',

            title: isSpanish
                ? 'La atención al cliente también es parte de tu crecimiento'
                : 'Customer service is also part of your growth',

            description: isSpanish
                ? 'Una buena experiencia puede convertir una conversación en una oportunidad para tu negocio.'
                : 'A great experience can turn a conversation into an opportunity for your business.',

            date: '10 Sep 2026',

            icon: Headphones,
        },

        {
            id: 3,

            slug: 'automatiza-procesos',

            category: isSpanish
                ? 'Automatización'
                : 'Automation',

            title: isSpanish
                ? 'Automatiza procesos y deja que tu equipo se enfoque en lo importante'
                : 'Automate processes and let your team focus on what matters',

            description: isSpanish
                ? 'Conoce cómo la automatización puede reducir tareas repetitivas y mejorar la operación.'
                : 'Learn how automation can reduce repetitive tasks and improve operations.',

            date: '05 Sep 2026',

            icon: Zap,
        },

        {
            id: 4,

            slug: 'cada-contacto-oportunidad',

            category: isSpanish
                ? 'Ventas'
                : 'Sales',

            title: isSpanish
                ? 'Cada contacto puede convertirse en una oportunidad'
                : 'Every contact can become an opportunity',

            description: isSpanish
                ? 'El seguimiento adecuado de tus prospectos puede marcar la diferencia en tus resultados comerciales.'
                : 'Proper prospect follow-up can make a difference in your commercial results.',

            date: '01 Sep 2026',

            icon: BarChart3,
        },

        {
            id: 5,

            slug: 'menos-tareas-repetitivas',

            category: isSpanish
                ? 'Automatización'
                : 'Automation',

            title: isSpanish
                ? 'Menos tareas repetitivas, más tiempo para tu negocio'
                : 'Less repetitive work, more time for your business',

            description: isSpanish
                ? 'La tecnología puede encargarse de procesos que consumen tiempo todos los días.'
                : 'Technology can handle processes that consume time every day.',

            date: '28 Ago 2026',

            icon: Clock3,
        },

        {
            id: 6,

            slug: 'futuro-conversaciones-empresas-clientes',

            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',

            title: isSpanish
                ? 'El futuro de las conversaciones entre empresas y clientes'
                : 'The future of conversations between businesses and customers',

            description: isSpanish
                ? 'Las nuevas tecnologías están transformando la forma en que las empresas se comunican.'
                : 'New technologies are transforming the way companies communicate.',

            date: '22 Ago 2026',

            icon: Bot,
        },
  ];
  const filtered=activeCategory==='all'?articles:articles.filter(x=>categoryKeys[x.category]===activeCategory);
  const featured=filtered[0];
  const rest=filtered.slice(1);
  const goToArticles=()=>document.getElementById('articulos')?.scrollIntoView({behavior:'smooth'});
  return <>
    <Head title="Blog | Bee Near"><meta name="description" content={isSpanish?'Ideas sobre inteligencia artificial, atención al cliente, automatización y ventas.':'Ideas on AI, customer service, automation, and sales.'}/></Head>
    <div className="bn-blog"><style>{BLOG_CSS}</style><BlogNav t={t} i18n={i18n} spanish={isSpanish}/>
      <section className="bk-hero">
        <div className="bk-grid" aria-hidden="true"/>
        <div className="bk-wrap bk-hero-inner">
          <div><Eyebrow>04 / BEE NEAR JOURNAL</Eyebrow><h1>{isSpanish?<>Ideas para una <em>nueva forma</em> de conectar.</>:<>Ideas for a <em>new way</em> to connect.</>}</h1><p className="bk-hero-desc">{isSpanish?'Perspectivas sobre inteligencia artificial, operación y experiencia humana. Tecnología que tiene algo que decir, y conversaciones que vale la pena empezar.':'Perspectives on AI, operations, and human experience. Technology with something to say, and conversations worth starting.'}</p><div className="bk-hero-actions"><button type="button" className="bk-yellow-btn" onClick={goToArticles}>{isSpanish?'Explorar artículos':'Explore articles'}<ArrowDownRight size={16}/></button><Link href="/servicios" className="bk-outline-btn">{isSpanish?'Nuestras soluciones':'Our solutions'}<ArrowUpRight size={16}/></Link></div><div className="bk-hero-bottom"><span>BEYOND THE CONVERSATION</span><span>AI / EXPERIENCE / OPERATIONS</span></div></div>
          <div className="bk-graphic" role="img" aria-label={isSpanish?'Ilustración abstracta de conexiones e inteligencia':'Abstract artwork of connections and intelligence'}><div className="bk-graphic-top"><span>BN—JOURNAL / 001</span><span>IDEAS IN MOTION</span></div>
            <svg className="bk-orbit-art" viewBox="0 0 450 360" fill="none" aria-hidden="true"><defs><linearGradient id="orbitgold" x1="30" y1="40" x2="415" y2="350"><stop stopColor="#f5be1e" stopOpacity=".1"/><stop offset=".55" stopColor="#f5be1e" stopOpacity=".75"/><stop offset="1" stopColor="#f5be1e" stopOpacity=".1"/></linearGradient></defs><circle cx="230" cy="176" r="145" stroke="#98834e" strokeOpacity=".24" strokeDasharray="2 8"/><circle cx="230" cy="176" r="107" stroke="#957e43" strokeOpacity=".40"/><circle cx="230" cy="176" r="68" stroke="#957e43" strokeOpacity=".5"/><path d="M90 110 230 176 370 90M95 257 230 176 360 270" stroke="url(#orbitgold)" strokeWidth="1.6"/>{[[90,110],[370,90],[95,257],[360,270]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="23" fill="#1b1d1e" stroke="#625638"/><circle cx={x} cy={y} r="5" fill="#e3b549"/></g>)}<circle cx="230" cy="176" r="42" fill="#121415" stroke="#bd9740"/><path d="M230 156 211 166v21l19 10 19-10v-21l-19-10Zm0 0v41m-19-31 38 21m0-21-38 21" stroke="#f5be1e" strokeWidth="1.6"/><circle cx="230" cy="176" r="5" fill="#f5be1e"/><path d="M115 54H179M280 302H351" stroke="#e3b549" strokeOpacity=".45" strokeDasharray="4 6"/></svg>
            <div className="bk-graphic-foot"><i className="bk-live"/>EDITORIAL / INTELLIGENCE<span className="bk-mini-index">01—06</span></div>
          </div>
        </div>
      </section>
      <main id="articulos" className="bk-index-section"><div className="bk-wrap">
        <div className="bk-section-top bk-reveal"><div><Eyebrow dark>{isSpanish?'01 / PERSPECTIVAS':'01 / PERSPECTIVES'}</Eyebrow><h2>{isSpanish?'Explora nuestras ideas.':'Explore our thinking.'}</h2></div><span className="bk-count">{String(filtered.length).padStart(2,'0')} / {isSpanish?'ARTÍCULOS':'ARTICLES'}</span></div>
        <div className="bk-filters" role="group" aria-label={isSpanish?'Filtrar artículos por categoría':'Filter articles by category'}>{categories.map(c=><button key={c.key} type="button" className="bk-filter" aria-pressed={activeCategory===c.key} onClick={()=>setActiveCategory(c.key)}>{isSpanish?c.es:c.en}</button>)}</div>
        {featured?<><div className="bk-featured bk-reveal"><BlogCover article={featured} featured/><div className="bk-featured-body"><span className="bk-featured-tag">{isSpanish?'ARTÍCULO DESTACADO':'FEATURED STORY'} / {featured.category}</span><div className="bk-meta">{featured.date}<i/>BEENEAR INSIGHTS</div><h3>{featured.title}</h3><p>{featured.description}</p><Link href={`/blog/${featured.slug}`}>{isSpanish?'Leer artículo completo':'Read the full story'}<ArrowUpRight size={17}/></Link></div></div>{rest.length>0&&<div className="bk-cards">{rest.map(article=><article className="bk-card bk-reveal" key={article.id}><BlogCover article={article}/><div className="bk-card-body"><div className="bk-meta">{article.category}<i/>{article.date}</div><h3>{article.title}</h3><p className="bk-card-desc">{article.description}</p><Link className="bk-card-link" href={`/blog/${article.slug}`}><span>{isSpanish?'Leer artículo':'Read story'}</span><ArrowUpRight size={18}/></Link></div></article>)}</div>}</>:<div className="bk-empty">{isSpanish?'No hay artículos disponibles en esta categoría.':'No articles available in this category.'}</div>}
      </div></main>
      <ContactClose spanish={isSpanish}/><BlogFooter t={t} spanish={isSpanish}/>
    </div>
  </>;
}