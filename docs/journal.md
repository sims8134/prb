# Journal du site PRB

## 21.11.2026 : liens vers coldwarbulgaria.com dans la langue de la page (avant fusion)

Branche `parcours/sorties`.

- **Liens selon la langue :** chaque lien vers coldwarbulgaria.com pointe vers `/en`, `/fr`, `/es` ou `/bg` selon la langue de la page, avec la même ancre et les mêmes paramètres utm. Cela concerne les cartes, le pied de page, le bouton de la page à propos et la 404. La page de confirmation, en anglais, pointe vers `/en`.
- **Vérifié sur le build** (secrets factices, appels à Resend interceptés) :
  - 36 pages sur 36 en 200, et 114 liens internes, aucun cassé ;
  - 53 liens différents vers coldwarbulgaria.com, tous en 200, arrivés dans la bonne langue (`<html lang>` et chemin) ;
  - `#timeline`, `#museum` et `#map` amènent leur section en haut de l'écran dans les quatre langues ;
  - textes adaptés (12 pages) et nouveau texte de soutien (29 pages) conformes ;
  - aucun débordement à 360 et 390 px sur histoire, collection, tourisme, la confirmation et la 404.

## 21.11.2026 : parcours visiteur, sorties adaptées par page (branche parcours/sorties)

Branche `parcours/sorties`, créée depuis `main` (`80a09a7`). Non fusionnée. Aucun changement visuel sur les pages existantes : les styles calculés d'une vingtaine d'éléments sont identiques à la production sur vidéos, histoire et contact (bg).

### Ancres de coldwarbulgaria.com (vérifiées le 21.11.2026)

- `#timeline`, `#museum` et `#map` existent sur `/en`, et aussi sur `/fr`, `/es` et `/bg`.
- La racine du domaine redirige toujours vers `/en` (302), quelle que soit la langue du navigateur, en conservant les paramètres utm.
- Les trois cartes adaptées sont donc en place.

### Ce qui a changé

- **Carte « Go deeper » adaptée :** histoire vers `#timeline`, collection vers `#museum`, tourisme vers `#map`, dans les quatre langues. L'accueil, vidéos et contact gardent la carte générale.
- **Carte « Support the channel » :** nouveau texte sur toutes les pages, dans les quatre langues.
- **Page de confirmation de la newsletter :**
  - même adresse (`/api/newsletter/confirm`) et même aspect ;
  - elle devient une page Astro (`confirm.astro` remplace `confirm.ts`) pour afficher les deux cartes compactes sous le message de succès ;
  - logique du jeton et de Resend inchangée ;
  - l'email de confirmation n'est pas modifié (`newsletter.ts` intact).
- **Nouvelle page 404** (`src/pages/404.astro`) : dans la langue de l'adresse, avec un message, un bouton de retour à l'accueil et les deux cartes.
- **Mesure :** tous les liens vers coldwarbulgaria.com portent `utm_source=prb`, `utm_medium=site` et `utm_campaign` égal au nom de la page d'origine. Cela concerne :
  - les cartes ;
  - le lien du pied de page ;
  - le bouton de la page à propos ;
  - la confirmation de la newsletter (`newsletter-confirmation`) et la 404 (`404`).

  Aucun outil de mesure n'est ajouté.
- **CSS commun** (variables, remise à zéro, focus, `.sr-only`, `.icon`, boutons) déplacé tel quel de `MainLayout` vers `src/styles/base.css`, pour être partagé avec la page de confirmation.

### Vérifications sur le build

Sortie Vercel servie en local, avec des secrets factices et les appels à Resend interceptés : aucun contact n'a été créé.

- 36 pages sur 36 en 200, et 114 liens internes, aucun cassé.
- 14 liens différents vers coldwarbulgaria.com : tous en 200, paramètres conservés après la redirection vers `/en`, et `#timeline`, `#museum`, `#map` amènent bien leur section en haut de l'écran.
- Aucun débordement à 360 et 390 px sur histoire, collection, tourisme (en et bg), la confirmation et la 404 (en et fr).
- Aucun appel externe avant un clic sur ces pages et sur l'accueil.
- 404 en 404 pour `/en/…`, `/fr/…`, `/bg/…` et `/de`, avec les cartes une fois. Jeton invalide sur la confirmation : 400.

## 21.11.2026 : mise en production de accueil/ordre-sections (fusion 2f6536a)

`accueil/ordre-sections` (`bea8e83`) est fusionnée dans `main` avec un commit de fusion sans fast-forward, `2f6536a`. Vercel indique « Deployment has completed » pour ce commit. `refonte/page-unique` reste intacte et non fusionnée.

Vérifié sur peoplesrepublicofbulgaria.com :
- 36 pages sur 36 en 200, et 112 liens et ressources internes, aucun cassé.
- Accueil : bandeau, vidéo, puis les deux cartes, Explore, Newsletter, Follow us. Le bloc « Welcome » a disparu.
- Barre de progression à 0, 50 et 100 % sur l'accueil et sur histoire, en natif, avec « moins d'animations » et avec le repli par script.
- Survols :
  - contour rouge sur les onglets, les icônes du bandeau et du pied de page, « Follow us » et les cartes ;
  - liens du pied de page en `#E5554A` (5,3:1) ;
  - « Buy me a coffee » en rouge plein (5,3:1).
- Pied de page : mention culturelle et copyright avec l'année en cours sur les 36 pages, sans « About » en double. Pas de crédit SBC Conception (non ajouté, voir plus bas).
- Aucun débordement à 360 et 390 px sur l'accueil, vidéos, collection et contact.
- Accueil : aucun appel externe avant un clic ; lecteur `youtube-nocookie` au clic.
- Champ piège : `{"success":true}`, HTTP 200.
- Aucune page ne contient « SOC TRADE », « EOOD », « ЕООД » ni « ЕИК ».

Retour en arrière : `git revert -m 1 2f6536a` puis `git push origin main`.

## 21.11.2026 : barre de progression, survols rouges, cartes identiques, pied de page

Branche `accueil/ordre-sections`, à la suite du commit `5767ee0`. L'ordre des sections et le retrait du bloc « Welcome » étaient déjà faits ; je ne les ai pas refaits.

### Ce qui a changé

- **Barre de progression de lecture :**
  - le filet rouge sous l'en-tête se remplit de gauche à droite avec le défilement, sur toutes les pages ;
  - animation CSS liée au défilement (`animation-timeline: scroll(root block)`, sur `transform` seulement), avec un repli de quelques lignes de script (`--progress`, limité à une mise à jour par image) ;
  - elle reste active quand le visiteur demande moins d'animations.
- **Menu :** au survol et au focus clavier, un onglet prend un contour rouge de 2 px. L'onglet actif reste rouge plein, et « Support » garde son survol.
- **Icônes des réseaux :** contour rouge au survol et au focus, dans le bandeau et dans le pied de page. Dans « Follow us », c'était déjà le cas.
- **Cartes « Go deeper » et « Support the channel » :**
  - la barre rouge permanente et l'icône teintée sont retirées : au repos, les deux cartes sont identiques ;
  - contour rouge au survol et au focus (déjà en place) ;
  - « Buy me a coffee » passe en bouton principal rouge plein, sur l'accueil comme dans la version compacte.
- **Pied de page :**
  - liens en rouge au survol et au focus clavier, avec une transition douce ;
  - le rouge d'accent `#C8322A` ne donnait que 3,6:1 sur le fond du pied de page : il est éclairci en `#E5554A`, soit 5,3:1 ;
  - lien « About » en double retiré de la colonne Contact ;
  - nouvelle ligne de copyright, « © {année} People's Republic of Bulgaria. All rights reserved. », dans les quatre langues, sans tiret long. L'année est calculée au build, puis mise à jour dans le navigateur.
- **Crédit SBC Conception non ajouté :** sbcconception.com mentionne « SOC TRADE » sur sa page d'accueil, et « SOC TRADE BULGARIA EOOD » dans `privacy.html`.

### Vérification 1 (sortie Vercel du build servie en local)

- 36 pages sur 36 en 200, et 112 liens et ressources internes, aucun cassé.
- Barre de progression à 0, 50 et 100 % en haut, au milieu et en bas, sur l'accueil et sur histoire, dans trois cas :
  - Chrome ;
  - Chrome avec « moins d'animations » ;
  - un navigateur sans animations liées au défilement, simulé (repli par script).
- Vidéo sur téléphone (390 × 844 px), sans défiler : titre à 483 px, vidéo de 533 à 735 px.
- Aucun débordement à 360, 390, 768 et 1280 px sur l'accueil et sur histoire, pied de page compris.
- Contrastes : liens du pied de page au survol 5,3:1 ; « Buy me a coffee » 5,3:1. Contour de focus visible sur tous les éléments modifiés.
- Copyright avec l'année en cours dans les quatre langues.
- Aucun appel externe avant un clic ; lecteur `youtube-nocookie` au clic.

## 21.11.2026 : nouvel ordre des sections de l'accueil

Branche `accueil/ordre-sections`, créée depuis `main` (`cc2722b`). Non fusionnée.

### Ce qui a changé

- **Accueil, dans les quatre langues :** bandeau d'identité, dernière vidéo avec ses deux boutons, les deux cartes « Go deeper » et « Support the channel », Explore, Newsletter, Follow us.
- **Bloc « Welcome » supprimé de l'accueil :** son titre et sa phrase répétaient le bandeau. Ses règles CSS, devenues inutiles, sont retirées.
- **Mention « This website has been created for cultural and historical purposes only. »** dans le pied de page de toutes les pages, juste au-dessus du copyright, dans sa traduction existante (`t.home.notice`). Aucun texte ni style modifié.

### Vérifications sur le build (sortie Vercel servie en local)

- 36 pages sur 36 en 200. La mention figure dans le pied de page des 36 pages. Histoire et collection, en anglais et en français, la contenaient déjà dans leur propre contenu.
- Ordre identique dans les quatre langues, à 390 et 1280 px.
- Écarts entre sections : 64 px partout, une fois les animations d'apparition terminées.
- Téléphone, 390 × 844 px, sans défiler :
  - le titre « Latest video » est à 483 px du haut de l'écran ;
  - la vidéo occupe la plage de 533 à 735 px ;
  - elle est donc entièrement visible au premier écran.
- Aucun débordement à 360, 390, 768 et 1280 px sur l'accueil.
- Aucun appel externe avant un clic ; le lecteur `youtube-nocookie` se lance au clic.
- Captures dans `docs/captures/ordre-sections/`.

## 21.11.2026 : mise en production de la modernisation (fusion 75bb4ce)

`modernisation/accueil` (`1f10ee5`) est fusionnée dans `main` avec un commit de fusion sans fast-forward, `75bb4ce`. Vercel indique « Deployment has completed » pour ce commit. `refonte/page-unique` reste intacte et non fusionnée.

Vérifié sur peoplesrepublicofbulgaria.com :
- 36 pages sur 36 en 200 dans les quatre langues.
- Les deux cartes sont en ligne sur l'accueil et en bas de la page histoire, avec les liens vers coldwarbulgaria.com et buymeacoffee.com/peoplesrepublicofbulgaria. Le composant est présent sur les 24 pages prévues et absent des pages à propos, légale et confidentialité.
- Le bouton « Support » de l'en-tête mène au bon lien. Le menu de téléphone s'ouvre et se ferme, au bouton et avec Échap.
- Au survol et au focus clavier, le bouton secondaire passe au rouge `#C8322A` et le bouton principal au rouge foncé `#A3271F`. La bordure des cartes passe au rouge, sans décalage de la mise en page.
- Aucun débordement à 360 et 390 px sur l'accueil, vidéos, collection et contact, ni sur l'accueil et histoire à 768 et 1280 px.
- Accueil : aucun appel externe avant un clic, et le lecteur `youtube-nocookie` se charge au clic.
- Champ piège : `{"success":true}`, HTTP 200, avec l'en-tête Origin du site. Sans cet en-tête, l'API répond 403, comme prévu.
- Aucune page ne contient « SOC TRADE », « EOOD », « ЕООД » ni « ЕИК ».

Retour en arrière : `git revert -m 1 75bb4ce` puis `git push origin main`.

## 21.11.2026 : survols rouges et retrait du composant sur la page à propos (avant fusion)

Branche `modernisation/accueil`.

- **Boutons, partout :**
  - au survol et au focus clavier, le bouton secondaire (dont « Support » et « Buy me a coffee ») se remplit du rouge d'accent `#C8322A`, texte blanc : contraste 5,3:1 ;
  - le bouton principal passe au rouge foncé `#A3271F`, texte blanc : 7,3:1 ;
  - aucune teinte n'a eu besoin d'être ajustée ;
  - le bouton « playlist » de la page vidéos (`.btn-outline`) suit la même règle ;
  - les transitions sont désactivées si le visiteur demande moins d'animations (règle globale existante).
- **Cartes, partout :** bordure rouge d'accent au survol et au focus clavier, sans changement d'épaisseur. Cela concerne les cartes de l'accueil et des réseaux, les deux cartes de sortie, les miniatures de la page vidéos, les photos de collection et de tourisme, et les cartes de la page contact.
- **Page à propos :** le composant des deux cartes est retiré dans les quatre langues, car son contenu a déjà ces deux sorties.
- **Non modifiés :** les boutons propres au contenu de la page à propos (jaune Buy Me a Coffee, lien Cold War Bulgaria), le bouton blanc d'abonnement et les onglets de la page vidéos.
- **Vérifié sur le build** (sortie Vercel servie en local, pas le serveur de développement) :
  - 36 pages sur 36 en 200 ;
  - composant présent une fois sur l'accueil, histoire, collection, tourisme, vidéos et contact dans les quatre langues, absent d'à propos, légale et confidentialité ;
  - aucun débordement à 360, 390, 768 et 1280 px sur l'accueil et histoire ;
  - survol et focus clavier conformes, sans décalage de la mise en page.

## 19.11.2026 : deux points de sortie « Et ensuite » (Cold War Bulgaria et Buy Me a Coffee)

Toujours sur la branche `modernisation/accueil`, non fusionnée.

### Ce qui a changé

- **Composant partagé** `src/components/NextSteps.astro`, défini une seule fois :
  - deux cartes, « Go deeper » (bouton principal vers coldwarbulgaria.com) et « Support the channel » (bouton secondaire vers Buy Me a Coffee) ;
  - côte à côte sur ordinateur, empilées sous 760 px, dans le style des cartes existantes ;
  - liens ouverts dans un nouvel onglet, annoncés aux lecteurs d'écran ;
  - textes des quatre langues dans `src/data/next-steps.ts`, avec les deux adresses.
- **Emplacements :**
  - accueil : juste après la section vidéo, une seule fois ;
  - à propos, histoire, collection, tourisme, vidéos, contact : version compacte, en bas, juste avant le pied de page (ajoutée par `MainLayout`) ;
  - pages légale et confidentialité : absent.
- **En-tête :**
  - bouton « Support » en style secondaire (contour, texte atténué), à droite du menu sur ordinateur, en dernier élément du menu sur téléphone ;
  - pour que tout tienne sur une ligne dans les quatre langues, le nom passe sur deux lignes à partir de 1024 px (« People's Republic / Of Bulgaria »), et le menu repliable s'applique jusqu'à 1023 px au lieu de 960 px ;
  - entre 1024 et 1180 px, espacements du menu resserrés.
- **Pied de page :** le lien « Cold War Bulgaria » est ajouté. Le lien Buy Me a Coffee existait déjà ; son libellé est désormais traduit (titre de la deuxième carte).
- Aucune fenêtre surgissante, aucun bandeau collant, aucune dépendance ajoutée.

### Vérifications

- Build réussi, 36 pages sur 36 en 200.
- Composant présent une fois sur chaque page de contenu dans les quatre langues (28 pages), absent des 8 pages légale et confidentialité ; sur l'accueil, placé juste après la vidéo.
- Aucun débordement à 360, 390, 768 et 1280 px sur l'accueil, à propos, histoire, contact et vidéos.
- En-tête sur une ligne, sans nom tronqué ni libellé coupé, à 1280, 1100 et 1024 px, dans les quatre langues.
- Contrastes des nouveaux éléments : aucun échec, minimum 5,3:1.
- Clavier : les nouveaux liens sont atteints dans l'ordre, avec un contour visible.
- Aucun appel externe avant un clic sur les pages de contenu, sauf la page vidéos, dont les lecteurs YouTube intégrés existaient déjà (contenu de page, non modifié).
- Captures dans `docs/captures/sorties/`.

### À noter

- La page à propos contient déjà, dans son propre contenu, un bloc Cold War Bulgaria et un bloc « Support the project ». Le composant compact s'y ajoute en bas, comme demandé : les deux sorties y figurent donc deux fois.

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
