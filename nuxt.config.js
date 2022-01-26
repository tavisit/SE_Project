import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  dev: true,
  debug: true,
  buildModules: [
    'nuxt-windicss',
    // '@nuxtjs/eslint-module',
    [
      '@nuxtjs/eslint-module',
      {
        context: './',
        exclude: ['node_modules', '.nuxt'],
        fix: true,
        configFile: '.eslintrc.js',
        emitWarning: true,
        emitError: true,
        failOnError: true,
        outputReport: 'lint.log',
      },
    ],
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
      },
    },
  },
  css: [
    'virtual:windi-base.css',
    '~/assets/index.css',
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
  ],
});
