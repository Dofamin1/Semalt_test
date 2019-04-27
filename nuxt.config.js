const path = require("path");
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      }
    ]
  },
  plugins: ["~plugins/vuetify.js"],
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
  css: [
    {
      src: "vuetify/dist/vuetify.min.css"
    }
  ],
  build: {
    /*
     ** Run ESLint on save
     */
    vendor: ["axios", "vuetify"],
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
