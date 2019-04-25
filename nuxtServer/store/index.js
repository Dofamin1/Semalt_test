export const state = () => ({
  audits: null
});

export const getters = {};
export const mutations = {
  setAudits(state, data) {
    state.audits = data;
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
