<template>
  <div>
    <q-btn
      v-if="mostrarNotificacoes"
      :color="$q.screen.xs ? 'grey-6' : 'grey-2'"
      dense
      flat
      icon="fas fa-bell"
      round
      @click="mostrarNotificacao"
    >
      <q-badge
        v-if="Object.keys(notificacoes).length"
        class="text-weight-medium"
        color="primary"
        floating
        rounded
      >
        {{ notificacoes.length }}
      </q-badge>
    </q-btn>

    <q-dialog
      ref="modalNotificacoes"
      v-model="modalNotificacoes"
      class="modal_notificacoes"
      position="top"
      persistent
    >
      <q-card class="fit">
        <q-card-section class="row items-center">
          <div class="col-10">
            <div class="text-h6">Notificações</div>
          </div>
          <div class="col-2">
            <q-btn
              icon="fas fa-times"
              round
              text-color="grey-7"
              unelevated
              @click="modalNotificacoes = false"
            />
          </div>
        </q-card-section>
        <NotificacoesList :notificacoes="notificacoes"/>
        <template v-if="Object.keys(notificacoes).length">
          <q-item
            clickable
            v-ripple
            :to="{ name: 'Mensagens' }"
            class="row justify-center text-grey-9"
            @click="modalNotificacoes = false"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-list" size="xs"/>
            </q-item-section>
            <q-item-section side class="text-center">
              <q-item-label class="text-weight-medium"
              >Ver todas as notificações
              </q-item-label
              >
            </q-item-section>
          </q-item>
        </template>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import NotificacoesList from "components/layouts/notificacoes/NotificacoesList";

export default {
  name: "BotaoNotificacoes",
  components: {NotificacoesList},
  data() {
    return {
      modalNotificacoes: false
    };
  },
  computed: {
    ...mapGetters("notificacoes", ["notificacoes"]),
    ...mapState("layout", ["mostrarNotificacoes"])
  },
  methods: {
    ...mapActions("notificacoes", ["getNotificacoes"]),
    async init() {
      await this.getNotificacoes();
    },
    mostrarNotificacao() {
      if (this.$q.screen.xs) {
        this.modalNotificacoes = true;
      }

    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped></style>
