import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink,
  Globe2, Mail, MapPin, Menu, Phone, Send, ShieldCheck, X,
} from 'lucide-react';

/* BEE NEAR / CONTACTO — EDITORIAL EDITION
 * Conservar POST /contacto, traducciones existentes y enlaces de navegación.
 * Requiere solamente React, Inertia, react-i18next y lucide-react.
 */

const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.534887756185!2d-99.18663242491122!3d19.43250918184643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8a8fa3d5089%3A0xc54deed0a52fbd1e!2sAv.%20Ej%C3%A9rcito%20Nacional%20Mexicano%20373%2C%20Granada%2C%20Miguel%20Hidalgo%2C%2011520%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx';
const MAP_URL = 'https://maps.google.com/?q=Ejercito+Nacional+373,+Granada,+Miguel+Hidalgo,+Ciudad+de+Mexico';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.bn-contact { --ct-bg:#101112;--ct-panel:#191b1c;--ct-line:#373937;--ct-cream:#f2f0eb;--ct-gold:#f5be1e;--ct-muted:#a5aaa5; background:var(--ct-bg);color:var(--ct-cream);font-family:'DM Sans',Arial,sans-serif;overflow-x:clip;-webkit-font-smoothing:antialiased; }
.bn-contact *, .bn-contact *::before,.bn-contact *::after {box-sizing:border-box;}
.bn-contact h1,.bn-contact h2,.bn-contact h3,.bn-contact h4,.bn-contact p {margin:0;}
.bn-contact a {text-decoration:none;}
.bn-contact button,.bn-contact input,.bn-contact textarea {font-family:inherit;}
.bn-contact button {cursor:pointer;}
.bn-contact ::selection {background:var(--ct-gold);color:#171819;}
.ct-shell {width:min(1240px,calc(100% - 96px));margin:0 auto;}
.ct-nav {position:fixed;z-index:120;top:18px;left:50%;transform:translateX(-50%);width:min(1252px,calc(100% - 64px));min-height:78px;display:grid;grid-template-columns:180px 1fr auto;align-items:center;column-gap:24px;padding:8px 16px 8px 23px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(16,17,18,.92);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);box-shadow:0 12px 45px #0005;transition:top .2s,background .2s;}
.ct-nav.scrolled {top:9px;background:rgba(13,15,16,.98);}
.ct-brand {width:164px;height:64px;display:flex;align-items:center;overflow:hidden;}
.ct-brand img {width:160px;height:62px;max-width:160px;max-height:62px;display:block;object-fit:contain;object-position:left center;}
.ct-nav-links {display:flex;justify-content:center;gap:clamp(14px,2vw,29px);align-items:center;white-space:nowrap;}
.ct-nav-links a {color:#b3b5b0;font-size:12px;font-weight:600;position:relative;transition:color .2s;}
.ct-nav-links a:hover,.ct-nav-links a[aria-current="page"] {color:#f1efe8;}
.ct-nav-links a[aria-current="page"]::after {content:'';position:absolute;bottom:-12px;left:0;right:0;height:2px;background:var(--ct-gold);}
.ct-nav-right {display:flex;align-items:center;gap:17px;}
.ct-lang {display:inline-flex;gap:8px;align-items:center;border:0;background:transparent;color:#dddcd8;font-size:12px;font-weight:700;padding:10px 2px;}
.ct-lang:hover {color:var(--ct-gold);}
.ct-nav-cta,.ct-primary {display:inline-flex;align-items:center;justify-content:center;gap:15px;border:0;border-radius:6px;background:var(--ct-gold);color:#121313;font-size:12px;font-weight:800;transition:background .2s,transform .2s;}
.ct-nav-cta {padding:13px 17px;white-space:nowrap;}
.ct-primary {min-height:50px;padding:0 20px;}
.ct-nav-cta:hover,.ct-primary:hover {background:#ffd44d;transform:translateY(-2px);}
.ct-menu {display:none;align-items:center;justify-content:center;width:41px;height:41px;background:#242627;color:#fff;border:1px solid #414441;border-radius:7px;}
.ct-mobile {position:fixed;z-index:119;top:90px;left:12px;right:12px;padding:10px;background:#1a1c1d;border:1px solid #3c3d3b;border-radius:10px;box-shadow:0 25px 45px #0009;}
.ct-mobile a {display:flex;align-items:center;justify-content:space-between;padding:14px 12px;border-bottom:1px solid #353735;color:#ededeb;font-size:13px;font-weight:600;}
.ct-mobile a:last-child {border-bottom:0;}
.ct-hero {position:relative;isolation:isolate;min-height:660px;padding:178px 0 105px;overflow:hidden;background:#111213;}
.ct-hero::before {position:absolute;content:'';z-index:-1;inset:0;background:radial-gradient(ellipse at 83% 37%,rgba(245,190,30,.07),transparent 40%),radial-gradient(ellipse at 2% 95%,rgba(245,190,30,.025),transparent 38%);}
.ct-grid {position:absolute;inset:0;pointer-events:none;opacity:.19;background:linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px);background-size:100px 100px;mask-image:linear-gradient(black,transparent 100%);}
.ct-hero-inner {position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(40px,6vw,94px);align-items:center;}
.ct-eyebrow {display:inline-flex;align-items:center;gap:11px;font-size:10px;letter-spacing:1.55px;font-weight:800;color:var(--ct-gold);text-transform:uppercase;}
.ct-eyebrow::before {content:'';width:25px;height:1px;background:currentColor;}
.ct-eyebrow.dark {color:#967225;}
.ct-hero h1 {max-width:670px;margin:21px 0 20px;font:700 clamp(42px,4.2vw,64px)/1.15 Manrope,Arial,sans-serif;letter-spacing:-.06em;}
.ct-hero-copy {max-width:590px;color:#adb0aa;font-size:15px;line-height:1.9;}
.ct-hero-actions {display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-top:29px;}
.ct-text-link {display:inline-flex;align-items:center;gap:10px;color:#dddcd6;font-size:12px;font-weight:700;border-bottom:1px solid #6c674f;padding:11px 0;transition:color .2s;}
.ct-text-link:hover {color:var(--ct-gold);}
.ct-hero-bottom {margin-top:48px;padding-top:19px;border-top:1px solid #373a39;display:flex;gap:25px;flex-wrap:wrap;align-items:center;color:#92978f;font-size:10px;font-weight:700;letter-spacing:1.3px;}
.ct-hero-bottom span:first-child {color:#ebbd53;}
.ct-console {position:relative;min-height:368px;border:1px solid #41413b;border-radius:10px;padding:25px 27px;background:linear-gradient(135deg,#212324,#161819 62%,#121415);overflow:hidden;box-shadow:0 22px 60px #0007;}
.ct-console-top {display:flex;justify-content:space-between;gap:12px;color:#b8b1a3;font-size:9px;font-weight:700;letter-spacing:1.4px;}
.ct-console-top span:first-child {display:flex;gap:8px;align-items:center;}
.ct-dot {width:6px;height:6px;display:inline-block;flex:none;border-radius:50%;background:var(--ct-gold);box-shadow:0 0 12px #f5be1e77;}
.ct-console-orbits {height:248px;display:grid;place-items:center;position:relative;}
.ct-orbit {position:absolute;border:1px solid #8c744352;border-radius:50%;width:250px;height:250px;}
.ct-orbit:nth-child(2){width:200px;height:200px;border-style:dashed;border-color:#9a854955;animation:ct-rotate 35s linear infinite;}
.ct-orbit:nth-child(3){width:145px;height:145px;border-color:#c49b4455;}
.ct-orbit::before {content:'';position:absolute;top:19%;left:14%;height:4px;width:4px;border-radius:50%;background:var(--ct-gold);}
.ct-core {z-index:2;width:94px;height:94px;display:flex;align-items:center;justify-content:center;color:var(--ct-gold);background:#161819;border:1px solid #b59a5c;border-radius:50%;box-shadow:0 0 40px #f5be1e17;}
.ct-console-micro {position:absolute;bottom:27px;left:27px;right:27px;border-top:1px solid #41433f;padding-top:17px;display:flex;justify-content:space-between;align-items:center;gap:12px;color:#b4b5af;letter-spacing:1.1px;font-size:9px;font-weight:700;}
.ct-main {background:var(--ct-cream);color:#1b1d1d;padding:98px 0 112px;}
.ct-section-heading {display:flex;justify-content:space-between;align-items:end;gap:35px;border-bottom:1px solid #d1cfc8;padding-bottom:26px;margin-bottom:32px;}
.ct-section-heading h2 {margin-top:17px;font:700 clamp(31px,3.3vw,47px)/1.22 Manrope,Arial,sans-serif;letter-spacing:-.055em;}
.ct-section-heading p {font-size:14px;line-height:1.75;color:#636760;max-width:370px;}
.ct-content-grid {display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:24px;align-items:start;}
.ct-left,.ct-right {min-width:0;}
#ubicacion,#formulario {scroll-margin-top:110px;}
.ct-map {border:1px solid #d2d0c9;background:#e4e0d6;border-radius:10px;overflow:hidden;}
.ct-map-viewport {position:relative;height:410px;background:#d9d7cf;}
.ct-map iframe {border:0;width:100%;height:100%;filter:grayscale(.15) contrast(.96);}
.ct-map-overlay {position:absolute;z-index:2;top:17px;left:17px;max-width:min(270px,calc(100% - 34px));padding:15px 17px;background:#f7f6f0f2;border:1px solid #eee9dc;box-shadow:0 8px 28px #2222;border-radius:6px;}
.ct-map-overlay strong {display:block;font-size:12px;font-weight:800;}
.ct-map-overlay span {display:block;margin-top:7px;color:#666962;font-size:12px;line-height:1.6;}
.ct-map-bottom {min-height:58px;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;background:#f9f8f4;border-top:1px solid #d2d0c9;}
.ct-map-bottom span {font-weight:700;font-size:11px;letter-spacing:.4px;color:#595b55;}
.ct-map-bottom a {display:inline-flex;align-items:center;gap:8px;color:#6b5426;font-size:11px;font-weight:800;}
.ct-map-bottom a:hover {color:#171a19;}
.ct-channels {display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:13px;}
.ct-channel {display:flex;align-items:start;gap:13px;padding:19px 18px;background:#fbfaf7;border:1px solid #d7d5ce;border-radius:8px;min-width:0;transition:transform .2s,border-color .2s;}
.ct-channel:hover {border-color:#c09b41;transform:translateY(-2px);}
.ct-channel-icon {color:#9b7829;width:25px;height:25px;flex:none;}
.ct-channel-label {display:block;font-size:10px;font-weight:800;letter-spacing:1px;color:#8a7755;margin-bottom:7px;}
.ct-channel-value {display:block;font-size:12px;font-weight:700;color:#252726;word-break:break-word;}
.ct-form-card {position:relative;overflow:hidden;background:#17191a;border:1px solid #3e4140;border-radius:10px;color:#f1f0e9;padding:clamp(24px,3vw,41px);box-shadow:0 22px 44px #2222;}
.ct-form-card::before {content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ct-gold);}
.ct-form-label {display:flex;align-items:center;gap:9px;color:#e7c168;font-size:10px;letter-spacing:1.4px;font-weight:800;}
.ct-form-card h3 {font:700 clamp(24px,2.4vw,33px)/1.22 Manrope,Arial,sans-serif;letter-spacing:-.04em;margin:15px 0 11px;}
.ct-form-desc {color:#a7aaa6;font-size:13px;line-height:1.75;margin-bottom:28px!important;}
.ct-form-grid {display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.ct-field {display:flex;flex-direction:column;gap:8px;margin-bottom:16px;min-width:0;}
.ct-field label {font-size:10px;color:#deddd9;font-weight:700;letter-spacing:.6px;}
.ct-field input,.ct-field textarea {width:100%;min-width:0;background:#212425;border:1px solid #434644;border-radius:6px;padding:13px 14px;outline:0;color:#fff;font-size:13px;line-height:1.5;transition:border-color .2s,box-shadow .2s;}
.ct-field input::placeholder,.ct-field textarea::placeholder {color:#777c77;}
.ct-field input:focus,.ct-field textarea:focus {border-color:#c59c34;box-shadow:0 0 0 3px #f5be1e1c;}
.ct-field textarea {resize:vertical;min-height:142px;}
.ct-error {display:block;margin-top:1px;color:#ffa7a7;font-size:11px;line-height:1.45;}
.ct-submit {width:100%;min-height:50px;justify-content:space-between;margin-top:3px;}
.ct-submit:disabled {opacity:.62;cursor:not-allowed;transform:none;}
.ct-form-note {display:flex;align-items:start;gap:9px;margin-top:17px!important;color:#959a95;font-size:11px;line-height:1.7;}
.ct-form-note svg {color:#c5aa67;flex:none;margin-top:2px;}
.ct-next {background:#191b1c;padding:82px 0;border-top:1px solid #393a37;}
.ct-next-row {display:flex;align-items:center;justify-content:space-between;gap:28px;}
.ct-next h2 {font:700 clamp(28px,3.1vw,44px)/1.2 Manrope,Arial,sans-serif;letter-spacing:-.05em;margin:18px 0 13px;}
.ct-next p {color:#a9ada7;font-size:14px;line-height:1.8;max-width:600px;}
.ct-next-email {display:inline-flex;gap:12px;align-items:center;color:#f5be1e;border-bottom:1px solid #7e693c;padding-bottom:12px;white-space:nowrap;font-weight:800;font-size:13px;}
.ct-footer {background:#101112;border-top:1px solid #353634;padding:58px 0 26px;}
.ct-footer-grid {display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:34px;padding-bottom:48px;}
.ct-footer-brand p {max-width:275px;margin-top:15px;color:#a0a39e;font-size:12px;line-height:1.85;}
.ct-footer-column h4 {color:#daba5d;font-size:10px;letter-spacing:1.4px;font-weight:800;margin-bottom:17px;}
.ct-footer-column a,.ct-footer-column span {display:block;color:#a1a59e;font-size:12px;line-height:1.8;margin-bottom:8px;}
.ct-footer-column a:hover {color:var(--ct-gold);}
.ct-footer-bottom {display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;border-top:1px solid #353634;padding-top:23px;color:#858983;font-size:11px;}
.ct-footer-bottom a {color:#c9c2ae;}
@keyframes ct-rotate {to{transform:rotate(360deg);}}
@media(max-width:1050px) {.ct-nav {grid-template-columns:170px 1fr auto;gap:12px}.ct-nav-links {gap:15px}.ct-hero-inner {gap:33px}.ct-content-grid {grid-template-columns:1.02fr .98fr;gap:18px}.ct-channels {grid-template-columns:1fr}.ct-footer-grid {gap:22px}}
@media(max-width:900px) {.ct-nav {display:flex;justify-content:space-between}.ct-nav-links {display:none}.ct-menu {display:flex}.ct-hero-inner {grid-template-columns:1fr}.ct-hero {padding:143px 0 76px;min-height:0}.ct-console {max-width:570px;width:100%;margin:0 auto}.ct-content-grid {grid-template-columns:1fr}.ct-channels {grid-template-columns:1fr 1fr}.ct-next-row {align-items:start}.ct-footer-grid {grid-template-columns:repeat(2,1fr)} }
@media(max-width:650px) {.ct-shell {width:calc(100% - 36px)}.ct-nav {top:10px;width:calc(100% - 24px);min-height:67px;padding:6px 11px}.ct-nav-cta {display:none}.ct-brand {width:139px;height:55px}.ct-brand img {width:136px;height:54px;max-width:136px;max-height:54px}.ct-nav-right {gap:9px}.ct-lang {font-size:11px}.ct-menu {height:39px;width:39px}.ct-mobile {top:80px}.ct-hero {padding:130px 0 67px}.ct-hero h1 {font-size:clamp(34px,9vw,48px)}.ct-hero-copy {font-size:14px}.ct-hero-bottom {margin-top:34px}.ct-console {min-height:305px;padding:18px}.ct-console-orbits {height:205px}.ct-orbit {width:197px;height:197px}.ct-orbit:nth-child(2){width:154px;height:154px}.ct-orbit:nth-child(3){width:110px;height:110px}.ct-core {width:77px;height:77px}.ct-console-micro {left:18px;right:18px;bottom:19px;font-size:8px}.ct-main {padding:66px 0 80px}.ct-section-heading {display:block}.ct-section-heading p {margin-top:15px}.ct-map-viewport {height:350px}.ct-channels {grid-template-columns:1fr}.ct-form-card {padding:26px 19px}.ct-form-grid {grid-template-columns:1fr;gap:0}.ct-next {padding:66px 0}.ct-next-row {display:block}.ct-next-email {margin-top:25px}.ct-footer-grid {grid-template-columns:1fr 1fr;gap:30px}.ct-footer-brand {grid-column:1/-1}.ct-footer-bottom {flex-direction:column}}
@media(prefers-reduced-motion:reduce){.ct-orbit:nth-child(2){animation:none}.ct-nav,.ct-channel,.ct-primary,.ct-nav-cta{transition:none}}
`;

const copy = {
  es: {
    badge: '05 / CONTACTO', title: 'Hablemos sobre lo que sigue.',
    lead: 'Las mejores colaboraciones comienzan con una conversación. Cuéntanos qué necesitas y encontremos una forma de conectar talento, operación y tecnología.',
    begin: 'Escríbenos', location: 'Nuestra ubicación', mapTitle: 'Nos encontramos en Ciudad de México.',
    mapDesc: 'Conoce nuestra ubicación y las formas de contactar directamente a Bee Near.',
    office: 'OFICINAS BEE NEAR', directions: 'Ver ruta en Google Maps', phone: 'TELÉFONO', email: 'CORREO',
    formIntro: 'CUÉNTANOS TU PROYECTO', formTitle: 'Empecemos la conversación.',
    formDesc: 'Déjanos tus datos y un breve mensaje. Nuestro equipo podrá dar seguimiento a tu solicitud.',
    name: 'Nombre', emailField: 'Correo electrónico', telephone: 'Teléfono (opcional)', message: 'Mensaje',
    nameHint: 'Tu nombre', mailHint: 'nombre@empresa.com', phoneHint: '+52 55...', messageHint: '¿Cómo podemos ayudarte?',
    sending: 'Enviando mensaje…', submit: 'Enviar mensaje',
    disclaimer: 'Al enviar este formulario autorizas que nuestro equipo te contacte para dar seguimiento a tu solicitud.',
    next: '¿Prefieres escribirnos directamente?', nextTitle: 'También estamos a un correo de distancia.',
    nextDesc: 'Explícanos brevemente tu proyecto; podemos continuar la conversación por correo.',
    explore: 'Explorar', contact: 'CONTACTO', links: 'ENLACES', solutions: 'SOLUCIONES', rights: 'Todos los derechos reservados.',
  },
  en: {
    badge: '05 / CONTACT', title: 'Let’s talk about what comes next.',
    lead: 'The best partnerships begin with a conversation. Tell us what you need and let’s find a better way to connect people, operations and technology.',
    begin: 'Send us a message', location: 'Our location', mapTitle: 'Find us in Mexico City.',
    mapDesc: 'Explore our location and discover how to contact the Bee Near team directly.',
    office: 'BEE NEAR OFFICES', directions: 'Open in Google Maps', phone: 'PHONE', email: 'EMAIL',
    formIntro: 'TELL US ABOUT YOUR PROJECT', formTitle: 'Start the conversation.',
    formDesc: 'Share your details and a short message. Our team can follow up on your request.',
    name: 'Name', emailField: 'Email address', telephone: 'Phone (optional)', message: 'Message',
    nameHint: 'Your name', mailHint: 'name@company.com', phoneHint: '+1 555...', messageHint: 'How can we help?',
    sending: 'Sending message…', submit: 'Send message',
    disclaimer: 'By submitting this form, you authorize our team to contact you about your request.',
    next: 'PREFER EMAIL?', nextTitle: 'We’re just one email away.',
    nextDesc: 'Tell us a little about your project and we can continue the conversation by email.',
    explore: 'Explore', contact: 'CONTACT', links: 'LINKS', solutions: 'SOLUTIONS', rights: 'All rights reserved.',
  },
};

function OfficialLogo() {
  return <span className="ct-brand"><img src="/images/beenear-imagotipo-dark.png" alt="Bee Near" width="160" height="62" /></span>;
}

function Label({ children, dark = false }) {
  return <div className={`ct-eyebrow${dark ? ' dark' : ''}`}>{children}</div>;
}

function Navigation({ t, i18n, spanish }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 35);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { url: '/', name: t('nav_home') },
    { url: '/nosotros', name: t('nav_about') },
    { url: '/servicios', name: t('nav_services') },
    { url: '/blog', name: 'Blog' },
  ];
  const language = () => i18n.changeLanguage(spanish ? 'en' : 'es');
  return <>
    <header className={`ct-nav${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" aria-label="Bee Near — Inicio"><OfficialLogo /></Link>
      <nav className="ct-nav-links" aria-label={spanish ? 'Navegación principal' : 'Main navigation'}>
        {links.map(({ url, name }) => <Link href={url} key={url}>{name}</Link>)}
      </nav>
      <div className="ct-nav-right">
        <button className="ct-lang" type="button" onClick={language} aria-label={spanish ? 'Switch to English' : 'Cambiar a español'}><Globe2 size={15} /> {spanish ? 'EN' : 'ES'}</button>
        <a href="#formulario" className="ct-nav-cta">{t('nav_contact')}<ArrowUpRight size={16} /></a>
        <button className="ct-menu" type="button" aria-expanded={menu} aria-label={menu ? (spanish ? 'Cerrar menú' : 'Close menu') : (spanish ? 'Abrir menú' : 'Open menu')} onClick={() => setMenu(v => !v)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
    {menu && <nav className="ct-mobile" aria-label={spanish ? 'Menú móvil' : 'Mobile menu'}>
      {links.map(({ url, name }) => <Link key={url} href={url} onClick={() => setMenu(false)}>{name}<ArrowUpRight size={15} /></Link>)}
      <a href="#formulario" onClick={() => setMenu(false)}>{t('nav_contact')}<ArrowUpRight size={15} /></a>
    </nav>}
  </>;
}

export default function Contact() {
  const { t, i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'es').toLowerCase().startsWith('es');
  const w = spanish ? copy.es : copy.en;
  const { data, setData, post, processing, reset, errors } = useForm({ name: '', email: '', phone: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    post('/contacto', {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        window.alert(spanish ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!');
      },
    });
  };

  return <>
    <Head title={`${spanish ? 'Contacto' : 'Contact'} | Bee Near`}>
      <meta name="description" content={w.lead} />
    </Head>
    <div className="bn-contact">
      <style>{CSS}</style>
      <Navigation t={t} i18n={i18n} spanish={spanish} />
      <header className="ct-hero">
        <div className="ct-grid" aria-hidden="true" />
        <div className="ct-shell ct-hero-inner">
          <div>
            <Label>{w.badge}</Label>
            <h1>{t('contact_hero_title')}</h1>
            <p className="ct-hero-copy">{t('contact_hero_desc')}</p>
            <div className="ct-hero-actions">
              <a className="ct-primary" href="#formulario">{w.begin}<ArrowDownRight size={17} /></a>
              <a className="ct-text-link" href="#ubicacion">{w.location}<ArrowUpRight size={16}/></a>
            </div>
            <div className="ct-hero-bottom"><span>HUMAN × INTELLIGENCE</span><span>CDMX / BEE NEAR</span></div>
          </div>
          <div className="ct-console" aria-label={spanish ? 'Representación de conexiones y comunicación' : 'Illustration of connectivity and communication'} role="img">
            <div className="ct-console-top"><span><i className="ct-dot" />BEE NEAR / CONNECT</span><span>BN — 05</span></div>
            <div className="ct-console-orbits" aria-hidden="true">
              <div className="ct-orbit"/><div className="ct-orbit"/><div className="ct-orbit"/>
              <span className="ct-core"><Send size={38} strokeWidth={1.2}/></span>
            </div>
            <div className="ct-console-micro"><span>{spanish ? 'UNA CONVERSACIÓN A LA VEZ' : 'ONE CONVERSATION AT A TIME'}</span><span>CONNECTION / HUMAN</span></div>
          </div>
        </div>
      </header>

      <main className="ct-main" id="ubicacion">
        <div className="ct-shell">
          <div className="ct-section-heading">
            <div><Label dark>{spanish ? '01 / CONTACTA CON NOSOTROS' : '01 / GET IN TOUCH'}</Label><h2>{w.mapTitle}</h2></div>
            <p>{w.mapDesc}</p>
          </div>
          <div className="ct-content-grid">
            <div className="ct-left">
              <div className="ct-map">
                <div className="ct-map-viewport">
                  <iframe src={MAP_EMBED} title={spanish ? 'Ubicación de Bee Near en Ciudad de México' : 'Bee Near office location in Mexico City'} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
                  <div className="ct-map-overlay"><strong><MapPin size={15} style={{color:'#ae832d',display:'inline-block',verticalAlign:'middle',marginRight:6}}/>{w.office}</strong><span>Ejército Nacional 373<br/>Despachos 401–402<br/>Granada, Miguel Hidalgo, CDMX</span></div>
                </div>
                <div className="ct-map-bottom"><span>CIUDAD DE MÉXICO / MÉXICO</span><a href={MAP_URL} target="_blank" rel="noopener noreferrer">{w.directions}<ExternalLink size={14}/></a></div>
              </div>
              <div className="ct-channels">
                <a className="ct-channel" href="tel:+12153180179"><Phone className="ct-channel-icon" size={22}/><span><b className="ct-channel-label">{w.phone}</b><b className="ct-channel-value">+1 (215) 318-0179</b></span></a>
                <a className="ct-channel" href="mailto:moreinfo@beenear.mx"><Mail className="ct-channel-icon" size={22}/><span><b className="ct-channel-label">{w.email}</b><b className="ct-channel-value">moreinfo@beenear.mx</b></span></a>
              </div>
            </div>
            <section className="ct-right" id="formulario" aria-label={w.formTitle}>
              <div className="ct-form-card">
                <div className="ct-form-label"><span className="ct-dot"/>{w.formIntro}</div>
                <h3>{t('contact_info_title')}</h3>
                <p className="ct-form-desc">{w.formDesc}</p>
                <form onSubmit={submit}>
                  <div className="ct-field"><label htmlFor="ct-name">{w.name} *</label><input id="ct-name" name="name" autoComplete="name" type="text" required value={data.name} onChange={(e)=>setData('name',e.target.value)} placeholder={w.nameHint} aria-invalid={Boolean(errors.name)} />{errors.name && <small className="ct-error">{errors.name}</small>}</div>
                  <div className="ct-form-grid">
                    <div className="ct-field"><label htmlFor="ct-email">{w.emailField} *</label><input id="ct-email" name="email" autoComplete="email" type="email" required value={data.email} onChange={(e)=>setData('email',e.target.value)} placeholder={w.mailHint} aria-invalid={Boolean(errors.email)} />{errors.email && <small className="ct-error">{errors.email}</small>}</div>
                    <div className="ct-field"><label htmlFor="ct-phone">{w.telephone}</label><input id="ct-phone" name="phone" autoComplete="tel" type="tel" value={data.phone} onChange={(e)=>setData('phone',e.target.value)} placeholder={w.phoneHint} aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="ct-error">{errors.phone}</small>}</div>
                  </div>
                  <div className="ct-field"><label htmlFor="ct-message">{w.message} *</label><textarea id="ct-message" name="message" rows={6} required value={data.message} onChange={(e)=>setData('message',e.target.value)} placeholder={w.messageHint} aria-invalid={Boolean(errors.message)} />{errors.message && <small className="ct-error">{errors.message}</small>}</div>
                  <button className="ct-primary ct-submit" type="submit" disabled={processing}><span>{processing ? w.sending : w.submit}</span>{processing ? <span aria-hidden="true">···</span> : <ArrowRight size={18} />}</button>
                  <p className="ct-form-note"><ShieldCheck size={16}/>{w.disclaimer}</p>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>

      <section className="ct-next"><div className="ct-shell ct-next-row"><div><Label>{w.next}</Label><h2>{w.nextTitle}</h2><p>{w.nextDesc}</p></div><a href="mailto:moreinfo@beenear.mx" className="ct-next-email">moreinfo@beenear.mx<ArrowUpRight size={18}/></a></div></section>
      <footer className="ct-footer"><div className="ct-shell"><div className="ct-footer-grid">
        <div className="ct-footer-brand"><Link href="/"><OfficialLogo/></Link><p>{t('footer_desc')}</p></div>
        <div className="ct-footer-column"><h4>{w.links}</h4><Link href="/">{t('nav_home')}</Link><Link href="/nosotros">{t('nav_about')}</Link><Link href="/servicios">{t('nav_services')}</Link></div>
        <div className="ct-footer-column"><h4>{w.solutions}</h4><Link href="/servicios/contact-center">Contact Center</Link><Link href="/servicios/intake-sales">Intake Sales</Link><Link href="/blog">Blog</Link></div>
        <div className="ct-footer-column"><h4>{w.contact}</h4><a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a><a href="tel:+12153180179">+1 (215) 318-0179</a><span>Ejército Nacional 373, CDMX</span></div>
      </div><div className="ct-footer-bottom"><span>© {new Date().getFullYear()} Bee Near. {w.rights}</span><a href="/docs/privacy_policy_for_website.pdf" target="_blank" rel="noopener noreferrer">{t('footer_privacy')}</a></div></div></footer>
    </div>
  </>;
}
