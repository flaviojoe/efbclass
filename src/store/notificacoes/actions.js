import { ERRO, notificacao } from "src/libs/notifications";
import { SETLOADING, SETNOTIFICACAO, SETNOTIFICACOES } from "./mutations_types";
import NotificacaoServices from "src/services/NotificacaoServices";

export async function getNotificacoes({ commit }) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    NotificacaoServices.getNotificacoes()
      .then(res => {
        commit(SETNOTIFICACOES, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados das notificações!");
        reject(error);
      })
      .finally(() => {
        setTimeout(() => {
          commit(SETLOADING, false);
        }, 800);
      });
  });
}

export function setNotificacao({ commit }, payload) {
  commit(SETNOTIFICACAO, payload);
}

export function setSearch({ commit }, payload) {
  commit(SETSEARCH, payload);
}
