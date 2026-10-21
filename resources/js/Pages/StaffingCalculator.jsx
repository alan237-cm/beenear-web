import React, { useEffect, useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Calculator,
  CheckCircle2, ChevronDown, Clock3, Download, Globe2, Info, LockKeyhole, FileSpreadsheet,
  Minus, Plus, RefreshCcw, Settings2, ShieldCheck, UsersRound,
  UserRoundCheck, UserRoundCog, AlertTriangle, Zap,
} from 'lucide-react';

/**
 * BEE NEAR — Workforce Intelligence / Staffing Calculator
 * Laravel + Inertia + React. No additional npm packages. Admin verification requires Laravel endpoints.
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

// Valores institucionales: definirlos aqui (no expuestos para edicion al cliente).
// El nivel de servicio de 92 % toma como referencia la ultima captura del encargado.
const POLICY = Object.freeze({ aht: 600, serviceLevel: 92, answerSeconds: 10, maxOccupancy: 85,
  rests: 6, training: 4, absence: 3, incidents: 2, operatorsPerSupport: 20 });

// La proyeccion solo admite llamadas completas; los antiguos ejemplos fraccionarios se redondean.
const DEFAULT_CALLS = [3, 4, 4, 5, 7, 10, 15, 32, 39, 45, 52, 60, 67, 61, 51, 47, 53, 42, 35, 14, 12, 9, 9, 10];
const DEFAULT_ROWS = () => DEFAULT_CALLS.map((calls, hour) => ({ hour, calls }));
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

// Gerente: 1 por operacion. Cada bloque de hasta 20 operadores requiere
// un supervisor, una persona de calidad y una de capacitacion.
// Al incluir el apoyo en una plantilla cerrada, se busca la maxima capacidad
// operativa que cabe en el total, sin rebajar la dotacion de soporte.
function supportRoles(agents, operationExists = agents > 0) {
  const perRole = agents > 0 ? Math.ceil(agents / POLICY.operatorsPerSupport) : 0;
  return {
    manager: operationExists ? 1 : 0,
    supervisors: perRole,
    quality: perRole,
    trainers: perRole,
  };
}
function allocateRoles(people, inclusion) {
  const input = Math.max(0, Math.trunc(people));
  const withSupport = (agents, exists = agents > 0) => {
    const support = supportRoles(agents, exists);
    return { agents, ...support, supportTotal: support.manager + support.supervisors + support.quality + support.trainers };
  };
  if (inclusion === 'additional') {
    const result = withSupport(input);
    return { ...result, reserve: 0, total: input + result.supportTotal, valid: true };
  }
  let low = 0;
  let high = input;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    const result = withSupport(middle, input > 0);
    if (middle + result.supportTotal <= input) low = middle;
    else high = middle - 1;
  }
  const result = withSupport(low, input > 0);
  return {
    ...result,
    reserve: input - low - result.supportTotal,
    total: input,
    valid: input === 0 || result.supportTotal <= input,
  };
}

const WORDS = {
  es: {
    adminTitle: 'Acceso administrativo', adminIntro: 'Ingresa la contraseña autorizada para ajustar los criterios de la simulación. Los cambios no modifican los valores oficiales de Bee Near.', adminPassword: 'Contraseña de administración', adminUnlock: 'Desbloquear parámetros', adminLock: 'Bloquear y restaurar valores oficiales', adminEnabled: 'Edición temporal habilitada', adminLocked: 'Parámetros protegidos', adminSaved: 'Sesión autorizada. Ahora puedes ajustar los parámetros superiores.', adminError: 'Contraseña incorrecta o acceso denegado.', adminMissing: 'No se pudo conectar con la validación de Laravel. Revisa las rutas y la configuración.', adminBusy: 'Validando…', adminSimulation: 'Simulación administrativa: los cambios se reflejan también en los archivos exportados.', adminInvalid: 'Los descuentos por no disponibilidad deben sumar menos de 99 %.', callsWhole: 'Solo se permiten cantidades enteras de llamadas.',
    locked: 'Políticas operativas · valores fijos', showHours: 'Mostrar y editar desglose horario', hideHours: 'Ocultar desglose horario', clearHours: 'Limpiar llamadas', config: 'Configuración definida por Bee Near', infoCSV: 'CSV conserva los datos sin diseño. Excel permite descargar el reporte con formato corporativo.',
    nav: 'Inicio', contact: 'Hablar con Bee Near', eyebrow: 'BEE NEAR / WORKFORCE INTELLIGENCE',
    title1: 'Capacidad inteligente.', title2: 'Personal preciso.',
    lead: 'Calcula la capacidad operativa con Erlang C y construye una plantilla con la estructura de coordinación definida por Bee Near.',
    b1: 'Dimensionamiento por demanda', b2: 'Plantilla de tamaño fijo',
    b1Help: 'Erlang C calcula el mínimo de agentes simultáneos requerido por cada hora. El total de referencia es el pico de personal programado.',
    b2Help: 'Indica cuántas personas necesitas; la estructura de gerente, supervisión, calidad y capacitación se calcula automáticamente.',
    demanded: 'Personas solicitadas', demandDetail: 'Agentes programados / plantilla total, según la opción elegida',
    needs: 'Proyección de llamadas', preset: 'Ejemplo del Excel', reset: 'Restablecer valores',
    calls: 'Llamadas', aht: 'TMO / AHT', seconds: 'segundos', hours: 'Hora',
    service: 'Nivel de servicio', threshold: 'Atender antes de', occupancy: 'Ocupación máxima',
    availability: 'Disponibilidad del personal', shrink: 'Ajustes por no disponibilidad',
    rests: 'Descansos', training: 'Formación', absence: 'Absentismo', incidents: 'Incidencias técnicas',
    fine: 'La disponibilidad se calcula automáticamente a partir de los porcentajes configurados. Las reglas de personal de apoyo siguen siendo obligatorias.',
    staffing: 'Estructura organizacional', structure: 'Reglas de coordinación de Bee Near',
    auto: 'Cálculo automático', automaticDetail: 'El personal de apoyo se determina por las reglas internas de Bee Near. Esta configuración es obligatoria y no se puede modificar.',
    operators: 'operadores', inclusion: '¿Cómo contabilizar al personal de apoyo?',
    additional: 'Sumarlo al total', additionalDesc: 'Operadores más gerente, supervisores, calidad y capacitadores',
    included: 'Incluirlo en el total', includedDesc: 'Plantilla total, contando también al personal de apoyo',
    report: 'RESUMEN DEL DIMENSIONAMIENTO', summary: 'Tu plantilla recomendada',
    estimated: 'Estimación basada en el modelo', requested: 'Plantilla configurada',
    staff: 'personas', agents: 'Operadores', supervisors: 'Supervisores', manager: 'Gerente', quality: 'Calidad', trainers: 'Capacitadores', reserve: 'Reserva sin asignar',
    total: 'Total de la plantilla', required: 'Operadores requeridos en hora pico', headcount: 'Agentes programados para la hora pico',
    callsDay: 'Llamadas previstas / día', peak: 'Hora de máxima demanda', capacity: 'Cobertura de la demanda',
    shortage: 'Faltan operadores para cubrir el pico calculado con Erlang C. Ajusta tu plantilla o suma al personal administrativo por separado.',
    enough: 'La plantilla operativa configurada cubre la necesidad estimada en la hora de mayor demanda.',
    invalid: 'La plantilla solicitada no permite cubrir el gerente obligatorio.',
    occupancyWarn: 'No se encontró una dotación factible bajo los parámetros fijos de Bee Near. Revisa el volumen de llamadas.',
    results: 'Proyección horaria', instructions: 'Despliega el detalle para capturar llamadas enteras por hora. El TMO solo puede cambiarse mediante acceso administrativo.',
    hourly: 'Demanda por intervalo', noData: 'No hay llamadas programadas.',
    chart: 'PERSONAL PROGRAMADO POR HORA', table: 'DETALLE HORARIO', Erlangs: 'Erlangs',
    active: 'Operadores en línea', scheduled: 'Operadores programados', achieved: 'Nivel servicio estimado',
    download: 'Descargar Excel', downloadCSV: 'CSV (datos)', print: 'Imprimir / PDF', transparent: 'Cómo se calcula',
    formula: 'Tráfico = llamadas × TMO ÷ 3,600. Erlang C estima operadores en línea; luego se divide entre la disponibilidad calculada. Para cada grupo iniciado de 20 operadores se agrega 1 supervisor, 1 integrante de calidad y 1 capacitador, además de 1 gerente por operación.',
    disclaimer: 'Herramienta orientativa. La plantilla pico no equivale a la nómina necesaria para cubrir todos los turnos del día. No contempla turnos, legislación laboral, mezcla de canales ni abandono. Los valores predeterminados provienen del ejemplo de Excel y no garantizan el resultado operativo.',
    noteWorkbook: 'En el Excel original el tráfico utiliza ÷1,800 y la macro Agerlang es personalizada; aquí utilizamos Erlang C estándar (÷3,600) para intervalos de una hora. Las cifras pueden diferir.',
    ratio: 'Regla fija: 1 gerente por operación y 1 supervisor, 1 calidad y 1 capacitador por cada 20 operadores o fracción.',
    units: 'personas', back: 'Volver al inicio', preview: 'Estimación, no cotización',
    example: 'Ejemplo: 30 operadores + 1 gerente + 2 supervisores + 2 de calidad + 2 capacitadores = 37 personas. El personal de apoyo puede sumarse o incluirse dentro del total.',
    csvName: 'dimensionamiento-beenear', typeHour: 'Por hora', sl: 'NS',
  },
  en: {
    adminTitle: 'Administrator access', adminIntro: 'Enter the authorized password to adjust simulation parameters. Changes do not alter Bee Near official defaults.', adminPassword: 'Administrator password', adminUnlock: 'Unlock parameters', adminLock: 'Lock and restore official defaults', adminEnabled: 'Temporary editing enabled', adminLocked: 'Protected parameters', adminSaved: 'Authorized session. Operational parameters can now be edited above.', adminError: 'Incorrect password or access denied.', adminMissing: 'Could not reach Laravel authorization. Check routes and configuration.', adminBusy: 'Verifying…', adminSimulation: 'Administrator simulation: changes are reflected in exports.', adminInvalid: 'Total shrinkage must remain below 99%.', callsWhole: 'Calls must be whole numbers.',
    locked: 'Operational policy · locked settings', showHours: 'Show and edit hourly detail', hideHours: 'Hide hourly detail', clearHours: 'Clear calls', config: 'Bee Near defined settings', infoCSV: 'CSV contains raw data without styling. Excel downloads a formatted corporate report.',
    nav: 'Home', contact: 'Talk to Bee Near', eyebrow: 'BEE NEAR / WORKFORCE INTELLIGENCE',
    title1: 'Intelligent capacity.', title2: 'Precise staffing.',
    lead: 'Estimate operational capacity with Erlang C and organize the workforce using Bee Near’s predefined management structure.',
    b1: 'Demand-based staffing', b2: 'Fixed-size workforce',
    b1Help: 'Erlang C calculates simultaneous online agents needed per hour. The staffing reference is the highest scheduled-agent demand.',
    b2Help: 'Set the requested workforce size. Management, supervision, quality and training roles are calculated automatically.',
    demanded: 'Requested workforce', demandDetail: 'Scheduled agents or total staff, according to allocation',
    needs: 'Call volume forecast', preset: 'Excel example', reset: 'Reset values',
    calls: 'Calls', aht: 'AHT', seconds: 'seconds', hours: 'Hour',
    service: 'Service level', threshold: 'Answer within', occupancy: 'Maximum occupancy',
    availability: 'Staff availability', shrink: 'Shrinkage assumptions',
    rests: 'Breaks', training: 'Training', absence: 'Absenteeism', incidents: 'Technical incidents',
    fine: 'Availability is calculated automatically from the selected percentages. Support staffing rules always remain mandatory.',
    staffing: 'Workforce structure', structure: 'Bee Near support staffing rules',
    auto: 'Automatic staffing', automaticDetail: 'Support staff is assigned under Bee Near’s internal policies. This setting is mandatory and cannot be changed.',
    operators: 'agents', inclusion: 'How do you count support staff?',
    additional: 'Add them on top', additionalDesc: 'Agents plus manager, supervisors, quality and trainers',
    included: 'Include within total', includedDesc: 'A fixed total including all support roles',
    report: 'STAFFING ANALYSIS', summary: 'Your staffing estimate',
    estimated: 'Model estimate', requested: 'Configured workforce',
    staff: 'people', agents: 'Agents', supervisors: 'Supervisors', manager: 'Manager', quality: 'Quality', trainers: 'Trainers', reserve: 'Unassigned reserve',
    total: 'Total workforce', required: 'Peak online agents required', headcount: 'Peak scheduled agents',
    callsDay: 'Forecast calls / day', peak: 'Peak hour', capacity: 'Demand coverage',
    shortage: 'Not enough agents to meet peak demand under Erlang C. Increase the workforce or add administration separately.',
    enough: 'The configured operator team covers the estimated peak-hour demand.',
    invalid: 'The requested workforce cannot accommodate the required manager.',
    occupancyWarn: 'No feasible headcount was found under Bee Near’s fixed parameters. Review call demand.',
    results: 'Hourly forecast', instructions: 'Expand to enter whole-number calls per hour. Only authorized administrators may change AHT.',
    hourly: 'Interval demand', noData: 'No calls are scheduled.',
    chart: 'SCHEDULED AGENTS BY HOUR', table: 'HOURLY DETAIL', Erlangs: 'Erlangs',
    active: 'Online agents', scheduled: 'Scheduled agents', achieved: 'Estimated service level',
    download: 'Download Excel', downloadCSV: 'CSV (data)', print: 'Print / PDF', transparent: 'Calculation method',
    formula: 'Traffic = calls × AHT ÷ 3,600. Standard Erlang C estimates online agents, then divides by the calculated availability. For each started group of 20 agents, add a supervisor, a quality analyst and a trainer, plus one manager per operation.',
    disclaimer: 'Planning estimate only. Peak staffing is not total payroll for all shifts. Does not account for shift rosters, employment law, blended channels or abandonment. Spreadsheet defaults do not guarantee operational outcomes.',
    noteWorkbook: 'The source workbook divides traffic by 1,800 and uses a custom Agerlang macro. This tool applies standard Erlang C using 3,600 seconds per hour. Results may differ.',
    ratio: 'Fixed rule: 1 manager per operation plus 1 supervisor, 1 quality analyst and 1 trainer for each 20 agents or fraction.',
    units: 'people', back: 'Back to home', preview: 'Planning estimate, not a quote',
    example: 'Example: 30 agents + 1 manager + 2 supervisors + 2 quality analysts + 2 trainers = 37 people. Support staff may be added or included in the total.',
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

function LockedField({ label, value, suffix }) {
  return <div className="bc-field bc-field--readonly">
    <div className="bc-field-title">{label}</div>
    <div className="bc-input-shell bc-input-shell--locked" aria-label={`${label}: ${value} ${suffix || ''}`}>
      <span className="bc-locked-number">{value}</span>
      {suffix && <span className="bc-suffix">{suffix}</span>}
      <LockKeyhole size={13} className="bc-locked-icon" aria-hidden="true"/>
    </div>
  </div>;
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

// Lightweight, dependency-free XLSX report writer (OOXML + ZIP/STORE).
// CSV cannot store cell styles; this workbook provides actual Excel formatting.
function xmlSafe(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function zipStore(files) {
  const enc = new TextEncoder();
  const pieces = [];
  const central = [];
  let position = 0;
  const crc32 = (data) => {
    let crc = 0xffffffff;
    for (const byte of data) {
      crc ^= byte;
      for (let i = 0; i < 8; i += 1) crc = (crc & 1) ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
    return (crc ^ 0xffffffff) >>> 0;
  };
  for (const [name, content] of files) {
    const filename = enc.encode(name);
    const data = enc.encode(content);
    const sum = crc32(data);
    const head = new Uint8Array(30 + filename.length);
    const h = new DataView(head.buffer);
    h.setUint32(0, 0x04034b50, true);
    h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true);
    h.setUint16(8, 0, true); h.setUint16(10, 0, true); h.setUint16(12, 33, true);
    h.setUint32(14, sum, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true);
    h.setUint16(26, filename.length, true); head.set(filename, 30);
    pieces.push(head, data);

    const c = new Uint8Array(46 + filename.length);
    const v = new DataView(c.buffer);
    v.setUint32(0, 0x02014b50, true);
    v.setUint16(4, 20, true); v.setUint16(6, 20, true);
    v.setUint16(8, 0x0800, true); v.setUint16(10, 0, true);
    v.setUint16(12, 0, true); v.setUint16(14, 33, true);
    v.setUint32(16, sum, true); v.setUint32(20, data.length, true); v.setUint32(24, data.length, true);
    v.setUint16(28, filename.length, true);
    v.setUint32(42, position, true);
    c.set(filename, 46);
    central.push(c);
    position += head.length + data.length;
  }
  const centralStart = position;
  for (const part of central) { pieces.push(part); position += part.length; }
  const footer = new Uint8Array(22);
  const f = new DataView(footer.buffer);
  f.setUint32(0, 0x06054b50, true);
  f.setUint16(8, files.length, true); f.setUint16(10, files.length, true);
  f.setUint32(12, position - centralStart, true); f.setUint32(16, centralStart, true);
  pieces.push(footer);
  return new Blob(pieces, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
function excelCol(index) {
  let result = '';
  for (let n = index; n > 0; n = Math.floor((n - 1) / 26)) result = String.fromCharCode(65 + (n - 1) % 26) + result;
  return result;
}
function excelSheet(spec) {
  const lines = spec.rows.slice().sort((a, b) => a.row - b.row).map(({ row, height, cells }) => {
    const inner = cells.map(({ col, value, style = 0, number = false }) => {
      const address = `${excelCol(col)}${row}`;
      if (number && Number.isFinite(Number(value))) {
        return `<c r="${address}" s="${style}"><v>${Number(value)}</v></c>`;
      }
      return `<c r="${address}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xmlSafe(value)}</t></is></c>`;
    }).join('');
    return `<row r="${row}"${height ? ` ht="${height}" customHeight="1"` : ''}>${inner}</row>`;
  }).join('');
  const columns = spec.widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');
  const merges = (spec.merges || []).map((ref) => `<mergeCell ref="${ref}"/>`).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<sheetViews><sheetView showGridLines="0" workbookViewId="0"/></sheetViews>` +
    `<sheetFormatPr defaultRowHeight="18"/><cols>${columns}</cols><sheetData>${lines}</sheetData>` +
    (merges ? `<mergeCells count="${spec.merges.length}">${merges}</mergeCells>` : '') +
    `<pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>` +
    `<pageSetup orientation="landscape" paperSize="9" fitToWidth="1"/>` +
    `</worksheet>`;
}
const EXCEL_STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="7">
    <font><sz val="11"/><name val="Aptos"/><color rgb="FF343638"/></font>
    <font><b/><sz val="18"/><name val="Aptos Display"/><color rgb="FFF7F3E8"/></font>
    <font><b/><sz val="11"/><name val="Aptos"/><color rgb="FF222426"/></font>
    <font><b/><sz val="11"/><name val="Aptos"/><color rgb="FFE2BC57"/></font>
    <font><b/><sz val="24"/><name val="Aptos Display"/><color rgb="FF222426"/></font>
    <font><sz val="10"/><name val="Aptos"/><color rgb="FF6C7070"/></font>
    <font><b/><sz val="11"/><name val="Aptos"/><color rgb="FFFFFFFF"/></font>
  </fonts>
  <fills count="7">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF191C1D"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF5BE1E"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF1EEE6"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF3CA"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="3">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left/><right/><top/><bottom style="hair"><color rgb="FFDDDBD2"/></bottom><diagonal/></border>
    <border><left style="thin"><color rgb="FFD0B65A"/></left><right style="thin"><color rgb="FFD0B65A"/></right><top style="thin"><color rgb="FFD0B65A"/></top><bottom style="thin"><color rgb="FFD0B65A"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="12">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="6" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="5" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="6" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="5" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="4" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
function exportStyledWorkbook(data, lang, filename) {
  const es = lang === 'es';
  const currentPolicy = data.policy;
  const now = new Date().toLocaleString(es ? 'es-MX' : 'en-US');
  const book = { rows: [], widths: [20, 19, 19, 19, 21, 19, 19, 23], merges: [] };
  const hourlySheet = { rows: [], widths: [18, 19, 19, 21, 21, 22, 23, 20], merges: [] };
  const insert = (sheet, row, cells, height = 24) => {
    const converted = cells.map(([col, value, style = 4, number = false]) => ({col, value, style, number}));
    const existing = sheet.rows.find((entry) => entry.row === row);
    if (existing) { existing.cells.push(...converted); existing.height = Math.max(existing.height, height); }
    else sheet.rows.push({ row, height, cells: converted });
  };
  const merged = (sheet, row, colStart, colEnd, value, style, height = 24) => {
    insert(sheet, row, [[colStart, value, style, typeof value === 'number']], height);
    sheet.merges.push(`${excelCol(colStart)}${row}:${excelCol(colEnd)}${row}`);
  };
  const section = (sheet, row, title) => merged(sheet, row, 1, 8, title, 3, 28);
  const pair = (sheet, row, label, value, numeric = false) => {
    insert(sheet, row, [[1, label, 4], [5, value, 5, numeric]], 24);
    sheet.merges.push(`A${row}:D${row}`, `E${row}:H${row}`);
  };
  merged(book, 1, 1, 8, 'BEE NEAR   /   WORKFORCE INTELLIGENCE', 1, 44);
  merged(book, 2, 1, 8, es ? 'REPORTE EJECUTIVO DE DIMENSIONAMIENTO' : 'EXECUTIVE STAFFING REPORT', 2, 31);
  merged(book, 4, 1, 8, `${es ? 'Generado' : 'Generated'}: ${now}    |    Erlang C   |   Bee Near`, 9, 24);
  section(book, 6, es ? '01  /  ESTRUCTURA TOTAL' : '01  /  TOTAL WORKFORCE');
  merged(book, 7, 1, 4, es ? 'Personas calculadas' : 'Estimated headcount', 3, 35);
  merged(book, 7, 5, 8, data.roles.total, 10, 35);
  pair(book, 9, es ? 'Operadores' : 'Agents', data.roles.agents, true);
  pair(book, 10, es ? 'Gerente' : 'Manager', data.roles.manager, true);
  pair(book, 11, es ? 'Supervisores' : 'Supervisors', data.roles.supervisors, true);
  pair(book, 12, es ? 'Personal de calidad' : 'Quality staff', data.roles.quality, true);
  pair(book, 13, es ? 'Capacitadores' : 'Trainers', data.roles.trainers, true);
  pair(book, 14, es ? 'Reserva sin asignar' : 'Unallocated reserve', data.roles.reserve, true);
  pair(book, 15, es ? 'Modalidad' : 'Allocation method', data.inclusion === 'additional' ? (es ? 'Apoyo adicional' : 'Support added') : (es ? 'Incluido en total' : 'Included in total'));
  pair(book, 16, es ? 'Tipo de proyección' : 'Forecast mode', data.basis === 'demand' ? (es ? 'Demanda Erlang C' : 'Erlang C demand') : (es ? 'Plantilla fija' : 'Fixed workforce'));
  section(book, 18, es ? '02  /  RESUMEN OPERATIVO' : '02  /  OPERATIONS SUMMARY');
  pair(book, 19, es ? 'Llamadas del día' : 'Calls per day', data.dailyCalls, true);
  pair(book, 20, es ? 'Hora de mayor demanda' : 'Peak hour', formatHour(data.peak.hour));
  pair(book, 21, es ? 'Agentes en línea, pico' : 'Peak online agents', data.peakOnline, true);
  pair(book, 22, es ? 'Agentes programados, pico' : 'Peak scheduled agents', data.peakScheduled, true);
  pair(book, 23, es ? 'Déficit operativo' : 'Agent shortfall', data.shortage, true);
  pair(book, 24, es ? 'Factibilidad de cálculo' : 'Calculation feasibility', data.invalidCalc ? (es ? 'Revisar demanda' : 'Review demand') : (es ? 'Calculado' : 'Calculated'));
  section(book, 25, data.adminCustomized ? (es ? '03  /  SIMULACIÓN ADMINISTRATIVA' : '03  /  ADMINISTRATOR SIMULATION') : (es ? '03  /  PARÁMETROS OFICIALES' : '03  /  OFFICIAL SETTINGS'));
  pair(book, 26, 'AHT / TMO', `${currentPolicy.aht} s`);
  pair(book, 27, es ? 'Nivel de servicio' : 'Service level', `${currentPolicy.serviceLevel}%`);
  pair(book, 28, es ? 'Responder antes de' : 'Answer within', `${currentPolicy.answerSeconds} s`);
  pair(book, 29, es ? 'Ocupación máxima' : 'Maximum occupancy', `${currentPolicy.maxOccupancy}%`);
  pair(book, 30, es ? 'Disponibilidad' : 'Staff availability', `${(1 - data.shrinkage) * 100}%`);
  pair(book, 31, es ? 'Pausas / formación / faltas / técnica' : 'Breaks / training / absence / technical', `${currentPolicy.rests}% / ${currentPolicy.training}% / ${currentPolicy.absence}% / ${currentPolicy.incidents}%`);
  pair(book, 32, es ? 'Relación de supervisión / calidad / formación' : 'Support staffing ratio', `1 : ${currentPolicy.operatorsPerSupport}`);
  merged(book, 35, 1, 8, es ? 'MODELO ORIENTATIVO · NO EQUIVALE A CALENDARIO DE TURNOS NI COTIZACIÓN.' : 'PLANNING ESTIMATE · NOT A SHIFT ROSTER OR FINAL QUOTE.', 9, 31);

  merged(hourlySheet, 1, 1, 8, 'BEE NEAR   /   WORKFORCE INTELLIGENCE', 1, 44);
  merged(hourlySheet, 2, 1, 8, es ? 'PROYECCIÓN HORARIA DE LLAMADAS Y PERSONAL' : 'HOURLY CALLS & STAFFING FORECAST', 2, 31);
  merged(hourlySheet, 4, 1, 8, data.adminCustomized ? (es ? 'Parámetros ajustados temporalmente por administrador. Llamadas: enteros.' : 'Administrator-adjusted simulation. Calls are integers.') : (es ? 'Llamadas enteras y parámetros oficiales de Bee Near.' : 'Whole calls and Bee Near official assumptions.'), 9, 25);
  const headers = es
    ? ['Hora', 'Llamadas', 'TMO (s)', 'Tráfico (Erl)', 'En línea', 'Programados', 'Nivel serv. (%)', 'Ocupación (%)']
    : ['Hour', 'Calls', 'AHT (s)', 'Traffic (Erl)', 'Online agents', 'Scheduled', 'Service level (%)', 'Occupancy (%)'];
  insert(hourlySheet, 6, headers.map((header, index) => [index + 1, header, 7]), 30);
  data.hourly.forEach((h, index) => {
    const style = h.hour === data.peak.hour ? 8 : (index % 2 ? 9 : 4);
    insert(hourlySheet, 7 + index, [
      [1, formatHour(h.hour), style], [2, h.calls, style, true], [3, h.aht, style, true],
      [4, Number(h.traffic.toFixed(3)), style, true], [5, h.agents ?? '', style, h.agents !== null],
      [6, h.scheduled ?? '', style, h.scheduled !== null],
      [7, Number((h.serviceLevel * 100).toFixed(2)), style, true],
      [8, Number((h.occupancy * 100).toFixed(2)), style, true],
    ], 23);
  });
  merged(hourlySheet, 33, 1, 8, data.adminCustomized ? (es ? 'La fila dorada señala el pico · simulación administrativa · Erlang C estándar.' : 'Gold row marks peak · administrator simulation · standard Erlang C.') : (es ? 'La fila dorada señala el pico · parámetros oficiales · Erlang C estándar.' : 'Gold row marks peak · official assumptions · standard Erlang C.'), 9, 31);

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`;
  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${es ? 'Resumen ejecutivo' : 'Executive summary'}" sheetId="1" r:id="rId1"/><sheet name="${es ? 'Proyeccion horaria' : 'Hourly forecast'}" sheetId="2" r:id="rId2"/></sheets></workbook>`;
  const bookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const blob = zipStore([
    ['[Content_Types].xml', contentTypes], ['_rels/.rels', rootRels],
    ['xl/workbook.xml', workbook], ['xl/_rels/workbook.xml.rels', bookRels],
    ['xl/styles.xml', EXCEL_STYLES],
    ['xl/worksheets/sheet1.xml', excelSheet(book)],
    ['xl/worksheets/sheet2.xml', excelSheet(hourlySheet)],
  ]);
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = `${filename}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
}

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
.bc-auto-fixed { display:flex; align-items:center; gap:14px; padding:17px 16px; margin-bottom:13px; border:1px solid rgba(245,190,30,.62); border-radius:9px; background:linear-gradient(105deg,rgba(245,190,30,.11),rgba(245,190,30,.035)); color:#f7f4ec; }
.bc-auto-fixed-check { color:#f5be1e; display:inline-flex; align-items:center; justify-content:center; width:29px; height:29px; flex:none; border:1px solid rgba(245,190,30,.35); border-radius:50%; }
.bc-auto-fixed-copy { display:flex; flex-direction:column; gap:5px; flex:1; min-width:0; }
.bc-auto-fixed-copy strong { font:700 13px Manrope,sans-serif; }
.bc-auto-fixed-copy small { color:#b5b5ad; font-size:11px; line-height:1.6; }
.bc-auto-fixed-lock { color:#c8a549; flex:none; }
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
/* Campos corporativos de solo lectura */
.bc-input-shell--locked { background:#242526; border-color:#343636; padding:0 11px 0 13px; gap:8px; }
.bc-locked-number { font:750 15px Manrope,sans-serif; color:#e8dcc0; flex:1; }
.bc-locked-icon { color:#a98f4e; flex-shrink:0; }
.bc-input-shell--locked .bc-suffix { padding:0; }
.bc-policy-strip { display:flex; align-items:center; gap:8px; padding:10px 12px; margin:0 0 18px; font-size:11px; line-height:1.5; color:#dbc47f; border:1px solid rgba(245,190,30,.17); background:rgba(245,190,30,.04); border-radius:7px; }
.bc-policy-list { margin-top:14px; display:flex; flex-direction:column; gap:2px; border:1px solid #353736; border-radius:9px; overflow:hidden; }
.bc-policy-item { display:flex; gap:10px; align-items:center; justify-content:space-between; padding:11px 13px; background:#161819; border-bottom:1px solid #333536; font-size:11px; line-height:1.6; }
.bc-policy-item:last-child { border-bottom:none; }
.bc-policy-item span { color:#d0d3ce; }
.bc-policy-item strong { color:#ebc55e; font-weight:750; white-space:nowrap; }
.bc-roles { grid-template-columns:repeat(3,minmax(0,1fr)); }
.bc-role { min-height:72px; }
.bc-actions { grid-template-columns:1fr 1fr; }
.bc-actions .bc-action--primary { grid-column:1 / -1; }
.bc-hourly-toggle { display:flex; align-items:center; justify-content:space-between; gap:15px; width:100%; padding:19px 21px; background:#202223; border:1px solid #4d4531; border-radius:10px; font-size:13px; font-weight:800; color:#efdfb5; text-align:left; }
.bc-hourly-toggle:hover { border-color:#d3ad50; }
.bc-hourly-toggle svg { flex:none; }
.bc-hourly-content { padding-top:16px; }
.bc-table-static { display:inline-block; color:#dec17b; font-weight:700; padding:8px 0; }
.bc-table-section { margin-top:18px; }
.bc-report .bc-note--csv { font-size:10px; }
@media(max-width:630px){.bc-policy-item{align-items:start;flex-direction:column;gap:3px}.bc-roles{grid-template-columns:repeat(2,minmax(0,1fr))}.bc-hourly-toggle{padding:15px}.bc-action{font-size:10px}}
/* Acceso administrativo al final de la calculadora */
.bc-admin { margin:34px 0 54px; padding:24px 27px; background:linear-gradient(135deg,#202224,#17191b); border:1px solid rgba(230,194,94,.28); border-radius:12px; }
.bc-admin-top { display:flex; gap:15px; align-items:start; }
.bc-admin-icon { width:42px; height:42px; border:1px solid rgba(245,190,30,.35); background:rgba(245,190,30,.07); color:#e3bc56; border-radius:10px; display:grid; place-items:center; flex:none; }
.bc-admin h2 { font:750 17px Manrope,sans-serif; color:#f2eee4; }
.bc-admin p { max-width:820px; margin-top:7px; font-size:12px; line-height:1.75; color:#aaaea9; }
.bc-admin-form { display:flex; align-items:end; gap:10px; max-width:710px; margin:20px 0 0; }
.bc-admin-form .bc-field { flex:1; }
.bc-admin-form input { font-size:15px; }
.bc-admin-btn { background:#e6bd53; border:1px solid #e6bd53; color:#17191b; padding:0 19px; min-height:45px; border-radius:7px; font-size:12px; font-weight:800; white-space:nowrap; }
.bc-admin-btn:hover { background:#f4cd6b; }
.bc-admin-btn:disabled { opacity:.5;cursor:not-allowed; }
.bc-admin-btn--outline { margin-top:16px; color:#e6bd53; background:transparent; border-color:#8c7741; }
.bc-admin-btn--outline:hover { color:#111; }
.bc-admin-hint { margin-top:13px!important; font-size:11px!important; color:#f0d494!important; }
.bc-admin .bc-alert { margin-top:14px; }
.bc-admin-status { color:#d9bc6e; font-size:11px; font-weight:800; letter-spacing:.5px; margin-top:13px; display:flex; align-items:center; gap:7px; }
.bc-input-shell--editable { border-color:#bd9742; background:#15191a; }
.bc-policy-strip--editable { color:#e6d09a; border-color:rgba(245,190,30,.45); background:rgba(245,190,30,.08); }
.bc-admin--unlocked { border-color:rgba(245,190,30,.63); }
@media(max-width:630px){.bc-admin{padding:20px 16px}.bc-admin-form{flex-direction:column;align-items:stretch}.bc-admin-btn{width:100%}}
@media print{.bc-admin {display:none!important}}
@media print{ .bc{background:#fff;color:#191919} .bc-header-actions,.bc-tabs,.bc-stack,.bc-actions,.bc-mini-button,.bc-faq,.bc-table input{display:none!important} .bc-print-val{display:inline!important} .bc-columns{display:block} .bc-report,.bc-chart,.bc-table-wrap{position:static;background:#fff;color:#111;box-shadow:none;border:1px solid #ddd} .bc-report h2,.bc-big span,.bc-metric>span,.bc-total span,.bc-metric strong,.bc-role strong{color:#111!important} .bc-big strong{color:#8c6600!important} .bc-table{min-width:0} .bc-table td,.bc-table th{color:#111!important;padding:5px} .bc-chart-bar{print-color-adjust:exact} .bc-table-section{break-before:page} }
@media(prefers-reduced-motion:reduce){.bc *, .bc *::before,.bc *::after {transition:none!important;animation:none!important}}
`;

// Solo el backend valida contraseñas. El frontend nunca almacena la clave.
const ADMIN_ENDPOINT = '/calculadora/admin';
function csrfHeaders() {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  const xsrf = document.cookie.split('; ').find((cookie) => cookie.startsWith('XSRF-TOKEN='));
  return {
    'Accept': 'application/json', 'Content-Type': 'application/json',
    ...(token ? { 'X-CSRF-TOKEN': token } : {}),
    ...(xsrf ? { 'X-XSRF-TOKEN': decodeURIComponent(xsrf.split('=').slice(1).join('=')) } : {}),
  };
}

const ADMIN_FIELDS = [
  ['aht', 'aht', 'seconds', 30, 3600, 1],
  ['serviceLevel', 'service', '%', 50, 99.9, .1],
  ['answerSeconds', 'threshold', 'seconds', 1, 600, 1],
  ['maxOccupancy', 'occupancy', '%', 40, 99, 1],
  ['rests', 'rests', '%', 0, 98, .1],
  ['training', 'training', '%', 0, 98, .1],
  ['absence', 'absence', '%', 0, 98, .1],
  ['incidents', 'incidents', '%', 0, 98, .1],
];

export default function StaffingCalculator() {
  const { i18n } = useTranslation();
  const spanish = (i18n.resolvedLanguage || i18n.language || 'es').toLowerCase().startsWith('es');
  const t = spanish ? WORDS.es : WORDS.en;
  const locale = spanish ? 'es-MX' : 'en-US';
  const [basis, setBasis] = useState('demand'); // demand | fixed
  const [headcount, setHeadcount] = useState('100');
  const [inclusion, setInclusion] = useState('additional');
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [expandedHourly, setExpandedHourly] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminReady, setAdminReady] = useState(false);
  const [adminBusy, setAdminBusy] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [policyDraft, setPolicyDraft] = useState({ ...POLICY });

  const restoreOfficialPolicy = () => setPolicyDraft({ ...POLICY });
  const activePolicy = useMemo(() => {
    if (!adminUnlocked) return POLICY;
    const draft = { ...POLICY };
    for (const [key, , , min, max] of ADMIN_FIELDS) {
      draft[key] = bounded(policyDraft[key], min, max, POLICY[key]);
    }
    return draft;
  }, [adminUnlocked, policyDraft]);
  const adminCustomized = adminUnlocked && ADMIN_FIELDS.some(([key]) => activePolicy[key] !== POLICY[key]);

  // Validación siempre con la sesión Laravel, nunca contra una contraseña en React.
  useEffect(() => {
    let live = true;
    async function checkSession() {
      try {
        const response = await fetch(`${ADMIN_ENDPOINT}/status`, {
          credentials: 'same-origin', headers: { Accept: 'application/json' }, cache: 'no-store',
        });
        if (!response.ok) throw new Error('unavailable');
        const data = await response.json();
        if (!live) return;
        if (!data.unlocked) {
          setAdminUnlocked(false);
          setPolicyDraft({ ...POLICY });
        } else setAdminUnlocked(true);
        setAdminMessage('');
      } catch (_) {
        if (!live) return;
        setAdminUnlocked(false);
        setPolicyDraft({ ...POLICY });
        setAdminMessage('backend');
      } finally {
        if (live) setAdminReady(true);
      }
    }
    checkSession();
    const onFocus = () => { if (document.visibilityState === 'visible') checkSession(); };
    document.addEventListener('visibilitychange', onFocus);
    const sessionTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') checkSession();
    }, 60000);
    return () => {
      live = false;
      document.removeEventListener('visibilitychange', onFocus);
      window.clearInterval(sessionTimer);
    };
  }, []);

  const unlockAdmin = async (event) => {
    event.preventDefault();
    if (adminBusy || !adminPassword) return;
    setAdminBusy(true);
    setAdminMessage('');
    try {
      const response = await fetch(`${ADMIN_ENDPOINT}/unlock`, {
        method: 'POST', credentials: 'same-origin', headers: csrfHeaders(),
        body: JSON.stringify({ password: adminPassword }),
      });
      if (!response.ok) throw new Error(response.status === 401 || response.status === 429 ? 'denied' : 'backend');
      const data = await response.json();
      if (!data.unlocked) throw new Error('denied');
      setAdminUnlocked(true);
      setPolicyDraft({ ...POLICY });
      setAdminMessage('success');
    } catch (error) {
      setAdminUnlocked(false);
      setAdminMessage(error.message === 'denied' ? 'denied' : 'backend');
    } finally {
      setAdminPassword('');
      setAdminBusy(false);
    }
  };

  const lockAdmin = async () => {
    if (adminBusy) return;
    setAdminBusy(true);
    try {
      const response = await fetch(`${ADMIN_ENDPOINT}/lock`, {
        method: 'POST', credentials: 'same-origin', headers: csrfHeaders(), body: '{}',
      });
      if (!response.ok) throw new Error('backend');
      setAdminUnlocked(false);
      restoreOfficialPolicy();
      setAdminMessage('');
    } catch (_) {
      setAdminMessage('backend');
    } finally {
      setAdminBusy(false);
    }
  };

  const changePolicy = (key, rawValue) => {
    if (!adminUnlocked) return;
    setPolicyDraft((prev) => ({ ...prev, [key]: rawValue }));
  };
  const shrinkage = (activePolicy.rests + activePolicy.training + activePolicy.absence + activePolicy.incidents) / 100;
  const invalidShrink = shrinkage >= .99;
  const availability = Math.max(.01, 1 - shrinkage);
  const targets = {
    sl: activePolicy.serviceLevel / 100,
    threshold: activePolicy.answerSeconds,
    aht: activePolicy.aht,
    occupancy: activePolicy.maxOccupancy / 100,
  };

  const hourly = useMemo(() => rows.map((row) => {
    const calls = Math.trunc(bounded(row.calls, 0, 3000));
    const avg = targets.aht;
    const model = requiredAgents(calls, avg, targets.sl, targets.threshold, targets.occupancy);
    const scheduled = model.agents === null ? null : Math.ceil(model.agents / availability);
    return { ...model, hour: row.hour, calls, aht: avg, scheduled };
  }), [rows, targets.aht, targets.sl, targets.threshold, targets.occupancy, availability]);

  const invalidCalc = invalidShrink || hourly.some((h) => h.agents === null);
  const peak = hourly.reduce((best, row) => (row.scheduled ?? -1) > (best.scheduled ?? -1) ? row : best, hourly[0]);
  const peakScheduled = peak?.scheduled || 0;
  const peakOnline = peak?.agents || 0;
  const referenceCount = basis === 'demand' ? peakScheduled : Math.trunc(bounded(headcount, 0, 5000, 100));
  const roles = allocateRoles(referenceCount, inclusion);
  const shortage = Math.max(0, peakScheduled - roles.agents);
  const dailyCalls = hourly.reduce((sum, row) => sum + row.calls, 0);
  const maxScheduled = Math.max(1, ...hourly.map((row) => row.scheduled || 0));

  // La captura rechaza decimales, signos y exponentes. El modelo usa enteros.
  const updateHour = (hour, raw) => {
    if (!/^\d*$/.test(raw)) return;
    const calls = raw === '' ? '' : String(Math.min(3000, parseInt(raw, 10)));
    setRows((previous) => previous.map((row) => row.hour === hour ? { ...row, calls } : row));
  };
  const reset = () => { setRows(DEFAULT_ROWS()); setBasis('demand'); setHeadcount('100'); setInclusion('additional'); setExpandedHourly(false); if (adminUnlocked) restoreOfficialPolicy(); }; 
  const clearCalls = () => setRows(DEFAULT_ROWS().map((r) => ({...r, calls: 0})));
  const printReport = () => { setExpandedHourly(true); window.setTimeout(() => window.print(), 150); };
  const flipLang = () => i18n.changeLanguage(spanish ? 'en' : 'es');
  const saveExcel = () => exportStyledWorkbook({
    basis, inclusion, roles, hourly, dailyCalls, peak, peakOnline, peakScheduled,
    shrinkage, shortage, invalidCalc, policy: activePolicy, adminCustomized,
  }, spanish ? 'es' : 'en', t.csvName);

  const saveCSV = () => {
    // CSV exports data only; formatting is available in the XLSX export.
    const lines = [
      ['Bee Near', spanish ? 'Dimensionamiento de personal' : 'Staffing Report'],
      [spanish ? 'Modalidad' : 'Mode', basis],
      [spanish ? 'Personal incluido' : 'Staff inclusion', inclusion],
      [spanish ? 'Operadores' : 'Agents', roles.agents],
      [spanish ? 'Gerente' : 'Manager', roles.manager],
      [spanish ? 'Supervisores' : 'Supervisors', roles.supervisors],
      [spanish ? 'Calidad' : 'Quality staff', roles.quality],
      [spanish ? 'Capacitadores' : 'Trainers', roles.trainers],
      [spanish ? 'Reserva' : 'Reserve', roles.reserve],
      [spanish ? 'Total personal' : 'Total staff', roles.total],
      [spanish ? 'AHT (seg)' : 'AHT (seconds)', activePolicy.aht],
      [spanish ? 'Nivel de servicio (%)' : 'Service level (%)', activePolicy.serviceLevel],
      [spanish ? 'Responder antes de (seg)' : 'Answer within (seconds)', activePolicy.answerSeconds],
      [spanish ? 'Ocupación máxima (%)' : 'Maximum occupancy (%)', activePolicy.maxOccupancy],
      [spanish ? 'Descansos (%)' : 'Breaks (%)', activePolicy.rests],
      [spanish ? 'Capacitación (%)' : 'Training (%)', activePolicy.training],
      [spanish ? 'Absentismo (%)' : 'Absenteeism (%)', activePolicy.absence],
      [spanish ? 'Incidencias técnicas (%)' : 'Technical incidents (%)', activePolicy.incidents],
      [spanish ? 'Disponibilidad (%)' : 'Availability (%)', Number((availability * 100).toFixed(2))],
      [spanish ? 'Tipo de valores' : 'Settings type', adminCustomized ? (spanish ? 'Simulación administrativa' : 'Administrator simulation') : (spanish ? 'Oficiales' : 'Official')], [],
      [spanish ? 'Hora' : 'Hour', spanish ? 'Llamadas' : 'Calls', 'AHT (s)', 'Erlangs',
        spanish ? 'Operadores en línea' : 'Online agents', spanish ? 'Programados' : 'Scheduled',
        spanish ? 'Nivel servicio (%)' : 'Service level (%)', spanish ? 'Ocupación (%)' : 'Occupancy (%)'],
      ...hourly.map(h => [formatHour(h.hour), h.calls, h.aht,
        h.traffic.toFixed(3), h.agents ?? '', h.scheduled ?? '',
        (h.serviceLevel * 100).toFixed(2), (h.occupancy * 100).toFixed(2)]),
    ];
    const quote = (cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`;
    const csv = '\uFEFF' + lines.map((line) => line.map(quote).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${t.csvName}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
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
              <div className={`bc-policy-strip ${adminUnlocked ? 'bc-policy-strip--editable' : ''}`}>{adminUnlocked ? <Settings2 size={15}/> : <LockKeyhole size={15}/>} {adminUnlocked ? t.adminSimulation : t.locked}</div>
              <div className="bc-form-grid bc-form-grid--three">
                {adminUnlocked ? <NumberField label={t.aht} value={policyDraft.aht} onChange={v=>changePolicy('aht',v)} min={30} max={3600} suffix={t.seconds}/> : <LockedField label={t.aht} value={POLICY.aht} suffix={t.seconds}/>}
                {adminUnlocked ? <NumberField label={t.service} value={policyDraft.serviceLevel} onChange={v=>changePolicy('serviceLevel',v)} min={50} max={99.9} step={.1} suffix="%"/> : <LockedField label={t.service} value={POLICY.serviceLevel} suffix="%"/>}
                {adminUnlocked ? <NumberField label={t.threshold} value={policyDraft.answerSeconds} onChange={v=>changePolicy('answerSeconds',v)} min={1} max={600} suffix={t.seconds}/> : <LockedField label={t.threshold} value={POLICY.answerSeconds} suffix={t.seconds}/>}
              </div>
              <div className="bc-divider"/>
              <div className="bc-form-grid">
                {adminUnlocked ? <NumberField label={t.occupancy} value={policyDraft.maxOccupancy} onChange={v=>changePolicy('maxOccupancy',v)} min={40} max={99} suffix="%"/> : <LockedField label={t.occupancy} value={POLICY.maxOccupancy} suffix="%"/>}
                <LockedField label={t.availability} value={format(availability*100,1,locale)} suffix="%"/>
              </div>
              <h3 className="bc-subhead">{t.shrink}</h3>
              <div className="bc-factor-grid">
                {[['rests',t.rests],['training',t.training],['absence',t.absence],['incidents',t.incidents]].map(([key,label]) => adminUnlocked
                  ? <NumberField key={key} label={label} value={policyDraft[key]} onChange={v=>changePolicy(key,v)} min={0} max={98} step={.1} suffix="%"/>
                  : <LockedField key={key} label={label} value={POLICY[key]} suffix="%"/>)}
              </div>
              <p className="bc-note"><Info size={14}/>{t.fine}</p>
              {invalidShrink && <div className="bc-alert" style={{marginTop:13}}><AlertTriangle size={17}/>{t.adminInvalid}</div>}
            </section>
            <section className="bc-panel" aria-label={t.staffing}>
              <div className="bc-panel-head"><h2><UserRoundCog size={19}/>{t.staffing}</h2><small>02 / 03</small></div>
              <h3 className="bc-subhead" style={{marginTop:0}}>{t.inclusion}</h3>
              <div className="bc-choice-grid">
                <RadioCard active={inclusion==='additional'} onClick={()=>setInclusion('additional')} title={t.additional} description={t.additionalDesc}/>
                <RadioCard active={inclusion==='included'} onClick={()=>setInclusion('included')} title={t.included} description={t.includedDesc}/>
              </div>
              <h3 className="bc-subhead">{t.structure}</h3>
              {/* Política institucional: el cálculo automático es la única modalidad disponible. */}
              <div className="bc-auto-fixed" role="note" aria-label={t.auto}>
                <span className="bc-auto-fixed-check"><CheckCircle2 size={18} aria-hidden="true"/></span>
                <span className="bc-auto-fixed-copy"><strong>{t.auto}</strong><small>{t.automaticDetail}</small></span>
                <LockKeyhole size={16} className="bc-auto-fixed-lock" aria-hidden="true"/>
              </div>
              <div className="bc-policy-list">
                {[
                  [t.manager, spanish ? '1 por operación' : '1 per operation'],
                  [t.supervisors, `1 / ${POLICY.operatorsPerSupport} ${t.operators}`],
                  [t.quality, `1 / ${POLICY.operatorsPerSupport} ${t.operators}`],
                  [t.trainers, `1 / ${POLICY.operatorsPerSupport} ${t.operators}`],
                ].map(([label,value])=><div className="bc-policy-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <p className="bc-note"><Info size={14}/>{t.example}</p>
            </section>
          </div>
          <aside className="bc-panel bc-report" aria-live="polite">
            <div className="bc-panel-head" style={{marginBottom:5}}><div className="bc-report-overline">{t.report}</div><BarChart3 size={20} color="#deb855"/></div>
            <h2>{t.summary}</h2>
            <div className="bc-big"><strong>{roles.valid ? format(roles.total,0,locale) : '—'}</strong><span>{t.staff}</span></div>
            <div className="bc-roles">
              {[
                [t.agents, roles.agents], [t.manager, roles.manager],
                [t.supervisors, roles.supervisors], [t.quality, roles.quality],
                [t.trainers, roles.trainers],
              ].map(([label,value])=><div className="bc-role" key={label}><strong>{roles.valid?format(value,0,locale):'—'}</strong><span>{label}</span></div>)}
            </div>
            {roles.reserve>0 && <p className="bc-note">{t.reserve}: {roles.reserve}</p>}
            <div className="bc-total"><span>{t.total}</span><strong>{roles.valid?format(roles.total,0,locale):'—'}</strong></div>
            <div className="bc-details">
              <Metric label={t.callsDay} value={format(dailyCalls,0,locale)}/>
              <Metric label={t.peak} value={formatHour(peak?.hour||0)}/>
              <Metric label={t.required} value={format(peakOnline,0,locale)}/>
              <Metric label={t.headcount} value={format(peakScheduled,0,locale)} highlight/>
            </div>
            {!roles.valid ? <div className="bc-alert"><AlertTriangle size={17}/>{t.invalid}</div> : invalidCalc ? <div className="bc-alert"><AlertTriangle size={17}/>{t.occupancyWarn}</div> : shortage>0 ? <div className="bc-alert"><AlertTriangle size={17}/>{t.shortage} <strong>{spanish?'Déficit:':'Shortfall:'} {shortage}.</strong></div> : <div className="bc-success"><CheckCircle2 size={18}/>{t.enough}</div>}
            <div className="bc-actions">
              <button type="button" className="bc-action bc-action--primary" onClick={saveExcel}><FileSpreadsheet size={18}/>{t.download} (.xlsx)</button>
              <button type="button" className="bc-action" onClick={saveCSV}><Download size={17}/>{t.downloadCSV}</button>
              <button type="button" className="bc-action" onClick={printReport}><ArrowUpRight size={17}/>{t.print}</button>
            </div>
            <p className="bc-note"><ShieldCheck size={15}/>{t.preview}</p>
          </aside>
        </div>
        <section id="bc-hourly" className="bc-table-section" aria-label={t.results}>
          <div className="bc-table-header">
            <div><div className="bc-eyebrow" style={{marginBottom:12}}>03 / 03</div><h2>{t.results}</h2><p>{t.instructions}</p></div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <button type="button" className="bc-mini-button" onClick={clearCalls}><RefreshCcw size={15}/>{t.clearHours}</button>
              <button type="button" className="bc-mini-button" onClick={reset}><RefreshCcw size={15}/>{t.reset}</button>
            </div>
          </div>
          <button type="button" className="bc-hourly-toggle" aria-expanded={expandedHourly} aria-controls="bc-hourly-content" onClick={()=>setExpandedHourly(open=>!open)}>
            <span style={{display:'inline-flex',alignItems:'center',gap:10}}><BarChart3 size={19}/>{expandedHourly ? t.hideHours : t.showHours}</span>
            <ChevronDown size={19} style={{transform:expandedHourly?'rotate(180deg)':'none',transition:'transform .2s'}}/>
          </button>
          {expandedHourly && <div id="bc-hourly-content" className="bc-hourly-content">
            <div className="bc-chart"><div className="bc-chart-title">{t.chart}</div><div className="bc-chart-bars" role="img" aria-label={t.chart}>
              {hourly.map((h)=><div key={h.hour} tabIndex={0} className={`bc-chart-bar ${h.hour===peak.hour?'bc-chart-bar--peak':''}`} style={{height:`${Math.max(2,((h.scheduled||0)/maxScheduled)*100)}%`}} data-tip={`${formatHour(h.hour)} · ${h.scheduled ?? '—'}`} title={`${formatHour(h.hour)}: ${h.scheduled ?? '—'}`}/>) }
            </div><div className="bc-chart-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></div></div>
            <div className="bc-table-wrap"><table className="bc-table"><thead><tr><th>{t.hours}</th><th>{t.calls}</th><th>{t.aht} (s)</th><th>{t.Erlangs}</th><th>{t.active}</th><th>{t.scheduled}</th><th>{t.sl}</th></tr></thead><tbody>
              {hourly.map((h)=><tr key={h.hour} className={h.hour===peak.hour?'bc-row--peak':''}>
                <td>{formatHour(h.hour)}{h.hour===peak.hour && <span className="bc-peak-tag">PEAK</span>}</td>
                <td><input aria-label={`${t.calls} ${formatHour(h.hour)}. ${t.callsWhole}`} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} value={rows[h.hour].calls} onChange={e=>updateHour(h.hour,e.target.value)} onBlur={e=>{if(e.target.value==='')updateHour(h.hour,'0');}}/><span className="bc-print-val">{h.calls}</span></td>
                <td><span className="bc-table-static">{activePolicy.aht} s {!adminUnlocked && <LockKeyhole size={11} aria-hidden="true" style={{marginLeft:5}}/>}</span></td>
                <td>{format(h.traffic,2,locale)}</td><td>{h.agents ?? '—'}</td><td><strong>{h.scheduled ?? '—'}</strong></td><td>{format(h.serviceLevel*100,1,locale)}%</td>
              </tr>)}
            </tbody></table></div>
          </div>}
        </section>
        <div className="bc-faq">
          <details><summary>{t.transparent}<ChevronDown size={17}/></summary><p>{t.formula}</p><p>{t.noteWorkbook}</p></details>
          <details><summary>{spanish?'Limitaciones y supuestos':'Assumptions and limitations'}<ChevronDown size={17}/></summary><p>{t.disclaimer}</p></details>
        </div>
        <section className={`bc-admin ${adminUnlocked ? 'bc-admin--unlocked' : ''}`} aria-label={t.adminTitle}>
          <div className="bc-admin-top">
            <div className="bc-admin-icon">{adminUnlocked ? <Settings2 size={21}/> : <LockKeyhole size={21}/>}</div>
            <div><h2>{t.adminTitle}</h2><p>{t.adminIntro}</p>
              <div className="bc-admin-status">{adminUnlocked ? <CheckCircle2 size={14}/> : <ShieldCheck size={14}/>}{adminUnlocked ? t.adminEnabled : t.adminLocked}</div>
            </div>
          </div>
          {adminUnlocked ? <>
            <p className="bc-admin-hint">{t.adminSimulation}</p>
            <button className="bc-admin-btn bc-admin-btn--outline" type="button" disabled={adminBusy} onClick={lockAdmin}><LockKeyhole size={15} style={{verticalAlign:'middle',marginRight:7}}/>{t.adminLock}</button>
          </> : <form className="bc-admin-form" onSubmit={unlockAdmin}>
            <label className="bc-field" htmlFor="bc-admin-password"><span className="bc-field-title">{t.adminPassword}</span>
              <span className="bc-input-shell"><input id="bc-admin-password" type="password" autoComplete="off" minLength={1} maxLength={256} value={adminPassword} onChange={e=>setAdminPassword(e.target.value)} placeholder="••••••••" required/></span>
            </label>
            <button type="submit" className="bc-admin-btn" disabled={adminBusy || !adminPassword || !adminReady}>{adminBusy ? t.adminBusy : t.adminUnlock}</button>
          </form>}
          {adminMessage==='denied' && <div className="bc-alert" role="alert"><AlertTriangle size={16}/>{t.adminError}</div>}
          {adminMessage==='backend' && <div className="bc-alert" role="alert"><AlertTriangle size={16}/>{t.adminMissing}</div>}
          {adminMessage==='success' && adminUnlocked && <p className="bc-admin-hint" role="status">{t.adminSaved}</p>}
        </section>
        <footer className="bc-footer"><span>© {new Date().getFullYear()} Bee Near · Workforce Intelligence</span><Link href="/contacto">{t.contact} <ArrowRight size={14} style={{verticalAlign:'middle'}}/></Link></footer>
      </div>
    </div>
  </>;
}
