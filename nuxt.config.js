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
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: [],
  plugins: ["@/plugins/vue-formulate.ts"],
  components: true,
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/apollo"],
  router: {
    middleware: ["auth"]
  },
  axios: { baseURL: "http://localhost:8000" },
  auth: {
    localStorage: false,
    cookie: {
      options: {
        secure: false,
        expires: 7
      }
    },
    redirect: {
      logout: "/login"
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "jwt_token",
          maxAge: 900
        },
        refreshToken: {
          property: "jwt_token",
          data: false,
          //maxAge: 43200
          maxAge: 900
        },
        endpoints: {
          login: { url: "/auth/login", method: "POST" },
          refresh: { url: "/auth/token/refresh", method: "GET" },
          logout: { url: "/auth/logout", method: "POST" },
          user: false
          // user: {
          //   url: "http://localhost:8080/v1/graphql",
          //   method: "POST",
          //   data: JSON.stringify({
          //     query:
          //       'query Q1{\n  me: users_by_pk(id: "d837528c-6cac-40c5-86c8-fa3e50c28b1f") {\n id\n display_name\n avatar_url\n }\n}\n',
          //     variables: {}
          //   }),
          //   propertyName: false
          // }
        },
        autoLogout: true
      }
    }
  },
  apollo: {
    authenticationType: "",
    clientConfigs: {
      default: {
        tokenName: "auth._token.local",
        httpEndpoint: "http://localhost:8080/v1/graphql"
      }
    }
  },
  build: {}
};
