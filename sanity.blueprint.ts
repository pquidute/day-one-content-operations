import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: "first-published",
      event: {
        includeAllVersions: true,
        on: ["create", "update"],
        filter: '_type == "event" && !defined(firstPublished)', // runs only when the response to the query is 'true'
      },
    }),
  ],
});
