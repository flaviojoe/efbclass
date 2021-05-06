<template>
  <div>
    <div
      v-for="menu in links"
      :key="menu.titulo"
    >
      <q-item-label caption class="text-white" header>{{ menu.titulo.toUpperCase() }}</q-item-label>
      <q-item
        v-for="link in menu.links"
        :key="link.title"
        :to="link.link"
        class="menu_item"
        active-class="menu_item_ativo"
        clickable
        exact
      >
        <q-item-section
          v-if="link.icon"
          avatar
        >
          <q-icon :name="link.icon"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="separadores_menu q-mb-sm"/>
    </div>
  </div>
</template>

<script>
import { links } from "src/libs/menus";
import utils from "src/libs/utils";
import { mapActions, mapState } from "vuex";

export default {
  name: "Menus",
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

<style scoped>

</style>
