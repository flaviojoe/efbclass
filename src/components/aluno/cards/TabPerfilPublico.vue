<template>
  <div>
    <CabecalhoCartao
      subtitulo="Informações sobre você"
      titulo="Perfil público"
    />

    <q-separator />

    <q-card-section>
      <div class="text-h7 q-mb-md text-weight-medium">Dados básicos</div>

      <div class="q-gutter-y-sm column">
        <q-input
          ref="nome"
          v-model="formAluno.nome"
          :rules="[val => !!val || 'Campo obrigatório']"
          class="q-mb-none"
          label="Nome"
          outlined
          placeholder="Nome"
        />

        <DateInput
          :data.sync="formAluno.dta_nasc"
          labelData="Data de Nascimento"
        />

        <q-card-actions align="right" class="q-mb-sm">
          <q-btn
            color="primary"
            icon="fas fa-save"
            label="Salvar"
            @click="processarAlterarDadosPublicosForm"
          />
        </q-card-actions>

        <TextInputDisabled
          :valor="aluno.matricula"
          label="Matricula"
          placeholder="Matricula"
        />
        <TextInputDisabled
          :valor="aluno.empresa"
          label="Empresa"
          placeholder="Empresa"
        />
        <TextInputDisabled
          :valor="aluno.departamento"
          label="Departamento"
          placeholder="Departamento"
        />
        <TextInputDisabled
          :valor="aluno.setor"
          label="Setor"
          placeholder="Setor"
        />
        <TextInputDisabled
          :valor="aluno.regional"
          label="Regional"
          placeholder="Regional"
        />
        <TextInputDisabled
          :valor="aluno.equipe"
          label="Equipe"
          placeholder="Equipe"
        />
      </div>
    </q-card-section>
  </div>
</template>

<script>
import TextInputDisabled from "components/inputs/TextInputDisabled";
import DateInput from "components/inputs/DateInput";
import CabecalhoCartao from "components/aluno/cards/CabecalhoCartao";
import utils from "src/libs/utils";
import { mapActions } from "vuex";

export default {
  name: "TabPerfilPublico",
  components: { CabecalhoCartao, DateInput, TextInputDisabled },
  props: {
    aluno: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alunoLocal: this.aluno,
      formAluno: {
        nome: "",
        dta_nasc: ""
      }
    };
  },
  methods: {
    ...mapActions("alunos", ["alterarDadosPublicoAluno"]),
    async processarAlterarDadosPublicosForm() {
      this.$refs.nome.validate();
      if (!this.$refs.nome.hasError) {
        let form = {
          id: this.alunoLocal.id,
          data: {
            nome: this.formAluno.nome,
            dta_nasc: utils.ajusteDataEnvio(this.formAluno.dta_nasc)
          }
        };
        await this.alterarDadosPublicoAluno(form);
      }
    },
    setForm() {
      if (Object.keys(this.alunoLocal).length) {
        this.formAluno.nome = this.alunoLocal.nome;
        this.formAluno.dta_nasc = utils.ajusteDataInput(
          this.alunoLocal.dta_nasc
        );
      }
    }
  },
  watch: {
    aluno: {
      handler: function() {
        this.alunoLocal = Object.assign({}, this.aluno);
        this.setForm();
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
