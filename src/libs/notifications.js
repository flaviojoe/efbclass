import { Notify } from "quasar";

let mensagens = {
  realizadoComSucesso: {
    message: "Operação realizada com sucesso!",
    icon: "fas fa-thumbs-up",
    position: "top",
    color: "primary"
  },
  loginExpirado: {
    message: "Login expirado!",
    icon: "fas fa-exclamation",
    position: "top",
    color: "negative"
  },
  erroDeSistema: {
    message: "Erro de Sistema!",
    position: "top",
    icon: "fas fa-exclamation",
    color: "negative"
  },
  demoraNaResposta: {
    message: "Demora na resposta!",
    icon: "fas fa-exclamation",
    position: "top",
    color: "negative"
  },
  erroNaRede: {
    message: "Erro de rede!",
    icon: "fas fa-exclamation",
    position: "top",
    color: "negative"
  },
  erro: {
    message: "Erro ao processar sua requisição!",
    icon: "fas fa-exclamation",
    position: "top",
    color: "negative"
  }
};

export const REALIZADO_COM_SUCESSO = "realizadoComSucesso";
export const LOGIN_EXPIRADO = "loginExpirado";
export const ERRO_DE_SISTEMA = "erroDeSistema";
export const DEMORA_NA_RESPOSTA = "demoraNaResposta";
export const ERRO_NA_REDE = "erroNaRede";
export const ERRO = "erro";

export function notificacao(tipoMensagem, msg) {
  let alert = mensagens[tipoMensagem];
  alert.message = msg ? msg : alert.message;
  Notify.create(alert);
}
