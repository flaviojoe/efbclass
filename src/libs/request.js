import axios from "axios";
import { DEMORA_NA_RESPOSTA, ERRO, ERRO_DE_SISTEMA, notificacao } from "src/libs/notifications";
import { getToken, tokenExpirado } from "src/libs/auth";

const requisicao = axios.create({
  baseURL: process.env.API,
  timeout: 20000
});

requisicao.interceptors.request.use(
  config => {
    let token = getToken();
    if (token) {
      console.log('getToken => ', token);
      config.headers["Authorization"] = "Token " + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

requisicao.interceptors.response.use(
  res => {
    console.log("Request ok => ", res);
    let status = res.hasOwnProperty("status") ? res.status : null;
    if (status && (status >= 400 && status <= 600)) {
      console.log(ERRO + " => ", res);
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  error => {
    console.log("Request Error => ", error);

    if (error.hasOwnProperty('message') && error.message === 'Network Error') {
      tokenExpirado();
      notificacao(ERRO_DE_SISTEMA);
    }

    if (error.response && error.response.status === 401) {
      tokenExpirado();
    } else if (error.response && error.response.status >= 500) {
      notificacao(ERRO_DE_SISTEMA);
    } else if (error.message.indexOf("timeout") > -1) {
      notificacao(DEMORA_NA_RESPOSTA);
    }
    return Promise.reject(error);
  }
);

export default requisicao;
