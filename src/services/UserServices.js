import request from "src/libs/request";

export default {
  async loginUsuario(payload) {
    return await request.post("/auth/login", payload);
  },
  async registroUsuario(payload) {
    return await request.post("/auth/register", payload);
  },
  async logout() {
    return await request.post("/auth/logout");
  },
  async alterarSenha(payload) {
    return await request.put(
      `/auth/change_password/${payload.id}`,
      payload.data
    );
  },
  async alterarEmail(payload) {
    return await request.put(`/auth/change_email/${payload.id}`, payload.data);
  }
};
