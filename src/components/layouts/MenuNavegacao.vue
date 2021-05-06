<template>
  <q-scroll-area class="area-menu-flutuante">
    <q-list class="menu-flutuante-list" padding>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="~assets/logo_branca.png"/>
          </q-avatar>
        </q-item-section>
        <q-item-section>e-FB Class</q-item-section>
      </q-item>
      <q-separator/>
      <q-expansion-item expand-icon-class="text-white">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar class="avatar_usuario">
              <img :src="avatar"/>
            </q-avatar>
          </q-item-section>
          <q-item-section>{{ user.nome }}</q-item-section>
        </template>
        <q-item class="q-ml-md" clickable @click="logout">
          <q-item-section avatar>
            <q-icon color="red-6" name="fas fa-power-off"/>
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-separator/>
      <Menus />
    </q-list>
  </q-scroll-area>
</template>

<script>
import { links } from "src/libs/menus";
import Menus from "components/layouts/Menus";
import utils from "src/libs/utils";
import { mapActions, mapState } from "vuex";

export default {
  name: "MenuNavegacao",
  components: {Menus},
  data() {
    return {
      links: [],
      avatar: ""
    };
  },
  computed: {
    ...mapState("usuarios", ["user"])
  },
  methods: {
    ...mapActions("usuarios", ["logout"]),
    carregarLinks() {
      if (Object.keys(this.user).length > 0) this.links = links(this.user);
    },
    carregarAvatar() {
      this.avatar = utils.getAvatar(this.user);
    }
  },
  created() {
    this.carregarLinks();
    this.carregarAvatar();
  }
};
</script>

<style lang="scss" scoped>
.avatar_usuario {
  margin-left: -6px;
}

</style>
