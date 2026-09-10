import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // NAV
      "nav_home": "Home",
      "nav_about": "About Us",
      "nav_services": "Services",
      "nav_blog": "Blog",
      "nav_contact": "Contact",

      // HERO HOME
      "hero_title_1": "The Professional Contact Center",
      "hero_title_2": "to boost your",
      "hero_title_highlight": "growth",
      "hero_desc": "We integrate human talent and AI automation to accelerate your sales and improve your customer service.",
      "hero_btn": "Discover Solutions",

      // MARQUEE SERVICES
      "serv_cs": "Customer Service",
      "serv_is": "Intake Sales",
      "serv_it": "IT Development",
      "serv_loyalty": "Loyalty & Retention",
      "serv_pa": "Virtual PA",

      // BUSINESS PORTFOLIO GLOBALS
      "portfolio_title": "Business Portfolio",
      "portfolio_desc": "We offer specialized solutions tailored to your business needs.",
      "btn_more_info": "More Info!",
      "btn_quote": "Get a Quote",

      // CONTACT CENTER PORTFOLIO (CARDS)
      "cc_title": "Contact Center Portfolio",
      "cc_item1": "Customer Service",
      "cc_item2": "Pre & Post-Sales",
      "cc_item3": "Sales & Collections",
      "cc_item4": "Virtual PA",
      "cc_item5": "IT Development",

      // INTAKE SALES PORTFOLIO (CARDS)
      "is_title": "Intake Sales Portfolio",
      "is_item1": "Re Purchase & Loyalty",
      "is_item2": "Promotions & Referrals",
      "is_item3": "Retention & Collection",
      "is_item4": "Lead Nurturing",
      "is_item5": "Existing Customer Engagement",

      // INTAKE SALES - DETAILS PAGE
      "is_hero_desc": "Transforming prospective customers into paying clients through AI and human expertise.",
      "is_what_title": "What is Intake Sales?",
      "is_what_desc": "The client intake process typically involves four key stages: acquiring and nurturing leads, qualifying leads, onboarding clients, and managing client relationships.",
      "is_quote": '"We use a combined structure in which people and A.I. are involved according to your campaign needs."',
      "is_lead_gen_title": "Lead Generation & Administration",
      "is_lead_gen_desc": "Maintaining an existing client is more cost-effective than acquiring a new one.",
      
      "is_process_title": "Our Process",
      "is_proc_1_title": "1. Defining Campaign",
      "is_proc_1_desc": "Setting the objectives and target audience.",
      "is_proc_2_title": "2. Configure A.I.",
      "is_proc_2_desc": "Deploying automation tools for data handling.",
      "is_proc_3_title": "3. Massive Prospecting",
      "is_proc_3_desc": "Reaching out to a broad qualified audience.",
      "is_proc_4_title": "4. Personalized Prospecting",
      "is_proc_4_desc": "Human interaction for high-value targets.",
      "is_proc_5_title": "5. Prospect Qualification",
      "is_proc_5_desc": "Filtering leads based on conversion probability.",
      "is_proc_6_title": "6. Lead Delivery",
      "is_proc_6_desc": "Handing over sales-ready prospects.",

      "is_massive_title": 'How is "Massive Prospecting" managed?',
      "is_mass_1_title": "1. Artificial Intelligence",
      "is_mass_1_desc": "Our proposed strategy entails utilizing A.I. to streamline the challenging aspects of the campaign. We then identify the recipients who have shown interest and initiate contact to foster further engagement.",
      "is_mass_2_title": "2. Email & Texting",
      "is_mass_2_desc": "We utilize the most frequently used communication platforms or those mutually agreed upon with our clients to convey the intended message effectively.",
      "is_mass_3_title": "3. Human Interaction",
      "is_mass_3_desc": "Lastly, we will connect with the prospect/client via a telephone campaign to ensure all the information has been accurately conveyed.",

      "is_charge_title": "Charging Structure",
      "is_charge_1_title": "Implementation",
      "is_charge_1_desc": "Allocate a nominal yet symbolic budget to schedule the campaign's start, accounting for the learning curve, corrections, and follow-up.",
      "is_charge_2_title": "Commissions",
      "is_charge_2_desc": "The monitoring process will commence immediately after the implementation period concludes. It will be an ongoing process, subject to a commission-based structure.",

      // CONTACT CENTER - DETAILS PAGE
      "cc_hero_desc": "Professional remote support combining human expertise and A.I. to play a pivotal role in your business triumphs.",
      "cc_goal_title": "Our Goal & Vision",
      "cc_goal_p1": "Our goal is to play a pivotal role in the economic and professional triumphs of our clients, investors, and partners.",
      "cc_goal_p2": "Our remote contact center typically offers services such as phone, email, and chat support to customers on behalf of our clients.",
      "cc_stat_rot": "Rotation Rate",
      "cc_stat_perf": "Avg. Performance",
      "cc_stat_sav": "Savings by operating nearshore",
      
      "cc_differ_title": "How we differ",
      "cc_diff_1_title": "1. Shared Risk",
      "cc_diff_1_desc": "We create a combined business structure that compromises us to align with your sales and quality objectives.",
      "cc_diff_2_title": "2. Adaptable & Scalable",
      "cc_diff_2_li1": "• It does not matter what your business is.",
      "cc_diff_2_li2": "• It does not matter what your scale is.",
      "cc_diff_2_li3": "• It does not matter what your time zone is.",
      "cc_diff_2_end": "We can make it happen!",
      "cc_diff_3_title": "3. Stability (0% Rotation)",
      "cc_diff_3_desc": "Believe it or not, our collaborators stay for longer periods compared to regular contact centers, ensuring consistent quality and deep project knowledge.",

      // ABOUT US PAGE (EN)
      "about_hero_title": "About Us",
      "about_hero_desc": "Connecting users, companies, and clients through technology and deep empathy.",
      "about_mission_title": "Our Mission",
      "about_mission_desc": "To provide Contact Center solutions with the firm objective of exceeding our clients' expectations by delivering high-quality services. Our Nearshoring strategy, focused on 100% remote work, allows us to connect users, companies, and clients through technology and deep empathy, creating and strengthening solid and lasting relationships.",
      "about_vision_title": "Our Vision",
      "about_vision_desc": "To lead (be the first and best option in) the Contact Center services industry globally, eliminating geographical barriers, trusting in the benefits of remote work as a fundamental pillar of our operation. We envision a future where Bee Near is synonymous with quality, efficiency, performance, and closeness, contributing to the sustainable growth of companies worldwide, being a disruptive agent in the industry.",
      "about_values_title": "Our Values",
      "val_1": "Coherence",
      "val_2": "Integrity",
      "val_3": "Truthfulness",
      "val_4": "Certainty",
      "val_5": "Cooperativeness",
      "val_6": "Organization",
      "val_7": "Assertiveness",

      // CONTACT PAGE (EN)
      "contact_hero_title": "Contact Us",
      "contact_hero_desc": "Ready to scale your business? Let's talk.",
      "contact_info_title": "Get in Touch",
      "contact_location": "Location",
      "contact_phone": "Phone",
      "contact_email": "Email",
      "form_name": "Full Name",
      "form_email": "Email Address",
      "form_phone": "Phone Number",
      "form_company": "Company",
      "form_message": "How can we help you?",
      "form_submit": "Send Message",

      // FOOTER (EN)
      "footer_desc": "Connecting users, companies, and clients through technology and deep empathy.",
      "footer_links": "Quick Links",
      "footer_contact": "Contact",
      "footer_rights": "All rights reserved.",
      "footer_privacy": "Privacy Policy",

      // NEW HOME SECTIONS (EN)
      "hero_check_1": "Professional solutions",
      "hero_check_2": "Business focus",
      "hero_scroll": "SCROLL TO EXPLORE",
      
      "home_tech_pretitle": "BEE NEAR",
      "home_tech_title_1": "Technology with a ",
      "home_tech_title_highlight": "business vision.",
      "home_tech_desc": "We help organizations transform their processes through technological solutions, strategy, and specialized services.",
      
      "home_card1_title": "Solutions",
      "home_card1_desc": "Approaches designed for the specific needs of each organization.",
      
      "home_card2_title": "Results",
      "home_card2_desc": "Technology oriented to generate value and growth for our clients.",
      
      "home_cta_subtitle": "READY TO START?",
      "home_cta_title_1": "Let's make technology ",
      "home_cta_title_highlight": "work for you.",
      "home_cta_desc": "Explore our solutions and discover how Bee Near can help boost your organization.",

      // NEW ABOUT US SECTIONS (EN)
      "about_who_we_are": "WHO WE ARE",
      "about_direction_pretitle": "OUR DIRECTION",
      "about_direction_title_1": "A clear vision to ",
      "about_direction_title_highlight": "transform.",
      "about_values_desc": "The principles that guide our way of working, collaborating, and generating value.",
      "about_cta_title_1": "Let's build something ",
      "about_cta_title_highlight": "extraordinary.",
      "about_cta_desc": "Learn about our solutions and discover how we can help you achieve your goals.",

      // SERVICES PAGE (EN)
      "services_hero_title": "Business Portfolio",
      "services_hero_desc": "We offer specialized solutions tailored to your business needs.",
      "services_hero_scroll": "OUR SOLUTIONS",
      
      "services_what_pretitle": "WHAT WE DO",
      "services_what_title_1": "Solutions designed to ",
      "services_what_title_highlight": "grow your business.",
      
      "srv_card1_title": "Contact Center Portfolio",
      "srv_card1_desc": "We offer specialized solutions tailored to your business needs.",
      "srv_card1_item1": "Customer Service",
      "srv_card1_item2": "Pre & Post-Sales",
      "srv_card1_item3": "Sales & Collections",
      "srv_card1_item4": "Virtual PA",
      "srv_card1_item5": "IT Development",
      "srv_card_btn": "More Info!",
      
      "srv_card2_title": "Intake Sales Portfolio",
      "srv_card2_desc": "We offer specialized solutions tailored to your business needs.",
      "srv_card2_item1": "Re Purchase & Loyalty",
      "srv_card2_item2": "Promotions & Referrals",
      "srv_card2_item3": "Retention & Collection",
      "srv_card2_item4": "Lead Nurturing",
      "srv_card2_item5": "Existing Customer Engagement",
      
      "services_why_pretitle": "WHY BEE NEAR",
      "services_why_title_1": "Technology and talent ",
      "services_why_title_highlight": "working together.",
      "services_why_desc": "We combine people, processes, and technology to create solutions that truly generate results for our clients.",
      
      "srv_blackcard_title": "Business Solutions",
      "srv_blackcard_item1": "Human talent",
      "srv_blackcard_item2": "Automation",
      "srv_blackcard_item3": "Artificial Intelligence",
      "srv_blackcard_result": "Business growth",
      
      "services_cta_title_1": "Ready to take your business ",
      "services_cta_title_highlight": "to the next level?",
      "services_cta_desc": "Let's talk about how our solutions can help you achieve your goals."
    }
  },
  es: {
    translation: {
      // NAV
      "nav_home": "Inicio",
      "nav_about": "Nosotros",
      "nav_services": "Servicios",
      "nav_blog": "Blog",
      "nav_contact": "Contacto",

      // HERO HOME
      "hero_title_1": "El Contact Center Profesional",
      "hero_title_2": "para impulsar tu",
      "hero_title_highlight": "crecimiento",
      "hero_desc": "Integramos talento humano y automatización con Inteligencia Artificial para acelerar tus ventas y mejorar tu atención al cliente.",
      "hero_btn": "Conocer Soluciones",

      // MARQUEE SERVICES
      "serv_cs": "Atención al Cliente",
      "serv_is": "Ventas Intake",
      "serv_it": "Desarrollo TI",
      "serv_loyalty": "Lealtad y Retención",
      "serv_pa": "Asistente Virtual",

      // BUSINESS PORTFOLIO GLOBALS
      "portfolio_title": "Portafolio de Negocios",
      "portfolio_desc": "Ofrecemos soluciones especializadas adaptadas a las necesidades de tu empresa.",
      "btn_more_info": "¡Más Información!",
      "btn_quote": "Cotizar ahora",

      // CONTACT CENTER PORTFOLIO (CARDS)
      "cc_title": "Portafolio Contact Center",
      "cc_item1": "Atención al Cliente",
      "cc_item2": "Pre y Post Venta",
      "cc_item3": "Ventas y Cobranza",
      "cc_item4": "Asistente Virtual (PA)",
      "cc_item5": "Desarrollo de TI",

      // INTAKE SALES PORTFOLIO (CARDS)
      "is_title": "Portafolio Ventas Intake",
      "is_item1": "Recompra y Lealtad",
      "is_item2": "Promociones y Referidos",
      "is_item3": "Retención y Cobranza",
      "is_item4": "Maduración de Leads",
      "is_item5": "Interacción con Clientes",

      // INTAKE SALES - DETAILS PAGE
      "is_hero_desc": "Transformando clientes potenciales en clientes reales a través de Inteligencia Artificial y talento humano.",
      "is_what_title": "¿Qué es Intake Sales?",
      "is_what_desc": "El proceso de admisión de clientes incluye cuatro etapas clave: adquisición y maduración de leads, calificación, incorporación de clientes y gestión de relaciones.",
      "is_quote": '"Utilizamos una estructura combinada en la que el talento humano y la I.A. se involucran según las necesidades de tu campaña."',
      "is_lead_gen_title": "Generación y Administración de Leads",
      "is_lead_gen_desc": "Mantener un cliente existente es más rentable que adquirir uno nuevo.",
      
      "is_process_title": "Nuestro Proceso",
      "is_proc_1_title": "1. Definición de Campaña",
      "is_proc_1_desc": "Establecimiento de objetivos y público meta.",
      "is_proc_2_title": "2. Configurar I.A.",
      "is_proc_2_desc": "Despliegue de herramientas de automatización para el manejo de datos.",
      "is_proc_3_title": "3. Prospección Masiva",
      "is_proc_3_desc": "Alcance inicial a una audiencia calificada amplia.",
      "is_proc_4_title": "4. Prospección Personalizada",
      "is_proc_4_desc": "Interacción humana para prospectos de alto valor.",
      "is_proc_5_title": "5. Calificación de Prospectos",
      "is_proc_5_desc": "Filtrado de leads basado en probabilidad de conversión.",
      "is_proc_6_title": "6. Entrega de Leads",
      "is_proc_6_desc": "Entrega de prospectos listos para cerrar la venta.",

      "is_massive_title": '¿Cómo se gestiona la "Prospección Masiva"?',
      "is_mass_1_title": "1. Inteligencia Artificial",
      "is_mass_1_desc": "Nuestra estrategia utiliza I.A. para optimizar los aspectos desafiantes de la campaña. Identificamos a quienes han mostrado interés e iniciamos contacto para fomentar la interacción.",
      "is_mass_2_title": "2. Email y SMS",
      "is_mass_2_desc": "Utilizamos las plataformas de comunicación más frecuentes o aquellas acordadas con nuestros clientes para transmitir el mensaje de manera efectiva.",
      "is_mass_3_title": "3. Interacción Humana",
      "is_mass_3_desc": "Finalmente, conectamos con el prospecto mediante una campaña telefónica para asegurar que toda la información ha sido comprendida con exactitud.",

      "is_charge_title": "Estructura de Cobro",
      "is_charge_1_title": "Implementación",
      "is_charge_1_desc": "Asignación de un presupuesto simbólico para arrancar la campaña, contemplando la curva de aprendizaje y correcciones.",
      "is_charge_2_title": "Comisiones",
      "is_charge_2_desc": "El proceso de monitoreo y cobro a éxito comienza inmediatamente después del periodo de implementación, basado en las ventas generadas.",

      // CONTACT CENTER - DETAILS PAGE
      "cc_hero_desc": "Soporte remoto profesional que combina el talento humano y la I.A. para jugar un rol fundamental en el triunfo de tu empresa.",
      "cc_goal_title": "Nuestra Meta y Visión",
      "cc_goal_p1": "Nuestro objetivo es jugar un rol fundamental en los triunfos económicos y profesionales de nuestros clientes, inversores y socios.",
      "cc_goal_p2": "Nuestro contact center remoto ofrece servicios de soporte telefónico, correo y chat. Utilizamos una estructura que combina talento humano e I.A. según las necesidades de tu campaña.",
      "cc_stat_rot": "Tasa de Rotación",
      "cc_stat_perf": "Rendimiento Promedio",
      "cc_stat_sav": "Ahorro al operar vía nearshore",
      
      "cc_differ_title": "Nuestros Diferenciadores",
      "cc_diff_1_title": "1. Riesgo Compartido",
      "cc_diff_1_desc": "Creamos una estructura de negocio combinada que nos compromete a alinearnos con tus objetivos de calidad y ventas.",
      "cc_diff_2_title": "2. Adaptable y Escalable",
      "cc_diff_2_li1": "• No importa a qué se dedique tu negocio.",
      "cc_diff_2_li2": "• No importa tu escala de operaciones.",
      "cc_diff_2_li3": "• No importa tu zona horaria.",
      "cc_diff_2_end": "¡Nosotros lo hacemos posible!",
      "cc_diff_3_title": "3. Estabilidad (0% Rotación)",
      "cc_diff_3_desc": "Nuestros colaboradores permanecen por periodos mucho más largos en comparación con los contact centers regulares, asegurando calidad y conocimiento profundo del proyecto.",

      // ABOUT US PAGE (ES)
      "about_hero_title": "Nosotros",
      "about_hero_desc": "Conectando usuarios, empresas y clientes a través de la tecnología y mucha empatía.",
      "about_mission_title": "Nuestra Misión",
      "about_mission_desc": "Proporcionar soluciones de Contact Center, con el firme objetivo de superar las expectativas de nuestros clientes, brindando servicios de alta calidad. Nuestra estrategia de Nearshoring, enfocado al trabajo 100% remoto, nos permiten conectar a usuarios, empresas y clientes; a través de la tecnología y mucha empatía, creando y fortaleciendo relaciones sólidas y duraderas.",
      "about_vision_title": "Nuestra Visión",
      "about_vision_desc": "Liderar (Ser la primera y mejor opción) de la industria de servicios de Contact Center globalmente, eliminando barreras geográficas, confiando en las bondades y beneficios del trabajo remoto como un pilar fundamental de nuestra operación. Visualizamos un futuro en el que Bee Near sea sinónimo de calidad, eficiencia, desempeño y cercanía, contribuyendo al crecimiento sostenible de empresas en todo el mundo, siendo un agente disruptivo en la industria.",
      "about_values_title": "Nuestros Valores",
      "val_1": "Coherencia",
      "val_2": "Integridad",
      "val_3": "Veracidad",
      "val_4": "Certeza",
      "val_5": "Cooperatividad",
      "val_6": "Organización",
      "val_7": "Asertividad",

      // CONTACT PAGE (ES)
      "contact_hero_title": "Contáctanos",
      "contact_hero_desc": "¿Listo para escalar tu negocio? Hablemos.",
      "contact_info_title": "Información de Contacto",
      "contact_location": "Ubicación",
      "contact_phone": "Teléfono",
      "contact_email": "Correo Electrónico",
      "form_name": "Nombre Completo",
      "form_email": "Correo Electrónico",
      "form_phone": "Número de Teléfono",
      "form_company": "Empresa",
      "form_message": "¿En qué te podemos ayudar?",
      "form_submit": "Enviar Mensaje",

      // FOOTER (ES)
      "footer_desc": "Conectando usuarios, empresas y clientes a través de la tecnología y mucha empatía.",
      "footer_links": "Enlaces Rápidos",
      "footer_contact": "Contacto",
      "footer_rights": "Todos los derechos reservados.",
      "footer_privacy": "Aviso de Privacidad",

      // NEW HOME SECTIONS (ES)
      "hero_check_1": "Soluciones profesionales",
      "hero_check_2": "Enfoque empresarial",
      "hero_scroll": "DESLIZA PARA EXPLORAR",
      
      "home_tech_pretitle": "BEE NEAR",
      "home_tech_title_1": "Tecnología con una visión ",
      "home_tech_title_highlight": "empresarial.",
      "home_tech_desc": "Ayudamos a las organizaciones a transformar sus procesos mediante soluciones tecnológicas, estrategia y servicios especializados.",
      
      "home_card1_title": "Soluciones",
      "home_card1_desc": "Enfoques diseñados para las necesidades específicas de cada organización.",
      
      "home_card2_title": "Resultados",
      "home_card2_desc": "Tecnología orientada a generar valor y crecimiento para nuestros clientes.",
      
      "home_cta_subtitle": "¿LISTO PARA COMENZAR?",
      "home_cta_title_1": "Hagamos que la tecnología ",
      "home_cta_title_highlight": "trabaje para ti.",
      "home_cta_desc": "Conoce nuestras soluciones y descubre cómo Bee Near puede ayudar a impulsar tu organización.",

      // NEW ABOUT US SECTIONS (ES)
      "about_who_we_are": "QUIÉNES SOMOS",
      "about_direction_pretitle": "NUESTRO RUMBO",
      "about_direction_title_1": "Una visión clara para ",
      "about_direction_title_highlight": "transformar.",
      "about_values_desc": "Los principios que guían nuestra forma de trabajar, colaborar y generar valor.",
      "about_cta_title_1": "Construyamos algo ",
      "about_cta_title_highlight": "extraordinario.",
      "about_cta_desc": "Conoce nuestras soluciones y descubre cómo podemos ayudarte a alcanzar tus objetivos.",

      // SERVICES PAGE (ES)
      "services_hero_title": "Portafolio de Negocios",
      "services_hero_desc": "Ofrecemos soluciones especializadas adaptadas a las necesidades de tu negocio.",
      "services_hero_scroll": "NUESTRAS SOLUCIONES",
      
      "services_what_pretitle": "QUÉ HACEMOS",
      "services_what_title_1": "Soluciones diseñadas para ",
      "services_what_title_highlight": "hacer crecer tu negocio.",
      
      "srv_card1_title": "Portafolio Contact Center",
      "srv_card1_desc": "Ofrecemos soluciones especializadas adaptadas a las necesidades de tu negocio.",
      "srv_card1_item1": "Atención al Cliente",
      "srv_card1_item2": "Pre y Post Venta",
      "srv_card1_item3": "Ventas y Cobranza",
      "srv_card1_item4": "Asistente Virtual",
      "srv_card1_item5": "Desarrollo TI",
      "srv_card_btn": "¡Más Info!",
      
      "srv_card2_title": "Portafolio Intake Sales",
      "srv_card2_desc": "Ofrecemos soluciones especializadas adaptadas a las necesidades de tu negocio.",
      "srv_card2_item1": "Recompra y Lealtad",
      "srv_card2_item2": "Promociones y Referidos",
      "srv_card2_item3": "Retención y Cobranza",
      "srv_card2_item4": "Nutrición de Leads",
      "srv_card2_item5": "Interacción con Clientes",
      
      "services_why_pretitle": "POR QUÉ BEE NEAR",
      "services_why_title_1": "Tecnología y talento ",
      "services_why_title_highlight": "trabajando juntos.",
      "services_why_desc": "Combinamos personas, procesos y tecnología para crear soluciones que realmente generen resultados para nuestros clientes.",
      
      "srv_blackcard_title": "Soluciones de Negocio",
      "srv_blackcard_item1": "Talento humano",
      "srv_blackcard_item2": "Automatización",
      "srv_blackcard_item3": "Inteligencia Artificial",
      "srv_blackcard_result": "Crecimiento empresarial",
      
      "services_cta_title_1": "¿Listo para llevar tu negocio ",
      "services_cta_title_highlight": "al siguiente nivel?",
      "services_cta_desc": "Hablemos sobre cómo nuestras soluciones pueden ayudarte a alcanzar tus objetivos."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Aquí controlas el idioma actual (es = Español, en = Inglés)
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;