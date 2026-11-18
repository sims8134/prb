# Journal du site PRB

## 18.11.2026 (soir) : direction artistique « émission de nuit »

La première version de la page unique a été rejetée : correcte mais sans vie, une colonne de texte sur fond crème. Trois prototypes ont été construits puis jugés :
- A, émission de nuit ;
- B, planche contact ;
- C, affiche.

La direction retenue assemble les trois. A sert de base pour toute la page, la pellicule vient de B et les lettres remplies par une photo viennent de C. Les prototypes ont ensuite été supprimés.

### Ce qui a changé

- **Thème sombre partout :** fond bordeaux presque noir, texte crème, or pour les numéros et les étiquettes. Le liseré vert et rouge reste fin (6 px). Le thème s'applique à la page d'accueil, à Legal notice & privacy, à la 404, à la page de confirmation et à l'email de confirmation.
- **Premier écran :**
  - le logo posé comme un sceau, immobile ;
  - le nom en très grand et la phrase d'accroche ;
  - la dernière vidéo, jouable sur place avec un grand bouton « Play », son titre et sa date en chiffres romains ;
  - le bouton « Subscribe on YouTube ».

  Sur un téléphone de 664 px de haut, le bouton finit à 658 px. Comme il n'y a pas encore d'images extraites des vidéos (voir plus bas), c'est la miniature de la dernière vidéo qui porte l'image du premier écran, sur un fond sombre uni.
- **№ 02, « More from the channel » :** une pellicule de tirages numérotés à partir de 02, avec leur date en chiffres romains. Elle montre les 6 à 8 vidéos précédentes, lues dans le même flux public, sans les Shorts. Chaque tirage ouvre la vidéo sur YouTube dans un nouvel onglet. Elle défile au doigt sur téléphone et s'affiche en grille sur ordinateur.
- **№ 03 « The story behind » :** le lien vers Cold War Bulgaria. Il est suivi de la ligne de soutien, non numérotée.
- **№ 04, la newsletter :** le titre « Newsletter » est un vrai texte, rempli par une bande de cinq objets de la collection (radio, téléphone noir, téléphone vert à cadran, lampes torches, boîte de bobine) qui défile lentement.
  - Les cadrages évitent tout symbole politique (buste, étoiles, emblème).
  - La photo est légèrement éclaircie pour rester lisible sur le fond sombre : le pixel le plus sombre atteint 3,16:1 (seuil de 3:1 pour un gros titre), et la médiane 9,3:1.
  - Elle ne se charge qu'à l'approche de la section.
- **Nouvelle route `/api/thumb/[id]` :** elle sert les miniatures des vidéos depuis le domaine du site. Le navigateur du visiteur n'appelle donc jamais YouTube avant un clic.
  - Elle ne sert que les vidéos présentes dans le flux de la chaîne : ce n'est pas un relais ouvert.
  - Elle sert le WebP quand YouTube en fournit un, sinon le JPEG.
  - Elle refuse tout fichier de plus de 350 Ko.
  - Le cache est d'un jour dans le navigateur et d'une semaine sur le CDN.
- **Titres YouTube :** les tirets longs y sont remplacés à l'affichage, par exemple « Peoples Republic of Bulgaria: 9 IX 1944 ».
- **Supprimé :** les routes `/proto/a`, `/proto/b` et `/proto/c`, et leurs photos. Il ne reste dans `public/photos` que la bande de la collection (4 fichiers, 12 à 48 Ko).

### Poids et vérifications (build final, servi en local)

- **Premier chargement :** 439 Ko sur téléphone (12 requêtes) et 446 Ko sur ordinateur (14 requêtes). La miniature principale en fait 256 Ko à elle seule.
- **Avant le clic :** aucun appel à YouTube ni à Google. Après le clic, seul `youtube-nocookie.com` est chargé.
- **Contrastes AA :** 51 textes vérifiés, aucun échec, minimum 6,96:1.
- **Clavier :** 19 éléments dans l'ordre logique, avec un contour visible partout.
- **Redirections :** 88 sur 88. Le champ piège ne déclenche aucun envoi.

### Revue adverse : ce qui a été corrigé ou écarté

**Corrigé :**
- Sur ordinateur, la légende de la vidéo est alignée en haut, et le sceau est revenu à côté du nom.
- Le bouton de lecture est agrandi, avec la date « On air » en chiffres romains.
- La pellicule s'affiche en 3 + 3 sur ordinateur, sans case vide.
- Les titres de la pellicule tiennent sur trois lignes.
- Une photo de la radio illustre « The story behind ».
- La bande des lettres a des couleurs plus vraies.
- La case à cocher est crème.
- Les réseaux sociaux tiennent en une ligne discrète, et le pied de page est signé d'un petit sceau.

**Écarté :**
- **Bouton de lecture centré :** il masquerait le titre de la miniature, qui est ce qui donne envie de cliquer.
- **« Sign me up » en bouton plein :** l'abonnement YouTube doit rester la seule action principale de la page.
- **Titres « S 75 » et « Part (2/2) » :** ils viennent de YouTube et se corrigent dans YouTube Studio. Le site ne retouche que les tirets longs.

### Coût de maintenance

**À chaque nouvelle vidéo : toujours rien.** La dernière vidéo et la pellicule se mettent à jour seules depuis le flux, au plus 30 minutes après la publication. Si un jour il y a beaucoup plus de Shorts que de vidéos, la pellicule raccourcit d'elle-même, puisque le flux ne contient que les 15 dernières publications.

**Images d'urbex pour le premier écran :** le dossier `src/assets/urbex/` n'existe pas encore. Le jour où vous y déposez des images extraites de vos vidéos, il faudra brancher l'une d'elles en fond du premier écran : environ 15 lignes dans `index.astro`, et une image de 150 à 250 Ko en AVIF.

**Migration vers Cloudflare :** en plus des points déjà listés plus bas, la route `/api/thumb` n'y sera pas mise en cache automatiquement. Chaque affichage d'une miniature interrogera alors YouTube côté serveur, ce qui ralentit un peu la page sans rien casser. Pour l'éviter, on peut ajouter l'API Cache de Cloudflare, environ 10 lignes.

**Aucune dépendance ajoutée.** Les photos ont été préparées avec `sharp`, déjà installé avec Astro.

## 18.11.2026 : refonte en page unique

Branche `refonte/page-unique`, créée depuis `main` au commit `c2ca76d`.

### Ce qui a changé

- **Une seule page, en anglais, à la racine (`/`)**, conçue pour le téléphone d'abord. Dans l'ordre :
  - le logo, le nom de la chaîne et sa phrase ;
  - № 01, la dernière vidéo, avec le bouton « Subscribe on YouTube », seule action principale ;
  - № 02, les liens « Go deeper: Cold War Bulgaria » et « Support the channel » ;
  - № 03, la newsletter ;
  - les liens Instagram, Facebook et TikTok ;
  - le pied de page (mailto et « Legal notice & privacy »).
- **`/privacy` : « Legal notice & privacy »**, une ligne par point, environ un écran et demi sur téléphone :
  - éditeur, hébergeur, donnée collectée, finalité ;
  - base légale (consentement), prestataire (Resend), traitement hors de l'UE (Resend et Vercel), adresse IP ;
  - durée, désinscription et accès par email, retrait du consentement, réclamation auprès de la КЗЛД / CPDP, cookies.
- **Une page 404** aux couleurs du site, qui renvoie vers la dernière vidéo.
- **Supprimé :**
  - les 9 pages en 4 langues ;
  - l'offre de visites guidées ;
  - le formulaire de contact et sa route `/api/contact` ;
  - le layout, les données de traduction, le client de l'API YouTube ;
  - environ 213 Mo d'images (collection, tourisme, histoire, accueil, drapeaux, anciens logos).

  Tout reste récupérable dans l'historique Git.
- **Gardé :** `/api/newsletter` et `/api/newsletter/confirm`, avec toute la protection anti-robots (champ piège, durée de 3 s, limite par IP, adresses jetables). L'email de confirmation et la page de confirmation reprennent maintenant la palette et le nouveau logo.
- **Confirmation en deux temps.** Le lien de l'email ouvre une page avec un bouton « Confirm my subscription ». Seul le clic sur ce bouton enregistre l'adresse chez Resend. Avant, la simple ouverture du lien suffisait, et les scanners de liens (Outlook, antivirus) inscrivaient des adresses à la place des gens.
  - La page de succès propose « Subscribe on YouTube ».
  - La page d'échec propose « Sign up again ».
- **Objet de l'email :** « PRB newsletter: one tap to confirm ». La réponse d'erreur du serveur n'expose plus le message technique interne.
- **Lecture de l'adresse IP plus robuste.** `clientAddress` n'est lu qu'en dernier recours, protégé par un `try`. Avant, une absence d'IP faisait échouer la route avec une erreur 500.
- **Mentions de société retirées.** « SOC TRADE BULGARIA EOOD », le numéro ЕИК, le capital et l'adresse postale figuraient dans :
  - `src/pages/[lang]/legal.astro`, lignes 27, 54, 81 et 108 ;
  - `src/pages/[lang]/privacy.astro`, lignes 24, 46, 68 et 90.

  Ces deux fichiers sont supprimés. Les mentions restent dans l'historique Git et sur le site en ligne tant que cette branche n'est pas fusionnée.
- **Nouveau logo**, tiré de `src/assets/brand/LOGOPRB2026.png` (source, non publiée) :

  | Usage | Fichier | Poids |
  |---|---|---|
  | Page, 1x | `logo-160.webp` | 11 Ko |
  | Page, 2x | `logo-320.webp` | 29 Ko |
  | Favicon | `favicon.ico` et `favicon-32.png` | 3 Ko |
  | Icône iPhone | `apple-touch-icon.png` | 22 Ko |
  | Image de partage | `og-1200x630.jpg` | 65 Ko |
  | Email | `email-logo-180.png` | 22 Ko |

- **Polices hébergées sur le site**, sans Google Fonts :
  - Oswald 600 (12 Ko), plus un fichier de 1 Ko pour le seul signe « № » ;
  - Source Serif 4 regular (20 Ko).

  Les deux sont sous licence SIL Open Font License 1.1, qui autorise l'usage web.
- **Redirections 301** de toutes les anciennes adresses : voir plus bas.
- **Aucune dépendance ajoutée.** Les images ont été générées avec `sharp`, déjà installé avec Astro.

### Coût de maintenance

**À chaque nouvelle vidéo : rien.**
- La page lit le flux public de la chaîne (`youtube.com/feeds/videos.xml?channel_id=UCoqg7QUUHZJUG-r3oH1B1Sg`), sans clé d'API.
- La nouvelle vidéo apparaît au plus tard 30 minutes après sa publication, le temps que le cache du CDN expire.
- Les Shorts sont ignorés volontairement : un format vertical n'a pas sa place dans le lecteur 16:9. Si vous publiez seulement un Short, la page continue d'afficher la dernière vidéo classique.

**Si le flux YouTube tombe :**
- La page affiche la dernière vidéo connue tant que le serveur l'a en mémoire.
- Sinon, elle affiche un simple lien vers la chaîne. Rien ne casse.

**Variables d'environnement à nettoyer sur Vercel**, facultatif : `YOUTUBE_API_KEY` et les `PLAYLIST_*` ne sont plus lues. À garder : `RESEND_API_KEY`, `NEWSLETTER_CONFIRM_SECRET`, `SITE_URL`.

**Coût par visite :**
- Sur Vercel, une lecture du flux toutes les 30 minutes au plus, grâce au cache du CDN (`s-maxage=1800`), plus une lecture par instance de serveur au démarrage.
- Les Shorts et le format du flux sont la seule dépendance externe. Si YouTube change ce format un jour, il faudra adapter `src/lib/latest-video.ts`, environ 20 lignes.

### Migration vers Cloudflare Pages (prévue en décembre)

**Ce qu'il faudra adapter ce jour-là :**
1. **Adaptateur :** remplacer `@astrojs/vercel` par `@astrojs/cloudflare` dans `package.json` et `astro.config.mjs`. C'est une dépendance remplacée par une autre : même coût de maintenance, une mise à jour de temps en temps avec Astro.
2. **Compatibilité Node :** activer le drapeau `nodejs_compat` dans le projet Cloudflare. La route newsletter utilise `node:crypto` et `Buffer` pour signer le lien de confirmation.
3. **Variables d'environnement :** recréer `RESEND_API_KEY`, `NEWSLETTER_CONFIRM_SECRET` et `SITE_URL` dans Cloudflare, en variables de build. Astro intègre leur valeur au moment du build.
4. **Redirections :** Astro génère normalement un fichier `_redirects` à partir de la même configuration. Si ce n'est pas le cas, copier le bloc ci-dessous dans `public/_redirects`. L'intégration `prb-trailing-slash-redirects` de `astro.config.mjs` ne fait plus rien hors de Vercel et peut être supprimée.
5. **Dernière vidéo :** le code (`src/lib/latest-video.ts`) n'utilise que `fetch` et `btoa`, et fonctionne tel quel sur Cloudflare. Une différence : Cloudflare ne met pas en cache les pages rendues par une fonction, même avec l'en-tête `Cache-Control`. Chaque visite lira donc le flux YouTube, ce qui ajoute environ 0,3 s. Le cache en mémoire de 15 minutes limite les appels quand le serveur reste actif. Pour aller plus loin, on peut ajouter l'API Cache de Cloudflare, environ 10 lignes.
6. **Limite par IP de la newsletter :** elle reste « au mieux », comme sur Vercel, car le compteur vit en mémoire.

**Coût de maintenance comparé :**

| | Vercel | Cloudflare Pages |
|---|---|---|
| Nouvelle vidéo | rien | rien |
| Lectures du flux YouTube | 1 toutes les 30 min au plus | 1 par visite, ou toutes les 15 min si le serveur reste actif |
| Dépendances | `astro`, `@astrojs/vercel`, `@astrojs/sitemap`, `resend` | les mêmes, avec `@astrojs/cloudflare` à la place de `@astrojs/vercel` |
| Travail ponctuel | aucun | la migration ci-dessus, environ une heure |

### Redirections

**Table validée le 18.11.2026.** Les accueils, les pages vidéos et les pages contact vont vers `/`. Les mentions légales et la confidentialité vont vers `/privacy`. Les autres pages vont vers la section de Cold War Bulgaria la plus proche, dans la même langue :

| Ancienne page | Cible |
|---|---|
| about | `/{langue}/about` |
| history | `#timeline` |
| collection | `#museum` |
| tourism | `#map` |

Les anciennes adresses sans langue vont vers les mêmes cibles en anglais.

**Mécanisme sur Vercel :** `redirects` dans `astro.config.mjs`, converti par l'adaptateur en règles 301 dans `.vercel/output/config.json`. Une petite intégration rend la barre finale facultative, car l'ancien sitemap utilisait `/en/about/`.

**Équivalent Cloudflare Pages** (`public/_redirects`, 88 lignes, sous la limite de 2 000) :

```
/en / 301
/en/ / 301
/en/about https://coldwarbulgaria.com/en/about 301
/en/about/ https://coldwarbulgaria.com/en/about 301
/en/history https://coldwarbulgaria.com/en#timeline 301
/en/history/ https://coldwarbulgaria.com/en#timeline 301
/en/collection https://coldwarbulgaria.com/en#museum 301
/en/collection/ https://coldwarbulgaria.com/en#museum 301
/en/tourism https://coldwarbulgaria.com/en#map 301
/en/tourism/ https://coldwarbulgaria.com/en#map 301
/en/videos / 301
/en/videos/ / 301
/en/contact / 301
/en/contact/ / 301
/en/legal /privacy 301
/en/legal/ /privacy 301
/en/privacy /privacy 301
/en/privacy/ /privacy 301
/fr / 301
/fr/ / 301
/fr/about https://coldwarbulgaria.com/fr/about 301
/fr/about/ https://coldwarbulgaria.com/fr/about 301
/fr/history https://coldwarbulgaria.com/fr#timeline 301
/fr/history/ https://coldwarbulgaria.com/fr#timeline 301
/fr/collection https://coldwarbulgaria.com/fr#museum 301
/fr/collection/ https://coldwarbulgaria.com/fr#museum 301
/fr/tourism https://coldwarbulgaria.com/fr#map 301
/fr/tourism/ https://coldwarbulgaria.com/fr#map 301
/fr/videos / 301
/fr/videos/ / 301
/fr/contact / 301
/fr/contact/ / 301
/fr/legal /privacy 301
/fr/legal/ /privacy 301
/fr/privacy /privacy 301
/fr/privacy/ /privacy 301
/es / 301
/es/ / 301
/es/about https://coldwarbulgaria.com/es/about 301
/es/about/ https://coldwarbulgaria.com/es/about 301
/es/history https://coldwarbulgaria.com/es#timeline 301
/es/history/ https://coldwarbulgaria.com/es#timeline 301
/es/collection https://coldwarbulgaria.com/es#museum 301
/es/collection/ https://coldwarbulgaria.com/es#museum 301
/es/tourism https://coldwarbulgaria.com/es#map 301
/es/tourism/ https://coldwarbulgaria.com/es#map 301
/es/videos / 301
/es/videos/ / 301
/es/contact / 301
/es/contact/ / 301
/es/legal /privacy 301
/es/legal/ /privacy 301
/es/privacy /privacy 301
/es/privacy/ /privacy 301
/bg / 301
/bg/ / 301
/bg/about https://coldwarbulgaria.com/bg/about 301
/bg/about/ https://coldwarbulgaria.com/bg/about 301
/bg/history https://coldwarbulgaria.com/bg#timeline 301
/bg/history/ https://coldwarbulgaria.com/bg#timeline 301
/bg/collection https://coldwarbulgaria.com/bg#museum 301
/bg/collection/ https://coldwarbulgaria.com/bg#museum 301
/bg/tourism https://coldwarbulgaria.com/bg#map 301
/bg/tourism/ https://coldwarbulgaria.com/bg#map 301
/bg/videos / 301
/bg/videos/ / 301
/bg/contact / 301
/bg/contact/ / 301
/bg/legal /privacy 301
/bg/legal/ /privacy 301
/bg/privacy /privacy 301
/bg/privacy/ /privacy 301
/about https://coldwarbulgaria.com/en/about 301
/about/ https://coldwarbulgaria.com/en/about 301
/history https://coldwarbulgaria.com/en#timeline 301
/history/ https://coldwarbulgaria.com/en#timeline 301
/collection https://coldwarbulgaria.com/en#museum 301
/collection/ https://coldwarbulgaria.com/en#museum 301
/tourism https://coldwarbulgaria.com/en#map 301
/tourism/ https://coldwarbulgaria.com/en#map 301
/video / 301
/video/ / 301
/videos / 301
/videos/ / 301
/contact / 301
/contact/ / 301
/legal /privacy 301
/legal/ /privacy 301
```

À vérifier après la migration : que Cloudflare conserve bien les ancres (`#timeline`…) dans l'en-tête `Location`. Je n'ai pas pu le tester sans le projet Cloudflare.

### Remplacer la newsletter par un formulaire Brevo

Le formulaire est isolé dans `src/components/NewsletterForm.astro`. La page ne contient que `<NewsletterForm />` à la section № 03.

1. Dans Brevo, créez une liste « PRB newsletter » et un modèle de double confirmation (double opt-in), avec comme page de redirection `https://peoplesrepublicofbulgaria.com/api/newsletter/confirm`, ou une page de remerciement.
2. Exportez les contacts actuels depuis Resend (Audience, puis Export CSV) et importez-les dans la liste Brevo.
3. Choisissez l'une des deux voies :
   - **Formulaire intégré Brevo** : remplacez le contenu de `NewsletterForm.astro` par le formulaire HTML fourni par Brevo, sans son CSS ni ses scripts de suivi, en gardant les classes et les styles actuels du composant. Les routes `/api/newsletter` et `/api/newsletter/confirm` deviennent inutiles et peuvent être supprimées.
   - **API Brevo**, pour garder la protection anti-robots du serveur : gardez le composant tel quel. Dans `src/pages/api/newsletter.ts`, remplacez l'envoi Resend par un appel `POST https://api.brevo.com/v3/contacts/doubleOptinConfirmation` (liste, modèle, URL de redirection). Ajoutez `BREVO_API_KEY`, `BREVO_LIST_ID` et `BREVO_DOI_TEMPLATE_ID` aux variables d'environnement. `confirm.ts` devient une simple page de remerciement.
4. Mettez à jour `src/pages/privacy.astro` : « Who handles it » devient Brevo à la place de Resend.
5. Vérifiez avec une vraie inscription, puis avec le champ piège rempli : aucun email ne doit partir dans le second cas.

### Retour arrière

Avant fusion, rien à faire : main n'a pas changé.

Après fusion dans main :

```
git switch main
git revert -m 1 <commit de fusion>
git push origin main
```

Ou, dans Vercel : Deployments, puis « Instant Rollback » sur le déploiement précédent.
