<template >
  <v-layout row wrap>
    <v-flex class="text-xs-center" lg8 md8 sm8 xs6>
      <v-card v-if="activeMenuItem != 'all'">{{auditType}}</v-card>
      <v-card v-else>{{auditType}}</v-card>
    </v-flex>
    <v-flex class="text-xs-center" lg4 md4 sm4 xs6>
      <v-card>{{metricName}}</v-card>
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
      else return "-";
    }
  }
};
</script>

<style>
</style>