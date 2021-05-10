<template>
  <div>
    <div class="row">
      <q-video
        allowfullscreen
        :ratio="16 / 9"
        :src="tratarUrlVimeo()"
        class="col-12 full-width"
      />
    </div>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <span class="text-subtitle1 text-weight-medium">{{
              cursoLocal.nome
            }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <span class="text-caption text-weight-medium text-grey-8">{{
              cursoLocal.criado_por
            }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-tabs
            v-model="tab"
            :breakpoint="0"
            active-color="primary"
            align="left"
            class="text-grey"
            dense
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab label="Aulas" name="aulas" />
          </q-tabs>
        </div>
      </div>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="aulas">
          <q-list>
            <div
              v-for="(topico, idxTopico) in cursoLocal.topicos"
              :key="'topico-' + topico.id"
            >
              <q-item-label class="topico_cabecalho text-grey-8">
                {{ topico.numero }}. {{ topico.nome }}
              </q-item-label>

              <q-list>
                <q-item
                  v-for="(aula, idxAula) in topico.aulas"
                  :key="'aula-' + aula.id"
                  :active="aulaAtual.id === aula.id"
                  active-class="item_aula_ativo"
                  clickable
                  @click="setAulaVideo(aula, idxAula, idxTopico)"
                >
                  <q-item-section class="numero_aula" side>
                    {{ aula.numero }}
                  </q-item-section>
                  <q-item-section>
                    <div class="row items-center">
                      <q-icon
                        v-if="
                          aula.hasOwnProperty('historico') &&
                            aula.historico.length
                        "
                        :color="aulaAtual.id === aula.id ? 'white' : 'primary'"
                        class="col-1"
                        name="fas fa-check-double"
                      />
                      <div class="col-11 q-pl-sm">
                        {{ aula.titulo }}
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "src/libs/utils";
import Vue from "vue";

export default {
  name: "AulasMobile",
  data() {
    return {
      tab: "aulas",
    };
  },
  computed: {
    ...mapState("cursos", ["curso", "aula"]),
    cursoLocal: {
      get() {
        return this.curso
      }
    },
    aulaAtual: {
      get() {
        return this.aula;
      }
    }
  },
  methods: {
    ...mapActions("cursos", ["getAulasCurso", "setAula", "aulaFinalizada"]),
    ...mapActions("layout", ["setMostrarCabecalho"]),
    async init() {
      let cursoId = this.$route.params.id;
      let payload = {
        id: cursoId
      };
      await this.getAulasCurso(payload);

      this.setAulaVideo(this.cursoLocal.topicos[0].aulas[0], null, null, true);
    },
    prepararUrlVideo(url) {
      return utils.alterarUrlWatchParaEmbedYoutube(url);
    },
    setAulaVideo(aula, idxAula, idxtopico, inicial = false) {
      let aula_ = Object.assign({}, aula);
      Vue.set(aula_, "url", this.prepararUrlVideo(aula.url));
      this.setAula(aula_);

      if (!inicial && !aula.historico.length) {
        let formHistoricoAula = {
          index_topico: idxtopico,
          index_aula: idxAula
        };
        setTimeout(() => {
          this.processarAulaFinalizada(aula, formHistoricoAula);
        }, 2000);
      }
    },
    processarAulaFinalizada(aula, formHistoricoAula) {
      const form = {
        data: {
          matricula: this.cursoLocal.matricula[0].id,
          aula: aula.id,
          finalizada: true
        },
        payloadHistoricoAula: formHistoricoAula
      };
      this.aulaFinalizada(form);
    },
    tratarUrlVimeo() {
      // 'https://player.vimeo.com/video/540443431'
      if (this.aulaAtual.video) {
        let u = this.aulaAtual.video.split("/"),
          t = u.length - 1,
          v = "https://player.vimeo.com/video/" + u[t];
        return v;
      }
      return this.aulaAtual.url;
    }
  },
  created() {
    this.setMostrarCabecalho(false);
    this.init();
  }
};
</script>

<style lang="scss">
.item_aula_ativo {
  color: white;
  background: $primary;

  .numero_aula {
    color: white !important;
    font-weight: 600;
  }
}
</style>
