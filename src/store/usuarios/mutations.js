import Vue from "vue";
import { SETFOTOPERFIL, SETLOADING, SETLOGGEDIN, SETUSER } from "./mutations_types";

export default {
  [SETLOGGEDIN]: (state, payload) => {
    state.loggedIn = payload;
  },
  [SETLOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SETUSER]: (state, payload) => {
    state.user = payload;
  },
  [SETFOTOPERFIL]: (state, payload) => {
    Vue.set(state.user, "foto_perfil", payload);
  }
};
