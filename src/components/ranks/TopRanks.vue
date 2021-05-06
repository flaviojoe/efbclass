<template>
  <q-avatar size="64px" :class="['ranks', `rank${rank.posicao}`]">
    <q-img class="img_avatar" :src="rank.avatar" />
    <q-icon v-if="rank.posicao === 1" class="top1" name="fas fa-crown" color="yellow" />
    <q-avatar
      size="sm"
      class="colocacao_rank text-weight-medium"
      color="white"
      text-color="black"
    >{{ rank.posicao }}</q-avatar
    >
    <span v-if="somentePrimeiroNome" class="titulo_rank text-body1 text-white">{{ rank.nome | primeiroNome }}</span>
    <span v-else class="titulo_rank text-body1 text-white">{{ rank.nome }}</span>

    <div class="pontuacao_rank">
      <div class="row">
        <q-icon class="icone_pontuacao" name="fas fa-trophy" />
        <span class="valor_pontuacao">{{ rank.pontuacao }}</span>
      </div>
    </div>
  </q-avatar>
</template>

<script>
export default {
  name: "TopRanks",
  props: {
    rank: {
      type: Object,
      required: true
    },
    somentePrimeiroNome: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    primeiroNome(value) {
      return value.split(' ')[0]
    }
  }
}
</script>

<style scoped>

</style>
