<template>
  <div class="area_questionario">
    <div class="q-pa-md text-subtitle2 text-blue-grey-2" style="font-size: .98em">
      {{ questionario.curso }}
    </div>
    <div class="q-px-md titulo_questionario">
      <div class="text-h6 text-white">
        Questão <span style="font-size: 1.3em; font-weight: bold">{{ step }}</span>/{{ formPerguntas.length }}
      </div>
    </div>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      contracted
      class="form_questionario"
      flat

    >
      <q-step
        v-for="(pergunta, index) in formPerguntas"
        :key="pergunta.id"
        :name="index + 1"
        class="perguntas"
        icon="fas fa-window-minimize"
        active-icon="fas fa-window-minimize"
        :done="step > index + 1"
        title=""
      >
        <div class="text-subtitle1 text-weight-medium">{{ pergunta.texto }}</div>

        <div class="opcoes">
          <q-option-group
            v-model="pergunta.id"
            :options="pergunta.respostas"
            color="white"
            keep-color
            class="opcoes_resposta"
            :rules="[val => !!val || 'Campo obrigatório']"
            @input="value => setFormResposta(value)"
          />
        </div>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation class="fixed-bottom">
          <div class="row justify-between">
            <q-btn
              flat
              icon="fas fa-power-off"
              color="white"
              label="Sair da prova"
              no-caps
              :to="{name:'Provas disponíveis'}"
            />
            <q-btn
              @click="step === formPerguntas.length ? processarRespostas() : $refs.stepper.next()"
              color="secondary"
              :label="step === formPerguntas.length ? 'Entregar prova' : 'Próximo'"
              no-caps
              rounded
            />
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { ERRO, notificacao } from "src/libs/notifications";
import { mapActions, mapState } from "vuex";

export default {
  name: "PageQuestionario",
  data() {
    return {
      pergunta: "",
      formPerguntas: [],
      formRespostas: [],
      step: 1
    };
  },
  computed: {
    ...mapState("provas", ["prova", "questionario"])
  },
  methods: {
    ...mapActions("provas", ["entregarProva"]),
    addFormResposta(elemento) {
      this.formRespostas.push({
        questionario_aluno_id: this.prova.id,
        pergunta_id: parseInt(elemento.split(":")[0]),
        resposta_id: parseInt(elemento.split(":")[1]),
        resposta_pergunta: elemento
      });
    },
    setFormResposta(v) {
      if (this.formRespostas.length > 0) {
        let pergunta_id = parseInt(v.split(":")[0]);
        this.formRespostas.filter((el, idx) => {
          if (el.pergunta_id === pergunta_id) {
            this.formRespostas.splice(idx, 1);
          }
        });
      }
      this.addFormResposta(v);
      console.log(this.formRespostas);
    },
    processarRespostas() {
      let qtdPerguntas = this.formPerguntas.length;
      if (qtdPerguntas === this.formRespostas.length) {
        // notificacao(REALIZADO_COM_SUCESSO, "Todas as perguntas respondidas");
        this.entregarProva(this.formRespostas);
      } else {
        notificacao(
          ERRO,
          "Falta responder alguma pergunta, verifique novamente!"
        );
      }
    }
  },
  beforeMount() {
    if (Object.keys(this.questionario).length) {
      Object.keys(this.questionario.questionario_perguntas).forEach(pk => {
        let pergunta = Object.assign(
          {},
          this.questionario.questionario_perguntas[pk].pergunta
        );
        this.formPerguntas.push(pergunta);
      });
    }
  }
};
</script>

<style lang="scss">
.area_questionario {
  min-height: 100vh;
}

.titulo_questionario {
  margin-bottom: -10px;
}

.form_questionario {
  border-radius: 12px;
  background-color: $primary;
  color: white;

}

.q-stepper__dot {
  background-color: transparent;
}

.q-stepper__tab {
  &.q-stepper__tab--done {
    .q-icon {
      color: white !important;
      font-weight: bolder;
    }
  }

  &.q-stepper__tab--active {
    .q-icon {
      color: $red-8 !important;
    }
  }

  .q-icon {
    color: rgba(255, 255, 255, .5) !important;
  }
}


.q-stepper--contracted .q-stepper__header .q-stepper__tab {
  padding: 0 !important;
}

.q-stepper__title,
.q-stepper__label.q-stepper__line.relative-position,
.q-stepper--contracted .q-stepper__tab:not(:last-child) .q-stepper__dot:after,
.q-stepper--horizontal .q-stepper__line:before,
.q-stepper--horizontal .q-stepper__line:after {
  display: none !important;
}


.opcoes {
  margin-top: 50px;
}

.opcoes_resposta {
  .q-radio {
    border: 1px solid $grey-4;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
