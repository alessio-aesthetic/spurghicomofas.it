import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const business = {
  name: "Spurghi Como Fast",
  domain: "spurghicomofast.it",
  url: "https://spurghicomofast.it",
  phone: "031 668 0329",
  phoneHref: "0316680329",
  email: "assistenza@spurghicomofast.it",
  address: "Via Giuseppe Merzario, 7 - 22100 Como CO",
};

const services = [
  ["disotturazione-wc", "Disotturazione WC a Como", "WC bloccato, acqua che risale dal sanitario, odori improvvisi e bagno non utilizzabile", "sonde compatte, stasatrici professionali e controllo progressivo del deflusso", "disotturazione-wc.png"],
  ["disotturazione-lavandini", "Disotturazione Lavandini a Como", "lavandini lenti, scarichi cucina ostruiti da grassi, sapone, calcare e residui", "pulizia del sifone, strumenti flessibili e verifica finale dello scarico", "disotturazione-lavandini.png"],
  ["disotturazione-docce-vasche", "Disotturazione Docce e Vasche a Como", "acqua che ristagna in doccia, vasche lente, pilette bloccate e cattivi odori", "attrezzi sottili, pulizia mirata e controllo del collegamento verso la colonna", "disotturazione-docce-vasche.png"],
  ["disotturazione-colonne-scarico", "Disotturazione Colonne di Scarico a Como", "piu scarichi lenti nello stesso edificio, rumori nella colonna e reflussi dai piani bassi", "ispezione dagli accessi esistenti, pulizia progressiva e strumenti adatti alle linee comuni", "colonne-scarico.png"],
  ["videoispezioni-fognature", "Videoispezioni Fognature a Como", "blocchi ricorrenti, sospette rotture, radici, cedimenti o punti interni da controllare", "telecamera professionale, lettura del tracciato e individuazione delle criticita", "videoispezioni-fognature.png"],
  ["spurgo-fosse-biologiche", "Spurgo Fosse Biologiche a Como", "fosse piene, odori persistenti, scarichi lenti e necessita di svuotamento programmato", "autospurgo, aspirazione dei reflui, pulizia del vano e controllo dei punti di accesso", "spurgo-fosse-biologiche.png"],
  ["spurgo-pozzi-neri", "Spurgo Pozzi Neri a Como", "pozzi neri pieni, odori forti, impianti che ricevono lentamente e reflui da aspirare", "aspirazione con mezzo attrezzato, controllo del livello e pulizia dell'area operativa", "pozzi-neri.png"],
  ["pulizia-pozzetti-stradali", "Pulizia Pozzetti Stradali a Como", "pozzetti pieni, acqua ferma dopo la pioggia, depositi di terra, sabbia e foglie", "aspirazione dei materiali, pulizia del vano e verifica del passaggio verso la rete", "pozzetti-stradali.png"],
  ["pulizia-caditoie-pluviali", "Pulizia Caditoie e Pluviali a Como", "caditoie o pluviali ostruiti, ristagni, rigurgiti durante temporali e griglie sporche", "rimozione dei depositi, pulizia delle griglie e controllo del corretto deflusso", "caditoie-pluviali.png"],
  ["bonifica-allagamenti", "Bonifica Allagamenti a Como", "cantine, garage, cortili o locali tecnici con acqua da rimuovere rapidamente", "aspirazione dell'acqua, controllo degli scarichi collegati e supporto al ripristino", "bonifica-allagamenti.png"],
  ["manutenzione-fognature", "Manutenzione Fognature a Como", "impianti che rallentano spesso, pozzetti da controllare e reti private da mantenere pulite", "pulizie periodiche, controlli mirati e indicazioni per prevenire nuovi blocchi", "manutenzione-fognature.png"],
  ["pronto-intervento-24h", "Pronto Intervento Spurghi 24H a Como", "emergenze improvvise, reflussi, scarichi inutilizzabili e problemi che non possono aspettare", "ascolto telefonico, scelta del mezzo corretto e uscita organizzata in base alla priorita", "pronto-intervento-24h.png"],
].map(([slug, title, problem, method, image]) => ({ slug, title, nav: title.replace(" a Como", ""), problem, method, image }));

const zones = [
  ["como", "Spurghi a Como", "Como", "Via Giuseppe Merzario, Viale Varese, Via Milano, zona lago, centro storico e quartieri residenziali"],
  ["cernobbio", "Spurghi a Cernobbio", "Cernobbio", "Via Regina, zona lago, Rovenna, Piazza Mazzini e aree residenziali"],
  ["cantu", "Spurghi a Cantù", "Cantù", "Via Milano, Via Como, zona centro, frazioni e aree artigianali"],
  ["erba", "Spurghi a Erba", "Erba", "Corso XXV Aprile, Via Lecco, zona stazione, Crevenna e aree vicine"],
  ["mariano-comense", "Spurghi a Mariano Comense", "Mariano Comense", "Via Como, Via Milano, zona stazione, quartieri residenziali e aree produttive"],
  ["menaggio", "Spurghi a Menaggio", "Menaggio", "Via Lusardi, lungolago, Loveno, Croce e strade verso il centro"],
].map(([slug, title, city, roads]) => ({ slug, title, city, roads }));

function logo() {
  return `<a class="brand-logo" href="index.html" aria-label="Spurghi Como Fast">
    <span class="logo-3d"><span>SC</span></span>
    <span class="brand-text">Spurghi Como <strong>Fast</strong></span>
  </a>`;
}

function rel(current, target) {
  const depth = current.split("/").filter(Boolean).length - 1;
  return `${"../".repeat(Math.max(0, depth))}${target}`;
}

function page({ title, description, current = "index.html", body }) {
  const home = rel(current, "index.html");
  const css = rel(current, "assets/main.css");
  const js = rel(current, "assets/main.js");
  const extraCss = rel(current, "assets/como.css");
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: business.url,
    telephone: business.phoneHref,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Giuseppe Merzario, 7",
      postalCode: "22100",
      addressLocality: "Como",
      addressRegion: "CO",
      addressCountry: "IT",
    },
    openingHours: "Mo-Su 00:00-23:59",
  };
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${business.url}/${current === "index.html" ? "" : current.replace(/index\.html$/, "")}">
  <link rel="stylesheet" href="${css}">
  <link rel="stylesheet" href="${extraCss}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="bg-white text-slate-950">
  <header class="como-header">
    <div class="como-container nav-wrap">
      ${logo()}
      <nav class="desktop-nav">
        <a href="${home}">Home</a>
        <a href="${rel(current, "services.html")}">Servizi</a>
        <a href="${rel(current, "about.html")}">Chi siamo</a>
        <a href="${rel(current, "contact.html")}">Contatti</a>
      </nav>
      <a class="nav-call" href="tel:${business.phoneHref}">Chiama ${business.phone}</a>
    </div>
  </header>
  ${body}
  <footer class="como-footer">
    <div class="como-container footer-grid">
      <div>${logo()}<p>Interventi ordinati per scarichi, fognature, fosse biologiche e autospurgo a Como e provincia.</p></div>
      <div><h3>Servizi</h3>${services.slice(0, 6).map((s) => `<a href="${rel(current, `servizi/${s.slug}/index.html`)}">${s.nav}</a>`).join("")}</div>
      <div><h3>Zone</h3>${zones.map((z) => `<a href="${rel(current, `zone/${z.slug}/index.html`)}">${z.title}</a>`).join("")}</div>
      <div><h3>Contatti</h3><a href="tel:${business.phoneHref}">${business.phone}</a><a href="mailto:${business.email}">${business.email}</a><p>${business.address}</p></div>
    </div>
  </footer>
  <div class="cookie-box" id="cookieBox"><strong>Privacy e consenso</strong><p>Usiamo solo elementi tecnici necessari e, se attivati, strumenti di misurazione anonima.</p><button id="cookieOk">Accetto</button></div>
  <a class="sticky-phone" href="tel:${business.phoneHref}">Chiama ora ${business.phone}</a>
  <script src="${js}"></script>
  <script src="${rel(current, "assets/como.js")}"></script>
</body>
</html>`;
}

function hero(title, text, image = "hero.png", current = "index.html") {
  return `<section class="hero-como">
    <div class="como-container hero-grid">
      <div><span class="eyebrow">Pronto intervento 24H</span><h1>${title}</h1><p>${text}</p><div class="hero-actions"><a class="btn-primary" href="tel:${business.phoneHref}">Chiama ${business.phone}</a><a class="btn-secondary" href="${rel(current, "services.html")}">Vedi servizi</a></div></div>
      <figure><img src="${rel(current, `images/spurghi/${image}`)}" alt="${title}"></figure>
    </div>
  </section>`;
}

function serviceText(s) {
  return [
    ["Il momento giusto per chiamare", `Quando si presenta una situazione come ${s.problem}, serve un intervento che metta ordine prima che il disagio diventi più grande. Un impianto di scarico non si blocca sempre per lo stesso motivo: a volte il problema è vicino al sanitario, altre volte riguarda una colonna, un pozzetto, una tubazione esterna o un accumulo che cresce da settimane. Per questo è importante descrivere bene il sintomo al primo contatto.`],
    ["Metodo di lavoro", `Per ${s.title.toLowerCase()} utilizziamo ${s.method}. La scelta dello strumento non è casuale: dipende dagli accessi disponibili, dal tipo di scarico e dai segnali raccolti durante la chiamata. L'obiettivo è liberare la linea senza forzare inutilmente tubazioni, sifoni o pozzetti, verificando alla fine che l'acqua defluisca in modo regolare.`],
    ["Perché scegliere un intervento tecnico", `Prodotti chimici e tentativi improvvisati possono dare l'impressione di migliorare la situazione, ma spesso spostano il blocco più avanti o rovinano parti dell'impianto. Un tecnico osserva il comportamento dello scarico, lavora in modo progressivo e segnala se ci sono indizi di un problema più profondo, come pendenze errate, depositi duri, radici o tratti danneggiati.`],
    ["Per case, condomini e attività", `Il servizio è pensato per abitazioni private, condomini, negozi, uffici, bar, ristoranti, cantine, cortili e locali tecnici. A Como interveniamo su urgenze e richieste programmate, sempre con attenzione agli ambienti e agli accessi. Dopo l'intervento spieghiamo cosa è stato fatto e quali segnali monitorare nei giorni successivi.`],
    ["Contatto diretto", `Per parlare con Spurghi Como Fast puoi chiamare ${business.phone}. La sede indicata è ${business.address}. Per richieste non urgenti puoi scrivere a ${business.email}, ma se l'acqua risale o gli ambienti non sono utilizzabili il telefono resta il canale più veloce.`],
  ];
}

function zoneText(z) {
  return [
    [`Interventi nella zona di ${z.city}`, `${z.title} significa poter contare su un riferimento rapido quando scarichi, pozzetti, fosse biologiche o tubazioni smettono di funzionare. Ogni richiesta viene ascoltata con attenzione: capire se il problema riguarda un solo punto o più scarichi insieme cambia completamente il tipo di intervento da preparare.`],
    ["Problemi trattati", `A ${z.city} interveniamo per WC bloccati, lavandini lenti, docce e vasche che non scaricano, colonne condominiali, videoispezioni, fosse biologiche, pozzi neri, caditoie, pluviali, allagamenti e manutenzione fognature. Alcuni problemi richiedono strumenti compatti, altri un mezzo autospurgo o una verifica interna della tubazione.`],
    ["Vie e aree servite", `La copertura comprende ${z.roads}. Questi riferimenti aiutano durante la chiamata, ma valutiamo anche strade vicine, cortili interni, condomini, aree produttive e frazioni. Indicare punto preciso, tipo di immobile e accesso ai pozzetti permette di organizzare meglio l'uscita.`],
    ["Urgenza o manutenzione", `Se l'acqua rientra in casa, se un garage si allaga o se il bagno non si può usare, conviene chiamare subito. Se invece il problema ritorna ciclicamente, si può pianificare una pulizia preventiva. In entrambi i casi il nostro obiettivo è ridurre disagi, odori, danni e interventi ripetuti.`],
    ["Come contattarci", `Per interventi a ${z.city} puoi chiamare ${business.phone}. Per richieste non urgenti puoi scrivere a ${business.email}. Durante la telefonata è utile spiegare dove compare il problema, da quanto tempo dura e se sono presenti reflussi, odori o ristagni.`],
  ];
}

function contentSections(items) {
  return `<section class="content-como"><div class="como-container text-stack">${items.map(([h, p]) => `<article><h2>${h}</h2><p>${p}</p></article>`).join("")}</div></section>`;
}

function write(file, html) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const normalized = html
    .replaceAll("piu", "più")
    .replaceAll("puo", "può")
    .replaceAll("perche", "perché")
    .replaceAll("attivita", "attività")
    .replaceAll("priorita", "priorità")
    .replaceAll("necessita", "necessità")
    .replaceAll("criticita", "criticità")
    .replaceAll(" e meglio", " è meglio")
    .replaceAll(" e sempre", " è sempre")
    .replaceAll(" e utile", " è utile")
    .replaceAll(" e piena", " è piena")
    .replaceAll(" e pieno", " è pieno")
    .replaceAll(" e il canale", " è il canale")
    .replaceAll(" e il contatto", " è il contatto")
    .replaceAll(" e la sede", " è la sede")
    .replaceAll(" e ridurre", " è ridurre")
    .replaceAll(" e vicino", " è vicino")
    .replaceAll(" e casuale", " è casuale")
    .replaceAll(" e liberare", " è liberare")
    .replaceAll(" e importante", " è importante")
    .replaceAll(" e stato", " è stato")
    .replaceAll(" e successo", " è successo")
    .replaceAll(" e pensato", " è pensato")
    .replace(/\be piena\b/g, "è piena")
    .replace(/\be pieno\b/g, "è pieno")
    .replace(/\be utile\b/g, "è utile")
    .replace(/\be successo\b/g, "è successo")
    .replace(/\be stato\b/g, "è stato")
    .replace(/\be pensato\b/g, "è pensato")
    .replace(/\be il canale\b/g, "è il canale")
    .replace(/\be il contatto\b/g, "è il contatto")
    .replace(/\be la sede\b/g, "è la sede")
    .replace(/\be ridurre\b/g, "è ridurre")
    .replace(/\be vicino\b/g, "è vicino")
    .replace(/\be casuale\b/g, "è casuale")
    .replace(/\be liberare\b/g, "è liberare")
    .replace(/\be importante\b/g, "è importante");
  fs.writeFileSync(target, normalized);
}

const homeBody = `${hero("Spurghi a Como per scarichi, fognature e urgenze senza attese", "Spurghi Como Fast interviene quando uno scarico blocca la casa, un pozzetto non riceve piu acqua, una fossa biologica e piena o serve un autospurgo organizzato con criterio. Contatto diretto, intervento ordinato e comunicazione chiara.", "hero.png")}
<section class="como-section"><div class="como-container intro-grid"><div><span class="eyebrow">Perché chiamarci</span><h2>Un servizio pensato per togliere il problema, non per complicarlo</h2></div><div><p>Quando un impianto si blocca, la prima cosa che serve è capire cosa sta succedendo. Chiediamo informazioni semplici, scegliamo l'attrezzatura corretta e interveniamo con attenzione agli ambienti. Il cliente deve sapere cosa stiamo facendo, perché lo facciamo e quali segnali osservare dopo la pulizia.</p><p>Lavoriamo per abitazioni, condomini, negozi, uffici, ristoranti, garage e cortili. Ogni contesto ha esigenze diverse: una cucina ostruita da grassi non si affronta come una fossa biologica piena, una doccia lenta non richiede lo stesso approccio di una colonna condominiale.</p></div></div></section>
<section class="como-section alt"><div class="como-container cards-grid">${services.slice(0, 6).map((s) => `<a class="service-card" href="servizi/${s.slug}/index.html"><img src="images/spurghi/${s.image}" alt="${s.title}"><h3>${s.title}</h3><p>${s.problem}.</p></a>`).join("")}</div><div class="center-cta"><a class="btn-primary" href="services.html">Tutti i servizi</a></div></section>
<section class="como-section"><div class="como-container intro-grid"><div><span class="eyebrow">Copertura</span><h2>Como e provincia, con interventi chiari e programmabili</h2></div><div class="zone-list">${zones.map((z) => `<a href="zone/${z.slug}/index.html">${z.title}</a>`).join("")}</div></div></section>
<section class="como-section faq"><div class="como-container"><h2>Domande frequenti</h2><div class="faq-grid">${["Intervenite anche di sera e nei festivi? Sì, il numero resta il canale piu rapido per urgenze con scarichi inutilizzabili o acqua che risale.","Quando serve l'autospurgo? Quando ci sono reflui da aspirare, fosse piene, pozzetti saturi o allagamenti da rimuovere.","La videoispezione e sempre necessaria? No, e utile quando il problema torna spesso o quando serve capire cosa succede dentro la tubazione.","Lavorate per condomini? Sì, interveniamo su colonne di scarico, pozzetti, cortili, garage e reti comuni."].map((t) => { const [q, a] = t.split("? "); return `<article><h3>${q}?</h3><p>${a}</p></article>`; }).join("")}</div></div></section>`;

write("index.html", page({ title: "Spurghi a Como 24H | Spurghi Como Fast", description: `Spurghi a Como per autospurgo, disotturazione tubi, fognature, videoispezioni e pronto intervento. Chiama ${business.phone}.`, body: homeBody }));

write("services.html", page({ title: "Servizi di spurgo a Como | Spurghi Como Fast", description: "Tutti i servizi per scarichi, fognature, fosse biologiche, videoispezioni e pronto intervento a Como.", current: "services.html", body: `${hero("Servizi di spurgo a Como", "Una panoramica completa degli interventi disponibili per case, condomini, negozi, uffici e locali tecnici.", "pozzetti-stradali.png", "services.html")}<section class="como-section"><div class="como-container cards-grid">${services.map((s) => `<a class="service-card" href="servizi/${s.slug}/index.html"><img src="images/spurghi/${s.image}" alt="${s.title}"><h3>${s.title}</h3><p>${s.problem}.</p></a>`).join("")}</div></section>` }));

write("about.html", page({ title: "Chi siamo | Spurghi Como Fast", description: "Una squadra locale per autospurgo, disotturazioni e pronto intervento fognature a Como.", current: "about.html", body: `${hero("Una squadra locale per scarichi e fognature a Como", "Lavoriamo con un obiettivo semplice: risolvere il problema, spiegare cosa e successo e lasciare il cliente con indicazioni chiare.", "pronto-intervento-24h.png", "about.html")}${contentSections([["Metodo", "Ogni intervento parte da ascolto, valutazione e scelta dello strumento corretto. Questo riduce tempi inutili e rende il lavoro piu ordinato."],["Pulizia", "Prestiamo attenzione ad accessi, ambienti e zona operativa. Il servizio deve risolvere un disagio, non crearne uno nuovo."],["Contatto diretto", `Telefono ${business.phone}, email ${business.email}, sede ${business.address}.`]])}` }));

write("contact.html", page({ title: "Contatti | Spurghi Como Fast", description: `Contatta Spurghi Como Fast al numero ${business.phone} o via email ${business.email}.`, current: "contact.html", body: `${hero("Contatta Spurghi Como Fast", "Per emergenze e meglio chiamare. Per richieste non urgenti puoi usare il modulo o scrivere via email.", "hero.png", "contact.html")}<section class="como-section"><div class="como-container contact-grid"><div><h2>Contatto diretto</h2><p><strong>Telefono:</strong> <a href="tel:${business.phoneHref}">${business.phone}</a></p><p><strong>Email:</strong> <a href="mailto:${business.email}">${business.email}</a></p><p><strong>Sede:</strong> ${business.address}</p></div><form action="mailto:${business.email}" method="post" enctype="text/plain"><input name="nome" placeholder="Nome"><input name="telefono" placeholder="Telefono"><input name="email" placeholder="Email"><textarea name="messaggio" placeholder="Descrivi il problema"></textarea><button class="btn-primary">Invia richiesta</button></form></div></section>` }));

for (const s of services) {
  write(`servizi/${s.slug}/index.html`, page({ title: `${s.title} | Spurghi Como Fast`, description: `${s.title}: intervento ordinato per scarichi, fognature e autospurgo. Chiama ${business.phone}.`, current: `servizi/${s.slug}/index.html`, body: `${hero(s.title, s.problem, s.image, `servizi/${s.slug}/index.html`)}${contentSections(serviceText(s))}<section class="como-section alt"><div class="como-container faq-grid"><article><h3>Quanto costa?</h3><p>Dipende da urgenza, accessi e attrezzatura necessaria. La valutazione parte dalla chiamata.</p></article><article><h3>Serve rompere?</h3><p>Prima si lavora dagli accessi disponibili: scarichi, sifoni, pozzetti o ispezioni.</p></article><article><h3>Quando chiamare?</h3><p>Quando l'acqua risale, l'odore aumenta o lo scarico non e piu utilizzabile.</p></article></div></section>` }));
}

for (const z of zones) {
  write(`zone/${z.slug}/index.html`, page({ title: `${z.title} 24H | Spurghi Como Fast`, description: `${z.title}: autospurgo, disotturazioni, videoispezioni e fognature. Chiama ${business.phone}.`, current: `zone/${z.slug}/index.html`, body: `${hero(z.title, `Autospurgo, disotturazioni, videoispezioni e pulizia fognature nella zona di ${z.city}.`, "hero.png", `zone/${z.slug}/index.html`)}${contentSections(zoneText(z))}<section class="como-section alt"><div class="como-container cards-grid">${services.slice(0, 6).map((s) => `<a class="service-card" href="../../servizi/${s.slug}/index.html"><img src="../../images/spurghi/${s.image}" alt="${s.title}"><h3>${s.nav}</h3><p>${s.problem}.</p></a>`).join("")}</div></section>` }));
}

write("CNAME", business.domain);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${business.url}/sitemap.xml\n`);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["index.html","about.html","services.html","contact.html",...services.map((s)=>`servizi/${s.slug}/`),...zones.map((z)=>`zone/${z.slug}/`)].map((u)=>`<url><loc>${business.url}/${u.replace("index.html","")}</loc></url>`).join("")}</urlset>`);
