# Journal du site PRB

## 18.11.2026 : modernisation de l'habillage (accueil et éléments communs)

Branche `modernisation/accueil`, créée depuis `main` au commit `b604939`. Non fusionnée.

Le site reste le même : pages, navigation, ordre des sections, textes (`site.ts` n'est pas modifié), quatre langues, images et éléments d'identité, polices Oswald et Roboto, et toute la mécanique (façade vidéo, newsletter, protection anti-robots, pages légales).

### Ce qui a changé

- **Système de design** (`src/layouts/MainLayout.astro`) :
  - une échelle d'espacements unique, de 4 à 96 px ;
  - une largeur de contenu de 1160 px ;
  - des fonds neutres : `#111214`, et `#18191c` pour les surfaces ;
  - un seul rouge d'accent, `#C8322A`, de la teinte de l'anneau du logo, éclairci pour rester lisible sur fond sombre ;
  - des angles adoucis (14 px), des ombres légères, et des transitions douces au survol.
- **Rouge d'accent :** il sert pour les boutons et l'onglet actif (texte blanc à 5,3:1), et pour les grands titres de section (3,5:1, conforme AA pour les grands titres).
- **En-tête fixe et sobre :**
  - le petit logo, le nom, le menu et les drapeaux de langue tiennent sur une barre ;
  - l'onglet actif est une pastille rouge pleine, et un filet rouge souligne la barre ;
  - sur téléphone, un menu repliable s'ouvre sous la barre et voile la page ; la touche Échap le ferme.
- **Bandeau d'identité conservé :** image de fond, grand logo, titre, accroche, icônes des réseaux. Son voile est allégé pour que la photo se lise. Sur téléphone, le logo est plus petit et la rangée d'icônes est masquée, puisque les mêmes liens sont dans « Follow us » et dans le pied de page.
- **Pied de page en colonnes :**
  - marque, « Explore » (le menu), « Contact » (les liens existants, la newsletter et le soutien) et « Follow us » ;
  - copyright en bas ;
  - deux colonnes sur téléphone.
- **Boutons :** un style principal (`.btn-red`, pastille rouge pleine) et un style secondaire (`.btn-secondary`, contour), définis une seule fois dans le layout. Les redéfinitions locales de `.btn-red` ont été retirées des pages collection, contact et vidéos.
- **Accueil** (`src/pages/[lang]/index.astro`) :
  - « Welcome » et « Latest video » sont posés directement sur la page, sans boîte ;
  - les 4 cartes d'« Explore » ont le même format d'image (16:9) ;
  - la newsletter est sur deux colonnes sur ordinateur ;
  - les cartes des réseaux passent en une colonne sur petit téléphone.
- **Emojis utilisés comme icônes** (« ▶ », « 📺 », « 📩 », « ⚠ », « ☕ ») : ils sont retirés à l'affichage par `src/lib/text.ts`, sans modifier les textes. Ils sont remplacés par des icônes au trait (lecture, grille, flèche, tasse) ou par rien.
- **Mouvement :**
  - apparition discrète au défilement, en CSS seul (`animation-timeline: view()`) ;
  - elle part d'une opacité de 0,35, pour qu'aucun contenu ne soit jamais caché ;
  - elle est désactivée, comme toutes les transitions, avec `prefers-reduced-motion`.
- **Images de l'accueil :**
  - versions AVIF et WebP des 4 visuels de cartes, en chargement différé (la carte « Histoire » passe de 420 Ko à 10 Ko) ;
  - fond du bandeau en WebP ;
  - icônes des réseaux en WebP de 64 px (celle d'Instagram passe de 248 Ko à 2 Ko).

  Les fichiers d'origine sont conservés, car d'autres pages les utilisent.
- **Débordement horizontal sur téléphone :** corrigé. L'accueil mesurait 417 px de large pour un écran de 390 px.

### Vérifications (build servi en local)

- **Build :** passe.
- **Pages et liens :** les 36 pages répondent 200, et les 117 liens et ressources internes fonctionnent.
- **Débordement :** aucun, à 360, 390, 768 et 1280 px, sur l'accueil, À propos, Vidéos et Contact.
- **Accueil, dans les 4 langues :**
  - contrastes AA sans échec, contre 5 échecs avant ;
  - navigation au clavier complète, avec un contour visible partout ;
  - aucun appel à YouTube ni à Google avant le clic, et le lecteur `youtube-nocookie` se charge au clic.
- **Poids de l'accueil au premier chargement :**
  - téléphone : 272 Ko, contre 1,24 Mo avant ;
  - ordinateur : 486 Ko, dont 255 Ko pour la miniature de la vidéo.
- **Champ piège :** faux succès, sans appel à Resend.
- **Captures avant et après :** `docs/captures/modernisation-accueil/`.

### Revue adverse

Le juge reconnaît le même site au premier regard. Il trouvait la première version propre, mais anonyme : plus de rouge, un voile trop sombre, des sections toutes enfermées dans une boîte, des contenus calés à gauche dans des cadres trop larges, et des icônes de réseaux présentes trois fois.

**Corrigé :**
- retour du rouge (onglet actif plein, titres, filet de 3 px) ;
- voile du bandeau allégé ;
- Bienvenue et Vidéo sorties de leur boîte ;
- newsletter sur deux colonnes ;
- icônes du bandeau masquées sur téléphone, et logo plus petit ;
- pseudos qui ne se coupent plus en milieu de mot ;
- pied de page en deux colonnes sur téléphone ;
- voile sous le menu de téléphone ;
- texte secondaire plus clair.

**Écarté :**
- **Retirer le lien « About » en double dans le pied de page :** ce serait supprimer un lien de navigation existant.
- **Image du bandeau plus nette :** la source ne mesure que 236 × 318 px. Il faudrait une nouvelle image, ce qui sort des règles.

### Reste à faire, hors périmètre de cette étape

Les autres pages gardent leurs propres couleurs dans leur contenu : le rouge `#D62612` en texte, et des gris `#555`, `#666` ou `#888`. Elles ont des échecs de contraste existants : 2 à 14 textes selon la page, minimum 2,5:1. Le nouvel en-tête, le pied de page et les boutons s'y appliquent déjà. Leur contenu sera à harmoniser dans une prochaine étape.

## 18.11.2026 : mise en production de la retouche

La branche `retouche/site-existant` (`7a99306`) a été fusionnée dans `main` avec un commit de fusion, sans fast-forward : `373eb4f`. Le déploiement Vercel de production est terminé. La branche `refonte/page-unique` reste intacte et non fusionnée.

**Retour arrière :**

```
git switch main
git revert -m 1 373eb4f
git push origin main
```

Ou, dans Vercel : Deployments, puis « Instant Rollback » sur le déploiement précédent.

**Vérifications faites sur peoplesrepublicofbulgaria.com :**
1. Le déploiement de production du commit `373eb4f` est terminé, et la production sert bien le nouveau code : nouveau logo présent, formulaire de contact absent.
2. Les 36 pages répondent 200 dans les 4 langues, et la racine redirige (302) vers `/en`.
3. Aucune page en ligne ne contient « SOC TRADE », « EOOD », « ЕООД » ni « ЕИК ».
4. Sur l'accueil, dans les 4 langues, aucun appel à YouTube ni à Google avant le clic. Seul le domaine du site est contacté. La vidéo affichée (`vTan7o8oKE0`) est la plus récente du flux, hors Shorts. Après le clic, seul `youtube-nocookie.com` se charge.
5. `/brand/email-logo-180.png` répond 200.
6. `/api/contact` répond 404, en GET comme en POST.
7. Le champ piège renvoie un faux succès (HTTP 200). L'absence d'appel à Resend ne s'observe pas depuis l'extérieur : elle est garantie par le code et a été vérifiée en local avec interception des appels.
8. Le logo de l'en-tête, le favicon, l'icône iPhone et l'image de partage servis en ligne sont identiques, octet par octet, aux nouveaux fichiers. L'ancien logo renvoie 404.

**Incident pendant la fusion :** le disque C: était plein. Git n'a pas pu écrire trois fichiers et a annulé la première tentative. Après suppression du dossier temporaire de test et réparation des trois fichiers, les contrôles étaient sans erreur : `git status`, `git fsck` et les branches alignées avec GitHub. La fusion a ensuite été faite normalement.

## 18.11.2026 : retouche du site existant

Branche `retouche/site-existant`, créée depuis `main` au commit `c2ca76d`. Le site garde ses pages, sa navigation, ses quatre langues, sa mise en page et ses styles. Aucune redirection vers un autre site.

La branche `refonte/page-unique` (page unique, direction « émission de nuit ») est conservée telle quelle, non fusionnée. Le code de la dernière vidéo en vient.

### Ce qui a changé

1. **Nouveau logo**, tiré de `src/assets/brand/LOGOPRB2026.png`. Le pied de page n'avait pas de logo et n'en a toujours pas.

   | Usage | Fichier | Poids |
   |---|---|---|
   | En-tête (150 px, même taille qu'avant) | `public/brand/logo-160.webp` et `logo-320.webp` | 11 et 29 Ko |
   | Favicon | `public/favicon.ico` et `public/brand/favicon-32.png` | 3 Ko |
   | Icône iPhone | `public/apple-touch-icon.png` | 22 Ko |
   | Image de partage | `public/brand/og-1200x630.jpg` | 65 Ko |
   | Email de confirmation | `public/brand/email-logo-180.png` | 22 Ko |

   Anciens fichiers supprimés, après vérification qu'aucune page ne les utilisait : `png/PRB_logo.png` (2,3 Mo), `png/PRB_logo_email.png`, `png/favicon.ico` (2,3 Mo), `favicon.svg` (2,3 Mo) et `home/og.png` (1,4 Mo).

2. **Mentions légales et confidentialité.** Plus aucune mention de société dans le dépôt : « SOC TRADE », « EOOD », « ЕООД » et « ЕИК » étaient dans `legal.astro` et `privacy.astro`, pour les 4 langues.
   - La page légale est réduite au strict nécessaire : éditeur (Simon Beltran, particulier, Sofia, Bulgarie, avec l'adresse de contact), hébergeur (Vercel), cookies et suivi, lien vers la confidentialité.
   - Sections retirées : directeur de publication, propriété intellectuelle, objet du site, paragraphe d'introduction.
   - La page confidentialité reprend les points validés : éditeur, donnée collectée, finalité, base légale, Resend, traitement hors UE, adresse IP, durée, désinscription, retrait du consentement et réclamation auprès de la КЗЛД / CPDP.
   - Les deux pages sont traduites dans les 4 langues, avec la même mise en page.

3. **Dernière vidéo sur l'accueil.** La section « Latest video » garde sa place, son titre et ses deux boutons.
   - Le lecteur YouTube intégré directement, qui appelait YouTube avant tout clic, est remplacé par une façade : une miniature et un bouton « Play », traduit dans les 4 langues.
   - Le lecteur `youtube-nocookie` ne se charge qu'au clic.
   - La vidéo vient du flux public de la chaîne, sans clé d'API.
   - L'accueil est désormais généré par le serveur, avec un cache de 30 minutes sur le CDN. Une langue inconnue (`/xx`) renvoie 404.
   - La miniature est servie par une nouvelle route, `/api/thumb/[id]`, qui ne sert que les vidéos de la chaîne.

4. **Polices hébergées sur le site.** Oswald 400, 600 et 700 et Roboto 300, 400 et 700 étaient chargées depuis Google Fonts. Elles sont maintenant servies depuis `public/fonts/`, avec exactement les mêmes règles de police (`src/styles/fonts.css`) et leurs licences OFL. L'apparence ne change pas.

5. **Soutien.** Le lien existant du pied de page s'appelle désormais « ☕ Support the channel ». Il n'y a pas de doublon.

6. **Contact.**
   - La page n'a plus de formulaire de message. Elle affiche l'adresse email, les réseaux et le bloc newsletter.
   - La route `/api/contact` est supprimée.
   - Il reste un commentaire qui la mentionne dans `src/lib/antibot.ts`. Je ne l'ai pas modifié, car ce fichier fait partie de la protection anti-robots de la newsletter, à laquelle il ne fallait pas toucher.

7. **Newsletter :** formulaire et protection anti-robots inchangés. Seule l'URL du logo dans l'email a changé.

### Vérifications (build servi en local)

- **Pages :** les 36 pages répondent 200 dans les 4 langues, et la racine redirige vers `/en`.
- **Liens :** les 104 liens et ressources internes fonctionnent.
- **Mentions de société :** aucune dans le site construit (0 fichier pour chacune des quatre).
- **Accueil, dans les 4 langues :** aucun appel à YouTube ni à Google avant le clic. Après le clic, seul `youtube-nocookie.com` se charge.
  - Avant la retouche : 22 requêtes et 5,8 Mo, avec Google Fonts et YouTube.
  - Après : 20 requêtes et 1,24 Mo, tout depuis le domaine du site.
- **Scripts tiers :** 32 pages sur 36 ne contactent aucun domaine externe. Seules les 4 pages Vidéos chargent YouTube. Aucun outil de mesure : la phrase « No tracking tools on this site » est vraie.
- **Champ piège :** faux succès, sans appel à Resend. `/api/contact` répond 404.

### Coût de maintenance de ce qui a été ajouté

- **À chaque nouvelle vidéo : rien.** L'accueil la montre au plus 30 minutes après sa publication. Les Shorts sont ignorés. Si le flux YouTube est indisponible, la page garde la dernière vidéo connue, ou affiche le message habituel « pas de vidéo ».
- **Polices :** rien à faire. Les fichiers sont figés et ne dépendent plus de Google.
- **Aucune dépendance ajoutée.**
- **Seul point de fragilité :** le format du flux YouTube. S'il change, il faudra adapter `src/lib/latest-video.ts`, environ 20 lignes.

### Variables d'environnement (noms seulement)

- **Encore utilisées :**
  - `RESEND_API_KEY`, `NEWSLETTER_CONFIRM_SECRET` et `SITE_URL` (newsletter) ;
  - `YOUTUBE_API_KEY`, `PLAYLIST_URBEX`, `PLAYLIST_EDIT`, `PLAYLIST_UNBOXING`, `PLAYLIST_PRESENTATION` et `PLAYLIST_TOURISM` (page Vidéos).
- **Ne servent plus :**
  - `PLAYLIST_LATEST`, depuis cette retouche, puisque l'accueil lit le flux public ;
  - `PLAYLIST_VLOG`, déjà inutilisée depuis le retrait de la catégorie Vlog.

  Les deux peuvent être supprimées de Vercel.

### Migration vers Cloudflare Pages : ce que changent l'accueil serveur et la route des miniatures

- **Adaptateur :** remplacer `@astrojs/vercel` par `@astrojs/cloudflare`, et activer `nodejs_compat`, nécessaire à la newsletter. Le code de l'accueil (`src/lib/latest-video.ts`, `src/components/VideoFacade.astro`) et la route `/api/thumb` n'utilisent que `fetch`, ils fonctionnent tels quels.
- **Cache de l'accueil :** sur Vercel, le CDN garde l'accueil 30 minutes grâce à l'en-tête `Cache-Control: s-maxage=1800`. Cloudflare Pages ne met pas en cache les pages rendues par une fonction. Chaque visite de l'accueil relira donc le flux YouTube côté serveur, environ 0,3 s de plus, avec un cache en mémoire de 15 minutes quand le serveur reste actif. Pour retrouver le comportement de Vercel, il faut ajouter l'API Cache de Cloudflare, environ 10 lignes.
- **Route des miniatures :** même chose. Sans cache CDN, chaque affichage de la miniature la redemandera à YouTube côté serveur. Le visiteur ne contacte toujours pas YouTube. La même API Cache règle le problème.
- **Pages statiques** (à propos, histoire, collection, etc.) : aucun changement.
- **Variables d'environnement :** les recréer dans Cloudflare en variables de build, car Astro intègre leur valeur au moment du build.
