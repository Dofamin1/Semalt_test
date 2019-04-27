<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item, i) in audits" :key="i">
      <template v-slot:header>
        <div>{{item.title}}</div>
      </template>
      <v-card>
        <v-card-text>
          <span v-html="description(item)"></span>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AuditTable",
  computed: {
    ...mapState(["audits"]),
    description() {
      return ({ description }) => {
        const partedDesc = description.split("[Learn more]");
        if (partedDesc.length > 1) {
          const text = partedDesc[0];
          let ref = partedDesc[1].replace(")", "").replace("(", "");
          ref[ref.length - 1] === "." &&
            (() => (ref = ref.substring(0, ref.length - 1)))();
          return `<span>${text} <a href = ${ref}>Learn more</a></span>`;
        } else {
          return description;
        }
      };
    }
  }
};
</script>

<style>
</style>