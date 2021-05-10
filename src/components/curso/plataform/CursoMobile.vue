<template>
  <div class="q-pa-md">
    <div class="container_cabecalho_curso"></div>
    <div class="cabecalho_curso">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 q-mb-md">
          <span class="titulo_curso text-subtitle1 text-weight-medium">{{
              curso.nome
            }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-8">
          <div class="col-xs-12 col-sm-12 col-md-6 q-mt-xs">
            <q-icon class="q-pr-sm" name="fas fa-bookmark"/>
            <span class="text-body text-weight-regular">{{
                curso.categoria
              }}</span>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 q-mt-xs">
            <q-icon class="q-pr-sm" name="fas fa-calendar-plus"/>
            <span>Criado em: </span>
            <span>{{ curso.criado_em | formataData }}</span>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 q-mt-xs">
            <q-icon class="q-pr-sm" name="fas fa-exclamation-circle"/>
            <span>Última atualização em: </span>
            <span>{{ curso.modificado_em | formataData }}</span>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 q-mt-xs">
            <q-icon class="q-pr-sm" name="fas fa-globe-americas"/>
            <span>Português</span>
          </div>
        </div>

        <div class="col-xs-12 col-sm-3 col-md-3 q-mt-md">
          <div class="container_img_curso">
            <q-card class="q-pa-sm cartao_img_curso">
              <q-img :src="curso.imagem" class="imagem_detalhe_curso" position="center" width="100%"/>
              <q-btn
                v-if="!curso.e_matriculado"
                class="q-mt-md full-width"
                color="primary"
                icon="fas fa-user-graduate"
                label="Matricular"
                unelevated
                @click="processarFormMatricula"
              />
              <q-btn
                v-else
                class="q-mt-md full-width"
                color="primary"
                label="Ir para aulas"
                unelevated
                @click="aulasCurso"
              />
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div class="detalhamento_curso">
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2 q-mt-md">
          <span class="text-subtitle1">Este curso inclui</span>

          <div class="col-xs-12">
            <q-list class="text-grey-8">
              <q-item class="item_descricao">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="fas fa-play-circle"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>20 aulas em vídeo</q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="item_descricao">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="fas fa-mobile"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Acesse pelo celular ou Desktop</q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="item_descricao">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="fas fa-certificate"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>Certificado de conclusão</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2 q-mt-md">
          <span class="text-subtitle1 q-mb-xs">Descrição</span>

          <div class="col-xs-12 q-mt-md">
            <span class="text-body2">
              {{
                curso.descricao
                  | truncarStringComExpansor(200, mostrarDescricao)
              }}
            </span>
          </div>
          <q-btn
            :label="mostrarDescricao ? 'Mostrar menos' : 'Mostrar mais'"
            class="q-mt-sm"
            color="primary"
            dense
            flat
            @click="mostrarDescricao = !mostrarDescricao"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2 q-mt-md">
          <span class="text-subtitle1 q-mb-xs">Grade Curricular</span>
          <div class="col-xs-12 q-mt-md">
            <q-list class="lista_grade">
              <q-expansion-item
                v-for="topico in curso.topicos"
                :key="topico.id"
                :label="`${topico.numero}. ${topico.nome}`"
                expand-separator
                header-class="cabecalho_lista_grade"
              >
                <q-list>
                  <q-item v-for="aula in topico.aulas" :key="`aula-${aula.id}`">
                    <q-item-section side>
                      <q-item-label>{{ aula.numero }}</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-avatar
                        icon="fas fa-play-circle"
                        text-color="primary"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ aula.titulo }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapActions, mapState } from "vuex";

export default {
  name: "CursoMobile",
  data() {
    return {
      tab: "geral",
      mostrarDescricao: false
    };
  },
  computed: {
    ...mapState("cursos", ["curso", "loading"])
  },
  methods: {
    ...mapActions("cursos", ["getCurso"]),
    // ...mapActions("cursos", ["getAulasCurso"]),
    ...mapActions("alunos", ["matricularAluno"]),
    ...mapActions("layout", ["setMostrarCabecalho", "setMostrarNotificacoes", "setClassColorHeader"]),
    async init() {
      await this.getCurso({id: this.curso.id});
      // await this.getAulasCurso({id: this.curso.id});
    },
    setCabecalhoSemCor() {
      this.setMostrarNotificacoes(true);
      this.setClassColorHeader('text-white');
    },
    async processarFormMatricula() {
      let formMatricula = {
        curso: this.curso.id
      };
      await this.matricularAluno(formMatricula);
    },
    aulasCurso() {
      this.$router
        .push({name: "Aulas"})
        .catch(err => {
        });
    }
  },
  filters: {
    formataData(value) {
      return date.formatDate(value, "MM/YYYY");
    },
    truncarStringComExpansor(value, length, expansor) {
      if (expansor) {
        return value;
      }
      return value.length > length ? value.slice(0, length) : value;
    }
  },
  created() {
    this.setCabecalhoSemCor();
    this.init();
    if (!Object.keys(this.curso).length) {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.imagem_detalhe_curso {
  background-size: cover !important;
  background-position: center !important;
}

.cartao_curso {
  border-radius: 20px;
  margin-top: 20px;
}

.cabecalho_curso {
  position: relative;
  color: white;
  margin-top: 1.5rem;
}

.titulo_curso {
  font-size: 1.5rem;
}

.item_descricao {
  margin-bottom: -10px !important;
}

.lista_grade::v-deep {
  .q-expansion-item::v-deep {
    border: 1px solid $grey-4;

    &:first-child {
      border-radius: 10px 10px 0 0;
    }

    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }

  .q-expansion-item--collapsed {
    background-color: white;
  }

  .q-expansion-item--expanded {
    .cabecalho_lista_grade {
      background-color: white;
      font-weight: 500;
    }
  }
}

.container_img_curso::v-deep {
  margin-top: -3.3rem;

  .cartao_img_curso {
    border-radius: 12px;
  }
}

.container_cabecalho_curso {
  position: absolute;
  height: 300px;
  background-color: $primary;
  top: 0;
  right: 0;
  left: 0;
}

@media (max-width: $breakpoint-xs-max) {
  .cabecalho_curso {
    margin-top: 0.5rem;
  }
  .container_img_curso {
    margin-top: 0.8rem;
  }
}
</style>
