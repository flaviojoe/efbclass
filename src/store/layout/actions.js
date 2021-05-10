import { SETCLASSCOLORHEADER, SETMENU, SETMOSTRARCABECALHO, SETMOSTRARNOTIFICACAO, SETMENUDIREITO } from "./mutations_types";

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

export function setMenuDireito({commit}, payload) {
  commit(SETMENUDIREITO, payload);
}
