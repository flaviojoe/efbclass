import Store from "src/store/index";
import Router from "src/router";
import { LOGIN_EXPIRADO, notificacao } from "src/libs/notifications";
import { LocalStorage } from "quasar";

export function getToken() {
  let user = Store().state.usuarios.user;
  console.log(user);
  return user.hasOwnProperty("token") ? user.token : "";
}

export function tokenExpirado() {
  setTimeout(() => {
    LocalStorage.clear();
    Router().replace("/autenticacao").catch(error => {
    });
    setTimeout(() => {
      location.reload();
    }, 300);

  }, 1000);
  notificacao(LOGIN_EXPIRADO);
}
