# Proxy

Proxy hosts is a lightweight proxy server for the api.

## Setup

1. Take a copy of `.env.example` and re-name to `.env`
2. Get your [Neon](https://neon.tech/) Database Connection string
3. Get your [Auth0](https://auth0.com/) Config
4. Enter the details into the `.env` file
5. Start the dev server with the following scripts

``` bash
# Enable pnpm
$ corepack enable

# Install dependencies
$ pnpm install

# Start dev server with hot reload at localhost:3001
$ pnpm dev
```
