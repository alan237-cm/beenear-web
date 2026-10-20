import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Calculator,
  CheckCircle2, ChevronDown, Clock3, Download, Globe2, Info,
  Minus, Plus, RefreshCcw, Settings2, ShieldCheck, UsersRound,
  UserRoundCheck, UserRoundCog, AlertTriangle, Zap,
} from 'lucide-react';

/**
 * BEE NEAR — Workforce Intelligence / Staffing Calculator
 * Laravel + Inertia + React. No additional npm packages.
 *
 * Source reference: "Modelo dimensionamiento.xlsm" (24 hourly demand rows,
 * initial 10-minute AHT, 99% SL in 10s, 15% shrinkage).
 *
 * This is NOT an exact reproduction of the workbook's custom Agerlang macro:
 * its traffic column uses /1800 instead of /3600, which is not the standard
 * Erlang definition for 60-minute buckets. This module uses standard Erlang C.
 *
 * Results are estimates, not guarantees or employee shift scheduling.
 */

const DEFAULT_CALLS = [3, 4, 4, 5, 7, 10, 15, 32, 39, 45, 52, 60, 67, 61, 51, 47, 53, 42, 35, 13.8125, 12.125, 9.4375, 8.625, 10.4];
const DEFAULT_ROWS = () => DEFAULT_CALLS.map((calls, hour) => ({ hour, calls, aht: null }));
const format = (value, digits = 0, locale = 'es-MX') => Number(value || 0).toLocaleString(locale, { maximumFractionDigits: digits });
const safe = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const bounded = (value, min, max, fallback = min) => Math.min(max, Math.max(min, safe(value, fallback)));

// Erlang B via stable recursion, then transform to Erlang C (delay probability).
function erlangC(traffic, n) {
  if (traffic <= 0) return 0;
  if (n <= traffic) return 1;
  let b = 1;
  for (let i = 1; i <= n; i += 1) b = (traffic * b) / (i + traffic * b);
  return (n * b) / (n - traffic + traffic * b);
}

function serviceMetrics(traffic, n, aht, threshold) {
  if (traffic <= 0) return { serviceLevel: 1, occupancy: 0, asa: 0, delay: 0 };
  if (n <= traffic || n <= 0) return { serviceLevel: 0, occupancy: 1, asa: Infinity, delay: 1 };
  const delay = erlangC(traffic, n);
  return {
    serviceLevel: 1 - delay * Math.exp(-(n - traffic) * threshold / aht),
    occupancy: traffic / n,
    asa: (delay * aht) / (n - traffic),
    delay,
  };
}

function requiredAgents(calls, aht, target, threshold, occupancyLimit) {
  const traffic = (calls * aht) / 3600; // Correct traffic in Erlangs for one hour.
  if (traffic <= 0) return { traffic: 0, agents: 0, serviceLevel: 1, occupancy: 0, asa: 0 };
  // Limit extreme input values to maintain UI responsiveness.
  const start = Math.max(1, Math.floor(traffic) + 1, Math.ceil(traffic / occupancyLimit));
  for (let n = start; n <= Math.min(5000, start + 1200); n += 1) {
    const metrics = serviceMetrics(traffic, n, aht, threshold);
    if (metrics.serviceLevel >= target && metrics.occupancy <= occupancyLimit) {
      return { traffic, agents: n, ...metrics };
    }
  }
  return { traffic, agents: null, serviceLevel: 0, occupancy: 0, asa: Infinity };
}

function allocateRoles(people, inclusion, sizing, supervisorRatio, adminRatio, manualSupervisors, manualAdmins) {
  const totalInput = Math.max(0, Math.trunc(people));
  const rolesFor = (agents) => sizing === 'manual'
    ? { supervisors: manualSupervisors, admins: manualAdmins }
    : {
        supervisors: agents > 0 ? Math.ceil(agents / supervisorRatio) : 0,
        admins: agents > 0 ? Math.ceil(agents / adminRatio) : 0,
      };
  if (inclusion === 'additional') {
    const extra = rolesFor(totalInput);
    return { agents: totalInput, ...extra, reserve: 0, total: totalInput + extra.supervisors + extra.admins, valid: true };
  }
  if (sizing === 'manual' && manualSupervisors + manualAdmins > totalInput) {
    return { agents: 0, supervisors: manualSupervisors, admins: manualAdmins, reserve: 0, total: totalInput, valid: false };
  }
  // Find the maximum number of operators that fits within a *fixed* total.
  let lo = 0;
  let hi = totalInput;
  while (lo < hi) {
    const middle = Math.ceil((lo + hi) / 2);
    const extra = rolesFor(middle);
    if (middle + extra.supervisors + extra.admins <= totalInput) lo = middle;
    else hi = middle - 1;
  }
  const extra = rolesFor(lo);
  return {
    agents: lo,
    supervisors: extra.supervisors,
    admins: extra.admins,
    reserve: totalInput - lo - extra.supervisors - extra.admins,
    total: totalInput,
    valid: true,
  };
}

const WORDS = {
  es: {
    nav: 'Inicio', contact: 'Hablar con Bee Near', eyebrow: 'BEE NEAR / WORKFORCE INTELLIGENCE',
    title1: 'Capacidad inteligente.', title2: 'Personal preciso.',
    lead: 'Dimensiona tus operaciones con Erlang C y diseña una plantilla que incluya exactamente el nivel de supervisión y administración que necesitas.',
    b1: 'Dimensionamiento por demanda', b2: 'Plantilla de tamaño fijo',
    b1Help: 'Erlang C calcula el mínimo de agentes simultáneos requerido por cada hora. El total de referencia es el pico de personal programado.',
    b2Help: 'Define una plantilla de, por ejemplo, 100 personas. Elige si esa cantidad representa únicamente operadores o incluye supervisión y administración.',
    demanded: 'Personas solicitadas', demandDetail: 'Agentes programados / plantilla total, según la opción elegida',
    needs: 'Proyección de llamadas', preset: 'Ejemplo del Excel', reset: 'Restablecer valores',
    calls: 'Llamadas', aht: 'TMO / AHT', seconds: 'segundos', hours: 'Hora',
    service: 'Nivel de servicio', threshold: 'Atender antes de', occupancy: 'Ocupación máxima',
    availability: 'Disponibilidad del personal', shrink: 'Descuentos por no disponibilidad',
    rests: 'Descansos', training: 'Formación', absence: 'Absentismo', incidents: 'Incidencias técnicas',
    fine: 'Los porcentajes se suman, como en el Excel. No se aplica un porcentaje de merma adicional.',
    staffing: 'Estructura organizacional', structure: 'Personal de apoyo',
    auto: 'Cálculo automático', manual: 'Cantidades manuales',
    ratioSup: '1 supervisor por cada', ratioAdmin: '1 administrador por cada', operators: 'operadores',
    manualSup: 'Supervisores', manualAdmin: 'Administradores', inclusion: '¿Cómo contabilizar al personal de apoyo?',
    additional: 'Sumarlo al total', additionalDesc: '100 operadores + supervisores + administradores',
    included: 'Incluirlo en el total', includedDesc: '100 personas en total, incluyendo administración',
    report: 'RESUMEN DEL DIMENSIONAMIENTO', summary: 'Tu plantilla recomendada',
    estimated: 'Estimación basada en el modelo', requested: 'Plantilla configurada',
    staff: 'personas', agents: 'Operadores', supervisors: 'Supervisores', admins: 'Administración', reserve: 'Reserva sin asignar',
    total: 'Total de la plantilla', required: 'Operadores requeridos en hora pico', headcount: 'Agentes programados para la hora pico',
    callsDay: 'Llamadas previstas / día', peak: 'Hora de máxima demanda', capacity: 'Cobertura de la demanda',
    shortage: 'Faltan operadores para cubrir el pico calculado con Erlang C. Ajusta tu plantilla o suma al personal administrativo por separado.',
    enough: 'La plantilla operativa configurada cubre la necesidad estimada en la hora de mayor demanda.',
    invalid: 'Los supervisores y administradores indicados superan el total de personas solicitado.',
    occupancyWarn: 'El modelo no encontró una dotación factible con estos parámetros. Reduce la exigencia o revisa la demanda.',
    results: 'Proyección horaria', instructions: 'Edita llamadas y TMO por hora. El cálculo se actualiza automáticamente.',
    hourly: 'Demanda por intervalo', noData: 'No hay llamadas programadas.',
    chart: 'PERSONAL PROGRAMADO POR HORA', table: 'DETALLE HORARIO', Erlangs: 'Erlangs',
    active: 'Operadores en línea', scheduled: 'Operadores programados', achieved: 'Nivel servicio estimado',
    download: 'Exportar CSV', print: 'Imprimir', transparent: 'Cómo se calcula',
    formula: 'Tráfico = llamadas × TMO ÷ 3,600. Erlang C estima los agentes en línea para alcanzar el nivel de servicio. Después se divide entre la disponibilidad, se redondea hacia arriba y se añaden —o incluyen— los roles administrativos.',
    disclaimer: 'Herramienta orientativa. La plantilla pico no equivale a la nómina necesaria para cubrir todos los turnos del día. No contempla turnos, legislación laboral, mezcla de canales ni abandono. Los valores predeterminados provienen del ejemplo de Excel y no garantizan el resultado operativo.',
    noteWorkbook: 'En el Excel original el tráfico utiliza ÷1,800 y la macro Agerlang es personalizada; aquí utilizamos Erlang C estándar (÷3,600) para intervalos de una hora. Las cifras pueden diferir.',
    ratio: 'Proporción sugerida editable, no establecida por el Excel.',
    units: 'personas', back: 'Volver al inicio', preview: 'Estimación, no cotización',
    example: 'Ejemplo: 100 operadores y 5 supervisores + 2 administradores = 107 personas. Si los roles van incluidos, son 93 operadores dentro de 100.',
    csvName: 'dimensionamiento-beenear', typeHour: 'Por hora', sl: 'NS',
  },
  en: {
    nav: 'Home', contact: 'Talk to Bee Near', eyebrow: 'BEE NEAR / WORKFORCE INTELLIGENCE',
    title1: 'Intelligent capacity.', title2: 'Precise staffing.',
    lead: 'Size your contact center using Erlang C and design a workforce with the right level of supervision and administrative support.',
    b1: 'Demand-based staffing', b2: 'Fixed-size workforce',
    b1Help: 'Erlang C calculates simultaneous online agents needed per hour. The staffing reference is the highest scheduled-agent demand.',
    b2Help: 'Set a workforce size, such as 100 people. Choose whether that means 100 agents plus management or 100 people including management.',
    demanded: 'Requested workforce', demandDetail: 'Scheduled agents or total staff, according to allocation',
    needs: 'Call volume forecast', preset: 'Excel example', reset: 'Reset values',
    calls: 'Calls', aht: 'AHT', seconds: 'seconds', hours: 'Hour',
    service: 'Service level', threshold: 'Answer within', occupancy: 'Maximum occupancy',
    availability: 'Staff availability', shrink: 'Shrinkage adjustments',
    rests: 'Breaks', training: 'Training', absence: 'Absenteeism', incidents: 'Technical incidents',
    fine: 'Percentages are added together, as in the spreadsheet. No additional shrinkage is applied.',
    staffing: 'Workforce structure', structure: 'Support staff',
    auto: 'Automatic ratio', manual: 'Manual headcounts',
    ratioSup: '1 supervisor per', ratioAdmin: '1 administrator per', operators: 'agents',
    manualSup: 'Supervisors', manualAdmin: 'Administrators', inclusion: 'How do you count support staff?',
    additional: 'Add them on top', additionalDesc: '100 agents + supervisors + administrators',
    included: 'Include within total', includedDesc: '100 people overall, including management',
    report: 'STAFFING ANALYSIS', summary: 'Your staffing estimate',
    estimated: 'Model estimate', requested: 'Configured workforce',
    staff: 'people', agents: 'Agents', supervisors: 'Supervisors', admins: 'Administration', reserve: 'Unassigned reserve',
    total: 'Total workforce', required: 'Peak online agents required', headcount: 'Peak scheduled agents',
    callsDay: 'Forecast calls / day', peak: 'Peak hour', capacity: 'Demand coverage',
    shortage: 'Not enough agents to meet peak demand under Erlang C. Increase the workforce or add administration separately.',
    enough: 'The configured operator team covers the estimated peak-hour demand.',
    invalid: 'The requested supervisors and administrators exceed the total workforce size.',
    occupancyWarn: 'No feasible headcount found under these parameters. Reduce the targets or review demand.',
    results: 'Hourly forecast', instructions: 'Edit calls and AHT by hour. Results update automatically.',
    hourly: 'Interval demand', noData: 'No calls are scheduled.',
    chart: 'SCHEDULED AGENTS BY HOUR', table: 'HOURLY DETAIL', Erlangs: 'Erlangs',
    active: 'Online agents', scheduled: 'Scheduled agents', achieved: 'Estimated service level',
    download: 'Export CSV', print: 'Print', transparent: 'Calculation method',
    formula: 'Traffic = calls × AHT ÷ 3,600. Standard Erlang C estimates online agents to achieve the service level. Online agents are divided by staff availability and rounded up. Supervisor and administration roles are then added or included.',
    disclaimer: 'Planning estimate only. Peak staffing is not total payroll for all shifts. Does not account for shift rosters, employment law, blended channels or abandonment. Spreadsheet defaults do not guarantee operational outcomes.',
    noteWorkbook: 'The source workbook divides traffic by 1,800 and uses a custom Agerlang macro. This tool applies standard Erlang C using 3,600 seconds per hour. Results may differ.',
    ratio: 'Editable illustrative ratios; not specified by the spreadsheet.',
    units: 'people', back: 'Back to home', preview: 'Planning estimate, not a quote',
    example: 'Example: 100 agents + 5 supervisors + 2 administrators = 107 people. If management is included, that becomes 93 agents within 100.',
    csvName: 'beenear-staffing-estimate', typeHour: 'Per hour', sl: 'SL',
  },
};

function BeeMark() {
  return <span className="bc-mark" aria-hidden="true"><svg viewBox="0 0 38 40" fill="none"><path d="M19 2 3 11v18l16 9 16-9V11L19 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M19 3v34M3.5 11.5 35 29M35 11.5 3.5 29" stroke="currentColor" strokeWidth="1.2" opacity=".65"/><circle cx="19" cy="20" r="5" fill="currentColor"/></svg></span>;
}

function NumberField({ label, value, onChange, min = 0, max = 10000, step = 1, suffix, hint }) {
  return (
    <label className="bc-field">
      <span className="bc-field-title">{label}</span>
      <span className="bc-input-shell">
        <input type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} />
        {suffix && <span className="bc-suffix">{suffix}</span>}
      </span>
      {hint && <small className="bc-field-hint">{hint}</small>}
    </label>
  );
}

function RadioCard({ active, onClick, title, description, icon: Icon }) {
  return <button type="button" className={`bc-radio ${active ? 'bc-radio--active' : ''}`} aria-pressed={active} onClick={onClick}>
    <span className="bc-radio-circle"><span /></span>
    <span className="bc-radio-content"><strong>{title}</strong><small>{description}</small></span>
    {Icon && <Icon size={18} strokeWidth={1.5} />}
  </button>;
}

function Metric({ label, value, unit, highlight = false }) {
  return <div className={`bc-metric ${highlight ? 'bc-metric--highlight' : ''}`}><span>{label}</span><div><strong>{value}</strong>{unit && <small>{unit}</small>}</div></div>;
}

function formatHour(hour) { return `${String(hour).padStart(2, '0')}:00`; }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.bc { --bg:#101112; --panel:#1b1d1e; --panel2:#202223; --border:#363839; --gold:#f5be1e; --goldSoft:#e1bc5b; --cream:#f1eee7; --muted:#9da09d; min-height:100vh; font-family:'DM Sans',sans-serif; color:var(--cream); background:radial-gradient(ellipse 48% 35% at 92% 3%,rgba(245,190,30,.08),transparent 80%),#101112; -webkit-font-smoothing:antialiased; }
.bc * { box-sizing:border-box; }
.bc a { text-decoration:none; color:inherit; }
.bc button { cursor:pointer; font:inherit; }
.bc h1,.bc h2,.bc h3,.bc h4,.bc p { margin:0; }
.bc button:focus-visible,.bc input:focus-visible,.bc a:focus-visible,.bc summary:focus-visible { outline:2px solid var(--gold); outline-offset:3px; }
.bc-layout { width:min(1370px,calc(100% - 80px)); margin:auto; }
.bc-header { height:88px; display:flex; align-items:center; justify-content:space-between; gap:20px; border-bottom:1px solid rgba(255,255,255,.09); }
.bc-logo { display:flex; align-items:center; gap:10px; }
.bc-mark { width:34px; height:35px; display:inline-flex; color:var(--gold); }
.bc-mark svg { width:100%; height:100%; }
.bc-logo strong { font-size:19px; letter-spacing:-.8px; font-family:Manrope,sans-serif; }
.bc-logo strong em { color:var(--gold); font-style:normal; }
.bc-logo small { display:block; font-size:8px; letter-spacing:1.6px; color:#979995; }
.bc-header-actions { display:flex; align-items:center; gap:22px; }
.bc-back { display:flex; align-items:center; gap:9px; color:#c5c7c4!important; font-size:12px; font-weight:700; transition:color .2s; }
.bc-back:hover { color:var(--gold)!important; }
.bc-lang { display:flex; align-items:center; gap:8px; border:1px solid var(--border); background:transparent; border-radius:7px; padding:9px 12px; color:#dedfdc; font-size:11px; font-weight:700; }
.bc-intro { max-width:970px; margin:68px 0 40px; }
.bc-eyebrow { display:flex; align-items:center; gap:10px; font-size:10px; letter-spacing:1.65px; font-weight:800; color:var(--goldSoft); }
.bc-eyebrow:before { content:''; display:block; width:25px; height:1px; background:var(--gold); }
.bc-intro h1 { font-family:Manrope,sans-serif; font-size:clamp(34px,4.2vw,57px); line-height:1.16; font-weight:700; letter-spacing:-.06em; margin:19px 0 18px; }
.bc-intro h1 span { color:#e9c76a; }
.bc-intro p { color:#adafab; line-height:1.85; font-size:15px; max-width:780px; }
.bc-tabs { display:flex; gap:8px; margin:24px 0 0; flex-wrap:wrap; }
.bc-tab { display:flex; align-items:center; gap:9px; padding:14px 18px; border:1px solid #373938; background:#1b1d1e; color:#aeb1ae; border-radius:8px; font-size:12px; font-weight:800; transition:.2s; }
.bc-tab[aria-selected='true'] { background:#e8bf50; border-color:#e8bf50; color:#161716; }
.bc-tab:hover { border-color:#bfa34e; }
.bc-columns { display:grid; grid-template-columns:minmax(0,1.09fr) minmax(340px,.91fr); gap:22px; align-items:start; padding:0 0 40px; }
.bc-stack { display:flex; flex-direction:column; gap:18px; min-width:0; }
.bc-panel { background:linear-gradient(150deg,#202223,#191b1c); border:1px solid rgba(255,255,255,.10); padding:27px; border-radius:12px; box-shadow:0 12px 35px rgba(0,0,0,.10); }
.bc-panel-head { display:flex; justify-content:space-between; align-items:center; gap:15px; margin-bottom:20px; }
.bc-panel-head h2 { display:flex; align-items:center; gap:10px; font-size:16px; font-weight:800; letter-spacing:-.02em; }
.bc-panel-head h2 svg { color:#d5b24d; }
.bc-panel-head small { color:#848985; font-size:10px; letter-spacing:1px; font-weight:700; }
.bc-helper { font-size:12px; color:#a4a7a2; line-height:1.8; margin:-5px 0 22px!important; }
.bc-form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
.bc-form-grid--three { grid-template-columns:repeat(3,minmax(0,1fr)); }
.bc-field { display:flex; flex-direction:column; gap:8px; min-width:0; }
.bc-field-title { color:#cdd0cb; font-size:11px; font-weight:700; }
.bc-input-shell { display:flex; align-items:center; background:#111315; border:1px solid #3a3c3b; border-radius:8px; min-height:45px; overflow:hidden; }
.bc-input-shell:focus-within { border-color:#ba9944; }
.bc-input-shell input { appearance:textfield; width:100%; min-width:0; border:0; outline:none; padding:10px 13px; font-size:15px; color:#fff; font-family:Manrope,sans-serif; font-weight:750; background:transparent; }
.bc-input-shell input::-webkit-inner-spin-button,.bc-input-shell input::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
.bc-suffix { color:#979b97; font-size:10px; font-weight:700; padding-right:12px; white-space:nowrap; }
.bc-field-hint { color:#868b86; line-height:1.6; font-size:10px; }
.bc-subhead { margin:22px 0 12px!important; font-size:11px; font-weight:800; letter-spacing:1.3px; color:#d9b65b; }
.bc-factor-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; }
.bc-note { margin-top:13px!important; display:flex; gap:7px; align-items:flex-start; font-size:10px; line-height:1.7; color:#919691; }
.bc-note svg { margin-top:2px; flex:none; }
.bc-divider { height:1px; background:rgba(255,255,255,.095); margin:20px 0; }
.bc-choice-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.bc-radio { text-align:left; display:flex; align-items:flex-start; gap:12px; color:#ebece7; min-width:0; border:1px solid #3b3d3b; border-radius:9px; padding:16px 12px; background:#17191a; transition:border-color .2s,background .2s; }
.bc-radio--active { background:rgba(245,190,30,.065); border-color:#a18234; }
.bc-radio-circle { width:16px; height:16px; border-radius:50%; border:1px solid #828780; display:grid; place-items:center; flex:none; margin-top:2px; }
.bc-radio--active .bc-radio-circle { border-color:var(--gold); }
.bc-radio-circle span { width:7px; height:7px; background:var(--gold); border-radius:50%; opacity:0; }
.bc-radio--active .bc-radio-circle span { opacity:1; }
.bc-radio-content { flex:1; min-width:0; display:flex; flex-direction:column; gap:5px; }
.bc-radio-content strong { font-size:12px; line-height:1.35; font-weight:700; }
.bc-radio-content small { color:#969b96; font-size:10px; line-height:1.55; }
.bc-radio svg { color:#c2a450; flex:none; }
.bc-alert { display:flex; gap:10px; align-items:flex-start; padding:13px 14px; background:#372b18; border:1px solid #9d7132; color:#f2d597; border-radius:8px; font-size:11px; line-height:1.6; }
.bc-alert svg { flex:none; }
.bc-success { display:flex; align-items:flex-start; gap:10px; background:rgba(98,169,127,.075); border:1px solid rgba(116,180,136,.22); padding:14px; font-size:11px; color:#b3d2bc; line-height:1.7; border-radius:8px; }
.bc-success svg { flex:none; }
.bc-report { position:sticky; top:18px; background:linear-gradient(155deg,#292723,#1b1c1d 44%,#161819); border-color:rgba(245,190,30,.22); }
.bc-report-overline { font-size:10px; font-weight:800; letter-spacing:1.3px; color:#d7b355; }
.bc-report h2 { font:700 20px Manrope,sans-serif; letter-spacing:-.04em; margin:10px 0 20px; }
.bc-big { display:flex; align-items:baseline; gap:11px; padding:12px 0 23px; border-bottom:1px solid rgba(255,255,255,.13); }
.bc-big strong { font:750 clamp(51px,6vw,81px)/1 Manrope,sans-serif; letter-spacing:-.08em; color:#f1c94f; }
.bc-big span { font-size:14px; color:#e1e1dc; }
.bc-roles { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; padding:21px 0; }
.bc-role { background:#222425; border:1px solid rgba(255,255,255,.07); border-radius:8px; padding:13px 10px; min-width:0; }
.bc-role strong { font:700 clamp(21px,2.5vw,33px) Manrope,sans-serif; letter-spacing:-.04em; display:block; }
.bc-role span { color:#aaada8; line-height:1.5; font-size:10px; margin-top:5px; display:block; }
.bc-total { display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,.12); border-bottom:1px solid rgba(255,255,255,.12); padding:18px 0; gap:10px; }
.bc-total span { color:#c9ccc7; font-size:12px; font-weight:800; }
.bc-total strong { font:750 29px Manrope,sans-serif; color:#f0d47d; }
.bc-details { display:grid; grid-template-columns:1fr 1fr; gap:13px; padding:23px 0; }
.bc-metric { padding:12px; border:1px solid rgba(255,255,255,.07); border-radius:8px; background:rgba(255,255,255,.02); }
.bc-metric>span { color:#a8aca8; font-size:10px; line-height:1.5; display:block; }
.bc-metric>div { display:flex; gap:7px; align-items:baseline; margin-top:9px; flex-wrap:wrap; }
.bc-metric strong { font:700 23px Manrope,sans-serif; letter-spacing:-.05em; }
.bc-metric small { color:#a2a6a1; font-size:10px; }
.bc-metric--highlight strong { color:#edc353; }
.bc-actions { display:grid; grid-template-columns:1fr 1fr; gap:9px; margin-top:16px; }
.bc-action { display:flex; align-items:center; justify-content:center; gap:9px; min-height:45px; border:1px solid #484a48; border-radius:7px; background:#222424; font-size:11px; color:#edece7; font-weight:800; }
.bc-action:hover { border-color:#bfa24d; }
.bc-action--primary { background:#eec448; color:#171717; border-color:#eec448; }
.bc-action--primary:hover { background:#ffd66a; }
.bc-table-section { margin:8px 0 70px; }
.bc-table-header { display:flex; justify-content:space-between; align-items:end; gap:15px; margin-bottom:19px; }
.bc-table-header h2 { font:700 clamp(22px,2.6vw,32px) Manrope,sans-serif; letter-spacing:-.04em; }
.bc-table-header p { margin-top:7px; font-size:12px; color:#a0a39f; }
.bc-mini-button { display:flex; align-items:center; gap:7px; background:#1d1f20; border:1px solid #454746; border-radius:7px; padding:11px 13px; color:#d2d4cf; font-size:11px; font-weight:700; white-space:nowrap; }
.bc-mini-button:hover { border-color:#e6c05e; }
.bc-chart { border:1px solid rgba(255,255,255,.11); background:#1b1d1e; border-radius:12px; padding:23px 22px 18px; overflow:hidden; }
.bc-chart-title { font-size:10px; color:#d8b656; letter-spacing:1.3px; font-weight:800; margin-bottom:16px; }
.bc-chart-bars { display:grid; grid-template-columns:repeat(24,minmax(0,1fr)); gap:5px; height:135px; align-items:end; border-bottom:1px solid #434643; }
.bc-chart-bar { position:relative; background:linear-gradient(180deg,#f4cd65,#b68b2b); border-radius:3px 3px 0 0; min-height:2px; opacity:.8; transition:height .35s ease,opacity .2s; }
.bc-chart-bar:hover,.bc-chart-bar--peak { opacity:1; background:linear-gradient(180deg,#fff1b6,#f5be1e); }
.bc-chart-bar:focus-visible { outline:2px solid white; }
.bc-chart-bar::after { content:attr(data-tip); opacity:0; position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); padding:5px 7px; background:#101112; border:1px solid #666; color:#fff; font-size:10px; border-radius:5px; pointer-events:none; z-index:1; white-space:nowrap; }
.bc-chart-bar:hover::after,.bc-chart-bar:focus-visible::after { opacity:1; }
.bc-chart-axis { margin-top:11px; display:flex; justify-content:space-between; font-size:9px; color:#969a96; }
.bc-table-wrap { margin-top:17px; overflow-x:auto; background:#1b1d1e; border:1px solid rgba(255,255,255,.1); border-radius:11px; }
.bc-table { width:100%; border-collapse:collapse; min-width:670px; }
.bc-table th { text-align:left; color:#a6aaa6; font-size:10px; font-weight:800; letter-spacing:.35px; background:#252728; padding:15px 13px; white-space:nowrap; }
.bc-table td { padding:8px 13px; border-top:1px solid rgba(255,255,255,.055); font-size:12px; color:#d5d8d3; }
.bc-table tr:hover td { background:#232526; }
.bc-table tr.bc-row--peak td { background:rgba(245,190,30,.062); }
.bc-table input { width:87px; border:1px solid #414441; outline:none; background:#121415; border-radius:5px; color:#f1f1ed; padding:8px; font-size:12px; font-family:inherit; }
.bc-table input:focus { border-color:#c9a64c; }
.bc-print-val { display:none; }
.bc-table .bc-peak-tag { color:#e5bd54; font-size:9px; font-weight:800; margin-left:7px; }
.bc-faq { margin:22px 0 70px; border-top:1px solid rgba(255,255,255,.1); padding-top:22px; }
.bc-faq details { padding:15px 0; border-bottom:1px solid rgba(255,255,255,.09); }
.bc-faq summary { font-weight:800; font-size:12px; color:#e7e7e2; display:flex; align-items:center; justify-content:space-between; cursor:pointer; list-style:none; }
.bc-faq summary::-webkit-details-marker { display:none; }
.bc-faq details[open] summary svg { transform:rotate(180deg); }
.bc-faq p { padding:12px 0 0; color:#a3a7a3; font-size:12px; line-height:1.9; }
.bc-footer { border-top:1px solid rgba(255,255,255,.1); padding:28px 0 45px; display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; color:#868a86; font-size:11px; }
@media(max-width:1050px){ .bc-layout{width:calc(100% - 48px)} .bc-columns{grid-template-columns:1fr} .bc-report{position:static} .bc-intro{margin-top:45px} }
@media(max-width:630px){ .bc-layout{width:calc(100% - 28px)} .bc-header{height:76px} .bc-back{font-size:0!important;gap:0} .bc-back svg{width:20px;height:20px} .bc-logo strong{font-size:17px} .bc-intro{margin:40px 0 25px} .bc-intro h1{font-size:35px} .bc-intro p{font-size:13px} .bc-tab{flex:1;justify-content:center;padding:12px 9px;font-size:10px} .bc-panel{padding:19px 15px} .bc-form-grid--three,.bc-factor-grid{grid-template-columns:1fr 1fr} .bc-choice-grid{grid-template-columns:1fr} .bc-roles{gap:6px} .bc-role{padding:11px 7px} .bc-role strong{font-size:24px} .bc-role span{font-size:9px} .bc-details{gap:7px} .bc-metric{padding:10px} .bc-metric strong{font-size:21px} .bc-table-header{align-items:start;flex-direction:column} .bc-chart{padding:20px 12px} .bc-chart-bars{gap:3px;height:112px} .bc-chart-bar::after{display:none} }
@media print{ .bc{background:#fff;color:#191919} .bc-header-actions,.bc-tabs,.bc-stack,.bc-actions,.bc-mini-button,.bc-faq,.bc-table input{display:none!important} .bc-print-val{display:inline!important} .bc-columns{display:block} .bc-report,.bc-chart,.bc-table-wrap{position:static;background:#fff;color:#111;box-shadow:none;border:1px solid #ddd} .bc-report h2,.bc-big span,.bc-metric>span,.bc-total span,.bc-metric strong,.bc-role strong{color:#111!important} .bc-big strong{color:#8c6600!important} .bc-table{min-width:0} .bc-table td,.bc-table th{color:#111!important;padding:5px} .bc-chart-bar{print-color-adjust:exact} .bc-table-section{break-before:page} }
@media(prefers-reduced-motion:reduce){.bc *, .bc *::before,.bc *::after {transition:none!important;animation:none!important}}
`;

export default function StaffingCalculator() {
  const { i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'es').toLowerCase().startsWith('es');
  const t = spanish ? WORDS.es : WORDS.en;
  const locale = spanish ? 'es-MX' : 'en-US';
  const [basis, setBasis] = useState('demand'); // demand | fixed
  const [headcount, setHeadcount] = useState('100');
  const [inclusion, setInclusion] = useState('additional');
  const [sizing, setSizing] = useState('auto');
  const [ratioSupervisor, setRatioSupervisor] = useState('20');
  const [ratioAdmin, setRatioAdmin] = useState('50');
  const [manualSupervisor, setManualSupervisor] = useState('5');
  const [manualAdmin, setManualAdmin] = useState('2');
  const [serviceTarget, setServiceTarget] = useState('99');
  const [threshold, setThreshold] = useState('10');
  const [aht, setAht] = useState('600');
  const [maxOccupancy, setMaxOccupancy] = useState('85');
  const [factors, setFactors] = useState({ rests: '6', training: '4', absence: '3', incidents: '2' });
  const [rows, setRows] = useState(DEFAULT_ROWS);

  const shrinkage = Object.values(factors).reduce((sum, factor) => sum + bounded(factor, 0, 100), 0) / 100;
  const availability = Math.max(0.01, 1 - Math.min(.99, shrinkage));
  const targets = {
    sl: bounded(serviceTarget, 50, 99.9, 99) / 100,
    threshold: bounded(threshold, 1, 600, 10),
    aht: bounded(aht, 30, 3600, 600),
    occupancy: bounded(maxOccupancy, 40, 99, 85) / 100,
  };

  const hourly = useMemo(() => rows.map((row) => {
    const calls = bounded(row.calls, 0, 3000);
    const avg = bounded(row.aht ?? targets.aht, 30, 3600, targets.aht);
    const model = requiredAgents(calls, avg, targets.sl, targets.threshold, targets.occupancy);
    const scheduled = model.agents === null ? null : Math.ceil(model.agents / availability);
    return { ...model, hour: row.hour, calls, aht: avg, scheduled };
  }), [rows, targets.aht, targets.sl, targets.threshold, targets.occupancy, availability]);

  const invalidShrink = shrinkage >= 0.99;
  const invalidCalc = invalidShrink || hourly.some((h) => h.agents === null);
  const peak = hourly.reduce((best, row) => (row.scheduled ?? -1) > (best.scheduled ?? -1) ? row : best, hourly[0]);
  const peakScheduled = peak?.scheduled || 0;
  const peakOnline = peak?.agents || 0;
  const referenceCount = basis === 'demand' ? peakScheduled : Math.trunc(bounded(headcount, 0, 5000, 100));
  const roles = allocateRoles(referenceCount, inclusion, sizing, Math.max(1, Math.round(bounded(ratioSupervisor, 1, 1000, 20))), Math.max(1, Math.round(bounded(ratioAdmin, 1, 1000, 50))), Math.max(0, Math.round(bounded(manualSupervisor, 0, 1000, 5))), Math.max(0, Math.round(bounded(manualAdmin, 0, 1000, 2))));
  const shortage = Math.max(0, peakScheduled - roles.agents);
  const dailyCalls = hourly.reduce((sum, row) => sum + row.calls, 0);
  const maxScheduled = Math.max(1, ...hourly.map((row) => row.scheduled || 0));

  const updateHour = (hour, key, value) => setRows((previous) => previous.map((row) => row.hour === hour ? { ...row, [key]: value } : row));
  const reset = () => { setRows(DEFAULT_ROWS()); setAht('600'); setServiceTarget('99'); setThreshold('10'); setMaxOccupancy('85'); setFactors({ rests:'6', training:'4', absence:'3', incidents:'2' }); setBasis('demand'); setHeadcount('100'); setInclusion('additional'); setSizing('auto'); setRatioSupervisor('20'); setRatioAdmin('50'); setManualSupervisor('5'); setManualAdmin('2'); };
  const flipLang = () => i18n.changeLanguage(spanish ? 'en' : 'es');
  const saveCSV = () => {
    const separator = ';';
    const lines = [
      ['Bee Near','Contact Center Staffing Calculator'],
      ['Calculation mode',basis], ['Support staff',inclusion], ['Sizing',sizing],
      ['Target service level', serviceTarget], ['Answer threshold (s)',threshold],
      ['Max occupancy',maxOccupancy], ['Shrinkage %',String(shrinkage*100)],
      ['Peak scheduled agents',String(peakScheduled)],
      ['Operators',String(roles.agents)],['Supervisors',String(roles.supervisors)],
      ['Administrators',String(roles.admins)],['Unassigned reserve',String(roles.reserve)],
      ['Total workforce',String(roles.total)], [],
      ['Hour','Forecast calls','AHT seconds','Traffic Erlangs','Online agents','Scheduled agents','Service level %','Occupancy %'],
      ...hourly.map((h) => [formatHour(h.hour),h.calls,h.aht,h.traffic.toFixed(3),h.agents ?? '',h.scheduled ?? '',(h.serviceLevel*100).toFixed(2),(h.occupancy*100).toFixed(2)]),
    ];
    const csv = '\uFEFF' + lines.map((line) => line.map((cell) => `"${String(cell ?? '').replace(/"/g,'""')}"`).join(separator)).join('\r\n');
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `${t.csvName}.csv`; document.body.appendChild(link); link.click(); link.remove();
    URL.revokeObjectURL(url);
  };

  return <>
    <Head title={`${spanish ? 'Calculadora de personal' : 'Staffing Calculator'} | Bee Near`}>
      <meta name="description" content={spanish ? 'Calcula operadores, supervisores y administradores con Erlang C para tu contact center. Incluye administración dentro o fuera de tu plantilla.' : 'Estimate contact center agents, supervisors and administrators using Erlang C. Include overhead staff within or on top of the requested headcount.'}/>
      <meta name="robots" content="index,follow"/>
    </Head>
    <style>{CSS}</style>
    <div className="bc">
      <div className="bc-layout">
        <header className="bc-header">
          <Link href="/" className="bc-logo" aria-label="Bee Near"><BeeMark/><span><strong>Bee<em>Near</em></strong><small>HUMAN × INTELLIGENCE</small></span></Link>
          <div className="bc-header-actions"><Link href="/" className="bc-back"><ArrowLeft size={16}/>{t.back}</Link><button type="button" className="bc-lang" onClick={flipLang}><Globe2 size={15}/>{spanish?'EN':'ES'}</button></div>
        </header>
        <div className="bc-intro"><div className="bc-eyebrow">{t.eyebrow}</div><h1>{t.title1}<br/><span>{t.title2}</span></h1><p>{t.lead}</p></div>
        <div role="tablist" aria-label={t.staffing} className="bc-tabs">
          <button role="tab" aria-selected={basis==='demand'} className="bc-tab" onClick={()=>setBasis('demand')}><Activity size={17}/>{t.b1}</button>
          <button role="tab" aria-selected={basis==='fixed'} className="bc-tab" onClick={()=>setBasis('fixed')}><UsersRound size={17}/>{t.b2}</button>
        </div>
        <div className="bc-columns">
          <div className="bc-stack">
            <section className="bc-panel" aria-label={t.needs}>
              <div className="bc-panel-head"><h2><Calculator size={19}/>{basis==='fixed' ? t.b2 : t.needs}</h2><small>01 / 03</small></div>
              <p className="bc-helper">{basis==='demand'?t.b1Help:t.b2Help}</p>
              {basis==='fixed' && <div style={{maxWidth:260,marginBottom:22}}><NumberField label={t.demanded} value={headcount} onChange={setHeadcount} min={0} max={5000} suffix={t.staff}/></div>}
              <div className="bc-form-grid bc-form-grid--three">
                <NumberField label={t.aht} value={aht} onChange={setAht} min={30} max={3600} suffix={t.seconds}/>
                <NumberField label={t.service} value={serviceTarget} onChange={setServiceTarget} min={50} max={99.9} step={.1} suffix="%"/>
                <NumberField label={t.threshold} value={threshold} onChange={setThreshold} min={1} max={600} suffix={t.seconds}/>
              </div>
              <div className="bc-divider"/>
              <div className="bc-form-grid">
                <NumberField label={t.occupancy} value={maxOccupancy} onChange={setMaxOccupancy} min={40} max={99} suffix="%"/>
                <div className="bc-field"><span className="bc-field-title">{t.availability}</span><div className="bc-input-shell" style={{padding:'0 13px',color:'#f0c65f',fontWeight:800,fontSize:17}}>{format(availability*100,1,locale)}%</div></div>
              </div>
              <h3 className="bc-subhead">{t.shrink}</h3>
              <div className="bc-factor-grid">
                {[['rests',t.rests],['training',t.training],['absence',t.absence],['incidents',t.incidents]].map(([key,label])=><NumberField key={key} label={label} value={factors[key]} onChange={(val)=>setFactors(f=>({...f,[key]:val}))} min={0} max={99} suffix="%"/>)}
              </div>
              <p className="bc-note"><Info size={14}/>{t.fine}</p>
              {shrinkage>=.99 && <div className="bc-alert" style={{marginTop:13}}><AlertTriangle size={16}/>{spanish?'Los descuentos deben sumar menos de 99 %.':'Shrinkage must be less than 99%.'}</div>}
            </section>
            <section className="bc-panel" aria-label={t.staffing}>
              <div className="bc-panel-head"><h2><UserRoundCog size={19}/>{t.staffing}</h2><small>02 / 03</small></div>
              <h3 className="bc-subhead" style={{marginTop:0}}>{t.inclusion}</h3>
              <div className="bc-choice-grid">
                <RadioCard active={inclusion==='additional'} onClick={()=>setInclusion('additional')} title={t.additional} description={t.additionalDesc}/>
                <RadioCard active={inclusion==='included'} onClick={()=>setInclusion('included')} title={t.included} description={t.includedDesc}/>
              </div>
              <h3 className="bc-subhead">{t.structure}</h3>
              <div className="bc-choice-grid">
                <RadioCard active={sizing==='auto'} onClick={()=>setSizing('auto')} title={t.auto} description={t.ratio}/>
                <RadioCard active={sizing==='manual'} onClick={()=>setSizing('manual')} title={t.manual} description={spanish?'Introduce las cantidades exactas.':'Enter the exact headcounts.'}/>
              </div>
              <div className="bc-form-grid" style={{marginTop:15}}>
                {sizing==='auto' ? <>
                  <NumberField label={t.ratioSup} value={ratioSupervisor} onChange={setRatioSupervisor} min={1} max={1000} suffix={t.operators}/>
                  <NumberField label={t.ratioAdmin} value={ratioAdmin} onChange={setRatioAdmin} min={1} max={1000} suffix={t.operators}/>
                </> : <>
                  <NumberField label={t.manualSup} value={manualSupervisor} onChange={setManualSupervisor} min={0} max={1000}/>
                  <NumberField label={t.manualAdmin} value={manualAdmin} onChange={setManualAdmin} min={0} max={1000}/>
                </>}
              </div>
              <p className="bc-note"><Info size={14}/>{t.example}</p>
            </section>
          </div>
          <aside className="bc-panel bc-report" aria-live="polite">
            <div className="bc-panel-head" style={{marginBottom:5}}><div className="bc-report-overline">{t.report}</div><BarChart3 size={20} color="#deb855"/></div>
            <h2>{t.summary}</h2>
            <div className="bc-big"><strong>{roles.valid ? format(roles.total,0,locale) : '—'}</strong><span>{t.staff}</span></div>
            <div className="bc-roles">
              <div className="bc-role"><strong>{roles.valid?format(roles.agents,0,locale):'—'}</strong><span>{t.agents}</span></div>
              <div className="bc-role"><strong>{format(roles.supervisors,0,locale)}</strong><span>{t.supervisors}</span></div>
              <div className="bc-role"><strong>{format(roles.admins,0,locale)}</strong><span>{t.admins}</span></div>
            </div>
            {roles.reserve>0 && <p className="bc-note">{t.reserve}: {roles.reserve}</p>}
            <div className="bc-total"><span>{t.total}</span><strong>{roles.valid?format(roles.total,0,locale):'—'}</strong></div>
            <div className="bc-details">
              <Metric label={t.callsDay} value={format(dailyCalls,1,locale)}/>
              <Metric label={t.peak} value={formatHour(peak?.hour||0)}/>
              <Metric label={t.required} value={format(peakOnline,0,locale)}/>
              <Metric label={t.headcount} value={format(peakScheduled,0,locale)} highlight/>
            </div>
            {!roles.valid ? <div className="bc-alert"><AlertTriangle size={17}/>{t.invalid}</div> : invalidCalc ? <div className="bc-alert"><AlertTriangle size={17}/>{invalidShrink ? (spanish ? 'La suma de porcentajes de no disponibilidad debe ser menor de 99 %.' : 'Total shrinkage must be below 99%.') : t.occupancyWarn}</div> : shortage>0 ? <div className="bc-alert"><AlertTriangle size={17}/>{t.shortage} <strong>{spanish?'Déficit:':'Shortfall:'} {shortage}.</strong></div> : <div className="bc-success"><CheckCircle2 size={18}/>{t.enough}</div>}
            <div className="bc-actions">
              <button type="button" className="bc-action bc-action--primary" onClick={saveCSV}><Download size={17}/>{t.download}</button>
              <button type="button" className="bc-action" onClick={()=>window.print()}><ArrowUpRight size={17}/>{t.print}</button>
            </div>
            <p className="bc-note"><ShieldCheck size={15}/>{t.preview}</p>
          </aside>
        </div>
        <section className="bc-table-section" aria-label={t.results}>
          <div className="bc-table-header"><div><div className="bc-eyebrow" style={{marginBottom:12}}>03 / 03</div><h2>{t.results}</h2><p>{t.instructions}</p></div><button type="button" className="bc-mini-button" onClick={reset}><RefreshCcw size={15}/>{t.reset}</button></div>
          <div className="bc-chart"><div className="bc-chart-title">{t.chart}</div><div className="bc-chart-bars" role="img" aria-label={t.chart}>
            {hourly.map((h)=><div key={h.hour} tabIndex={0} className={`bc-chart-bar ${h.hour===peak.hour?'bc-chart-bar--peak':''}`} style={{height:`${Math.max(2,((h.scheduled||0)/maxScheduled)*100)}%`}} data-tip={`${formatHour(h.hour)} · ${h.scheduled ?? '—'}`} title={`${formatHour(h.hour)}: ${h.scheduled ?? '—'}`}/>)}
          </div><div className="bc-chart-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></div></div>
          <div className="bc-table-wrap"><table className="bc-table"><thead><tr><th>{t.hours}</th><th>{t.calls}</th><th>{t.aht} (s)</th><th>{t.Erlangs}</th><th>{t.active}</th><th>{t.scheduled}</th><th>{t.sl}</th></tr></thead><tbody>
            {hourly.map((h)=><tr key={h.hour} className={h.hour===peak.hour?'bc-row--peak':''}>
              <td>{formatHour(h.hour)}{h.hour===peak.hour && <span className="bc-peak-tag">PEAK</span>}</td>
              <td><input aria-label={`${t.calls} ${formatHour(h.hour)}`} type="number" min="0" max="3000" step="0.1" value={rows[h.hour].calls} onChange={e=>updateHour(h.hour,'calls',e.target.value)}/><span className="bc-print-val">{h.calls}</span></td>
              <td><input aria-label={`${t.aht} ${formatHour(h.hour)}`} type="number" min="30" max="3600" step="1" value={rows[h.hour].aht ?? aht} onChange={e=>updateHour(h.hour,'aht',e.target.value)}/><span className="bc-print-val">{h.aht}</span></td>
              <td>{format(h.traffic,2,locale)}</td><td>{h.agents ?? '—'}</td><td><strong>{h.scheduled ?? '—'}</strong></td><td>{format(h.serviceLevel*100,1,locale)}%</td>
            </tr>)}
          </tbody></table></div>
        </section>
        <div className="bc-faq">
          <details><summary>{t.transparent}<ChevronDown size={17}/></summary><p>{t.formula}</p><p>{t.noteWorkbook}</p></details>
          <details><summary>{spanish?'Limitaciones y supuestos':'Assumptions and limitations'}<ChevronDown size={17}/></summary><p>{t.disclaimer}</p></details>
        </div>
        <footer className="bc-footer"><span>© {new Date().getFullYear()} Bee Near · Workforce Intelligence</span><Link href="/contacto">{t.contact} <ArrowRight size={14} style={{verticalAlign:'middle'}}/></Link></footer>
      </div>
    </div>
  </>;
}
