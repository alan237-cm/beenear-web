import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';

export default function IntakeSales() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Head title={`Intake Sales | Bee Near`} />

            <div className="min-h-screen bg-corp-light font-sans flex flex-col relative">

                {/* Navbar Flotante Estandarizada */}
                <div className="fixed top-4 inset-x-0 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full">
                    <nav className="bg-white text-bee-dark px-6 md:px-8 h-[84px] flex justify-between items-center shadow-xl rounded-2xl relative">

                        {/* Logo Imagotipo */}
                        <Link href="/" className="flex items-center cursor-pointer">
                            <img
                                src="/images/imagotipo.jpeg"
                                alt="Bee Near Logo"
                                className="h-14 md:h-16 w-auto object-contain transform hover:scale-105 transition duration-300"
                            />
                        </Link>

                        {/* Botón Hamburguesa (Solo Móvil) */}
                        <button
                            className="md:hidden text-bee-dark p-2 focus:outline-none hover:text-bee-yellow transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        {/* Menú de navegación Desktop */}
                        <div className="hidden md:flex items-center gap-7 font-medium text-sm">
                            {/* Inicio */}
                            <Link href="/" className="text-gray-600 hover:text-bee-dark transition duration-300">
                                {t('nav_home')}
                            </Link>

                            {/* Nosotros */}
                            <Link href="/nosotros" className="text-gray-600 hover:text-bee-dark transition duration-300">
                                {t('nav_about')}
                            </Link>

                            {/* Servicios (ACTIVO por ser sub-página) */}
                            <Link href="/servicios" className="relative text-bee-dark hover:text-bee-yellow transition duration-300">
                                {t('nav_services')}
                                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-bee-yellow rounded-full" />
                            </Link>

                            {/* Blog */}
                            <Link href="/blog"
                                className="text-gray-600 hover:text-bee-dark transition duration-300">
                                Blog
                            </Link>

                            {/* Separador vertical elegante */}
                            <div className="h-7 w-px bg-gray-200" />

                            {/* Idioma */}
                            <button onClick={toggleLanguage} className="font-bold text-sm text-bee-dark hover:text-bee-yellow transition duration-300">
                                {i18n.language === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
                            </button>

                            {/* Contacto */}
                            <Link href="/contacto" className="group flex items-center gap-2 bg-bee-yellow text-bee-dark px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition duration-300 shadow-sm">
                                {t('nav_contact')}
                                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </nav>

                    {/* Menú desplegable Móvil */}
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-[100px] left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-gray-100">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-bee-yellow font-medium pb-3 border-b border-gray-100">
                                {t('nav_home')}
                            </Link>
                            <Link href="/nosotros" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-bee-yellow font-medium pb-3 border-b border-gray-100">
                                {t('nav_about')}
                            </Link>
                            <Link href="/servicios" onClick={() => setIsMenuOpen(false)} className="text-bee-yellow font-bold pb-3 border-b border-gray-100">
                                {t('nav_services')}
                            </Link>
                            {/* Blog */}
                            <Link
                                href="/blog"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 hover:text-bee-yellow font-medium pb-3 border-b border-gray-100"
                            >
                            </Link>
                            <div className="flex justify-between items-center mt-2">
                                <button onClick={toggleLanguage} className="font-bold text-sm text-bee-dark hover:text-bee-yellow transition duration-300">
                                    {i18n.language === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
                                </button>
                                <Link href="/contacto" onClick={() => setIsMenuOpen(false)} className="bg-bee-yellow text-bee-dark px-6 py-2.5 rounded-xl font-bold text-sm text-center hover:bg-yellow-400 transition duration-300">
                                    {t('nav_contact')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Hero Banner del Servicio - Ajustado con pt-36 */}
                <header className="bg-bee-dark text-white pt-36 pb-16 px-8 text-center relative border-b-4 border-bee-yellow">
                    <div className="max-w-6xl mx-auto relative">

                        {/* Botón para regresar a Servicios */}
                        <div className="absolute top-0 left-0">
                            <Link
                                href="/servicios"
                                className="group flex items-center gap-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-gray-200 hover:text-bee-yellow px-4 py-2 rounded-xl backdrop-blur-sm transition duration-300 border border-white/5"
                            >
                                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                                {i18n.language === 'es' ? 'Volver a Servicios' : 'Back to Services'}
                            </Link>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 mt-16 md:mt-4">
                            Intake Sales <span className="text-bee-yellow">Portfolio</span>
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto text-gray-300 font-sans">
                            {t('is_hero_desc')}
                        </p>
                    </div>
                </header>

                {/* Sección 1: Introducción y Timeline */}
                <section className="py-16 px-8 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-bee-dark mb-6">{t('is_what_title')}</h2>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            {t('is_what_desc')}
                        </p>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-bee-yellow mb-8">
                            <p className="text-gray-800 font-medium italic">
                                {t('is_quote')}
                            </p>
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-bee-dark mb-4">{t('is_lead_gen_title')}</h3>
                        <p className="text-gray-700 mb-2 font-medium">
                            {t('is_lead_gen_desc')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-heading font-bold text-bee-dark mb-8 text-center">{t('is_process_title')}</h3>
                        <div className="relative border-l-4 border-bee-dark/20 ml-4 space-y-6">
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-yellow h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_1_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_1_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-dark h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_2_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_2_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-yellow h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_3_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_3_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-dark h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_4_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_4_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-yellow h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_5_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_5_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-green-500 h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_6_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_6_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 2: How is Massive Prospecting Managed? */}
                <section className="bg-bee-dark py-16 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 text-center">{t('is_massive_title')}</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-bee-yellow hover:-translate-y-2 transition transform duration-300">
                                <div className="text-4xl mb-4">🤖</div>
                                <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('is_mass_1_title')}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{t('is_mass_1_desc')}</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-bee-yellow hover:-translate-y-2 transition transform duration-300">
                                <div className="text-4xl mb-4">✉️</div>
                                <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('is_mass_2_title')}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{t('is_mass_2_desc')}</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-bee-yellow hover:-translate-y-2 transition transform duration-300">
                                <div className="text-4xl mb-4">📞</div>
                                <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('is_mass_3_title')}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{t('is_mass_3_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 3: Charging Structure & Values */}
                <section className="py-20 px-8 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-bee-dark mb-10">{t('is_charge_title')}</h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="bg-bee-yellow text-bee-dark w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-xl shadow-md">1</div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-bold text-bee-dark mb-2">{t('is_charge_1_title')}</h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">{t('is_charge_1_desc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="bg-bee-dark text-white w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-xl shadow-md">2</div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-bold text-bee-dark mb-2">{t('is_charge_2_title')}</h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">{t('is_charge_2_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4">
                        <div className="bg-bee-yellow p-8 rounded-3xl flex items-center justify-center text-center text-bee-dark font-heading font-bold text-lg shadow-lg aspect-square hover:scale-105 transition transform duration-300">
                            Bee <br /> Efective
                        </div>
                        <div className="bg-white border-2 border-bee-dark p-8 rounded-3xl flex items-center justify-center text-center text-bee-dark font-heading font-bold text-lg shadow-sm aspect-square translate-y-8 hover:scale-105 transition transform duration-300">
                            Bee <br /> Competitive
                        </div>
                        <div className="bg-bee-dark text-white p-8 rounded-3xl flex items-center justify-center text-center font-heading font-bold text-lg shadow-lg aspect-square hover:scale-105 transition transform duration-300">
                            Bee <br /> Productive
                        </div>
                        <div className="bg-bee-yellow p-8 rounded-3xl flex items-center justify-center text-center text-bee-dark font-heading font-bold text-xl shadow-lg aspect-square translate-y-8 hover:scale-105 transition transform duration-300">
                            Bee what <br /> you've <br /> always wanted
                        </div>
                    </div>
                </section>

                {/* =====================================================
                FOOTER CORPORATIVO UNIFICADO
                ====================================================== */}
                <footer className="bg-bee-dark text-white pt-16 pb-8 px-6 md:px-8 border-t-4 border-bee-yellow mt-auto">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12">

                        {/* Columna 1: Marca */}
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <img
                                    src="/images/logo.png"
                                    alt="Bee Near Logo"
                                    className="h-10 w-10"
                                />
                                <div className="text-2xl font-heading font-bold tracking-wider">
                                    <span className="text-white">Bee</span>
                                    <span className="text-bee-yellow">Near</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                {t('footer_desc')}
                            </p>
                        </div>

                        {/* Columna 2: Enlaces Rápidos */}
                        <div>
                            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-bee-yellow">
                                {t('footer_links')}
                            </h4>
                            <ul className="space-y-4 text-sm text-gray-400 font-medium">
                                <li>
                                    <Link href="/" className="hover:text-bee-yellow transition">
                                        {t('nav_home')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/nosotros" className="hover:text-bee-yellow transition">
                                        {t('nav_about')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/servicios" className="hover:text-bee-yellow transition">
                                        {t('nav_services')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contacto" className="hover:text-bee-yellow transition">
                                        {t('nav_contact')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Columna 3: Contacto */}
                        <div>
                            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-bee-yellow">
                                {t('footer_contact')}
                            </h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-bee-yellow flex-shrink-0" />
                                    <span>moreinfo@beenear.mx</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-bee-yellow flex-shrink-0" />
                                    <span>+1 (215) 318-0179</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-bee-yellow flex-shrink-0 mt-1" />
                                    <span>Ejército Nacional 373, CDMX</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright y Políticas */}
                    <div className="max-w-7xl mx-auto border-t border-gray-700/70 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                        <p>
                            &copy; {new Date().getFullYear()} Bee Near. {t('footer_rights')}
                        </p>

                        {/* Enlace Funcional al PDF de Privacidad */}
                        <a
                            href="/docs/privacy_policy_for_website.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bee-yellow transition font-medium"
                        >
                            {t('footer_privacy')}
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}