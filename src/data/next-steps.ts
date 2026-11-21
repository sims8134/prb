// Texts of the two exit points ("Go deeper", "Support the channel") and of the header
// "Support" button. One place for the four languages, used by NextSteps.astro and MainLayout.
import type { Lang } from "./site";

export const COLD_WAR_BULGARIA_URL = "https://coldwarbulgaria.com";
/** Link to Cold War Bulgaria, tagged with the page of origin (no tracking runs on this site). */
export function coldWarBulgariaUrl(campaign: string, anchor?: string): string {
  const q = new URLSearchParams({ utm_source: "prb", utm_medium: "site", utm_campaign: campaign || "home" });
  return `${COLD_WAR_BULGARIA_URL}/?${q}${anchor ? "#" + anchor : ""}`;
}

/** Pages whose "Go deeper" card points to a precise section of Cold War Bulgaria. */
export const DEEPER_ANCHORS = { history: "timeline", collection: "museum", tourism: "map" } as const;
export type DeeperPage = keyof typeof DEEPER_ANCHORS;

export const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/peoplesrepublicofbulgaria";

export const nextSteps: Record<
  Lang,
  {
    label: string;
    newTab: string;
    support: string;
    deeper: { title: string; text: string; button: string };
    deeperFor: Record<DeeperPage, { text: string; button: string }>;
    coffee: { title: string; text: string; button: string };
  }
> = {
  en: {
    label: "What next",
    newTab: "opens in a new tab",
    support: "Support",
    deeper: {
      title: "Go deeper",
      text: "The research side of this channel: a timeline, a museum and a map of Bulgaria's Cold War years.",
      button: "Visit Cold War Bulgaria",
    },
    deeperFor: {
      history: { text: "The full timeline, year by year, is on Cold War Bulgaria.", button: "Open the timeline" },
      collection: { text: "See the whole collection in the online museum.", button: "Visit the museum" },
      tourism: { text: "Find every site on the Cold War map of Bulgaria.", button: "Open the map" },
    },
    coffee: {
      title: "Support the channel",
      text: "An independent channel, made in Sofia. Every coffee funds my videos and my research on Bulgaria's Cold War years.",
      button: "Buy me a coffee",
    },
  },
  fr: {
    label: "Et ensuite",
    newTab: "s'ouvre dans un nouvel onglet",
    support: "Soutenir",
    deeper: {
      title: "Aller plus loin",
      text: "Le volet recherche de cette chaîne : une chronologie, un musée et une carte des années de guerre froide en Bulgarie.",
      button: "Visiter Cold War Bulgaria",
    },
    deeperFor: {
      history: { text: "La chronologie complète, année par année, est sur Cold War Bulgaria.", button: "Ouvrir la chronologie" },
      collection: { text: "Découvrez toute la collection dans le musée en ligne.", button: "Visiter le musée" },
      tourism: { text: "Retrouvez chaque site sur la carte de la guerre froide en Bulgarie.", button: "Ouvrir la carte" },
    },
    coffee: {
      title: "Soutenir la chaîne",
      text: "Une chaîne indépendante, faite à Sofia. Chaque café finance mes vidéos et mes recherches sur les années de guerre froide en Bulgarie.",
      button: "Offrez-moi un café",
    },
  },
  es: {
    label: "Y después",
    newTab: "se abre en una pestaña nueva",
    support: "Apoyar",
    deeper: {
      title: "Profundiza",
      text: "La parte de investigación de este canal: una cronología, un museo y un mapa de los años de la Guerra Fría en Bulgaria.",
      button: "Visitar Cold War Bulgaria",
    },
    deeperFor: {
      history: { text: "La cronología completa, año por año, está en Cold War Bulgaria.", button: "Abrir la cronología" },
      collection: { text: "Mira toda la colección en el museo en línea.", button: "Visitar el museo" },
      tourism: { text: "Encuentra cada lugar en el mapa de la Guerra Fría en Bulgaria.", button: "Abrir el mapa" },
    },
    coffee: {
      title: "Apoya el canal",
      text: "Un canal independiente, hecho en Sofía. Cada café financia mis vídeos y mi investigación sobre los años de la Guerra Fría en Bulgaria.",
      button: "Invítame a un café",
    },
  },
  bg: {
    label: "А след това",
    newTab: "отваря се в нов раздел",
    support: "Подкрепа",
    deeper: {
      title: "Задълбочете се",
      text: "Изследователската страна на този канал: хронология, музей и карта на годините на Студената война в България.",
      button: "Посетете Cold War Bulgaria",
    },
    deeperFor: {
      history: { text: "Пълната хронология, година по година, е в Cold War Bulgaria.", button: "Отворете хронологията" },
      collection: { text: "Вижте цялата колекция в онлайн музея.", button: "Посетете музея" },
      tourism: { text: "Намерете всяко място на картата на Студената война в България.", button: "Отворете картата" },
    },
    coffee: {
      title: "Подкрепете канала",
      text: "Независим канал, създаден в София. Всяко кафе финансира моите видеа и проучванията ми за годините на Студената война в България.",
      button: "Купете ми кафе",
    },
  },
};
