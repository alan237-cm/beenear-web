import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import {
    ArrowLeft,
    ArrowUpRight,
    Bot,
    Headphones,
    Zap,
    BarChart3,
    Clock3,
} from 'lucide-react';

export default function BlogArticle({ id }) {

    const { i18n } = useTranslation();
    const isSpanish = i18n.language === 'es';

    const toggleLanguage = () => {
        i18n.changeLanguage(isSpanish ? 'en' : 'es');
    };

    /*
    |--------------------------------------------------------------------------
    | ARTÍCULOS
    |--------------------------------------------------------------------------
    */

    const articles = {

        1: {
            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',

            title: isSpanish
                ? '¿Cómo puede la inteligencia artificial mejorar la atención al cliente?'
                : 'How can artificial intelligence improve customer service?',

            date: '14 Sep 2026',

            icon: Bot,

            intro: isSpanish
                ? 'La inteligencia artificial está transformando la manera en que las empresas se relacionan con sus clientes. Desde respuestas más rápidas hasta procesos automatizados, la tecnología permite ofrecer experiencias más eficientes y personalizadas.'
                : 'Artificial intelligence is transforming the way companies interact with their customers. From faster responses to automated processes, technology enables more efficient and personalized experiences.',

            sections: isSpanish
                ? [
                    {
                        title: 'Una atención más rápida',
                        text: 'Los clientes esperan respuestas cada vez más rápidas. Las herramientas basadas en inteligencia artificial pueden ayudar a atender consultas frecuentes y proporcionar información de manera inmediata, reduciendo los tiempos de espera.'
                    },
                    {
                        title: 'Experiencias más personalizadas',
                        text: 'La inteligencia artificial permite analizar información de las conversaciones y utilizarla para comprender mejor las necesidades de cada cliente. Esto ayuda a ofrecer respuestas y soluciones más relacionadas con su situación.'
                    },
                    {
                        title: 'La tecnología trabaja junto con las personas',
                        text: 'La inteligencia artificial no necesariamente reemplaza al equipo humano. Puede encargarse de tareas repetitivas mientras los colaboradores se concentran en situaciones que requieren experiencia, criterio y atención personalizada.'
                    }
                ]
                : [
                    {
                        title: 'Faster customer service',
                        text: 'Customers expect faster responses. Artificial intelligence tools can help handle frequent questions and provide information immediately, reducing waiting times.'
                    },
                    {
                        title: 'More personalized experiences',
                        text: 'Artificial intelligence can analyze conversation data and use it to better understand each customer’s needs, helping provide more relevant responses and solutions.'
                    },
                    {
                        title: 'Technology working alongside people',
                        text: 'Artificial intelligence does not necessarily replace human teams. It can handle repetitive tasks while employees focus on situations that require experience and judgment.'
                    }
                ]
        },

        2: {
            category: isSpanish
                ? 'Atención al cliente'
                : 'Customer Service',

            title: isSpanish
                ? 'La atención al cliente también es parte de tu crecimiento'
                : 'Customer service is also part of your growth',

            date: '10 Sep 2026',

            icon: Headphones,

            intro: isSpanish
                ? 'Una conversación con un cliente puede ser mucho más que una simple interacción. Una buena experiencia puede fortalecer la relación con una empresa y convertirse en una oportunidad de crecimiento.'
                : 'A conversation with a customer can be much more than a simple interaction. A great experience can strengthen the relationship with a company and become an opportunity for growth.',

            sections: isSpanish
                ? [
                    {
                        title: 'Cada conversación cuenta',
                        text: 'La atención al cliente representa uno de los principales puntos de contacto entre una empresa y sus clientes. Cada llamada, mensaje o consulta puede influir en la percepción que una persona tiene de la marca.'
                    },
                    {
                        title: 'Escuchar también es una estrategia',
                        text: 'Comprender las necesidades y comentarios de los clientes permite detectar oportunidades de mejora y conocer mejor aquello que realmente valoran.'
                    },
                    {
                        title: 'Una buena experiencia genera confianza',
                        text: 'Cuando una empresa responde de manera clara, rápida y cercana, aumenta la posibilidad de construir relaciones duraderas con sus clientes.'
                    }
                ]
                : [
                    {
                        title: 'Every conversation matters',
                        text: 'Customer service is one of the main contact points between a company and its customers. Every call, message or inquiry can influence how people perceive a brand.'
                    },
                    {
                        title: 'Listening is also a strategy',
                        text: 'Understanding customer needs and feedback helps identify opportunities for improvement and discover what customers truly value.'
                    },
                    {
                        title: 'Great experiences build trust',
                        text: 'When a company responds clearly, quickly and personally, it becomes easier to build long-lasting customer relationships.'
                    }
                ]
        },

        3: {
            category: isSpanish
                ? 'Automatización'
                : 'Automation',

            title: isSpanish
                ? 'Automatiza procesos y deja que tu equipo se enfoque en lo importante'
                : 'Automate processes and let your team focus on what matters',

            date: '05 Sep 2026',

            icon: Zap,

            intro: isSpanish
                ? 'La automatización permite que las empresas reduzcan el tiempo dedicado a tareas repetitivas y concentren sus recursos en actividades que realmente generan valor.'
                : 'Automation allows companies to reduce the time spent on repetitive tasks and focus their resources on activities that create real value.',

            sections: isSpanish
                ? [
                    {
                        title: 'Menos tareas repetitivas',
                        text: 'Registrar información, organizar datos o realizar seguimientos constantemente puede consumir una gran cantidad de tiempo. Automatizar estos procesos ayuda a reducir trabajo manual.'
                    },
                    {
                        title: 'Procesos más consistentes',
                        text: 'Los procesos automatizados pueden seguir reglas definidas, ayudando a mantener una operación más organizada y consistente.'
                    },
                    {
                        title: 'Más tiempo para tu equipo',
                        text: 'Cuando la tecnología se encarga de determinadas tareas, las personas pueden dedicar más tiempo a atender clientes, resolver problemas y desarrollar nuevas oportunidades.'
                    }
                ]
                : [
                    {
                        title: 'Fewer repetitive tasks',
                        text: 'Recording information, organizing data and constantly following up can consume a significant amount of time. Automating these processes reduces manual work.'
                    },
                    {
                        title: 'More consistent processes',
                        text: 'Automated processes can follow predefined rules, helping maintain a more organized and consistent operation.'
                    },
                    {
                        title: 'More time for your team',
                        text: 'When technology handles certain tasks, people can spend more time helping customers, solving problems and developing new opportunities.'
                    }
                ]
        },

        4: {
            category: isSpanish
                ? 'Ventas'
                : 'Sales',

            title: isSpanish
                ? 'Cada contacto puede convertirse en una oportunidad'
                : 'Every contact can become an opportunity',

            date: '01 Sep 2026',

            icon: BarChart3,

            intro: isSpanish
                ? 'No todos los contactos se convierten inmediatamente en clientes. El seguimiento adecuado puede hacer la diferencia entre perder una oportunidad y construir una relación comercial.'
                : 'Not every contact immediately becomes a customer. Proper follow-up can make the difference between losing an opportunity and building a business relationship.',

            sections: isSpanish
                ? [
                    {
                        title: 'Conocer a tus prospectos',
                        text: 'Tener información organizada sobre cada contacto permite comprender mejor quién es, qué necesita y en qué etapa del proceso comercial se encuentra.'
                    },
                    {
                        title: 'El seguimiento es fundamental',
                        text: 'Una persona que hoy no está preparada para comprar puede convertirse en un cliente posteriormente. Mantener un seguimiento adecuado ayuda a no perder estas oportunidades.'
                    },
                    {
                        title: 'Datos para tomar mejores decisiones',
                        text: 'Registrar las interacciones comerciales permite identificar qué estrategias funcionan mejor y dónde existen oportunidades para mejorar.'
                    }
                ]
                : [
                    {
                        title: 'Know your prospects',
                        text: 'Organized information about each contact makes it easier to understand who they are, what they need and where they are in the sales process.'
                    },
                    {
                        title: 'Follow-up is essential',
                        text: 'Someone who is not ready to buy today may become a customer later. Proper follow-up helps prevent these opportunities from being lost.'
                    },
                    {
                        title: 'Data for better decisions',
                        text: 'Recording commercial interactions makes it possible to identify which strategies work best and where improvements can be made.'
                    }
                ]
        },

        5: {
            category: isSpanish
                ? 'Automatización'
                : 'Automation',

            title: isSpanish
                ? 'Menos tareas repetitivas, más tiempo para tu negocio'
                : 'Less repetitive work, more time for your business',

            date: '28 Ago 2026',

            icon: Clock3,

            intro: isSpanish
                ? 'La tecnología puede encargarse de procesos que consumen tiempo todos los días, permitiendo que los equipos se concentren en actividades más importantes para el negocio.'
                : 'Technology can handle processes that consume time every day, allowing teams to focus on activities that matter more to the business.',

            sections: isSpanish
                ? [
                    {
                        title: 'Identifica qué tareas consumen más tiempo',
                        text: 'Antes de automatizar es importante identificar las actividades repetitivas que ocupan una parte importante de la jornada laboral.'
                    },
                    {
                        title: 'Automatizar no significa complicar',
                        text: 'Una buena solución tecnológica debe facilitar el trabajo. La automatización debe integrarse de manera sencilla en los procesos existentes.'
                    },
                    {
                        title: 'Convierte tiempo en oportunidades',
                        text: 'Reducir tareas manuales permite dedicar más tiempo a los clientes, las ventas y el crecimiento de la empresa.'
                    }
                ]
                : [
                    {
                        title: 'Identify time-consuming tasks',
                        text: 'Before automating, it is important to identify repetitive activities that take up a significant part of the workday.'
                    },
                    {
                        title: 'Automation should not complicate things',
                        text: 'A good technology solution should make work easier. Automation should integrate naturally into existing processes.'
                    },
                    {
                        title: 'Turn time into opportunities',
                        text: 'Reducing manual tasks allows teams to spend more time with customers, sales and business growth.'
                    }
                ]
        },

        6: {
            category: isSpanish
                ? 'Inteligencia Artificial'
                : 'Artificial Intelligence',

            title: isSpanish
                ? 'El futuro de las conversaciones entre empresas y clientes'
                : 'The future of conversations between businesses and customers',

            date: '22 Ago 2026',

            icon: Bot,

            intro: isSpanish
                ? 'La manera en que las empresas se comunican con sus clientes está evolucionando. Nuevas tecnologías están permitiendo crear conversaciones más rápidas, inteligentes y conectadas.'
                : 'The way companies communicate with their customers is evolving. New technologies are enabling faster, smarter and more connected conversations.',

            sections: isSpanish
                ? [
                    {
                        title: 'Conversaciones más inteligentes',
                        text: 'Las nuevas herramientas permiten analizar conversaciones y obtener información que ayuda a comprender mejor las necesidades de los clientes.'
                    },
                    {
                        title: 'Tecnología disponible en todo momento',
                        text: 'Las soluciones digitales permiten mantener canales de comunicación disponibles durante más tiempo, facilitando que los clientes puedan interactuar cuando lo necesitan.'
                    },
                    {
                        title: 'El futuro será híbrido',
                        text: 'La combinación entre tecnología y atención humana permitirá crear experiencias más completas, donde cada una cumpla una función diferente.'
                    }
                ]
                : [
                    {
                        title: 'Smarter conversations',
                        text: 'New tools make it possible to analyze conversations and obtain information that helps better understand customer needs.'
                    },
                    {
                        title: 'Technology available around the clock',
                        text: 'Digital solutions allow communication channels to remain available for longer periods, making it easier for customers to interact when needed.'
                    },
                    {
                        title: 'The future will be hybrid',
                        text: 'Combining technology with human service will create more complete experiences, with each one serving a different purpose.'
                    }
                ]
        }
    };


    const article = articles[id] || articles[1];
    const Icon = article.icon;


    return (
        <>
            <Head title={`${article.title} | BeeNear`} />

            <div className="min-h-screen bg-[#f8f8f6] text-bee-dark">

                {/* =====================================================
                    NAVBAR
                ====================================================== */}

                <header className="absolute left-0 right-0 top-5 z-50 px-4">

                    <nav className="
                        mx-auto
                        flex
                        h-[72px]
                        max-w-7xl
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-white/20
                        bg-white/95
                        px-5
                        shadow-[0_15px_45px_rgba(0,0,0,0.10)]
                        backdrop-blur-xl
                        md:px-7
                    ">

                        {/* LOGO */}

                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                        >

                            <div className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-xl
                            ">
                                <img
                                    src="/images/logo.png"
                                    alt="BeeNear"
                                    className="
                                        h-full
                                        w-full
                                        object-contain
                                        transition-transform
                                        duration-300
                                        group-hover:scale-105
                                    "
                                />
                            </div>

                            <div className="leading-none">

                                <span className="
                                    block
                                    text-lg
                                    font-black
                                    tracking-tight
                                    text-bee-dark
                                ">
                                    BEENEAR
                                </span>

                                <span className="
                                    hidden
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.25em]
                                    text-gray-400
                                    sm:block
                                ">
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

                            <Link
                                href="/blog"
                                className="relative text-sm font-semibold text-bee-dark"
                            >
                                Blog

                                <span className="
                                    absolute
                                    -bottom-2
                                    left-0
                                    h-[2px]
                                    w-full
                                    rounded-full
                                    bg-bee-yellow
                                " />
                            </Link>

                            <div className="h-7 w-px bg-gray-200" />

                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className="
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-gray-600
                                    transition
                                    hover:border-bee-yellow
                                    hover:bg-yellow-50
                                "
                            >
                                {isSpanish ? 'EN' : 'ES'}
                            </button>

                            <Link
                                href="/contacto"
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-bee-yellow
                                    px-5
                                    py-3
                                    text-sm
                                    font-bold
                                    text-bee-dark
                                    shadow-sm
                                    transition
                                    hover:bg-yellow-400
                                "
                            >
                                {isSpanish ? 'Contacto' : 'Contact'}

                                <ArrowUpRight
                                    size={16}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-0.5
                                        group-hover:-translate-y-0.5
                                    "
                                />
                            </Link>

                        </div>

                    </nav>

                </header>


                {/* =====================================================
                    HERO DEL ARTÍCULO
                ====================================================== */}

                <section className="
                    relative
                    overflow-hidden
                    bg-bee-dark
                    pb-20
                    pt-44
                ">

                    <div className="
                        absolute
                        -right-32
                        -top-32
                        h-96
                        w-96
                        rounded-full
                        bg-bee-yellow/10
                        blur-3xl
                    " />

                    <div className="
                        absolute
                        -bottom-40
                        -left-40
                        h-96
                        w-96
                        rounded-full
                        bg-bee-yellow/10
                        blur-3xl
                    " />


                    <div className="
                        relative
                        mx-auto
                        max-w-5xl
                        px-6
                    ">

                        <Link
                            href="/blog"
                            className="
                                mb-8
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-gray-300
                                transition
                                hover:text-bee-yellow
                            "
                        >
                            <ArrowLeft size={17} />

                            {isSpanish
                                ? 'Volver al blog'
                                : 'Back to blog'
                            }
                        </Link>


                        <div className="mb-6 flex items-center gap-3">

                            <span className="
                                rounded-full
                                bg-bee-yellow
                                px-4
                                py-2
                                text-xs
                                font-black
                                text-bee-dark
                            ">
                                {article.category}
                            </span>

                            <span className="
                                text-xs
                                font-medium
                                text-gray-400
                            ">
                                {article.date}
                            </span>

                        </div>


                        <h1 className="
                            max-w-4xl
                            text-4xl
                            font-black
                            leading-[1.08]
                            tracking-tight
                            text-white
                            md:text-6xl
                        ">
                            {article.title}
                        </h1>


                        <p className="
                            mt-7
                            max-w-3xl
                            text-lg
                            leading-relaxed
                            text-gray-300
                            md:text-xl
                        ">
                            {article.intro}
                        </p>


                        {/* ICONO */}

                        <div className="
                            mt-10
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/10
                            backdrop-blur-md
                        ">
                            <Icon
                                size={38}
                                strokeWidth={1.5}
                                className="text-bee-yellow"
                            />
                        </div>

                    </div>

                </section>


                {/* =====================================================
                    CONTENIDO
                ====================================================== */}

                <main className="
                    mx-auto
                    max-w-4xl
                    px-6
                    py-16
                ">

                    <article className="
                        rounded-[1.75rem]
                        border
                        border-gray-200
                        bg-white
                        p-8
                        shadow-[0_10px_40px_rgba(35,31,32,0.06)]
                        md:p-12
                    ">

                        {article.sections.map((section, index) => (

                            <section
                                key={index}
                                className={`
                                    ${index !== 0 ? 'mt-12 border-t border-gray-100 pt-12' : ''}
                                `}
                            >

                                <div className="flex gap-5">

                                    <div className="
                                        hidden
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-bee-yellow
                                        text-sm
                                        font-black
                                        text-bee-dark
                                        sm:flex
                                    ">
                                        {index + 1}
                                    </div>


                                    <div>

                                        <h2 className="
                                            text-2xl
                                            font-black
                                            leading-tight
                                            text-bee-dark
                                            md:text-3xl
                                        ">
                                            {section.title}
                                        </h2>

                                        <p className="
                                            mt-4
                                            text-base
                                            leading-8
                                            text-gray-600
                                        ">
                                            {section.text}
                                        </p>

                                    </div>

                                </div>

                            </section>

                        ))}


                        {/* CIERRE */}

                        <div className="
                            mt-14
                            rounded-2xl
                            bg-[#fff8dc]
                            p-6
                        ">

                            <p className="
                                text-sm
                                font-semibold
                                leading-7
                                text-bee-dark
                            ">
                                {isSpanish
                                    ? 'En BeeNear creemos que la tecnología debe ayudar a las empresas a conectar mejor con sus clientes y a construir relaciones más eficientes.'
                                    : 'At BeeNear, we believe technology should help companies connect better with their customers and build more efficient relationships.'
                                }
                            </p>

                        </div>

                    </article>


                    {/* VOLVER */}

                    <div className="mt-10 text-center">

                        <Link
                            href="/blog"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-bee-dark
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:-translate-y-0.5
                                hover:bg-black
                            "
                        >
                            <ArrowLeft size={16} />

                            {isSpanish
                                ? 'Ver todos los artículos'
                                : 'View all articles'
                            }
                        </Link>

                    </div>

                </main>


                {/* =====================================================
                    CTA
                ====================================================== */}

                <section className="px-6 pb-16 pt-2">

                    <div className="
                        mx-auto
                        flex
                        max-w-6xl
                        flex-col
                        items-center
                        justify-between
                        gap-6
                        rounded-[1.75rem]
                        bg-bee-yellow
                        px-7
                        py-8
                        md:flex-row
                        md:px-10
                    ">

                        <div>

                            <p className="
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.25em]
                                text-bee-dark/60
                            ">
                                BeeNear
                            </p>

                            <h2 className="
                                mt-2
                                text-2xl
                                font-black
                                text-bee-dark
                                md:text-3xl
                            ">
                                {isSpanish
                                    ? '¿Quieres transformar la forma en que conectas con tus clientes?'
                                    : 'Want to transform the way you connect with your customers?'
                                }
                            </h2>

                        </div>


                        <Link
                            href="/contacto"
                            className="
                                group
                                flex
                                shrink-0
                                items-center
                                gap-3
                                rounded-xl
                                bg-bee-dark
                                px-7
                                py-4
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:-translate-y-1
                                hover:bg-black
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

                </section>


                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <footer className="
                    border-t
                    border-gray-200
                    bg-white
                ">

                    <div className="
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
                    ">

                        <p>
                            © {new Date().getFullYear()} BeeNear.{' '}
                            {isSpanish
                                ? 'Todos los derechos reservados.'
                                : 'All rights reserved.'
                            }
                        </p>

                        <div className="flex gap-6">

                            <Link
                                href="/"
                                className="transition hover:text-bee-dark"
                            >
                                {isSpanish ? 'Inicio' : 'Home'}
                            </Link>

                            <Link
                                href="/blog"
                                className="transition hover:text-bee-dark"
                            >
                                Blog
                            </Link>

                            <Link
                                href="/contacto"
                                className="transition hover:text-bee-dark"
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