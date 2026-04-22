import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1l1r6zzx",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: false,
});