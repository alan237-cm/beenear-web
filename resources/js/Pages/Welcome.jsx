import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check,
  CircleHelp, Globe2, Headphones, Menu, Mic2,
  ShieldCheck, Sparkles, X, Zap, Server, Network, TrendingDown,
} from 'lucide-react';

/*
 * BEE NEAR / ATELIER EDITION
 * --------------------------------------------
 * Refined executive landing page. No new npm packages.
 * Required: React, @inertiajs/react, react-i18next, lucide-react.
 * Replace: resources/js/Pages/Welcome.jsx
 *
 * COMI: This is a visual preview, not a WebRTC integration.
 * Wallboard: Illustrative data, explicitly marked as simulated.
 */

const CONTENT = {
  en: {
    nav: ['Solutions', 'The model', 'About us', 'Insights'],
    contact: 'Let’s talk', language: 'Language',
    eyebrow: 'THE NEW STANDARD IN CUSTOMER OPERATIONS',
    heroA: 'AI-Powered', heroB: 'Contact Center', heroC: '& Intake Sales',
    heroD: 'That Drive Real Results',
    heroLead: 'We pair Conversational AI with elite remote human talent to handle your customer support, cold prospecting, and full sales intake—with zero operational headaches.',
    demo: 'Talk with COMI in Live Demo', how: 'Discover our model',
    scroll: 'SCROLL TO EXPLORE', signal: 'INTELLIGENCE IN EVERY INTERACTION',
    heroMicro: 'Made for businesses that expect more.',
    visualDemo: 'VISUAL DEMONSTRATION', control: 'OPERATIONS / OVERVIEW',
    first: 'AI First Contact', human: 'Human Intake Sales & Support', queue: 'In Queue / On Hold',
    interactions: 'CALLS HANDLED BY COMI AI', qualified: 'QUALIFIED HUMAN TRANSFERS', instant: 'ILLUSTRATIVE QUEUE',
    signalLabel: 'CONVERSATION ENGINE', signalState: 'VOICE ACTIVITY SIMULATION',
    operators: 'ORCHESTRATION LAYERS', simulated: 'Illustrative metrics — not live production data',
    ticker: ['CONVERSATIONAL VOICE AI', 'BPO NEARSHORING', 'INTELLIGENT CUSTOMER CARE', 'AI SALES INTAKE', 'HUMAN + AI OPERATIONS', 'OMNICHANNEL SERVICE'],
    introIndex: '01 / A DIFFERENT APPROACH',
    introLead: 'Technology should make every human connection', introHighlight: 'more valuable.',
    introCopy: 'AI takes the first conversation. Your people take it further. One connected operation, designed around your business—not the other way around.',
    introTag1: 'IMMEDIATE RESPONSE', introTag2: 'HUMAN JUDGMENT', introTag3: 'CONNECTED CONTEXT',
    solutionsIndex: '02 / OUR EXPERTISE', solutionsTitle: 'Two engines.', solutionsTitle2: 'One ambition.',
    solutionsLead: 'Two Tailored Operational Solutions Built for Growth',
    solutionsCopy: 'Whether you need flawless customer care or a proactive sales machine, our hybrid human + AI model adapts to your workflow.',
    careLabel: 'EXPERIENCE / 01', careTitle: 'Intelligent Contact Center Operations',
    careTag: 'Customer Support, Collections & Care — Enhanced by AI',
    careCopy: 'Keep your customers happy and your operational costs down. COMI AI manages high-volume initial contact, routine queries, and balance checks 24/7. When empathy, negotiation, or complex problem-solving is needed, your dedicated remote human team steps in seamlessly—ensuring continuous service.',
    carePoints: [
      ['24/7 First-Line Support', 'Instant assistance for repetitive customer queries via Voice & WhatsApp.'],
      ['Resilient Remote Operations', 'Distributed teams support operational continuity.'],
      ['Smart Collections & Retention', 'AI handles reminders and routes complex cases to human negotiators.'],
    ],
    salesLabel: 'GROWTH / 02', salesTitle: 'Proactive “Intake Sales” Engine',
    salesTag: 'From Cold Prospecting to Closed Deals — End-to-End Sales Pipeline',
    salesCopy: 'Turn cold databases into qualified, ready-to-buy prospects. COMI AI supports outbound prospecting, filters unproductive contacts, and conducts initial qualifying conversations. When interest is detected, the call can be transferred to a dedicated human sales closer with context on screen.',
    salesPoints: [
      ['AI Outbound Prospecting', 'Automated outreach helps qualify interest at scale.'],
      ['Live Warm Transfers', 'Human closers receive qualified leads and call context.'],
      ['Full Pipeline Management', 'Track the journey from first contact to deal closure.'],
    ],
    exploreCare: 'Explore contact center', exploreSales: 'Explore intake sales',
    infrastructureIndex: '03 / PROPRIETARY BPO INFRASTRUCTURE',
    infrastructureHeading: 'Built on In-House Tech & Real Operational Resilience',
    infrastructureLead: "We don't rely on third-party software. Our proprietary platform provides seamless service availability and eliminates traditional BPO bottlenecks.",
    infrastructureCaption: 'FOUR PILLARS. ONE CONNECTED OPERATION.',
    infrastructureScope: 'INFRASTRUCTURE / RELIABILITY / EFFICIENCY',
    infrastructureReview: 'Performance figures supplied for review. Confirm SLA evidence and savings methodology before publication.',
    infrastructurePillars: [
      {
        index: '01', code: 'AI / FIRST CONTACT', metric: '100%',
        title: '100% AI Availability',
        copy: "Our Conversational AI doesn't face absenteeism or sudden turn-over. First-contact queries stay covered 24/7/365 without missing a beat.",
        foot: 'VOICE INTELLIGENCE / 24·7·365',
      },
      {
        index: '02', code: 'PLATFORM / IN-HOUSE', metric: 'IN-HOUSE',
        title: 'Proprietary Platform',
        copy: 'Co-developed with young engineering talent from UTTEC. Fully customized software, avoiding third-party licensing dependencies.',
        foot: 'UTTEC / CO-DEVELOPMENT',
      },
      {
        index: '03', code: 'NETWORK / CONTINUITY', metric: '93%+',
        title: '93%+ Operational Uptime',
        copy: 'A 100% remote, decentralized model means power or internet outages affect isolated nodes, never the whole contact center.',
        foot: 'REMOTE / DISTRIBUTED NODES',
      },
      {
        index: '04', code: 'OPERATIONS / EFFICIENCY', metric: 'UP TO 40%',
        title: 'Up to 40% Cost Savings',
        copy: 'Reduce overhead, recruitment expenses, and physical site maintenance by leveraging our hybrid BPO model.',
        foot: 'HYBRID BPO / COST CONTROL',
      },
    ],
    howIndex: '04 / THE BEE NEAR METHOD', howTitle: 'One fluid journey.', howTitle2: 'No disconnected moments.',
    steps: [
      ['01', 'COMI opens the conversation', 'Conversational AI manages initial interactions and identifies what matters.'],
      ['02', 'Intelligence finds the right path', 'Relevant context is organized so the next action feels effortless.'],
      ['03', 'Humans make the difference', 'Your remote specialists step in when expertise, empathy or closing power is needed.'],
    ],
    bridgeOverline: 'THE HUMAN + AI ADVANTAGE',
    bridgeTitle: 'The best technology still knows when to be human.',
    bridgeDesc: 'AI for scale. People for nuance. One team focused on better outcomes.',
    closingEyebrow: 'YOUR NEXT CONVERSATION STARTS HERE',
    closingTitle: 'Think bigger.', closingTitle2: 'Sound closer.',
    closingDesc: 'Build the customer experience and sales operation your next stage of growth deserves.',
    closingCta: 'Build with Bee Near',
    footerLine: 'AI-powered interactions. Human-centered outcomes.',
    footerSolutions: 'SOLUTIONS', footerCompany: 'COMPANY', footerReach: 'GET IN TOUCH',
    privacy: 'Privacy policy', rights: 'All rights reserved.',
    modalLabel: 'COMI / VOICE EXPERIENCE', modalTitle: 'Meet COMI.',
    modalCopy: 'The live browser voice integration is being connected. The interface on this page is a visual preview—not an active AI call.',
    modalButton: 'Request a COMI demonstration', modalCancel: 'Back to the site',
    preview: 'PREVIEW MODE', noLive: 'Live voice connection pending',
  },
  es: {
    nav: ['Soluciones', 'El modelo', 'Nosotros', 'Blog'],
    contact: 'Hablemos', language: 'Idioma',
    eyebrow: 'EL NUEVO ESTÁNDAR EN OPERACIONES CON CLIENTES',
    heroA: 'Contact Center', heroB: 'con IA', heroC: 'y ventas inteligentes',
    heroD: 'que generan resultados',
    heroLead: 'Combinamos IA conversacional y talento humano remoto para atender a tus clientes, realizar prospección y gestionar todo el proceso comercial, sin complicaciones operativas.',
    demo: 'Conoce la demo de COMI', how: 'Descubre el modelo',
    scroll: 'DESLIZA PARA EXPLORAR', signal: 'INTELIGENCIA EN CADA INTERACCIÓN',
    heroMicro: 'Para empresas que esperan más.',
    visualDemo: 'DEMOSTRACIÓN VISUAL', control: 'OPERACIONES / RESUMEN',
    first: 'Primer contacto con IA', human: 'Ventas y atención humana', queue: 'En espera',
    interactions: 'LLAMADAS ATENDIDAS POR COMI', qualified: 'TRANSFERENCIAS A HUMANOS', instant: 'COLA ILUSTRATIVA',
    signalLabel: 'MOTOR DE CONVERSACIONES', signalState: 'SIMULACIÓN DE ACTIVIDAD DE VOZ',
    operators: 'CAPAS DE ORQUESTACIÓN', simulated: 'Datos ilustrativos; no corresponden a operaciones en vivo',
    ticker: ['IA CONVERSACIONAL DE VOZ', 'NEARSHORING BPO', 'ATENCIÓN INTELIGENTE', 'VENTAS CON IA', 'OPERACIONES HUMANAS + IA', 'SERVICIO OMNICANAL'],
    introIndex: '01 / OTRO ENFOQUE',
    introLead: 'La tecnología debe hacer cada conexión humana', introHighlight: 'más valiosa.',
    introCopy: 'La IA inicia la conversación. Tu equipo la lleva más lejos. Una operación conectada, diseñada alrededor de tu negocio y no al revés.',
    introTag1: 'RESPUESTA INMEDIATA', introTag2: 'CRITERIO HUMANO', introTag3: 'CONTEXTO CONECTADO',
    solutionsIndex: '02 / NUESTRA EXPERIENCIA', solutionsTitle: 'Dos motores.', solutionsTitle2: 'Una ambición.',
    solutionsLead: 'Dos soluciones operativas diseñadas para crecer',
    solutionsCopy: 'Ya sea que necesites atención al cliente o una operación comercial proactiva, nuestro modelo híbrido de talento humano e IA se adapta a tu negocio.',
    careLabel: 'EXPERIENCIA / 01', careTitle: 'Operaciones de Contact Center Inteligente',
    careTag: 'Atención, soporte y cobranza potenciados con IA',
    careCopy: 'Mantén satisfechos a tus clientes y controla tus costos operativos. COMI AI atiende contactos iniciales, consultas frecuentes y verificaciones de saldo las 24 horas. Cuando se requiere empatía, negociación o resolver problemas complejos, interviene tu equipo humano remoto para dar continuidad al servicio.',
    carePoints: [
      ['Atención inicial 24/7', 'Respuestas a consultas repetitivas mediante voz y WhatsApp.'],
      ['Operación remota resiliente', 'Equipos distribuidos que favorecen la continuidad operativa.'],
      ['Cobranza y retención inteligente', 'Recordatorios automatizados y canalización de casos complejos.'],
    ],
    salesLabel: 'CRECIMIENTO / 02', salesTitle: 'Motor proactivo de “Intake Sales”',
    salesTag: 'De la prospección al cierre de ventas',
    salesCopy: 'Convierte bases de prospectos en oportunidades calificadas. COMI AI apoya la prospección, identifica contactos poco productivos y lleva a cabo las conversaciones iniciales. Cuando detecta interés, puede transferir la llamada a un ejecutivo con el contexto disponible en pantalla.',
    salesPoints: [
      ['Prospección con IA', 'Automatiza contactos iniciales y ayuda a detectar el interés.'],
      ['Transferencias en vivo', 'Los ejecutivos reciben prospectos calificados y su contexto.'],
      ['Gestión del embudo', 'Seguimiento desde el primer contacto hasta el cierre.'],
    ],
    exploreCare: 'Explorar Contact Center', exploreSales: 'Explorar Intake Sales',
    infrastructureIndex: '03 / INFRAESTRUCTURA BPO PROPIETARIA',
    infrastructureHeading: 'Tecnología propia y resiliencia operativa real',
    infrastructureLead: 'Nuestra plataforma desarrollada internamente favorece la disponibilidad del servicio y reduce las limitaciones de los modelos tradicionales de BPO.',
    infrastructureCaption: 'CUATRO PILARES. UNA OPERACIÓN CONECTADA.',
    infrastructureScope: 'INFRAESTRUCTURA / FIABILIDAD / EFICIENCIA',
    infrastructureReview: 'Métricas proporcionadas para revisión. Validar indicadores de disponibilidad y cálculos de ahorro antes de publicar.',
    infrastructurePillars: [
      {
        index: '01', code: 'IA / PRIMER CONTACTO', metric: '100%',
        title: '100% de disponibilidad de IA',
        copy: 'Nuestra IA conversacional no tiene ausencias ni rotación de personal. Las consultas de primer contacto pueden atenderse las 24 horas, los 365 días del año.',
        foot: 'VOZ INTELIGENTE / 24·7·365',
      },
      {
        index: '02', code: 'PLATAFORMA / DESARROLLO PROPIO', metric: 'IN-HOUSE',
        title: 'Plataforma propietaria',
        copy: 'Codesarrollada con jóvenes talentos de ingeniería de la UTTEC. Software personalizado que evita la dependencia de licencias de terceros.',
        foot: 'UTTEC / CODESARROLLO',
      },
      {
        index: '03', code: 'RED / CONTINUIDAD', metric: '93%+',
        title: '93%+ de disponibilidad operativa',
        copy: 'El modelo remoto y descentralizado permite que cortes locales de energía o internet afecten a nodos aislados, no a todo el centro de contacto.',
        foot: 'NODOS / DISTRIBUIDOS',
      },
      {
        index: '04', code: 'OPERACIÓN / EFICIENCIA', metric: 'HASTA 40%',
        title: 'Hasta 40% de ahorro en costos',
        copy: 'Reduce gastos generales, contratación y mantenimiento de instalaciones con nuestro modelo híbrido de BPO.',
        foot: 'BPO HÍBRIDO / CONTROL DE COSTOS',
      },
    ],
    howIndex: '04 / EL MÉTODO BEE NEAR', howTitle: 'Un solo recorrido.', howTitle2: 'Sin desconexiones.',
    steps: [
      ['01', 'COMI inicia la conversación', 'La IA conversacional gestiona las primeras interacciones e identifica lo importante.'],
      ['02', 'La inteligencia define el camino', 'La información relevante se organiza para facilitar el siguiente paso.'],
      ['03', 'Las personas marcan la diferencia', 'Los especialistas intervienen cuando se necesita experiencia, empatía o cerrar una venta.'],
    ],
    bridgeOverline: 'LA VENTAJA DE HUMANOS + IA',
    bridgeTitle: 'La mejor tecnología sabe cuándo dejar hablar a las personas.',
    bridgeDesc: 'IA para escalar. Personas para entender. Un equipo para obtener mejores resultados.',
    closingEyebrow: 'TU PRÓXIMA CONVERSACIÓN COMIENZA AQUÍ',
    closingTitle: 'Piensa en grande.', closingTitle2: 'Conecta más cerca.',
    closingDesc: 'Construye la experiencia de atención y la operación comercial que merece la siguiente etapa de crecimiento de tu negocio.',
    closingCta: 'Crecer con Bee Near',
    footerLine: 'Interacciones con IA. Resultados centrados en las personas.',
    footerSolutions: 'SOLUCIONES', footerCompany: 'EMPRESA', footerReach: 'CONTACTO',
    privacy: 'Aviso de privacidad', rights: 'Todos los derechos reservados.',
    modalLabel: 'COMI / EXPERIENCIA DE VOZ', modalTitle: 'Conoce a COMI.',
    modalCopy: 'Estamos conectando la integración de voz en el navegador. Esta interfaz es una demostración visual; todavía no realiza llamadas reales con IA.',
    modalButton: 'Solicitar demostración de COMI', modalCancel: 'Volver al sitio',
    preview: 'MODO VISTA PREVIA', noLive: 'Conexión de voz pendiente',
  },
};

/*
 * Visual model of COMI routing, not a connection to a live backend.
 * Keep stage descriptions bilingual and modify them here if the product changes.
 */
const ORCHESTRATION_STAGES = {
  en: [
    {
      code: '01', label: 'COMI Core', short: 'FIRST CONTACT',
      title: 'The conversation begins with intelligence.',
      description: 'COMI welcomes incoming conversations and detects intent before the next step is determined.',
      details: ['Voice intake', 'Intent detection', 'Initial context'],
      route: 'INBOUND / COMI', result: 'INTENT RECEIVED',
    },
    {
      code: '02', label: 'Decision Engine', short: 'SMART ROUTING',
      title: 'Every conversation takes the right route.',
      description: 'Context and routing rules determine whether a request can be handled automatically or needs specialized support.',
      details: ['Qualification', 'Routing rules', 'Prioritization'],
      route: 'COMI / ROUTING', result: 'NEXT ACTION SELECTED',
    },
    {
      code: '03', label: 'Live Handoff', short: 'HUMAN EXPERTISE',
      title: 'A human touch, precisely when it matters.',
      description: 'Complex conversations can be handed to a specialist with relevant context, so the experience stays connected.',
      details: ['Call context', 'Warm transfer', 'Human support'],
      route: 'ROUTING / HUMAN', result: 'CONTEXT TRANSFERRED',
    },
    {
      code: '04', label: 'Outcome Stream', short: 'FOLLOW-THROUGH',
      title: 'From interaction to a clear next step.',
      description: 'Structured outcomes support follow-up, customer service and sales processes across the operation.',
      details: ['Next action', 'Follow-up', 'Traceability'],
      route: 'HUMAN + AI / CRM', result: 'OUTCOME READY',
    },
  ],
  es: [
    {
      code: '01', label: 'Núcleo COMI', short: 'PRIMER CONTACTO',
      title: 'Cada conversación comienza con inteligencia.',
      description: 'COMI recibe las conversaciones e identifica la intención antes de definir el siguiente paso.',
      details: ['Atención por voz', 'Detección de intención', 'Contexto inicial'],
      route: 'ENTRADA / COMI', result: 'INTENCIÓN DETECTADA',
    },
    {
      code: '02', label: 'Motor de decisión', short: 'ENRUTAMIENTO',
      title: 'Cada conversación encuentra su camino.',
      description: 'El contexto y las reglas permiten determinar si una solicitud se resuelve automáticamente o necesita atención especializada.',
      details: ['Calificación', 'Reglas de atención', 'Priorización'],
      route: 'COMI / DECISIÓN', result: 'SIGUIENTE PASO DEFINIDO',
    },
    {
      code: '03', label: 'Transferencia humana', short: 'CRITERIO HUMANO',
      title: 'Intervención humana cuando realmente aporta.',
      description: 'Las conversaciones complejas pueden transferirse a un especialista con el contexto necesario para mantener la continuidad.',
      details: ['Contexto de llamada', 'Transferencia guiada', 'Atención humana'],
      route: 'DECISIÓN / HUMANO', result: 'CONTEXTO TRANSFERIDO',
    },
    {
      code: '04', label: 'Resultados conectados', short: 'SEGUIMIENTO',
      title: 'De cada interacción a una acción concreta.',
      description: 'Los resultados estructurados facilitan el seguimiento, la atención y las operaciones comerciales.',
      details: ['Siguiente acción', 'Seguimiento', 'Trazabilidad'],
      route: 'HUMANO + IA / CRM', result: 'RESULTADO REGISTRABLE',
    },
  ],
};

const WAVE = [16, 27, 20, 37, 26, 12, 42, 31, 18, 43, 29, 15, 35, 50, 26, 19, 39, 24, 48, 28, 13, 32, 44, 21, 35, 49, 19, 26, 41, 30, 18, 37, 25, 46, 20, 33, 12, 31, 22, 39, 17, 27, 44, 25, 18, 32, 22, 12];

function BeeSymbol({ small = false }) {
  return (
    <span className={`bn-symbol ${small ? 'bn-symbol--small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 38 40" fill="none">
        <path d="M18.9 2 3 11.1v17.8L18.9 38 35 28.9V11.1L18.9 2Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M19 3v34M3.5 11.5 35 29M35 11.5 3.5 29" stroke="currentColor" strokeWidth="1.3" opacity=".7" />
        <circle cx="19" cy="20" r="5.2" fill="currentColor" />
      </svg>
    </span>
  );
}

function Eyebrow({ children, light = false }) {
  return <div className={`bn-eyebrow ${light ? 'bn-eyebrow--light' : ''}`}><span className="bn-eyebrow-line" />{children}</div>;
}

function SectionReveal({ children, className = '' }) {
  const element = useRef(null);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      node.classList.add('bn-visible');
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('bn-visible');
        obs.unobserve(node);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -35px 0px' });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return <div ref={element} className={`bn-reveal ${className}`}>{children}</div>;
}

function CountMetric({ value, label, numberStyle = '' }) {
  const [display, setDisplay] = useState(0);
  const holder = useRef(null);
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const animate = () => {
      if (started) return;
      started = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const duration = 1250;
      const step = (now) => {
        const fraction = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - fraction) ** 4;
        setDisplay(Math.round(value * eased));
        if (fraction < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { animate(); return () => cancelAnimationFrame(raf); }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { animate(); observer.disconnect(); }
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return (
    <div className="bn-metric" ref={holder}>
      <strong className={`bn-metric-number ${numberStyle}`}>{display.toLocaleString('en-US')}</strong>
      <span className="bn-metric-label">{label}</span>
    </div>
  );
}

function Waveform({ compact = false }) {
  return (
    <div className={`bn-wave ${compact ? 'bn-wave--compact' : ''}`} aria-hidden="true">
      {WAVE.map((height, i) => (
        <span key={i} style={{ '--bar-h': `${height}px`, '--delay': `${(i % 13) * -0.12}s` }} />
      ))}
    </div>
  );
}

function OrbitGraphic() {
  return (
    <div className="bn-orbit" aria-hidden="true">
      <div className="bn-orbit-halo" />
      <div className="bn-orbit-ring bn-orbit-ring--outer" />
      <div className="bn-orbit-ring bn-orbit-ring--middle" />
      <div className="bn-orbit-ring bn-orbit-ring--inner" />
      <div className="bn-orbit-sweep" />
      <div className="bn-orbit-core"><BeeSymbol small /><span>COMI</span><small>AI ENGINE</small></div>
      <div className="bn-orbit-node bn-orbit-node--a" />
      <div className="bn-orbit-node bn-orbit-node--b" />
      <span className="bn-orbit-coord bn-orbit-coord--a">VOICE / AI</span>
      <span className="bn-orbit-coord bn-orbit-coord--b">HUMAN / INTAKE</span>
    </div>
  );
}

function ControlDeck({ c, spanish }) {
  const stages = spanish ? ORCHESTRATION_STAGES.es : ORCHESTRATION_STAGES.en;
  const [activeStep, setActiveStep] = useState(0);
  const selected = stages[activeStep];

  return (
    <div className="bn-deck" aria-label={c.control}>
      <div className="bn-deck-top">
        <div className="bn-deck-title"><span className="bn-deck-dot" /><span>{c.control}</span></div>
        <span className="bn-simulation-pill"><span className="bn-pulse-dot" />{c.visualDemo}</span>
      </div>
      <div className="bn-deck-visual">
        <div className="bn-deck-gridlines" />
        <OrbitGraphic />
        <div className="bn-visual-side"><span>01 / 03</span><span>VOICE ORCHESTRATION</span></div>
      </div>
      <div className="bn-deck-metrics">
        <CountMetric value={1420} label={c.first} />
        <CountMetric value={380} label={c.human} />
        <CountMetric value={0} label={c.queue} numberStyle="bn-metric-number--zero" />
      </div>
      <div className="bn-deck-wave">
        <div className="bn-wave-copy"><span>{c.signalLabel}</span><small>{c.signalState}</small></div>
        <Waveform compact />
      </div>

      {/* A visual operating model, not a list of staff or live agent statuses. */}
      <div className="bn-orch">
        <div className="bn-orch-heading">
          <div><span className="bn-orch-kicker">BEE NEAR / INTELLIGENCE SYSTEM</span><strong>{c.operators}</strong></div>
          <span className="bn-orch-interactive">{spanish ? 'MODELO INTERACTIVO' : 'INTERACTIVE MODEL'} <span className="bn-orch-live-dot" /></span>
        </div>
        <div className="bn-orch-rail" role="group" aria-label={spanish ? 'Explorar etapas de orquestación' : 'Explore orchestration stages'}>
          {stages.map((stage, index) => (
            <button
              type="button"
              className={`bn-orch-tab ${activeStep === index ? 'bn-orch-tab--active' : ''}`}
              key={stage.code}
              aria-pressed={activeStep === index}
              onClick={() => setActiveStep(index)}
            >
              <span className="bn-orch-tab-number">{stage.code}</span>
              <span className="bn-orch-tab-name">{stage.label}</span>
              <span className="bn-orch-tab-track" aria-hidden="true"><span /></span>
            </button>
          ))}
        </div>
        <div className="bn-orch-detail" key={`${spanish ? 'es' : 'en'}-${selected.code}`}>
          <div className="bn-orch-detail-copy">
            <span className="bn-orch-detail-top"><span>{selected.short}</span><span>{selected.code} / 04</span></span>
            <h4>{selected.title}</h4>
            <p>{selected.description}</p>
            <div className="bn-orch-tags">
              {selected.details.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="bn-orch-trace" aria-hidden="true">
            <div className="bn-orch-trace-top"><span>BN / FLOW</span><span>0{activeStep + 1}</span></div>
            <div className="bn-orch-trace-nodes">
              <span className="bn-orch-trace-end" />
              <span className="bn-orch-trace-line"><span /></span>
              <span className="bn-orch-trace-end bn-orch-trace-end--last" />
            </div>
            <span className="bn-orch-trace-route">{selected.route}</span>
            <strong>{selected.result}</strong>
          </div>
        </div>
      </div>
      <div className="bn-deck-disclaimer"><CircleHelp size={12} />{c.simulated}</div>
    </div>
  );
}


/**
 * BEE NEAR / INFRASTRUCTURE OBSERVATORY
 * Client-provided marketing metrics. Validate uptime and cost claims before publishing.
 * This section is an architectural illustration, not a real-time service status page.
 */
function InfrastructureSection({ c }) {
  const PillarIcons = [Mic2, Server, Network, TrendingDown];

  return (
    <section className="bn-infra" id="infrastructure" aria-labelledby="bn-infra-title">
      <div className="bn-infra-ambient" aria-hidden="true" />
      <div className="bn-shell">
        <SectionReveal className="bn-infra-heading">
          <div className="bn-infra-heading-copy">
            <Eyebrow>{c.infrastructureIndex}</Eyebrow>
            <h2 id="bn-infra-title">{c.infrastructureHeading}</h2>
            <p>{c.infrastructureLead}</p>
          </div>
          <div className="bn-infra-network" aria-hidden="true">
            <div className="bn-infra-network-rails"><span /><span /><span /></div>
            <div className="bn-infra-network-core"><BeeSymbol small /></div>
            <div className="bn-infra-network-orbit bn-infra-network-orbit--one" />
            <div className="bn-infra-network-orbit bn-infra-network-orbit--two" />
            <span className="bn-infra-network-point bn-infra-network-point--a" />
            <span className="bn-infra-network-point bn-infra-network-point--b" />
            <span className="bn-infra-network-point bn-infra-network-point--c" />
            <small>BN / INFRASTRUCTURE</small>
          </div>
        </SectionReveal>
        <SectionReveal className="bn-infra-console">
          <div className="bn-infra-console-head">
            <span><span className="bn-infra-led" />{c.infrastructureCaption}</span>
            <span>{c.infrastructureScope}</span>
          </div>
          <div className="bn-infra-mosaic">
            {c.infrastructurePillars.map((pillar, index) => {
              const Icon = PillarIcons[index];
              return (
                <article className={`bn-infra-pillar bn-infra-pillar--${index + 1}`} key={pillar.index}>
                  <div className="bn-infra-pillar-head">
                    <span className="bn-infra-index">{pillar.index} <i>/ 04</i></span>
                    <Icon size={21} strokeWidth={1.45} aria-hidden="true" />
                  </div>
                  <div className="bn-infra-pillar-data">
                    <span className="bn-infra-code">{pillar.code}</span>
                    <strong className="bn-infra-value">{pillar.metric}</strong>
                    <h3>{pillar.title}</h3>
                  </div>
                  <div className="bn-infra-signal" aria-hidden="true"><span /></div>
                  <p>{pillar.copy}</p>
                  <span className="bn-infra-foot">{pillar.foot}<ArrowUpRight size={14} aria-hidden="true" /></span>
                </article>
              );
            })}
          </div>
          <div className="bn-infra-console-foot">
            <span>BEENE​AR / ENGINEERED FOR CONTINUITY</span>
            <span><CircleHelp size={13} aria-hidden="true" />{c.infrastructureReview}</span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function SolutionCard({ variant, index, label, title, tag, copy, points, href, action }) {
  const isSales = variant === 'sales';
  const Icon = isSales ? Zap : Headphones;
  return (
    <article className={`bn-solution bn-solution--${variant}`}>
      <div className="bn-solution-shine" aria-hidden="true" />
      <div className="bn-solution-upper">
        <div className="bn-solution-num">{index}<span> / 02</span></div>
        <span className="bn-solution-label">{label}</span>
      </div>
      <div className="bn-solution-icon"><Icon size={24} strokeWidth={1.5} /></div>
      <h3>{title}</h3>
      <p className="bn-solution-tag">{tag}</p>
      <p className="bn-solution-description">{copy}</p>
      <div className={`bn-solution-diagram bn-solution-diagram--${variant}`} aria-hidden="true">
        <div><span>AI</span><i /></div>
        <div className="bn-diagram-track"><span /><span /><span /><span /><span /></div>
        <div><span>{isSales ? 'SALES' : 'CARE'}</span><i /></div>
      </div>
      <ul className="bn-solution-points">
        {points.map(([heading, detail]) => (
          <li key={heading}><span className="bn-point-check"><Check size={13} strokeWidth={3} /></span><div><strong>{heading}</strong><p>{detail}</p></div></li>
        ))}
      </ul>
      <Link href={href} className="bn-solution-action"><span>{action}</span><ArrowUpRight size={20} strokeWidth={1.7} /></Link>
    </article>
  );
}

function VoicePreviewModal({ c, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && dialog.current) {
        const focusables = Array.from(dialog.current.querySelectorAll('button, a[href]'));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector('button')?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previous?.focus?.(); };
  }, [onClose]);
  return (
    <div className="bn-modal-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bn-modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="bn-dialog-title">
        <div className="bn-modal-top"><span><span className="bn-deck-dot" />{c.modalLabel}</span><button onClick={onClose} aria-label="Close"><X size={20} /></button></div>
        <div className="bn-modal-emblem"><div className="bn-modal-ring" /><BeeSymbol /></div>
        <span className="bn-modal-eyebrow"><span className="bn-demo-dot" />{c.preview}</span>
        <h2 id="bn-dialog-title">{c.modalTitle}</h2>
        <p>{c.modalCopy}</p>
        <div className="bn-modal-wave"><Waveform compact /></div>
        <span className="bn-modal-status">{c.noLive}</span>
        <Link href="/contacto" className="bn-modal-cta">{c.modalButton}<ArrowRight size={18} /></Link>
        <button className="bn-modal-back" onClick={onClose}>{c.modalCancel}</button>
      </div>
    </div>
  );
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.bn { --ink:#0a0b0c; --ink-2:#101113; --ink-3:#17191b; --cream:#f4f1e9; --line:rgba(255,255,255,.13); --yellow:#f5be1e; --mute:#98999b; position:relative; overflow:hidden; background:var(--ink); color:var(--cream); font-family:'DM Sans',Arial,sans-serif; -webkit-font-smoothing:antialiased; }
.bn * { box-sizing:border-box; }
.bn button,.bn a { -webkit-tap-highlight-color:transparent; }
.bn a { text-decoration:none; }
.bn button { cursor:pointer; }
.bn ::selection { background:#f5be1e; color:#0a0b0c; }
.bn h1,.bn h2,.bn h3,.bn p { margin:0; }
.bn-shell { width:min(1440px,calc(100% - 112px)); margin:0 auto; }
.bn-divider { height:1px; background:rgba(255,255,255,.11); }
.bn-nav { z-index:100; position:fixed; top:22px; left:50%; transform:translateX(-50%); width:min(1370px,calc(100% - 48px)); padding:10px 12px 10px 24px; border:1px solid rgba(255,255,255,.16); border-radius:19px; background:rgba(12,13,14,.77); box-shadow:0 14px 70px rgba(0,0,0,.35); backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px); display:flex; align-items:center; justify-content:space-between; gap:20px; transition:background .3s,border-color .3s,top .3s; }
.bn-nav--scrolled { top:10px; background:rgba(8,9,10,.95); border-color:rgba(255,255,255,.2); }
.bn-brand { display:flex; align-items:center; gap:10px; min-width:165px; color:#f3f3ef; }
.bn-symbol { width:35px; height:38px; display:inline-flex; align-items:center; justify-content:center; color:var(--yellow); flex:none; }
.bn-symbol svg { display:block; width:100%; height:100%; }
.bn-symbol--small { width:27px; height:29px; }
.bn-brand-name { font-family:Manrope,Arial,sans-serif; font-size:20px; letter-spacing:-1.15px; font-weight:800; }
.bn-brand-name b { color:var(--yellow); }
.bn-brand-tag { font-size:8px; letter-spacing:2.1px; font-weight:700; color:#a3a3a5; display:block; margin-top:-2px; }
.bn-nav-links { display:flex; align-items:center; gap:clamp(16px,2.35vw,37px); }
.bn-nav-links a { font-size:12px; font-weight:700; letter-spacing:.35px; color:#c4c4c4; transition:color .2s; }
.bn-nav-links a:hover,.bn-nav-links a:focus-visible { color:var(--yellow); }
.bn-nav-actions { display:flex; gap:15px; align-items:center; }
.bn-lang { display:flex; align-items:center; gap:6px; padding:11px 4px; background:transparent; border:0; color:#c4c4c4; font-size:11px; font-weight:800; letter-spacing:1px; }
.bn-nav-cta { display:flex; align-items:center; gap:23px; padding:14px 16px 14px 20px; border-radius:10px; background:var(--yellow); color:#131313; font-weight:800; font-size:12px; transition:background .2s,transform .2s; }
.bn-nav-cta:hover { background:#ffd65f; transform:translateY(-2px); }
.bn-menu-btn { display:none; border:1px solid #333; background:#1b1c1d; color:#fff; border-radius:10px; height:40px; width:43px; align-items:center; justify-content:center; }
.bn-mobile { display:none; }
.bn-progress { height:2px; position:fixed; top:0; left:0; background:var(--yellow); z-index:110; transform-origin:left; transition:transform .1s linear; }
.bn-hero { position:relative; padding:180px 0 112px; min-height:850px; isolation:isolate; background:#0a0b0c; }
.bn-hero:before { content:""; position:absolute; z-index:-1; inset:0; background:radial-gradient(ellipse at 73% 28%,rgba(245,190,30,.12),transparent 34%),radial-gradient(ellipse at 2% 89%,rgba(149,115,10,.075),transparent 32%); }
.bn-grid { position:absolute; inset:0; pointer-events:none; opacity:.31; background-image:linear-gradient(90deg,rgba(255,255,255,.065) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.045) 1px,transparent 1px); background-size:120px 120px; mask-image:linear-gradient(to bottom,black 20%,transparent 96%); }
.bn-hero-sweep { z-index:-1; position:absolute; pointer-events:none; width:750px; height:750px; border:1px solid rgba(245,190,30,.11); border-radius:50%; left:calc(50% - 80px); top:100px; box-shadow:0 0 0 115px rgba(245,190,30,.018),0 0 0 235px rgba(245,190,30,.011); animation:bn-breathe 10s ease-in-out infinite alternate; }
.bn-hero-content { position:relative; display:grid; grid-template-columns:minmax(0,1.07fr) minmax(0,.93fr); gap:44px; align-items:center; }
.bn-hero-copy { position:relative; z-index:2; padding-bottom:15px; }
.bn-eyebrow { display:flex; align-items:center; gap:12px; color:var(--yellow); font-size:10px; font-weight:800; letter-spacing:2.6px; text-transform:uppercase; }
.bn-eyebrow-line { display:block; width:26px; height:1px; background:currentColor; }
.bn-eyebrow--light { color:#7a5b0d; }
.bn-hero h1 { font-family:Manrope,Arial,sans-serif; font-weight:800; font-size:clamp(53px,5.2vw,92px); line-height:1.035; letter-spacing:-.079em; margin:25px 0 28px; max-width:900px; }
.bn-hero h1 span { display:block; }
.bn-hero h1 em { display:block; font-style:normal; color:var(--yellow); }
.bn-hero h1 small { display:block; margin-top:11px; font-size:.46em; letter-spacing:-.045em; color:#e9e7e0; line-height:1.2; }
.bn-hero-lead { color:#aeafac; font-size:clamp(15px,1.13vw,18px); line-height:1.85; max-width:590px; }
.bn-hero-buttons { display:flex; align-items:center; flex-wrap:wrap; gap:13px; margin-top:34px; }
.bn-button { min-height:58px; border:0; border-radius:9px; display:inline-flex; gap:17px; align-items:center; justify-content:center; font-weight:800; font-size:12px; letter-spacing:.08px; padding:0 23px; transition:transform .22s,background .22s,border .22s,box-shadow .22s; }
.bn-button:hover { transform:translateY(-3px); }
.bn-button--yellow { background:var(--yellow); color:#111; box-shadow:0 14px 33px rgba(245,190,30,.13); }
.bn-button--yellow:hover { box-shadow:0 14px 39px rgba(245,190,30,.23); background:#ffd04a; }
.bn-button--outline { border:1px solid rgba(255,255,255,.23); background:rgba(255,255,255,.035); color:#eee; }
.bn-button--outline:hover { border-color:rgba(245,190,30,.8); }
.bn-hero-micro { display:flex; align-items:center; gap:9px; margin-top:36px; color:#777b7b; font-size:11px; letter-spacing:.2px; }
.bn-hero-micro svg { color:var(--yellow); }
.bn-hero-aside { min-width:0; position:relative; perspective:1300px; }
.bn-hero-aside:before { content:''; position:absolute; inset:4% 0 2%; border-radius:50%; filter:blur(66px); background:rgba(245,190,30,.07); transform:scale(.8); }
.bn-deck { position:relative; padding:20px; border:1px solid rgba(255,255,255,.17); border-radius:20px; background:linear-gradient(142deg,rgba(31,33,34,.97),rgba(13,14,15,.99) 56%); box-shadow:0 40px 90px rgba(0,0,0,.54),0 0 0 1px rgba(255,255,255,.03) inset; overflow:hidden; }
.bn-deck:after { content:''; position:absolute; pointer-events:none; width:300px; height:300px; border-radius:50%; filter:blur(70px); top:-210px; right:-80px; background:rgba(245,190,30,.15); }
.bn-deck-top { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:1px 2px 18px; border-bottom:1px solid var(--line); }
.bn-deck-title { display:flex; align-items:center; gap:9px; color:#ddd; font-size:9px; font-weight:800; letter-spacing:1.3px; white-space:nowrap; }
.bn-deck-dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--yellow); box-shadow:0 0 14px rgba(245,190,30,.65); flex:none; }
.bn-simulation-pill { display:flex; align-items:center; gap:7px; font-size:8px; font-weight:800; letter-spacing:.7px; color:#b1aa8a; border:1px solid rgba(245,190,30,.2); border-radius:40px; padding:7px 9px; white-space:nowrap; }
.bn-pulse-dot { width:6px; height:6px; border:1px solid var(--yellow); border-radius:50%; display:inline-block; animation:bn-blink 2.2s infinite; }
.bn-deck-visual { height:225px; position:relative; overflow:hidden; display:grid; place-items:center; }
.bn-deck-gridlines { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.027) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.027) 1px,transparent 1px); background-size:24px 24px; mask-image:linear-gradient(90deg,transparent,black 30%,black 70%,transparent); }
.bn-orbit { position:relative; width:240px; height:240px; display:grid; place-items:center; }
.bn-orbit-halo { position:absolute; width:175px; height:175px; border-radius:50%; box-shadow:0 0 75px 24px rgba(245,190,30,.07); }
.bn-orbit-ring { border:1px solid rgba(245,190,30,.24); border-radius:50%; position:absolute; }
.bn-orbit-ring--outer { width:214px; height:214px; border-style:dashed; animation:bn-spin 38s linear infinite; }
.bn-orbit-ring--middle { width:170px; height:170px; border-color:rgba(245,190,30,.2); border-top-color:var(--yellow); border-bottom-color:var(--yellow); animation:bn-spin 14s linear infinite reverse; }
.bn-orbit-ring--inner { width:128px; height:128px; border-color:rgba(255,255,255,.12); border-left-color:var(--yellow); animation:bn-spin 11s linear infinite; }
.bn-orbit-sweep { position:absolute; width:186px; height:186px; background:conic-gradient(from 60deg,transparent 0deg,rgba(245,190,30,.115) 30deg,transparent 85deg); border-radius:50%; animation:bn-spin 8s linear infinite; }
.bn-orbit-core { position:relative; z-index:2; width:98px; height:98px; border-radius:50%; background:radial-gradient(circle at 32% 23%,#393015,#0b0c0d 76%); border:1px solid rgba(245,190,30,.36); display:flex; align-items:center; flex-direction:column; justify-content:center; gap:1px; box-shadow:0 0 0 5px rgba(245,190,30,.045),0 0 34px rgba(245,190,30,.13); }
.bn-orbit-core>span:not(.bn-symbol) { font-family:Manrope,Arial,sans-serif; font-weight:800; font-size:17px; letter-spacing:2px; }
.bn-orbit-core small { color:#c5ac66; font-size:7px; letter-spacing:1.7px; font-weight:700; }
.bn-orbit-node { position:absolute; width:9px; height:9px; background:var(--yellow); border-radius:50%; box-shadow:0 0 14px var(--yellow); }
.bn-orbit-node--a { left:35px; top:38px; } .bn-orbit-node--b { right:26px; bottom:44px; width:6px; height:6px; }
.bn-orbit-coord { position:absolute; font-size:8px; letter-spacing:1px; color:#777; white-space:nowrap; }
.bn-orbit-coord--a { left:-86px; top:66px; } .bn-orbit-coord--b { right:-103px; bottom:72px; }
.bn-visual-side { position:absolute; inset:22px 0 auto auto; font-size:8px; color:#64666a; font-weight:800; letter-spacing:1.3px; display:flex; flex-direction:column; align-items:flex-end; gap:6px; }
.bn-deck-metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border:1px solid rgba(255,255,255,.095); border-radius:10px; background:#111314; overflow:hidden; }
.bn-metric { padding:18px 9px 15px; min-width:0; text-align:center; display:flex; align-items:center; flex-direction:column; gap:7px; }
.bn-metric+.bn-metric { border-left:1px solid rgba(255,255,255,.095); }
.bn-metric-number { display:block; font-family:Manrope,Arial,sans-serif; color:#faf9f3; font-size:clamp(23px,2.15vw,34px); font-weight:800; letter-spacing:-1.8px; line-height:1.1; font-variant-numeric:tabular-nums; }
.bn-metric-number--zero { color:var(--yellow); }
.bn-metric-label { color:#929496; font-size:8.5px; font-weight:700; line-height:1.45; min-height:25px; }
.bn-deck-wave { margin:14px 0; padding:12px 13px; border:1px solid rgba(255,255,255,.085); border-radius:10px; display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:57px; }
.bn-wave-copy { display:flex; flex-direction:column; gap:5px; white-space:nowrap; }
.bn-wave-copy span { font-size:9px; font-weight:800; letter-spacing:.8px; color:#ddd; }
.bn-wave-copy small { color:#74787a; font-size:7px; letter-spacing:.7px; }
.bn-wave { height:54px; display:flex; gap:3px; align-items:center; justify-content:center; overflow:hidden; }
.bn-wave>span { width:3px; flex:none; height:var(--bar-h); border-radius:3px; background:linear-gradient(180deg,#ffe076,#edaa10); animation:bn-wave 1.6s ease-in-out var(--delay) infinite alternate; }
.bn-wave--compact { height:43px; gap:2px; }
.bn-wave--compact>span { width:2px; max-height:40px; }
.bn-deck-wave .bn-wave { width:47%; mask-image:linear-gradient(90deg,transparent,black 15%,black 85%,transparent); }
.bn-deck-disclaimer { display:flex; align-items:center; gap:6px; padding-top:12px; color:#797b7d; font-size:8px; }
.bn-hero-bottom { position:absolute; bottom:32px; left:0; width:100%; }
.bn-hero-bottom-inner { display:flex; align-items:center; justify-content:space-between; gap:15px; }
.bn-scroll-hint { display:inline-flex; align-items:center; gap:14px; color:#a1a1a1; font-size:9px; font-weight:800; letter-spacing:1.5px; }
.bn-scroll-icon { width:32px; height:32px; border-radius:50%; border:1px solid #666; display:grid; place-items:center; animation:bn-drop 2s ease-in-out infinite; }
.bn-hero-location { font-size:9px; font-weight:700; letter-spacing:1.6px; color:#5f6062; }
.bn-ticker { background:var(--yellow); color:#161411; padding:19px 0; overflow:hidden; position:relative; }
.bn-ticker-viewport { display:flex; width:max-content; animation:bn-marquee 34s linear infinite; }
.bn-ticker:hover .bn-ticker-viewport { animation-play-state:paused; }
.bn-ticker-group { display:flex; align-items:center; gap:39px; padding-right:39px; }
.bn-ticker-unit { display:inline-flex; align-items:center; gap:39px; white-space:nowrap; font-size:11px; letter-spacing:1.5px; font-weight:800; }
.bn-ticker-unit svg { width:14px; height:14px; }
.bn-intro { background:var(--cream); color:#161717; padding:145px 0 130px; position:relative; overflow:hidden; }
.bn-intro:before { content:'BEYOND'; position:absolute; pointer-events:none; bottom:-60px; right:-28px; font-family:Manrope,Arial,sans-serif; font-weight:800; font-size:clamp(170px,28vw,510px); letter-spacing:-.11em; color:rgba(15,16,17,.025); line-height:1; }
.bn-intro-grid { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,.5fr); align-items:end; gap:90px; position:relative; }
.bn-intro h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(40px,5vw,78px); line-height:1.13; letter-spacing:-.075em; margin:29px 0 0; font-weight:800; }
.bn-intro h2 em { font-style:normal; color:#bc8c00; }
.bn-intro-right p { font-size:16px; color:#5f605d; line-height:1.85; }
.bn-intro-tags { display:flex; flex-wrap:wrap; gap:9px; margin-top:28px; }
.bn-intro-tags span { border:1px solid #d6d1c6; color:#343434; border-radius:40px; padding:10px 13px; font-size:9px; font-weight:800; letter-spacing:.6px; }
.bn-solutions { background:#0d0e0f; position:relative; padding:130px 0 150px; }
.bn-solutions:before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 95% 30%,rgba(245,190,30,.045),transparent 42%); pointer-events:none; }
.bn-section-head { display:grid; grid-template-columns:minmax(0,.95fr) minmax(0,1fr); align-items:end; gap:45px; padding-bottom:48px; }
.bn-section-head h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(49px,6.7vw,100px); line-height:1.06; font-weight:800; letter-spacing:-.09em; margin-top:23px; }
.bn-section-head h2 em { display:block; color:var(--yellow); font-style:normal; }
.bn-section-head-right { max-width:440px; margin-left:auto; }
.bn-section-head-right h3 { font-size:19px; font-weight:800; letter-spacing:-.5px; margin-bottom:13px; }
.bn-section-head-right p { color:#999; font-size:14px; line-height:1.85; }
.bn-solutions-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; align-items:stretch; }
.bn-solution { min-width:0; position:relative; display:flex; flex-direction:column; padding:42px; border-radius:15px; overflow:hidden; transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s; }
.bn-solution:hover { transform:translateY(-8px); box-shadow:0 35px 80px rgba(0,0,0,.32); }
.bn-solution--care { color:#101112; background:#f0ede4; }
.bn-solution--sales { color:#f5f3eb; background:#1a1b1d; border:1px solid rgba(255,255,255,.12); }
.bn-solution-shine { position:absolute; width:430px; height:430px; pointer-events:none; top:-260px; right:-185px; border-radius:50%; transition:transform .7s; }
.bn-solution--care .bn-solution-shine { background:radial-gradient(circle,rgba(245,190,30,.38),transparent 69%); }
.bn-solution--sales .bn-solution-shine { background:radial-gradient(circle,rgba(245,190,30,.18),transparent 69%); }
.bn-solution:hover .bn-solution-shine { transform:translate(-35px,60px); }
.bn-solution-upper { position:relative; display:flex; justify-content:space-between; align-items:center; gap:20px; margin-bottom:76px; }
.bn-solution-num { font-family:Manrope,Arial,sans-serif; font-size:14px; font-weight:800; }
.bn-solution-num span { opacity:.4; font-weight:500; }
.bn-solution-label { font-size:9px; font-weight:800; letter-spacing:1.7px; }
.bn-solution-icon { width:67px; height:67px; border-radius:50%; border:1px solid currentColor; opacity:.9; display:grid; place-items:center; margin-bottom:25px; }
.bn-solution h3 { position:relative; font-family:Manrope,Arial,sans-serif; font-size:clamp(30px,3.15vw,49px); font-weight:800; letter-spacing:-.065em; line-height:1.16; max-width:530px; }
.bn-solution-tag { font-weight:800; font-size:12px; margin-top:15px; line-height:1.6; }
.bn-solution--care .bn-solution-tag { color:#976f00; } .bn-solution--sales .bn-solution-tag { color:#f5be1e; }
.bn-solution-description { margin-top:22px!important; font-size:14px; line-height:1.85; opacity:.72; min-height:136px; }
.bn-solution-diagram { display:flex; align-items:center; justify-content:center; gap:10px; height:108px; margin:24px 0 36px; border-top:1px solid rgba(110,110,110,.17); border-bottom:1px solid rgba(110,110,110,.17); }
.bn-solution-diagram>div:not(.bn-diagram-track) { position:relative; display:grid; place-items:center; width:65px; height:43px; border:1px solid currentColor; border-radius:5px; }
.bn-solution-diagram>div>span { font-weight:800; font-size:10px; letter-spacing:1px; }
.bn-solution-diagram>div>i { position:absolute; width:5px; height:5px; background:var(--yellow); border-radius:50%; right:-3px; }
.bn-diagram-track { height:1px; flex:1; display:flex; align-items:center; justify-content:space-around; position:relative; }
.bn-diagram-track:before { content:''; position:absolute; width:100%; border-top:1px dashed currentColor; opacity:.4; }
.bn-diagram-track span { width:6px; height:6px; border-radius:50%; background:var(--yellow); position:relative; animation:bn-flow 2.2s ease-in-out infinite; }
.bn-diagram-track span:nth-child(2) { animation-delay:.25s; } .bn-diagram-track span:nth-child(3) { animation-delay:.5s; } .bn-diagram-track span:nth-child(4) { animation-delay:.75s; } .bn-diagram-track span:nth-child(5) { animation-delay:1s; }
.bn-solution-points { list-style:none; padding:0; margin:0 0 35px; display:flex; flex-direction:column; gap:20px; flex:1; }
.bn-solution-points li { display:flex; align-items:flex-start; gap:13px; }
.bn-point-check { display:grid; place-items:center; width:22px; height:22px; flex:none; border:1px solid currentColor; border-radius:50%; margin-top:1px; }
.bn-solution--care .bn-point-check { color:#97730a; } .bn-solution--sales .bn-point-check { color:#f5be1e; }
.bn-solution-points strong { font-size:12px; font-weight:800; }
.bn-solution-points p { margin-top:5px; font-size:12px; line-height:1.6; opacity:.65; }
.bn-solution-action { display:flex; align-items:center; justify-content:space-between; font-size:12px; font-weight:800; padding:22px 0 2px; border-top:1px solid currentColor; transition:gap .2s; }
.bn-solution--care .bn-solution-action { color:#111; } .bn-solution--sales .bn-solution-action { color:#f5be1e; }
.bn-solution-action svg { transition:transform .3s; } .bn-solution-action:hover svg { transform:translate(4px,-4px); }
.bn-model { padding:132px 0 143px; background:#121314; color:#f8f6ef; }
.bn-model-grid { display:grid; grid-template-columns:minmax(0,.8fr) minmax(0,1fr); gap:100px; }
.bn-model-head { position:sticky; top:170px; align-self:start; }
.bn-model-head h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(44px,4.5vw,71px); line-height:1.14; letter-spacing:-.078em; font-weight:800; margin:23px 0 34px; }
.bn-model-head h2 em { color:var(--yellow); font-style:normal; }
.bn-model-large-num { font-family:Manrope,Arial,sans-serif; font-weight:800; font-size:clamp(130px,18vw,250px); letter-spacing:-.15em; color:rgba(255,255,255,.032); line-height:.95; margin-top:60px; }
.bn-steps { position:relative; }
.bn-steps:before { position:absolute; content:''; height:calc(100% - 90px); top:29px; left:26px; width:1px; background:linear-gradient(#f5be1e,rgba(245,190,30,.15)); }
.bn-step { position:relative; display:grid; grid-template-columns:54px 1fr; gap:34px; padding:0 0 66px; }
.bn-step:last-child { padding-bottom:0; }
.bn-step-icon { position:relative; z-index:2; width:53px; height:53px; border:1px solid rgba(245,190,30,.4); background:#151719; border-radius:50%; display:grid; place-items:center; font-size:11px; color:var(--yellow); font-weight:800; }
.bn-step-details { border-top:1px solid rgba(255,255,255,.16); padding-top:22px; }
.bn-step-details h3 { font-family:Manrope,Arial,sans-serif; font-size:clamp(21px,2vw,29px); font-weight:800; letter-spacing:-.04em; margin-bottom:12px; }
.bn-step-details p { font-size:14px; color:#909394; line-height:1.9; max-width:430px; }
.bn-bridge { position:relative; background:#191a1c; padding:100px 0; overflow:hidden; border-top:1px solid rgba(255,255,255,.1); }
.bn-bridge:before { content:''; position:absolute; width:500px; height:500px; border-radius:50%; border:1px solid rgba(245,190,30,.17); left:-160px; top:-150px; box-shadow:0 0 0 70px rgba(245,190,30,.023),0 0 0 140px rgba(245,190,30,.019); }
.bn-bridge-grid { position:relative; display:grid; grid-template-columns:1fr 1.35fr; gap:80px; align-items:center; }
.bn-bridge-signature { display:flex; flex-direction:column; gap:25px; align-items:flex-start; }
.bn-bridge-signature .bn-symbol { width:70px; height:70px; }
.bn-bridge-kicker { font-size:10px; font-weight:800; letter-spacing:2px; color:var(--yellow); }
.bn-bridge h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(36px,4.3vw,63px); line-height:1.16; letter-spacing:-.065em; font-weight:800; }
.bn-bridge-copy { color:#979a9b; font-size:14px; margin-top:20px!important; }
.bn-cta { background:var(--yellow); color:#111; position:relative; overflow:hidden; padding:125px 0 135px; }
.bn-cta:before { content:''; position:absolute; width:750px; height:750px; border:1px solid rgba(0,0,0,.12); border-radius:50%; top:-400px; right:-120px; box-shadow:0 0 0 100px rgba(0,0,0,.018),0 0 0 215px rgba(0,0,0,.015); animation:bn-breathe 10s infinite alternate; }
.bn-cta-grid { position:relative; display:grid; grid-template-columns:1fr auto; gap:45px; align-items:end; }
.bn-cta-eyebrow { color:#745500; font-size:10px; font-weight:800; letter-spacing:2px; }
.bn-cta h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(68px,9.7vw,152px); line-height:1.02; font-weight:800; letter-spacing:-.095em; margin:23px 0; }
.bn-cta h2 span { display:block; }
.bn-cta h2 em { color:#fff7d9; font-style:normal; text-shadow:0 2px 0 rgba(0,0,0,.03); }
.bn-cta-copy { font-size:16px; max-width:490px; line-height:1.7; color:#574314; }
.bn-cta-action { display:flex; flex-direction:column; gap:15px; align-items:flex-end; }
.bn-cta-action a { width:190px; height:190px; border-radius:50%; color:#fff; background:#111; display:flex; flex-direction:column; justify-content:space-between; padding:27px; transition:transform .35s,background .35s; }
.bn-cta-action a:hover { transform:rotate(-9deg) scale(1.05); background:#2a2924; }
.bn-cta-action a span { max-width:100px; font-weight:800; font-size:13px; line-height:1.4; }
.bn-cta-action a svg { align-self:flex-end; }
.bn-footer { background:#0b0c0d; padding:80px 0 28px; }
.bn-footer-grid { display:grid; grid-template-columns:1.5fr .75fr .75fr 1fr; gap:42px; padding-bottom:80px; }
.bn-footer-brand p { color:#858789; font-size:13px; max-width:280px; line-height:1.8; margin-top:20px; }
.bn-footer-heading { color:#f5be1e; font-size:9px; font-weight:800; letter-spacing:1.5px; margin-bottom:24px; }
.bn-footer-col { display:flex; flex-direction:column; gap:15px; }
.bn-footer-col a,.bn-footer-col span { color:#a4a4a5; font-size:12px; line-height:1.6; transition:color .2s; }
.bn-footer-col a:hover { color:#f5be1e; }
.bn-footer-contact a { overflow-wrap:anywhere; }
.bn-footer-bottom { border-top:1px solid rgba(255,255,255,.13); padding-top:25px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px; color:#6d6f71; font-size:11px; }
.bn-footer-bottom a { color:#909293; } .bn-footer-bottom a:hover { color:#f5be1e; }
.bn-reveal { opacity:0; transform:translateY(34px); transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1); }
.bn-reveal.bn-visible { opacity:1; transform:translateY(0); }
.bn-modal-scrim { position:fixed; z-index:220; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.84); padding:20px; backdrop-filter:blur(14px); }
.bn-modal { max-width:505px; width:100%; background:linear-gradient(135deg,#212224,#101112); border:1px solid rgba(245,190,30,.29); box-shadow:0 45px 150px #000; border-radius:20px; padding:28px 36px 32px; text-align:center; position:relative; max-height:calc(100vh - 40px); overflow-y:auto; }
.bn-modal-top { display:flex; align-items:center; justify-content:space-between; color:#bbb; font-size:10px; font-weight:800; letter-spacing:1px; }
.bn-modal-top>span { display:inline-flex; align-items:center; gap:10px; }
.bn-modal-top button { background:transparent; border:0; color:#ddd; padding:6px; display:grid; place-items:center; }
.bn-modal-emblem { width:110px; height:110px; border:1px solid rgba(245,190,30,.45); border-radius:50%; margin:26px auto 20px; display:grid; place-items:center; position:relative; background:radial-gradient(circle,#392d11,#111 75%); }
.bn-modal-emblem .bn-symbol { width:58px; height:58px; }
.bn-modal-ring { position:absolute; width:135px; height:135px; border:1px dashed rgba(245,190,30,.35); border-radius:50%; animation:bn-spin 19s linear infinite; }
.bn-modal-eyebrow { color:#f5be1e; font-weight:800; font-size:9px; letter-spacing:2px; display:flex; align-items:center; justify-content:center; gap:9px; }
.bn-demo-dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:#f5be1e; }
.bn-modal h2 { margin-top:12px; font-family:Manrope,Arial,sans-serif; font-size:44px; letter-spacing:-.07em; font-weight:800; }
.bn-modal>p { margin:13px auto 14px; color:#9da0a0; line-height:1.75; font-size:14px; max-width:390px; }
.bn-modal-wave { display:flex; justify-content:center; height:49px; overflow:hidden; }
.bn-modal-status { display:block; font-size:10px; color:#a19c87; margin:2px 0 23px; }
.bn-modal-cta { background:#f5be1e; color:#151515; display:flex; align-items:center; justify-content:space-between; padding:17px 19px; border-radius:9px; font-size:12px; font-weight:800; }
.bn-modal-back { background:transparent; color:#9c9ea0; border:0; font-size:11px; margin-top:19px; }
@keyframes bn-spin { to { transform:rotate(360deg); } }
@keyframes bn-blink { 50% { opacity:.2; box-shadow:0 0 14px rgba(245,190,30,.5); } }
@keyframes bn-wave { 0%,100% { transform:scaleY(.35); opacity:.53; } 50% { transform:scaleY(1.05); opacity:1; } }
@keyframes bn-breathe { from { transform:scale(.93); opacity:.5; } to { transform:scale(1.06); opacity:1; } }
@keyframes bn-drop { 50% { transform:translateY(5px); } }
@keyframes bn-flow { 0% { opacity:.2; transform:scale(.65); } 55% { opacity:1; transform:scale(1.8); } 100% { opacity:.3; transform:scale(.65); } }
@keyframes bn-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
@media (max-width:1240px) {
  .bn-shell { width:min(1440px,calc(100% - 72px)); }
  .bn-nav-links { gap:16px; }
  .bn-nav-cta { gap:10px; }
  .bn-hero-content { gap:25px; }
  .bn-hero h1 { font-size:clamp(49px,5.5vw,75px); }
  .bn-hero { padding-top:165px; }
  .bn-deck { padding:14px; }
  .bn-orbit-coord--a,.bn-orbit-coord--b { display:none; }
  .bn-solution { padding:32px; }
  .bn-solution-upper { margin-bottom:59px; }
}
@media (max-width:960px) {
  .bn-nav-links { display:none; }
  .bn-menu-btn { display:flex; }
  .bn-mobile { display:flex; position:fixed; top:92px; left:24px; right:24px; z-index:99; flex-direction:column; gap:0; border-radius:15px; padding:12px; background:#18191b; border:1px solid #393b3c; box-shadow:0 25px 70px #000a; }
  .bn-mobile a,.bn-mobile button { display:flex; width:100%; justify-content:space-between; align-items:center; background:transparent; border:0; border-bottom:1px solid #343536; color:#eee; padding:16px; text-align:left; font-size:13px; font-weight:800; }
  .bn-mobile button { border-bottom:0; color:#f5be1e; }
  .bn-hero { padding:160px 0 110px; }
  .bn-hero-content { grid-template-columns:1fr; gap:54px; }
  .bn-hero h1 { font-size:clamp(55px,8.5vw,92px); max-width:800px; }
  .bn-hero-aside { max-width:640px; width:100%; margin:auto; }
  .bn-hero-sweep { left:20%; }
  .bn-intro-grid,.bn-section-head,.bn-model-grid,.bn-bridge-grid { gap:35px; }
  .bn-intro-grid { grid-template-columns:1fr; }
  .bn-intro-right { max-width:570px; }
  .bn-solutions-grid { gap:12px; }
  .bn-solution { padding:25px; }
  .bn-solution-description { min-height:190px; }
  .bn-model-grid { grid-template-columns:1fr 1fr; }
  .bn-footer-grid { grid-template-columns:1.2fr 1fr 1fr; }
  .bn-footer-contact { grid-column:2/4; }
}
@media (max-width:700px) {
  .bn-shell { width:calc(100% - 40px); }
  .bn-nav { width:calc(100% - 24px); top:10px; padding:9px 9px 9px 13px; border-radius:13px; }
  .bn-brand { min-width:0; }
  .bn-brand-name { font-size:17px; }
  .bn-brand-tag { font-size:7px; letter-spacing:1.6px; }
  .bn-symbol { width:30px; height:32px; }
  .bn-nav-cta { display:none; }
  .bn-mobile { top:77px; left:12px; right:12px; }
  .bn-hero { min-height:0; padding:140px 0 95px; }
  .bn-hero h1 { font-size:clamp(42px,10.5vw,70px); letter-spacing:-.075em; }
  .bn-hero h1 small { font-size:.49em; }
  .bn-hero-lead { font-size:14px; }
  .bn-hero-buttons { align-items:stretch; }
  .bn-button { width:100%; min-height:53px; }
  .bn-hero-micro { font-size:10px; }
  .bn-hero-aside { max-width:100%; }
  .bn-deck { padding:12px; }
  .bn-deck-title { font-size:8px; }
  .bn-simulation-pill { font-size:7px; }
  .bn-deck-visual { height:200px; }
  .bn-deck-wave .bn-wave { width:38%; }
  .bn-wave-copy span { font-size:8px; }
  .bn-wave-copy small { font-size:6px; }
  .bn-orbit { transform:scale(.85); }
  .bn-hero-bottom { bottom:22px; }
  .bn-hero-location { display:none; }
  .bn-ticker { padding:16px 0; }
  .bn-ticker-unit { font-size:9px; }
  .bn-intro { padding:90px 0; }
  .bn-intro h2 { font-size:clamp(40px,9vw,61px); }
  .bn-solutions { padding:90px 0; }
  .bn-section-head { grid-template-columns:1fr; }
  .bn-section-head-right { margin:0; }
  .bn-section-head h2 { font-size:clamp(50px,10.5vw,74px); }
  .bn-solutions-grid { grid-template-columns:1fr; gap:16px; }
  .bn-solution { padding:29px 25px; }
  .bn-solution-description { min-height:0; }
  .bn-solution-upper { margin-bottom:50px; }
  .bn-solution-diagram { margin:24px 0; }
  .bn-model { padding:90px 0; }
  .bn-model-grid { grid-template-columns:1fr; gap:30px; }
  .bn-model-head { position:static; }
  .bn-model-large-num { display:none; }
  .bn-steps:before { left:24px; }
  .bn-step { grid-template-columns:50px 1fr; gap:19px; padding-bottom:45px; }
  .bn-step-icon { width:49px; height:49px; }
  .bn-bridge { padding:80px 0; }
  .bn-bridge-grid { grid-template-columns:1fr; gap:24px; }
  .bn-bridge-signature { gap:10px; }
  .bn-bridge-signature .bn-symbol { width:50px; height:50px; }
  .bn-cta { padding:90px 0; }
  .bn-cta-grid { grid-template-columns:1fr; }
  .bn-cta h2 { font-size:clamp(60px,12.2vw,92px); }
  .bn-cta-action { align-items:flex-start; }
  .bn-cta-action a { width:auto; height:auto; min-width:210px; flex-direction:row; align-items:center; padding:22px 25px; border-radius:9px; gap:23px; }
  .bn-cta-action a span { max-width:none; }
  .bn-footer { padding:65px 0 27px; }
  .bn-footer-grid { grid-template-columns:1fr 1fr; gap:35px 20px; padding-bottom:55px; }
  .bn-footer-brand { grid-column:1/3; }
  .bn-footer-contact { grid-column:1/3; }
}
@media (max-width:370px) {
  .bn-shell { width:calc(100% - 28px); }
  .bn-hero h1 { font-size:40px; }
  .bn-metric-number { font-size:22px; }
  .bn-metric-label { font-size:8px; }
  .bn-modal { padding:22px; }
}
/* BEENE NEAR / CONVERSATION ORCHESTRATION — INTERACTIVE VISUAL MODEL */
.bn-orch { margin-top:17px; }
.bn-orch-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:13px; margin:0 0 12px; }
.bn-orch-heading>div { display:flex; flex-direction:column; gap:5px; min-width:0; }
.bn-orch-kicker { font-size:7px; letter-spacing:1.45px; font-weight:700; color:#a68d4e; }
.bn-orch-heading strong { font-size:10px; letter-spacing:.8px; color:#e5e4df; font-weight:700; }
.bn-orch-interactive { color:#7d817e; font-size:7px; letter-spacing:.55px; white-space:nowrap; display:flex; align-items:center; gap:7px; }
.bn-orch-live-dot { width:5px; height:5px; background:#f5be1e; border-radius:50%; box-shadow:0 0 10px #f5be1e70; animation:bn-blink 2.8s infinite; }
.bn-orch-rail { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:6px; }
.bn-orch-tab { position:relative; border:1px solid #35383a; background:#191b1c; min-height:67px; min-width:0; padding:11px 8px 12px; text-align:left; border-radius:5px; display:flex; flex-direction:column; justify-content:space-between; gap:5px; color:#9c9f9f; transition:border-color .24s,background .24s,color .24s,transform .24s; }
.bn-orch-tab:hover { background:#232426; border-color:#777264; transform:translateY(-2px); }
.bn-orch-tab:focus-visible { outline:2px solid #f5be1e; outline-offset:2px; }
.bn-orch-tab--active { border-color:rgba(245,190,30,.57); background:linear-gradient(125deg,#28271f 0%,#201f1b 100%); color:#f3f0e7; }
.bn-orch-tab-number { display:block; font-size:8px; font-weight:800; letter-spacing:1px; color:#a59a81; }
.bn-orch-tab--active .bn-orch-tab-number { color:#f5be1e; }
.bn-orch-tab-name { font-size:9px; font-weight:650; line-height:1.25; }
.bn-orch-tab-track { position:absolute; bottom:0; height:2px; left:0; right:0; overflow:hidden; background:transparent; }
.bn-orch-tab-track span { display:block; height:100%; background:#f5be1e; width:0; }
.bn-orch-tab--active .bn-orch-tab-track span { width:100%; animation:bn-orch-scan 2.9s ease-in-out infinite alternate; }
.bn-orch-detail { min-height:173px; margin-top:8px; display:grid; grid-template-columns:minmax(0,1.5fr) minmax(0,.75fr); background:linear-gradient(112deg,#17191b,#121416); border:1px solid rgba(255,255,255,.085); border-radius:7px; overflow:hidden; animation:bn-orch-enter .4s ease both; }
.bn-orch-detail-copy { min-width:0; padding:17px 16px 15px; }
.bn-orch-detail-top { display:flex; align-items:center; justify-content:space-between; gap:9px; color:#d4b55f; font-size:7px; font-weight:750; letter-spacing:1.1px; }
.bn-orch-detail-top span:last-child { color:#8b8c8a; }
.bn-orch-detail h4 { margin:11px 0 7px; font-family:Manrope,Arial,sans-serif; font-size:14px; line-height:1.32; letter-spacing:-.026em; font-weight:700; color:#f1f0eb; }
.bn-orch-detail p { font-size:10px; line-height:1.55; color:#a2a5a3; margin:0; }
.bn-orch-tags { margin-top:12px; display:flex; gap:6px; flex-wrap:wrap; }
.bn-orch-tags span { display:inline-flex; align-items:center; min-height:20px; padding:4px 7px; font-size:7px; font-weight:600; border-radius:3px; color:#afafa9; border:1px solid rgba(255,255,255,.10); }
.bn-orch-trace { min-width:0; border-left:1px solid rgba(255,255,255,.085); padding:14px 11px 12px; display:flex; flex-direction:column; align-items:stretch; justify-content:center; background:radial-gradient(ellipse at 50% 45%,rgba(245,190,30,.05),transparent 78%); }
.bn-orch-trace-top { display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:7px; font-weight:700; letter-spacing:1px; color:#949693; }
.bn-orch-trace-nodes { display:flex; justify-content:center; align-items:center; padding:17px 2px 13px; }
.bn-orch-trace-end { flex:none; width:13px; height:13px; transform:rotate(45deg); border:1px solid rgba(245,190,30,.72); box-shadow:0 0 0 4px rgba(245,190,30,.04); }
.bn-orch-trace-end--last { background:#f5be1e; box-shadow:0 0 13px rgba(245,190,30,.16); }
.bn-orch-trace-line { position:relative; height:1px; flex:1; max-width:90px; background:rgba(245,190,30,.36); overflow:hidden; }
.bn-orch-trace-line span { position:absolute; inset:-1px auto -1px 0; width:38%; background:#ffe2a0; box-shadow:0 0 8px #ffe2a0; animation:bn-orch-beam 2s linear infinite; }
.bn-orch-trace-route { font-size:7px; color:#999c98; letter-spacing:.5px; text-align:center; }
.bn-orch-trace strong { font-size:8px; margin-top:8px; color:#e8c56f; font-weight:750; text-align:center; line-height:1.4; letter-spacing:.2px; }
@keyframes bn-orch-scan { 0% { transform:translateX(-65%); } 100% { transform:translateX(0); } }
@keyframes bn-orch-beam { from { transform:translateX(-120%); } to { transform:translateX(370%); } }
@keyframes bn-orch-enter { from { opacity:.5; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
@media (max-width:700px) {
  .bn-orch-detail { grid-template-columns:1fr; }
  .bn-orch-trace { border-left:0; border-top:1px solid rgba(255,255,255,.075); padding:12px 14px; }
  .bn-orch-trace-nodes { padding:10px 2px; }
  .bn-orch-tab { padding:10px 6px; min-height:65px; }
  .bn-orch-tab-name { font-size:8px; }
  .bn-orch-detail-copy { padding:14px; }
  .bn-orch-detail h4 { font-size:13px; }
}
@media (max-width:380px) {
  .bn-orch-heading { align-items:flex-start; flex-direction:column; gap:5px; }
  .bn-orch-interactive { display:none; }
  .bn-orch-tab { padding:8px 4px; }
  .bn-orch-tab-name { font-size:7px; }
  .bn-orch-tab-number { font-size:7px; }
}

@media (prefers-reduced-motion:reduce) {
  .bn *, .bn *::before, .bn *::after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; scroll-behavior:auto!important; }
  .bn-reveal { opacity:1; transform:none; }
}

/* =====================================================
   BEE NEAR / ATELIER — refined executive art direction
   Calm typography, restrained brand accents and precise
   spacing. Animations remain from the original components.
   ===================================================== */
.bn { --ink:#101112; --ink-2:#151719; --cream:#f2f0eb; --yellow:#f5be1e; --mute:#939591; background:#101112; font-weight:400; }
.bn-shell { width:min(1260px,calc(100% - 104px)); }
.bn-nav { top:18px; width:min(1252px,calc(100% - 64px)); padding:9px 14px 9px 21px; border-radius:12px; border-color:rgba(255,255,255,.12); background:rgba(16,17,18,.82); box-shadow:0 12px 40px rgba(0,0,0,.2); }
.bn-nav--scrolled { top:9px; }
.bn-brand-name { font-size:18px; letter-spacing:-.85px; font-weight:700; }
.bn-brand-tag { font-size:7px; letter-spacing:1.65px; font-weight:600; color:#8d908f; }
.bn-symbol { width:31px; height:33px; }
.bn-nav-links { gap:29px; }
.bn-nav-links a { font-size:12px; font-weight:500; letter-spacing:0; color:#aaaead; }
.bn-lang { font-size:11px; font-weight:600; }
.bn-nav-cta { min-height:41px; padding:10px 15px; gap:18px; border-radius:6px; font-size:11px; font-weight:700; }
.bn-progress { height:2px; }
.bn-hero { min-height:785px; padding:166px 0 119px; background:#101112; }
.bn-hero:before { background:radial-gradient(ellipse at 76% 32%,rgba(245,190,30,.045),transparent 44%),radial-gradient(ellipse at 14% 95%,rgba(245,190,30,.025),transparent 33%); }
.bn-grid { opacity:.16; background-size:104px 104px; }
.bn-hero-sweep { left:55%; top:90px; width:575px; height:575px; border-color:rgba(245,190,30,.065); box-shadow:0 0 0 100px rgba(245,190,30,.008),0 0 0 205px rgba(245,190,30,.006); animation-duration:18s; }
.bn-hero-content { grid-template-columns:minmax(0,1fr) minmax(0,.99fr); gap:72px; }
.bn-hero-copy { padding-bottom:5px; }
.bn-eyebrow { font-size:9px; font-weight:700; letter-spacing:1.6px; gap:12px; }
.bn-eyebrow-line { width:22px; }
.bn-hero h1 { font-size:clamp(40px,3.55vw,59px); font-weight:700; letter-spacing:-.055em; line-height:1.14; max-width:650px; margin:27px 0 22px; }
.bn-hero h1 em { color:#e7bd4f; }
.bn-hero h1 small { margin-top:14px; font-size:.38em; font-weight:500; letter-spacing:-.025em; color:#d0ceca; line-height:1.32; }
.bn-hero-lead { color:#a7a9a7; font-size:15px; line-height:1.78; max-width:500px; }
.bn-hero-buttons { margin-top:29px; gap:10px; }
.bn-button { min-height:48px; padding:0 17px; gap:11px; border-radius:6px; font-size:11px; font-weight:700; }
.bn-button--yellow { box-shadow:none; }
.bn-button--yellow:hover { box-shadow:0 12px 28px rgba(245,190,30,.13); }
.bn-button--outline { background:transparent; border-color:rgba(255,255,255,.18); color:#dadbd8; }
.bn-hero-micro { margin-top:27px; font-size:10px; color:#777b7a; }
.bn-hero-aside:before { opacity:.45; filter:blur(90px); }
.bn-deck { padding:19px; border-radius:12px; border-color:rgba(255,255,255,.115); background:linear-gradient(150deg,#202123 0%,#161719 48%,#111315 100%); box-shadow:0 24px 55px rgba(0,0,0,.31),0 0 0 1px rgba(255,255,255,.025) inset; }
.bn-deck:after { opacity:.4; }
.bn-deck-top { padding:1px 0 14px; }
.bn-deck-title { font-size:9px; font-weight:700; letter-spacing:.85px; }
.bn-deck-dot { width:5px; height:5px; box-shadow:0 0 8px rgba(245,190,30,.4); }
.bn-simulation-pill { font-size:8px; font-weight:600; letter-spacing:.25px; border-color:rgba(245,190,30,.12); color:#a8a08e; }
.bn-deck-visual { height:188px; }
.bn-orbit { transform:scale(.83); }
.bn-orbit-ring--outer { animation-duration:60s; }
.bn-orbit-ring--middle { animation-duration:25s; }
.bn-orbit-ring--inner { animation-duration:22s; }
.bn-orbit-sweep { animation-duration:16s; }
.bn-metric-number { font-size:clamp(23px,2.5vw,31px); font-weight:700; letter-spacing:-.05em; }
.bn-metric-label { font-size:9px; line-height:1.4; color:#a1a3a2; }
.bn-deck-metrics { border-radius:7px; border-color:rgba(255,255,255,.07); background:#131517; }
.bn-deck-wave { min-height:50px; margin:11px 0; padding:9px 12px; border-radius:7px; }
.bn-wave-copy span { font-weight:600; letter-spacing:.6px; }
.bn-deck-disclaimer { color:#747a78; }
.bn-hero-bottom { bottom:23px; }
.bn-scroll-icon { width:29px; height:29px; border-color:#515554; }
/* The capabilities marquee stays animated, but becomes an understated ribbon. */
.bn-ticker { background:#1b1d1e; color:#c3c6c2; padding:14px 0; border-top:1px solid rgba(255,255,255,.085); border-bottom:1px solid rgba(255,255,255,.085); }
.bn-ticker-unit { font-size:9px; letter-spacing:1.25px; font-weight:650; gap:26px; }
.bn-ticker-unit svg { color:#d0a434; width:11px; height:11px; }
.bn-ticker-group { gap:26px; padding-right:26px; }
.bn-ticker-viewport { animation-duration:44s; }
/* Calm, softly lit editorial section in place of oversized display typography. */
.bn-intro { background:#f2f0eb; padding:100px 0 103px; }
.bn-intro:before { font-size:clamp(130px,22vw,320px); color:rgba(25,26,25,.015); }
.bn-intro-grid { grid-template-columns:minmax(0,1.05fr) minmax(0,.68fr); gap:78px; }
.bn-intro h2 { font-size:clamp(34px,3.3vw,49px); font-weight:650; line-height:1.2; letter-spacing:-.05em; margin-top:22px; }
.bn-intro h2 em { color:#a88222; }
.bn-intro-right p { font-size:14px; line-height:1.85; color:#656763; }
.bn-intro-tags { margin-top:22px; gap:7px; }
.bn-intro-tags span { border-color:#dcd9d1; font-size:8px; font-weight:650; letter-spacing:.3px; padding:8px 11px; }
.bn-solutions { padding:106px 0 111px; background:#141617; }
.bn-section-head { grid-template-columns:minmax(0,1fr) minmax(0,.84fr); gap:60px; padding-bottom:35px; }
.bn-section-head h2 { font-size:clamp(38px,3.8vw,56px); font-weight:700; letter-spacing:-.055em; line-height:1.12; margin-top:20px; }
.bn-section-head h2 em { color:#d9b356; }
.bn-section-head-right h3 { font-size:16px; font-weight:650; letter-spacing:-.025em; margin-bottom:11px; }
.bn-section-head-right p { font-size:13px; line-height:1.75; }
.bn-solutions-grid { gap:16px; }
.bn-solution { padding:34px 34px 30px; border-radius:9px; transition-duration:.3s; }
.bn-solution:hover { transform:translateY(-4px); box-shadow:0 22px 45px rgba(0,0,0,.15); }
.bn-solution--care { background:#ebe9e2; }
.bn-solution--sales { background:#202223; border-color:rgba(255,255,255,.095); }
.bn-solution-shine { opacity:.4; }
.bn-solution-upper { margin-bottom:32px; }
.bn-solution-label { font-size:9px; font-weight:650; letter-spacing:1px; }
.bn-solution-icon { width:45px; height:45px; margin-bottom:20px; border-color:rgba(150,128,70,.48); }
.bn-solution-icon svg { width:19px; height:19px; }
.bn-solution h3 { font-size:clamp(24px,2.35vw,33px); font-weight:700; letter-spacing:-.043em; line-height:1.21; }
.bn-solution-tag { font-size:11px; font-weight:650; margin-top:12px; }
.bn-solution-description { font-size:13px; line-height:1.76; margin-top:18px!important; min-height:118px; }
.bn-solution-diagram { height:82px; margin:19px 0 27px; }
.bn-solution-diagram>div:not(.bn-diagram-track) { width:58px; height:36px; border-radius:4px; }
.bn-solution-points { gap:17px; margin-bottom:25px; }
.bn-solution-points strong { font-size:12px; font-weight:650; }
.bn-solution-points p { font-size:11px; line-height:1.65; }
.bn-point-check { height:20px; width:20px; }
.bn-solution-action { font-size:12px; padding:18px 0 2px; font-weight:650; }
.bn-model { padding:105px 0 114px; background:#111314; }
.bn-model-grid { grid-template-columns:minmax(0,.95fr) minmax(0,1fr); gap:100px; }
.bn-model-head h2 { font-size:clamp(36px,3.5vw,51px); font-weight:700; letter-spacing:-.052em; margin:21px 0 25px; }
.bn-model-head h2 em { color:#d9b356; }
.bn-model-large-num { font-size:clamp(110px,12vw,160px); margin-top:16px; }
.bn-step { padding-bottom:43px; gap:23px; }
.bn-step-details h3 { font-size:19px; font-weight:650; letter-spacing:-.03em; }
.bn-step-details p { font-size:13px; line-height:1.85; }
.bn-bridge { padding:77px 0; background:#1b1d1e; }
.bn-bridge-grid { gap:70px; }
.bn-bridge-signature { gap:15px; }
.bn-bridge-signature .bn-symbol { height:53px; width:53px; }
.bn-bridge h2 { font-size:clamp(30px,3vw,43px); font-weight:650; letter-spacing:-.047em; }
.bn-bridge-copy { font-size:13px; line-height:1.8; }
/* Replace the giant full-bleed yellow billboard with a premium ivory closing panel. */
.bn-cta { background:#e8e5dc; color:#171819; padding:101px 0 104px; border-top:4px solid #e5b73d; }
.bn-cta:before { width:520px; height:520px; top:-320px; right:-40px; border-color:rgba(24,24,20,.055); box-shadow:0 0 0 85px rgba(24,24,20,.01); }
.bn-cta-grid { grid-template-columns:1fr auto; align-items:center; }
.bn-cta-eyebrow { color:#9a751a; font-size:9px; font-weight:750; letter-spacing:1.6px; }
.bn-cta h2 { font-size:clamp(42px,4.3vw,62px); font-weight:700; letter-spacing:-.06em; line-height:1.16; margin:19px 0 18px; }
.bn-cta h2 em { color:#a98323; text-shadow:none; }
.bn-cta-copy { font-size:14px; max-width:450px; color:#60605a; }
.bn-cta-action a { width:165px; height:165px; border-radius:8px; padding:24px; background:#17191a; box-shadow:0 12px 28px rgba(0,0,0,.10); }
.bn-cta-action a:hover { transform:translateY(-5px); background:#222425; }
.bn-cta-action a span { font-weight:650; }
.bn-footer { background:#111314; padding:65px 0 24px; }
.bn-footer-grid { padding-bottom:55px; }
.bn-footer-heading { font-weight:650; color:#d2ac49; }
.bn-reveal { transform:translateY(20px); transition-duration:.7s; }
.bn-modal { border-radius:12px; border-color:rgba(245,190,30,.16); }
.bn-modal h2 { font-size:34px; letter-spacing:-.04em; font-weight:700; }
@media(max-width:1240px) {
  .bn-shell { width:min(1260px,calc(100% - 70px)); }
  .bn-hero-content { gap:44px; }
  .bn-hero h1 { font-size:clamp(39px,4vw,52px); }
  .bn-hero { padding-top:160px; }
  .bn-solution { padding:29px; }
  .bn-solution-upper { margin-bottom:26px; }
}
@media(max-width:960px) {
  .bn-hero { padding:140px 0 115px; min-height:0; }
  .bn-hero-content { grid-template-columns:1fr; gap:45px; }
  .bn-hero h1 { font-size:clamp(43px,5.8vw,59px); }
  .bn-hero-aside { max-width:590px; }
  .bn-intro-grid { grid-template-columns:1fr; gap:24px; }
  .bn-intro-right { max-width:620px; }
  .bn-solutions-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .bn-solution { padding:23px; }
  .bn-solution h3 { font-size:25px; }
  .bn-solution-description { min-height:0; }
  .bn-model-grid { gap:38px; }
}
@media(max-width:700px) {
  .bn-shell { width:calc(100% - 40px); }
  .bn-nav { top:10px; width:calc(100% - 24px); padding:9px 12px; }
  .bn-brand-name { font-size:17px; }
  .bn-hero { padding:128px 0 85px; }
  .bn-hero-content { gap:37px; }
  .bn-hero h1 { font-size:clamp(34px,8.1vw,45px); letter-spacing:-.05em; line-height:1.16; margin:21px 0 20px; }
  .bn-hero h1 small { font-size:.46em; margin-top:11px; }
  .bn-hero-lead { font-size:13px; line-height:1.8; }
  .bn-hero-buttons { gap:9px; }
  .bn-button { width:100%; min-height:47px; }
  .bn-hero-micro { margin-top:20px; }
  .bn-deck { padding:12px; }
  .bn-deck-visual { height:170px; }
  .bn-orbit { transform:scale(.75); }
  .bn-deck-metrics { padding:0; }
  .bn-metric-number { font-size:24px; }
  .bn-metric-label { font-size:8px; }
  .bn-hero-bottom { bottom:20px; }
  .bn-ticker { padding:12px 0; }
  .bn-ticker-unit { font-size:8px; }
  .bn-intro { padding:76px 0 83px; }
  .bn-intro h2 { font-size:clamp(31px,7.9vw,40px); }
  .bn-intro-right p { font-size:13px; }
  .bn-solutions { padding:79px 0 86px; }
  .bn-section-head { grid-template-columns:1fr; gap:20px; }
  .bn-section-head h2 { font-size:clamp(36px,8.6vw,47px); }
  .bn-section-head-right { margin:0; }
  .bn-solutions-grid { grid-template-columns:1fr; gap:15px; }
  .bn-solution { padding:29px 25px; }
  .bn-solution h3 { font-size:27px; }
  .bn-solution-description { font-size:13px; }
  .bn-solution-upper { margin-bottom:22px; }
  .bn-solution-diagram { margin:17px 0 24px; }
  .bn-model { padding:78px 0 86px; }
  .bn-model-grid { grid-template-columns:1fr; gap:26px; }
  .bn-model-head h2 { font-size:clamp(34px,8vw,45px); }
  .bn-bridge { padding:74px 0; }
  .bn-bridge-grid { grid-template-columns:1fr; gap:21px; }
  .bn-bridge h2 { font-size:clamp(30px,7vw,40px); }
  .bn-cta { padding:78px 0 86px; }
  .bn-cta-grid { grid-template-columns:1fr; gap:24px; }
  .bn-cta h2 { font-size:clamp(39px,9.1vw,50px); }
  .bn-cta-copy { font-size:13px; }
  .bn-cta-action { align-items:flex-start; }
  .bn-cta-action a { width:auto; height:auto; min-width:200px; border-radius:6px; padding:19px 21px; }
  .bn-footer { padding-top:61px; }
}
@media(max-width:370px) {
  .bn-shell { width:calc(100% - 30px); }
  .bn-hero h1 { font-size:32px; }
  .bn-metric-number { font-size:21px; }
}


/* ====================================================================
   BEE NEAR / INFRASTRUCTURE OBSERVATORY — block 02
   Four asymmetric architectural pillars, not commodity metric cards.
   ==================================================================== */
.bn-infra { position:relative; isolation:isolate; padding:108px 0 118px; background:#101213; color:#f4f1e9; overflow:hidden; border-top:1px solid rgba(255,255,255,.075); border-bottom:1px solid rgba(255,255,255,.09); }
.bn-infra-ambient { position:absolute; z-index:-1; inset:0; pointer-events:none; background:radial-gradient(ellipse at 84% 10%,rgba(245,190,30,.065),transparent 40%),radial-gradient(ellipse at 0% 100%,rgba(245,190,30,.022),transparent 47%); }
.bn-infra-heading { display:grid; grid-template-columns:minmax(0,1.5fr) 180px; gap:60px; align-items:center; padding-bottom:40px; }
.bn-infra-heading h2 { font-family:Manrope,Arial,sans-serif; font-size:clamp(30px,3.35vw,48px); font-weight:700; line-height:1.19; letter-spacing:-.057em; max-width:760px; margin:21px 0 15px; }
.bn-infra-heading p { font-size:14px; line-height:1.78; color:#a0a5a3; max-width:760px; }
.bn-infra-network { width:166px; height:166px; margin-left:auto; position:relative; display:grid; place-items:center; }
.bn-infra-network-rails { position:absolute; width:100%; height:100%; display:grid; align-content:space-between; padding:29px 0; transform:rotate(-29deg); opacity:.55; }
.bn-infra-network-rails span { height:1px; width:100%; background:linear-gradient(90deg,transparent,rgba(245,190,30,.38),transparent); }
.bn-infra-network-core { position:relative; z-index:2; display:grid; place-items:center; width:58px; height:58px; border-radius:50%; background:#1b1d1e; border:1px solid rgba(245,190,30,.5); box-shadow:0 0 24px rgba(245,190,30,.065); }
.bn-infra-network-core .bn-symbol { width:25px; height:28px; }
.bn-infra-network-orbit { position:absolute; border-radius:50%; border:1px solid rgba(245,190,30,.17); }
.bn-infra-network-orbit--one { inset:16px; border-top-color:rgba(245,190,30,.72); animation:bn-spin 29s linear infinite; }
.bn-infra-network-orbit--two { inset:0; border-style:dashed; opacity:.6; animation:bn-spin 51s linear infinite reverse; }
.bn-infra-network-point { position:absolute; width:5px; height:5px; background:#f0bf38; border-radius:50%; box-shadow:0 0 9px rgba(245,190,30,.5); animation:bn-blink 3.8s ease-in-out infinite; }
.bn-infra-network-point--a { top:19px; left:43px; }
.bn-infra-network-point--b { bottom:35px; right:12px; animation-delay:1.2s; }
.bn-infra-network-point--c { bottom:42px; left:15px; animation-delay:2s; }
.bn-infra-network small { position:absolute; white-space:nowrap; bottom:-17px; font-size:7px; letter-spacing:1.5px; color:#6f746f; }
.bn-infra-console { border:1px solid rgba(255,255,255,.1); background:#151718; border-radius:11px; padding:15px; box-shadow:0 18px 50px rgba(0,0,0,.16); }
.bn-infra-console-head { display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; color:#babcb8; font-size:9px; font-weight:700; letter-spacing:1.1px; padding:3px 5px 16px; }
.bn-infra-console-head>span:first-child { display:flex; align-items:center; gap:11px; }
.bn-infra-console-head>span:last-child { color:#676d6a; font-size:8px; }
.bn-infra-led { width:6px; height:6px; border-radius:50%; background:#e9bc45; box-shadow:0 0 11px rgba(245,190,30,.42); animation:bn-blink 3.7s infinite; }
.bn-infra-mosaic { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:12px; }
.bn-infra-pillar { position:relative; display:flex; flex-direction:column; min-width:0; min-height:295px; border:1px solid rgba(255,255,255,.08); border-radius:7px; padding:24px 25px 17px; overflow:hidden; background:linear-gradient(155deg,#1b1e1e,#17191a 55%,#141617); transition:border-color .3s,box-shadow .3s,transform .3s; }
.bn-infra-pillar--1,.bn-infra-pillar--4 { grid-column:span 7; }
.bn-infra-pillar--2,.bn-infra-pillar--3 { grid-column:span 5; }
.bn-infra-pillar::before { content:''; position:absolute; pointer-events:none; width:220px; height:220px; top:-190px; right:-80px; border-radius:50%; background:rgba(245,190,30,.1); filter:blur(55px); transition:transform .5s; }
.bn-infra-pillar:hover { border-color:rgba(245,190,30,.35); box-shadow:0 14px 38px rgba(0,0,0,.15); transform:translateY(-3px); }
.bn-infra-pillar:hover::before { transform:translate(-35px,55px); }
.bn-infra-pillar-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; color:#cfb572; }
.bn-infra-pillar-head svg { opacity:.75; }
.bn-infra-index { font-family:Manrope,Arial,sans-serif; color:#e8e7e2; font-size:12px; font-weight:700; letter-spacing:.5px; }
.bn-infra-index i { color:#666c68; font-style:normal; font-weight:500; }
.bn-infra-code { font-size:9px; color:#b6ab89; font-weight:700; letter-spacing:1.1px; display:block; margin-bottom:8px; }
.bn-infra-value { font-family:Manrope,Arial,sans-serif; font-size:clamp(28px,3.6vw,47px); font-weight:700; line-height:1.17; letter-spacing:-.058em; color:#efece4; display:block; }
.bn-infra-pillar--2 .bn-infra-value,.bn-infra-pillar--4 .bn-infra-value { font-size:clamp(23px,2.65vw,34px); }
.bn-infra-pillar h3 { font-family:Manrope,Arial,sans-serif; font-size:14px; font-weight:650; letter-spacing:-.02em; color:#dfd7c6; margin:6px 0 0; }
.bn-infra-signal { margin:19px 0 15px; width:100%; height:1px; background:rgba(255,255,255,.095); position:relative; overflow:hidden; }
.bn-infra-signal span { position:absolute; top:0; bottom:0; width:25%; left:0; background:linear-gradient(90deg,transparent,#e6bd57,transparent); animation:bn-infra-beam 4.2s ease-in-out infinite; }
.bn-infra-pillar:nth-child(2) .bn-infra-signal span { animation-delay:-.9s; }
.bn-infra-pillar:nth-child(3) .bn-infra-signal span { animation-delay:-1.8s; }
.bn-infra-pillar:nth-child(4) .bn-infra-signal span { animation-delay:-2.7s; }
.bn-infra-pillar p { color:#9ca2a0; font-size:12px; line-height:1.72; margin:0 0 20px; max-width:490px; }
.bn-infra-foot { color:#797f7b; margin-top:auto; padding-top:14px; border-top:1px solid rgba(255,255,255,.065); display:flex; align-items:center; justify-content:space-between; gap:10px; font-size:8px; font-weight:700; letter-spacing:1px; }
.bn-infra-foot svg { color:#d6b665; }
.bn-infra-console-foot { display:flex; justify-content:space-between; gap:16px; align-items:center; padding:16px 5px 3px; color:#737874; font-size:8px; letter-spacing:.35px; }
.bn-infra-console-foot>span:last-child { max-width:60%; display:flex; gap:7px; align-items:flex-start; line-height:1.5; }
.bn-infra-console-foot svg { flex:none; margin-top:0px; }
@keyframes bn-infra-beam { from { transform:translateX(-130%); } to { transform:translateX(510%); } }
@media (max-width:960px) {
  .bn-infra { padding:89px 0 95px; }
  .bn-infra-heading { grid-template-columns:minmax(0,1fr) 130px; gap:30px; }
  .bn-infra-network { width:120px; height:120px; }
  .bn-infra-mosaic { gap:10px; }
  .bn-infra-pillar { padding:19px 20px 15px; min-height:300px; }
  .bn-infra-pillar--1,.bn-infra-pillar--2,.bn-infra-pillar--3,.bn-infra-pillar--4 { grid-column:span 6; }
}
@media (max-width:700px) {
  .bn-infra { padding:72px 0 79px; }
  .bn-infra-heading { display:block; padding-bottom:25px; }
  .bn-infra-heading h2 { font-size:clamp(28px,7.1vw,37px); margin:18px 0 13px; }
  .bn-infra-heading p { font-size:13px; }
  .bn-infra-network { display:none; }
  .bn-infra-console { padding:9px; }
  .bn-infra-console-head { flex-direction:column; align-items:flex-start; gap:7px; padding:7px 7px 15px; }
  .bn-infra-console-head>span:last-child { font-size:7px; }
  .bn-infra-mosaic { gap:9px; }
  .bn-infra-pillar--1,.bn-infra-pillar--2,.bn-infra-pillar--3,.bn-infra-pillar--4 { grid-column:span 12; }
  .bn-infra-pillar { min-height:0; padding:20px 20px 17px; }
  .bn-infra-pillar-head { margin-bottom:20px; }
  .bn-infra-value { font-size:35px; }
  .bn-infra-pillar--2 .bn-infra-value,.bn-infra-pillar--4 .bn-infra-value { font-size:29px; }
  .bn-infra-console-foot { flex-direction:column; align-items:flex-start; gap:8px; padding:14px 7px 8px; }
  .bn-infra-console-foot>span:last-child { max-width:100%; }
}
@media (prefers-reduced-motion:reduce) { .bn-infra-pillar:hover { transform:none; } }

`;

export default function Welcome() {
  const { i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('es');
  const c = spanish ? CONTENT.es : CONTENT.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 34);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, window.scrollY / max));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = spanish ? 'es' : 'en';
  }, [spanish]);

  const closeDemo = React.useCallback(() => setDemoOpen(false), []);
  const flipLang = () => { i18n.changeLanguage(spanish ? 'en' : 'es'); setMenuOpen(false); };
  const siteUrl = 'https://beenear-web.onrender.com'; // Replace with your final canonical domain when available.
  const metaDescription = 'AI-Powered Contact Center, Virtual Contact Center, BPO Nearshoring Services and AI Sales Intake. Bee Near combines conversational voice AI and human expertise.';
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', name: 'Bee Near', url: siteUrl, logo: `${siteUrl}/images/logo.png`, description: metaDescription, contactPoint: [{ '@type': 'ContactPoint', telephone: '+1-215-318-0179', contactType: 'sales', email: 'moreinfo@beenear.mx' }] },
      { '@type': 'Service', name: 'AI-Powered Contact Center & Intake Sales', provider: { '@type': 'Organization', name: 'Bee Near', url: siteUrl }, areaServed: [{ '@type': 'Country', name: 'United States' }, { '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'Mexico' }], serviceType: ['AI-Powered Contact Center', 'Virtual Contact Center', 'BPO Nearshoring Services', 'Conversational Voice AI', 'AI Sales Intake', 'Hybrid Contact Center'], description: metaDescription },
    ],
  };
  return (
    <>
      <Head title="AI-Powered Contact Center & Intake Sales | Bee Near">
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI-Powered Contact Center & Intake Sales | Bee Near" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/images/imagotipo.jpeg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bee Near — AI + Human Operations" />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <style>{STYLES}</style>
      <div className="bn" id="top">
        <div className="bn-progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
        <header className={`bn-nav ${scrolled ? 'bn-nav--scrolled' : ''}`}>
          <Link className="bn-brand" href="/" aria-label="Bee Near home">
            <BeeSymbol />
            <span><span className="bn-brand-name">Bee<b>Near</b></span><span className="bn-brand-tag">HUMAN × INTELLIGENCE</span></span>
          </Link>
          <nav className="bn-nav-links" aria-label="Main navigation">
            <a href="#solutions">{c.nav[0]}</a>
            <a href="#how-it-works">{c.nav[1]}</a>
            <Link href="/nosotros">{c.nav[2]}</Link>
            <Link href="/blog">{c.nav[3]}</Link>
          </nav>
          <div className="bn-nav-actions">
            <button className="bn-lang" type="button" onClick={flipLang} aria-label={c.language}>
              <Globe2 size={15} />{spanish ? 'EN' : 'ES'}
            </button>
            <Link href="/contacto" className="bn-nav-cta">{c.contact}<ArrowUpRight size={16} /></Link>
            <button className="bn-menu-btn" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </header>
        {menuOpen && (
          <nav className="bn-mobile" aria-label="Mobile navigation">
            <a href="#solutions" onClick={() => setMenuOpen(false)}>{c.nav[0]}<ArrowUpRight size={15} /></a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>{c.nav[1]}<ArrowUpRight size={15} /></a>
            <Link href="/nosotros" onClick={() => setMenuOpen(false)}>{c.nav[2]}<ArrowUpRight size={15} /></Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>{c.nav[3]}<ArrowUpRight size={15} /></Link>
            <Link href="/contacto" onClick={() => setMenuOpen(false)}>{c.contact}<ArrowUpRight size={15} /></Link>
            <button type="button" onClick={flipLang}>{spanish ? 'English' : 'Español'}<Globe2 size={15} /></button>
          </nav>
        )}
        <main>
          <section className="bn-hero" aria-labelledby="bn-hero-title">
            <div className="bn-grid" aria-hidden="true" />
            <div className="bn-hero-sweep" aria-hidden="true" />
            <div className="bn-shell bn-hero-content">
              <div className="bn-hero-copy">
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h1 id="bn-hero-title"><span>{c.heroA}</span>{' '}<span>{c.heroB}</span>{' '}<em>{c.heroC}</em>{' '}<small>{c.heroD}</small></h1>
                <p className="bn-hero-lead">{c.heroLead}</p>
                <div className="bn-hero-buttons">
                  <button className="bn-button bn-button--yellow" onClick={() => setDemoOpen(true)} type="button"><Mic2 size={18} />{c.demo}<ArrowUpRight size={17} /></button>
                  <a className="bn-button bn-button--outline" href="#how-it-works">{c.how}<ArrowDownRight size={18} /></a>
                </div>
                <div className="bn-hero-micro"><ShieldCheck size={17} />{c.heroMicro}</div>
              </div>
              <div className="bn-hero-aside"><ControlDeck c={c} spanish={spanish} /></div>
            </div>
            <div className="bn-hero-bottom"><div className="bn-shell bn-hero-bottom-inner"><a className="bn-scroll-hint" href="#approach"><span className="bn-scroll-icon"><ArrowDownRight size={14} /></span>{c.scroll}</a><span className="bn-hero-location">BEE NEAR / US · CA · MX</span></div></div>
          </section>
          <section className="bn-ticker" aria-label="Bee Near capabilities"><div className="bn-ticker-viewport">{[0,1].map((repeat) => <div className="bn-ticker-group" key={repeat} aria-hidden={repeat === 1}>{c.ticker.map((item,i) => <span className="bn-ticker-unit" key={i}>{item}<Sparkles size={14} strokeWidth={1.5} /></span>)}</div>)}</div></section>
          <section className="bn-intro" id="approach"><div className="bn-shell"><SectionReveal className="bn-intro-grid"><div><Eyebrow light>{c.introIndex}</Eyebrow><h2>{c.introLead} <em>{c.introHighlight}</em></h2></div><div className="bn-intro-right"><p>{c.introCopy}</p><div className="bn-intro-tags"><span>{c.introTag1}</span><span>{c.introTag2}</span><span>{c.introTag3}</span></div></div></SectionReveal></div></section>
          <section className="bn-solutions" id="solutions"><div className="bn-shell"><SectionReveal className="bn-section-head"><div><Eyebrow>{c.solutionsIndex}</Eyebrow><h2>{c.solutionsTitle}<em>{c.solutionsTitle2}</em></h2></div><div className="bn-section-head-right"><h3>{c.solutionsLead}</h3><p>{c.solutionsCopy}</p></div></SectionReveal><SectionReveal className="bn-solutions-grid"><SolutionCard variant="care" index="01" label={c.careLabel} title={c.careTitle} tag={c.careTag} copy={c.careCopy} points={c.carePoints} href="/servicios/contact-center" action={c.exploreCare} /><SolutionCard variant="sales" index="02" label={c.salesLabel} title={c.salesTitle} tag={c.salesTag} copy={c.salesCopy} points={c.salesPoints} href="/servicios/intake-sales" action={c.exploreSales} /></SectionReveal></div></section>
          <InfrastructureSection c={c} />
          <section className="bn-model" id="how-it-works"><div className="bn-shell"><div className="bn-model-grid"><SectionReveal className="bn-model-head"><Eyebrow>{c.howIndex}</Eyebrow><h2>{c.howTitle}<br /><em>{c.howTitle2}</em></h2><div className="bn-model-large-num" aria-hidden="true">04</div></SectionReveal><div className="bn-steps">{c.steps.map(([num,title,description],i) => <SectionReveal className="bn-step" key={num}><div className="bn-step-icon">{num}</div><div className="bn-step-details"><h3>{title}</h3><p>{description}</p></div></SectionReveal>)}</div></div></div></section>
          <section className="bn-bridge"><div className="bn-shell"><SectionReveal className="bn-bridge-grid"><div className="bn-bridge-signature"><BeeSymbol /><div className="bn-bridge-kicker">{c.bridgeOverline}</div></div><div><h2>{c.bridgeTitle}</h2><p className="bn-bridge-copy">{c.bridgeDesc}</p></div></SectionReveal></div></section>
          <section className="bn-cta"><div className="bn-shell"><SectionReveal className="bn-cta-grid"><div><div className="bn-cta-eyebrow">{c.closingEyebrow}</div><h2><span>{c.closingTitle}</span><em>{c.closingTitle2}</em></h2><p className="bn-cta-copy">{c.closingDesc}</p></div><div className="bn-cta-action"><Link href="/contacto"><span>{c.closingCta}</span><ArrowUpRight size={28} /></Link></div></SectionReveal></div></section>
        </main>
        <footer className="bn-footer"><div className="bn-shell"><div className="bn-footer-grid"><div className="bn-footer-brand"><Link className="bn-brand" href="/"><BeeSymbol /><span><span className="bn-brand-name">Bee<b>Near</b></span><span className="bn-brand-tag">HUMAN × INTELLIGENCE</span></span></Link><p>{c.footerLine}</p></div><div className="bn-footer-col"><h4 className="bn-footer-heading">{c.footerSolutions}</h4><Link href="/servicios/contact-center">Contact Center</Link><Link href="/servicios/intake-sales">Intake Sales</Link><a href="#how-it-works">{c.nav[1]}</a></div><div className="bn-footer-col"><h4 className="bn-footer-heading">{c.footerCompany}</h4><Link href="/nosotros">{c.nav[2]}</Link><Link href="/blog">{c.nav[3]}</Link><Link href="/contacto">{c.contact}</Link></div><div className="bn-footer-col bn-footer-contact"><h4 className="bn-footer-heading">{c.footerReach}</h4><a href="mailto:moreinfo@beenear.mx">moreinfo@beenear.mx</a><a href="tel:+12153180179">+1 (215) 318-0179</a><span>Ejército Nacional 373, CDMX</span></div></div><div className="bn-footer-bottom"><span>© {new Date().getFullYear()} Bee Near. {c.rights}</span><a href="/docs/privacy_policy_for_website.pdf" target="_blank" rel="noreferrer">{c.privacy}</a><span>DESIGNED FOR CONNECTION.</span></div></div></footer>
        {demoOpen && <VoicePreviewModal c={c} onClose={closeDemo} />}
      </div>
    </>
  );
}
