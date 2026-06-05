import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const business = {
  name: 'Spurghi Como Fast',
  domain: 'spurghicomofas.it',
  site: 'https://spurghicomofas.it',
  phone: '031 668 0329',
  phoneHref: '0316680329',
  email: 'assistenza@spurghicomofas.it',
  address: 'Via Giuseppe Merzario, 7 - 22100 Como CO',
};

const services = [
  ['disotturazione-wc', 'Disotturazione WC a Como', 'WC bloccato, acqua che risale dal sanitario, bagno inutilizzabile e cattivi odori improvvisi.', 'sonde compatte, stasatrici professionali e controllo progressivo del deflusso', 'disotturazione-wc.png', 'tabler:toilet-paper'],
  ['disotturazione-lavandini', 'Disotturazione Lavandini a Como', 'Lavandini lenti, scarichi cucina ostruiti da grassi, sapone, calcare e residui.', 'pulizia del sifone, strumenti flessibili e verifica finale dello scarico', 'disotturazione-lavandini.png', 'tabler:droplet'],
  ['disotturazione-docce-vasche', 'Disotturazione Docce e Vasche a Como', 'Acqua che ristagna in doccia, vasche lente, pilette bloccate e odori persistenti.', 'attrezzi sottili, pulizia mirata e controllo del collegamento verso la colonna', 'disotturazione-docce-vasche.png', 'tabler:bath'],
  ['disotturazione-colonne-scarico', 'Disotturazione Colonne di Scarico a Como', 'Più scarichi lenti nello stesso edificio, rumori nella colonna e reflussi dai piani bassi.', 'ispezione dagli accessi esistenti, pulizia progressiva e strumenti adatti alle linee comuni', 'colonne-scarico.png', 'tabler:building'],
  ['videoispezioni-fognature', 'Videoispezioni Fognature a Como', 'Blocchi ricorrenti, sospette rotture, radici, cedimenti o punti interni da controllare.', 'telecamera professionale, lettura del tracciato e individuazione delle criticità', 'videoispezioni-fognature.png', 'tabler:camera-search'],
  ['spurgo-fosse-biologiche', 'Spurgo Fosse Biologiche a Como', 'Fosse piene, odori persistenti, scarichi lenti e necessità di svuotamento programmato.', 'autospurgo, aspirazione dei reflui, pulizia del vano e controllo dei punti di accesso', 'spurgo-fosse-biologiche.png', 'tabler:truck'],
  ['spurgo-pozzi-neri', 'Spurgo Pozzi Neri a Como', 'Pozzi neri pieni, odori forti, impianti che ricevono lentamente e reflui da aspirare.', 'aspirazione con mezzo attrezzato, controllo del livello e pulizia della zona operativa', 'pozzi-neri.png', 'tabler:recycle'],
  ['pulizia-pozzetti-stradali', 'Pulizia Pozzetti Stradali a Como', 'Pozzetti pieni, acqua ferma dopo la pioggia, depositi di terra, sabbia e foglie.', 'aspirazione dei materiali, pulizia del vano e verifica del passaggio verso la rete', 'pozzetti-stradali.png', 'tabler:road'],
  ['pulizia-caditoie-pluviali', 'Pulizia Caditoie e Pluviali a Como', 'Caditoie o pluviali ostruiti, ristagni, rigurgiti durante temporali e griglie sporche.', 'rimozione dei depositi, pulizia delle griglie e controllo del corretto deflusso', 'caditoie-pluviali.png', 'tabler:cloud-rain'],
  ['bonifica-allagamenti', 'Bonifica Allagamenti a Como', 'Cantine, box, locali tecnici e cortili invasi da acqua o reflui dopo un guasto.', 'aspirazione, pulizia dell’area e ripristino delle condizioni di utilizzo', 'bonifica-allagamenti.png', 'tabler:bucket'],
  ['manutenzione-fognature', 'Manutenzione Fognature a Como', 'Impianti che rallentano spesso, pozzetti da controllare e reti private da mantenere pulite.', 'pulizie periodiche, controlli mirati e indicazioni per prevenire nuovi blocchi', 'manutenzione-fognature.png', 'tabler:settings-check'],
  ['pronto-intervento-24h', 'Pronto Intervento Spurghi 24H a Como', 'Emergenze improvvise, reflussi, scarichi inutilizzabili e problemi che non possono aspettare.', 'ascolto telefonico, scelta del mezzo corretto e uscita organizzata in base alla priorità', 'pronto-intervento-24h.png', 'tabler:clock-24'],
].map(([slug, title, problem, method, image, icon]) => ({ slug, title, problem, method, image, icon }));

const zones = [
  ['como', 'Como', 'Via Napoleona, Camerlata, Borghi, centro, Monte Olimpino e zona lago'],
  ['cernobbio', 'Cernobbio', 'Via Regina, zona lago, Rovenna, Piazza Mazzini e aree residenziali'],
  ['cantu', 'Cantù', 'Via Milano, Via Roma, zona Pianella, Fecchio, Vighizzolo e strade artigianali'],
  ['erba', 'Erba', 'Corso XXV Aprile, Via Lecco, zona stazione, Crevenna e aree vicine'],
  ['mariano-comense', 'Mariano Comense', 'Via Como, Via Milano, zona stazione, quartieri residenziali e aree produttive'],
  ['menaggio', 'Menaggio', 'Via Lusardi, lungolago, Loveno, Croce e strade verso il centro'],
].map(([slug, city, streets]) => ({ slug, city, streets }));

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}

const serviceItems = services.map((service) => ({
  title: service.title,
  description: service.problem,
  icon: service.icon,
  callToAction: { text: 'Apri servizio', href: `/servizi/${service.slug}/` },
}));

const zoneItems = zones.map((zone) => ({
  title: `Spurghi a ${zone.city}`,
  description: `Interventi per scarichi, pozzetti, fosse biologiche e fognature nella zona di ${zone.city}.`,
  icon: 'tabler:map-pin',
  callToAction: { text: 'Apri zona', href: `/zone/${zone.slug}/` },
}));

const navServices = services.map((service) => ({ text: service.title.replace(' a Como', ''), href: `/servizi/${service.slug}/` }));
const navZones = zones.map((zone) => ({ text: `Spurghi ${zone.city}`, href: `/zone/${zone.slug}/` }));

for (const entry of [
  'src/pages/homes',
  'src/pages/landing',
  'src/pages/[...blog]',
  'src/pages/pricing.astro',
  'src/pages/rss.xml.ts',
  'src/pages/terms.md',
]) {
  const target = path.join(root, entry);
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

write('src/navigation.ts', `import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Servizi', links: ${serialize(navServices)} },
    { text: 'Zone', links: ${serialize(navZones)} },
    { text: 'Chi siamo', href: getPermalink('/about') },
    { text: 'Contatti', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }],
};

export const footerData = {
  links: [
    { title: 'Servizi', links: ${serialize(navServices.slice(0, 6))} },
    { title: 'Zone servite', links: ${serialize(navZones)} },
    { title: 'Azienda', links: [
      { text: 'Chi siamo', href: '/about/' },
      { text: 'Servizi', href: '/services/' },
      { text: 'Contatti', href: '/contact/' },
    ] },
    { title: 'Contatti', links: [
      { text: '${business.phone}', href: 'tel:${business.phoneHref}' },
      { text: '${business.email}', href: 'mailto:${business.email}' },
      { text: '${business.address}', href: '/contact/' },
    ] },
  ],
  secondaryLinks: [
    { text: 'Privacy', href: '/privacy/' },
    { text: 'Cookie', href: '/privacy/#cookie' },
  ],
  socialLinks: [],
  footNote: '© 2026 ${business.name}. Servizio attivo 24 ore su 24.',
};
`);

write('src/config.yaml', `site:
  name: ${business.name}
  site: '${business.site}'
  base: '/'
  trailingSlash: true

metadata:
  title:
    default: 'Spurghi a Como 24H | ${business.name}'
    template: '%s | ${business.name}'
  description: 'Interventi di spurgo, disotturazione scarichi, videoispezioni e autospurgo a Como. Telefono attivo 24 ore su 24.'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: ${business.name}
    images:
      - url: '/images/spurghi/hero.png'
        width: 1200
        height: 630
    type: website
  twitter:
    cardType: summary_large_image

i18n:
  language: it
  textDirection: ltr

apps:
  blog:
    isEnabled: false

analytics:
  vendors:
    googleAnalytics:
      id: null

ui:
  theme: 'light:only'
`);

write('src/components/Logo.astro', `---
import { SITE } from 'astrowind:config';
---

<span class="flex items-center gap-3 whitespace-nowrap">
  <span class="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-slate-900 shadow-[0_16px_35px_rgba(37,99,235,.28)]">
    <span class="absolute inset-1 rounded-xl border border-white/25"></span>
    <span class="text-lg font-black text-white">S</span>
  </span>
  <span class="leading-tight">
    <span class="block text-lg font-extrabold tracking-tight text-slate-950">{SITE?.name}</span>
    <span class="block text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Como H24</span>
  </span>
</span>
`);

write('src/components/StickyPhone.astro', `---
---
<a class="fixed inset-x-3 bottom-3 z-50 flex items-center justify-center rounded-full bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-2xl shadow-blue-600/30 md:hidden" href="tel:${business.phoneHref}" aria-label="Chiama ${business.phone}">
  Chiama ora ${business.phone}
</a>
`);

write('src/components/CookieBanner.astro', `---
---
<div id="cookie-banner" class="fixed inset-x-3 bottom-20 z-50 hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl md:left-auto md:right-6 md:max-w-md">
  <p class="text-sm font-semibold text-slate-950">Preferenze privacy</p>
  <p class="mt-2 text-sm text-slate-600">Usiamo solo strumenti tecnici necessari al funzionamento del sito. Puoi accettare l'avviso e continuare la navigazione.</p>
  <button id="cookie-accept" class="mt-4 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white">Ho capito</button>
</div>
<script is:inline>
  const banner = document.getElementById('cookie-banner');
  const button = document.getElementById('cookie-accept');
  if (banner && !localStorage.getItem('como_cookie_ok')) banner.classList.remove('hidden');
  button?.addEventListener('click', () => {
    localStorage.setItem('como_cookie_ok', '1');
    banner?.classList.add('hidden');
  });
</script>
`);

write('src/layouts/PageLayout.astro', `---
import Layout from '~/layouts/Layout.astro';
import Header from '~/components/widgets/Header.astro';
import Footer from '~/components/widgets/Footer.astro';
import StickyPhone from '~/components/StickyPhone.astro';
import CookieBanner from '~/components/CookieBanner.astro';
import { headerData, footerData } from '~/navigation';
import type { MetaData } from '~/types';

export interface Props {
  metadata?: MetaData;
}

const { metadata } = Astro.props;
---

<Layout metadata={metadata}>
  <slot name="header">
    <Header {...headerData} isSticky />
  </slot>
  <main>
    <slot />
  </main>
  <slot name="footer">
    <Footer {...footerData} />
  </slot>
  <StickyPhone />
  <CookieBanner />
</Layout>
`);

write('src/pages/index.astro', `---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import Features2 from '~/components/widgets/Features2.astro';
import Features3 from '~/components/widgets/Features3.astro';
import Steps from '~/components/widgets/Steps.astro';
import Testimonials from '~/components/widgets/Testimonials.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Spurghi a Como 24H',
  description: 'Spurghi a Como per scarichi bloccati, fognature, fosse biologiche, videoispezioni e pronto intervento 24 ore su 24.',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Intervento diretto 24H"
    title="Spurghi a Como per scarichi, fognature e urgenze senza attese"
    subtitle="Quando uno scarico blocca la casa o un pozzetto non riceve più acqua, serve una squadra che ascolta, arriva preparata e lavora con ordine. Spurghi Como Fast interviene su abitazioni, condomini, negozi, ristoranti, garage e cortili con mezzi adatti e comunicazione chiara."
    actions={[
      { variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' },
      { variant: 'secondary', text: 'Scrivici', href: 'mailto:${business.email}' },
    ]}
    image={{ src: '/images/spurghi/hero.png', alt: 'Autospurgo professionale a Como', loading: 'eager' }}
  />

  <Content
    id="about"
    columns={3}
    items={[
      { icon: 'tabler:phone-call', title: 'Risposta rapida', description: 'Al telefono raccogliamo le informazioni decisive: tipo di scarico, accessi, urgenza, presenza di reflussi e posizione del problema.' },
      { icon: 'tabler:truck', title: 'Mezzo corretto', description: 'Prepariamo strumenti compatti, attrezzatura da disotturazione, videoispezione o autospurgo in base al caso reale.' },
      { icon: 'tabler:shield-check', title: 'Lavoro pulito', description: 'Proteggiamo gli ambienti, spieghiamo cosa stiamo facendo e controlliamo il deflusso prima di chiudere l’intervento.' },
    ]}
    image={{ src: '/images/spurghi/videoispezioni-fognature.png', alt: 'Tecnico durante una videoispezione fognaria' }}
  >
    <Fragment slot="content">
      <h2 class="mb-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Un servizio pensato per togliere il problema, non per complicarlo</h2>
      <p>Un impianto di scarico non si blocca sempre per lo stesso motivo. A volte il problema è vicino al sanitario, altre volte riguarda una colonna condominiale, un pozzetto esterno, una tubazione con pendenza difficile o un accumulo cresciuto nel tempo.</p>
      <p class="mt-4">Per questo lavoriamo con metodo: prima ascolto, poi scelta dell’attrezzatura, intervento progressivo e verifica finale. Il cliente deve sapere cosa è successo, come è stato risolto e quali segnali osservare nei giorni successivi.</p>
    </Fragment>
  </Content>

  <Features2
    title="Servizi più richiesti"
    subtitle="Dalle urgenze domestiche agli impianti condominiali, ogni intervento viene gestito con strumenti adeguati e attenzione agli ambienti."
    columns={3}
    items={${serialize(serviceItems.slice(0, 6))}}
  />

  <Steps
    title="Come lavoriamo"
    items={[
      { title: 'Ascolto e priorità', description: 'Capire se l’acqua risale, se il bagno è inutilizzabile o se il problema riguarda più scarichi permette di organizzare meglio l’uscita.', icon: 'tabler:message-circle' },
      { title: 'Intervento tecnico', description: 'Usiamo sonde, stasatrici, aspirazione, lavaggio o telecamera in base al punto da trattare, evitando manovre inutilmente invasive.', icon: 'tabler:tool' },
      { title: 'Controllo finale', description: 'Prima di lasciare il posto verifichiamo il passaggio dell’acqua, puliamo l’area di lavoro e diamo indicazioni semplici per prevenire nuovi blocchi.', icon: 'tabler:checks' },
    ]}
  />

  <Features3
    title="Zone operative"
    subtitle="Copriamo Como e diversi comuni vicini con interventi su scarichi domestici, reti private, pozzetti e fosse biologiche."
    columns={3}
    items={${serialize(zoneItems)}}
  />

  <Testimonials
    title="Cosa apprezzano i clienti"
    testimonials={[
      { testimonial: 'Telefonata chiara, tecnico preparato e scarico liberato senza sporcare il bagno. Ci hanno spiegato anche come evitare che il problema tornasse.', name: 'Cliente privato', job: 'Como' },
      { testimonial: 'Avevamo più scarichi lenti nel condominio. Hanno individuato il punto critico e risolto con ordine, senza creare confusione nelle parti comuni.', name: 'Amministrazione condominiale', job: 'Camerlata' },
      { testimonial: 'Intervento rapido su pozzetto pieno dopo un temporale. Comunicazione semplice, prezzo spiegato prima e lavoro lasciato pulito.', name: 'Attività commerciale', job: 'Cernobbio' },
    ]}
  />

  <CallToAction
    title="Scarico bloccato o fognatura in emergenza?"
    subtitle="Chiama Spurghi Como Fast: ti aiutiamo a capire il problema e a organizzare l’intervento più adatto."
    actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }]}
  />
  <script type="application/ld+json" set:html={JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '${business.name}',
    url: '${business.site}',
    telephone: '${business.phoneHref}',
    email: '${business.email}',
    address: { '@type': 'PostalAddress', streetAddress: 'Via Giuseppe Merzario, 7', postalCode: '22100', addressLocality: 'Como', addressRegion: 'CO', addressCountry: 'IT' },
    openingHours: 'Mo-Su 00:00-23:59',
  })} />
</Layout>
`);

write('src/pages/services.astro', `---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Features2 from '~/components/widgets/Features2.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Servizi di spurgo a Como',
  description: 'Tutti i servizi di Spurghi Como Fast: disotturazioni, autospurgo, videoispezioni, fosse biologiche, pozzetti, caditoie e pronto intervento.',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Servizi"
    title="Servizi di spurgo a Como per case, condomini e attività"
    subtitle="Ogni pagina servizio spiega quando chiamare, come interveniamo e quali vantaggi offre un intervento tecnico rispetto ai tentativi improvvisati."
    actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }]}
    image={{ src: '/images/spurghi/manutenzione-fognature.png', alt: 'Servizi di spurgo e manutenzione fognature' }}
  />
  <Features2 title="Scegli il servizio" subtitle="Apri la scheda più vicina al problema che stai riscontrando." columns={3} items={${serialize(serviceItems)}} />
  <CallToAction title="Non sai quale servizio serve?" subtitle="Descrivici il problema al telefono: ti aiutiamo a capire il tipo di intervento più adatto." actions={[{ variant: 'primary', text: 'Chiama ora', href: 'tel:${business.phoneHref}' }]} />
</Layout>
`);

write('src/pages/about.astro', `---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import Features2 from '~/components/widgets/Features2.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Chi siamo',
  description: 'Spurghi Como Fast: interventi su scarichi, fognature, pozzetti e fosse biologiche con servizio attivo 24 ore su 24.',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Chi siamo"
    title="Una squadra per scarichi e fognature che lavora con ordine"
    subtitle="Spurghi Como Fast nasce per dare un riferimento chiaro a chi deve risolvere un problema urgente senza perdere tempo tra spiegazioni confuse, attese indefinite e interventi improvvisati."
    actions={[{ variant: 'primary', text: 'Parla con noi', href: 'tel:${business.phoneHref}' }]}
    image={{ src: '/images/spurghi/spurgo-fosse-biologiche.png', alt: 'Autospurgo operativo a Como' }}
  />
  <Content
    items={[
      { title: 'Ascolto prima dell’uscita', description: 'Una telefonata ben fatta evita errori: chiediamo accessi, sintomi, urgenza e tipo di immobile.' },
      { title: 'Attrezzatura proporzionata', description: 'Non tutti i blocchi richiedono lo stesso mezzo. Scegliamo strumenti in base al problema.' },
      { title: 'Comunicazione chiara', description: 'Prima e dopo l’intervento spieghiamo cosa è stato fatto e cosa tenere sotto controllo.' },
    ]}
    image={{ src: '/images/spurghi/pronto-intervento-24h.png', alt: 'Tecnico spurghi in pronto intervento' }}
  >
    <Fragment slot="content">
      <h2 class="mb-4 text-3xl font-bold tracking-tight text-slate-950">Perché scegliere Spurghi Como Fast</h2>
      <p>Quando un bagno non scarica, una fossa biologica è piena o un pozzetto manda cattivi odori, la differenza la fanno metodo e tempi di risposta. L’obiettivo non è solo liberare una tubazione, ma ridurre il disagio, proteggere gli ambienti e lasciare indicazioni utili.</p>
      <p class="mt-4">Interveniamo in abitazioni private, condomini, negozi, ristoranti, uffici, garage, cortili e aree esterne. Ogni situazione viene valutata in modo concreto, senza promettere soluzioni generiche prima di aver capito il problema.</p>
    </Fragment>
  </Content>
  <Features2
    title="Valori operativi"
    columns={3}
    items={[
      { title: 'Pulizia', description: 'Protezione degli ambienti e attenzione al ripristino dell’area di lavoro.', icon: 'tabler:sparkles' },
      { title: 'Precisione', description: 'Scelta degli strumenti in base al sintomo e agli accessi disponibili.', icon: 'tabler:target-arrow' },
      { title: 'Continuità', description: 'Disponibilità per urgenze e interventi programmati su reti private.', icon: 'tabler:clock-24' },
    ]}
  />
  <CallToAction title="Hai bisogno di un intervento?" subtitle="Chiama il numero diretto e raccontaci cosa sta succedendo." actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }]} />
</Layout>
`);

write('src/pages/contact.astro', `---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Contact from '~/components/widgets/Contact.astro';
import Features2 from '~/components/widgets/Features2.astro';

const metadata = {
  title: 'Contatti',
  description: 'Contatta Spurghi Como Fast: telefono 031 668 0329, email assistenza@spurghicomofas.it, sede in Via Giuseppe Merzario, 7 - 22100 Como CO.',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Contatti"
    title="Contatta Spurghi Como Fast"
    subtitle="Per urgenze usa il telefono: è il canale più rapido quando l’acqua risale, uno scarico non è utilizzabile o un pozzetto crea odori e ristagni."
    actions={[
      { variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' },
      { variant: 'secondary', text: 'Invia email', href: 'mailto:${business.email}' },
    ]}
  />
  <Contact
    id="form"
    title="Richiedi informazioni"
    subtitle="Per richieste non urgenti puoi scriverci: indica città, tipo di problema, accessi disponibili e un recapito telefonico."
    inputs={[
      { type: 'text', name: 'name', label: 'Nome' },
      { type: 'text', name: 'phone', label: 'Telefono' },
      { type: 'email', name: 'email', label: 'Email' },
    ]}
    textarea={{ label: 'Messaggio' }}
    disclaimer={{ label: 'Inviando la richiesta confermi di voler essere ricontattato.' }}
    button={{ text: 'Invia richiesta' }}
    form={{ action: 'mailto:${business.email}', method: 'post', enctype: 'text/plain' }}
  />
  <Features2
    title="Riferimenti"
    columns={3}
    items={[
      { title: 'Telefono', description: '${business.phone} - attivo per urgenze e richieste rapide.', icon: 'tabler:phone-call' },
      { title: 'Email', description: '${business.email}', icon: 'tabler:mail' },
      { title: 'Sede', description: '${business.address}', icon: 'tabler:map-pin' },
    ]}
  />
  <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
    <iframe class="h-80 w-full rounded-3xl border border-slate-200 shadow-sm" loading="lazy" src="https://www.google.com/maps?q=Via%20Giuseppe%20Merzario%207%2022100%20Como%20CO&output=embed" title="Mappa sede Spurghi Como Fast"></iframe>
  </section>
</Layout>
`);

for (const service of services) {
  write(`src/pages/servizi/${service.slug}.astro`, `---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import Features2 from '~/components/widgets/Features2.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: '${service.title}',
  description: '${service.title}: intervento tecnico per ${service.problem.toLowerCase()} Chiama ${business.phone}.',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Servizio"
    title="${service.title}"
    subtitle="${service.problem} Quando il problema si presenta, è meglio intervenire con strumenti adeguati e una verifica finale del deflusso."
    actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }, { variant: 'secondary', text: 'Contatti', href: '/contact/' }]}
    image={{ src: '/images/spurghi/${service.image}', alt: '${service.title}' }}
  />
  <Content
    items={[
      { title: 'Valutazione iniziale', description: 'Raccogliamo informazioni su sintomi, accessi e urgenza prima di scegliere l’attrezzatura.' },
      { title: 'Intervento mirato', description: 'Per questo servizio utilizziamo ${service.method}.' },
      { title: 'Controllo finale', description: 'Verifichiamo il passaggio dell’acqua e lasciamo indicazioni semplici per evitare ricadute.' },
    ]}
    image={{ src: '/images/spurghi/${service.image}', alt: '${service.title}' }}
  >
    <Fragment slot="content">
      <h2 class="mb-4 text-3xl font-bold tracking-tight text-slate-950">Quando serve questo intervento</h2>
      <p>Un blocco nello scarico può nascere da residui organici, calcare, grassi, oggetti caduti accidentalmente, pendenze difficili o depositi accumulati nella tubazione. Il primo segnale spesso è un rallentamento, poi arrivano rumori, odori, gorgoglii o acqua che torna indietro.</p>
      <p class="mt-4">${service.title} significa affrontare il problema con attenzione agli ambienti e agli accessi disponibili. Non forziamo inutilmente tubazioni o sanitari: procediamo per gradi, controllando la reazione dello scarico e scegliendo lo strumento più adatto.</p>
      <p class="mt-4">Il servizio è adatto a case, condomini, negozi, uffici, ristoranti, box, cortili e locali tecnici. Se il problema è urgente, il telefono resta il canale più rapido per capire come intervenire.</p>
    </Fragment>
  </Content>
  <Features2
    title="Vantaggi"
    columns={3}
    items={[
      { title: 'Meno tentativi inutili', description: 'Un tecnico riconosce i segnali e lavora sul punto più probabile del blocco.', icon: 'tabler:checks' },
      { title: 'Ambienti protetti', description: 'L’intervento viene organizzato per ridurre sporco, odori e disagio durante il lavoro.', icon: 'tabler:shield-check' },
      { title: 'Prevenzione', description: 'Dopo la pulizia spieghiamo cosa osservare e quando pianificare un controllo.', icon: 'tabler:info-circle' },
    ]}
  />
  <Features2
    title="Domande frequenti"
    columns={3}
    items={[
      { title: 'Quanto costa?', description: 'Dipende da urgenza, accessi e attrezzatura necessaria. La valutazione parte dalla chiamata.', icon: 'tabler:coin' },
      { title: 'Serve rompere?', description: 'Prima si lavora dagli accessi disponibili: scarichi, sifoni, pozzetti o ispezioni.', icon: 'tabler:tool' },
      { title: 'Quando chiamare?', description: 'Quando l’acqua risale, l’odore aumenta o lo scarico non è più utilizzabile.', icon: 'tabler:phone' },
    ]}
  />
  <CallToAction title="Hai bisogno di ${service.title.replace(' a Como', '').toLowerCase()}?" subtitle="Chiama Spurghi Como Fast e descrivici il problema: ti aiutiamo a organizzare l’intervento." actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }]} />
</Layout>
`);
}

for (const zone of zones) {
  write(`src/pages/zone/${zone.slug}.astro`, `---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Content from '~/components/widgets/Content.astro';
import Features2 from '~/components/widgets/Features2.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Spurghi a ${zone.city}',
  description: 'Spurghi a ${zone.city}: interventi su scarichi, fognature, pozzetti, fosse biologiche e videoispezioni. Servizio 24H con telefono diretto.',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Zona servita"
    title="Spurghi a ${zone.city}"
    subtitle="Interventi per scarichi bloccati, pozzetti pieni, fosse biologiche, colonne di scarico e fognature private nella zona di ${zone.city}."
    actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }, { variant: 'secondary', text: 'Vedi servizi', href: '/services/' }]}
    image={{ src: '/images/spurghi/hero.png', alt: 'Spurghi a ${zone.city}' }}
  />
  <Content
    items={[
      { title: 'Aree coperte', description: '${zone.streets}.' },
      { title: 'Urgenze e programmi', description: 'Gestiamo sia problemi improvvisi sia manutenzioni pianificate su reti private.' },
      { title: 'Contatto diretto', description: 'Al telefono raccogliamo posizione, accessi e sintomi per preparare meglio l’uscita.' },
    ]}
    image={{ src: '/images/spurghi/pozzetti-stradali.png', alt: 'Autospurgo operativo nella zona di ${zone.city}' }}
  >
    <Fragment slot="content">
      <h2 class="mb-4 text-3xl font-bold tracking-tight text-slate-950">Interventi nella zona di ${zone.city}</h2>
      <p>Spurghi a ${zone.city} significa avere un riferimento rapido quando un impianto di scarico crea disagi in casa, in condominio o in un’attività. Ogni richiesta viene ascoltata con attenzione: capire se il problema riguarda un solo punto o più scarichi insieme cambia completamente il tipo di intervento da preparare.</p>
      <p class="mt-4">A ${zone.city} interveniamo per WC bloccati, lavandini lenti, docce e vasche che non scaricano, colonne condominiali, videoispezioni, fosse biologiche, pozzi neri, caditoie, pluviali, allagamenti e manutenzione fognature. Alcuni problemi richiedono strumenti compatti, altri un mezzo autospurgo o una verifica interna della tubazione.</p>
      <p class="mt-4">La copertura comprende ${zone.streets}. Valutiamo anche strade vicine, cortili interni, condomini, aree produttive e frazioni. Indicare punto preciso, tipo di immobile e accesso ai pozzetti permette di organizzare meglio l’uscita.</p>
      <p class="mt-4">Se l’acqua rientra in casa, se un garage si allaga o se il bagno non si può usare, conviene chiamare subito. Se invece il problema ritorna ciclicamente, si può pianificare una pulizia preventiva.</p>
    </Fragment>
  </Content>
  <Features2 title="Servizi disponibili a ${zone.city}" columns={3} items={${serialize(serviceItems.slice(0, 6))}} />
  <CallToAction title="Serve un intervento a ${zone.city}?" subtitle="Chiama Spurghi Como Fast: ti aiutiamo a capire la priorità e a scegliere l’intervento corretto." actions={[{ variant: 'primary', text: 'Chiama ${business.phone}', href: 'tel:${business.phoneHref}' }]} />
</Layout>
`);
}

write('src/pages/privacy.md', `---
title: Privacy e cookie
description: Informazioni privacy e cookie di Spurghi Como Fast.
---

# Privacy e cookie

Spurghi Como Fast raccoglie solo i dati che l’utente sceglie di inviare tramite telefono, email o modulo contatti. I dati vengono usati per rispondere alla richiesta e organizzare eventuali interventi.

## Cookie

Il sito utilizza cookie tecnici necessari al funzionamento dell’avviso privacy. Non sono attivi strumenti pubblicitari o profilazione.
`);

write('src/data/post/placeholder.md', `---
title: Placeholder
draft: true
---
`);

write('CNAME', business.domain);
write('public/CNAME', business.domain);
write('public/robots.txt', `User-agent: *
Allow: /

Sitemap: ${business.site}/sitemap-index.xml
`);

write('.github/workflows/deploy.yml', `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
`);

console.log('Astrowind Como site generated.');
