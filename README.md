# Tea Taster - IV/AC

This is a variation of the Tea Taster application that uses Auth Connect and Identity Vault. The goal of this demo is to show how these solutions integrate into a simple but realistic application architecture.

This particular version rolls in some Status Bar plugin usage to attempt to replicate an issue that is occurring. To build and run:

1. clone the repo and cd into it
1. copy in your own `.npmrc` file
1. `npm i` (if this fails, `rm package-lock.json` and try again)
1. `npm run build`
1. `npx cap open ios`

The credentials for login:

- `test@ionic.io`
- `Ion54321`
