<template>
  <div class="q-pa-md">
    <q-list class="lista_cursos">
      <div
        v-for="prova in provasDisponiveis"
        :key="prova.id">
        <q-item
          v-if="checkDataCurso"
          v-ripple
          clickable
          @click="!prova.finalizado ? prepararQuestionario(prova) : verResultado(prova)"
          :class="[
          'item_prova',
          !prova.finalizado ? 'cursor-pointer' : '',
          'text-left'
        ]"
        >
          <q-item-section avatar>
            <q-avatar rounded size="72px">
              <q-img
                :alt="prova.questionario.curso.nome"
                :src="prova.questionario.curso.imagem"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-mt-xs">
            <q-item-label>{{ prova.questionario.curso.nome }}</q-item-label>
            <q-item-label
              caption
              class="text-weight-medium"
            >
              {{ prova.questionario.curso.criado_por.first_name }}
              {{ prova.questionario.curso.criado_por.last_name }}
            </q-item-label>
            <q-item-label
              caption
              class="text-weight-medium"
            >
              Matriculado em: {{ prova.matricula.criado_em | formataData }}
            </q-item-label>
            <q-item-label
              caption
              class="text-weight-medium"
            >
              Status prova:
              {{ !prova.finalizado ? "Não realizada" : "Realizada" }}
            </q-item-label>
            <q-item-label
              caption
              class="text-weight-medium"
            >
              {{ getAcertos(prova) }}
            </q-item-label>
            <q-item-label
              v-if="getAprovacao(prova).length"
            >
              <q-badge :color="getAprovacao(prova)[1]" floating rounded class="badge_aprovacao">
                <q-icon :name="getAprovacao(prova)[2]" class="q-mr-xs"/>
                {{ getAprovacao(prova)[0] }}
              </q-badge>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
import utils from "src/libs/utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PageProvas",
  data() {
    return {};
  },
  methods: {
    ...mapActions("provas", [
      "getProvasDisponiveis",
      "setQuestionarioID",
      "setProva"
    ]),
    async init() {
      await this.getProvasDisponiveis();
      this.setProva(null);
    },
    checkDataCurso() {
      return Object.keys(this.prova.questionario.curso).length;
    },
    prepararQuestionario(prova) {
      let form = {
        id: prova.questionario.id
      };
      this.setProva(prova);
      this.setQuestionarioID(form);
    },
    verResultado(prova) {
      this.setProva(prova);
      this.$router.push({"name": "Resultado Prova"});
    },
    getNota(prova) {
      return (prova.qtd_respostas_certas / prova.qtd_perguntas) * 100;
    },
    getAcertos(prova) {
      return prova.qtd_respostas_certas > 0
        ? "Acertos %: " +
        this.getNota(prova)
        : "";
    },
    getAprovacao(prova) {
      return prova.hasOwnProperty("finalizado") && prova.finalizado ?
        prova.qtd_respostas_certas > 0 && this.getNota(prova) >= 70 ? ["Aprovado", "primary", "fas fa-thumbs-up"]
          : ["Reprovado", "negative", "fas fa-thumbs-down"]
        : [];
    }
  },
  computed: {
    ...mapGetters("provas", ["provasDisponiveis"])
  },
  created() {
    this.init();
  },
  filters: {
    formataData(value) {
      return utils.formataData(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.item_prova {
  border-bottom: 1px solid $grey-4;
}

.badge_aprovacao {
  font-size: 10px !important;
}
</style>
