import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  srcDir:'server',
  routeRules: {
    '/**': {
      cors: true
    }
  }
})