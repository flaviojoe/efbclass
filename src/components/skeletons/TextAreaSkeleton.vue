<template>
  <q-skeleton :height="height" animation="pulse"/>
</template>

<script>
export default {
  name: "TextAreaSkeleton",
  props: {
    height: {
      type: String,
      default: '150px'
    }
  }
}
</script>

<style scoped>

</style>
