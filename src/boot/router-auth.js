import { LocalStorage } from "quasar";

export default ({store, router}) => {
  router.beforeEach((to, from, next) => {
    if (to.name !== "login") {
      let usuario = "";
      try {
        usuario = store.state.usuarios.user;
        if (!Object.keys(usuario).length) {
          redirecionarPaginaLogin(next);
        } else {
          next();
        }
      } catch (e) {
        redirecionarPaginaLogin(next)
      }
    } else {
      next();
    }
  });
};

function redirecionarPaginaLogin(next) {
  setTimeout(() => {
    next({name: "login"});
  }, 300);
}
