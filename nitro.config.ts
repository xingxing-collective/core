import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  experimental: {
    database: true
  },
  srcDir: 'server',
  routeRules: {
    '/**': {
      cors: true
    }
  },
  runtimeConfig: {
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grantType: process.env.AUTH0_GRANT_TYPE
    }
  },
  plugins: [
    '~/plugins/auth0.ts'
  ]
})