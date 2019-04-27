<template >
  <div>
    <div class="auditIndex">{{index + 1}}</div>
    <span>{{auditItem.title}}</span>
    <span
      v-if="activeMenuItem == 'byOpportunity'"
      :class="`score ${colorOfTime}`"
    >{{timeToImprove}} ms</span>
    <span v-if="activeMenuItem == 'byScore'" :class="`score ${colorOfScore}`">{{auditItem.score}}</span>
  </div>
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
      return this.auditItem.score < 0.7 ? "redScore" : "greenScore";
    },
    colorOfTime() {
      return this.auditItem.details.overallSavingsMs < 100
        ? "greenScore"
        : "redScore";
    },
    timeToImprove() {
      return this.auditItem.details.overallSavingsMs <= 0
        ? 0
        : this.auditItem.details.overallSavingsMs;
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