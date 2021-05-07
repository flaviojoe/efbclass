import { LocalStorage } from "quasar";
import { ERRO, notificacao, REALIZADO_COM_SUCESSO } from "src/libs/notifications";
import UserServices from "src/services/UserServices";
import { SETFOTOPERFIL, SETLOGGEDIN, SETUSER } from "./mutations_types";
import utils from "src/libs/utils";

export function setUser({commit}, payload) {
  if (payload.hasOwnProperty("user")) {
    let avatar = payload.hasOwnProperty("user") ? payload.user.foto_perfil : utils.avatarPadrao;
    let grupos = payload.hasOwnProperty("user") && payload.user.hasOwnProperty("groups") ? payload.user.groups : [];

    const user = {
      token: payload.token,
      expiry: payload.expiry,
      username: payload.user.username,
      nome: payload.user.nome,
      groups: grupos,
      foto_perfil: avatar
    };
    commit(SETUSER, user);
    commit(SETLOGGEDIN, true);
  }
}

export async function loginUsuario({commit, dispatch}, payload) {
  return new Promise((resolve, reject) => {
    UserServices.loginUsuario(payload)
      .then(response => {
        dispatch("setUser", response);
        setTimeout(() => {
          this.$router.push("/home").catch(err => {
          });
        }, 1000);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Login/Senha inválidos");
        this.$router.replace("/autenticacao").catch(err => {
        });
        reject(error);
      });
  });
}

export async function logout({commit}) {
  return new Promise((resolve, reject) => {
    UserServices.logout().finally(() => {
      LocalStorage.clear();
      this.$router.replace("/autenticacao").catch(err => {
      });
    });
  });
}

export async function alterarSenha({}, payload) {
  return new Promise((resolve, reject) => {
    UserServices.alterarSenha(payload)
      .then(res => {
        if (res.status !== "success") {
          Object.keys(res.data).forEach(function (item) {
            Object.keys(res.data[item]).forEach(function (item2) {
              notificacao(ERRO, res.data[item][item2]);
            });
          });
        } else {
          notificacao(REALIZADO_COM_SUCESSO, "Senha alterada com sucesso!");
        }
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao alterar senha!");
        reject(error);
      });
  });
}

export async function alterarEmail({dispatch}, payload) {
  return new Promise((resolve, reject) => {
    UserServices.alterarEmail(payload)
      .then(res => {
        if (res.status !== "success") {
          Object.keys(res.data).forEach(function (item) {
            Object.keys(res.data[item]).forEach(function (item2) {
              notificacao(ERRO, res.data[item][item2]);
            });
          });
        } else {
          notificacao(REALIZADO_COM_SUCESSO, res.message);
          setTimeout(() => {
            dispatch("alunos/getAluno", null, {root: true});
          }, 500);
        }
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao alterar e-mail!");
        reject(error);
      });
  });
}

export function setFotoPerfil({commit}, payload) {
  commit(SETFOTOPERFIL, payload);
}
