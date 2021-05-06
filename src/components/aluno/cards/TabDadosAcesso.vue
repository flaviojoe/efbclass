<template>
  <div>
    <CabecalhoCartao
      subtitulo="Informações de acesso e e-mail"
      titulo="Dados de Acesso"
    />

    <q-separator />

    <q-card-section>
      <div class="text-h7 q-mb-md text-weight-medium">Dados básicos</div>

      <div class="row q-mb-sm">
        <q-input
          v-model="email"
          class="full-width"
          disable
          label="E-mail Atual"
          outlined
          placeholder="E-mail Atual"
        >
          <template v-slot:append>
            <q-icon name="fas fa-envelope" />
          </template>
        </q-input>
      </div>

      <div class="row q-mb-sm">
        <q-input
          ref="new_email"
          v-model="formAlterarEmail.email"
          :rules="[
            val =>
              isValidEmailAddress(val) ||
              'Por favor insira um endereço de e-mail válido.'
          ]"
          class="full-width"
          label="Novo E-mail"
          outlined
          placeholder="Novo E-mail"
        >
          <template v-slot:append>
            <q-icon name="fas fa-envelope" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="q-mr-sm">
      <q-btn
        color="primary"
        icon="fas fa-save"
        label="Alterar E-mail"
        @click="processarAlterarEmailForm"
      />
    </q-card-actions>

    <q-card-section>
      <div class="row q-mb-sm">
        <q-input
          ref="old_password"
          v-model="formAlterarSenha.old_password"
          :rules="[val => val.length >= 6 || 'Campo obrigatório']"
          class="full-width"
          label="Senha atual"
          lazy-rules
          outlined
          type="password"
        >
          <template v-slot:append>
            <q-icon name="fas fa-key" />
          </template>
        </q-input>
      </div>

      <div class="row q-mb-sm">
        <q-input
          ref="new_password"
          v-model="formAlterarSenha.new_password"
          :rules="[val => val.length >= 6 || 'Campo obrigatório']"
          class="full-width q-py-none"
          label="Nova Senha"
          lazy-rules
          outlined
          type="password"
        >
          <template v-slot:append>
            <q-icon name="fas fa-key" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="q-mb-sm q-mr-sm">
      <q-btn
        color="primary"
        icon="fas fa-save"
        label="Alterar Senha"
        @click="processarAlterarSenhaForm"
      />
    </q-card-actions>
  </div>
</template>

<script>
import utils from "src/libs/utils";
import { mapActions } from "vuex";
import CabecalhoCartao from "components/aluno/cards/CabecalhoCartao";

export default {
  name: "TabDadosAcesso",
  components: { CabecalhoCartao },
  props: {
    aluno: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alunoLocal: this.aluno,
      email: "",
      formAlterarSenha: {
        old_password: "",
        new_password: ""
      },
      formAlterarEmail: {
        email: ""
      }
    };
  },
  methods: {
    ...mapActions("usuarios", ["alterarSenha", "alterarEmail"]),
    async processarAlterarSenhaForm() {
      this.$refs.old_password.validate();
      this.$refs.new_password.validate();
      if (
        !this.$refs.old_password.hasError &&
        !this.$refs.new_password.hasError
      ) {
        let form = {
          id: this.aluno.usuario.id,
          data: {
            old_password: this.formAlterarSenha.old_password,
            password: this.formAlterarSenha.new_password,
            password2: this.formAlterarSenha.new_password
          }
        };
        await this.alterarSenha(form);
      }
    },
    isValidEmailAddress(email) {
      return utils.validarEmail(email);
    },
    async processarAlterarEmailForm() {
      this.$refs.new_email.validate();
      if (!this.$refs.new_email.hasError) {
        let form = {
          id: this.aluno.usuario.id,
          data: {
            email: this.formAlterarEmail.email
          }
        };
        await this.alterarEmail(form);
      }
    },
    setEmail() {
      if (Object.keys(this.alunoLocal).length) {
        this.email = this.alunoLocal.usuario.email;
      }
    }
  },
  watch: {
    aluno: {
      handler: function() {
        this.alunoLocal = Object.assign({}, this.aluno);
        this.setEmail();
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
