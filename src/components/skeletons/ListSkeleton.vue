<template>
  <div class="q-pa-md">
    <q-item v-for="q in qtd_itens" :key="q" style="max-width: 500px">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="pulse" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton animation="pulse" type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton animation="pulse" type="text" width="65%" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "ListSkeleton",
  props: {
    qtd_itens: {
      type: Number,
      default: 3
    }
  }
};
</script>

<style></style>
