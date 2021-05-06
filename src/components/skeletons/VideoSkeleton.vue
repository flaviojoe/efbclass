<template>
  <q-card flat :style="{ 'max-width': max_width }">
    <q-skeleton :height="height" square animation="pulse" />

    <q-card-section>
      <q-skeleton type="text" class="text-subtitle1" animation="pulse" />
      <q-skeleton
        type="text"
        width="50%"
        class="text-subtitle1"
        animation="pulse"
      />
      <q-skeleton type="text" class="text-caption" animation="pulse" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "VideoSkeleton",
  props: {
    height: {
      type: String,
      default: "150px"
    },
    max_width: {
      type: String,
      default: "300px"
    }
  }
};
</script>

<style></style>
