<template>
  <q-drawer
    v-model="menuDireito_"
    :show-if-above="menuDireito_"
    side="right"
    content-class="menu_direito"
    :class="$q.screen.width >= 840 ? 'menu_nav_direito' : ''"
    overlay
    :bordered="mostrarPainel"
    :breakpoint="800"
  >
    <q-btn
      round
      :class="
        menuDireito_
          ? 'btn_mostrar_painel_direita shadow-1'
          : 'btn_ocultar_painel_direita shadow-1'
      "
      @click="menuDireito_ = !menuDireito_"
      :icon="!menuDireito_ ? 'fas fa-angle-left' : 'fas fa-angle-right'"
    />
    <q-list>
      <q-item-label header class="text-weight-medium text-center text-grey-9">Aulas do curso</q-item-label>
      <q-expansion-item
        v-for="(topico, idxTopico)  in cursoLocal.topicos"
        :key="`topico-${topico.id}`"
        expand-separator
        :label="`${topico.numero} - ${topico.nome}`"
        :caption="`Qtd de aulas: ${topico.aulas.length}`"
      >
        <q-item
          v-for="(aula, idxAula) in topico.aulas"
          :key="`aula-${aula.id}`"
          :active="aulaAtual.id === aula.id"
          @click="setAulaVideo(aula, idxAula, idxTopico)"
          clickable
        >
          <q-item-section side>
            <q-item-label>{{ aula.numero }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ aula.titulo }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PainelDireito",
  data() {
    return {
      menuDireitoLocal: false,
      mostrarPainel: true
    };
  },
  methods: {
    ...mapActions("layout", ["setMenuDireito"])
  },
  computed: {
    ...mapState("cursos", ["curso", "aula"]),
    ...mapState("layout", ["menuDireito"]),
    menuDireito_: {
      get() {
        return this.menuDireito;
      },
      set(value) {
        this.setMenuDireito(value);
      }
    },
    cursoLocal: {
      get() {
        return this.curso;
      }
    },
    aulaAtual: {
      get() {
        return this.aula;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu_nav_direito::v-deep {
  .q-drawer {
    margin-top: -25px;
    margin-right: 22px;
    height: 99vh !important;
    border-radius: 0 30px 30px 30px;
  }
}

.btn_ocultar_painel_direita {
  background: $primary;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  margin-left: -30px;
  border: $primary solid 1px;
  border-radius: 100%;
  color: white;
  -webkit-animation: heartbeat 1.5s ease-in-out both;
  animation: heartbeat 1.5s ease-in-out both;
  z-index: 4000;
}

.btn_mostrar_painel_direita {
  background: $primary;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  margin-left: -20px;
  border: $primary solid 1px;
  border-radius: 100%;
  color: white;
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
  z-index: 4000;
}

.btn_fechar_paineldireta {
  background: #fff !important;
  color: $grey-8;
  margin-right: 20px;
  margin-left: -20px;

  i {
    font-size: 25px;
  }
}
</style>
