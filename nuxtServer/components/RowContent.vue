<template >
  <v-layout row wrap>
    <v-flex lg10 md10 sm8 xs6>
      <div class="auditNumber">{{index + 1}}</div>
      <span>{{auditItem.title}}</span>
    </v-flex>
    <v-flex lg2 md2 sm4 xs6 class="text-xs-right">
      <span
        v-if="activeMenuItem == 'byOpportunity'"
        :class="`mr-2 boldText ${colorOfTime}`"
      >{{timeToImprove}}</span>
      <template v-else-if="activeMenuItem == 'byScore'">
        <span :class="`mr-2 boldText ${colorOfScore}`">{{score}}</span>
        <v-progress-circular :value="progressValue" :color="progressColor"></v-progress-circular>
      </template>
    </v-flex>
  </v-layout>
</template>
    

<script>
import { mapState } from "vuex";
export default {
  name: "RowContent",
  props: {
    auditItem: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(["activeMenuItem"]),

    colorOfScore() {
      const score = this.auditItem.score;
      if (score < 0.4) return "redText";
      else if (score < 0.7) return "brownText";
      else return "greenText";
    },
    score() {
      return this.auditItem.score == 1 ? "1 (excellent)" : this.auditItem.score;
    },

    colorOfTime() {
      const timeToSave = this.auditItem.details.overallSavingsMs;
      if (timeToSave > 150) return "redText";
      else if (timeToSave > 40) return "brownText";
      else return "greenText";
    },
    timeToImprove() {
      return this.auditItem.details.overallSavingsMs <= 0
        ? "~0 (minimal time)"
        : `${this.auditItem.details.overallSavingsMs} ms`;
    },

    progressValue() {
      return this.auditItem.score * 100;
    },
    progressColor() {
      if (this.progressValue < 40) return "red";
      else if (this.progressValue < 70) return "deep-orange darken-4";
      else return "green";
    }
  }
};
</script>

<style>
.auditNumber {
  display: inline-block;
  margin-right: 2%;
  color: #325199;
  font-weight: 500;
}
.boldText {
  font-weight: 800;
}
.redText {
  color: red;
}
.greenText {
  color: green;
}
.brownText {
  color: brown;
}
</style>