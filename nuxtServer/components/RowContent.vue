<template >
  <div>
    <div class="auditNumber">{{index + 1}}</div>
    <span>{{auditItem.title}}</span>
    <span
      v-if="activeMenuItem == 'byOpportunity'"
      :class="`measurements ${colorOfTime}`"
    >{{timeToImprove}}</span>
    <span
      v-if="activeMenuItem == 'byScore'"
      :class="`measurements ${colorOfScore}`"
    >{{auditItem.score}}</span>
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
      return this.auditItem.score < 0.7 ? "redText" : "greenText";
    },
    colorOfTime() {
      return this.auditItem.details.overallSavingsMs < 100
        ? "greenText"
        : "redText";
    },
    timeToImprove() {
      return this.auditItem.details.overallSavingsMs <= 0
        ? "~0 (minimal time)"
        : `${this.auditItem.details.overallSavingsMs} ms`;
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
.measurements {
  display: inline-block;
  float: right;
  margin-right: 10%;
  color: #325199;
  font-weight: 500;
}
.redText {
  color: red;
  font-weight: 800;
}
.greenText {
  color: green;
  font-weight: 800;
}
</style>