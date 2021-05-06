import utils from "src/libs/utils";

const getters = {
  todosRanks: state => {
    return state.ranks;
  },
  topRanks: (state, getters) => {
    let ranks = getters.todosRanks;
    if (Object.keys(ranks).length >= 3) {
      let tops = ranks.slice(0, 3);
      return utils.alterarPosicaoArray(tops, 1, 0);
    }
    return ranks;

  },
  demaisRanks: (state, getters) => {
    let ranks = getters.todosRanks;
    if (Object.keys(ranks).length >= 3) {
      return ranks.slice(3);
    }
    return [];
  }
};

export default getters;
