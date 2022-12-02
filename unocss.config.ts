import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetFlowbite } from '@julr/unocss-preset-flowbite'

export default defineConfig({
  safelist: [
    'i-mdi-credit-card-outline',
    'i-mdi-credit-card-check-outline',
    'i-mdi-credit-card',
    'i-mdi-chart-box-outline',
    'i-mdi-sync-circle',
    'i-mdi-view-dashboard-edit'
  ],
  shortcuts: [
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
      bg-[#2393f6] hover:bg-[#0a87f5]
      dark:bg-[#0a87f5] dark:hover:bg-[#2393f6]
           text-white
      dark:text-light dark:hover:text-gray-900
    `.trim()],
    ['login-icon', 'i-mdi-login'],
    ['logout-icon', 'i-mdi-logout'],
  ],
  presets: [
    presetUno(),
    presetFlowbite(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
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
