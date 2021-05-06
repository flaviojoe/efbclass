import { SETCLASSCOLORHEADER, SETMENU, SETMOSTRARCABECALHO, SETMOSTRARNOTIFICACAO } from "./mutations_types";

export function setClassColorHeader({commit}, payload) {
  commit(SETCLASSCOLORHEADER, payload);
}

export function setMostrarCabecalho({commit}, payload) {
  commit(SETMOSTRARCABECALHO, payload);
}

export function setMostrarNotificacoes({commit}, payload) {
  commit(SETMOSTRARNOTIFICACAO, payload);
}

export function setMenu({commit}, payload) {
  commit(SETMENU, payload);
}
