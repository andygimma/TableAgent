# Table AI

## Development

1. Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/)
2. `npm install`
3. `cp .env.local .env`

### Install Supabase locally

Run `npx supabase init` This will automatically trigger the underlying Docker setup, pull all the required Docker images, and spin them up – in other words, the command creates and starts a fully running Supabase instance without you having to configure it. When the process has completed, you should see a confirmation message and something like this:

```
API URL: http://localhost:54321
GraphQL URL: http://localhost:54321/graphql/v1
DB URL: postgresql://postgres...
Studio URL: http://localhost:54323
Inbucket URL: http://localhost:54324
JWT secret: super-secret-jwt-token...
anon key: eyJhbGciOiJI...
service_role key: eyJh...
```

The API URL and anon key will be stored in your .env file as VITE_SUPABASE_URL_DEV and VITE_SUPABASE_SECRET_KEY_DEV.

### Running locally

Make sure the Docker Engine is running and the correct information has been copied to .env as mentioned above.

`npm run dev`
