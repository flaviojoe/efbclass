import { SETLOADING, SETRANK, SETRANKS } from "src/store/dashboard/mutations_types";
import { ERRO, notificacao } from "src/libs/notifications";
import DashboardServices from "src/services/DashboardServices";

export function setLoading({commit}, payload) {
  commit(SETLOADING, payload);
}

export async function getRanks({commit}) {
  return await new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    DashboardServices.getRanks()
      .then(res => {
        commit(SETRANKS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados do rank!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}

export async function getRankUsuarioPorCurso({commit}, payload) {
  return await new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    DashboardServices.getRankUsuarioPorCurso(payload)
      .then(res => {
        commit(SETRANK, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados do rank!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}

