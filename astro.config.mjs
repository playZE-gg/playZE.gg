import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import lunariaStarlight from '@lunariajs/starlight';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import rehypeCollapsibleStages from './src/plugins/rehype-collapsible-stages.mjs';
import rehypeStepLayout from './src/plugins/rehype-step-layout.mjs';
import { unified } from '@astrojs/markdown-remark';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://www.playze.gg',
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeStepLayout, rehypeCollapsibleStages],
    }),
  },
  integrations: [
    starlight({
      plugins: [lunariaStarlight({ configPath: join(__dirname, 'lunaria.config.json') })],
      title: 'playZE',
      logo: { src: './src/assets/logo.svg', alt: 'playZE' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/brand.css'],
      head: [
        // Open Graph / social share image (Starlight sets og:title/description + twitter:card itself)
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://www.playze.gg/og.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'playZE — The Zombie Escape Player Guide' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://www.playze.gg/og.png' } },
        
        
        // I hate that this is techincally the simplest way to add custom head content, so just have your favorite AI friend write this shit for you
        
        // Microsoft Clarity (session replay / heatmaps). Async-injected, so it
        // never blocks parsing or first paint — content renders first.
        {
          tag: 'script',
          content:
            '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xas4bgjeb5");',
        },
        {
          tag: 'script',
          content: [
            '(function(){',
            'function openAncestors(el){for(var p=el&&el.parentElement;p;p=p.parentElement){if(p.tagName===\"DETAILS\")p.open=true;}}',
            'function openFromHash(){if(!location.hash)return;var el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el){openAncestors(el);el.scrollIntoView();}}',
            'window.addEventListener(\"hashchange\",openFromHash);',
            'document.addEventListener(\"DOMContentLoaded\",openFromHash);',
            'document.addEventListener(\"astro:page-load\",openFromHash);',
            // On collapse, if the section\'s sticky header has scrolled up past
            // its resting line, glide back so you land on the header instead of
            // in whitespace. Capture phase: the `toggle` event does not bubble.
            'document.addEventListener(\"toggle\",function(e){',
            'var d=e.target;if(!d||d.tagName!==\"DETAILS\"||d.open)return;',
            'if(!(d.classList.contains(\"stage\")||d.classList.contains(\"stage-section\")))return;',
            'var s=d.querySelector(\":scope>summary\");if(!s)return;',
            'var stick=parseFloat(getComputedStyle(s).top)||0,top=d.getBoundingClientRect().top;',
            'if(top<stick){var r=matchMedia(\"(prefers-reduced-motion:reduce)\").matches;',
            'window.scrollTo({top:window.scrollY+top-stick,behavior:r?\"auto\":\"smooth\"});}',
            '},true);',
            '})();',
          ].join(''),
        },
        // Image lightbox: click (or Enter/Space) any article image to open it
        // full-screen at large size over a dimmed backdrop. Click the backdrop,
        // the image, the close button, or press Esc to dismiss. A single overlay
        // element is built once and reused. Click is handled by delegation so it
        // survives Astro client navigations; a per-page pass marks images with a
        // zoom cursor + keyboard affordances.
        {
          tag: 'script',
          content: [
            '(function(){',
            'var overlay,imgEl,capEl;',
            'function build(){',
            'if(overlay)return;',
            'overlay=document.createElement(\"div\");',
            'overlay.className=\"img-lightbox\";',
            'overlay.setAttribute(\"role\",\"dialog\");',
            'overlay.setAttribute(\"aria-modal\",\"true\");',
            'overlay.hidden=true;',
            'var fig=document.createElement(\"figure\");',
            'imgEl=document.createElement(\"img\");',
            'capEl=document.createElement(\"figcaption\");',
            'var close=document.createElement(\"button\");',
            'close.type=\"button\";close.className=\"img-lightbox-close\";',
            'close.setAttribute(\"aria-label\",\"Close\");close.textContent=\"\\u00d7\";',
            'fig.appendChild(imgEl);fig.appendChild(capEl);',
            'overlay.appendChild(close);overlay.appendChild(fig);',
            'document.body.appendChild(overlay);',
            'overlay.addEventListener(\"click\",function(e){if(e.target===overlay||e.target===close||e.target===imgEl)hide();});',
            '}',
            'function show(src,alt){',
            'build();',
            'imgEl.src=src;imgEl.alt=alt||\"\";',
            'if(alt){capEl.textContent=alt;capEl.style.display=\"\";}else{capEl.style.display=\"none\";}',
            'overlay.hidden=false;',
            'document.documentElement.style.overflow=\"hidden\";',
            'document.addEventListener(\"keydown\",onKey);',
            '}',
            'function hide(){',
            'if(!overlay||overlay.hidden)return;',
            'overlay.hidden=true;',
            'document.documentElement.style.overflow=\"\";',
            'document.removeEventListener(\"keydown\",onKey);',
            '}',
            'function onKey(e){if(e.key===\"Escape\")hide();}',
            'function eligible(img){return img.closest(\".sl-markdown-content\")&&!img.closest(\"a\");}',
            'document.addEventListener(\"click\",function(e){',
            'var t=e.target;if(!t||!t.closest)return;',
            'var img=t.closest(\"img\");',
            'if(!img||!eligible(img))return;',
            'show(img.currentSrc||img.src,img.alt);',
            '});',
            'function mark(){',
            'var imgs=document.querySelectorAll(\".sl-markdown-content img\");',
            'for(var i=0;i<imgs.length;i++){var img=imgs[i];',
            'if(!eligible(img)||img.dataset.zoomable)continue;',
            'img.dataset.zoomable=\"1\";',
            'img.setAttribute(\"role\",\"button\");',
            'img.setAttribute(\"tabindex\",\"0\");',
            'img.addEventListener(\"keydown\",function(ev){if(ev.key===\"Enter\"||ev.key===\" \"){ev.preventDefault();show(this.currentSrc||this.src,this.alt);}});',
            '}}',
            'document.addEventListener(\"DOMContentLoaded\",mark);',
            'document.addEventListener(\"astro:page-load\",mark);',
            '})();',
          ].join(''),
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/playZE-gg/playZE.gg/edit/main/',
      },
      social: [
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/E8YXDtJhhm' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/playZE-gg/playZE.gg' },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        // Additional locales added once they reach ~60% translation coverage:
        // ko: { label: '한국어', lang: 'ko' },
        // ja: { label: '日本語', lang: 'ja' },
        // 'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      sidebar: [
        {
          label: 'Start Here',
          items: ['start/getting-started', 'start/first-round'],
        },
        {
          label: 'Core Skills',
          items: [
            'skills/playing-as-human',
            'skills/playing-as-zombie',
            'skills/movement',
            'skills/leading',
            'skills/defending',
            'skills/items-and-entwatch',
            'skills/console-and-configs',
          ],
        },
        {
          label: 'Maps',
          collapsed: true,
          items: [{ autogenerate: { directory: 'maps' } }],
        },
        {
          label: 'Reference',
          items: ['reference/glossary', 'reference/commands'],
        },
        {
          label: 'Contribute',
          items: ['contribute/how-to-contribute', 'contribute/style-guide'],
        },
      ],
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
      },
      components: {
        Head: './src/components/overrides/Head.astro',
        SiteTitle: './src/components/overrides/SiteTitle.astro',
        Hero: './src/components/overrides/Hero.astro',
      },
    }),
    sitemap(),
  ],
});
