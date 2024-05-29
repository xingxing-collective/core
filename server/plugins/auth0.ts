import { jwtVerify, createRemoteJWKSet } from 'jose'

export default defineNitroPlugin(({ hooks }) => {
  hooks.hook('request', async (event) => {
    
    const jwt = event.node.req.headers.authorization

    const { auth0 } = useRuntimeConfig()

    const JWKS = createRemoteJWKSet(new URL(`https://${auth0.domain}/.well-known/jwks.json`))
    try {
      const { payload } = await jwtVerify(jwt, JWKS, {
        audience: auth0.audience,
        issuer: `https://${auth0.domain}/`,
      })
      event.context.auth = payload
    } catch (error) {
      return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }
  })
})