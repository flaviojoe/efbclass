import request from "src/libs/request";

export default {
  getRanks() {
    return request.get("/ranks/");
  },
  getRankUsuarioPorCurso(payload) {
    return request.get(`/ranks/${ payload.id }/rank_usuario_por_curso/`);
  }
};
