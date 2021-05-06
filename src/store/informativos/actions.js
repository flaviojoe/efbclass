import { ERRO, notificacao } from "src/libs/notifications";
import { SETINFORMATIVOS, SETLOADING, SETSEARCH } from "./mutations_types";
import InformativoServices from "src/services/InformativoServices";

export async function getInformativos({ commit }) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    InformativoServices.getInformativos()
      .then(res => {
        commit(SETINFORMATIVOS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados dos informativos!");
        reject(error);
      })
      .finally(() => {
        setTimeout(() => {
          commit(SETLOADING, false);
        }, 800);
      });
  });
}

export function setSearch({ commit }, payload) {
  commit(SETSEARCH, payload);
}
