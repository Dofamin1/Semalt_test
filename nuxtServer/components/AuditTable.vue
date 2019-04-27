<template >
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item, i) in auditsToShow" :key="i">
      <template v-slot:header>
        <RowContent :auditItem="item" :index="i"></RowContent>
      </template>
      <v-card>
        <v-card-text class="indigo lighten-5">
          <span v-html="description(item)"></span>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapState } from "vuex";
import RowContent from "./RowContent";
export default {
  name: "AuditTable",
  components: {
    RowContent
  },
  computed: {
    ...mapState(["audits", "activeMenuItem"]),
    description() {
      return ({ description }) => {
        const descAndRef = description.split("[Learn more]");
        if (descAndRef.length > 1) {
          const text = descAndRef[0];
          let ref = descAndRef[1].replace(")", "").replace("(", "");
          ref[ref.length - 1] === "." &&
            (() => (ref = ref.substring(0, ref.length - 1)))();
          return `<span>${text} <a href = ${ref}>Learn more</a></span>`;
        } else {
          return description;
        }
      };
    },
    auditsToShow() {
      let filterCallback;
      let sortCallback;

      if (this.activeMenuItem == "byOpportunity") {
        filterCallback = ({ details }) =>
          details && details.type == "opportunity";

        sortCallback = (a, b) => {
          if (a.details.overallSavingsMs > b.details.overallSavingsMs) return 1;
          if (a.details.overallSavingsMs < b.details.overallSavingsMs)
            return -1;
          return 0;
        };
      } else if (this.activeMenuItem == "byScore") {
        filterCallback = ({ details, scoreDisplayMode }) =>
          details && scoreDisplayMode == "numeric";

        sortCallback = (a, b) => {
          if (a.score < b.score) return 1;
          if (a.score > b.score) return -1;
          return 0;
        };
      } else return this.audits;

      return this.audits.filter(filterCallback).sort(sortCallback);
    }
  }
};
</script>

<style>
.auditIndex {
  display: inline-block;
  margin-right: 2%;
  color: #325199;
  font-weight: 500;
}
.score {
  display: inline-block;
  float: right;
  margin-right: 10%;
  color: #325199;
  font-weight: 500;
}
.redScore {
  color: red;
  font-weight: 800;
}
.greenScore {
  color: green;
  font-weight: 800;
}
</style>