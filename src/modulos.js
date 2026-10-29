/* ===== Módulos del menú: pantalla de presentación, pestañas y contenido =====
   Cada menú usa el mismo marco: banner (equipo, titular, descripción), tres cifras
   tomadas de la pestaña Resumen, dos botones y un submenú lateral cuyo primer
   elemento es «Presentación». Las cifras del tablero de Inicio salen de la misma fila. */

const VI = {
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  flow:'<rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M10 6h4v10h-3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  steps:'<path d="M4 20V14h4v6M10 20V9h4v11M16 20V4h4v16"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>',
  form:'<path d="M9 4h6l4 4v12H5V4h4"/><path d="M9 12h6M9 16h4"/>',
  layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  tool:'<path d="M14 6a4 4 0 01-5 5L4 16l4 4 5-5a4 4 0 005-5l-2 2-3-3z"/>',
  people:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 010 6M18 14c2 .6 3 2.5 3 6"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  book:'<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/>',
  design:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/>',
  bank:I.build, units:I.org, gear:I.gear, org:I.org, docs:I.doc
};

/* Datos del banner de Inicio */
const HOME = {
  equipo:'UNI',
  titular:'Una universidad que se moderniza para servir mejor',
  desc:'La Unidad de Modernización impulsa que la UNI funcione con procesos claros, trámites simples, una estructura ordenada, normas actualizadas e innovación al servicio de estudiantes, docentes y trabajadores. Trabajamos en cinco ejes —normativa, procesos, simplificación, organización e innovación— y sus resultados se reflejan en los servicios digitales que la comunidad usa cada día.'
};

const GLOSARIO = [
  ['Proceso','Conjunto de actividades relacionadas que transforman entradas en un resultado para un usuario.'],
  ['Procedimiento','Secuencia detallada de pasos para realizar una actividad o un trámite.'],
  ['TUPA','Texto Único de Procedimientos Administrativos: lista los procedimientos de la entidad con sus requisitos, plazos y costos.'],
  ['ROF','Reglamento de Organización y Funciones: define la estructura orgánica y las funciones de la entidad.'],
  ['CAP','Cuadro para Asignación de Personal: relación de cargos y plazas de la entidad.'],
  ['Innovación','Creación o mejora de soluciones que generan valor para quienes usan un servicio.'],
  ['Reto','Problema planteado como oportunidad de innovación, con la pregunta «¿Cómo podríamos…?».'],
  ['Piloto','Prueba de una solución a pequeña escala, antes de decidir si se amplía.']
];

/* ===== Cifras (pestaña Resumen) ===== */
function rinfo(res,key){
  const r = res.find(x=>norm(x.clave)===key) || {};
  return {
    pct: Math.max(0,Math.min(100,Number(r.porcentaje)||0)),
    cifra: r.cifra ?? '–',
    desc: r.descripcion || 'Sin datos',
    corte: r.corte || 'por confirmar'
  };
}
/* Cifra adicional de la pestaña Resumen (clave como «normativa_elaboracion»); «—» si aún no se carga */
function ext(res,key){
  const r = res.find(x=>norm(x.clave)===norm(key));
  return r && String(r.cifra ?? '').trim() !== '' ? r.cifra : '—';
}
const TILES = (c, n, d) => [
  {n:c.info.cifra, d:c.info.desc},
  {n:c.info.pct+' %', d:'de avance'},
  {n, d}
];
function progHTML(sec, info){
  const R=30, C=2*Math.PI*R;
  return `<div class="sprog" style="--c:${sec.c}">
      <div class="ring"><svg viewBox="0 0 74 74"><circle class="bg" cx="37" cy="37" r="${R}"/><circle class="fg" cx="37" cy="37" r="${R}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C*(1-info.pct/100)}"/></svg><b>${info.pct}%</b></div>
      <div><div class="n">${esc(info.cifra)}</div><div class="d">${esc(info.desc)}</div><div class="fuente" style="font-size:10.5px;color:var(--muted);margin-top:4px">Corte: ${esc(info.corte)}</div></div>
    </div>`;
}
function presHTML(c){
  return `<div class="panel pres">
    <div class="tiles">${c.tiles.map(t=>`<div class="tile" style="--c:${c.sec.c}"><b>${esc(t.n)}</b><span>${esc(t.d)}</span></div>`).join('')}</div>
    <div class="acts">${c.M.buttons.map(b=>`<button class="btn${b.primary?' primary':''}" data-v="${esc(b.v)}">${esc(b.t)} →</button>`).join('')}</div>
    <p class="fuente-c">Cifras de la pestaña Resumen del Google Sheets, las mismas que aparecen en el tablero de Inicio · Corte: ${esc(c.info.corte)}</p>
  </div>`;
}

/* ===== Elementos comunes ===== */
function linkify(v){
  const e = esc(v);
  return /^https?:\/\//.test(String(v).trim()) ? `<a href="${e}" target="_blank" rel="noopener" style="color:#1f5fbf;font-weight:600">Abrir</a>` : e;
}
function commonFooter(){
  const c = CFG.contacto || {};
  const v = x => x ? esc(x) : '<i>Por confirmar</i>';
  return `<section class="foot" id="contacto">
    <div class="fbox">
      <h3>Contacto y horarios</h3>
      <p>Unidad de Modernización · Universidad Nacional de Ingeniería</p>
      <dl><dt>Correo</dt><dd>${v(c.correo)}</dd><dt>Anexo</dt><dd>${v(c.anexo)}</dd><dt>Ubicación</dt><dd>${v(c.ubicacion)}</dd><dt>Horario</dt><dd>${v(c.horario)}</dd></dl>
      <a class="btn primary" href="${esc(CFG.asistencia||'#contacto')}"${CFG.asistencia?' target="_blank" rel="noopener"':''}>Solicitar asistencia técnica →</a>
    </div>
    <div class="fbox">
      <h3>Glosario</h3>
      <dl>${GLOSARIO.map(([t,d])=>`<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join('')}</dl>
    </div>
  </section>`;
}
const rofArt = n => (ORG && ORG.arts || []).find(a=>a.n===n) || null;
function quienesHTML(){
  const a33 = rofArt(33);
  return `<div class="panel prose"><p>${esc(a33 ? a33.b[0] : 'La Unidad de Modernización impulsa la modernización institucional de la UNI.')}</p></div>`;
}

/* ===== Tablas desde Google Sheets ===== */
function panelHTML(o, inner){
  return `<div class="panel">${o.title?`<div class="vh"><h2>${esc(o.title)}</h2></div>`:''}${o.intro?`<p class="vdesc">${esc(o.intro)}</p>`:''}${inner}</div>`;
}
function noteSheet(key, failed, extra){
  if(!CFG.sheetId) return '<div class="note">Aún no hay un Google Sheets conectado. Pega su ID en <b>config.json → sheetId</b> y vuelve a ejecutar build.ps1.</div>';
  if(failed) return `<div class="note">No se pudo leer la pestaña «${esc(CFG.tabs[key]||key)}» del Google Sheets. Verifica que el archivo esté compartido como «Cualquier persona con el enlace – Lector» y que la pestaña exista.</div>`;
  return `<div class="empty">${esc(extra || `La pestaña «${CFG.tabs[key]||key}» no tiene registros todavía.`)}</div>`;
}
/* o: {title, intro, ph (texto del buscador), filter(fila normalizada) → bool, empty (mensaje sin registros)} */
async function tableView(el, key, o={}){
  el.innerHTML = panelHTML(o, '<div class="empty">Cargando…</div>');
  let t = null, failed = false;
  try{ t = await sheet(CFG.tabs[key]); }catch(e){ failed = true; }
  if(!t || !t.head.length){ el.innerHTML = panelHTML(o, noteSheet(key, failed, o.empty)); return; }
  const objs = asObjects(t);
  const keep = t.rows.map((r,j)=>j).filter(j=>!o.filter || o.filter(objs[j]));
  const rows = keep.map(j=>t.rows[j]);
  if(!rows.length){ el.innerHTML = panelHTML(o, noteSheet(key, false, o.empty)); return; }
  renderTable(el, o, t.head, rows);
}
function renderTable(el, o, head, rows){
  const cols = head.map((h,i)=>({h, i, vals:[...new Set(rows.map(r=>(r[i]||'').trim()).filter(Boolean))]}));
  const sels = cols.filter(c=>c.vals.length>1 && c.vals.length<=12 && !/enlace/i.test(c.h));
  el.innerHTML = panelHTML(o, `<div class="tools"><input type="search" id="tq" placeholder="${esc(o.ph||'Buscar…')}">
      ${sels.map(c=>`<select data-i="${c.i}" aria-label="${esc(c.h)}"><option value="">${esc(c.h)}: todos</option>${c.vals.map(v=>`<option>${esc(v)}</option>`).join('')}</select>`).join('')}
      <span class="cnt" id="tc"></span></div>
    <div class="tw"><table><thead><tr>${head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody id="tb">${rows.map(r=>`<tr>${head.map((_,i)=>`<td>${linkify(r[i]??'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
  const apply = () => {
    const q = norm(el.querySelector('#tq').value);
    const fs = [...el.querySelectorAll('select')].map(s=>[s.dataset.i, s.value]).filter(x=>x[1]);
    let n = 0;
    [...el.querySelectorAll('#tb tr')].forEach((tr,j)=>{
      const r = rows[j];
      const ok = (!q || norm(r.join(' ')).includes(q)) && fs.every(([i,v])=>(r[i]||'').trim()===v);
      tr.hidden = !ok; if(ok) n++;
    });
    el.querySelector('#tc').textContent = n+' registros';
  };
  el.querySelector('#tq').oninput = apply;
  el.querySelectorAll('select').forEach(s=>s.onchange = apply);
  apply();
}

/* ===== Formularios (envían por correo a la Unidad) ===== */
const CAMPOS_BASE = [
  {n:'nombre', l:'Nombre y apellidos', req:1},
  {n:'unidad', l:'Unidad, facultad o dependencia'},
  {n:'correo', l:'Correo institucional', type:'email', req:1}
];
function formDef(title, subject, intro, extra){
  return {title, subject, intro, fields:[...CAMPOS_BASE, ...extra]};
}
function formView(el, f){
  const link = CFG.asistencia ? `<p><a class="btn primary" href="${esc(CFG.asistencia)}" target="_blank" rel="noopener">Abrir formulario externo →</a></p>` : '';
  el.innerHTML = `<div class="panel"><div class="vh"><h2>${esc(f.title)}</h2></div><p class="vdesc">${esc(f.intro)}</p>${link}
    <form class="fm" id="fm">${f.fields.map(x=>`<label>${esc(x.l)}${x.area
      ? `<textarea name="${x.n}" rows="4"${x.req?' required':''} placeholder="${esc(x.ph||'')}"></textarea>`
      : `<input name="${x.n}" type="${x.type||'text'}"${x.req?' required':''} placeholder="${esc(x.ph||'')}">`}</label>`).join('')}
      <div><button class="btn primary" type="submit">Enviar solicitud</button></div>
    </form>
    <p class="note-s" id="fmn" hidden></p></div>`;
  el.querySelector('#fm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = f.fields.map(x=>`${x.l}: ${fd.get(x.n)||''}`).join('\n');
    const to = (CFG.contacto||{}).correo;
    const msg = el.querySelector('#fmn');
    if(!to){
      msg.hidden = false;
      msg.textContent = 'Este formulario aún no tiene un destino configurado. Escribe a la Unidad de Modernización con los datos de contacto de este sitio.';
      return;
    }
    location.href = `mailto:${to}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
  };
}

/* ===== Textos fijos de las pestañas ===== */
const NORMAS_EXT_HTML = `<div class="panel prose"><div class="vh"><h2>Normas externas aplicables</h2></div>
  <p class="vdesc">Leyes y normas que rigen a la UNI. Confirma siempre el texto vigente en la fuente oficial.</p>
  <ul>
    <li><b>Ley Universitaria N.º 30220</b></li>
    <li><b>Ley N.º 27658</b>, Ley Marco de Modernización de la Gestión del Estado.</li>
    <li><b>Texto Único Ordenado de la Ley N.º 27444</b>, Ley del Procedimiento Administrativo General.</li>
    <li>Normas de la PCM sobre gestión por procesos, simplificación administrativa e innovación pública.</li>
  </ul>
  <p><a class="btn" href="https://busquedas.elperuano.pe" target="_blank" rel="noopener">Buscar en El Peruano →</a></p>
</div>`;
const ELAB_HTML = `<div class="panel prose"><div class="vh"><h2>Elaboración de documentos</h2></div>
  <p class="vdesc">Guía para proponer una directiva, un reglamento o un lineamiento.</p>
  <div class="steps">
    <div class="step"><b>1. Identifica la necesidad</b><p>Define qué problema resuelve el documento y qué unidad lo requiere.</p></div>
    <div class="step"><b>2. Redacta con formato estándar</b><p>Usa la estructura de directiva que define la Unidad de Modernización.</p></div>
    <div class="step"><b>3. Revisión técnica</b><p>La Unidad emite opinión técnica sobre el borrador.</p></div>
    <div class="step"><b>4. Aprobación y publicación</b><p>Sigue la ruta de aprobación que corresponde al tipo de documento.</p></div>
  </div>
  <p>Las plantillas descargables se publicarán en esta sección. Si necesitas una antes, escribe a la Unidad de Modernización.</p>
</div>`;
const FAQ_NORM_HTML = `<div class="panel prose"><div class="vh"><h2>Preguntas frecuentes</h2></div>
  <details><summary>¿Qué documento necesito?</summary><p>Busca en el repositorio normativo, filtrando por tipo, materia o unidad emisora. Si no lo encuentras, usa «Solicitar una directiva».</p></details>
  <details><summary>¿Quién lo aprueba?</summary><p>Depende del tipo de documento. Confirma la instancia aprobadora con la Unidad de Modernización.</p></details>
  <details><summary>¿Cuánto demora?</summary><p>El tiempo promedio de aprobación se publicará en esta sección cuando el indicador esté disponible.</p></details>
</div>`;
const CADENA_HTML = `<div class="panel prose"><div class="vh"><h2>Cadena de valor</h2></div>
  <p class="vdesc">Cómo se organiza la UNI para formar, investigar y proyectarse a la sociedad, con el soporte de los procesos de apoyo.</p>
  <div class="steps">
    <div class="step"><b>Formación profesional</b><p>P.M.1 Gestión de la Formación Profesional.</p></div>
    <div class="step"><b>Bienestar universitario</b><p>P.M.2 Gestión del Bienestar Universitario.</p></div>
    <div class="step"><b>Investigación</b><p>P.M.3 Gestión de la Investigación.</p></div>
    <div class="step"><b>Extensión y proyección social</b><p>P.M.4 Responsabilidad Social, Proyección Social y Extensión Cultural.</p></div>
    <div class="step hl"><b>Soporte</b><p>P.S.1 a P.S.5: abastecimiento, finanzas, recursos humanos, tecnologías de la información y atención al ciudadano.</p></div>
  </div>
</div>`;
const METODO_PROC_HTML = `<div class="panel prose"><div class="vh"><h2>Metodología</h2></div>
  <p class="vdesc">Ciclo de gestión por procesos que aplica la Unidad de Modernización.</p>
  <div class="steps">
    <div class="step"><b>1. Identificar</b><p>Reconocer los procesos y su unidad responsable.</p></div>
    <div class="step"><b>2. Caracterizar</b><p>Definir objetivo, dueño, entradas, salidas y clientes.</p></div>
    <div class="step"><b>3. Modelar</b><p>Representar el flujo de actividades con notación BPMN.</p></div>
    <div class="step"><b>4. Medir</b><p>Establecer indicadores de tiempo, calidad y costo.</p></div>
    <div class="step"><b>5. Mejorar</b><p>Rediseñar los pasos que no agregan valor y hacer seguimiento.</p></div>
  </div>
  <p>El marco de referencia es la Norma Técnica de Gestión por Procesos de la PCM.</p>
</div>`;
const HERRAMIENTAS_PROC_HTML = `<div class="panel prose"><div class="vh"><h2>Herramientas</h2></div>
  <p class="vdesc">Instrumentos que usa cada unidad para documentar sus procesos.</p>
  <ul>
    <li>Plantilla de caracterización de procesos</li>
    <li>Plantilla de flujograma (notación BPMN)</li>
    <li>Manual de procedimientos (MAPRO)</li>
    <li>Plantilla de indicadores de proceso</li>
  </ul>
  <p class="note-s">Las plantillas se entregan a la unidad responsable al iniciar la caracterización. Solicítalas con «Solicitar asistencia en procesos».</p>
</div>`;

const ANTES_DESPUES_HTML = `<div class="panel prose"><div class="vh"><h2>Antes y después</h2></div>
  <p class="vdesc">Cada caso compara pasos, días, requisitos y costo antes y después de la simplificación.</p>
  <p>El primer caso que se publicará es el de <b>Grados y Títulos</b>. Los casos se incorporan una vez validados por la unidad responsable.</p>
</div>`;
const METODO_SIMP_HTML = `<div class="panel prose"><div class="vh"><h2>Metodología</h2></div>
  <p class="vdesc">Ruta de simplificación que se aplica a cada procedimiento.</p>
  <div class="steps">
    <div class="step"><b>1. Diagnóstico</b><p>Describir el procedimiento tal como funciona hoy.</p></div>
    <div class="step"><b>2. Análisis de valor</b><p>Identificar pasos, requisitos y plazos que no aportan al resultado.</p></div>
    <div class="step"><b>3. Rediseño</b><p>Proponer un flujo más corto y, cuando sea posible, digital.</p></div>
    <div class="step"><b>4. Validación legal</b><p>Revisar que la propuesta cumpla la normativa vigente.</p></div>
    <div class="step"><b>5. Costos</b><p>Determinar el costo del procedimiento simplificado.</p></div>
    <div class="step"><b>6. Aprobación y publicación</b><p>Actualizar el TUPA y publicar el procedimiento.</p></div>
  </div>
</div>`;
const BUENAS_SIMP_HTML = `<div class="panel prose"><div class="vh"><h2>Buenas prácticas</h2></div>
  <p class="vdesc">Principios que guían las simplificaciones de la UNI.</p>
  <ul>
    <li><b>Presunción de veracidad:</b> se acepta la declaración del usuario salvo prueba en contrario.</li>
    <li><b>No pedir lo que la entidad ya tiene:</b> ninguna unidad solicita documentos que ya están en la Universidad.</li>
    <li><b>Ventanilla única:</b> un solo punto de atención para el trámite.</li>
    <li><b>Digitalización:</b> cada paso que puede hacerse en línea debe hacerse en línea.</li>
  </ul>
</div>`;
const HERRAMIENTAS_SIMP_HTML = `<div class="panel prose"><div class="vh"><h2>Herramientas</h2></div>
  <p class="vdesc">Formatos que usan las unidades para revisar sus procedimientos.</p>
  <ul>
    <li>Formato de diagnóstico del procedimiento</li>
    <li>Matriz de requisitos</li>
    <li>Plantilla de costos del procedimiento</li>
  </ul>
</div>`;

const CICLO_HTML = `<div class="panel prose"><div class="vh"><h2>Ciclo de innovación</h2></div>
  <p class="vdesc">La NT 003-2025-PCM-SGP organiza la innovación en cuatro fases. Una idea avanza por ellas y el portafolio indica en cuál está cada iniciativa.</p>
  <div class="steps">
    <div class="step"><b>1. Descubrir</b><p>Entender el problema en terreno, con las personas que lo viven.</p></div>
    <div class="step"><b>2. Definir</b><p>Identificar la causa raíz y formular el reto: «¿Cómo podríamos…?».</p></div>
    <div class="step"><b>3. Idear</b><p>Proponer soluciones y seleccionar las más prometedoras.</p></div>
    <div class="step"><b>4. Entregar</b><p>Probar un piloto, medir sus indicadores y ajustar antes de escalar.</p></div>
  </div>
</div>`;
const LAB_HTML = `<div class="panel prose"><div class="vh"><h2>Laboratorio de innovación</h2></div>
  <p class="vdesc">Espacio de pruebas para talleres y sesiones de diseño centrado en las personas.</p>
  <p>La agenda de talleres y el registro de inscripción se publicarán en esta sección. Para participar, envía una propuesta desde «Proponer una idea o reto».</p>
</div>`;
const GOBIERNO_HTML = `<div class="panel prose"><div class="vh"><h2>Gobernanza</h2></div>
  <p class="vdesc">Quién decide y quién participa en la innovación de la UNI.</p>
  <ul>
    <li><b>Alta Dirección:</b> define las prioridades de innovación de la Universidad.</li>
    <li><b>Comité correspondiente:</b> evalúa y aprueba las iniciativas que se priorizan.</li>
    <li><b>Unidades de organización:</b> proponen retos, participan en los pilotos y adoptan las soluciones.</li>
    <li><b>Ecosistema:</b> academia, empresa y sociedad civil que aportan conocimiento y validación.</li>
  </ul>
</div>`;
const RECURSOS_HTML = `<div class="panel prose"><div class="vh"><h2>Normativa y recursos</h2></div>
  <p class="vdesc">Marco normativo y plantillas para innovar en la UNI.</p>
  <ul>
    <li>NT 003-2025-PCM-SGP, «Gestión de la Innovación Pública en las Entidades del Estado».</li>
    <li>Guías y cuadernillo de gestión de la innovación pública de la PCM.</li>
    <li>Plantillas de reto, de piloto y de indicadores.</li>
  </ul>
</div>`;
const SOPORTE_SERV_HTML = `<div class="panel prose"><div class="vh"><h2>Soporte</h2></div>
  <p class="vdesc">¿Tienes problemas para usar un servicio digital? Te ayudamos.</p>
  <p>Describe el servicio, el error que encontraste y tu correo institucional.</p>
  <p><button class="btn primary" data-v="asistencia">Solicitar asistencia técnica →</button></p>
</div>`;
const VERIF_SERV_HTML = `<div class="panel prose"><div class="vh"><h2>Verificación de documentos</h2></div>
  <p class="vdesc">Permite comprobar la autenticidad de los documentos emitidos por la UNI.</p>
  <p>Revisa en el catálogo el estado del servicio de verificación antes de usarlo.</p>
</div>`;
const GUIAS_SERV_HTML = `<div class="panel prose"><div class="vh"><h2>Guías de uso</h2></div>
  <p class="vdesc">Instrucciones paso a paso para cada servicio digital.</p>
  <p>Las guías se publicarán junto a cada servicio del catálogo a medida que estén listas.</p>
</div>`;

/* ===== Procesos: mapa, inventario y ficha ===== */
const PROC_W = 1683, PROC_H = 935;
const PROCESOS = [
  {code:'P.E.1', n:'Gestión Estratégica', nivel:'Estratégico', b:[247,72,426,233]},
  {code:'P.E.2', n:'Gestión de la Modernización', nivel:'Estratégico', b:[434,72,629,233]},
  {code:'P.E.3', n:'Gestión de la Calidad', nivel:'Estratégico', b:[639,72,833,233]},
  {code:'P.E.4', n:'Gestión de la Integridad', nivel:'Estratégico', b:[844,72,1028,233]},
  {code:'P.E.5', n:'Cooperación y Relaciones Interinstitucionales', nivel:'Estratégico', b:[1039,72,1241,233]},
  {code:'P.E.6', n:'Comunicación e Imagen Institucional', nivel:'Estratégico', b:[1251,72,1438,233]},
  {code:'P.M.1', n:'Gestión de la Formación Profesional', nivel:'Misional', b:[385,326,1318,390]},
  {code:'P.M.2', n:'Gestión del Bienestar Universitario', nivel:'Misional', b:[508,425,1318,495]},
  {code:'P.M.3', n:'Gestión de la Investigación', nivel:'Misional', b:[458,523,1318,592]},
  {code:'P.M.4', n:'Gestión de Responsabilidad Social, Proyección Social y Extensión Cultural', nivel:'Misional', b:[403,610,1318,678]},
  {code:'P.S.1', n:'Gestión del Abastecimiento', nivel:'De soporte', b:[247,747,453,890]},
  {code:'P.S.2', n:'Administración Financiera y Ejecución de Inversiones', nivel:'De soporte', b:[468,747,722,890]},
  {code:'P.S.3', n:'Gestión de Recursos Humanos', nivel:'De soporte', b:[739,747,953,890]},
  {code:'P.S.4', n:'Gestión de Tecnologías de la Información', nivel:'De soporte', b:[968,747,1211,890]},
  {code:'P.S.5', n:'Atención al ciudadano y Gestión Documental', nivel:'De soporte', b:[1227,747,1438,890]}
];
function mapaView(el, c){
  el.innerHTML = `<div class="panel">
    <div class="vh"><h2>Mapa de procesos UNI</h2><span class="tag">Octubre 2026</span></div>
    <p class="vdesc">Procesos estratégicos, misionales y de soporte. Haz clic en un proceso para ver su ficha.</p>
    <div class="mapbox"><img src="img/mapa-procesos.jpg" alt="Mapa de procesos de la UNI" draggable="false">
      ${PROCESOS.map(p=>`<button class="hs" data-p="${p.code}" title="${esc(p.code+' '+p.n)}" aria-label="${esc(p.code+' '+p.n)}" style="left:${p.b[0]/PROC_W*100}%;top:${p.b[1]/PROC_H*100}%;width:${(p.b[2]-p.b[0])/PROC_W*100}%;height:${(p.b[3]-p.b[1])/PROC_H*100}%"></button>`).join('')}
    </div></div>`;
  el.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{ c.proc=b.dataset.p; c.go('ficha'); });
}
function fichaView(el, c){
  const p = PROCESOS.find(x=>x.code===c.proc) || PROCESOS[0];
  c.proc = p.code;
  el.innerHTML = `<div class="panel">
    <div class="vh"><h2>${esc(p.code+' '+p.n)}</h2><span class="tag">${esc(p.nivel)}</span></div>
    <p class="vdesc">Datos tomados de la pestaña «${esc(CFG.tabs.procesos)}» del Google Sheets.</p>
    <div class="fsel"><label>Proceso <select id="fp">${PROCESOS.map(x=>`<option value="${x.code}"${x.code===p.code?' selected':''}>${esc(x.code+' '+x.n)}</option>`).join('')}</select></label></div>
    <div id="fbody"><div class="empty">Cargando…</div></div>
    <p class="note-s">Este proceso enlaza a sus procedimientos (Simplificación), a la unidad responsable (Organización) y a las normas que lo regulan (Normativa).</p>
  </div>`;
  el.querySelector('#fp').onchange = e => { c.proc = e.target.value; fichaView(el, c); };
  const body = el.querySelector('#fbody');
  const key = norm(p.code);
  sheet(CFG.tabs.procesos).then(t=>{
    const row = t.rows.find(r=>norm(r.join(' ')).includes(key));
    body.innerHTML = row
      ? `<dl class="fdl">${t.head.map((h,i)=>`<dt>${esc(h)}</dt><dd>${linkify(row[i]??'')}</dd>`).join('')}</dl>`
      : '<div class="empty">Aún no hay datos cargados para este proceso. Agrégalo en la pestaña de procesos del Google Sheets para que aparezca aquí.</div>';
  }).catch(()=>{ body.innerHTML = noteSheet('procesos', true); });
}

/* ===== Simplificación: tablero de estado ===== */
async function estadoView(el){
  el.innerHTML = panelHTML({title:'Estado de simplificación'}, '<div class="empty">Cargando…</div>');
  let t = null;
  try{ t = await sheet(CFG.tabs.simplificacion); }catch(e){}
  if(!t || !t.rows.length){
    el.innerHTML = panelHTML({title:'Estado de simplificación'}, noteSheet('simplificacion', !t, 'Aún no hay procedimientos registrados para el tablero de estado.'));
    return;
  }
  const objs = asObjects(t);
  const KE = norm('Estado de revisión'), KU = norm('Unidad');
  const ETAPAS = ['Pendiente','Diagnosticado','Simplificado','Aprobado','Publicado'];
  const etapa = o => ETAPAS.find(e=>norm(o[KE]||'').includes(norm(e)));
  const total = objs.length;
  const porEtapa = ETAPAS.map(e=>[e, objs.filter(o=>etapa(o)===e).length]);
  const unidades = [...new Set(objs.map(o=>o[KU]||'').filter(Boolean))].sort();
  const porUni = unidades.map(u=>{
    const xs = objs.filter(o=>(o[KU]||'')===u);
    return [u, xs.length, xs.filter(o=>etapa(o) && etapa(o)!=='Pendiente').length];
  });
  const bar = (n,max) => `<div class="bar"><i style="width:${max?n/max*100:0}%"></i></div>`;
  el.innerHTML = panelHTML({title:'Estado de simplificación', intro:`Procedimientos por etapa de la ruta de simplificación. Registros: ${total}.`},
    `<div class="bars">${porEtapa.map(([e,n])=>`<div class="row"><span>${e}</span>${bar(n,total)}<b>${n}</b></div>`).join('')}</div>
     <h3 class="sub">Avance por unidad</h3>
     <div class="bars">${porUni.map(([u,n,h])=>`<div class="row"><span>${esc(u)}</span>${bar(h,n)}<b>${h} de ${n}</b></div>`).join('') || '<div class="empty">Sin unidades registradas.</div>'}</div>`);
}

/* ===== Organización: organigrama, órganos y unidades, ROF, diseño y cargos ===== */
const ORG_W = 1397, ORG_H = 2000;   // dimensiones de referencia de las zonas clicables (organigrama_v1.jpg)
const GRP = {
  alta:     {t:'Alta dirección',        c:'#6b1414'},
  especial: {t:'Órganos especiales y de control', c:'#5a5d63'},
  organo:   {t:'Órganos y unidades',    c:'#ead9a6'},
  unidad:   {t:'Unidades dependientes', c:'#dcdce0'},
  desc:     {t:'Órganos desconcentrados', c:'#f4ecd6'}
};
const ORG_ST = {sel:null, tab:'general'};
let ORGX = null;
function orgX(){
  if(ORGX) return ORGX;
  const A = Object.fromEntries(ORG.arts.map(a=>[a.n,a]));
  const U = ORG.units;
  U.forEach(u=>{ u.name = A[u.nat].t.replace(/\s*\(INICTEL\)$/,''); });
  return ORGX = {A, U, byId: Object.fromEntries(U.map(u=>[u.id,u]))};
}
const DISENO_HTML = `<div class="panel prose"><div class="vh"><h2>Diseño organizacional</h2></div>
  <p class="vdesc">Define qué unidades existen en la UNI, qué función cumple cada una y cómo se relacionan.</p>
  <p>Se necesita cuando se crea, fusiona o modifica una unidad, o cuando una función está duplicada o no tiene responsable.</p>
  <h3>Ruta para crear, fusionar o modificar una unidad</h3>
  <div class="steps">
    <div class="step"><b>1. Diagnóstico</b><p>Se identifica el problema organizacional y las funciones afectadas.</p></div>
    <div class="step"><b>2. Propuesta</b><p>La unidad presenta la estructura y las funciones que propone.</p></div>
    <div class="step"><b>3. Opinión técnica</b><p>La Unidad de Modernización emite su opinión técnica sobre la propuesta.</p></div>
    <div class="step"><b>4. Aprobación</b><p>Sigue la ruta de aprobación que corresponde según la normativa vigente.</p></div>
  </div>
  <h3>Criterios de diseño</h3>
  <ul><li>Cada función tiene un solo responsable.</li><li>Se evitan duplicidades y vacíos de funciones.</li><li>La estructura responde a los objetivos institucionales.</li></ul>
  <h3>Matriz de funciones por unidad</h3>
  <p>Relaciona cada unidad con las funciones que le corresponden. Está en preparación.</p>
</div>`;

function guessResp(u){
  if(u.resp) return u.resp;
  if(/^Direcci[oó]n/i.test(u.name)) return 'Director(a)';
  if(/^Oficina/i.test(u.name)) return 'Jefe(a) de Oficina';
  if(/^(Unidad|Centro|Instituto)/i.test(u.name)) return 'Jefe(a) de Unidad';
  return '—';
}
function para(lines){
  if(!lines.length) return '';
  const [first,...rest]=lines;
  const bl=[]; let out=`<p>${esc(first)}</p>`;
  rest.forEach(l=>{ if(/:\s*$/.test(l)||l.length>110){ if(bl.length){out+='<ul>'+bl.splice(0).map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>'} out+=`<p>${esc(l)}</p>` } else bl.push(l) });
  if(bl.length) out+='<ul>'+bl.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
  return out;
}
const artTitle = a => `Artículo ${a.n}.º – ${esc(a.t)}`;
function funcs(a){
  let b=a.b.slice(), intro='';
  if(b.length && (/:\s*$/.test(b[0])||/^Considerando/.test(b[0]))) intro=`<p>${esc(b.shift())}</p>`;
  const L=i=>i<26?String.fromCharCode(97+i):String.fromCharCode(97+Math.floor(i/26)-1)+String.fromCharCode(97+i%26);
  return intro+`<ul class="fl">${b.map((x,i)=>`<li><span class="k">${L(i)}</span><span>${esc(x)}</span></li>`).join('')}</ul>`;
}
const kids = id => orgX().U.filter(x=>x.parent===id);
function tbl(head,rows){
  return `<div class="tw"><table class="mt"><thead><tr>${head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${head.map((_,i)=>`<td>${linkify(r[i]??'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
async function related(tab,u){
  const t=await sheet(CFG.tabs[tab]);
  const esr=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), L='A-Za-zÁÉÍÓÚÑáéíóúñ';
  const re=u.sig.length>=3?new RegExp(`(^|[^${L}])${esr(u.sig)}($|[^${L}])`,'i'):null;
  const nn=norm(u.name);
  return {head:t.head, rows:t.rows.filter(r=>{const j=r.join(' | '); return (re&&re.test(j))||norm(j).includes(nn)})};
}

/* Selección de un órgano o unidad: muestra el organigrama con su detalle */
function orgSelect(c,id,scroll){
  ORG_ST.sel=id; ORG_ST.tab='general';
  if(c.current!=='organigrama'){ c.go('organigrama'); return; }
  orgMarkSel(scroll); orgDetail(c);
  try{ history.replaceState(null,'','#'+id) }catch(e){}
}
function orgMarkSel(scroll){
  const stage=$('#stage'); if(!stage) return;
  stage.querySelectorAll('.hs').forEach(h=>h.classList.toggle('sel',h.dataset.id===ORG_ST.sel));
  const h=stage.querySelector('.hs.sel'), vp=$('#vp');
  if(h&&scroll) setTimeout(()=>vp.scrollTo({left:h.offsetLeft+h.offsetWidth/2-vp.clientWidth/2, top:h.offsetTop+h.offsetHeight/2-vp.clientHeight/2, behavior:'smooth'}), 230);
}

function orgChart(el,c){
  const {U} = orgX();
  el.innerHTML = `<div class="chartgrid">
      <div class="chartbox" id="cbox">
        <div class="ctools">
          <h2>Organigrama UNI</h2><span class="tag">Propuesto 2026</span>
          <div class="srch"><input id="os" type="search" placeholder="Buscar órgano o unidad…" autocomplete="off"><ul id="osr"></ul></div>
          <button class="btn" id="bFit">Ajustar</button>
          <button class="btn" id="bFull" title="Pantalla completa">⛶</button>
        </div>
        <div class="zoom"><button id="zi" aria-label="Acercar">+</button><button id="zo" aria-label="Alejar">−</button></div>
        <div class="vp" id="vp"><div class="stage" id="stage" style="width:${orgZoom*100}%">
          <img src="${esc(CFG.orgImage||'img/organigrama.jpg')}" alt="Organigrama UNI" draggable="false">
          ${U.map(u=>{const b=u.box;return `<button class="hs" data-id="${u.id}" title="${esc(u.name)}" aria-label="${esc(u.name)}" style="left:${b[0]/ORG_W*100}%;top:${b[1]/ORG_H*100}%;width:${(b[2]-b[0])/ORG_W*100}%;height:${(b[3]-b[1])/ORG_H*100}%"></button>`}).join('')}
        </div></div>
        <div class="legend">${Object.values(GRP).map(g=>`<span><i style="background:${g.c}"></i>${g.t}</span>`).join('')}</div>
      </div>
      <aside class="detail" id="detail"></aside>
    </div>`;
  const vp=$('#vp'), stage=$('#stage');

  stage.querySelectorAll('.hs').forEach(h=>h.onclick=()=>{ if(!vp._moved) orgSelect(c,h.dataset.id,false); });
  let sx,sy,sl,sT,down=false;
  vp.addEventListener('mousedown',e=>{down=true;vp._moved=false;sx=e.clientX;sy=e.clientY;sl=vp.scrollLeft;sT=vp.scrollTop});
  window.addEventListener('mouseup',()=>{down=false;vp.classList.remove('drag');setTimeout(()=>vp._moved=false,0)});
  window.addEventListener('mousemove',e=>{
    if(!down||!document.body.contains(vp)) return;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    if(Math.abs(dx)+Math.abs(dy)>5){ vp._moved=true; vp.classList.add('drag'); }
    if(vp._moved){ vp.scrollLeft=sl-dx; vp.scrollTop=sT-dy; }
  });

  const setZoom=z=>{ orgZoom=Math.max(1,Math.min(4,z)); stage.style.width=orgZoom*100+'%'; };
  $('#zi').onclick=()=>setZoom(orgZoom+.5);
  $('#zo').onclick=()=>setZoom(orgZoom-.5);
  $('#bFit').onclick=()=>{ setZoom(1); vp.scrollTo({left:0,top:0}); };
  $('#bFull').onclick=()=>{ const b=$('#cbox'); try{ document.fullscreenElement?document.exitFullscreen():b.requestFullscreen() }catch(e){ toast('Pantalla completa no disponible en este entorno.') } };

  const os=$('#os'), osr=$('#osr');
  os.oninput=()=>{
    const q=norm(os.value.trim());
    if(q.length<1){ osr.classList.remove('on'); return; }
    const m=U.filter(u=>norm(u.name+' '+u.sig).includes(q)).slice(0,10);
    osr.innerHTML=m.length?m.map(u=>`<li data-id="${u.id}">${esc(u.name)}<small>${esc(u.sig)}</small></li>`).join(''):'<li>Sin resultados</li>';
    osr.classList.add('on');
  };
  osr.onclick=e=>{ const li=e.target.closest('li[data-id]'); if(!li) return; osr.classList.remove('on'); os.value=''; setZoom(Math.max(orgZoom,2)); orgSelect(c,li.dataset.id,true); };
  document.addEventListener('click',e=>{ if(!e.target.closest('.srch')) osr.classList.remove('on'); });

  orgDetail(c);
  if(ORG_ST.sel) orgMarkSel(true);
}
let orgZoom = 1;

/* ----- Detalle del órgano o unidad seleccionada ----- */
function orgDetail(c){
  const {byId} = orgX();
  const d=$('#detail'); if(!d) return;
  const u=byId[ORG_ST.sel];
  if(!u){
    d.innerHTML=`<div class="dh"><h3>DETALLE DE LA UNIDAD</h3></div><div class="dempty">Haz clic en cualquier órgano o unidad del organigrama para ver su información general, funciones y unidades a su cargo.</div>`;
    return;
  }
  const tabs=[['general','Información general'],['funciones','Funciones'],['unidades','Unidades a su cargo'],['procesos','Procesos'],['normativa','Normativa']];
  d.innerHTML=`<div class="dh"><h3>${esc(u.name.toUpperCase())}</h3><button id="dx" aria-label="Cerrar">✕</button></div>
    <div class="tabs">${tabs.map(t=>`<button data-t="${t[0]}" class="${t[0]===ORG_ST.tab?'on':''}">${t[1]}</button>`).join('')}</div>
    <div class="db" id="db"></div>`;
  $('#dx').onclick=()=>{ ORG_ST.sel=null; orgMarkSel(); orgDetail(c); };
  d.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ ORG_ST.tab=b.dataset.t; orgDetail(c); });
  orgTab(c,u);
}
async function orgTab(c,u){
  const {A} = orgX();
  const db=$('#db'), nat=A[u.nat], fn=A[u.fn], ex=u.extra?A[u.extra]:null;
  if(ORG_ST.tab==='general'){
    db.innerHTML=`
      <div class="ucard"><span class="ico">${svgIcon(VI.bank)}</span><b>${esc(u.name.toUpperCase())}</b><span class="pill">Propuesta 2026</span></div>
      <table class="kv">
        <tr><td>Siglas</td><td>${esc(u.sig)}</td></tr>
        <tr><td>Dependencia</td><td>${esc(u.dep)}</td></tr>
        <tr><td>Base legal</td><td>ROF UNI (2026) – Artículo ${nat.n}.º</td></tr>
        <tr><td>Tipo de órgano</td><td>${esc(u.tipo)}</td></tr>
        <tr><td>Responsable</td><td>${esc(guessResp(u))}</td></tr>
      </table>
      <h4>${artTitle(nat)}</h4>
      <div class="nat">${para(nat.b)}</div>
      ${ex?`<h4>${artTitle(ex)}</h4><div class="nat">${para(ex.b)}</div>`:''}`;
  }else if(ORG_ST.tab==='funciones'){
    db.innerHTML=`<h4>${artTitle(fn)}</h4>${funcs(fn)}`;
  }else if(ORG_ST.tab==='unidades'){
    const k=kids(u.id);
    db.innerHTML = k.length
      ? `<ul class="ulist">${k.map(x=>`<li data-id="${x.id}"><span>${esc(x.name)}</span><small>${esc(x.sig)}</small></li>`).join('')}</ul>`
      : '<div class="empty">Esta unidad no tiene unidades a su cargo en el organigrama.</div>';
    if(ex&&!k.length) db.innerHTML+=`<h4>${artTitle(ex)}</h4><div class="nat">${para(ex.b)}</div>`;
    db.querySelectorAll('li[data-id]').forEach(li=>li.onclick=()=>orgSelect(c,li.dataset.id,true));
  }else{
    const tabName = ORG_ST.tab==='procesos'?'procesos':'normativa';
    const html = ORG_ST.tab==='normativa' ? `<p><b>Base legal de la estructura:</b> Reglamento de Organización y Funciones (ROF) UNI 2026 – Artículos ${nat.n}.º y ${fn.n}.º.</p>` : '';
    db.innerHTML = html+'<div class="empty">Cargando…</div>';
    try{
      const r=await related(tabName,u);
      if(!document.body.contains(db)||ORG_ST.tab!==(tabName==='procesos'?'procesos':'normativa')) return;
      db.innerHTML = html+(r.rows.length?tbl(r.head,r.rows):`<div class="empty">No hay ${tabName} asociados a esta unidad en el Google Sheets. Para vincularlos, incluye la sigla «${esc(u.sig)}» o el nombre de la unidad en alguna columna de la pestaña «${esc(CFG.tabs[tabName])}».</div>`);
    }catch(e){
      db.innerHTML = html+'<div class="empty">No se pudo leer la pestaña «'+esc(CFG.tabs[tabName])+'» del Google Sheets.</div>';
    }
  }
}

function orgUnits(el,c){
  const {U} = orgX();
  const nOrg = U.filter(u=>/^[ÓO]rgano/.test(u.tipo)).length;
  const kp = [
    ['Órganos', ext(c.res,'org_organos') !== '—' ? ext(c.res,'org_organos') : nOrg, VI.bank],
    ['Unidades', ext(c.res,'org_unidades') !== '—' ? ext(c.res,'org_unidades') : U.length-nOrg, VI.units],
    ['Procesos relacionados', ext(c.res,'org_procesos'), VI.gear],
    ['Puestos (MCC)', ext(c.res,'org_puestos'), VI.people]
  ];
  el.innerHTML=`<div class="panel">
    <div class="vh"><h2>Órganos y unidades</h2></div>
    <p class="vdesc">Directorio de órganos y unidades de la UNI en el organigrama propuesto.</p>
    <div class="kpis" style="margin-bottom:14px">${kp.map(k=>`<div class="kpi2">${svgIcon(k[2])}<div><small>${k[0]}</small><b>${esc(k[1])}</b></div></div>`).join('')}</div>
    <div class="tools"><input type="search" id="uf" placeholder="Filtrar órganos y unidades…"><span class="cnt" id="uc"></span></div>
    <div class="tw"><table><thead><tr><th>Siglas</th><th>Nombre</th><th>Tipo</th><th>Dependencia</th></tr></thead>
    <tbody id="ub">${U.map(u=>`<tr data-id="${u.id}" style="cursor:pointer"><td><b>${esc(u.sig)}</b></td><td>${esc(u.name)}</td><td>${esc(u.tipo)}</td><td>${esc(u.dep)}</td></tr>`).join('')}</tbody></table></div>
  </div>`;
  const cnt=()=>el.querySelector('#uc').textContent=[...el.querySelector('#ub').rows].filter(r=>!r.hidden).length+' registros'; cnt();
  el.querySelector('#uf').oninput=e=>{const q=norm(e.target.value);[...el.querySelector('#ub').rows].forEach(r=>r.hidden=q&&!norm(r.textContent).includes(q));cnt()};
  el.querySelector('#ub').onclick=e=>{const tr=e.target.closest('tr[data-id]'); if(tr) orgSelect(c,tr.dataset.id,true)};
}

function orgRof(el){
  const arts = ORG.arts;
  el.innerHTML=`<div class="panel">
    <div class="vh"><h2>ROF</h2></div>
    <p class="vdesc">Reglamento de Organización y Funciones de la UNI 2026 (${arts.length} artículos).</p>
    <p class="hlnote">Los artículos 33 y 34, destacados, regulan la Unidad de Modernización.</p>
    <div class="tools"><input type="search" id="rf" placeholder="Buscar en el ROF (artículo, unidad, función)…"><span class="cnt" id="rc"></span></div>
    <div class="rofs" id="rl">${arts.map(a=>`<details class="${a.n===33||a.n===34?'hl':''}" data-s="${esc(norm(a.t+' '+a.b.join(' ')))}"><summary>Artículo ${a.n}.º – ${esc(a.t)}</summary>${para(a.b)}</details>`).join('')}</div>
  </div>`;
  const cnt=()=>el.querySelector('#rc').textContent=[...el.querySelectorAll('#rl details')].filter(d=>!d.hidden).length+' artículos';
  cnt();
  el.querySelector('#rf').oninput=e=>{const q=norm(e.target.value);el.querySelectorAll('#rl details').forEach(d=>d.hidden=q&&!d.dataset.s.includes(q));cnt()};
}

/* ===== Definición de los siete menús ===== */
const MODULOS = {
  normativa: {
    equipo:'Documentos normativos',
    titular:'Reglas claras para decidir con seguridad.',
    desc:'La Unidad de Modernización ordena, elabora y actualiza los documentos normativos de la UNI: directivas, reglamentos, lineamientos y manuales. Nuestro propósito es que cada unidad sepa qué norma aplica, quién la aprobó, si está vigente y qué pasos seguir para proponer una nueva. Aquí encontrarás el repositorio normativo, las normas externas que rigen a la Universidad, la guía para elaborar documentos y el seguimiento de los que están en elaboración.',
    tiles: c => TILES(c, c.ext('normativa_elaboracion'), 'documentos en elaboración'),
    buttons: [{t:'Consultar normativa', v:'repositorio', primary:true}, {t:'Solicitar una directiva', v:'solicitud'}],
    views: c => [
      {id:'repositorio', label:'Repositorio normativo', icon:VI.table, run:el=>tableView(el,'normativa',{title:'Repositorio normativo', intro:'Busca por número, tema o estado, y filtra por tipo y año. Cada documento enlaza a su PDF cuando está publicado.', ph:'Buscar norma, número o tema…'})},
      {id:'externas', label:'Normas externas', icon:VI.info, run:el=>{el.innerHTML=NORMAS_EXT_HTML}},
      {id:'internas', label:'Normas internas UNI', icon:VI.layers, run:el=>tableView(el,'normativa',{title:'Normas internas UNI', intro:'Estatuto, reglamentos y directivas de la UNI.', ph:'Buscar…', filter:o=>!/^(ley|decreto)/.test(norm(o.tipo||''))})},
      {id:'elaboracion', label:'Elaboración de documentos', icon:VI.steps, run:el=>{el.innerHTML=ELAB_HTML}},
      {id:'en-elaboracion', label:'En elaboración', icon:VI.flow, run:el=>tableView(el,'normativa',{title:'Documentos en elaboración', intro:'Documentos en curso, con su etapa actual.', ph:'Buscar…', filter:o=>/elabor|revis/.test(norm(o.estado||'')), empty:'No hay documentos en elaboración registrados en el Google Sheets.'})},
      {id:'faq', label:'Preguntas frecuentes', icon:VI.help, run:el=>{el.innerHTML=FAQ_NORM_HTML}},
      {id:'solicitud', label:'Solicitar una directiva', icon:VI.form, menu:false, run:el=>formView(el, formDef('Solicitar una directiva','Solicitud de directiva – Documentos normativos','Indica qué directiva necesitas y qué unidad la requiere. El equipo te responderá por correo institucional.',[
        {n:'tipo', l:'Tipo de documento que necesitas', req:1},
        {n:'detalle', l:'Describe la necesidad', area:1, req:1}]))}
    ]
  },

  procesos: {
    equipo:'Gestión por procesos',
    titular:'Si lo entendemos, lo podemos mejorar.',
    desc:'Identificamos, documentamos y mejoramos los procesos de la UNI, desde la admisión hasta el egreso. Cada proceso debe tener un responsable, un flujo claro, tiempos definidos e indicadores que permitan medirlo, para que las unidades trabajen de forma coordinada y los servicios a estudiantes y docentes sean más predecibles. Aquí puedes explorar el mapa de procesos, revisar la ficha de cada proceso y consultar la metodología que seguimos.',
    tiles: c => TILES(c, c.ext('procesos_manuales'), 'manuales aprobados'),
    buttons: [{t:'Ver mapa de procesos', v:'mapa', primary:true}, {t:'Solicitar asistencia en procesos', v:'asistencia'}],
    views: c => [
      {id:'mapa', label:'Mapa de procesos', icon:VI.flow, run:el=>mapaView(el,c)},
      {id:'inventario', label:'Inventario de procesos', icon:VI.table, run:el=>tableView(el,'procesos',{title:'Inventario de procesos', intro:'Filtra por nivel, unidad responsable y estado (identificado, caracterizado, modelado, aprobado, mejorado).', ph:'Buscar proceso o unidad…'})},
      {id:'ficha', label:'Ficha de proceso', icon:VI.form, run:el=>fichaView(el,c)},
      {id:'cadena', label:'Cadena de valor', icon:VI.layers, run:el=>{el.innerHTML=CADENA_HTML}},
      {id:'metodologia', label:'Metodología', icon:VI.steps, run:el=>{el.innerHTML=METODO_PROC_HTML}},
      {id:'herramientas', label:'Herramientas', icon:VI.tool, run:el=>{el.innerHTML=HERRAMIENTAS_PROC_HTML}},
      {id:'documentos', label:'Documentos', icon:VI.docs, run:el=>tableView(el,'procesos',{title:'Manuales y flujogramas aprobados', intro:'Procesos aprobados, con su documento cuando tiene enlace.', ph:'Buscar…', filter:o=>/aprobad/.test(norm(o.estado||'')), empty:'Aún no hay manuales ni flujogramas aprobados registrados.'})},
      {id:'asistencia', label:'Asistencia', menu:false, run:el=>formView(el, formDef('Solicitar asistencia en procesos','Solicitud de asistencia en procesos','Describe el proceso o la actividad en la que necesitas apoyo.',[
        {n:'proceso', l:'Proceso o actividad', req:1},
        {n:'detalle', l:'Describe la necesidad', area:1, req:1}]))}
    ]
  },

  simplificacion: {
    equipo:'Simplificación administrativa',
    titular:'Menos pasos, menos papeles, más resultados.',
    desc:'Revisamos los procedimientos y servicios de la UNI para eliminar requisitos innecesarios, reducir plazos y costos, y digitalizar lo que se pueda. Así, estudiantes, egresados y trabajadores resuelven sus trámites con rapidez y sin vueltas. Aquí encontrarás el TUPA, el estado de revisión de cada procedimiento, ejemplos de antes y después, nuestra metodología y un buzón para proponer mejoras.',
    tiles: c => TILES(c, c.ext('simplificacion_pasos'), 'pasos o requisitos eliminados'),
    buttons: [{t:'Ver procedimientos (TUPA)', v:'tupa', primary:true}, {t:'Proponer una simplificación', v:'buzon'}],
    views: c => [
      {id:'tupa', label:'Procedimientos (TUPA)', icon:VI.table, run:el=>tableView(el,'simplificacion',{title:'Procedimientos y servicios (TUPA / TUSNE)', intro:'Filtra por unidad y estado de revisión. Cada procedimiento muestra sus requisitos, plazo, costo y base legal.', ph:'Buscar procedimiento, unidad o requisito…'})},
      {id:'estado', label:'Estado de simplificación', icon:VI.flow, run:el=>estadoView(el)},
      {id:'antes', label:'Antes y después', icon:VI.steps, run:el=>{el.innerHTML=ANTES_DESPUES_HTML}},
      {id:'metodologia', label:'Metodología', icon:VI.layers, run:el=>{el.innerHTML=METODO_SIMP_HTML}},
      {id:'buenas', label:'Buenas prácticas', icon:VI.info, run:el=>{el.innerHTML=BUENAS_SIMP_HTML}},
      {id:'herramientas', label:'Herramientas', icon:VI.tool, run:el=>{el.innerHTML=HERRAMIENTAS_SIMP_HTML}},
      {id:'buzon', label:'Buzón ciudadano', icon:VI.form, run:el=>formView(el, formDef('Buzón ciudadano','Propuesta de simplificación – Buzón ciudadano','Reporta un trámite complicado o propón una mejora.',[
        {n:'tramite', l:'Trámite o procedimiento', req:1},
        {n:'dificultad', l:'Paso, requisito o plazo que genera dificultad', area:1, req:1},
        {n:'propuesta', l:'Propuesta de mejora', area:1}]))}
    ]
  },

  organizacion: {
    equipo:'Diseño organizacional',
    titular:'Una estructura pensada para cumplir la misión.',
    desc:'Diseñamos y actualizamos la estructura de la UNI: organigrama, órganos, unidades, funciones y puestos. Buscamos que cada función tenga un responsable claro, sin duplicidades ni vacíos, y que la estructura responda a los objetivos de la Universidad y a los lineamientos de organización del Estado. Aquí puedes consultar el organigrama, el directorio de órganos y unidades, la ruta de diseño organizacional y los cargos y documentos relacionados.',
    tiles: c => TILES(c, ORG && ORG.arts ? ORG.arts.length : '—', 'artículos del ROF'),
    buttons: [{t:'Ver organigrama', v:'organigrama', primary:true}, {t:'Solicitar asistencia en diseño organizacional', v:'asistencia'}],
    start: c => {
      const h = (location.hash||'').slice(1);
      if(h && orgX().byId[h]){ ORG_ST.sel = h; ORG_ST.tab = 'general'; c.go('organigrama'); }
      else c.defaultStart();
    },
    views: c => [
      {id:'organigrama', label:'Organigrama', icon:VI.org, run:el=>orgChart(el,c)},
      {id:'unidades', label:'Órganos y unidades', icon:VI.list, run:el=>orgUnits(el,c)},
      {id:'rof', label:'ROF', icon:VI.book, run:el=>orgRof(el)},
      {id:'diseno', label:'Diseño organizacional', icon:VI.design, run:el=>{el.innerHTML=DISENO_HTML}},
      {id:'cargos', label:'Cargos y puestos', icon:VI.people, run:el=>tableView(el,'organizacion',{title:'Cargos y puestos', intro:'Clasificador de cargos (MCC), perfiles de puesto por unidad y cuadro de puestos. La tabla muestra el estado de alineación de cada unidad.', ph:'Buscar unidad u observación…'})},
      {id:'docs', label:'Documentos relacionados', icon:VI.docs, run:el=>tableView(el,'documentos',{title:'Documentos relacionados', intro:'Estatuto, CAP/MCC, informes de alineamiento y formatos.', ph:'Buscar documento…', empty:'Aún no hay documentos relacionados. Agrégalos en la pestaña «'+CFG.tabs.documentos+'» del Google Sheets.'})},
      {id:'asistencia', label:'Asistencia', menu:false, run:el=>formView(el, formDef('Solicitar asistencia en diseño organizacional','Solicitud de asistencia en diseño organizacional','Describe la unidad, función o estructura sobre la que necesitas orientación.',[
        {n:'detalle', l:'Describe la necesidad', area:1, req:1}]))}
    ]
  },

  innovacion: {
    equipo:'Innovación pública',
    titular:'Las mejores ideas nacen de quienes viven el problema.',
    desc:'Impulsamos la innovación en la UNI siguiendo la NT 003-2025-PCM-SGP: escuchamos a estudiantes, docentes y trabajadores, definimos retos, probamos soluciones en piloto y escalamos las que mejoran los servicios de la Universidad. Cada idea avanza por cuatro fases: descubrir, definir, idear y entregar. Aquí puedes revisar el portafolio de iniciativas, los retos abiertos y el laboratorio de innovación, o proponer tu propia idea.',
    tiles: c => TILES(c, c.ext('innovacion_pilotos'), 'pilotos validados'),
    buttons: [{t:'Ver iniciativas', v:'portafolio', primary:true}, {t:'Proponer una idea o reto', v:'proponer'}],
    views: c => [
      {id:'portafolio', label:'Portafolio de iniciativas', icon:VI.table, run:el=>tableView(el,'innovacion',{title:'Portafolio de iniciativas', intro:'Iniciativas con su unidad, tipo, fase del ciclo, responsable y estado.', ph:'Buscar iniciativa o unidad…'})},
      {id:'ciclo', label:'Ciclo de innovación', icon:VI.flow, run:el=>{el.innerHTML=CICLO_HTML}},
      {id:'retos', label:'Retos de innovación', icon:VI.info, run:el=>tableView(el,'retos',{title:'Retos abiertos', intro:'Retos vigentes, con su unidad y fecha límite. Para participar, envía una propuesta.', ph:'Buscar reto…', empty:'Aún no hay retos abiertos publicados.'})},
      {id:'laboratorio', label:'Laboratorio de innovación', icon:VI.tool, run:el=>{el.innerHTML=LAB_HTML}},
      {id:'casos', label:'Casos y pilotos', icon:VI.steps, run:el=>tableView(el,'casos',{title:'Casos y pilotos', intro:'Iniciativas probadas, con problema, solución, resultados medidos y lecciones.', ph:'Buscar caso…', empty:'Aún no hay casos publicados.'})},
      {id:'gobernanza', label:'Gobernanza', icon:VI.people, run:el=>{el.innerHTML=GOBIERNO_HTML}},
      {id:'recursos', label:'Normativa y recursos', icon:VI.docs, run:el=>{el.innerHTML=RECURSOS_HTML}},
      {id:'proponer', label:'Proponer idea', icon:VI.form, run:el=>formView(el, formDef('Proponer una idea o reto','Propuesta de idea o reto – Innovación','Cuéntanos el problema y, si tienes una idea inicial, compártela.',[
        {n:'problema', l:'Problema a resolver', area:1, req:1},
        {n:'afecta', l:'¿A quién afecta?'},
        {n:'idea', l:'Idea inicial', area:1}]))}
    ]
  },

  servicios: {
    equipo:'Servicios digitales',
    titular:'Trámites de la UNI, desde donde estés.',
    desc:'Reunimos los servicios simplificados y digitalizados que la comunidad UNI puede usar en línea, con verificación de autenticidad de los documentos. Aquí puedes ver qué servicios están disponibles, cuáles están en desarrollo y cómo usarlos. Si tienes dificultades, el soporte técnico te orienta.',
    tiles: c => TILES(c, c.ext('servicios_en_desarrollo'), 'servicios en desarrollo'),
    buttons: [{t:'Ver catálogo', v:'catalogo', primary:true}, {t:'Solicitar asistencia técnica', v:'asistencia'}],
    views: c => [
      {id:'catalogo', label:'Catálogo de servicios', icon:VI.table, run:el=>tableView(el,'servicios',{title:'Catálogo de servicios', intro:'Servicios disponibles, en desarrollo o planificados.', ph:'Buscar servicio o unidad…'})},
      {id:'verificacion', label:'Verificación de documentos', icon:VI.info, run:el=>{el.innerHTML=VERIF_SERV_HTML}},
      {id:'guias', label:'Guías de uso', icon:VI.steps, run:el=>{el.innerHTML=GUIAS_SERV_HTML}},
      {id:'soporte', label:'Soporte', icon:VI.help, run:el=>{el.innerHTML=SOPORTE_SERV_HTML}},
      {id:'asistencia', label:'Asistencia', menu:false, run:el=>formView(el, formDef('Solicitar asistencia técnica','Solicitud de asistencia técnica – Servicios digitales','Cuéntanos qué servicio usas y qué dificultad tienes.',[
        {n:'servicio', l:'Servicio', req:1},
        {n:'detalle', l:'Describe la dificultad', area:1, req:1}]))}
    ]
  }
};

/* ===== Render común de los módulos ===== */
async function renderModule(key){
  const sec = SECTIONS.find(s=>s.k===key);
  const M = MODULOS[key];
  buildHero(sec, M);
  document.querySelector('.hero').classList.add('inner','wide');
  document.querySelector('main').classList.add('wide');

  const res = await loadResumen();
  const info = rinfo(res,key);
  const c = {res, key, sec, M, info, corte:info.corte, ext:k=>ext(res,k), current:null};
  c.tiles = M.tiles(c);
  const views = [{id:'presentacion', label:'Presentación', icon:VI.eye, run:(el,cx)=>{el.innerHTML=presHTML(cx)}}, ...M.views(c)];
  c.go = id => {
    const v = views.find(x=>x.id===id) || views[0];
    c.current = v.id;
    document.querySelectorAll('.side [data-v]').forEach(b=>b.classList.toggle('on', b.dataset.v===v.id));
    v.run($('#view'), c);
  };

  $('#inner').innerHTML = `<div class="org">
    <aside class="side">
      <div class="sh">${svgIcon(sec.ic)}${esc(sec.t)}</div>
      ${views.filter(v=>v.menu!==false).map(v=>`<button data-v="${v.id}">${svgIcon(v.icon)}${esc(v.label)}</button>`).join('')}
      ${progHTML(sec, info)}
    </aside>
    <section><div id="view"></div></section>
  </div>${commonFooter()}`;
  $('#inner').onclick = e => {
    const b = e.target.closest('[data-v]');
    if(b){ e.preventDefault(); c.go(b.dataset.v); }
  };
  animateRings();
  /* Un enlace con #vista (por ejemplo procesos.html#mapa) abre directamente esa pestaña */
  c.defaultStart = () => { const h=(location.hash||'').slice(1); c.go(views.some(v=>v.id===h) ? h : 'presentacion'); };
  if(M.start) M.start(c); else c.defaultStart();
}
