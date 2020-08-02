module.exports = {
  client: {
    service: {
      name: "pathologic",
      url: "http://localhost:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret":
          "bb6fe647300b80145fc431906be738859552037b3b0de2a50c87ef4fd27d17ca",
      },
    },
    includes: ["./**/*.{vue,gql}"],
  },
};
