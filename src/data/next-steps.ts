// Texts of the two exit points ("Go deeper", "Support the channel") and of the header
// "Support" button. One place for the four languages, used by NextSteps.astro and MainLayout.
import type { Lang } from "./site";

export const COLD_WAR_BULGARIA_URL = "https://coldwarbulgaria.com";
export const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/peoplesrepublicofbulgaria";

export const nextSteps: Record<
  Lang,
  {
    label: string;
    newTab: string;
    support: string;
    deeper: { title: string; text: string; button: string };
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
    coffee: {
      title: "Support the channel",
      text: "An independent channel, made in Sofia. If you enjoy the videos, you can buy me a coffee.",
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
    coffee: {
      title: "Soutenir la chaîne",
      text: "Une chaîne indépendante, faite à Sofia. Si vous aimez les vidéos, vous pouvez m'offrir un café.",
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
    coffee: {
      title: "Apoya el canal",
      text: "Un canal independiente, hecho en Sofía. Si te gustan los vídeos, puedes invitarme a un café.",
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
    coffee: {
      title: "Подкрепете канала",
      text: "Независим канал, създаден в София. Ако харесвате видеата, можете да ми купите кафе.",
      button: "Купете ми кафе",
    },
  },
};
