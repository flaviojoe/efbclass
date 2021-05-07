// export const strict = false;

import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import usuarios from "./usuarios";
import cursos from "./cursos";
import alunos from "./alunos";
import faqs from "./faqs";
import layout from "./layout";
import configuracoes from "./configuracoes";
import provas from "./provas";
import informativos from "./informativos";
import notificacoes from "./notificacoes";
import dashboards from "./dashboard";

const ls = new SecureLS({isCompression: false});
Vue.use(Vuex);

const usuariosState = createPersistedState({
  key: '3f8c1455u534',
  paths: ["usuarios"],
  storage: {
    getItem: key => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: key => ls.remove(key)
  }
});

const layoutState = createPersistedState({
  key: '3f8c145514y0u7',
  paths: ["layout"],
  storage: {
    getItem: key => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: key => ls.remove(key)
  }
});

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      usuarios,
      cursos,
      alunos,
      faqs,
      layout,
      configuracoes,
      provas,
      informativos,
      notificacoes,
      dashboards
    },
    plugins: [usuariosState, layoutState],
    // plugins: [
    //   createPersistedState({
    //     storage: {
    //       getItem: key => ls.get(key),
    //       setItem: (key, value) => ls.set(key, value),
    //       removeItem: key => ls.remove(key),
    //     },
    //   })
    // ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}


