export const supportedLangs = ["en", "fr", "es", "bg"] as const;
export type Lang = typeof supportedLangs[number];

export const siteContent = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      history: "History",
      collection: "Collection",
      tourism: "Tourism",
      videos: "Videos",
      contact: "Contact",
      legal: "Legal Notice",
    },
    footer: {
      copyright: "© 2024 People's Republic of Bulgaria — All rights reserved",
    },
    home: {
      title: "People's Republic of Bulgaria — History, Collection & Cold War Bulgaria",
      description: "The first multilingual website dedicated to the history of the People's Republic of Bulgaria (1944–1990). Explore history, militaria, urbex, and Cold War Bulgaria.",
      welcomeTitle: "Welcome",
      welcomeText: "Welcome to the first multilingual website fully dedicated to the history of the People's Republic of Bulgaria.",
      tagline: "Welcome to People's Republic of Bulgaria! This website explores Communist Bulgaria (1944–1990) through history, militaria, collections, urbex, edits, and Cold War vibes.",
      notice: "This website has been created for cultural and historical purposes only.",
      explore: "Explore",
      latestVideo: "▶ Latest Video",
      watchOnYoutube: "▶ Watch on YouTube",
      allVideos: "📺 All Videos",
      noVideo: "No latest video found.",
      instagramTitle: "Instagram",
      instagramText: "Follow us on Instagram for regular photos of the collection, urbex spots and life in Bulgaria.",
      followOnInstagram: "Follow on Instagram",
      cards: {
        history: { title: "History", desc: "Timeline of key events from 1944 to 1990.", btn: "Discover" },
        collection: { title: "Collection", desc: "Objects, medals, uniforms and artefacts.", btn: "Discover" },
        tourism: { title: "Tourism", desc: "Sites to visit in Bulgaria — guided tours available.", btn: "Discover" },
        videos: { title: "Videos", desc: "Urbex, vlogs, edits and presentations.", btn: "Discover" },
      },
      newsletter: {
        title: "Newsletter",
        text: "Subscribe to receive new videos, historical updates, archive discoveries and project news.",
        placeholder: "Enter your email",
        consent: "I agree to receive the People's Republic of Bulgaria newsletter by email and I have read the privacy policy.",
        button: "Subscribe",
        subscribing: "Subscribing...",
        success: "📩 Check your email to confirm your subscription.",
        successHint: "If you don't see the email, please check your spam folder.",
        error: "Something went wrong.",
        errorNetwork: "⚠ Unable to subscribe right now.",
      },
    },
    about: {
      title: "About — People's Republic of Bulgaria",
      description: "Learn about the creator of this site — a French history enthusiast living in Sofia, Bulgaria, passionate about the communist era and Cold War history.",
    },
    history: {
      title: "History of Communist Bulgaria (1944–1990) — People's Republic of Bulgaria",
      description: "Complete timeline of the People's Republic of Bulgaria from the 1944 coup to the fall of communism in 1990. Key events, leaders, and milestones.",
    },
    collection: {
      title: "Collection — Communist Bulgaria Militaria, Medals & Uniforms",
      description: "Photo gallery of a private collection of objects from the People's Republic of Bulgaria — medals, military uniforms, badges, documents and Cold War artefacts.",
    },
    tourism: {
      title: "Visit Communist Bulgaria — Tourism & Guided Tours",
      description: "Discover the communist heritage sites of Bulgaria. Abandoned monuments, Cold War bunkers, and historic locations — guided tours available in Sofia and beyond.",
    },
    videos: {
      title: "Videos — Urbex, Vlogs & Communist Bulgaria",
      description: "Watch urbex explorations, vlogs and documentary edits about communist Bulgaria, abandoned Cold War sites, and the history of the People's Republic of Bulgaria.",
    },
    contact: {
      title: "Contact — People's Republic of Bulgaria",
      description: "Get in touch with the team behind People's Republic of Bulgaria. Questions about the collection, guided tours, or collaborations.",
    },
    legal: {
      title: "Legal Notice — People's Republic of Bulgaria",
      description: "Legal notice and terms of use for the People's Republic of Bulgaria website.",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      history: "Histoire",
      collection: "Collection",
      tourism: "Tourisme",
      videos: "Vidéos",
      contact: "Contact",
      legal: "Mentions légales",
    },
    footer: {
      copyright: "© 2024 People's Republic of Bulgaria — Tous droits réservés",
    },
    home: {
      title: "République Populaire de Bulgarie — Histoire, Collection & Guerre Froide",
      description: "Le premier site multilingue dédié à l'histoire de la République populaire de Bulgarie (1944–1990). Histoire, militaria, urbex et Bulgarie communiste.",
      welcomeTitle: "Bienvenue",
      welcomeText: "Bienvenue sur le premier site multilingue entièrement dédié à l'histoire de la République populaire de Bulgarie.",
      tagline: "Bienvenue sur People's Republic of Bulgaria ! Ce site explore la Bulgarie communiste (1944–1990) à travers l'histoire, la militaria, les collections, l'urbex, les montages et l'ambiance Guerre froide.",
      notice: "Ce site a été créé à des fins culturelles et historiques uniquement.",
      explore: "Explorer",
      latestVideo: "▶ Dernière vidéo",
      watchOnYoutube: "▶ Voir sur YouTube",
      allVideos: "📺 Toutes les vidéos",
      noVideo: "Aucune vidéo récente trouvée.",
      instagramTitle: "Instagram",
      instagramText: "Suivez-nous sur Instagram pour des photos régulières de la collection, des spots urbex et de la vie en Bulgarie.",
      followOnInstagram: "Suivre sur Instagram",
      cards: {
        history: { title: "Histoire", desc: "Chronologie des événements clés de 1944 à 1990.", btn: "Découvrir" },
        collection: { title: "Collection", desc: "Objets, médailles, uniformes et artefacts.", btn: "Découvrir" },
        tourism: { title: "Tourisme", desc: "Sites à visiter en Bulgarie — visites guidées disponibles.", btn: "Découvrir" },
        videos: { title: "Vidéos", desc: "Urbex, vlogs, montages et présentations.", btn: "Découvrir" },
      },
      newsletter: {
        title: "Newsletter",
        text: "Abonnez-vous pour recevoir les nouvelles vidéos, mises à jour historiques, découvertes d'archives et actualités du projet.",
        placeholder: "Votre adresse e-mail",
        consent: "J'accepte de recevoir la newsletter de People's Republic of Bulgaria par e-mail et j'ai lu la politique de confidentialité.",
        button: "S'abonner",
        subscribing: "Inscription en cours...",
        success: "📩 Vérifiez votre e-mail pour confirmer votre inscription.",
        successHint: "Si vous ne voyez pas l'e-mail, vérifiez vos spams.",
        error: "Une erreur est survenue.",
        errorNetwork: "⚠ Impossible de s'inscrire pour le moment.",
      },
    },
    about: {
      title: "À propos — République Populaire de Bulgarie",
      description: "Découvrez qui se cache derrière ce site — un passionné d'histoire français vivant à Sofia, spécialisé dans l'ère communiste et la Guerre froide en Bulgarie.",
    },
    history: {
      title: "Histoire de la Bulgarie communiste (1944–1990) — République Populaire de Bulgarie",
      description: "Chronologie complète de la République populaire de Bulgarie, du coup d'état de 1944 à la chute du communisme en 1990. Événements clés, dirigeants et jalons historiques.",
    },
    collection: {
      title: "Collection — Militaria, Médailles et Uniformes de Bulgarie communiste",
      description: "Galerie photo d'une collection privée d'objets de la République populaire de Bulgarie — médailles, uniformes militaires, insignes, documents et artefacts Guerre froide.",
    },
    tourism: {
      title: "Visiter la Bulgarie communiste — Tourisme et visites guidées",
      description: "Découvrez les sites du patrimoine communiste en Bulgarie. Monuments abandonnés, bunkers de la Guerre froide et lieux historiques — visites guidées disponibles.",
    },
    videos: {
      title: "Vidéos — Urbex, Vlogs & Bulgarie communiste",
      description: "Explorations urbex, vlogs et montages documentaires sur la Bulgarie communiste, les sites abandonnés de la Guerre froide et l'histoire de la République populaire de Bulgarie.",
    },
    contact: {
      title: "Contact — République Populaire de Bulgarie",
      description: "Contactez l'équipe de People's Republic of Bulgaria. Questions sur la collection, les visites guidées ou les collaborations.",
    },
    legal: {
      title: "Mentions légales — République Populaire de Bulgarie",
      description: "Mentions légales et conditions d'utilisation du site People's Republic of Bulgaria.",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      history: "Historia",
      collection: "Colección",
      tourism: "Turismo",
      videos: "Vídeos",
      contact: "Contacto",
      legal: "Aviso legal",
    },
    footer: {
      copyright: "© 2024 People's Republic of Bulgaria — Todos los derechos reservados",
    },
    home: {
      title: "República Popular de Bulgaria — Historia, Colección y Guerra Fría",
      description: "El primer sitio multilingüe dedicado a la historia de la República Popular de Bulgaria (1944–1990). Historia, militaria, urbex y Bulgaria comunista.",
      welcomeTitle: "Bienvenido",
      welcomeText: "Bienvenido al primer sitio multilingüe dedicado por completo a la historia de la República Popular de Bulgaria.",
      tagline: "Bienvenido a People's Republic of Bulgaria! Este sitio explora la Bulgaria comunista (1944–1990) a través de la historia, la militaria, las colecciones, el urbex, los montajes y el ambiente de la Guerra Fría.",
      notice: "Este sitio ha sido creado con fines culturales e históricos únicamente.",
      explore: "Explorar",
      latestVideo: "▶ Último vídeo",
      watchOnYoutube: "▶ Ver en YouTube",
      allVideos: "📺 Todos los vídeos",
      noVideo: "No se encontró ningún vídeo reciente.",
      instagramTitle: "Instagram",
      instagramText: "Síguenos en Instagram para ver fotos regulares de la colección, lugares de urbex y vida en Bulgaria.",
      followOnInstagram: "Seguir en Instagram",
      cards: {
        history: { title: "Historia", desc: "Cronología de eventos clave de 1944 a 1990.", btn: "Descubrir" },
        collection: { title: "Colección", desc: "Objetos, medallas, uniformes y artefactos.", btn: "Descubrir" },
        tourism: { title: "Turismo", desc: "Lugares para visitar en Bulgaria — visitas guiadas disponibles.", btn: "Descubrir" },
        videos: { title: "Vídeos", desc: "Urbex, vlogs, ediciones y presentaciones.", btn: "Descubrir" },
      },
      newsletter: {
        title: "Newsletter",
        text: "Suscríbete para recibir nuevos vídeos, actualizaciones históricas, descubrimientos de archivo y noticias del proyecto.",
        placeholder: "Tu correo electrónico",
        consent: "Acepto recibir la newsletter de People's Republic of Bulgaria por correo electrónico y he leído la política de privacidad.",
        button: "Suscribirse",
        subscribing: "Suscribiendo...",
        success: "📩 Revisa tu correo para confirmar tu suscripción.",
        successHint: "Si no ves el correo, revisa tu carpeta de spam.",
        error: "Algo salió mal.",
        errorNetwork: "⚠ No se puede suscribir en este momento.",
      },
    },
    about: {
      title: "Sobre mí — República Popular de Bulgaria",
      description: "Conoce al creador de este sitio — un apasionado de la historia francés que vive en Sofía, especializado en la era comunista y la Guerra Fría en Bulgaria.",
    },
    history: {
      title: "Historia de la Bulgaria comunista (1944–1990) — República Popular de Bulgaria",
      description: "Cronología completa de la República Popular de Bulgaria, desde el golpe de estado de 1944 hasta la caída del comunismo en 1990. Eventos clave, líderes e hitos históricos.",
    },
    collection: {
      title: "Colección — Militaria, Medallas y Uniformes de la Bulgaria comunista",
      description: "Galería fotográfica de una colección privada de objetos de la República Popular de Bulgaria — medallas, uniformes militares, insignias, documentos y artefactos de la Guerra Fría.",
    },
    tourism: {
      title: "Visitar la Bulgaria comunista — Turismo y visitas guiadas",
      description: "Descubre los sitios del patrimonio comunista en Bulgaria. Monumentos abandonados, búnkeres de la Guerra Fría y lugares históricos — visitas guiadas disponibles.",
    },
    videos: {
      title: "Vídeos — Urbex, Vlogs y Bulgaria comunista",
      description: "Exploraciones urbex, vlogs y montajes documentales sobre la Bulgaria comunista, los sitios abandonados de la Guerra Fría y la historia de la República Popular de Bulgaria.",
    },
    contact: {
      title: "Contacto — República Popular de Bulgaria",
      description: "Contacta con el equipo de People's Republic of Bulgaria. Preguntas sobre la colección, visitas guiadas o colaboraciones.",
    },
    legal: {
      title: "Aviso legal — República Popular de Bulgaria",
      description: "Aviso legal y condiciones de uso del sitio web People's Republic of Bulgaria.",
    },
  },

  bg: {
    nav: {
      home: "Начало",
      about: "За мен",
      history: "История",
      collection: "Колекция",
      tourism: "Туризъм",
      videos: "Видеа",
      contact: "Контакт",
      legal: "Правна информация",
    },
    footer: {
      copyright: "© 2024 People's Republic of Bulgaria — Всички права запазени",
    },
    home: {
      title: "Народна република България — История, Колекция и Студена война",
      description: "Първият многоезичен сайт, посветен на историята на Народна република България (1944–1990). История, милитария, урбекс и комунистическа България.",
      welcomeTitle: "Добре дошли",
      welcomeText: "Добре дошли в първия многоезичен сайт, изцяло посветен на историята на Народна република България.",
      tagline: "Добре дошли в People's Republic of Bulgaria! Този сайт изследва комунистическа България (1944–1990) чрез история, милитария, колекции, урбекс, монтажи и атмосферата на Студената война.",
      notice: "Този сайт е създаден единствено за културни и исторически цели.",
      explore: "Разгледайте",
      latestVideo: "▶ Последно видео",
      watchOnYoutube: "▶ Гледай в YouTube",
      allVideos: "📺 Всички видеа",
      noVideo: "Няма намерено последно видео.",
      instagramTitle: "Instagram",
      instagramText: "Следвайте ни в Instagram за редовни снимки на колекцията, места за урбекс и живот в България.",
      followOnInstagram: "Последвайте в Instagram",
      cards: {
        history: { title: "История", desc: "Хронология на ключови събития от 1944 до 1990 г.", btn: "Открийте" },
        collection: { title: "Колекция", desc: "Предмети, медали, униформи и артефакти.", btn: "Открийте" },
        tourism: { title: "Туризъм", desc: "Места за посещение в България — налични екскурзии с водач.", btn: "Открийте" },
        videos: { title: "Видеа", desc: "Урбекс, влогове, монтажи и презентации.", btn: "Открийте" },
      },
      newsletter: {
        title: "Бюлетин",
        text: "Абонирайте се, за да получавате нови видеа, исторически актуализации, архивни открития и новини от проекта.",
        placeholder: "Вашият имейл",
        consent: "Съгласен/а съм да получавам бюлетина на People's Republic of Bulgaria по имейл и съм прочел/а политиката за поверителност.",
        button: "Абониране",
        subscribing: "Абониране...",
        success: "📩 Проверете имейла си, за да потвърдите абонамента.",
        successHint: "Ако не виждате имейла, проверете папката за спам.",
        error: "Нещо се обърка.",
        errorNetwork: "⚠ Не може да се абонирате в момента.",
      },
    },
    about: {
      title: "За мен — Народна република България",
      description: "Запознайте се със създателя на сайта — французин, страстен по история, живеещ в София и специализиран в комунистическата епоха и Студената война в България.",
    },
    history: {
      title: "История на комунистическа България (1944–1990) — Народна република България",
      description: "Пълна хронология на Народна република България от преврата през 1944 г. до падането на комунизма през 1990 г. Ключови събития, лидери и исторически моменти.",
    },
    collection: {
      title: "Колекция — Милитария, Медали и Униформи от НРБ",
      description: "Фотогалерия на частна колекция от предмети на Народна република България — медали, военни униформи, значки, документи и артефакти от Студената война.",
    },
    tourism: {
      title: "Посети комунистическа България — Туризъм и екскурзии",
      description: "Открийте комунистическото наследство на България. Изоставени паметници, бункери от Студената война и исторически места — налични екскурзии с водач.",
    },
    videos: {
      title: "Видеа — Урбекс, Влогове и комунистическа България",
      description: "Урбекс изследвания, влогове и документални монтажи за комунистическа България, изоставени обекти от Студената война и историята на Народна република България.",
    },
    contact: {
      title: "Контакт — Народна република България",
      description: "Свържете се с екипа на People's Republic of Bulgaria. Въпроси относно колекцията, екскурзиите или сътрудничеството.",
    },
    legal: {
      title: "Правна информация — Народна република България",
      description: "Правна информация и условия за ползване на уебсайта People's Republic of Bulgaria.",
    },
  },
} as const;

export function getLangFromParams(paramsLang?: string): Lang {
  return supportedLangs.includes(paramsLang as Lang) ? (paramsLang as Lang) : "en";
}

export function buildNav(lang: Lang, t: typeof siteContent[Lang]) {
  return [
    { key: "home", href: `/${lang}`, label: t.nav.home },
    { key: "about", href: `/${lang}/about`, label: t.nav.about },
    { key: "history", href: `/${lang}/history`, label: t.nav.history },
    { key: "collection", href: `/${lang}/collection`, label: t.nav.collection },
    { key: "tourism", href: `/${lang}/tourism`, label: t.nav.tourism },
    { key: "videos", href: `/${lang}/videos`, label: t.nav.videos },
  ];
}

export function buildFooter(lang: Lang, t: typeof siteContent[Lang]) {
  return {
    copyright: t.footer.copyright,
    links: [
      { href: `/${lang}/contact`, label: t.nav.contact },
      { href: `/${lang}/about`, label: t.nav.about },
      { href: `/${lang}/legal`, label: t.nav.legal },
    ],
  };
}