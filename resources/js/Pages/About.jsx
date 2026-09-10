import { Head, Link } from '@inertiajs/react';

import { useTranslation } from 'react-i18next';

import {
    ArrowRight,
    Target,
    Rocket,
    Puzzle,
    ShieldCheck,
    Scale,
    CheckCircle,
    Users,
    Layers,
    MessageSquare,
    MapPin,
    Phone,
    Mail,
} from 'lucide-react';

export default function About() {

    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Head title={`${t('nav_about')} | Bee Near`} />

            <div className="min-h-screen bg-corp-light font-sans text-bee-dark">

                {/* =====================================================
                    NAVBAR
                ====================================================== */}
                <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 pt-5">

                    <div className="max-w-7xl mx-auto">

                        <div className="h-[68px] bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-white/70 px-5 md:px-7 flex justify-between items-center">

                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center gap-3 group"
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="Bee Near Logo"
                                    className="h-10 w-10 md:h-11 md:w-11 transition duration-300 group-hover:scale-105"
                                />

                                <div className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                                    <span className="text-bee-dark">Bee</span>
                                    <span className="text-bee-yellow">Near</span>
                                </div>
                            </Link>


                            {/* Menú */}
                            <div className="hidden md:flex items-center gap-7 font-medium text-sm">

                                {/* Inicio */}
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-bee-dark transition duration-300"
                                >
                                    {t('nav_home')}
                                </Link>


                                {/* Nosotros */}
                                <Link
                                    href="/nosotros"
                                    className="relative text-bee-dark hover:text-bee-yellow transition duration-300"
                                >
                                    {t('nav_about')}

                                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-bee-yellow rounded-full" />
                                </Link>


                                {/* Servicios */}
                                <Link
                                    href="/servicios"
                                    className="text-gray-600 hover:text-bee-dark transition duration-300"
                                >
                                    {t('nav_services')}
                                </Link>


                                {/* Separador */}
                                <div className="h-7 w-px bg-gray-200" />


                                {/* Idioma */}
                                <button
                                    onClick={toggleLanguage}
                                    className="font-bold text-sm text-bee-dark hover:text-bee-yellow transition duration-300"
                                >
                                    {i18n.language === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
                                </button>


                                {/* Contacto */}
                                <Link
                                    href="/contacto"
                                    className="group flex items-center gap-2 bg-bee-yellow text-bee-dark px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition duration-300 shadow-sm"
                                >
                                    {t('nav_contact')}

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>

                            </div>

                        </div>

                    </div>

                </nav>


                {/* =====================================================
                    HERO
                ====================================================== */}
                <header className="relative overflow-hidden bg-bee-dark text-white min-h-[560px] md:min-h-[600px] flex items-center">

                    {/* Decoración amarilla */}
                    <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[70px] border-bee-yellow/10" />

                    <div className="absolute -left-40 -bottom-40 w-[500px] h-[500px] rounded-full border-[80px] border-white/5" />


                    {/* Pequeño detalle */}
                    <div className="absolute top-1/2 right-0 w-32 h-px bg-bee-yellow/40 hidden lg:block" />


                    {/* Contenido */}
                    <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-20">

                        <div className="max-w-4xl">

                            {/* Eyebrow */}
                            <div className="flex items-center gap-3 mb-6">

                                <span className="h-px w-10 bg-bee-yellow" />

                                <span className="text-bee-yellow text-sm md:text-base font-bold tracking-[0.25em] uppercase">
                                    Bee Near
                                </span>

                            </div>


                            {/* Título */}
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold leading-[0.95] tracking-tight mb-7">

                                {t('about_hero_title')}

                            </h1>


                            {/* Descripción */}
                            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl">
                                {t('about_hero_desc')}
                            </p>

                        </div>

                    </div>


                    {/* Indicador inferior */}
                    <div className="absolute bottom-8 left-0 right-0 z-10">

                        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                            <span className="text-white/40 text-xs tracking-[0.25em] uppercase">
                                Who we are
                            </span>


                            <div className="flex items-center gap-2">

                                <span className="h-1.5 w-8 rounded-full bg-bee-yellow" />

                                <span className="h-1.5 w-2 rounded-full bg-white/30" />

                            </div>

                        </div>

                    </div>

                </header>


                {/* =====================================================
                    MISIÓN Y VISIÓN
                ====================================================== */}
                <main className="bg-white">

                    <section className="py-24 px-6">

                        <div className="max-w-7xl mx-auto">

                            {/* Encabezado de sección */}
                            <div className="max-w-3xl mb-14">

                                <div className="flex items-center gap-3 mb-5">

                                    <span className="h-1 w-8 bg-bee-yellow rounded-full" />

                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                                        Our direction
                                    </span>

                                </div>

                                <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight">
                                    Una visión clara para
                                    <span className="text-bee-yellow">
                                        {' '}transformar.
                                    </span>
                                </h2>

                            </div>


                            {/* Tarjetas */}
                            <div className="grid md:grid-cols-2 gap-6">


                                {/* MISIÓN */}
                                <div className="group relative overflow-hidden bg-corp-light rounded-3xl p-8 md:p-10 border border-gray-100 hover:border-bee-yellow/40 transition duration-300">

                                    {/* Número */}
                                    <div className="absolute top-7 right-8 text-7xl font-heading font-extrabold text-gray-200/70 select-none">
                                        01
                                    </div>


                                    {/* Icono */}
                                    <div className="relative w-14 h-14 rounded-2xl bg-bee-yellow flex items-center justify-center mb-8">

                                        <Target
                                            size={28}
                                            strokeWidth={1.8}
                                            className="text-bee-dark"
                                        />

                                    </div>


                                    <h2 className="relative text-3xl font-heading font-bold text-bee-dark mb-5">
                                        {t('about_mission_title')}
                                    </h2>


                                    <p className="relative text-gray-600 text-lg leading-relaxed max-w-xl">
                                        {t('about_mission_desc')}
                                    </p>


                                    {/* Línea inferior */}
                                    <div className="mt-8 h-1 w-12 bg-bee-yellow rounded-full group-hover:w-20 transition-all duration-300" />

                                </div>


                                {/* VISIÓN */}
                                <div className="group relative overflow-hidden bg-bee-dark text-white rounded-3xl p-8 md:p-10 shadow-xl">

                                    {/* Número */}
                                    <div className="absolute top-7 right-8 text-7xl font-heading font-extrabold text-white/5 select-none">
                                        02
                                    </div>


                                    {/* Icono */}
                                    <div className="relative w-14 h-14 rounded-2xl bg-bee-yellow flex items-center justify-center mb-8">

                                        <Rocket
                                            size={28}
                                            strokeWidth={1.8}
                                            className="text-bee-dark"
                                        />

                                    </div>


                                    <h2 className="relative text-3xl font-heading font-bold mb-5">
                                        {t('about_vision_title')}
                                    </h2>


                                    <p className="relative text-gray-300 text-lg leading-relaxed max-w-xl">
                                        {t('about_vision_desc')}
                                    </p>


                                    {/* Línea inferior */}
                                    <div className="mt-8 h-1 w-12 bg-bee-yellow rounded-full group-hover:w-20 transition-all duration-300" />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        VALORES
                    ================================================== */}
                    <section className="bg-corp-light py-24 px-6">

                        <div className="max-w-7xl mx-auto">

                            {/* Encabezado */}
                            <div className="text-center max-w-3xl mx-auto mb-14">

                                <div className="flex items-center justify-center gap-3 mb-5">

                                    <span className="h-px w-8 bg-bee-yellow" />

                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                                        Bee Near
                                    </span>

                                    <span className="h-px w-8 bg-bee-yellow" />

                                </div>


                                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-bee-dark mb-5">
                                    {t('about_values_title')}
                                </h2>


                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Los principios que guían nuestra forma de trabajar,
                                    colaborar y generar valor.
                                </p>

                            </div>


                            {/* Valores */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                {[

                                    {
                                        id: 'val_1',
                                        icon: <Puzzle size={24} />,
                                    },

                                    {
                                        id: 'val_2',
                                        icon: <ShieldCheck size={24} />,
                                    },

                                    {
                                        id: 'val_3',
                                        icon: <Scale size={24} />,
                                    },

                                    {
                                        id: 'val_4',
                                        icon: <CheckCircle size={24} />,
                                    },

                                    {
                                        id: 'val_5',
                                        icon: <Users size={24} />,
                                    },

                                    {
                                        id: 'val_6',
                                        icon: <Layers size={24} />,
                                    },

                                    {
                                        id: 'val_7',
                                        icon: <MessageSquare size={24} />,
                                    },

                                ].map((valor, index) => (

                                    <div
                                        key={index}
                                        className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-bee-yellow/50 hover:-translate-y-1 transition duration-300"
                                    >

                                        <div className="w-11 h-11 rounded-xl bg-bee-yellow/10 flex items-center justify-center mb-5">

                                            <div className="text-bee-yellow group-hover:scale-110 transition duration-300">
                                                {valor.icon}
                                            </div>

                                        </div>


                                        <span className="font-heading font-bold text-bee-dark text-lg">
                                            {t(valor.id)}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        CTA
                    ================================================== */}
                    <section className="relative overflow-hidden bg-bee-dark py-20 px-6">

                        {/* Decoraciones */}
                        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border-[40px] border-bee-yellow/10" />

                        <div className="absolute -left-20 -bottom-32 w-72 h-72 rounded-full border-[40px] border-white/5" />


                        <div className="relative max-w-5xl mx-auto text-center">

                            <span className="text-bee-yellow text-sm font-bold tracking-[0.25em] uppercase">
                                Bee Near
                            </span>


                            <h2 className="text-white text-4xl md:text-5xl font-heading font-extrabold mt-4 mb-6">
                                Construyamos algo
                                <span className="text-bee-yellow">
                                    {' '}extraordinario.
                                </span>
                            </h2>


                            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-9">
                                Conoce nuestras soluciones y descubre cómo podemos
                                ayudarte a alcanzar tus objetivos.
                            </p>


                            <Link
                                href="/contacto"
                                className="group inline-flex items-center gap-3 bg-bee-yellow text-bee-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition duration-300 shadow-xl"
                            >

                                {t('nav_contact')}

                                <ArrowRight
                                    size={20}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </Link>

                        </div>

                    </section>

                </main>


                {/* =====================================================
                    FOOTER
                ====================================================== */}
                <footer className="bg-bee-dark text-white pt-16 pb-8 px-6 md:px-8 border-t border-white/10">

                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12">


                        {/* Marca */}
                        <div>

                            <div className="flex items-center gap-3 mb-6">

                                <img
                                    src="/images/logo.png"
                                    alt="Bee Near Logo"
                                    className="h-10 w-10"
                                />

                                <div className="text-2xl font-heading font-bold tracking-tight">

                                    <span>Bee</span>
                                    <span className="text-bee-yellow">Near</span>

                                </div>

                            </div>


                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                {t('footer_desc')}
                            </p>

                        </div>


                        {/* Enlaces */}
                        <div>

                            <h4 className="text-sm font-heading font-bold mb-6 text-bee-yellow uppercase tracking-wider">
                                {t('footer_links')}
                            </h4>


                            <ul className="space-y-4 text-sm text-gray-400">

                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-white transition"
                                    >
                                        {t('nav_home')}
                                    </Link>
                                </li>


                                <li>
                                    <Link
                                        href="/nosotros"
                                        className="hover:text-white transition"
                                    >
                                        {t('nav_about')}
                                    </Link>
                                </li>


                                <li>
                                    <Link
                                        href="/servicios"
                                        className="hover:text-white transition"
                                    >
                                        {t('nav_services')}
                                    </Link>
                                </li>


                                <li>
                                    <Link
                                        href="/contacto"
                                        className="hover:text-white transition"
                                    >
                                        {t('nav_contact')}
                                    </Link>
                                </li>

                            </ul>

                        </div>


                        {/* Contacto */}
                        <div>

                            <h4 className="text-sm font-heading font-bold mb-6 text-bee-yellow uppercase tracking-wider">
                                {t('footer_contact')}
                            </h4>


                            <ul className="space-y-4 text-sm text-gray-400">

                                <li className="flex items-center gap-3">

                                    <Mail
                                        size={18}
                                        className="text-bee-yellow flex-shrink-0"
                                    />

                                    <span>
                                        moreinfo@beenear.mx
                                    </span>

                                </li>


                                <li className="flex items-center gap-3">

                                    <Phone
                                        size={18}
                                        className="text-bee-yellow flex-shrink-0"
                                    />

                                    <span>
                                        +1 (215) 318-0179
                                    </span>

                                </li>


                                <li className="flex items-start gap-3">

                                    <MapPin
                                        size={18}
                                        className="text-bee-yellow flex-shrink-0 mt-1"
                                    />

                                    <span>
                                        Ejército Nacional 373, CDMX
                                    </span>

                                </li>

                            </ul>

                        </div>

                    </div>


                    {/* Copyright */}
                    <div className="max-w-7xl mx-auto border-t border-gray-700/70 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">

                        <p>
                            &copy; {new Date().getFullYear()} BeeNear. {t('footer_rights')}
                        </p>


                        <a
                            href="#"
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