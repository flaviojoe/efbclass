import request from "src/libs/request";

export default {
  getProvasAluno() {
    return request.get("/provas/");
  },
  getProvaAluno(payload) {
    return request.get(`/provas/${ payload.id }`);
  },
  getQuestionarioProva(payload) {
    return request.get(`/questionarios/${ payload.id }/`);
  },
  entregarProva(payload) {
    return request.post("/entrega_provas/", payload);
  }
};
