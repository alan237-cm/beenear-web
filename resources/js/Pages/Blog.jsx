import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    ArrowRight,
    ArrowUpRight,
    Bot,
    Headphones,
    Zap,
    BarChart3,
    Clock3,
    Search,
} from 'lucide-react';

export default function Blog() {
    const { i18n } = useTranslation();
    const isSpanish = i18n.language === 'es';

    // =========================================================
    // IDIOMA
    // =========================================================
    const toggleLanguage = () => {
        i18n.changeLanguage(isSpanish ? 'en' : 'es');
    };

    // =========================================================
    // CATEGORÍA ACTIVA
    // =========================================================
    const [activeCategory, setActiveCategory] = useState(
        isSpanish ? 'Todos' : 'All'
    );

    const [isChangingCategory, setIsChangingCategory] = useState(false);

    // =========================================================
    // CATEGORÍAS
    // =========================================================
    const categories = isSpanish
        ? [
              'Todos',
              'Inteligencia Artificial',
              'Atención al cliente',
              'Automatización',
              'Ventas',
          ]
        : [
              'All',
              'Artificial Intelligence',
              'Customer Service',
              'Automation',
              'Sales',
          ];

    // =========================================================
    // ARTÍCULOS
    // =========================================================
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

    // =========================================================
    // CAMBIO DE IDIOMA
    // Reinicia categoría para evitar inconsistencias
    // =========================================================
    useEffect(() => {
        setActiveCategory(isSpanish ? 'Todos' : 'All');
    }, [isSpanish]);

    // =========================================================
    // FILTRO
    // =========================================================
    const filteredArticles =
        activeCategory === 'Todos' || activeCategory === 'All'
            ? articles
            : articles.filter(
                  (article) => article.category === activeCategory
              );

    // =========================================================
    // CAMBIO DE CATEGORÍA CON ANIMACIÓN
    // =========================================================
    const changeCategory = (category) => {
        if (category === activeCategory) {
            return;
        }

        setIsChangingCategory(true);

        setTimeout(() => {
            setActiveCategory(category);

            setTimeout(() => {
                setIsChangingCategory(false);
            }, 80);
        }, 220);
    };

    // =========================================================
    // RETURN
    // =========================================================
    return (
        <>
            <Head title="Blog | BeeNear" />

            <div className="min-h-screen bg-[#f8f8f6] text-bee-dark">

                {/* =====================================================
                    NAVBAR
                ====================================================== */}
                <header className="absolute top-5 left-0 right-0 z-50 px-4">

                    <nav
                        aria-label="Main navigation"
                        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/95 px-5 shadow-[0_15px_45px_rgba(0,0,0,0.10)] backdrop-blur-xl md:px-7"
                    >

                        {/* LOGO */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                        >

                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">

                                <img
                                    src="/images/logo.png"
                                    alt="BeeNear"
                                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />

                            </div>

                            <div className="leading-none">

                                <span className="block text-lg font-black tracking-tight text-bee-dark">
                                    BEENEAR
                                </span>

                                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400 sm:block">
                                    Technology & Innovation
                                </span>

                            </div>

                        </Link>


                        {/* DESKTOP */}
                        <div className="hidden items-center gap-8 lg:flex">

                            <Link
                                href="/"
                                className="text-sm font-semibold text-gray-500 transition hover:text-bee-dark"
                            >
                                {isSpanish ? 'Inicio' : 'Home'}
                            </Link>

                            <Link
                                href="/nosotros"
                                className="text-sm font-semibold text-gray-500 transition hover:text-bee-dark"
                            >
                                {isSpanish ? 'Nosotros' : 'About'}
                            </Link>

                            <Link
                                href="/servicios"
                                className="text-sm font-semibold text-gray-500 transition hover:text-bee-dark"
                            >
                                {isSpanish ? 'Servicios' : 'Services'}
                            </Link>


                            {/* BLOG ACTIVO */}
                            <Link
                                href="/blog"
                                className="relative text-sm font-semibold text-bee-dark"
                            >
                                Blog

                                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-bee-yellow" />
                            </Link>


                            <div className="h-7 w-px bg-gray-200" />


                            {/* IDIOMA */}
                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 transition hover:border-bee-yellow hover:bg-yellow-50 hover:text-bee-dark"
                            >
                                {isSpanish ? 'EN' : 'ES'}
                            </button>


                            {/* CONTACTO */}
                            <Link
                                href="/contacto"
                                className="group flex items-center gap-2 rounded-xl bg-bee-yellow px-5 py-3 text-sm font-bold text-bee-dark shadow-sm transition hover:bg-yellow-400"
                            >
                                {isSpanish ? 'Contacto' : 'Contact'}

                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>

                        </div>


                        {/* MOBILE */}
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 lg:hidden"
                        >
                            {isSpanish ? 'EN' : 'ES'}
                        </button>

                    </nav>

                </header>


                {/* =====================================================
                    HERO
                ====================================================== */}
                <section className="relative overflow-hidden bg-bee-dark pb-20 pt-40">

                    {/* DECORACIONES */}
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-bee-yellow/10 blur-3xl" />

                    <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />


                    <div className="relative mx-auto max-w-7xl px-6">

                        <div className="max-w-3xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-bee-yellow">

                                <span className="h-2 w-2 rounded-full bg-bee-yellow" />

                                BeeNear Blog

                            </div>


                            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">

                                {isSpanish
                                    ? 'Ideas que conectan tecnología y negocios.'
                                    : 'Ideas connecting technology and business.'
                                }

                            </h1>


                            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">

                                {isSpanish
                                    ? 'Conoce tendencias, ideas y soluciones para transformar la manera en que tu empresa se comunica con sus clientes.'
                                    : 'Discover trends, ideas and solutions to transform the way your company communicates with its customers.'
                                }

                            </p>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    CONTENIDO
                ====================================================== */}
                <main className="mx-auto max-w-7xl px-6 py-14">


                    {/* =================================================
                        CATEGORÍAS
                    ================================================== */}
                    <div className="mb-12 flex flex-wrap items-center gap-3">

                        {categories.map((category) => (

                            <button
                                key={category}
                                type="button"
                                onClick={() => changeCategory(category)}
                                className={`
                                    relative overflow-hidden rounded-full
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    transition-all duration-300
                                    active:scale-95
                                    ${
                                        activeCategory === category
                                            ? 'bg-bee-dark text-white shadow-lg'
                                            : 'bg-white text-gray-600 hover:bg-bee-yellow hover:text-bee-dark hover:-translate-y-0.5'
                                    }
                                `}
                            >

                                {category}

                                {/* PUNTITO DE CATEGORÍA ACTIVA */}
                                {activeCategory === category && (
                                    <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-bee-yellow" />
                                )}

                            </button>

                        ))}

                    </div>


                    {/* =================================================
                        CONTENEDOR ANIMADO
                    ================================================== */}
                    <div
                        className={`
                            transition-all duration-300 ease-out
                            ${
                                isChangingCategory
                                    ? 'translate-y-3 opacity-0 scale-[0.99]'
                                    : 'translate-y-0 opacity-100 scale-100'
                            }
                        `}
                    >


                        {/* =================================================
                            ARTÍCULO DESTACADO
                        ================================================== */}

                        {filteredArticles.length > 0 && (

                            <article
                                className="
                                    group mb-12 overflow-hidden
                                    rounded-[1.75rem]
                                    bg-white
                                    shadow-[0_15px_50px_rgba(0,0,0,0.07)]
                                    transition duration-500
                                    hover:-translate-y-1
                                    hover:shadow-[0_25px_60px_rgba(0,0,0,0.10)]
                                "
                            >

                                <div className="grid md:grid-cols-2">


                                    {/* VISUAL */}
                                    <div className="relative min-h-[300px] overflow-hidden bg-bee-dark">

                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,190,30,0.35),transparent_35%)]" />

                                        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border-[40px] border-bee-yellow/20" />


                                        <div className="relative flex h-full min-h-[300px] items-center justify-center">

                                            <div className="relative flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md transition duration-500 group-hover:scale-105">

                                                {React.createElement(
                                                    filteredArticles[0].icon,
                                                    {
                                                        size: 58,
                                                        strokeWidth: 1.5,
                                                        className: 'text-bee-yellow',
                                                    }
                                                )}

                                            </div>


                                            <div className="absolute right-16 top-16 h-4 w-4 animate-pulse rounded-full bg-bee-yellow" />

                                            <div className="absolute bottom-20 left-16 h-3 w-3 rounded-full bg-white/50" />

                                        </div>

                                    </div>


                                    {/* INFORMACIÓN */}
                                    <div className="flex flex-col justify-center p-8 md:p-10">

                                        <div className="mb-5 flex flex-wrap items-center gap-3">

                                            <span className="rounded-full bg-[#fff4c9] px-4 py-2 text-xs font-bold text-bee-dark">
                                                {filteredArticles[0].category}
                                            </span>

                                            <span className="text-xs font-medium text-gray-400">
                                                {filteredArticles[0].date}
                                            </span>

                                        </div>


                                        <h2 className="text-3xl font-black leading-tight text-bee-dark md:text-4xl">
                                            {filteredArticles[0].title}
                                        </h2>


                                        <p className="mt-5 text-base leading-relaxed text-gray-500">
                                            {filteredArticles[0].description}
                                        </p>


                                        {/* BOTÓN AL ARTÍCULO */}
                                        <Link
                                            href={`/blog/${filteredArticles[0].slug}`}
                                            className="group mt-7 flex w-fit items-center gap-2 font-bold text-bee-dark"
                                        >

                                            {isSpanish
                                                ? 'Leer artículo'
                                                : 'Read article'
                                            }

                                            <ArrowRight
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />

                                        </Link>

                                    </div>

                                </div>

                            </article>

                        )}


                        {/* =================================================
                            GRID DE ARTÍCULOS
                        ================================================== */}

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {filteredArticles.slice(1).map((article, index) => {

                                const Icon = article.icon;

                                return (

                                    <article
                                        key={article.id}
                                        className="
                                            group
                                            relative
                                            flex
                                            min-h-[500px]
                                            flex-col
                                            overflow-hidden
                                            rounded-[1.5rem]
                                            border
                                            border-gray-200
                                            bg-white
                                            shadow-[0_8px_30px_rgba(35,31,32,0.06)]
                                            transition-all
                                            duration-500
                                            hover:-translate-y-2
                                            hover:border-bee-yellow/60
                                            hover:shadow-[0_20px_45px_rgba(35,31,32,0.12)]
                                        "
                                        style={{
                                            animation: `cardIn 0.45s ease-out ${index * 70}ms both`,
                                        }}
                                    >


                                        {/* =========================================
                                            CABECERA VISUAL
                                        ========================================== */}

                                        <div
                                            className="
                                                relative
                                                h-48
                                                shrink-0
                                                overflow-hidden
                                                bg-bee-dark
                                            "
                                        >

                                            {/* Glow amarillo */}
                                            <div
                                                className="
                                                    absolute
                                                    -left-16
                                                    -top-16
                                                    h-48
                                                    w-48
                                                    rounded-full
                                                    bg-bee-yellow/20
                                                    blur-3xl
                                                    transition-all
                                                    duration-700
                                                    group-hover:scale-150
                                                "
                                            />


                                            <div
                                                className="
                                                    absolute
                                                    -bottom-20
                                                    -right-10
                                                    h-52
                                                    w-52
                                                    rounded-full
                                                    border-[28px]
                                                    border-bee-yellow/10
                                                    transition-all
                                                    duration-700
                                                    group-hover:scale-125
                                                "
                                            />


                                            {/* Línea decorativa */}
                                            <div
                                                className="
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    h-1
                                                    w-0
                                                    bg-bee-yellow
                                                    transition-all
                                                    duration-500
                                                    group-hover:w-full
                                                "
                                            />


                                            {/* Badge BLOG */}
                                            <div
                                                className="
                                                    absolute
                                                    left-5
                                                    top-5
                                                    rounded-full
                                                    border
                                                    border-white/20
                                                    bg-white
                                                    px-3
                                                    py-1.5
                                                    text-[10px]
                                                    font-black
                                                    tracking-wider
                                                    text-bee-dark
                                                    shadow-sm
                                                "
                                            >
                                                BLOG
                                            </div>


                                            {/* Icono */}
                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        h-24
                                                        w-24
                                                        items-center
                                                        justify-center
                                                        rounded-[1.5rem]
                                                        border
                                                        border-white/10
                                                        bg-white/10
                                                        shadow-2xl
                                                        backdrop-blur-md
                                                        transition-all
                                                        duration-500
                                                        group-hover:scale-110
                                                        group-hover:rotate-3
                                                    "
                                                >

                                                    <Icon
                                                        size={42}
                                                        strokeWidth={1.6}
                                                        className="
                                                            text-bee-yellow
                                                            transition-transform
                                                            duration-500
                                                            group-hover:scale-110
                                                        "
                                                    />

                                                </div>

                                            </div>

                                        </div>


                                        {/* =========================================
                                            CONTENIDO
                                        ========================================== */}

                                        <div
                                            className="
                                                flex
                                                flex-1
                                                flex-col
                                                p-7
                                            "
                                        >

                                            {/* Categoría + fecha */}
                                            <div
                                                className="
                                                    mb-5
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <span
                                                    className="
                                                        rounded-full
                                                        border
                                                        border-bee-yellow/30
                                                        bg-[#fff8dc]
                                                        px-3
                                                        py-1.5
                                                        text-[11px]
                                                        font-bold
                                                        text-bee-dark
                                                    "
                                                >
                                                    {article.category}
                                                </span>

                                                <span
                                                    className="
                                                        whitespace-nowrap
                                                        text-[11px]
                                                        font-medium
                                                        text-gray-400
                                                    "
                                                >
                                                    {article.date}
                                                </span>

                                            </div>


                                            {/* Título */}
                                            <h3
                                                className="
                                                    text-xl
                                                    font-black
                                                    leading-[1.2]
                                                    tracking-tight
                                                    text-bee-dark
                                                    transition-colors
                                                    duration-300
                                                    group-hover:text-[#111]
                                                "
                                            >
                                                {article.title}
                                            </h3>


                                            {/* Descripción */}
                                            <p
                                                className="
                                                    mt-4
                                                    line-clamp-3
                                                    text-sm
                                                    leading-6
                                                    text-gray-500
                                                "
                                            >
                                                {article.description}
                                            </p>


                                            {/* =====================================
                                                FOOTER DE TARJETA
                                            ====================================== */}

                                            <div
                                                className="
                                                    mt-auto
                                                    flex
                                                    items-center
                                                    justify-between
                                                    border-t
                                                    border-gray-100
                                                    pt-6
                                                "
                                            >

                                                {/* BOTÓN AL ARTÍCULO */}
                                                <Link
                                                    href={`/blog/${article.slug}`}
                                                    className="
                                                        group/link
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        font-black
                                                        text-bee-dark
                                                    "
                                                >

                                                    {isSpanish
                                                        ? 'Leer artículo'
                                                        : 'Read article'
                                                    }

                                                    <span
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            bg-bee-dark
                                                            text-white
                                                            transition-all
                                                            duration-300
                                                            group-hover/link:bg-bee-yellow
                                                            group-hover/link:text-bee-dark
                                                        "
                                                    >

                                                        <ArrowRight
                                                            size={15}
                                                            className="
                                                                transition-transform
                                                                duration-300
                                                                group-hover/link:translate-x-0.5
                                                            "
                                                        />

                                                    </span>

                                                </Link>


                                                {/* Número */}
                                                <span
                                                    className="
                                                        text-xs
                                                        font-black
                                                        tracking-widest
                                                        text-gray-300
                                                    "
                                                >
                                                    0{article.id}
                                                </span>

                                            </div>

                                        </div>

                                    </article>

                                );

                            })}

                        </div>


                        {/* =================================================
                            SIN RESULTADOS
                        ================================================== */}

                        {filteredArticles.length === 0 && (

                            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

                                <Search
                                    size={42}
                                    className="mx-auto text-gray-300"
                                />


                                <h3 className="mt-5 text-xl font-bold">

                                    {isSpanish
                                        ? 'No encontramos artículos'
                                        : 'No articles found'
                                    }

                                </h3>


                                <p className="mt-2 text-gray-500">

                                    {isSpanish
                                        ? 'Prueba con otra categoría.'
                                        : 'Try another category.'
                                    }

                                </p>

                            </div>

                        )}

                    </div>

                </main>


                {/* =====================================================
                    CTA
                ====================================================== */}

                <section className="px-6 pb-16 pt-4">

                    <div
                        className="
                            mx-auto
                            max-w-6xl
                            overflow-hidden
                            rounded-[1.75rem]
                            bg-bee-yellow
                            px-7
                            py-8
                            md:px-10
                            md:py-9
                        "
                    >

                        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">


                            {/* TEXTO */}
                            <div className="max-w-3xl">

                                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-bee-dark/60">
                                    BeeNear
                                </p>

                                <h2
                                    className="
                                        text-2xl
                                        font-black
                                        leading-tight
                                        tracking-tight
                                        text-bee-dark
                                        md:text-3xl
                                        lg:text-[2.15rem]
                                    "
                                >

                                    {isSpanish
                                        ? '¿Quieres transformar la forma en que conectas con tus clientes?'
                                        : 'Want to transform the way you connect with your customers?'
                                    }

                                </h2>

                            </div>


                            {/* BOTÓN */}
                            <Link
                                href="/contacto"
                                className="
                                    group
                                    flex
                                    h-14
                                    shrink-0
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-xl
                                    bg-bee-dark
                                    px-7
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-[0_8px_20px_rgba(0,0,0,0.15)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-black
                                    hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)]
                                "
                            >

                                {isSpanish ? 'Hablemos' : "Let's talk"}

                                <ArrowUpRight
                                    size={18}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                        group-hover:-translate-y-1
                                    "
                                />

                            </Link>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <footer className="border-t border-gray-200 bg-white">

                    <div
                        className="
                            mx-auto
                            flex
                            max-w-7xl
                            flex-col
                            items-center
                            justify-between
                            gap-4
                            px-6
                            py-6
                            text-sm
                            text-gray-500
                            md:flex-row
                        "
                    >

                        <p className="text-center md:text-left">

                            © {new Date().getFullYear()} BeeNear.{' '}

                            {isSpanish
                                ? 'Todos los derechos reservados.'
                                : 'All rights reserved.'
                            }

                        </p>


                        <div className="flex items-center gap-6">

                            <Link
                                href="/"
                                className="transition-colors hover:text-bee-dark"
                            >
                                {isSpanish ? 'Inicio' : 'Home'}
                            </Link>


                            <Link
                                href="/contacto"
                                className="transition-colors hover:text-bee-dark"
                            >
                                {isSpanish ? 'Contacto' : 'Contact'}
                            </Link>

                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}