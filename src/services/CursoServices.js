import request from "src/libs/request";

export default {
  getCurso(payload) {
    return request.get(`/cursos/${payload.id}/`);
  },
  getMeusCursos() {
    return request.get("/cursos/cursos_do_aluno/");
  },
  getTodosCursosPorCategorias() {
    return request.get("/cursos/cursos_por_categoria/");
  },
  getAulasCurso(payload) {
    return request.get(`cursos/${payload.id}/aulas_do_curso/`);
  },
  aulaFinalizada(payload) {
    return request.post("historico_aula/", payload);
  }
};
