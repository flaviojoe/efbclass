<template>
  <div class="container_rank">
    <div class="cabecalho_ranks">
      <div class="row flex justify-evenly">
        <div class="container_top_ranks">
          <TopRanks
            v-for="top in topRanksLocal"
            :key="top.usuario"
            :rank="top"
            somente-primeiro-nome
          />
        </div>
      </div>
    </div>

    <q-list class="q-mt-sm">
      <DemaisRanks v-for="rank in demaisRanksLocal" :key="rank.posicao" :rank="rank"/>
    </q-list>
  </div>
</template>

<script>
import DemaisRanks from "src/components/ranks/DemaisRanks.vue";
import TopRanks from "components/ranks/TopRanks";


export default {
  components: {TopRanks, DemaisRanks},
  name: "Rank",
  props: {
    tops: {
      type: [Object, Array],
      required: true
    },
    demais: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      topRanksLocal: this.tops,
      demaisRanksLocal: this.demais
    };
  }
};
</script>

<style lang="scss" scoped>
.cabecalho_ranks::v-deep {
  //height: 300px;
  height: 46.8vh;
  background-color: $primary;
  //width: 100%;
  width: 100vw;

  .container_top_ranks {
    margin-top: 65px !important;

    .ranks {
      margin-left: 30px;
      margin-right: 30px;
      text-align: center;
    }

    .rank2,
    .rank3 {
      top: 35px;
    }

    .top1 {
      position: absolute;
      top: -40px;
    }

    .colocacao_rank {
      position: absolute;
      top: 55px;
      border-radius: 50px;
    }

    .img_avatar {
      width: 64px;
      height: 64px;
      border: 3px solid white;
      border-radius: 100%;
    }

    .titulo_rank {
      position: absolute;
      top: 85px;
      left: -15px;
      font-size: 14px;
      width: 100px;
    }

    .pontuacao_rank {
      position: absolute;
      top: 115px;
      left: -12px;
      width: 150%;
      font-size: 16px;
      border: 1px solid white;
      padding: 5px;
      border-radius: 20px;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.15);

      .icone_pontuacao {
        color: #fcde94;
        margin-right: 5px;
        margin-left: 8px;
      }

      .valor_pontuacao {
        margin-left: 8px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 360px) {
  .cabecalho_ranks {
    .container_top_ranks {
      margin-top: 55px;

      .ranks {
        margin-left: 28px;
        margin-right: 28px;
        text-align: center;
      }

      .titulo_rank {
        width: 80px;
        left: -5px;
      }

      .pontuacao_rank {
        margin-top: 25px;
      }
    }
  }
}

@media (max-width: 320px) {
  .cabecalho_ranks {
    .container_top_ranks {
      .ranks {
        margin-left: 20px;
        margin-right: 20px;
        text-align: center;
      }

      .titulo_rank {
        font-size: 13px;
        left: -8px;
      }
    }
  }
}
</style>
