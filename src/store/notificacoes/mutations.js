import { SETLOADING, SETNOTIFICACAO, SETNOTIFICACOES } from "./mutations_types";

export default {
  [SETNOTIFICACAO]: (state, payload) => {
    state.notificacao = payload;
  },
  [SETNOTIFICACOES]: (state, payload) => {
    state.notificacoes = payload;
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  }
};
