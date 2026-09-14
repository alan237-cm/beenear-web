import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Bot,
    Headphones,
    Zap,
    BarChart3,
    Clock3,
    CheckCircle2,
    Lightbulb,
} from 'lucide-react';

export default function Show({ slug }) {
    const { i18n } = useTranslation();
    const isSpanish = i18n.language === 'es';

    const toggleLanguage = () => {
        i18n.changeLanguage(isSpanish ? 'en' : 'es');
    };

    const articles = {
        'inteligencia-artificial-atencion-cliente': {
            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',
            date: '14 Sep 2026',
            icon: Bot,

            title: isSpanish
                ? '¿Cómo puede la inteligencia artificial mejorar la atención al cliente?'
                : 'How can artificial intelligence improve customer service?',

            intro: isSpanish
                ? 'La inteligencia artificial está transformando la manera en que las empresas atienden, entienden y acompañan a sus clientes.'
                : 'Artificial intelligence is transforming the way companies serve, understand and support their customers.',

            sections: isSpanish
                ? [
                      {
                          title: 'Una atención más rápida',
                          text: 'Uno de los principales beneficios de incorporar inteligencia artificial en la atención al cliente es la posibilidad de responder de manera más rápida. Los sistemas inteligentes pueden ayudar a identificar solicitudes, organizar información y proporcionar respuestas sin que cada interacción tenga que comenzar desde cero.',
                      },
                      {
                          title: 'Más información para tomar decisiones',
                          text: 'Las conversaciones con los clientes contienen información valiosa. Analizar estas interacciones permite detectar necesidades, preguntas frecuentes y oportunidades de mejora que podrían pasar desapercibidas cuando la información se encuentra dispersa.',
                      },
                      {
                          title: 'Experiencias más personalizadas',
                          text: 'La tecnología también puede ayudar a adaptar las interacciones de acuerdo con el contexto de cada cliente. Esto permite que las empresas pasen de una atención completamente general a experiencias más relevantes.',
                      },
                      {
                          title: 'La tecnología no sustituye la conexión humana',
                          text: 'La inteligencia artificial puede automatizar y apoyar diferentes procesos, pero una buena experiencia también depende de las personas. El verdadero valor aparece cuando la tecnología permite que los equipos se concentren en las conversaciones que realmente necesitan atención humana.',
                      },
                  ]
                : [
                      {
                          title: 'Faster customer service',
                          text: 'One of the main benefits of incorporating artificial intelligence into customer service is the ability to respond faster. Intelligent systems can help identify requests, organize information and provide answers without every interaction having to start from scratch.',
                      },
                      {
                          title: 'More information for better decisions',
                          text: 'Customer conversations contain valuable information. Analyzing these interactions makes it possible to identify needs, frequently asked questions and improvement opportunities that could otherwise go unnoticed.',
                      },
                      {
                          title: 'More personalized experiences',
                          text: 'Technology can also help adapt interactions according to each customer’s context. This allows companies to move from completely generic service to more relevant experiences.',
                      },
                      {
                          title: 'Technology does not replace human connection',
                          text: 'Artificial intelligence can automate and support different processes, but a great experience also depends on people. The real value appears when technology allows teams to focus on conversations that truly require human attention.',
                      },
                  ],
        },

        'atencion-cliente-crecimiento': {
            category: isSpanish
                ? 'Atención al cliente'
                : 'Customer Service',
            date: '10 Sep 2026',
            icon: Headphones,

            title: isSpanish
                ? 'La atención al cliente también es parte de tu crecimiento'
                : 'Customer service is also part of your growth',

            intro: isSpanish
                ? 'La atención al cliente no termina cuando se concreta una venta. Cada conversación puede influir en la percepción que una persona tiene de una empresa.'
                : 'Customer service does not end when a sale is completed. Every conversation can influence how a person perceives a company.',

            sections: isSpanish
                ? [
                      {
                          title: 'Cada conversación cuenta',
                          text: 'Una pregunta, una solicitud o incluso una queja representan una oportunidad para conocer mejor a los clientes. Escuchar estas conversaciones permite detectar qué funciona y qué puede mejorar.',
                      },
                      {
                          title: 'La experiencia también vende',
                          text: 'Un producto puede llamar la atención de un cliente, pero la experiencia puede ser determinante para que decida continuar con una empresa. Una atención clara, rápida y consistente puede convertirse en una ventaja competitiva.',
                      },
                      {
                          title: 'Conectar atención y negocio',
                          text: 'Cuando la información de atención al cliente se conecta con los procesos comerciales, los equipos pueden tener una visión más completa de cada oportunidad y dar un seguimiento más adecuado.',
                      },
                      {
                          title: 'Convertir interacciones en oportunidades',
                          text: 'La atención al cliente puede convertirse en una fuente de crecimiento cuando las empresas aprovechan la información obtenida en cada interacción para mejorar sus procesos y construir relaciones a largo plazo.',
                      },
                  ]
                : [
                      {
                          title: 'Every conversation matters',
                          text: 'A question, request or even a complaint is an opportunity to better understand customers. Listening to these conversations helps identify what works and what can be improved.',
                      },
                      {
                          title: 'Experience also sells',
                          text: 'A product may attract a customer’s attention, but the experience can determine whether they choose to continue with a company. Clear, fast and consistent service can become a competitive advantage.',
                      },
                      {
                          title: 'Connecting service and business',
                          text: 'When customer service information is connected with commercial processes, teams can have a more complete view of each opportunity and provide better follow-up.',
                      },
                      {
                          title: 'Turning interactions into opportunities',
                          text: 'Customer service can become a source of growth when companies use the information obtained from every interaction to improve their processes and build long-term relationships.',
                      },
                  ],
        },

        'automatiza-procesos': {
            category: isSpanish ? 'Automatización' : 'Automation',
            date: '05 Sep 2026',
            icon: Zap,

            title: isSpanish
                ? 'Automatiza procesos y deja que tu equipo se enfoque en lo importante'
                : 'Automate processes and let your team focus on what matters',

            intro: isSpanish
                ? 'La automatización permite reducir tareas repetitivas y liberar tiempo para que los equipos puedan concentrarse en actividades de mayor valor.'
                : 'Automation can reduce repetitive tasks and free up time so teams can focus on higher-value activities.',

            sections: isSpanish
                ? [
                      {
                          title: 'Menos trabajo manual',
                          text: 'Registrar información, actualizar datos, organizar solicitudes y realizar seguimientos son actividades necesarias, pero muchas veces consumen una gran cantidad de tiempo. Automatizar estos procesos puede reducir el trabajo manual.',
                      },
                      {
                          title: 'Procesos más consistentes',
                          text: 'Cuando una tarea depende completamente de una persona, existe el riesgo de que se realice de manera diferente cada vez. La automatización ayuda a establecer procesos más consistentes y fáciles de supervisar.',
                      },
                      {
                          title: 'Información disponible cuando se necesita',
                          text: 'Un proceso automatizado puede ayudar a mantener la información organizada y disponible para las personas que necesitan consultarla. Esto facilita el seguimiento y la toma de decisiones.',
                      },
                      {
                          title: 'Automatizar con propósito',
                          text: 'No todo proceso necesita automatización. El objetivo debe ser identificar aquellas actividades repetitivas que realmente generan carga operativa y utilizar la tecnología para hacerlas más eficientes.',
                      },
                  ]
                : [
                      {
                          title: 'Less manual work',
                          text: 'Recording information, updating data, organizing requests and following up are necessary activities, but they can consume a significant amount of time. Automating these processes can reduce manual work.',
                      },
                      {
                          title: 'More consistent processes',
                          text: 'When a task depends entirely on a person, it may be performed differently each time. Automation helps establish processes that are more consistent and easier to supervise.',
                      },
                      {
                          title: 'Information available when needed',
                          text: 'An automated process can help keep information organized and available to the people who need it. This makes follow-up and decision-making easier.',
                      },
                      {
                          title: 'Automate with purpose',
                          text: 'Not every process needs automation. The goal should be to identify repetitive activities that create operational workload and use technology to make them more efficient.',
                      },
                  ],
        },

        'cada-contacto-oportunidad': {
            category: isSpanish ? 'Ventas' : 'Sales',
            date: '01 Sep 2026',
            icon: BarChart3,

            title: isSpanish
                ? 'Cada contacto puede convertirse en una oportunidad'
                : 'Every contact can become an opportunity',

            intro: isSpanish
                ? 'Tener muchos contactos no garantiza buenos resultados. La diferencia está en cómo una empresa organiza, entiende y da seguimiento a cada oportunidad.'
                : 'Having many contacts does not guarantee good results. The difference lies in how a company organizes, understands and follows up on each opportunity.',

            sections: isSpanish
                ? [
                      {
                          title: 'Conocer a cada prospecto',
                          text: 'Contar con información organizada permite entender quién es cada prospecto, de dónde llegó y qué tipo de necesidad puede tener. Esto facilita que los equipos comerciales prioricen mejor sus esfuerzos.',
                      },
                      {
                          title: 'El seguimiento hace la diferencia',
                          text: 'Una oportunidad puede perderse simplemente porque no recibió seguimiento en el momento adecuado. Registrar actividades y mantener una visión clara de cada contacto ayuda a evitar que las oportunidades se pierdan.',
                      },
                      {
                          title: 'Datos para mejorar las ventas',
                          text: 'La información acumulada en un proceso comercial puede revelar patrones. Saber qué fuentes generan mejores prospectos o qué etapas tienen más abandono permite tomar decisiones con mayor fundamento.',
                      },
                      {
                          title: 'De contactos a relaciones',
                          text: 'Un CRM no debería limitarse a almacenar nombres y teléfonos. Su verdadero valor está en ayudar a construir un historial que permita entender la relación con cada cliente y prospecto.',
                      },
                  ]
                : [
                      {
                          title: 'Understand every prospect',
                          text: 'Organized information makes it possible to understand who each prospect is, where they came from and what kind of need they may have. This helps sales teams prioritize their efforts.',
                      },
                      {
                          title: 'Follow-up makes the difference',
                          text: 'An opportunity can be lost simply because it did not receive follow-up at the right time. Recording activities and maintaining a clear view of each contact helps prevent opportunities from being forgotten.',
                      },
                      {
                          title: 'Data to improve sales',
                          text: 'Information collected throughout a sales process can reveal patterns. Knowing which sources generate better prospects or which stages have higher drop-off rates supports better decisions.',
                      },
                      {
                          title: 'From contacts to relationships',
                          text: 'A CRM should not be limited to storing names and phone numbers. Its real value is helping build a history that makes it possible to understand the relationship with each customer and prospect.',
                      },
                  ],
        },

        'menos-tareas-repetitivas': {
            category: isSpanish ? 'Automatización' : 'Automation',
            date: '28 Ago 2026',
            icon: Clock3,

            title: isSpanish
                ? 'Menos tareas repetitivas, más tiempo para tu negocio'
                : 'Less repetitive work, more time for your business',

            intro: isSpanish
                ? 'El tiempo de un equipo es uno de los recursos más importantes de cualquier empresa. Reducir tareas repetitivas puede liberar espacio para actividades que generan mayor valor.'
                : 'A team’s time is one of the most valuable resources in any company. Reducing repetitive tasks can create more room for activities that generate greater value.',

            sections: isSpanish
                ? [
                      {
                          title: 'Identificar lo repetitivo',
                          text: 'El primer paso es observar las actividades que se realizan constantemente: copiar información, actualizar registros, enviar avisos o consultar diferentes sistemas para obtener un mismo dato.',
                      },
                      {
                          title: 'La tecnología como apoyo',
                          text: 'Las herramientas digitales pueden encargarse de determinadas tareas siguiendo reglas previamente establecidas. Esto permite que las personas intervengan cuando realmente se necesita criterio o atención.',
                      },
                      {
                          title: 'Más tiempo para el equipo',
                          text: 'Reducir tareas operativas no significa trabajar menos, sino dedicar más tiempo a actividades que requieren creatividad, análisis, comunicación y toma de decisiones.',
                      },
                      {
                          title: 'Pequeñas mejoras, grandes cambios',
                          text: 'No siempre es necesario transformar toda una operación de una sola vez. Automatizar pequeños procesos puede generar mejoras acumulativas y ayudar a construir una operación más eficiente.',
                      },
                  ]
                : [
                      {
                          title: 'Identify repetitive work',
                          text: 'The first step is observing activities that are performed constantly: copying information, updating records, sending notifications or checking different systems for the same piece of data.',
                      },
                      {
                          title: 'Technology as support',
                          text: 'Digital tools can handle certain tasks according to predefined rules. This allows people to step in when judgment or personal attention is actually needed.',
                      },
                      {
                          title: 'More time for the team',
                          text: 'Reducing operational tasks does not mean working less. It means spending more time on activities that require creativity, analysis, communication and decision-making.',
                      },
                      {
                          title: 'Small improvements, big changes',
                          text: 'It is not always necessary to transform an entire operation at once. Automating small processes can create cumulative improvements and help build a more efficient operation.',
                      },
                  ],
        },

        'futuro-conversaciones-empresas-clientes': {
            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',
            date: '22 Ago 2026',
            icon: Bot,

            title: isSpanish
                ? 'El futuro de las conversaciones entre empresas y clientes'
                : 'The future of conversations between businesses and customers',

            intro: isSpanish
                ? 'Las conversaciones están en el centro de cualquier relación comercial. La tecnología está cambiando la manera en que estas interacciones se gestionan, analizan y aprovechan.'
                : 'Conversations are at the center of every business relationship. Technology is changing how these interactions are managed, analyzed and used.',

            sections: isSpanish
                ? [
                      {
                          title: 'Conversaciones que generan información',
                          text: 'Cada interacción contiene señales sobre las necesidades, dudas e intereses de una persona. Las nuevas herramientas permiten analizar estas señales y convertir conversaciones en información útil para el negocio.',
                      },
                      {
                          title: 'Más canales, una misma experiencia',
                          text: 'Los clientes pueden comunicarse mediante diferentes canales. El reto consiste en mantener una experiencia coherente independientemente del medio utilizado.',
                      },
                      {
                          title: 'Inteligencia aplicada a las conversaciones',
                          text: 'La inteligencia artificial puede ayudar a clasificar interacciones, identificar intenciones y detectar información relevante. Esto abre nuevas posibilidades para mejorar tanto la atención como los procesos comerciales.',
                      },
                      {
                          title: 'La conexión sigue siendo lo más importante',
                          text: 'La tecnología puede facilitar las conversaciones, pero el objetivo final continúa siendo conectar mejor con las personas. Las herramientas tienen valor cuando ayudan a construir experiencias más útiles, claras y humanas.',
                      },
                  ]
                : [
                      {
                          title: 'Conversations that generate information',
                          text: 'Every interaction contains signals about a person’s needs, questions and interests. New tools make it possible to analyze these signals and turn conversations into useful business information.',
                      },
                      {
                          title: 'More channels, one experience',
                          text: 'Customers can communicate through different channels. The challenge is maintaining a consistent experience regardless of the medium used.',
                      },
                      {
                          title: 'Intelligence applied to conversations',
                          text: 'Artificial intelligence can help classify interactions, identify intent and detect relevant information. This opens new possibilities for improving both customer service and commercial processes.',
                      },
                      {
                          title: 'Connection remains the most important thing',
                          text: 'Technology can make conversations easier, but the ultimate goal remains connecting better with people. Tools create value when they help build experiences that are more useful, clear and human.',
                      },
                  ],
        },
    };

    const article = articles[slug];

    if (!article) {
        return (
            <>
                <Head title="Artículo no encontrado | BeeNear" />

                <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-6">
                    <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-bee-dark">
                            <span className="text-3xl font-black text-bee-yellow">
                                ?
                            </span>
                        </div>

                        <h1 className="mt-7 text-3xl font-black text-bee-dark">
                            {isSpanish
                                ? 'Artículo no encontrado'
                                : 'Article not found'}
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-gray-500">
                            {isSpanish
                                ? 'El artículo que buscas no existe o ya no está disponible.'
                                : 'The article you are looking for does not exist or is no longer available.'}
                        </p>

                        <Link
                            href="/blog"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-bee-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-black"
                        >
                            <ArrowLeft size={17} />

                            {isSpanish
                                ? 'Volver al blog'
                                : 'Back to blog'}
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const Icon = article.icon;

    return (
        <>
            <Head title={`${article.title} | BeeNear`} />

            <div className="min-h-screen bg-[#f8f8f6] text-bee-dark">
                {/* =====================================================
                    NAVBAR
                ====================================================== */}

                <header className="absolute left-0 right-0 top-5 z-50 px-4">
                    <nav
                        aria-label="Main navigation"
                        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/95 px-5 shadow-[0_15px_45px_rgba(0,0,0,0.10)] backdrop-blur-xl md:px-7"
                    >
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

                            <Link
                                href="/blog"
                                className="relative text-sm font-semibold text-bee-dark"
                            >
                                Blog

                                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-bee-yellow" />
                            </Link>

                            <div className="h-7 w-px bg-gray-200" />

                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 transition hover:border-bee-yellow hover:bg-yellow-50 hover:text-bee-dark"
                            >
                                {isSpanish ? 'EN' : 'ES'}
                            </button>

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
                    HERO DEL ARTÍCULO
                ====================================================== */}

                <section className="relative overflow-hidden bg-bee-dark pb-20 pt-40 md:pb-24 md:pt-44">
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-bee-yellow/10 blur-3xl" />

                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

                    <div className="relative mx-auto max-w-5xl px-6">
                        <Link
                            href="/blog"
                            className="group mb-10 inline-flex items-center gap-2 text-sm font-bold text-gray-300 transition hover:text-bee-yellow"
                        >
                            <ArrowLeft
                                size={17}
                                className="transition-transform duration-300 group-hover:-translate-x-1"
                            />

                            {isSpanish
                                ? 'Volver al blog'
                                : 'Back to blog'}
                        </Link>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-bee-yellow px-4 py-2 text-xs font-black text-bee-dark">
                                {article.category}
                            </span>

                            <span className="text-xs font-medium text-gray-400">
                                {article.date}
                            </span>
                        </div>

                        <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                            {article.title}
                        </h1>

                        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
                            {article.intro}
                        </p>
                    </div>
                </section>

                {/* =====================================================
                    CONTENIDO
                ====================================================== */}

                <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
                        {/* CONTENIDO PRINCIPAL */}

                        <article>
                            <div className="mb-12 flex items-center justify-center rounded-[2rem] bg-bee-dark p-10 shadow-[0_20px_60px_rgba(0,0,0,0.10)] md:p-16">
                                <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md md:h-40 md:w-40">
                                    <Icon
                                        size={70}
                                        strokeWidth={1.4}
                                        className="text-bee-yellow md:h-20 md:w-20"
                                    />
                                </div>
                            </div>

                            <div className="rounded-[2rem] bg-white p-7 shadow-[0_10px_40px_rgba(35,31,32,0.06)] md:p-12">
                                <div className="mb-10 border-b border-gray-100 pb-8">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff4c9]">
                                            <Lightbulb
                                                size={20}
                                                className="text-bee-dark"
                                            />
                                        </span>

                                        <p className="text-sm font-bold text-gray-500">
                                            {isSpanish
                                                ? 'Ideas BeeNear'
                                                : 'BeeNear Insights'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    {article.sections.map((section, index) => (
                                        <section key={index}>
                                            <div className="mb-4 flex items-start gap-4">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bee-dark text-sm font-black text-bee-yellow">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0'
                                                    )}
                                                </span>

                                                <h2 className="text-2xl font-black leading-tight text-bee-dark md:text-3xl">
                                                    {section.title}
                                                </h2>
                                            </div>

                                            <p className="pl-0 text-base leading-8 text-gray-600 md:pl-[52px] md:text-lg">
                                                {section.text}
                                            </p>
                                        </section>
                                    ))}
                                </div>

                                {/* FRASE FINAL */}

                                <div className="mt-14 rounded-2xl bg-[#fff8dc] p-7 md:p-8">
                                    <div className="flex gap-4">
                                        <CheckCircle2
                                            size={24}
                                            className="mt-1 shrink-0 text-bee-dark"
                                        />

                                        <p className="text-base font-semibold leading-7 text-bee-dark md:text-lg">
                                            {isSpanish
                                                ? 'La tecnología tiene mayor valor cuando ayuda a las empresas a conectar mejor con las personas.'
                                                : 'Technology creates greater value when it helps companies connect better with people.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* SIDEBAR */}

                        <aside className="lg:sticky lg:top-28 lg:h-fit">
                            <div className="rounded-[1.5rem] bg-bee-dark p-7 text-white shadow-[0_15px_45px_rgba(0,0,0,0.10)]">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-bee-yellow">
                                    <Icon
                                        size={25}
                                        className="text-bee-dark"
                                    />
                                </div>

                                <p className="text-xs font-black uppercase tracking-[0.2em] text-bee-yellow">
                                    BeeNear Blog
                                </p>

                                <h3 className="mt-3 text-xl font-black leading-tight">
                                    {isSpanish
                                        ? 'Tecnología que conecta'
                                        : 'Technology that connects'}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-gray-300">
                                    {isSpanish
                                        ? 'Ideas para entender cómo la tecnología puede transformar la relación entre empresas y clientes.'
                                        : 'Ideas to understand how technology can transform the relationship between businesses and customers.'}
                                </p>

                                <Link
                                    href="/contacto"
                                    className="group mt-7 flex items-center justify-between rounded-xl bg-bee-yellow px-5 py-4 text-sm font-black text-bee-dark transition hover:bg-yellow-400"
                                >
                                    {isSpanish
                                        ? 'Hablemos'
                                        : "Let's talk"}

                                    <ArrowUpRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </main>

                {/* =====================================================
                    CTA
                ====================================================== */}

                <section className="px-6 pb-16 pt-2">
                    <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-bee-yellow px-7 py-9 md:px-10 md:py-10">
                        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-3xl">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-bee-dark/60">
                                    BeeNear
                                </p>

                                <h2 className="text-2xl font-black leading-tight tracking-tight text-bee-dark md:text-3xl">
                                    {isSpanish
                                        ? '¿Quieres transformar la forma en que conectas con tus clientes?'
                                        : 'Want to transform the way you connect with your customers?'}
                                </h2>
                            </div>

                            <Link
                                href="/contacto"
                                className="group flex h-14 shrink-0 items-center justify-center gap-3 rounded-xl bg-bee-dark px-7 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-black"
                            >
                                {isSpanish ? 'Hablemos' : "Let's talk"}

                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <footer className="border-t border-gray-200 bg-white">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">
                        <p className="text-center md:text-left">
                            © {new Date().getFullYear()} BeeNear.{' '}
                            {isSpanish
                                ? 'Todos los derechos reservados.'
                                : 'All rights reserved.'}
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="transition-colors hover:text-bee-dark"
                            >
                                {isSpanish ? 'Inicio' : 'Home'}
                            </Link>

                            <Link
                                href="/blog"
                                className="transition-colors hover:text-bee-dark"
                            >
                                Blog
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