import { SETLOADING, SETRANKS, SETRANK } from "src/store/dashboard/mutations_types";

export default {
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SETRANKS]: (state, payload) => {
    state.ranks = payload;
  },
  [SETRANK]: (state, payload) => {
    state.rank = payload;
  }
};
