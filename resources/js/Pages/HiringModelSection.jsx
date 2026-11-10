import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Globe2, Menu, X, ArrowUpRight } from 'lucide-react';

/**
 * Bee Near — Página Completa de Modelo Comercial (Unificada)
 * Ruta en Laravel: /modelo-comercial
 */

function Nav({ spanish, i18n, t }) {
  const [menu, setMenu] = useState(false);

  const links = [
    { href: '/#solutions', label: spanish ? 'Soluciones' : 'Solutions' },
    { href: '/#how-it-works', label: spanish ? 'El modelo' : 'The model' },
    { href: '/nosotros', label: t('nav_about') || (spanish ? 'Nosotros' : 'About us') },
    { href: '/servicios', label: t('nav_services') || (spanish ? 'Servicios' : 'Services') },
    { href: '/blog', label: 'Blog' },
    { href: '/modelo-comercial', label: spanish ? 'Modelo Comercial' : 'Commercial Model', isCurrent: true },
    { href: '/calculadora', label: spanish ? 'Calculadora de personal' : 'Staffing Calculator' },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-6xl min-h-[75px] px-6 py-2 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#111314]/90 backdrop-blur-md shadow-2xl">
        <Link href="/" className="flex items-center">
          <img src="/images/beenear-imagotipo-dark.png" alt="Bee Near" className="h-14 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold transition-colors relative ${
                link.isCurrent ? 'text-white' : 'text-[#aeb1ab] hover:text-white'
              }`}
            >
              {link.label}
              {link.isCurrent && (
                <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-[#f5be1e]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => i18n.changeLanguage(spanish ? 'en' : 'es')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#e9e9e4] bg-transparent cursor-pointer"
          >
            <Globe2 size={15} />
            {spanish ? 'EN' : 'ES'}
          </button>

          <Link
            href="/contacto"
            className="hidden sm:inline-flex items-center justify-center gap-2 text-xs font-extrabold px-4 py-2.5 rounded-md bg-[#f5be1e] text-[#141414] hover:bg-[#ffd356] transition-all"
          >
            {spanish ? 'Hablemos' : 'Let’s talk'}
            <ArrowUpRight size={15} />
          </Link>

          <button
            type="button"
            onClick={() => setMenu(!menu)}
            className="md:hidden flex items-center justify-center w-10 h-10 bg-[#232526] border border-[#484b49] rounded-lg text-white"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menu && (
        <nav className="fixed top-24 left-4 right-4 z-40 p-3 bg-[#1a1c1d] border border-[#3b3d3c] rounded-xl shadow-2xl flex flex-col gap-1 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenu(false)}
              className="flex items-center justify-between p-3 text-xs font-semibold text-[#e7e7e1] border-b border-[#383a39] last:border-0"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setMenu(false)}
            className="flex items-center justify-between p-3 text-xs font-bold text-[#f5be1e]"
          >
            {spanish ? 'Hablemos' : 'Let’s talk'}
            <ArrowUpRight size={14} />
          </Link>
        </nav>
      )}
    </>
  );
}

function Footer({ spanish, t }) {
  return (
    <footer className="bg-[#101112] border-t border-white/10 pt-16 pb-8 text-[#9fa49c] font-sans">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
        <div>
          <Link href="/" className="inline-block mb-4">
            <img src="/images/beenear-imagotipo-dark.png" alt="Bee Near" className="h-10 w-auto" />
          </Link>
          <p className="text-xs leading-relaxed text-[#9fa49c]">
            {t('footer_desc') || (spanish ? 'Interacciones con IA. Resultados centrados en las personas.' : 'AI interactions. People-centered results.')}
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold tracking-[1.4px] text-[#e8bc47] mb-4 uppercase">
            {spanish ? 'Soluciones' : 'Solutions'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/servicios/contact-center" className="hover:text-[#f5be1e]">Contact Center</Link></li>
            <li><Link href="/servicios/intake-sales" className="hover:text-[#f5be1e]">Intake Sales</Link></li>
            <li><Link href="/calculadora" className="hover:text-[#f5be1e]">{spanish ? 'Calculadora de personal' : 'Staffing Calculator'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold tracking-[1.4px] text-[#e8bc47] mb-4 uppercase">
            {spanish ? 'Empresa' : 'Company'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/nosotros" className="hover:text-[#f5be1e]">{spanish ? 'Nosotros' : 'About'}</Link></li>
            <li><Link href="/blog" className="hover:text-[#f5be1e]">Blog</Link></li>
            <li><Link href="/modelo-comercial" className="hover:text-[#f5be1e] text-white font-bold">{spanish ? 'Modelo Comercial' : 'Commercial Model'}</Link></li>
            <li><Link href="/contacto" className="hover:text-[#f5be1e]">{spanish ? 'Contacto' : 'Contact'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold tracking-[1.4px] text-[#e8bc47] mb-4 uppercase">
            {spanish ? 'Contacto' : 'Get in touch'}
          </h4>
          <div className="space-y-2 text-xs">
            <p><a href="mailto:moreinfo@beenear.mx" className="hover:text-[#f5be1e]">moreinfo@beenear.mx</a></p>
            <p><a href="tel:+12153180179" className="hover:text-[#f5be1e]">+1 (215) 318-0179</a></p>
            <p>Ejército Nacional 373, CDMX</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#7f8680] gap-4">
        <span>© {new Date().getFullYear()} Bee Near. {spanish ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
        <span className="font-bold tracking-widest text-xs">HUMAN × INTELLIGENCE</span>
      </div>
    </footer>
  );
}

export default function CommercialModel() {
  const { t, i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'es').toLowerCase().startsWith('es');

  const steps = [
    {
      number: '01',
      title: spanish ? '1. Integración & Acceso VPN' : '1. Integration & VPN Access',
      description: spanish 
        ? 'Configuramos COMI Center, establecemos la seguridad por VPN y enlazamos las herramientas a tu medida.' 
        : 'We configure COMI Center, establish VPN security, and link the tools tailored to your needs.',
    },
    {
      number: '02',
      title: spanish ? '2. Piloto "Paga y Opera"' : '2. "Pay & Operate" Pilot',
      description: spanish 
        ? 'Disfruta de 3 meses operando con total libertad, respaldado por IA de primer contacto y talento humano certificado.' 
        : 'Enjoy 3 months of operating with total freedom, backed by first-contact AI and certified human talent.',
    },
    {
      number: '03',
      title: spanish ? '3. Evolución a la Medida' : '3. Custom Evolution',
      description: spanish 
        ? 'Al concluir el trimestre, evaluamos métricas en conjunto y definimos el esquema definitivo de crecimiento a largo plazo.' 
        : 'At the end of the quarter, we evaluate metrics together and define the final long-term growth scheme.',
    }
  ];

  return (
    <>
      <Head title={spanish ? "Modelo Comercial | Bee Near" : "Commercial Model | Bee Near"} />
      <div className="bg-[#111314] min-h-screen flex flex-col font-sans">
        
        {/* Navegación flotante */}
        <Nav spanish={spanish} i18n={i18n} t={t} />

        {/* Contenido principal del Modelo Comercial */}
        <main className="flex-grow pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold text-[#f5be1e] uppercase tracking-[2px]">
                {spanish ? 'MODELO COMERCIAL TRANSPARENTE' : 'TRANSPARENT COMMERCIAL MODEL'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#f4f1e9] mt-3 mb-5 font-['Manrope',Arial,sans-serif] tracking-tight">
                {spanish ? 'Sin Plazos Forzosos. Paga, Opera y Valida.' : 'No Mandatory Terms. Pay, Operate & Validate.'}
              </h2>
              <p className="text-sm md:text-base text-[#939591] leading-relaxed">
                {spanish ? 'Olvídate de los contratos de BPO tradicionales que te atan por años. Durante nuestra' : 'Forget traditional BPO contracts that tie you down for years. During our'}
                {' '}
                <strong className="text-white">
                  {spanish ? 'prueba piloto de 3 meses' : '3-month pilot test'}
                </strong>
                {spanish ? ', el esquema es directo: paga tu mensualidad y pon a operar tu infraestructura con total libertad.' : ', the scheme is direct: pay your monthly fee and get your infrastructure running with total freedom.'}
              </p>
            </div>

            {/* Main Highlight Banner */}
            <div className="bg-gradient-to-br from-[#1b1d1e] to-[#141617] border border-white/10 rounded-xl p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="flex-1">
                <span className="text-[9px] font-bold text-[#f5be1e] uppercase tracking-[1.6px]">
                  {spanish ? 'Filosofía de Crecimiento' : 'Growth Philosophy'}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#f4f1e9] mt-2 mb-3 font-['Manrope',Arial,sans-serif]">
                  {spanish ? 'Compromiso mutuo y renegociable' : 'Mutual and renegotiable commitment'}
                </h3>
                <p className="text-sm text-[#939591] leading-relaxed">
                  {spanish 
                    ? 'Construimos una relación basada en resultados tangibles. En esta fase inicial de 3 meses no existen ataduras complejas, sino un compromiso ágil que evoluciona de manera natural hacia un esquema definitivo según el éxito de la operación.'
                    : 'We build relationships based on tangible results. In this initial 3-month phase, there are no complex ties, just an agile commitment that naturally evolves into a definitive scheme based on operational success.'}
                </p>
              </div>

              <div className="bg-[#f5be1e]/10 border border-[#f5be1e]/30 rounded-lg px-8 py-6 text-center min-w-[220px]">
                <span className="block text-3xl md:text-4xl font-extrabold text-[#f5be1e] font-['Manrope',Arial,sans-serif]">
                  {spanish ? '3 Meses' : '3 Months'}
                </span>
                <span className="text-[9px] text-[#d2ac49] font-bold uppercase tracking-[1.2px] mt-1 block">
                  {spanish ? 'Piloto Sin Ataduras' : 'No-Strings Pilot'}
                </span>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-[#151719] border border-white/10 rounded-xl p-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                  <span 
                    className="text-5xl font-extrabold absolute top-4 right-6 opacity-10 pointer-events-none select-none text-[#f5be1e] font-['Manrope',Arial,sans-serif]"
                  >
                    {step.number}
                  </span>
                  <h4 className="text-lg font-bold text-[#f4f1e9] mb-3 relative z-10 font-['Manrope',Arial,sans-serif]">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#939591] leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* Footer */}
        <Footer spanish={spanish} t={t} />

      </div>
    </>
  );
}