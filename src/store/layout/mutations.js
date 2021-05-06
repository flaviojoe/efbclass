import { SETCLASSCOLORHEADER, SETMENU, SETMOSTRARCABECALHO, SETMOSTRARNOTIFICACAO } from "./mutations_types";

export default {
  [SETCLASSCOLORHEADER]: (state, payload) => {
    state.classColorHeader = payload;
  },
  [SETMOSTRARCABECALHO]: (state, payload) => {
    state.mostrarCabecalho = payload;
  },
  [SETMOSTRARNOTIFICACAO]: (state, payload) => {
    state.mostrarNotificacoes = payload;
  },
  [SETMENU]: (state, payload) => {
    state.menu = payload;
  }
};
