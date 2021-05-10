<template>
  <q-btn-dropdown flat no-caps content-class="btn_dropdown_usuario no-shadow">
    <template v-slot:label>
      <q-avatar class="q-mr-md">
        <img :src="avatarLocal" alt="avatar"/>
      </q-avatar>
      <div v-if="com_nome">
        {{ user.nome }}
      </div>
    </template>

    <q-list dense padding>
      <q-item v-close-popup clickable>
        <q-item-section avatar>
          <q-avatar size="md" icon="fas fa-id-card"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Informações da conta</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-close-popup clickable :to="{ name: 'Mensagens' }">
        <q-item-section avatar>
          <q-avatar size="md" icon="fas fa-comments"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Mensagens</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item v-close-popup clickable @click="logout">
        <q-item-section avatar>
          <q-avatar text-color="red-8" size="md" icon="fas fa-power-off"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Sair/Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "DropdownUsuario",
  props: {
    com_nome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      avatarLocal: ""
    };
  },
  computed: {
    ...mapState("usuarios", ["user"])
  },
  methods: {
    ...mapActions("usuarios", ["logout"]),
    init() {
      this.avatarLocal = Object.keys(this.user).length > 0 && this.user.hasOwnProperty("foto_perfil") ? this.user.foto_perfil : utils.avatarPadrao;
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
.btn_dropdown_usuario {
  margin-top: 4px !important;
  border: 1px solid $grey-4 !important;
}
</style>
