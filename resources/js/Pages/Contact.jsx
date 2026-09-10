import { useTranslation } from 'react-i18next';
import {
    MapPin,
    Phone,
    Mail,
    Send,
    ExternalLink,
    ArrowUpRight,
} from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Contact() {
    const { t, i18n } = useTranslation();

    const isSpanish = i18n.language === 'es';

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/contacto', {
            onSuccess: () => {
                reset();
                alert(
                    isSpanish
                        ? '¡Mensaje enviado con éxito!'
                        : 'Message sent successfully!'
                );
            },
        });
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(isSpanish ? 'en' : 'es');
    };

    return (
        <>
            <Head title={isSpanish ? 'Contacto | Beenear' : 'Contact | Beenear'} />

            <div className="min-h-screen bg-corp-light text-bee-dark">
{/* =========================================================
    NAVBAR
========================================================= */}
<header className="absolute top-5 left-0 right-0 z-50 px-4">
    <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/95 px-5 shadow-[0_15px_45px_rgba(0,0,0,0.10)] backdrop-blur-xl md:px-7"
    >
        {/* Logo */}
        <Link
            href="/"
            className="group flex items-center gap-3"
        >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                <img
                    src="/images/logo.png"
                    alt="Beenear"
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

        {/* Desktop navigation */}
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

            <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 transition hover:border-bee-yellow hover:bg-yellow-50 hover:text-bee-dark"
            >
                {isSpanish ? 'EN' : 'ES'}
            </button>

            {/* Contacto */}
            <div className="group flex items-center gap-2 rounded-xl bg-bee-dark px-5 py-3 text-sm font-bold text-white shadow-sm">
                {isSpanish ? 'Contacto' : 'Contact'}

                <ArrowUpRight
                    size={16}
                    className="text-bee-yellow transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            </div>
        </div>

        {/* Mobile language */}
        <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 lg:hidden"
        >
            {isSpanish ? 'EN' : 'ES'}
        </button>
    </nav>

                </header>

                {/* =========================================================
                    HERO
                ========================================================== */}
                <section className="relative overflow-hidden bg-bee-dark pt-40 pb-28">
                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-bee-yellow/10 blur-3xl" />

                    <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-400/5 blur-3xl" />

                    {/* Decorative grid */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                        <div
                            className="h-full w-full"
                            style={{
                                backgroundImage:
                                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                                backgroundSize: '55px 55px',
                            }}
                        />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-10 bg-bee-yellow" />

                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-bee-yellow">
                                    {isSpanish ? 'Hablemos' : "Let's talk"}
                                </span>
                            </div>

                            <h1 className="font-heading text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                                {t('contact_hero_title')}
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
                                {t('contact_hero_desc')}
                            </p>
                        </div>
                    </div>

                    {/* Bottom yellow line */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-bee-yellow" />
                </section>

                {/* =========================================================
                    MAIN CONTENT
                ========================================================== */}
                <main className="relative py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

                            {/* =================================================
                                LEFT — LOCATION
                            ================================================== */}
                            <section>

                                {/* Section heading */}
                                <div className="mb-7">
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bee-yellow">
                                            <MapPin
                                                size={18}
                                                className="text-bee-dark"
                                            />
                                        </span>

                                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">
                                            {isSpanish
                                                ? 'Nuestra ubicación'
                                                : 'Our location'}
                                        </span>
                                    </div>

                                    <h2 className="font-heading text-3xl font-black tracking-tight md:text-4xl">
                                        {isSpanish
                                            ? 'Encuéntranos en Ciudad de México'
                                            : 'Find us in Mexico City'}
                                    </h2>

                                    <p className="mt-3 max-w-xl leading-7 text-gray-500">
                                        {isSpanish
                                            ? 'Visítanos o ponte en contacto con nuestro equipo. Estamos listos para escuchar tu proyecto.'
                                            : 'Visit us or get in touch with our team. We are ready to hear about your project.'}
                                    </p>
                                </div>

                                {/* MAP CARD */}
                                <div className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.10)]">

                                    {/* Map */}
                                    <div className="relative h-[430px] md:h-[520px]">

                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.534887756185!2d-99.18663242491122!3d19.43250918184643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8a8fa3d5089%3A0xc54deed0a52fbd1e!2sAv.%20Ej%C3%A9rcito%20Nacional%20Mexicano%20373%2C%20Granada%2C%20Miguel%20Hidalgo%2C%2011520%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Beenear location"
                                            className="h-full w-full"
                                        />

                                        {/* Soft overlays */}
                                        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/20 to-transparent" />

                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

                                        {/* Address floating card */}
                                        <div className="absolute left-5 top-5 max-w-[300px] rounded-2xl border border-white/50 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:left-6 md:top-6">

                                            <div className="flex gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bee-yellow">
                                                    <MapPin
                                                        size={19}
                                                        className="text-bee-dark"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-extrabold text-bee-dark">
                                                        Beenear
                                                    </p>

                                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                                        Ejército Nacional 373
                                                        <br />
                                                        Despachos 401–402
                                                        <br />
                                                        Granada, Miguel Hidalgo
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Google Maps button */}
                                        <a
                                            href="https://maps.google.com/?q=Ejercito+Nacional+373,+Granada,+Miguel+Hidalgo,+Ciudad+de+Mexico"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-bee-dark px-4 py-3 text-xs font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-black md:bottom-6 md:right-6"
                                        >
                                            <span>
                                                {isSpanish
                                                    ? 'Abrir en Google Maps'
                                                    : 'Open in Google Maps'}
                                            </span>

                                            <ExternalLink
                                                size={14}
                                                className="text-bee-yellow"
                                            />
                                        </a>

                                    </div>
                                </div>

                                {/* Contact mini cards */}
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                                    {/* Phone */}
                                    <a
                                        href="tel:+12153180179"
                                        className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-bee-yellow hover:shadow-lg"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-bee-yellow">
                                            <Phone
                                                size={18}
                                                className="text-bee-dark"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                                {isSpanish
                                                    ? 'Teléfono'
                                                    : 'Phone'}
                                            </p>

                                            <p className="mt-1 truncate text-sm font-bold text-bee-dark">
                                                +1 (215) 318-0179
                                            </p>
                                        </div>
                                    </a>

                                    {/* Email */}
                                    <a
                                        href="mailto:moreinfo@beenear.mx"
                                        className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-bee-yellow hover:shadow-lg"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-bee-yellow">
                                            <Mail
                                                size={18}
                                                className="text-bee-dark"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                                {isSpanish
                                                    ? 'Correo'
                                                    : 'Email'}
                                            </p>

                                            <p className="mt-1 truncate text-sm font-bold text-bee-dark">
                                                moreinfo@beenear.mx
                                            </p>
                                        </div>
                                    </a>

                                </div>
                            </section>

                            {/* =================================================
                                RIGHT — CONTACT FORM
                            ================================================== */}
                            <section className="lg:sticky lg:top-28">

                                <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.08)]">

                                    {/* Yellow accent */}
                                    <div className="h-1.5 bg-bee-yellow" />

                                    <div className="p-7 md:p-9">

                                        {/* Form heading */}
                                        <div className="mb-8">
                                            <div className="mb-4 flex items-center gap-3">
                                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-bee-yellow">
                                                    {isSpanish
                                                        ? 'Contacto'
                                                        : 'Get in touch'}
                                                </span>

                                                <span className="h-px flex-1 bg-gray-100" />
                                            </div>

                                            <h2 className="font-heading text-3xl font-black tracking-tight text-bee-dark">
                                                {t('contact_info_title')}
                                            </h2>

                                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                                {isSpanish
                                                    ? 'Cuéntanos un poco sobre tu proyecto y nos pondremos en contacto contigo.'
                                                    : 'Tell us a little about your project and our team will get back to you.'}
                                            </p>
                                        </div>

                                        {/* FORM */}
                                        <form
                                            onSubmit={submit}
                                            className="space-y-5"
                                        >

                                            {/* Name */}
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600"
                                                >
                                                    {isSpanish
                                                        ? 'Nombre'
                                                        : 'Name'}
                                                </label>

                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'name',
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    placeholder={
                                                        isSpanish
                                                            ? 'Tu nombre'
                                                            : 'Your name'
                                                    }
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-bee-dark outline-none transition placeholder:text-gray-400 focus:border-bee-yellow focus:bg-white focus:ring-4 focus:ring-bee-yellow/10"
                                                />

                                                {errors.name && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Email + Phone */}
                                            <div className="grid gap-5 sm:grid-cols-2">

                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600"
                                                    >
                                                        {isSpanish
                                                            ? 'Correo'
                                                            : 'Email'}
                                                    </label>

                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData(
                                                                'email',
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        placeholder="correo@ejemplo.com"
                                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-bee-dark outline-none transition placeholder:text-gray-400 focus:border-bee-yellow focus:bg-white focus:ring-4 focus:ring-bee-yellow/10"
                                                    />

                                                    {errors.email && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600"
                                                    >
                                                        {isSpanish
                                                            ? 'Teléfono'
                                                            : 'Phone'}
                                                    </label>

                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={(e) =>
                                                            setData(
                                                                'phone',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="+52 55..."
                                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-bee-dark outline-none transition placeholder:text-gray-400 focus:border-bee-yellow focus:bg-white focus:ring-4 focus:ring-bee-yellow/10"
                                                    />

                                                    {errors.phone && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label
                                                    htmlFor="message"
                                                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600"
                                                >
                                                    {isSpanish
                                                        ? 'Mensaje'
                                                        : 'Message'}
                                                </label>

                                                <textarea
                                                    id="message"
                                                    rows="6"
                                                    value={data.message}
                                                    onChange={(e) =>
                                                        setData(
                                                            'message',
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    placeholder={
                                                        isSpanish
                                                            ? 'Cuéntanos sobre tu proyecto...'
                                                            : 'Tell us about your project...'
                                                    }
                                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-bee-dark outline-none transition placeholder:text-gray-400 focus:border-bee-yellow focus:bg-white focus:ring-4 focus:ring-bee-yellow/10"
                                                />

                                                {errors.message && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-bee-dark px-6 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <span>
                                                    {processing
                                                        ? isSpanish
                                                            ? 'Enviando...'
                                                            : 'Sending...'
                                                        : isSpanish
                                                            ? 'Enviar mensaje'
                                                            : 'Send message'}
                                                </span>

                                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bee-yellow transition-transform duration-300 group-hover:translate-x-1">
                                                    <Send
                                                        size={15}
                                                        className="text-bee-dark"
                                                    />
                                                </span>
                                            </button>

                                            <p className="text-center text-[11px] leading-5 text-gray-400">
                                                {isSpanish
                                                    ? 'Al enviar este formulario, nuestro equipo podrá ponerse en contacto contigo.'
                                                    : 'By submitting this form, our team may contact you regarding your request.'}
                                            </p>

                                        </form>
                                    </div>
                                </div>

                                {/* Small availability note */}
                                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />

                                    {isSpanish
                                        ? 'Nuestro equipo está listo para ayudarte'
                                        : 'Our team is ready to help'}
                                </div>

                            </section>

                        </div>
                    </div>
                </main>

                {/* =========================================================
                    FOOTER
                ========================================================== */}
                <footer className="border-t-4 border-bee-yellow bg-bee-dark">
                    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

                        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">

                            {/* Brand */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
                                        <img
                                            src="/images/logo.png"
                                            alt="Beenear"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <span className="text-xl font-black tracking-tight text-white">
                                        BEENEAR
                                    </span>
                                </div>

                                <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
                                    {isSpanish
                                        ? 'Tecnología, innovación y soluciones digitales diseñadas para transformar negocios.'
                                        : 'Technology, innovation and digital solutions designed to transform businesses.'}
                                </p>
                            </div>

                            {/* Navigation */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bee-yellow">
                                    {isSpanish ? 'Navegación' : 'Navigation'}
                                </h3>

                                <div className="mt-5 space-y-3">
                                    <Link
                                        href="/"
                                        className="block text-sm text-gray-400 transition hover:text-white"
                                    >
                                        {isSpanish ? 'Inicio' : 'Home'}
                                    </Link>

                                    <Link
                                        href="/about"
                                        className="block text-sm text-gray-400 transition hover:text-white"
                                    >
                                        {isSpanish ? 'Nosotros' : 'About'}
                                    </Link>

                                    <Link
                                        href="/services"
                                        className="block text-sm text-gray-400 transition hover:text-white"
                                    >
                                        {isSpanish ? 'Servicios' : 'Services'}
                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="block text-sm text-white"
                                    >
                                        {isSpanish ? 'Contacto' : 'Contact'}
                                    </Link>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bee-yellow">
                                    {isSpanish ? 'Contacto' : 'Contact'}
                                </h3>

                                <div className="mt-5 space-y-4">

                                   <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=moreinfo@beenear.mx"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-bee-yellow hover:shadow-lg"
>
                                        <Mail
                                            size={16}
                                            className="mt-0.5 shrink-0 text-bee-yellow"
                                        />

                                        <span>moreinfo@beenear.mx</span>
                                    </a>

                                    <a
                                        href="tel:+12153180179"
                                        className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-white"
                                    >
                                        <Phone
                                            size={16}
                                            className="mt-0.5 shrink-0 text-bee-yellow"
                                        />

                                        <span>+1 (215) 318-0179</span>
                                    </a>

                                    <div className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                                        <MapPin
                                            size={16}
                                            className="mt-0.5 shrink-0 text-bee-yellow"
                                        />

                                        <span>
                                            Ejército Nacional 373
                                            <br />
                                            Granada, Miguel Hidalgo
                                            <br />
                                            CDMX, México
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Bottom */}
                        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                © {new Date().getFullYear()} Beenear.{' '}
                                {isSpanish
                                    ? 'Todos los derechos reservados.'
                                    : 'All rights reserved.'}
                            </p>

                            <div className="flex gap-5">
                                <a
                                    href="#"
                                    className="transition hover:text-gray-300"
                                >
                                    {isSpanish
                                        ? 'Privacidad'
                                        : 'Privacy'}
                                </a>

                                <a
                                    href="#"
                                    className="transition hover:text-gray-300"
                                >
                                    {isSpanish
                                        ? 'Términos'
                                        : 'Terms'}
                                </a>
                            </div>
                        </div>

                    </div>
                </footer>

            </div>
        </>
    );
}