<template>
  <div>
    <q-footer class="menu_footer bg-white text-grey-6">
<!--    <div class="menu_footer z-top bg-white text-grey-6 absolute-bottom fixed-bottom">-->
      <!--    <q-footer class="">-->
      <q-tabs
        active-color="primary"
        indicator-color="transparent"
      >
        <q-tab
          icon="fas fa-ellipsis-v"
          no-caps
          @click="menuBar = !menuBar"
        />
        <q-route-tab
          exact
          icon="fas fa-home"
          to="/"
        />

        <!--        <q-fab-->
        <!--          flat-->
        <!--          direction="up"-->
        <!--          icon="fas fa-play-circle"-->
        <!--          class="menu_flutuante_opcoes"-->
        <!--          external-label-->
        <!--        >-->
        <!--          <q-fab-action external-label color="primary" to="/cursos" icon="fas fa-graduation-cap" label="Cursos"/>-->
        <!--          <q-fab-action external-label color="primary" to="/meus_cursos" icon="fas fa-swatchbook" label="Meus Cursos"/>-->
        <!--        </q-fab>-->

        <!--        <q-route-tab-->
        <!--          exact-->
        <!--          icon="fas fa-id-card"-->
        <!--          to="/informacoes_aluno"-->
        <!--        />-->
        <q-route-tab
          exact
          icon="fas fa-graduation-cap"
          to="/cursos"
        />
        <q-route-tab
          exact
          icon="fas fa-swatchbook"
          to="/meus_cursos"
        />
        <q-route-tab
          exact
          icon="fas fa-file-alt"
          to="/provas_disponiveis"
        />
      </q-tabs>
      <!--    </q-footer>-->
    </q-footer>

    <transition-group
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <q-card
        v-if="menuBar"
        @close="menuBar = false"
        key="cartao_menu_flutuante"
        class="cartao_menu_flutuante fixed-bottom z-max q-ma-md bg-primary text-white"
      >
        <q-card-section class="row items-center">
          <div class="col-10">
            <div class="text-h6">Menu</div>
          </div>
          <div class="col-2">
            <q-btn icon="fas fa-times" round text-color="white" unelevated @click="menuBar = false"/>
          </div>
        </q-card-section>

        <q-card-section>
          <MenuNavegacao/>
        </q-card-section>
      </q-card>
    </transition-group>
  </div>
</template>

<script>
import MenuNavegacao from "components/layouts/MenuNavegacao";
import { mapActions, mapState } from "vuex";

export default {
  name: "MenuBar",
  props: ["value"],
  components: {MenuNavegacao},
  computed: {
    ...mapState("layout", ["menu"]),
    menuBar: {
      get() {
        return this.menu;
      },
      set(value) {
        this.setMenu(value);
      }
    }
  },
  methods: {
    ...mapActions("layout", ["setMenu"])
  }
};
</script>

<style lang="scss" scoped>
.menu_footer::v-deep {
  //width: 95%;
  width: 95vw;
  margin: auto;
  bottom: 4px;
  border-radius: 50px;
  border: 1px solid $grey-3 !important;

  .q-tab {
    padding: 0 12px;
  }

  //
  //@media (min-width: 370px) {
  //  width: 85vw;
  //}

}

.cartao_menu_flutuante::v-deep {
  left: 4px;
  bottom: 50px;
  width: 89%;
  height: 80vh;
  border-radius: 2em;

  .area-menu-flutuante {
    height: 60vh;

    .menu-flutuante-list {
      margin-top: -20px !important;
    }
  }

  @media (min-width: 540px) {
    width: 300px;
  }
}

.menu_flutuante_opcoes {
  position: inherit;

  .q-fab__actions.flex.no-wrap.inline.q-fab__actions--left {
  }
}
</style>
