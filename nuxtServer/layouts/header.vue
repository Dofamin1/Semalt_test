<template>
  <v-app>
    <v-tabs color="indigo darken-4" v-model="activeMenuItemWrapper" dark slider-color="yellow">
      <v-tab v-for="(item, index) in menuItems" :key="index" ripple>{{ item.title }}</v-tab>
    </v-tabs>
    <nuxt/>
  </v-app>
</template>

<script>
const menuItems = [
  { title: "By opportunity to improve", value: "byOpportunity" },
  { title: "By score of dimensions", value: "byScore" },
  { title: "All dimensions", value: "all" }
];
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["activeMenuItem"]),
    menuItems: () => menuItems,
    activeMenuItemWrapper: {
      get() {
        return this.menuItems.indexOf(this.activeMenuItem);
      },
      set(index) {
        this.setActiveMenuItem(menuItems[index].value);
      }
    }
  },
  methods: {
    ...mapMutations(["setActiveMenuItem"])
  }
};
</script>

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

