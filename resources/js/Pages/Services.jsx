import { Head, Link } from '@inertiajs/react';

import { useTranslation } from 'react-i18next';

import {
    ArrowRight,
    Headphones,
    TrendingUp,
    Check,
    Sparkles,
    Mail,
    Phone,
    MapPin,
} from 'lucide-react';

export default function Services() {

    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Head title={`${t('nav_services')} | Bee Near`} />

            <div className="min-h-screen bg-corp-light font-sans text-bee-dark">


                {/* =====================================================
                    NAVBAR
                ====================================================== */}
                <div className="fixed top-4 inset-x-0 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full">
    <nav className="bg-white text-bee-dark px-6 md:px-8 h-[84px] flex justify-between items-center shadow-xl rounded-2xl">
        
        {/* Logo Imagotipo (Más grande y con efecto de escala) */}
        <Link href="/" className="flex items-center cursor-pointer">
            <img 
                src="/images/imagotipo.jpeg" 
                alt="Bee Near Logo" 
                className="h-14 md:h-16 w-auto object-contain transform hover:scale-105 transition duration-300" 
            />
        </Link>
        
        {/* Menú de navegación con estilos, colores y espaciados originales */}
        <div className="hidden md:flex items-center gap-7 font-medium text-sm">
            
            {/* Inicio */}
            <Link 
                href="/" 
                className="relative text-bee-dark hover:text-bee-yellow transition duration-300"
            >
                {t('nav_home')}
                {/* Línea indicadora de página activa */}
            </Link>

            {/* Nosotros (Inactivo) */}
            <Link 
                href="/nosotros" 
                className="text-gray-600 hover:text-bee-dark transition duration-300"
            >
                {t('nav_about')}
            </Link>

            {/* Servicios (ACTIVO) */}
            <Link 
                href="/servicios" 
                className="relative text-bee-dark hover:text-bee-yellow transition duration-300"
            >
                {t('nav_services')}
                {/* Línea indicadora de página activa */}
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-bee-yellow rounded-full" />
            </Link>

            {/* Separador vertical elegante */}
            <div className="h-7 w-px bg-gray-200" />

            {/* Idioma */}
            <button 
                onClick={toggleLanguage} 
                className="font-bold text-sm text-bee-dark hover:text-bee-yellow transition duration-300"
            >
                {i18n.language === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
            </button>

            {/* Contacto (Botón con flecha animada y bordes redondeados) */}
            <Link 
                href="/contacto" 
                className="group flex items-center gap-2 bg-bee-yellow text-bee-dark px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition duration-300 shadow-sm"
            >
                {t('nav_contact')}
                <ArrowRight 
                    size={17} 
                    className="transition-transform duration-300 group-hover:translate-x-1" 
                />
            </Link>
            
        </div>
    </nav>
</div>


                {/* =====================================================
                    HERO
                ====================================================== */}
                <header className="relative overflow-hidden bg-bee-dark text-white min-h-[540px] md:min-h-[580px] flex items-center">

                    {/* Decoraciones */}
                    <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-[70px] border-bee-yellow/10" />

                    <div className="absolute -left-40 -bottom-40 w-[500px] h-[500px] rounded-full border-[80px] border-white/5" />

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
                                {t('portfolio_title')}
                            </h1>


                            {/* Descripción */}
                            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl">
                                {t('portfolio_desc')}
                            </p>

                        </div>

                    </div>


                    {/* Indicador */}
                    <div className="absolute bottom-8 left-0 right-0 z-10">

                        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                            <span className="text-white/40 text-xs tracking-[0.25em] uppercase">
                                Our solutions
                            </span>


                            <div className="flex items-center gap-2">

                                <span className="h-1.5 w-8 rounded-full bg-bee-yellow" />

                                <span className="h-1.5 w-2 rounded-full bg-white/30" />

                            </div>

                        </div>

                    </div>

                </header>


                {/* =====================================================
                    SERVICIOS
                ====================================================== */}
                <main className="bg-white">

                    <section className="py-24 px-6">

                        <div className="max-w-7xl mx-auto">


                            {/* Encabezado */}
                            <div className="max-w-3xl mb-14">

                                <div className="flex items-center gap-3 mb-5">

                                    <span className="h-1 w-8 bg-bee-yellow rounded-full" />

                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                                        {t('services_what_pretitle')}
                                    </span>

                                </div>


                                <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight text-bee-dark">
                                    {t('services_what_title_1')}
                                    <span className="text-bee-yellow">
                                        {' '}{t('services_what_title_highlight')}
                                    </span>
                                </h2>

                            </div>


                            {/* =================================================
                                TARJETAS
                            ================================================== */}
                            <div className="grid lg:grid-cols-2 gap-6">


                                {/* =================================================
                                    CONTACT CENTER
                                ================================================== */}
                                <article className="group relative overflow-hidden bg-bee-dark text-white rounded-3xl p-8 md:p-10 min-h-[500px] flex flex-col">

                                    {/* Número */}
                                    <span className="absolute top-8 right-9 text-8xl font-heading font-extrabold text-white/5 select-none">
                                        01
                                    </span>


                                    {/* Icono */}
                                    <div className="relative w-14 h-14 rounded-2xl bg-bee-yellow flex items-center justify-center mb-8">

                                        <Headphones
                                            size={28}
                                            strokeWidth={1.8}
                                            className="text-bee-dark"
                                        />

                                    </div>


                                    {/* Título */}
                                    <h3 className="relative text-3xl md:text-4xl font-heading font-bold mb-5 max-w-md">
                                        {t('cc_title')}
                                    </h3>


                                    {/* Descripción visual */}
                                    <p className="relative text-gray-400 text-base leading-relaxed max-w-lg mb-8">
                                        {t('portfolio_desc')}
                                    </p>


                                    {/* Características */}
                                    <ul className="relative space-y-4 mb-10">

                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-300">
                                                {t('cc_item1')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-300">
                                                {t('cc_item2')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-300">
                                                {t('cc_item3')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-300">
                                                {t('cc_item4')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-300">
                                                {t('cc_item5')}
                                            </span>
                                        </li>

                                    </ul>


                                    {/* Botón */}
                                    <div className="mt-auto">

                                        <Link
                                            href="/servicios/contact-center"
                                            className="group/btn inline-flex items-center gap-3 bg-bee-yellow text-bee-dark px-6 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition duration-300"
                                        >

                                            {t('btn_more_info')}

                                            <ArrowRight
                                                size={19}
                                                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                            />

                                        </Link>

                                    </div>


                                    {/* Decoración */}
                                    <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border-[35px] border-bee-yellow/5" />

                                </article>


                                {/* =================================================
                                    INTAKE SALES
                                ================================================== */}
                                <article className="group relative overflow-hidden bg-corp-light rounded-3xl p-8 md:p-10 min-h-[500px] flex flex-col border border-gray-100">

                                    {/* Número */}
                                    <span className="absolute top-8 right-9 text-8xl font-heading font-extrabold text-gray-200 select-none">
                                        02
                                    </span>


                                    {/* Icono */}
                                    <div className="relative w-14 h-14 rounded-2xl bg-bee-yellow flex items-center justify-center mb-8">

                                        <TrendingUp
                                            size={28}
                                            strokeWidth={1.8}
                                            className="text-bee-dark"
                                        />

                                    </div>


                                    {/* Título */}
                                    <h3 className="relative text-3xl md:text-4xl font-heading font-bold text-bee-dark mb-5 max-w-md">
                                        {t('is_title')}
                                    </h3>


                                    {/* Descripción */}
                                    <p className="relative text-gray-600 text-base leading-relaxed max-w-lg mb-8">
                                        {t('portfolio_desc')}
                                    </p>


                                    {/* Características */}
                                    <ul className="relative space-y-4 mb-10">

                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-700">
                                                {t('is_item1')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-700">
                                                {t('is_item2')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-700">
                                                {t('is_item3')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-700">
                                                {t('is_item4')}
                                            </span>
                                        </li>


                                        <li className="flex items-start gap-3">
                                            <span className="mt-0.5 w-6 h-6 rounded-full bg-bee-yellow/15 flex items-center justify-center flex-shrink-0">
                                                <Check
                                                    size={15}
                                                    className="text-bee-yellow"
                                                />
                                            </span>

                                            <span className="text-gray-700">
                                                {t('is_item5')}
                                            </span>
                                        </li>

                                    </ul>


                                    {/* Botón */}
                                    <div className="mt-auto">

                                        <Link
                                            href="/servicios/intake-sales"
                                            className="group/btn inline-flex items-center gap-3 bg-bee-dark text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition duration-300"
                                        >

                                            {t('btn_more_info')}

                                            <ArrowRight
                                                size={19}
                                                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                            />

                                        </Link>

                                    </div>


                                    {/* Decoración */}
                                    <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border-[35px] border-bee-yellow/10" />

                                </article>

                            </div>

                        </div>

                    </section>


                    {/* =====================================================
                        DIFERENCIAL
                    ====================================================== */}
                    <section className="bg-corp-light py-24 px-6">

                        <div className="max-w-7xl mx-auto">

                            <div className="grid lg:grid-cols-2 gap-16 items-center">


                                {/* Texto */}
                                <div>

                                    <div className="flex items-center gap-3 mb-5">

                                        <span className="h-1 w-8 bg-bee-yellow rounded-full" />

                                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                                            {t('services_why_pretitle')}
                                        </span>

                                    </div>


                                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight text-bee-dark mb-6">
                                        {t('services_why_title_1')}
                                        <span className="text-bee-yellow">
                                            {' '}{t('services_why_title_highlight')}
                                            </span>
                                    </h2>


                                    <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                        {t('services_why_desc')}
                                    </p>

                                </div>


                                {/* Panel */}
                                <div className="bg-bee-dark rounded-3xl p-8 md:p-10 text-white">

                                    <div className="flex items-center gap-4 mb-8">

                                        <div className="w-12 h-12 rounded-xl bg-bee-yellow flex items-center justify-center">

                                            <Sparkles
                                                size={24}
                                                className="text-bee-dark"
                                            />

                                        </div>


                                        <div>
                                            <p className="text-sm text-gray-400">
                                                Bee Near
                                            </p>
                                            
                                            <h3 className="text-xl font-heading font-bold">
                                                {t('srv_blackcard_title')}
                                            </h3>
                                            
                                        </div>

                                    </div>


                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-white/10 pb-5">
                                        <span className="text-gray-400">
                                            {t('srv_blackcard_item1')}                                           
                                        </span>
                                        
                                        <span className="text-bee-yellow font-bold">
                                            +
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center border-b border-white/10 pb-5">
                                    <span className="text-gray-400">
                                        {t('srv_blackcard_item2')}
                                    </span>
                                    <span className="text-bee-yellow font-bold">
                                        +
                                    </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">
                                            {t('srv_blackcard_item3')}
                                        </span>
                                        <span className="text-bee-yellow font-bold">
                                            =
                                        </span>
                                    </div>
                                    
                                    <div className="pt-3">
                                        <div className="text-2xl font-heading font-bold">
                                            {t('srv_blackcard_result')}
                                        </div>
                                     </div>
                                </div>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =====================================================
                        CTA
                    ====================================================== */}
                    <section className="relative overflow-hidden bg-bee-dark py-20 px-6">

                        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border-[40px] border-bee-yellow/10" />

                        <div className="absolute -left-20 -bottom-32 w-72 h-72 rounded-full border-[40px] border-white/5" />


                        <div className="relative max-w-5xl mx-auto text-center">

                            <span className="text-bee-yellow text-sm font-bold tracking-[0.25em] uppercase">
                                Bee Near
                            </span>


                            <h2 className="text-white text-4xl md:text-5xl font-heading font-extrabold mt-4 mb-6">
                                {t('services_cta_title_1')}
                                <span className="text-bee-yellow">
                                    {' '}{t('services_cta_title_highlight')}
                                    </span>
                            </h2>


                            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-9">
                                {t('services_cta_desc')}
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