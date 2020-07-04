export default {
  mode: "universal",
  target: "server",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: ["@/assets/css/title-font.css"],
  plugins: ["@/plugins/vue-formulate.ts"],
  components: true,
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/apollo"],
  router: {
    middleware: ["auth"],
  },
  axios: { baseURL: "http://localhost:8000" },
  auth: {
    redirect: {
      logout: "/login",
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "jwt_token",
        },
        refreshToken: {
          property: "jwt_token",
          maxAge: 900000,
        },
        endpoints: {
          login: { url: "/auth/login", method: "POST" },
          refresh: { url: "/auth/token/refresh", method: "GET" },
          logout: false,
          user: false, // { url: "/api/auth/user", method: "get", propertyName: "user" },
        },
        // autoFetchUser: true
      },
    },
  },
  apollo: {
    authenticationType: "",
    tokenName: "auth._token.local",
    clientConfigs: {
      default: {
        httpEndpoint: "http://localhost:8080/v1/graphql",
      },
    },
  },
  build: {},
};
