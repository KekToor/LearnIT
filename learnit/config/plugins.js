module.exports = ({ env }) => ({
  // ...
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        code: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  // ...
});
