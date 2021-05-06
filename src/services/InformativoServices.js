import request from "src/libs/request";

export default {
  getInformativos() {
    return request.get("/materiais/informativos/");
  }
};
