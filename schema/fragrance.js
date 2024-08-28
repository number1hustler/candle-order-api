import { Schema, Repository } from "redis-om";
import { client } from "../config/redis-client.js";

// Define the Fragrance schema

const fragranceSchema = new Schema("Fragrance", {
  id: { type: "string" },
  name: { type: "string" },
  description: { type: "string" },
  category: { type: "string" },
  created_at: { type: "string" },
  updated_at: { type: "string" },
  image_url: { type: "string" },
});

// Create a repository for the Fragrance schema
const fragranceRepository = new Repository(fragranceSchema, client);

export { fragranceSchema, fragranceRepository };
