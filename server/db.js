import mongoose from "mongoose";
import { config, assertConfig } from "./config.js";

export async function connectDB() {
  assertConfig();

  if (mongoose.connection.readyState === 1) return;

  // Ensure we can authenticate even if the MongoDB user was created in a different auth db (commonly `admin`).
  // If your URI already specifies authSource, MongoDB will ignore duplicates.
  // Print the final URI (redact password) so we can validate it locally.
  const redact = (uri) => uri.replace(/:\S+@/, ":***@");

  const uriWithAuthDb = config.mongodbUri.includes("authSource=")
    ? config.mongodbUri
    : `${config.mongodbUri}${config.mongodbUri.includes("?") ? "&" : "?"}authSource=admin`;

  // eslint-disable-next-line no-console
  console.log("Mongo URI:", redact(uriWithAuthDb));

  await mongoose.connect(uriWithAuthDb, {
    autoIndex: true,
  });
}

