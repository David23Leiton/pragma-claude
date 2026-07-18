import { useEffect } from 'react';

const PAGE_STYLES = `
  .privacy-policy-page{
    --paper:#FBFAF7;
    --ink:#17191F;
    --ink-soft:#4A4E58;
    --ink-faint:#8A8E98;
    --line:#E6E3DC;
    --line-strong:#D3CFC5;
    --teal:#0E5A54;
    --teal-soft:#0E5A5412;
    --amber:#9A5B12;
    --amber-bg:#FBF3E6;
    --amber-line:#E7D3AC;
    --radius:10px;
    --maxw:1180px;
    background:var(--paper);
    color:var(--ink);
    font-family:"Source Serif 4",Georgia,serif;
    font-size:17px;
    line-height:1.72;
    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
    min-height:100vh;
  }
  .privacy-policy-page *{box-sizing:border-box;}
  .privacy-policy-page{scroll-behavior:smooth;}
  .privacy-policy-page .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}

  .privacy-policy-page header.doc{
    border-bottom:1px solid var(--line);
    padding:64px 0 40px;
  }
  .privacy-policy-page .eyebrow{
    font-family:"JetBrains Mono",monospace;
    font-size:12px;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:var(--teal);
    margin:0 0 22px;
  }
  .privacy-policy-page h1.title{
    font-family:"Inter",sans-serif;
    font-weight:700;
    font-size:clamp(30px,4.6vw,48px);
    line-height:1.08;
    letter-spacing:-0.02em;
    margin:0 0 18px;
    max-width:18ch;
  }
  .privacy-policy-page .lede{
    color:var(--ink-soft);
    font-size:18px;
    max-width:64ch;
    margin:0 0 34px;
  }
  .privacy-policy-page .meta{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:1px;
    background:var(--line);
    border:1px solid var(--line);
    border-radius:var(--radius);
    overflow:hidden;
  }
  .privacy-policy-page .meta > div{background:var(--paper);padding:16px 18px;}
  .privacy-policy-page .meta dt{
    font-family:"JetBrains Mono",monospace;
    font-size:10.5px;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--ink-faint);
    margin:0 0 6px;
  }
  .privacy-policy-page .meta dd{
    font-family:"Inter",sans-serif;
    font-size:14.5px;
    font-weight:500;
    margin:0;
    color:var(--ink);
    word-break:break-word;
  }

  .privacy-policy-page .layout{
    display:grid;
    grid-template-columns:248px 1fr;
    gap:56px;
    padding:52px 0 96px;
    align-items:start;
  }
  .privacy-policy-page nav.toc{
    position:sticky;
    top:28px;
    font-family:"Inter",sans-serif;
  }
  .privacy-policy-page nav.toc .toc-label{
    font-family:"JetBrains Mono",monospace;
    font-size:11px;
    letter-spacing:0.16em;
    text-transform:uppercase;
    color:var(--ink-faint);
    margin:0 0 14px;
    padding-bottom:12px;
    border-bottom:1px solid var(--line);
  }
  .privacy-policy-page nav.toc ol{list-style:none;margin:0;padding:0;counter-reset:toc;}
  .privacy-policy-page nav.toc li{counter-increment:toc;margin:0;}
  .privacy-policy-page nav.toc a{
    display:grid;
    grid-template-columns:26px 1fr;
    gap:6px;
    text-decoration:none;
    color:var(--ink-soft);
    font-size:13.5px;
    line-height:1.4;
    padding:7px 0;
    border-bottom:1px solid transparent;
    transition:color .15s ease;
  }
  .privacy-policy-page nav.toc a::before{
    content:counter(toc,decimal-leading-zero);
    font-family:"JetBrains Mono",monospace;
    font-size:11px;
    color:var(--teal);
    padding-top:2px;
  }
  .privacy-policy-page nav.toc a:hover{color:var(--ink);}

  .privacy-policy-page main{max-width:70ch;counter-reset:sec;}
  .privacy-policy-page section.clause{
    padding:34px 0;
    border-bottom:1px solid var(--line);
  }
  .privacy-policy-page section.clause:first-of-type{padding-top:0;}
  .privacy-policy-page .clause-head{
    counter-increment:sec;
    display:grid;
    grid-template-columns:auto 1fr;
    gap:16px;
    align-items:baseline;
    margin:0 0 14px;
  }
  .privacy-policy-page .clause-num{
    font-family:"JetBrains Mono",monospace;
    font-size:13px;
    font-weight:500;
    color:var(--teal);
  }
  .privacy-policy-page .clause-num::before{content:counter(sec,decimal-leading-zero);}
  .privacy-policy-page h2{
    font-family:"Inter",sans-serif;
    font-weight:600;
    font-size:22px;
    letter-spacing:-0.01em;
    line-height:1.2;
    margin:0;
  }
  .privacy-policy-page main p{margin:0 0 16px;color:var(--ink);}
  .privacy-policy-page main p.sub{color:var(--ink-soft);}
  .privacy-policy-page h3{
    font-family:"Inter",sans-serif;
    font-weight:600;
    font-size:15px;
    letter-spacing:0.005em;
    margin:24px 0 8px;
    color:var(--ink);
  }
  .privacy-policy-page ul.clean{margin:0 0 16px;padding:0;list-style:none;}
  .privacy-policy-page ul.clean li{
    position:relative;
    padding:5px 0 5px 22px;
    color:var(--ink);
  }
  .privacy-policy-page ul.clean li::before{
    content:"";
    position:absolute;
    left:2px;top:14px;
    width:6px;height:6px;
    border:1.5px solid var(--teal);
    border-radius:50%;
  }
  .privacy-policy-page ul.clean li strong{font-weight:600;}
  .privacy-policy-page a.link{color:var(--teal);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}

  .privacy-policy-page .subtable{
    width:100%;
    border-collapse:collapse;
    font-family:"Inter",sans-serif;
    font-size:14px;
    margin:8px 0 16px;
  }
  .privacy-policy-page .subtable th,.privacy-policy-page .subtable td{
    text-align:left;
    padding:11px 14px;
    border-bottom:1px solid var(--line);
    vertical-align:top;
  }
  .privacy-policy-page .subtable th{
    font-size:11px;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--ink-faint);
    font-weight:600;
    border-bottom:1px solid var(--line-strong);
  }
  .privacy-policy-page .subtable td:first-child{font-weight:600;color:var(--ink);white-space:nowrap;}
  .privacy-policy-page .subtable td{color:var(--ink-soft);}

  .privacy-policy-page .note{
    background:var(--teal-soft);
    border-left:3px solid var(--teal);
    border-radius:0 var(--radius) var(--radius) 0;
    padding:16px 20px;
    margin:20px 0;
    font-size:15.5px;
    color:var(--ink-soft);
  }
  .privacy-policy-page .note strong{color:var(--ink);}

  .privacy-policy-page footer.doc{
    border-top:1px solid var(--line);
    padding:34px 0 72px;
    font-family:"Inter",sans-serif;
    font-size:13px;
    color:var(--ink-faint);
  }
  .privacy-policy-page footer.doc a{color:var(--teal);text-decoration:none;}

  @media (max-width:860px){
    .privacy-policy-page .layout{grid-template-columns:1fr;gap:0;padding-top:36px;}
    .privacy-policy-page nav.toc{position:static;margin-bottom:40px;}
    .privacy-policy-page nav.toc ol{column-count:2;column-gap:24px;}
    .privacy-policy-page main{max-width:100%;}
  }
  @media (max-width:520px){
    .privacy-policy-page{font-size:16px;}
    .privacy-policy-page nav.toc ol{column-count:1;}
  }
  @media (prefers-reduced-motion:no-preference){
    .privacy-policy-page .fade{opacity:0;transform:translateY(8px);animation:privacy-policy-rise .6s ease forwards;}
    @keyframes privacy-policy-rise{to{opacity:1;transform:none;}}
  }
`;

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

export default function PrivacyPolicy() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Política de Privacidad · Nexus Ecom Pro — Pragma Digital';

    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';

    const fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = FONTS_HREF;

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fontsLink);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(fontsLink);
    };
  }, []);

  return (
    <div className="privacy-policy-page">
      <style>{PAGE_STYLES}</style>

      <header className="doc">
        <div className="wrap fade">
          <p className="eyebrow">Pragma Digital · Nexus Ecom Pro</p>
          <h1 className="title">Política de Privacidad y Tratamiento de Datos Personales</h1>
          <p className="lede">
            Este documento explica cómo Pragma Digital recoge, usa, almacena y protege los datos
            personales tratados a través de Nexus Ecom Pro, en cumplimiento de la Ley 1581 de 2012
            de Colombia y sus normas reglamentarias.
          </p>
          <dl className="meta">
            <div>
              <dt>Última actualización</dt>
              <dd>17 de julio de 2026</dd>
            </div>
            <div>
              <dt>Versión</dt>
              <dd>1.0</dd>
            </div>
            <div>
              <dt>Aplica a</dt>
              <dd>Nexus Ecom Pro</dd>
            </div>
            <div>
              <dt>Responsable</dt>
              <dd>Pragma Digital</dd>
            </div>
            <div>
              <dt>Contacto</dt>
              <dd>davidleiton@pragmadigitalcol.com</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="wrap">
        <div className="layout">
          <nav className="toc" aria-label="Índice del documento">
            <p className="toc-label">Contenido</p>
            <ol>
              <li><a href="#s1">Responsable del tratamiento</a></li>
              <li><a href="#s2">Definiciones y roles</a></li>
              <li><a href="#s3">Datos que recogemos y fuentes</a></li>
              <li><a href="#s4">Finalidad del tratamiento</a></li>
              <li><a href="#s5">Base legal y autorización</a></li>
              <li><a href="#s6">Datos de los clientes finales</a></li>
              <li><a href="#s7">Con quién compartimos los datos</a></li>
              <li><a href="#s8">Transferencia internacional</a></li>
              <li><a href="#s9">Almacenamiento y seguridad</a></li>
              <li><a href="#s10">Retención y eliminación</a></li>
              <li><a href="#s11">Derechos de los titulares</a></li>
              <li><a href="#s12">Marco normativo y autoridad</a></li>
              <li><a href="#s13">Menores de edad</a></li>
              <li><a href="#s14">Cookies y datos de uso</a></li>
              <li><a href="#s15">Cambios a esta política</a></li>
              <li><a href="#s16">Contacto</a></li>
            </ol>
          </nav>

          <main>
            <p className="sub">
              Al usar Nexus Ecom Pro y conectar tus cuentas de terceros, aceptas las prácticas
              descritas en esta política. Te recomendamos leerla completa y conservarla para tu
              referencia.
            </p>

            <section className="clause" id="s1">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Responsable del tratamiento</h2>
              </div>
              <p>
                El responsable del tratamiento de los datos personales descritos en esta política
                es <strong>Pragma Digital</strong>, con domicilio en Colombia. Contacto:{' '}
                <a className="link" href="mailto:davidleiton@pragmadigitalcol.com">
                  davidleiton@pragmadigitalcol.com
                </a>
                .
              </p>
              <ul className="clean">
                <li>
                  <strong>Correo de contacto y canal de atención de datos:</strong>{' '}
                  <a className="link" href="mailto:davidleiton@pragmadigitalcol.com">
                    davidleiton@pragmadigitalcol.com
                  </a>
                </li>
                <li>
                  <strong>Sitio web:</strong>{' '}
                  <a className="link" href="https://pragmadigitalcol.com">
                    pragmadigitalcol.com
                  </a>
                </li>
                <li>
                  <strong>Producto:</strong> Nexus Ecom Pro, plataforma SaaS de analítica y gestión
                  para operadores de ecommerce contra entrega (COD) y dropshipping en
                  Latinoamérica.
                </li>
              </ul>
            </section>

            <section className="clause" id="s2">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Definiciones y roles</h2>
              </div>
              <p>Para efectos de esta política:</p>
              <ul className="clean">
                <li><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</li>
                <li><strong>Dato personal:</strong> cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.</li>
                <li><strong>Tratamiento:</strong> cualquier operación sobre datos personales, como recolección, almacenamiento, uso, circulación o supresión.</li>
                <li><strong>Responsable:</strong> quien decide sobre la base de datos y el tratamiento.</li>
                <li><strong>Encargado:</strong> quien realiza el tratamiento por cuenta del responsable.</li>
                <li><strong>Merchant (comerciante):</strong> el cliente de Pragma que contrata y usa Nexus Ecom Pro para operar su ecommerce.</li>
                <li><strong>Cliente final:</strong> el comprador del merchant, cuyos datos llegan a Nexus a través de los pedidos.</li>
              </ul>
              <div className="note">
                <strong>Doble rol de Pragma.</strong> Respecto de los datos de la cuenta del
                merchant que usa Nexus, Pragma actúa como <strong>responsable</strong>. Respecto de
                los datos de los clientes finales que el merchant nos confía a través de sus
                pedidos, Pragma actúa únicamente como <strong>encargado</strong>, tratándolos por
                cuenta e instrucción del merchant, que es su responsable.
              </div>
            </section>

            <section className="clause" id="s3">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Datos que recogemos y sus fuentes</h2>
              </div>
              <p>
                Nexus Ecom Pro se conecta a las herramientas del merchant para ofrecer analítica
                operativa. Recogemos los siguientes datos, de las siguientes fuentes:
              </p>

              <h3>3.1 Datos de la cuenta del merchant</h3>
              <p className="sub">
                A través de Firebase Authentication: nombre, correo electrónico, credenciales de
                acceso y datos de configuración de su cuenta y su equipo de trabajo dentro de la
                plataforma.
              </p>

              <h3>3.2 Datos de pedidos de Shopify</h3>
              <p className="sub">
                Obtenidos mediante conexión OAuth con la tienda del merchant (alcances{' '}
                <em>read_orders</em> y relacionados). Estos datos incluyen información de los
                pedidos y, dado que se trata de operaciones contra entrega, pueden incluir{' '}
                <strong>datos personales de los clientes finales</strong> del merchant: nombre,
                dirección de entrega, teléfono y correo electrónico.
              </p>

              <h3>3.3 Datos de campañas de marketing</h3>
              <p className="sub">
                Métricas y gasto publicitario provenientes de Meta Ads y TikTok Ads, para análisis
                de atribución y embudo.
              </p>

              <h3>3.4 Datos logísticos</h3>
              <p className="sub">Estado y trazabilidad de las entregas provenientes de Dropi.</p>

              <h3>3.5 Tokens de acceso de terceros</h3>
              <p className="sub">
                Credenciales de conexión (tokens OAuth y de API) de las plataformas que el
                merchant integra, almacenadas de forma cifrada del lado servidor.
              </p>

              <h3>3.6 Datos técnicos de uso</h3>
              <p className="sub">
                Información técnica generada por el uso de la plataforma, como registros de sesión
                y actividad, con fines de seguridad y funcionamiento.{' '}
                {/* [VALIDAR: detallar si se usa analitica de terceros como Google Analytics u otras cookies] */}
              </p>
            </section>

            <section className="clause" id="s4">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Finalidad del tratamiento</h2>
              </div>
              <p>Tratamos los datos exclusivamente para:</p>
              <ul className="clean">
                <li>Prestar el servicio de analítica operativa al merchant: margen neto, recaudo COD, atribución de marketing y análisis de embudo, en un entorno multi-tienda, multi-país y multi-moneda.</li>
                <li>Autenticar, mantener, dar soporte y mejorar la plataforma.</li>
                <li>Cumplir obligaciones legales y contractuales.</li>
              </ul>
              <div className="note">
                <strong>No vendemos datos.</strong> Pragma no comercializa, alquila ni cede a
                terceros los datos personales tratados a través de Nexus, ni los usa para fines
                distintos a los aquí descritos.
              </div>
            </section>

            <section className="clause" id="s5">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Base legal y autorización</h2>
              </div>
              <p>El tratamiento se fundamenta en:</p>
              <ul className="clean">
                <li>La <strong>autorización previa, expresa e informada</strong> del titular, conforme al artículo 9 de la Ley 1581 de 2012.</li>
                <li>La ejecución del contrato de prestación del servicio con el merchant.</li>
                <li>Las causales legales que, según el artículo 10 de la misma ley, no requieren autorización.</li>
              </ul>
              <p>
                Respecto de los datos de los clientes finales, el merchant declara y garantiza que
                ha obtenido las autorizaciones necesarias de sus clientes para el tratamiento de
                sus datos, incluyendo su procesamiento por parte de encargados como Pragma.
              </p>
            </section>

            <section className="clause" id="s6">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Datos de los clientes finales del merchant</h2>
              </div>
              <p>
                Los datos de los clientes finales (compradores) que llegan a Nexus a través de los
                pedidos son <strong>responsabilidad del merchant</strong>. Pragma los trata
                únicamente como <strong>encargado</strong>, es decir:
              </p>
              <ul className="clean">
                <li>Solo los procesa para prestar el servicio de analítica al propio merchant.</li>
                <li>No los usa para fines propios, no los vende y no los comparte fuera de lo previsto en esta política.</li>
                <li>Actúa conforme a las instrucciones del merchant y aplica las medidas de seguridad de la sección 9.</li>
              </ul>
              <p className="sub">
                El ejercicio de derechos por parte de un cliente final debe canalizarse, en primera
                instancia, ante el merchant como responsable de esos datos. Pragma colaborará con
                el merchant para atenderlos.
              </p>
            </section>

            <section className="clause" id="s7">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Con quién compartimos los datos</h2>
              </div>
              <p>
                Para operar la plataforma nos apoyamos en proveedores de infraestructura que
                actúan como <strong>subencargados</strong>. Con ellos compartimos datos únicamente
                en la medida necesaria para prestar el servicio:
              </p>
              <table className="subtable">
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Función</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Google · Firebase</td>
                    <td>Base de datos (Firestore) y autenticación (Firebase Authentication), sobre Google Cloud.</td>
                  </tr>
                  <tr>
                    <td>Vercel</td>
                    <td>Alojamiento y despliegue de la aplicación web.</td>
                  </tr>
                  <tr>
                    <td>Render</td>
                    <td>Alojamiento de los servicios de backend.</td>
                  </tr>
                </tbody>
              </table>
              <p className="sub">
                Estos proveedores tratan los datos por nuestra cuenta y bajo sus propias medidas de
                seguridad. <strong>No vendemos ni cedemos datos a terceros con fines comerciales.</strong>{' '}
                {/* [VALIDAR: confirmar lista completa y vigente de subencargados] */}
              </p>
            </section>

            <section className="clause" id="s8">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Transferencia internacional de datos</h2>
              </div>
              <p>
                Algunos de los proveedores anteriores operan servidores ubicados{' '}
                <strong>fuera de Colombia</strong> (principalmente en los Estados Unidos). Esto
                implica una transferencia internacional de datos personales.
              </p>
              <p>
                Dicha transferencia se realiza amparada en la autorización del titular y en las
                garantías contractuales y de seguridad ofrecidas por dichos proveedores,
                procurando un nivel adecuado de protección conforme a la normativa colombiana.{' '}
                {/* [VALIDAR con abogado: adecuacion del pais receptor y clausulas de transferencia] */}
              </p>
            </section>

            <section className="clause" id="s9">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Almacenamiento y medidas de seguridad</h2>
              </div>
              <p>Aplicamos medidas técnicas y organizativas razonables para proteger los datos:</p>
              <ul className="clean">
                <li>Almacenamiento en Firebase Firestore (Google Cloud) y autenticación mediante Firebase Authentication.</li>
                <li>Los tokens OAuth de Shopify y demás credenciales de terceros se guardan <strong>cifrados del lado servidor</strong> y solo son accesibles por el backend a través del Admin SDK.</li>
                <li>Reglas de acceso y control de autenticación para limitar quién puede acceder a los datos.</li>
              </ul>
              <div className="note">
                Somos transparentes sobre nuestro estado de seguridad: <strong>a la fecha no
                ostentamos certificaciones formales como ISO 27001 o SOC 2</strong>. Trabajamos de
                forma continua en el fortalecimiento de nuestras prácticas. Ningún sistema es
                completamente infalible, por lo que no podemos garantizar seguridad absoluta.
              </div>
            </section>

            <section className="clause" id="s10">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Retención y eliminación de datos</h2>
              </div>
              <p>
                Conservamos los datos mientras la cuenta del merchant esté activa y sean
                necesarios para las finalidades descritas, o mientras una obligación legal exija
                conservarlos.
              </p>
              <p>
                Al <strong>desinstalar la aplicación</strong> de la tienda del merchant o al{' '}
                <strong>cerrar la cuenta</strong>, revocamos los tokens de acceso asociados y
                procedemos a eliminar o anonimizar los datos personales tratados en un plazo
                razonable, salvo lo que debamos conservar por ley.{' '}
                {/* [VALIDAR: definir plazo concreto, p. ej. 30-90 dias, y verificar que el backend lo cumpla] */}
              </p>
              <p className="sub">
                Como aplicación integrada a Shopify, atendemos las solicitudes de datos y de
                eliminación que Shopify canaliza a través de sus webhooks obligatorios de
                protección de datos (<em>customers/data_request</em>, <em>customers/redact</em> y{' '}
                <em>shop/redact</em>).
              </p>
            </section>

            <section className="clause" id="s11">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Derechos de los titulares (habeas data)</h2>
              </div>
              <p>Como titular de datos personales tienes derecho a:</p>
              <ul className="clean">
                <li>Conocer, actualizar y rectificar tus datos.</li>
                <li>Solicitar prueba de la autorización otorgada.</li>
                <li>Ser informado sobre el uso que se da a tus datos.</li>
                <li>Revocar la autorización y/o solicitar la supresión de tus datos, cuando proceda.</li>
                <li>Acceder de forma gratuita a tus datos.</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
              </ul>
              <h3>Cómo ejercerlos</h3>
              <p className="sub">
                Escríbenos a{' '}
                <a className="link" href="mailto:davidleiton@pragmadigitalcol.com">
                  davidleiton@pragmadigitalcol.com
                </a>{' '}
                indicando tu solicitud y los datos que permitan identificarte. Atendemos:
              </p>
              <ul className="clean">
                <li><strong>Consultas:</strong> en un máximo de diez (10) días hábiles, prorrogables hasta por cinco (5) días hábiles más.</li>
                <li><strong>Reclamos:</strong> en un máximo de quince (15) días hábiles, prorrogables hasta por ocho (8) días hábiles más.</li>
              </ul>
            </section>

            <section className="clause" id="s12">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Marco normativo y autoridad de control</h2>
              </div>
              <p>
                El tratamiento de datos descrito en esta política se rige por el régimen
                colombiano de protección de datos personales, en particular la{' '}
                <strong>Ley 1581 de 2012</strong> y su Decreto reglamentario 1377 de 2013
                (compilado en el Decreto Único 1074 de 2015).
              </p>
              <p>
                La autoridad de control competente es la{' '}
                <strong>Superintendencia de Industria y Comercio (SIC)</strong>, a través de su
                Delegatura para la Protección de Datos Personales, ante quien los titulares pueden
                presentar quejas una vez agotado el trámite de reclamo ante el responsable.
              </p>
              <p className="sub">
                {/* [VALIDAR: determinar si aplica la inscripcion de las bases de datos en el Registro Nacional de Bases de Datos (RNBD)] */}
              </p>
            </section>

            <section className="clause" id="s13">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Menores de edad</h2>
              </div>
              <p>
                Nexus Ecom Pro es una herramienta profesional dirigida a comerciantes y no está
                destinada a menores de edad. No recolectamos deliberadamente datos de menores como
                usuarios de la plataforma. Cualquier tratamiento de datos de menores que pudiera
                derivarse de un pedido se realizará atendiendo su interés superior y conforme a la
                ley.
              </p>
            </section>

            <section className="clause" id="s14">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Cookies y datos de uso</h2>
              </div>
              <p>
                La plataforma puede usar cookies y tecnologías similares estrictamente necesarias
                para la autenticación y el funcionamiento del servicio.{' '}
                {/* [VALIDAR: describir cookies analiticas o de terceros, si se utilizan, y el mecanismo de consentimiento] */}
              </p>
            </section>

            <section className="clause" id="s15">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Cambios a esta política</h2>
              </div>
              <p>
                Esta es una política viva, sujeta a revisión periódica. Cuando realicemos cambios
                relevantes, actualizaremos la fecha de "última actualización" y, cuando
                corresponda, notificaremos a los merchants a través de la plataforma o por correo
                electrónico. El uso continuado del servicio tras la publicación de los cambios
                implica su aceptación.
              </p>
            </section>

            <section className="clause" id="s16">
              <div className="clause-head">
                <span className="clause-num" />
                <h2>Contacto</h2>
              </div>
              <p>
                Para cualquier consulta, reclamo o ejercicio de derechos relacionados con esta
                política, escríbenos a{' '}
                <a className="link" href="mailto:davidleiton@pragmadigitalcol.com">
                  davidleiton@pragmadigitalcol.com
                </a>
                .
              </p>
            </section>
          </main>
        </div>
      </div>

      <footer className="doc">
        <div className="wrap">
          Pragma Digital · Nexus Ecom Pro —{' '}
          <a href="https://pragmadigitalcol.com">pragmadigitalcol.com</a>
        </div>
      </footer>
    </div>
  );
}
