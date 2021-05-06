<template>
  <q-input
    v-model="valor_"
    disable
    :label="label"
    outlined
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "TextInputDisabled",
  props: ['valor', 'label', 'placeholder'],
  computed: {
    valor_: function() {
      return this.valor;
    },
  },
}
</script>

