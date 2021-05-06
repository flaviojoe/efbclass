import AlunoServices from "src/services/AlunoServices";
import {
  ERRO,
  notificacao,
  REALIZADO_COM_SUCESSO
} from "src/libs/notifications";
import { SETALUNO, SETFOTOPERFIL, SETLOADING } from "./mutations_types";

export async function getAluno({ commit }) {
  return new Promise((resolve, reject) => {
    AlunoServices.getAluno()
      .then(res => {
        commit(SETALUNO, res);
        resolve();
      })
      .catch(erro => {
        notificacao(ERRO, "Erro ao recuperar dados da conta!");
        reject(erro);
      });
  });
}

export async function alterarFotoPerfil({ commit, dispatch }, payload) {
  return new Promise((resolve, reject) => {
    AlunoServices.alterarFotoPerfil(payload)
      .then(response => {
        commit(SETFOTOPERFIL, response.data.foto_perfil);
        setTimeout(() => {
          dispatch("usuarios/setFotoPerfil", response.data.foto_perfil, {
            root: true
          });
          setTimeout(() => {
            dispatch("getAluno");
          }, 500);
        }, 500);
        notificacao(REALIZADO_COM_SUCESSO, response.message);
        resolve();
      })
      .catch(error => {
        notificacao(
          ERRO,
          error.message ? error.message : "Erro ao atualizar foto de perfil"
        );
        reject(error);
      });
  });
}

export async function alterarDadosPublicoAluno({ dispatch }, payload) {
  return new Promise((resolve, reject) => {
    AlunoServices.alterarDadosPublicoAluno(payload)
      .then(response => {
        if (response.code === 200) {
          notificacao(REALIZADO_COM_SUCESSO, response.message);
          setTimeout(() => {
            dispatch("getAluno");
          }, 1000);
        } else {
          notificacao(ERRO, response.message);
        }
      })
      .catch(error => {
        notificacao(
          ERRO,
          error.message ? error.message : "Erro ao atualizar dados público"
        );
        reject(error);
      });
  });
}

export function setLoading({ commit }, payload) {
  commit(SETLOADING, payload);
}

export async function matricularAluno({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit(SETLOADING, true);
    AlunoServices.matricularAluno(payload)
      .then(response => {
        if (response.code === 200) {
          notificacao(REALIZADO_COM_SUCESSO, response.message);
          this.$router.replace("/meus_cursos").catch(err => {});
        } else {
          notificacao(ERRO, response.message);
        }
        resolve();
      })
      .catch(error => {
        notificacao(
          ERRO,
          error.message ? error.message : "Erro ao efetuar matricula!"
        );
        reject(error);
      })
      .finally(() => {
        commit(SETLOADING, false);
      });
  });
}
