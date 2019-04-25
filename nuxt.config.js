module.exports = {
  /*
   ** Headers of the page
   */
  srcDir: "./nuxtServer",
  head: {
    title: "semalt-test",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  modules: [
    ["@nuxtjs/proxy", { pathRewrite: { "/api": "http://localhost:5000" } }],
    "@nuxtjs/axios"
  ],
  proxy: {
    "/api": "http://localhost:5000"
  },
  build: {
    /*
     ** Run ESLint on save
     */
    vendor: ["axios"],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
