import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Servizi', links: [
  {
    "text": "Disotturazione WC",
    "href": "/servizi/disotturazione-wc/"
  },
  {
    "text": "Disotturazione Lavandini",
    "href": "/servizi/disotturazione-lavandini/"
  },
  {
    "text": "Disotturazione Docce e Vasche",
    "href": "/servizi/disotturazione-docce-vasche/"
  },
  {
    "text": "Disotturazione Colonne di Scarico",
    "href": "/servizi/disotturazione-colonne-scarico/"
  },
  {
    "text": "Videoispezioni Fognature",
    "href": "/servizi/videoispezioni-fognature/"
  },
  {
    "text": "Spurgo Fosse Biologiche",
    "href": "/servizi/spurgo-fosse-biologiche/"
  },
  {
    "text": "Spurgo Pozzi Neri",
    "href": "/servizi/spurgo-pozzi-neri/"
  },
  {
    "text": "Pulizia Pozzetti Stradali",
    "href": "/servizi/pulizia-pozzetti-stradali/"
  },
  {
    "text": "Pulizia Caditoie e Pluviali",
    "href": "/servizi/pulizia-caditoie-pluviali/"
  },
  {
    "text": "Bonifica Allagamenti",
    "href": "/servizi/bonifica-allagamenti/"
  },
  {
    "text": "Manutenzione Fognature",
    "href": "/servizi/manutenzione-fognature/"
  },
  {
    "text": "Pronto Intervento Spurghi 24H",
    "href": "/servizi/pronto-intervento-24h/"
  }
] },
    { text: 'Zone', links: [
  {
    "text": "Spurghi Como",
    "href": "/zone/como/"
  },
  {
    "text": "Spurghi Cernobbio",
    "href": "/zone/cernobbio/"
  },
  {
    "text": "Spurghi Cantù",
    "href": "/zone/cantu/"
  },
  {
    "text": "Spurghi Erba",
    "href": "/zone/erba/"
  },
  {
    "text": "Spurghi Mariano Comense",
    "href": "/zone/mariano-comense/"
  },
  {
    "text": "Spurghi Menaggio",
    "href": "/zone/menaggio/"
  }
] },
    { text: 'Chi siamo', href: getPermalink('/about') },
    { text: 'Contatti', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Chiama 031 668 0329', href: 'tel:0316680329' }],
};

export const footerData = {
  links: [
    { title: 'Servizi', links: [
  {
    "text": "Disotturazione WC",
    "href": "/servizi/disotturazione-wc/"
  },
  {
    "text": "Disotturazione Lavandini",
    "href": "/servizi/disotturazione-lavandini/"
  },
  {
    "text": "Disotturazione Docce e Vasche",
    "href": "/servizi/disotturazione-docce-vasche/"
  },
  {
    "text": "Disotturazione Colonne di Scarico",
    "href": "/servizi/disotturazione-colonne-scarico/"
  },
  {
    "text": "Videoispezioni Fognature",
    "href": "/servizi/videoispezioni-fognature/"
  },
  {
    "text": "Spurgo Fosse Biologiche",
    "href": "/servizi/spurgo-fosse-biologiche/"
  }
] },
    { title: 'Zone servite', links: [
  {
    "text": "Spurghi Como",
    "href": "/zone/como/"
  },
  {
    "text": "Spurghi Cernobbio",
    "href": "/zone/cernobbio/"
  },
  {
    "text": "Spurghi Cantù",
    "href": "/zone/cantu/"
  },
  {
    "text": "Spurghi Erba",
    "href": "/zone/erba/"
  },
  {
    "text": "Spurghi Mariano Comense",
    "href": "/zone/mariano-comense/"
  },
  {
    "text": "Spurghi Menaggio",
    "href": "/zone/menaggio/"
  }
] },
    { title: 'Azienda', links: [
      { text: 'Chi siamo', href: '/about/' },
      { text: 'Servizi', href: '/services/' },
      { text: 'Contatti', href: '/contact/' },
    ] },
    { title: 'Contatti', links: [
      { text: '031 668 0329', href: 'tel:0316680329' },
      { text: 'assistenza@spurghicomofas.it', href: 'mailto:assistenza@spurghicomofas.it' },
      { text: 'Via Giuseppe Merzario, 7 - 22100 Como CO', href: '/contact/' },
    ] },
  ],
  secondaryLinks: [
    { text: 'Privacy', href: '/privacy/' },
    { text: 'Cookie', href: '/privacy/#cookie' },
  ],
  socialLinks: [],
  footNote: '© 2026 Spurghi Como Fast. Servizio attivo 24 ore su 24.',
};
