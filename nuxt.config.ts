import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: [
    'nuxt-windicss',
  ],
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      // see https://github.com/unjs/listhen#options
      server: {
        port: 4444,
        open: true,
      }
    }
  },
  css: [
    'virtual:windi-base.css',
    '~/assets/index.css',
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
  ],
})
