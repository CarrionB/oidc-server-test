import 'dotenv/config'
import express from "express";
import { Provider } from 'oidc-provider';
const Account = require('./Accounts');
const {PORT} = process.env
const configuration = {
  // ... see /docs for available configuration
  clients: [{
    client_id: 'test_implicit_app',
    client_secret: 'bar',
    grant_types: ['refresh_token', 'authorization_code', 'client_credentials', 'password'],
    redirect_uris: ['https://openidconnect.net/callback'],
    // ... other client properties
  }],
  claims: {
    address: ['address'],
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
      'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
  },
  cookies: {
    keys: ['some secret key', 'and also the old rotated away some time ago', 'and one more'],
  },
  findAccount: Account.findAccount,
};

const oidc = new Provider(`http://localhost:${PORT}`, configuration);

const app = express()

app.use(oidc.callback)

oidc.listen(PORT, () => {
  console.log(`oidc-provider listening on port ${PORT}, check http://localhost:${PORT}/.well-known/openid-configuration`);
});