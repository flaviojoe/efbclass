<template>
  <div class="container_prova no-scroll">
    <div v-if="!loading" :class="[getAprovacao()[2] ? 'img_prova_1' : 'img_prova_0', 'img_prova']"/>
    <div class="relative-position">
      <q-toolbar-title class="bg-transparent q-pa-md">
        <div class="text-h5 text-center text-weight-bold text-white">
          Resultado
        </div>
      </q-toolbar-title>
      <transition-group
        enter-active-class="animated fadeInUp slow"
        leave-active-class="animated fadeOutDown slow"
      >
        <div key="parabens#1" class="container_parabens" v-if="animar.el1 && getAprovacao()[2]">
          <div class="row justify-center items-center">
            <q-btn round class="avatar_aluno cursor-none" color="white">
              <q-avatar size="70px" color="white">
                <img :src="avatar"/>
              </q-avatar>
            </q-btn>
          </div>
          <div class="row flex-center">
            <img src="~assets/trophy.svg" alt="parabens" class="img_finalizada"/>
          </div>
        </div>
      </transition-group>
      <transition-group
        :duration="1200"
        enter-active-class="animated fadeInUp slow"
        leave-active-class="animated fadeOutDown slow"
      >
        <div key="parabens#2" v-if="animar.el2 && getAprovacao()[2]">
          <div class="row q-mt-md justify-center">
            <div class="text-white text-h5 text-weight-medium">{{ getAprovacao()[0] }}</div>
          </div>
          <div class="row justify-center text-center">
            <div class="text-subtitle1 text-white col-10">
              {{ getAprovacao()[1] }}
            </div>
          </div>
          <template v-if="getAprovacao()[2]">
            <div class="row justify-center text-white">
              <div class="text-h4 text-weight-bold">{{ rank.qtd_acertos }}</div>
              <div class="text-h5 q-px-sm">/</div>
              <div class="text-h5 text-grey-3">{{ rank.qtd_perguntas }}</div>
            </div>
            <div class="row justify-center text-white">
              <div class="text-h5 text-weight-bold">{{ getNota() }}% de
                acerto!
              </div>
            </div>
          </template>
          <template v-if="getAprovacao()[2]">
            <div class="row justify-center text-white">
              <div class="text-subtitle1 text-grey-3">Seu Rank é</div>
            </div>
            <div class="row justify-center">
              <div class="posicao_rank">
                {{ rank.posicao }}
              </div>
            </div>
            <div class="row">
              <div class="posicao_rank_curso"></div>
            </div>
          </template>
        </div>
      </transition-group>
    </div>
    <div class="fixed-bottom absolute-bottom q-mb-lg q-mr-lg">
      <div class="row justify-end">
        <q-btn
          color="secondary"
          label="Voltar"
          no-caps
          rounded
          :to="{ name: 'Provas disponíveis'}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "PageEntregaProva",
  data() {
    return {
      avatar: "",
      animar: {
        el0: false,
        el1: false,
        el2: false
      }
    };
  },
  computed: {
    ...mapState("dashboards", ["rank", "loading"]),
    ...mapState("usuarios", ["user"])
  },
  methods: {
    ...mapActions("dashboards", ["getRankUsuarioPorCurso"]),
    carregarAvatar() {
      this.avatar = utils.getAvatar(this.user);
    },
    async init() {
      const prova = this.$store.state.provas.prova;
      const payload = {
        id: prova.questionario.curso.id
      };
      await this.getRankUsuarioPorCurso(payload);
      this.carregarAvatar();

      setTimeout(() => {
        this.animar.el1 = true;
        setTimeout(() => {
          this.animar.el2 = true;
        }, 800);
      }, 1000);
    },
    getNota() {
      return (this.rank.qtd_acertos / this.rank.qtd_perguntas) * 100;
    },
    getAprovacao() {
      return this.getNota() >= 70
        ?
        ["Parabéns", "Você conseguiu atigir a uma nota acima da média prevista!", true]
        :
        ["Infelizmente", "Você não conseguiu a pontuação a mínima! Se possível tente novamente...", false];
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
.container_prova {
  min-height: 100vh;

  .img_prova_0 {
    background: url('~assets/naofoidessavez.jpg');

    &.img_prova {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: .5;
      background-position: center;
      background-size: cover;
    }
  }

  .img_prova_1 {
    background: url('~assets/resultadoprova.svg');

    &.img_prova {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: .5;
    }
  }

  .container_parabens {
    margin-top: -15px;

    .img_finalizada {
      max-width: 200px;
      min-width: 150px;
    }

    .avatar_aluno {
      margin-bottom: -50px;
      top: 45px;
    }
  }

  .posicao_rank {
    position: absolute;
    font-size: 22px;
    font-weight: bolder;
    margin-top: 30px;
    margin-left: -10px;
    z-index: 1000;
  }

  .posicao_rank_curso {
    z-index: 1;
  }

  .posicao_rank_curso::before {
    content: '⭐️';
    position: absolute;
    font-size: 5.0rem;
    z-index: -1;
    left: 35%;
    margin-top: -15px;
  }
}

.slow {
  -webkit-animation-duration: 1.5s;
}
</style>
