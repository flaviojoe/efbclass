import FaqsServices from "src/services/FaqsServices";
import { SETFAQS, SETSEARCH, SETLOADING } from "src/store/faqs/mutations_types";
import {
  ERRO,
  notificacao,
  REALIZADO_COM_SUCESSO
} from "src/libs/notifications";

export async function getFAQs({ commit }) {
  return new Promise((resolve, reject) => {
    FaqsServices.getFAQs()
      .then(res => {
        commit(SETFAQS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados filtrados!");
        reject(error);
      });
  });
}

export async function getFAQsFiltrados({ commit }, payload) {
  return new Promise((resolve, reject) => {
    FaqsServices.getFAQsFiltrados(payload)
      .then(res => {
        commit(SETFAQS, res);
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao recuperar dados filtrados!");
        reject(error);
      });
  });
}

export function setSearch({ commit }, payload) {
  commit(SETSEARCH, payload);
}

export async function criarPergunta({ commit }, payload) {
  return new Promise((resolve, reject) => {
    FaqsServices.criarPergunta(payload)
      .then(res => {
        if (res.status !== "success") {
          notificacao(
            ERRO,
            res.message ? res.message : "Erro ao processar a pergunta"
          );
        } else {
          notificacao(
            REALIZADO_COM_SUCESSO,
            res.message ? res.message : "Erro ao processar a pergunta"
          );
        }
        resolve();
      })
      .catch(error => {
        notificacao(ERRO, "Erro ao processar sua pergunta!");
        reject(error);
      });
  });
}

export function setLoading({ commit }, payload) {
  commit(SETLOADING, payload);
}
