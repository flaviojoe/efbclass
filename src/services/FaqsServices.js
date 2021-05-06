import request from "src/libs/request";

export default {
  getFAQs() {
    return request.get("/faqs/");
  },
  getFAQsFiltrados(search) {
    return request.get(`/faqs/?search=${search}`);
  },
  criarPergunta(pergunta) {
    return request.post("/faqs/", pergunta);
  }
};
