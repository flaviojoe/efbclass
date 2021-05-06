<template>
  <div class="container_rank_ds full-width">
    <div class="row flex justify-evenly q-mb-xl q-gutter-y-lg" v-if="Object.keys(topRanksLocal).length">
      <q-card
        v-for="top in topRanksLocal"
        :key="top.posicao"
        class="cartao_top_ranks col-3">
        <q-card-section>
          <q-btn
            fab
            flat
            icon="fas fa-crown"
            class="absolute no-pointer-events"
            :class="`icone_top_ranks${top.posicao}`"
            style="top: 0; right: 12px; transform: translateY(-60%);"
          />

          <div class="row no-wrap justify-center">
            <q-avatar size="80px">
              <q-img class="img_avatar" :src="top.avatar"/>
            </q-avatar>
          </div>

          <div class="row no-wrap justify-center q-mt-md text-subtitle1 text-weight-regular">
            {{ top.nome }}
          </div>

          <div class="row no-wrap justify-center text-subtitle1 text-weight-regular">
            <q-chip color="primary" text-color="white" icon="fas fa-medal">
              {{ top.posicao }}
            </q-chip>
          </div>

          <div class="row q-mt-sm">
            <div class="col-12 text-h4 text-center text-weight-medium">
              {{ top.pontuacao }}
            </div>
            <div class="col-12 text-center text-body2 text-grey-7">
              Pontuação
            </div>
          </div>

        </q-card-section>
      </q-card>
    </div>
    <div class="text-h5 q-mt-lg text-grey-10">Demais ranks</div>
    <div class="row">
      <q-card class="cartao_demais_ranks_ds q-mt-lg col-sm-12 col-md-6" v-if="Object.keys(demaisRanksLocal).length">
        <q-markup-table class="q-mt-sm">
          <thead>
          <tr>
            <th class="text-left">Posição</th>
            <th class="text-left">Nome</th>
            <th class="text-left">Pontuação</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="rank in demaisRanksLocal" :key="rank.posicao"
            class="q-mb-sm">
            <td class="text-left">
              {{ rank.posicao }}
            </td>
            <td class="text-left">
              <div class="row items-center">
                <div class="col-3">
                  <q-avatar>
                    <img :src="rank.avatar"/>
                  </q-avatar>
                </div>
                <div class="col-8">
                  {{ rank.nome }}
                </div>
              </div>
            </td>

            <td class="text-left">
              <div class="text-subtitle1 text-weight-medium">{{ rank.pontuacao }}</div>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "RankDesktop",
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
.cartao_top_ranks::v-deep {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  margin-top: 50px;

  .icone_top_ranks1 {
    i {
      color: #F5C01F !important;
      font-size: 30px !important;
    }
  }

  .icone_top_ranks2 {
    i {
      color: #C4C4C4 !important;
      font-size: 30px !important;
    }
  }

  .icone_top_ranks3 {
    i {
      color: #B08310 !important;
      font-size: 30px !important;
    }
  }
}

.cartao_demais_ranks_ds {
  border-radius: 20px;
}
</style>
