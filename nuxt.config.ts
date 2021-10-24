import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: [
    'nuxt-windicss',
  ],
  css: [
    '~/assets/index.css',
  ],
})
