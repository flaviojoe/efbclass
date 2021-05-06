<template>
  <div class="area_registro full-width">
    <div class="container_registro flex wrap flex-center">
      <div class="wrap_registro flex wrap justify-between">
        <div class="row">
          <div class="imagem_logo">
            <img alt="logo" src="~assets/logo_sem fundo.png" />
          </div>
        </div>

        <form class="registro_form" @submit.prevent="processarRegistroForm">
          <span class="form_title text-weight-medium q-py-md">
            Registre-se
          </span>

          <span class="form_subtitle text-weight-medium text-grey-5 q-pb-lg">
            Para poder usar o e - FB Class...
          </span>

          <div class="row q-mb-sm">
            <q-input
              ref="username"
              v-model="registroForm.username"
              :rules="[val => val.length >= 4 || 'Campo obrigatório']"
              class="full-width"
              label="Matricula"
              lazy-rules
              outlined
              rounded
            >
              <template v-slot:append>
                <q-icon name="fas fa-user" />
              </template>
            </q-input>
          </div>

          <div class="row q-mb-sm">
            <q-input
              ref="email"
              v-model="registroForm.email"
              :rules="[
                val =>
                  isValidEmailAddress(val) ||
                  'Por favor insira um endereço de e-mail válido.'
              ]"
              class="full-width"
              label="E-mail"
              lazy-rules
              outlined
              rounded
            >
              <template v-slot:append>
                <q-icon name="fas fa-envelope" />
              </template>
            </q-input>
          </div>

          <div class="row q-mb-sm">
            <q-input
              ref="password"
              v-model="registroForm.password"
              :rules="[val => val.length >= 6 || 'Campo obrigatório']"
              class="full-width"
              label="Senha"
              lazy-rules
              outlined
              rounded
              type="password"
            >
              <template v-slot:append>
                <q-icon name="fas fa-key" />
              </template>
            </q-input>
          </div>

          <div class="row q-mb-sm">
            <q-input
              ref="first_name"
              v-model="registroForm.first_name"
              :rules="[val => !!val || 'Campo obrigatório']"
              class="full-width"
              label="Primeiro Nome"
              lazy-rules
              outlined
              rounded
            />
          </div>

          <div class="row q-mb-sm">
            <q-input
              ref="last_name"
              v-model="registroForm.last_name"
              :rules="[val => !!val || 'Campo obrigatório']"
              class="full-width"
              label="Último Nome"
              lazy-rules
              outlined
              rounded
            />
          </div>

          <div class="row q-mb-sm">
            <q-input
              ref="cpf"
              v-model="registroForm.cpf"
              :rules="[val => !!val || 'Campo obrigatório']"
              class="full-width"
              label="CPF"
              lazy-rules
              outlined
              rounded
              mask="###.###.###-##"
            />
          </div>

          <div class="row">
            <q-btn
              :disable="!is_completo"
              class="full-width q-pa-sm btn_registro"
              label="Registrar"
              no-caps
              rounded
              text-color="white"
              type="submit"
              unelevated
            />
          </div>
          <div class="row rodape-form">
            <div class="text-body2 text-weight-regular q-ml-md q-pa-md">
              <router-link
                :to="{ name: 'login' }"
                class="text-black texto_link rodape-titulo"
                >Já é registrado? Então clique aqui!
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapActions } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "PageRegistro",
  data: () => ({
    registroForm: {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      cpf: ""
    }
  }),
  methods: {
    ...mapActions("usuarios", ["registroUsuario"]),
    isValidEmailAddress(email) {
      return utils.validarEmail(email);
    },
    async processarRegistroForm() {
      this.$refs.username.validate();
      this.$refs.password.validate();
      this.$refs.first_name.validate();
      this.$refs.last_name.validate();
      this.$refs.email.validate();
      this.$refs.cpf.validate();
      if (
        !this.$refs.username.hasError &&
        !this.$refs.password.hasError &&
        !this.$refs.first_name.hasError &&
        !this.$refs.last_name.hasError &&
        !this.$refs.email.hasError &&
        !this.$refs.cpf.hasError
      ) {
        let form = {
          matricula: this.registroForm.username,
          username: this.registroForm.username,
          email: this.registroForm.email,
          password: this.registroForm.password,
          first_name: this.registroForm.first_name,
          last_name: this.registroForm.last_name,
          cpf: this.registroForm.cpf.replaceAll(".", "").replace("-", "")
        };
        await this.registroUsuario(form);
      }
    },
    limparStorage() {
      LocalStorage.clear();
    }
  },
  computed: {
    is_completo() {
      return (
        this.registroForm.username !== "" &&
        this.registroForm.password !== "" &&
        this.registroForm.first_name !== "" &&
        this.registroForm.last_name !== "" &&
        this.registroForm.email !== "" &&
        this.registroForm.cpf !== ""
      );
    }
  },
  created() {
    this.limparStorage();
  }
};
</script>

<style lang="scss" scoped>
.container_registro::v-deep {
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

.wrap_registro {
  width: 500px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  padding: 100px 50px;
}

.imagem_registro {
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

.registro_form {
  width: 380px;
  overflow: hidden !important;
  margin-right: 5px !important;

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

.texto_link {
  margin-left: 25px !important;
}

.btn_registro {
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
  .wrap_registro {
    padding: 100px 50px;
    overflow: hidden !important;
  }

  .registro_form {
    width: 100%;
    overflow: hidden !important;
    margin-right: 1px !important;
  }

  .imagem_logo {
    position: absolute;
    margin-top: -80px;
    margin-left: calc(50px + 14%) !important;
  }
}

@media (max-width: 768px) {
  .wrap_registro {
    padding: 100px 50px;
    overflow: hidden !important;
  }

  .registro_form {
    width: 100%;
    overflow: hidden !important;
    margin-right: 1px !important;
  }

  .imagem_logo {
    position: absolute;
    margin-top: -80px;
    margin-left: calc(50px + 15%) !important;
  }
}

@media (max-width: 576px) {
  .wrap_registro {
    padding: 100px 40px;
    overflow: hidden !important;
  }

  .imagem_logo {
    position: absolute;
    margin-top: -80px;
    margin-left: calc(50px + 18%) !important;
  }

  .registro_form {
    width: 360px;
    overflow: hidden !important;
    margin-right: calc(-50px + 15%) !important;
  }
}

@media (max-width: 480px) {
  .imagem_logo {
    position: absolute;
    margin-top: -80px;
    margin-left: calc(50px + 15%) !important;
  }
}

@media (max-width: 360px) {
  .wrap_registro {
    padding: 50px 30px;
    overflow: hidden !important;
  }

  .imagem_logo {
    margin-top: -50px;
    margin-left: calc(10px + 20%) !important;
  }

  .registro_form {
    margin-top: 10px;
    margin-left: -5px;

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
    margin-left: -8px;

    .rodape-titulo {
      font-size: 12px !important;
    }
  }
}

@media (max-width: 320px) {
  .imagem_logo {
    margin-top: -50px;
    margin-left: calc(22px + 15%) !important;
  }

  .rodape-form {
    margin-left: -25px;

    .rodape-titulo {
      font-size: 12px !important;
    }
  }
}
</style>
