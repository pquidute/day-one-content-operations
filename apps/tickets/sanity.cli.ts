import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  app: {
    organizationId: "oz0YEAkuF",
    entry: "./src/App.tsx",
  },
  deployment: {
    appId: "rlnmrz3scra1wu6ccvud9bd7",
  },
  server: {
    port: 3334, // it runs by default on port 3333 (currently occupied by studio application), so we move it manually to another port
  },
});
