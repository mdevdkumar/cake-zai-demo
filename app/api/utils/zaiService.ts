import { createClient } from "zai-payments";

export const client = createClient({
  clientId: process.env.ZAI_CLIENT_ID!,
  clientSecret: process.env.ZAI_CLIENT_SECRET!,
  scope: process.env.ZAI_SCOPE!,
  baseURL: "https://test.api.promisepay.com",
  authBaseURL: "https://au-0000.sandbox.auth.assemblypay.com",
  dataURL: "https://sandbox.au-0000.api.assemblypay.com",
});
