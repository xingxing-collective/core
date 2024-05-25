import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  routeRules: {
    '/**': {
      cors: true
    }
  },
  imports: {
    dirs: [
      'composables'
    ]
  }
})