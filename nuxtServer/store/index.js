export const state = () => ({
  audits: null,
  activeMenuItem: "byOpportunity"
});

export const getters = {};
export const mutations = {
  setAudits(state, data) {
    state.audits = Object.values(data);
  },
  setActiveMenuItem(state, value) {
    state.activeMenuItem = value;
  }
};
export const actions = {
  async nuxtServerInit({ commit }) {
    return this.$axios
      .$get("/api/lighthouseResult/audits")
      .then(data => commit("setAudits", data))
      .catch(e => console.error(e));
  }
};
