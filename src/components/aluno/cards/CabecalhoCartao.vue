<template>
  <q-card-section>
    <div class="text-h6 q-mb-xs text-center">{{ titulo }}</div>
    <div class="text-subtitle2 text-weight-regular q-mb-xs text-center text-grey-7">
      {{ subtitulo }}
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "CabecalhoCartao",
  props: {
    titulo: {
      type: String,
      required: true
    },
    subtitulo: String
  }
}
</script>

<style scoped>

</style>
