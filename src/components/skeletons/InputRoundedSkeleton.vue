<template>
  <q-skeleton type="QInput" animation="pulse" class="custom-skeleton-border" />
</template>

<script>
export default {
  name: "InputRoundedSkeleton"
};
</script>

<style lang="scss">
.custom-skeleton-border {
  border-radius: 50px;
}
</style>
