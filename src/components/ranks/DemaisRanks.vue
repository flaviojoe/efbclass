<template>
  <div>
    <q-item class="q-mb-sm">
      <q-item-section avatar>
        <q-avatar>
          <img :src="rank.avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ rank.nome }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="demais_pontuacoes row">
          <q-icon class="icone_pontuacao" name="fas fa-trophy" />
          <span class="valor_pontuacao">{{ rank.pontuacao }}</span>
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
  </div>
</template>

<script>
export default {
  name: "DemaisRanks",
  props: {
    rank: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.demais_pontuacoes {
  width: 100%;
  margin-left: 10px;
  font-size: 16px;
  border: 1px solid $primary;
  padding: 5px;
  border-radius: 20px;
  color: #fff;
  background-color: $primary;

  .icone_pontuacao {
    color: #fcde94;
    margin-right: 5px;
    margin-left: 8px;
    margin-top: 2px;
  }

  .valor_pontuacao {
    margin-left: 8px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
