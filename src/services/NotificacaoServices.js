import request from "src/libs/request";

export default {
  getNotificacoes() {
    return request.get("/notificacoes/");
  }
};
