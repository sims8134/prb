import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_gDD7yykU.mjs';
import { manifest } from './manifest_RD7NiPx8.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/api/newsletter/confirm.astro.mjs');
const _page4 = () => import('./pages/api/newsletter.astro.mjs');
const _page5 = () => import('./pages/collection.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/history.astro.mjs');
const _page8 = () => import('./pages/legal.astro.mjs');
const _page9 = () => import('./pages/tourism.astro.mjs');
const _page10 = () => import('./pages/video.astro.mjs');
const _page11 = () => import('./pages/_lang_/about.astro.mjs');
const _page12 = () => import('./pages/_lang_/collection.astro.mjs');
const _page13 = () => import('./pages/_lang_/contact.astro.mjs');
const _page14 = () => import('./pages/_lang_/history.astro.mjs');
const _page15 = () => import('./pages/_lang_/legal.astro.mjs');
const _page16 = () => import('./pages/_lang_/tourism.astro.mjs');
const _page17 = () => import('./pages/_lang_/videos.astro.mjs');
const _page18 = () => import('./pages/_lang_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/api/newsletter/confirm.ts", _page3],
    ["src/pages/api/newsletter.ts", _page4],
    ["src/pages/collection.astro", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/history.astro", _page7],
    ["src/pages/legal.astro", _page8],
    ["src/pages/tourism.astro", _page9],
    ["src/pages/video.astro", _page10],
    ["src/pages/[lang]/about.astro", _page11],
    ["src/pages/[lang]/collection.astro", _page12],
    ["src/pages/[lang]/contact.astro", _page13],
    ["src/pages/[lang]/history.astro", _page14],
    ["src/pages/[lang]/legal.astro", _page15],
    ["src/pages/[lang]/tourism.astro", _page16],
    ["src/pages/[lang]/videos.astro", _page17],
    ["src/pages/[lang]/index.astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "89020391-7491-4ab4-8a7f-86bf84d4fa81",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
