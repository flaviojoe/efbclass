import Vue from "vue";
import { SETALUNO, SETFOTOPERFIL, SETLOADING } from "./mutations_types";

export default {
  [SETALUNO]: (state, payload) => {
    state.aluno = Object.assign({}, payload);
  },
  [SETFOTOPERFIL]: (state, payload) => {
    Vue.set(state.aluno, "foto_perfil", payload);
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  }
};
