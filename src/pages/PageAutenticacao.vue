<template>
  <q-layout class="pg_autenticacao">
    <div class="area_login full-width">
      <div class="container_login flex wrap flex-center">
        <div class="wrap_login flex wrap justify-between">
          <div class="imagem_login">
            <img alt="customer-review" src="~assets/login.svg"/>
          </div>

          <div class="row">
            <div class="imagem_logo">
              <img alt="logo" src="~assets/logo_sem fundo.png"/>
            </div>
          </div>

          <form class="login_form" @submit.prevent="processarAutenticacaoForm">
          <span class="form_title text-weight-medium q-py-md">
            Entre
          </span>

            <span class="form_subtitle text-weight-medium text-grey-5 q-pb-lg">
            Para poder usar o e - FB Class...
          </span>

            <div class="row q-mb-sm">
              <q-input
                ref="username"
                v-model="autenticacaoForm.username"
                :rules="[val => val.length >= 5 || 'Campo obrigatório']"
                class="full-width"
                label="Usuário"
                lazy-rules
                outlined
                rounded
              >
                <template v-slot:append>
                  <q-icon name="fas fa-user"/>
                </template>
              </q-input>
            </div>

            <div class="row q-mb-sm">
              <q-input
                ref="password"
                v-model="autenticacaoForm.password"
                :rules="[val => val.length >= 6 || 'Campo obrigatório']"
                class="full-width"
                label="Senha"
                lazy-rules
                outlined
                rounded
                type="password"
              >
                <template v-slot:append>
                  <q-icon name="fas fa-key"/>
                </template>
              </q-input>
            </div>

            <div class="row">
              <q-btn
                :disable="!is_completo"
                class="full-width q-pa-sm btn_login"
                label="Entrar"
                no-caps
                rounded
                text-color="white"
                type="submit"
                unelevated
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { LocalStorage } from "quasar";

export default {
  name: "PageAutenticacao",
  data: () => ({
    autenticacaoForm: {
      username: "",
      password: ""
    }
  }),
  methods: {
    ...mapActions("usuarios", ["loginUsuario"]),
    processarAutenticacaoForm() {
      this.$refs.username.validate();
      this.$refs.password.validate();
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        this.loginUsuario(this.autenticacaoForm);
      }
    },
    limparStorage() {
      LocalStorage.clear();
    }
  },
  computed: {
    is_completo() {
      return (
        this.autenticacaoForm.username !== "" &&
        this.autenticacaoForm.password !== ""
      );
    }
  },
  created() {
    this.limparStorage();
  }
};
</script>

<style lang="scss" scoped>
.container_login::v-deep {
  min-height: 100vh;
  background-image: linear-gradient(
      60deg,
      #3d3393 0%,
      #2b76b9 37%,
      #2cacd1 65%,
      #35eb93 100%
  );
  padding: 15px;
}

.wrap_login {
  width: 960px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  padding: 100px 120px;
}

.imagem_login {
  width: 316px;

  img {
    max-width: 100%;
  }
}

.imagem_logo {
  position: absolute;
  margin-top: -80px;
  margin-left: 10% !important;

  img {
    height: 100px;
    max-width: 100%;
  }
}

.login_form {
  width: 290px;
  overflow: hidden !important;

  .form_title {
    font-size: 24px;
    line-height: 1.2;

    width: 100%;
    display: block;
  }

  .form_subtitle {
    font-size: 16px;
    width: 100%;
    display: block;
  }
}

.btn_login {
  background-image: linear-gradient(
      60deg,
      #3d3393 0%,
      #2b76b9 37%,
      #2cacd1 65%,
      #35eb93 100%
  );
  font-size: 16px;
  letter-spacing: 1px;
}

@media (max-width: 992px) {
  .wrap_login {
    padding: 100px 50px;
    overflow: hidden !important;
  }

  .imagem_login {
    width: 35%;
  }

  .login_form {
    width: 50%;
    overflow: hidden !important;
  }
}

@media (max-width: 768px) {
  .wrap_login {
    padding: 100px 50px;
    overflow: hidden !important;
  }

  .imagem_login {
    display: none;
  }

  .login_form {
    width: 100%;
    overflow: hidden !important;
  }

  .imagem_logo {
    position: absolute;
    margin-top: -80px;
    margin-left: calc(50px + 25%) !important;
  }
}

@media (max-width: 576px) {
  .wrap_login {
    padding: 100px 40px;
    overflow: hidden !important;
  }

  .imagem_logo {
    position: absolute;
    margin-top: -80px;
    margin-left: 120px !important;
  }
}

@media (max-width: 360px) {
  .wrap_login {
    padding: 50px 20px;
    overflow: hidden !important;
  }

  .imagem_logo {
    margin-top: -50px;
    margin-left: calc(10px + 25%) !important;
  }

  .login_form {
    margin-top: 10px;

    .form_title {
      font-size: 18px;
      margin-top: 25px;
    }

    .form_subtitle {
      font-size: 14px;
      margin-bottom: -10px;
    }
  }

  .rodape-form {
    margin-bottom: -15px;
  }
}

@media (max-width: 320px) {
  .imagem_logo {
    margin-left: calc(1px + 24%) !important;
  }

  .rodape-titulo {
    font-size: 12px !important;
  }
}
</style>
