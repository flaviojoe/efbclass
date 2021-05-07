import { SETLOADING, SETRANK, SETRANKS } from "src/store/dashboard/mutations_types";
import { ERRO, notificacao } from "src/libs/notifications";
import DashboardServices from "src/services/DashboardServices";
import loading from "src/libs/loading";

export function setLoading({commit}, payload) {
  commit(SETLOADING, payload);
}

export async function getRanks({commit}) {
  return await new Promise((resolve, reject) => {
    loading.show()
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
        loading.hide()
      });
  });
}

export async function getRankUsuarioPorCurso({commit}, payload) {
  return await new Promise((resolve, reject) => {
    loading.show()
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
        loading.hide()
      });
  });
}

