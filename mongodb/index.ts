import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

export const client = new MongoClient();
export const db = client.database('kr_prac');