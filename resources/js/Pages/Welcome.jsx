import { Head, Link } from '@inertiajs/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

import { useTranslation } from 'react-i18next';

import {
    ArrowRight,
    CheckCircle2,
    MapPin,
    Phone,
    Mail,
} from 'lucide-react';

export default function Welcome() {

    // Inicializamos el traductor y la función para cambiar el idioma
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Head title={`${t('nav_home')} | Bee Near`} />

            <div className="min-h-screen bg-corp-light font-sans text-bee-dark">

                {/* =====================================================
                    NAVBAR
                ====================================================== */}
                {/* Navbar Flotante (Sticky) */}
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
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-bee-yellow rounded-full" />
            </Link>

            {/* Nosotros */}
            <Link 
                href="/nosotros" 
                className="text-gray-600 hover:text-bee-dark transition duration-300"
            >
                {t('nav_about')}
            </Link>

            {/* Servicios */}
            <Link 
                href="/servicios" 
                className="text-gray-600 hover:text-bee-dark transition duration-300"
            >
                {t('nav_services')}
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
                <main className="relative min-h-screen w-full overflow-hidden">

                    {/* Carrusel de imágenes */}
                    <div className="absolute inset-0 z-0">

                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            allowTouchMove={false}
                            className="h-full w-full"
                        >

                            {/* Imagen 1 */}
                            <SwiperSlide>

                                <div
                                    className="h-full w-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop')",
                                    }}
                                />

                            </SwiperSlide>


                            {/* Imagen 2 */}
                            <SwiperSlide>

                                <div
                                    className="h-full w-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950&auto=format&fit=crop')",
                                    }}
                                />

                            </SwiperSlide>

                        </Swiper>

                    </div>


                    {/* Capa oscura principal */}
                    <div className="absolute inset-0 z-[1] bg-black/55" />


                    {/* Degradado inferior */}
                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-bee-dark/90 via-transparent to-black/20" />


                    {/* =================================================
                        CONTENIDO DEL HERO
                    ================================================== */}
                    <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 flex items-center">

                        <div className="max-w-4xl">

                            {/* Pequeño encabezado */}
                            <div className="flex items-center gap-3 mb-6">

                                <span className="h-px w-10 bg-bee-yellow" />

                                <span className="text-bee-yellow text-sm md:text-base font-bold tracking-[0.25em] uppercase">
                                    Bee Near
                                </span>

                            </div>


                            {/* Título principal */}
                            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold leading-[0.95] tracking-tight mb-7">

                                {t('hero_title_1')}

                                <br />

                                {t('hero_title_2')}

                                {' '}

                                <span className="text-bee-yellow">
                                    {t('hero_title_highlight')}
                                </span>

                            </h1>


                            {/* Descripción */}
                            <p className="text-gray-200 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mb-9">
                                {t('hero_desc')}
                            </p>


                            {/* Botones */}
                            <div className="flex flex-col sm:flex-row gap-4">

                                {/* Botón principal */}
                                <Link
                                    href="/servicios"
                                    className="group inline-flex items-center justify-center gap-3 bg-bee-yellow text-bee-dark px-7 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-yellow-400 transition duration-300 shadow-xl"
                                >

                                    {t('hero_btn')}

                                    <ArrowRight
                                        size={20}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />

                                </Link>


                                {/* Botón secundario */}
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center justify-center px-7 py-4 rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm text-white font-bold text-base md:text-lg hover:bg-white hover:text-bee-dark transition duration-300"
                                >
                                    {t('nav_contact')}
                                </Link>

                            </div>


                            {/* Indicadores */}
                            <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-12">

                                <div className="flex items-center gap-2 text-white/90 text-sm">

                                    <CheckCircle2
                                        size={18}
                                        className="text-bee-yellow"
                                    />

                                    <span>
                                        {t('hero_check_1')}
                                    </span>

                                </div>


                                <div className="flex items-center gap-2 text-white/90 text-sm">

                                    <CheckCircle2
                                        size={18}
                                        className="text-bee-yellow"
                                    />

                                    <span>
                                        {t('hero_check_2')}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Indicador inferior */}
                    <div className="absolute z-20 bottom-8 left-0 right-0">

                        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                            <span className="text-white/50 text-xs tracking-[0.25em] uppercase">
                                {t('hero_scroll')}
                            </span>


                            <div className="flex items-center gap-2">

                                <span className="h-1.5 w-8 rounded-full bg-bee-yellow" />

                                <span className="h-1.5 w-2 rounded-full bg-white/40" />

                            </div>

                        </div>

                    </div>

                </main>


                {/* =====================================================
                    SECCIÓN INTRODUCTORIA
                ====================================================== */}
                <section className="bg-white py-24 px-6">

                    <div className="max-w-7xl mx-auto">

                        <div className="grid lg:grid-cols-2 gap-16 items-center">

                            {/* Texto */}
                            <div>

                                <div className="flex items-center gap-3 mb-5">

                                    <span className="h-1 w-8 bg-bee-yellow rounded-full" />

                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                                        {t('home_tech_pretitle')}
                                    </span>

                                </div>


                                <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight mb-6">
                                    {t('home_tech_title_1')}
                                    <span className="text-bee-yellow">
                                        {' '}{t('home_tech_title_highlight')}
                                    </span>
                                </h2>


                                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                    {t('home_tech_desc')}
                                </p>

                            </div>


                            {/* Tarjetas */}
                            <div className="grid sm:grid-cols-2 gap-5">

                                {/* Tarjeta 1 */}
                                <div className="bg-corp-light rounded-2xl p-7 border border-gray-100 hover:border-bee-yellow/40 transition duration-300">

                                    <div className="w-11 h-11 rounded-xl bg-bee-yellow/15 flex items-center justify-center mb-5">

                                        <CheckCircle2
                                            size={23}
                                            className="text-bee-yellow"
                                        />

                                    </div>


                                    <h3 className="font-heading font-bold text-xl mb-2">
                                        {t('home_card1_title')}
                                    </h3>


                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {t('home_card1_desc')}
                                    </p>

                                </div>


                                {/* Tarjeta 2 */}
                                <div className="bg-bee-dark text-white rounded-2xl p-7 shadow-xl">

                                    <div className="w-11 h-11 rounded-xl bg-bee-yellow flex items-center justify-center mb-5">

                                        <ArrowRight
                                            size={23}
                                            className="text-bee-dark"
                                        />

                                    </div>


                                    <h3 className="font-heading font-bold text-xl mb-2">
                                        {t('home_card2_title')}
                                    </h3>


                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {t('home_card2_desc')}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    CTA
                ====================================================== */}
                <section className="relative overflow-hidden bg-bee-dark py-20 px-6">

                    {/* Elementos decorativos */}
                    <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border-[40px] border-bee-yellow/10" />

                    <div className="absolute -left-20 -bottom-32 w-72 h-72 rounded-full border-[40px] border-white/5" />


                    <div className="relative max-w-5xl mx-auto text-center">

                        <span className="text-bee-yellow text-sm font-bold tracking-[0.25em] uppercase">
                            {t('home_cta_subtitle')}
                        </span>


                        <h2 className="text-white text-4xl md:text-5xl font-heading font-extrabold mt-4 mb-6">
                            {t('home_cta_title_1')}
                            <span className="text-bee-yellow">
                                {' '}{t('home_cta_title_highlight')}
                            </span>
                        </h2>


                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-9">
                            {t('home_cta_desc')}
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


                {/* Footer Corporativo */}
                <footer className="bg-bee-dark text-white pt-16 pb-8 px-8 border-t-4 border-bee-yellow mt-auto">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
                        
                        {/* Columna 1: Marca */}
                        <div>
                            {/* Si usas el imagotipo aquí también, puedes cambiar este bloque */}
                            <div className="flex items-center space-x-2 mb-6">
                                <img src="/images/logo.png" alt="Bee Near Logo" className="h-10 w-10" />
                                <div className="text-2xl font-heading font-bold tracking-wider">
                                    <span className="text-white">Bee</span><span className="text-bee-yellow">Near</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{t('footer_desc')}</p>
                        </div>
                        
                        {/* Columna 2: Enlaces Rápidos */}
                        <div>
                            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-bee-yellow">{t('footer_links')}</h4>
                            <ul className="space-y-4 text-sm text-gray-400 font-medium">
                                <li><Link href="/" className="hover:text-bee-yellow transition">{t('nav_home')}</Link></li>
                                <li><Link href="/nosotros" className="hover:text-bee-yellow transition">{t('nav_about')}</Link></li>
                                <li><Link href="/servicios" className="hover:text-bee-yellow transition">{t('nav_services')}</Link></li>
                                <li><Link href="/contacto" className="hover:text-bee-yellow transition">{t('nav_contact')}</Link></li>
                            </ul>
                        </div>
                        
                        {/* Columna 3: Contacto */}
                        <div>
                            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-bee-yellow">{t('footer_contact')}</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-3"><Mail size={18} className="text-bee-yellow" /> moreinfo@beenear.mx</li>
                                <li className="flex items-center gap-3"><Phone size={18} className="text-bee-yellow" /> +1 (215) 318-0179</li>
                                <li className="flex items-start gap-3"><MapPin size={18} className="text-bee-yellow flex-shrink-0 mt-1" /> Ejército Nacional 373, CDMX</li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright y Políticas */}
                    <div className="max-w-6xl mx-auto border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                        <p>&copy; {new Date().getFullYear()} Bee Near. {t('footer_rights')}</p>
                        <a href="#" className="hover:text-bee-yellow transition font-medium">{t('footer_privacy')}</a>
                    </div>
                </footer>

            </div>
        </>
    );
}