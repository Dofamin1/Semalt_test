<template >
  <v-layout row wrap>
    <v-flex class="text-xs-center" xs4>
      <span>{{auditType}}</span>
    </v-flex>
    <v-flex class="text-xs-center" xs4>
      <span>{{metricName}}</span>
    </v-flex>
  </v-layout>
</template>
    

<script>
import { mapState } from "vuex";
export default {
  name: "TableHeader",
  computed: {
    ...mapState(["activeMenuItem"]),
    auditType() {
      return this.activeMenuItem == "byOpportunity"
        ? "Opportunity"
        : "Audit title";
    },
    metricName() {
      if (this.activeMenuItem == "byOpportunity") return "Estimated savings";
      else if (this.activeMenuItem == "byScore") return "Score (from 0 to 1)";
      else return null;
    }
  }
};
</script>

<style>
</style>