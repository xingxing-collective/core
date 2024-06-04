import { jwtVerify, createRemoteJWKSet } from 'jose'

export default defineNitroPlugin(({ hooks }) => {
  hooks.hook('request', async (event) => {
    const { auth0 } = useRuntimeConfig()
    try {

      const jwt = event.node.req.headers.authorization
      //const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVZRHd1WngtRG0zczdOV3dxckxvYyJ9.eyJuaWNrbmFtZSI6Inhpbmd4aW5nbW9mYXNodSIsIm5hbWUiOiJ4aW5neGluZ21vZmFzaHVAb3V0bG9vay5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMDhhMTgyOTFkZWI0NDA3OWY1MWNmMTBhZmE3YTdmYzA_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ4aS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNi0wM1QwOTo0NDowMi43MjJaIiwiZW1haWwiOiJ4aW5neGluZ21vZmFzaHVAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9kZXYtdG92M2oyb3VvZzI3dmFxNi51cy5hdXRoMC5jb20vIiwiYXVkIjoiaWtBQzJlMm00akxDN1pzWkxOYm9VN2tlTmpNcjB0OGgiLCJpYXQiOjE3MTc0MDc4NDUsImV4cCI6MTcxNzQ0Mzg0NSwic3ViIjoiYXV0aDB8NjY1NTcwOTI3NGI0ZjZiMjRjMTMwNWIyIiwic2lkIjoidzFFMV9XWWpHQmhUQWozcFI3c2x0S3M4QzVpc2kwLW0iLCJub25jZSI6Ik5qVnZka1pKT1d0MFZTNStWbTVEWnpkT1lXWXdOMlIyZUVveFRHdGFTVWt6ZEdaNWVWbzJTSEUyVnc9PSJ9.DZX8KHb0JR-7NUcCkKyom2VZDoSbebqbc3sMdaRzBYLBhy8HwaQK6LkcSRiAPTfonJO8Sg21a6CS38l7-1QPGL3f_dGjGx70KuaEr1BRHtKevFnumxNeRnP-kcxA9ml-BgqGqYwKeGOOL-A2w5RP7lWnvHRmDsZ85KQpSOvLFKi8raOqGNipLjtykTJ7OZUwCKeCdheDrDpp-yUQQcYsjxg0e2T8hdwDmJGXawiUUeGNVDDRi8vK1iHaaQBop-u8PJevgyUVpbnR8UblKhQ5axg2HxLCi6OSSMNSBAM1Z4_yaR2iWXXq7SMO0oUI_Yam6l1XRHxweE3Dpy_qrRRVxA"
      const JWKS = createRemoteJWKSet(new URL(`https://${auth0.domain}/.well-known/jwks.json`))

      await jwtVerify(jwt, JWKS, {
        audience: auth0.clientId,
        issuer: `https://${auth0.domain}/`,
      })
      
    } catch (error) {
      console.log(error)
      event.node.res.statusCode = 401
    }
  })

  hooks.hook('beforeResponse', async (event) => {
    switch (event.node.res.statusCode) {
      case 500:
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }))
      case 401:
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
      default:
        return send(event)
    }
  })
})