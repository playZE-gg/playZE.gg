import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import lunariaStarlight from '@lunariajs/starlight';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://playze.gg',
  integrations: [
    starlight({
      plugins: [lunariaStarlight({ configPath: join(__dirname, 'lunaria.config.json') })],
      title: 'playZE',
      logo: { src: './src/assets/logo.svg', alt: 'playZE' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/brand.css'],
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
        SiteTitle: './src/components/overrides/SiteTitle.astro',
        Hero: './src/components/overrides/Hero.astro',
      },
    }),
    sitemap(),
  ],
});
