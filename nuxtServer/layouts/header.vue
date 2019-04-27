<template>
  <div>
    <v-app>
      <v-tabs color="cyan" dark slider-color="yellow">
        <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>
      </v-tabs>
      <nuxt/>
    </v-app>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>

