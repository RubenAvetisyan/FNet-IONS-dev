import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  safelist: [
    'i-mdi-bank-transfer',
    'i-mdi-wallet-outline',
    'i-mdi-wallet-plus',
    'i-mdi-chart-box-outline',
    'i-mdi-database-sync',
    'i-mdi-view-dashboard-edit',
    'mdi-account-plus',
  ],
  shortcuts: [
    ['f-btn', 'px-4 py-1 rounded inline-block text-sm min-w-fit rounded cursor-pointer disabled:cursor-default disabled:bg-brand-secondary disabled:opacity-50 b-1 bg-light text-brand-secondary hover:bg-brand-secondary hover:text-light b-brand-secondary'],
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['btn-blue', `
      flex
      items-center
      justify-center
      block
      w-full
      px-5 py-2.5
      cursor-pointer
      select-none
      text-center
      focus:ring-4 focus:outline-none
      bg-blue-button hover:bg-aspect-blue-button
      dark:bg-aspect-blue-button dark:hover:bg-blue-button
           text-white
      dark:text-light dark:hover:text-gray-900
    `.trim()],
    ['login-icon', 'i-mdi-login'],
    ['logout-icon', 'i-mdi-logout'],
    ['media', 'inline-flex items-center justify-center p-2 brand-media rounded-md shadow-lg'],
    ['card', 'bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'],
  ],
  theme: {
    colors: {
      blueButton: '#2393f6', // class="text-blue-button"
      aspectBlueButton: '#0a87f5', // class="text-aspect-blue-button"
      brand: {
        primary: '#5723ae', // class="bg-brand-primary"
        primaryLight: '#5723ae',
        primaryDark: '#5723ae7a',
        secondary: '#4c17d0',
        secondaryDark: '#4c17d066',
        pink: '#fc0a88',
        media: '#6366F1',
      },
    },
  },
  presets: [
    presetUno(),
    presetWind(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
    presetScrollbar(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
