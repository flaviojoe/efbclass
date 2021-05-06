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
import dashboards from './dashboard'

const ls = new SecureLS({isCompression: false});
Vue.use(Vuex);

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
    plugins: [
      createPersistedState({
        storage: {
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: key => ls.remove(key),
        },
      })
    ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}


