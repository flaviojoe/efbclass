<template>
  <div class="container_aulas_curso">
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div class="col-10">
          <div class="text-h5 text-weight-medium">
            {{ cursoLocal.nome }}
          </div>
        </div>
        <div class="col-2">
          <q-btn
            label="Conteúdo do curso"
            no-caps
            icon="fas fa-play"
            color="primary"
            dense
            flat
            rounded
            @click="toggleMenuDireito"
          />
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div v-if="aulaAtual.arquivo_video">
        <div class="container_video_player"></div>
        <div class="col-12 full-width">
          <q-media-player
            type="video"
            background-color="black"
            :autoplay="false"
            :show-big-play-button="true"
            :sources="getSourceVideo()"
            class="aula_video"
            mobile-mode
          >
          </q-media-player>
        </div>
      </div>
      <div v-else>
        <q-video
          allowfullscreen
          :ratio="16 / 7"
          :src="getSourceVideo()"
          class="col-12 full-width"
        />
      </div>
    </div>

    <div class="row q-px-md q-pt-md">
      <div class="col-10">
        <div class="text-h6">{{ aulaAtual.titulo }}</div>
      </div>
    </div>
    <div
      v-if="Object.keys(aulaAtual).length &&
            aulaAtual.hasOwnProperty('historico')"
      class="row q-pa-md q-gutter-x-md">
      <q-icon :color="aulaAtual.historico.length ? 'primary' : 'grey-5'" size="xs" name="fas fa-check-double"/>
      <div v-if="aulaAtual.historico.length" class="text-subtitle2">
        {{ aulaAtual.historico.length ? "Aula finalizada" : "" }}
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-12">
        <q-card class="cartao_aula_curso">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            no-caps
          >
            <q-tab name="sobrecurso" label="Sobre curso"/>
            <q-tab name="materiais" label="Materias"/>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="sobrecurso">
              <div class="text-h6 q-pb-md">Descrição do curso</div>
              <div class="text-body2 text-grey-10">{{ cursoLocal.descricao }}</div>
            </q-tab-panel>

            <q-tab-panel name="materiais">
              <div class="row" v-if="Object.keys(materiaisLocal).length">
                <q-list class="col-12">
                  <q-item
                    v-for="material in materiaisLocal"
                    :key="material.id"
                  >
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white" icon="fas fa-file"></q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ material.nome }}</q-item-label>
                      <q-item-label caption>{{ material.tipo }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        icon="fas fa-download"
                        round
                        color="primary"
                        @click="downloadMaterial(material)"
                      />
                      <q-tooltip>
                        Clique para baixar o arquivo.
                      </q-tooltip>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>


    <div v-if="Object.keys(cursoLocal).length && Object.keys(cursoLocal.topicos).length">
      <PainelDireito/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "src/libs/utils";
import Vue from "vue";
import PainelDireito from "components/layouts/PainelDireito";
import { openURL } from "quasar";

export default {
  name: "AulasDesktop",
  components: {PainelDireito},
  data() {
    return {
      menuDireito: true,
      tab: "sobrecurso"
    };
  },
  computed: {
    ...mapState("cursos", ["curso", "aula", "materiais"]),
    cursoLocal: {
      get() {
        return this.curso;
      }
    },
    aulaAtual: {
      get() {
        return this.aula;
      }
    },
    materiaisLocal: {
      get() {
        return this.materiais;
      }
    }
  },
  methods: {
    ...mapActions("layout", ["setMenuDireito"]),
    ...mapActions("cursos", ["getAulasCurso", "setAula", "aulaFinalizada", "getMateriaisDoCurso"]),
    downloadMaterial(material) {
      openURL(material.arquivo);
    },
    async carregarMateriais() {
      let payload = {
        id: this.cursoLocal.id
      };
      await this.getMateriaisDoCurso(payload);
    },
    toggleMenuDireito() {
      this.menuDireito = !this.menuDireito;
      this.setMenuDireito(this.menuDireito);
    },
    async init() {
      let cursoId = this.$route.params.id;
      let payload = {
        id: cursoId
      };
      await this.getAulasCurso(payload);

      this.setAulaVideo(this.cursoLocal.topicos[0].aulas[0], null, null, true);

      await this.carregarMateriais();

    },
    getSourceVideo() {
      if (this.aulaAtual.arquivo_video) {
        let video = [
          {
            src: this.aulaAtual.arquivo_video,
            type: "video/mp4"
          }
        ];
        return video;
      }
      return this.tratarUrlVimeo();
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
          curso: this.cursoLocal.id,
          // matricula: this.cursoLocal.matricula[0].id,
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
    this.init();
  }
};
</script>

<style lang="scss">
.container_aulas_curso {
  .container_video_player {
    position: absolute;
    background-color: black;
    width: 100vw;
    left: 0;
    height: 350px;
  }

  .cartao_aula_curso {
    border-radius: 10px;
  }

  .aula_video {
    width: 100%;
    height: 350px !important;

    video {
      width: 67vw !important;
    }
  }
}

.heartbeat {
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
}

/* ----------------------------------------------
   * Generated by Animista on 2020-2-18 9:54:8
   * Licensed under FreeBSD License.
   * See http://animista.net/license for more info.
   * w: http://animista.net, t: @cssanimista
   * ---------------------------------------------- */

/**
     * ----------------------------------------
     * animation heartbeat
     * ----------------------------------------
     */
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
</style>
