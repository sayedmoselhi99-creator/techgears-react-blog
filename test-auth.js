import { google } from "googleapis";
import fs from "fs";

const key = JSON.parse(fs.readFileSync("techgears-indexing-automation-2359c399d8b1.json", "utf8"));

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"]
);

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.error("❌ Auth failed:", err);
  } else {
    console.log("✅ Auth successful, tokens:", tokens);
  }
});
