import 'dotenv/config'
import express from "express";
import { Provider } from 'oidc-provider';
const {PORT} = process.env
const configuration = {
  // ... see /docs for available configuration
  clients: [{
    client_id: 'test_implicit_app',
    client_secret: 'bar',
    redirect_uris: ['https://f7d1-2800-bf0-2c3-b62-f456-c771-1d51-99e2.ngrok.io/oidc'],
    // ... other client properties
  }],
  claims: {
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo']
  }
};

const oidc = new Provider(`http://localhost:${PORT}`, configuration);

oidc.listen(PORT, () => {
  console.log(`oidc-provider listening on port ${PORT}, check http://localhost:${PORT}/.well-known/openid-configuration`);
});

const app = express()

app.use('/oidc', oidc.callback)

