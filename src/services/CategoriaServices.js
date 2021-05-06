import request from "src/libs/request";

export default {
  getCategorias() {
    return request.get("/categorias/");
  }
};
