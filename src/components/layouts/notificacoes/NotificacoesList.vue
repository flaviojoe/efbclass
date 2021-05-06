<template>
  <div v-if="Object.keys(notificacoes).length">
    <q-list bordered padding>
      <template v-for="(notificacao, index) in notificacoes">
        <q-item
          v-if="index <= 8"
          :key="'notificacao-' + notificacao.id"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-avatar
              :icon="getIcon(notificacao)"
              color="primary"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ notificacao.notificacao.criado_por.nome }}
            </q-item-label>
            <q-item-label caption>
              {{ notificacao.notificacao.mensagem | truncarTexto(30) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
import utils from "src/libs/utils";

export default {
  name: "NotificacoesList",
  props: {
    notificacoes: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    getIcon(valor) {
      if (valor.is_empresa) return "fas fa-building";
      if (valor.is_curso) return "fas fa-swatchbook";
      return "fas fa-user-tag";
    }
  },
  filters: {
    truncarTexto(value, tamanho) {
      return utils.truncarString(value, tamanho, "...");
    }
  }
};
</script>

<style scoped>

</style>
