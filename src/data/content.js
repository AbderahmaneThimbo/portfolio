// Every piece of copy on the site lives here, so it can be updated without touching the layout.

import {
  SiReact, SiVuedotjs, SiFlutter, SiHtml5, SiJavascript, SiTailwindcss,
  SiSpring, SiNodedotjs, SiExpress,
  SiMysql, SiMongodb, SiFirebase, SiPrisma,
  SiGit, SiGitlab, SiDocker, SiPostman, SiFigma, SiJira,
  SiClaude, SiMeta, SiZapier,
} from "react-icons/si";

export const PROFILE = {
  firstName: "Abderahmane",
  name: "Abderahmane Thimbo",
  role: "Développeur full stack",
  city: "Nouakchott, Mauritanie",
  timeZone: "Africa/Nouakchott",
  email: "abderahmanethimbo@gmail.com",
  phone: "+222 49 02 80 81",
  whatsapp: "22249028081",
  cv: "/assets/Abderahmane-CV.pdf",
  photo: "/images/abderahmane.jpg",
};

export const whatsappLink = (text = "") =>
  `https://wa.me/${PROFILE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/AbderahmaneThimbo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abderahmane-thimbo-854b10309/" },
  { label: "TikTok", href: "https://www.tiktok.com/@abduerahmane92i" },
  { label: "Instagram", href: "https://www.instagram.com/abdu_erahmane/" },
];

export const NAV = [
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Stack", href: "#stack" },
  { label: "Vidéos", href: "#videos" },
];

export const FACTS = [
  { value: "Full stack", label: "en poste depuis juillet 2026" },
  { value: "8 projets", label: "sites, appli mobile, API et outils" },
  { value: "4 langues", label: "français, arabe, pulaar, hassaniya" },
];

export const STORY = [
  "Je ne viens pas de l’informatique. J’ai d’abord étudié l’économie et la gestion à l’université de Nouakchott, puis j’ai appris le code chez Simplon en 2024.",
  "Depuis décembre 2024, je travaille en entreprise à Nouakchott : stagiaire, puis apprenti, et développeur full stack depuis juillet 2026. Sur une application en production, je fais le frontend en React, Vue.js et Flutter, et le backend en Java Spring.",
  "À côté, je développe NearU, j’automatise des tâches avec l’IA et j’explique le web en vidéo sur TikTok.",
];

export const TIMELINE = [
  { when: "Juillet 2026", what: "Développeur full stack", where: "En entreprise, Nouakchott", now: true },
  { when: "2026", what: "Formation à l’utilisation des drones civils", where: "GIZ (Digital-Y), CURAT et CUCT" },
  { when: "Déc. 2024", what: "Stagiaire puis apprenti développeur frontend", where: "En entreprise, Nouakchott" },
  { when: "2024", what: "Certificat en développement web et web mobile", where: "Simplon (Tech4Mauritanie)" },
  { when: "Avant", what: "Bac +2 en économie et gestion", where: "Université de Nouakchott Al-Aasriya" },
];

export const STACK = [
  {
    group: "Frontend",
    note: "Web et mobile",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Vue.js", Icon: SiVuedotjs },
      { name: "Flutter", Icon: SiFlutter },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML et CSS", Icon: SiHtml5 },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    group: "Backend",
    note: "API et logique métier",
    items: [
      { name: "Java Spring", Icon: SiSpring },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express.js", Icon: SiExpress },
    ],
  },
  {
    group: "Données",
    note: "Bases et stockage",
    items: [
      { name: "MySQL", Icon: SiMysql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Firebase", Icon: SiFirebase },
      { name: "Prisma", Icon: SiPrisma },
    ],
  },
  {
    group: "Outils",
    note: "Travail en équipe",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitLab", Icon: SiGitlab },
      { name: "Docker", Icon: SiDocker },
      { name: "Postman", Icon: SiPostman },
      { name: "Figma", Icon: SiFigma },
      { name: "Agile Scrum", Icon: SiJira },
    ],
  },
  {
    group: "IA et digital",
    note: "Aller plus vite",
    items: [
      { name: "Claude et agents IA", Icon: SiClaude },
      { name: "Automatisation", Icon: SiZapier },
      { name: "Campagnes Meta Ads", Icon: SiMeta },
    ],
  },
];

// Years are left out on purpose: add them here once confirmed.
export const PROJECTS = [
  {
    name: "Ocazion",
    kind: "E-commerce complet",
    tags: ["React", "Node.js"],
    href: "https://ocazion.vercel.app/",
    shots: ["/images/work/ocazion-d1.webp", "/images/work/ocazion-m1.webp"],
    feature: true,
  },
  {
    name: "NearU",
    kind: "Appli d’amitié par la proximité",
    summary:
      "Un radar montre les personnes à moins de 5 km. On envoie une demande d’ami avant le premier message, puis on discute en tête-à-tête. Position arrondie à 500 m et mode invisible pour protéger la vie privée.",
    tags: ["Flutter", "Firebase", "Android et iOS"],
    status: "En développement",
    icon: "/images/work/nearu-icon.webp",
    // Real screens from the app (the other user's name was removed from the radar).
    shots: ["/images/work/nearu-radar.webp", "/images/work/nearu-profil.webp"],
    feature: true,
  },
  {
    name: "Reservation API",
    kind: "API REST de réservations",
    tags: ["Node.js", "Express", "Prisma"],
    href: "https://github.com/AbderahmaneThimbo/reservation-API",
    code: true,
  },
  {
    name: "ShopGrids",
    kind: "Boutique de mode en ligne",
    tags: ["E-commerce", "Site web"],
    href: "https://abderahmanethimbo.github.io/ShopGrids/",
    shots: ["/images/work/shopgrids-d1.webp", "/images/work/shopgrids-m1.jpg"],
  },
  {
    name: "Travel",
    kind: "Site vitrine d’agence de voyage",
    tags: ["Site web"],
    href: "https://abderahmanethimbo.github.io/travel/",
    shots: ["/images/work/travel-d1.webp", "/images/work/travel-m1.jpg"],
  },
  {
    name: "Codakt",
    kind: "Landing page de formation",
    tags: ["Web design"],
    href: "https://abderahmanethimbo.github.io/Codakt/",
    shots: ["/images/work/codakt-d1.webp", "/images/work/codakt-m1.jpg"],
  },
  {
    name: "Mailer",
    kind: "Outil d’emailing automatisé",
    tags: ["Node.js", "Automatisation"],
  },
  {
    name: "Lien WhatsApp",
    kind: "Générateur de liens WhatsApp",
    tags: ["React"],
    note: "Le formulaire de contact en bas de page en est une version.",
  },
];

export const VIDEOS = {
  profile: "https://www.tiktok.com/@abduerahmane92i",
  handle: "@abduerahmane92i",
  items: [
    {
      title: "Robot ou humain ? Ce test sert à autre chose",
      cover: "/images/videos/captcha.webp",
      clip: "/videos/captcha-loop.mp4",
    },
    { title: "Non, je ne pirate pas le compte de ton ex", cover: "/images/videos/informaticien.webp" },
    { title: "Pourquoi 4 chiffres seulement ?", cover: "/images/videos/code-pin.webp" },
  ],
};

export const PROJECT_TYPES = ["Site vitrine", "E-commerce", "Appli mobile", "API ou back-end", "Autre"];
