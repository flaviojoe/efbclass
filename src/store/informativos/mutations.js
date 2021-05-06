import { SETINFORMATIVOS, SETLOADING, SETSEARCH } from "./mutations_types";

export default {
  [SETINFORMATIVOS]: (state, payload) => {
    state.informativos = payload;
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SETSEARCH]: (state, payload) => {
    state.search = payload;
  }
};
