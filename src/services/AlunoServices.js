import request from "src/libs/request";

export default {
  getAluno() {
    return request.get("/alunos/detalhe_usuario/");
  },
  alterarFotoPerfil(payload) {
    return request.put(`/change_foto_perfil/${payload.id}/`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    });
  },
  alterarDadosPublicoAluno(payload) {
    return request.put(
      `/alunos/${payload.id}/atualizar_dados_publicos/`,
      payload.data
    );
  },
  matricularAluno(payload) {
    return request.post("/matricula/", payload);
  }
};
