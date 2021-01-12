# Scrappy Twitter API
Scrappy Twitter API is a Go-backend project that is secured by the Magic SDK for Go. 

# Scrappy Twitter API (CLIENT)
This Next.js app authenticates the user and generates the access token required to make POST or DELETE requests with the [Scrappy Twitter API](https://github.com/seemcat/scrappy-twitter-api-server).

# Noteworthy Packages
- [Magic SDK](https://docs.magic.link/client-sdk/web/get-started): Allows users to sign up or log in.
- [cookie](https://github.com/jshttp/cookie): Lets us persist the access token in a httpOnly cookie. (httpOnly means it can only be accessed by the API.)
- [SWR](https://github.com/vercel/swr): Lets us get user info using a hook.
- [@hapi/iron](https://hapi.dev/module/iron/): Lets us encrypt the login cookie for more security.

# Quickstart
## Magic Setup
1. Sign up for an account on [Magic](https://magic.link/).
2. Create an app.
3. Copy your app's Test Secret Key (you'll need it soon).

## Client Setup
1. `git clone https://github.com/seemcat/scrappy-twitter-api-client.git`
2. `cd scrappy-twitter-api-client`
3. `mv .env.local.example .env.local`
4. Populate .env.local with the correct Test keys from your Magic app:
    ```
    NEXT_PUBLIC_MAGIC_TEST_PUBLISHABLE_KEY=pk_test_XXXXX
    NEXT_PUBLIC_MAGIC_TEST_SECRET_KEY=sk_test_XXXXX
    NEXT_PUBLIC_HAPI_IRON_SECRET=this-is-a-secret-value-with-at-least-32-characters
    ```

    Note: The `HAPI_IRON_SECRET` is needed by @hapi/iron to encrypt an object. Feel free to leave the default value as is in dev.
5. yarn
6. yarn dev
7. Generate your access token and copy it (you'll need it soon).

## Test with Postman
**There are two options to test your access token with the Scrappy Twitter API.** You could either follow the steps listed [here](https://github.com/seemcat/scrappy-twitter-api-server) to set up your own local Go server. 

OR you can follow the steps below to immediately use your access token on a Live Go server that is hosting the Scrappy Twitter API.

1. Import the PROD version of the Scrappy Twitter API Postman Collection:
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/595abf685418eeb96401)
3. Paste the access token you just copied as a Bearer token into the collection’s HTTP Authorization request header.
4. Send your requests to the **Live** Scrappy Twitter API! 🎉