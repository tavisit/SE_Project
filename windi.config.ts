import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  extract: {
    include: [
      '**/*.{vue,html}',
    ],
    exclude: ['node_modules', '.git', 'server'],
  },
})