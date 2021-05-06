import ProvaServices from "src/services/ProvaServices";
import {
  SETPROVAS,
  SETQUESTIONARIOID,
  SETLOADING,
  SETPROVA,
  SETQUESTIONARIO
} from "src/store/provas/mutations_types";
import {
  ERRO,
  notificacao,
  REALIZADO_COM_SUCESSO
} from "src/libs/notifications";

export async function getProvasDisponiveis({ commit }) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    return ProvaServices.getProvasAluno()
      .then(res => {
        commit(SETPROVAS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados das provas!");
        reject(error);
      })
      .finally(() => {
        setTimeout(() => {
          commit(SETLOADING, false);
        }, 800);
      });
  });
}

export async function getQuestionarioProva({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    ProvaServices.getQuestionarioProva(payload)
      .then(res => {
        commit(SETQUESTIONARIO, res);
        this.$router.push("/prova/questionario").catch(err => {});
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados da prova!");
        reject(error);
      })
      .finally(() => {
        setTimeout(() => {
          commit(SETLOADING, false);
        }, 1000);
      });
  });
}

export async function getProva({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    return ProvaServices.getProvaAluno(payload)
      .then(res => {
        commit(SETPROVA, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados da prova!");
        reject(error);
      })
      .finally(() => {
        setTimeout(() => {
          commit(SETLOADING, false);
        }, 800);
      });
  });
}

export function setQuestionarioID({ commit, dispatch }, payload) {
  commit(SETQUESTIONARIOID, payload);
  dispatch("getQuestionarioProva", payload);
}

export function setLoading({ commit }, payload) {
  commit(SETLOADING, payload);
}

export function setProva({ commit }, payload) {
  commit(SETPROVA, payload);
}

export async function entregarProva({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    ProvaServices.entregarProva(payload)
      .then(response => {
        let status = response.hasOwnProperty("status")
          ? response.status
          : response.code;
        if (status) {
          console.log(REALIZADO_COM_SUCESSO, response.message);
          this.$router.replace("/prova/resultado").catch(err => {});
        } else {
          notificacao(ERRO, response.message);
        }
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, e.message ? e.message : "Erro ao entregar prova!");
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}
