<template>
  <div class="row">
    <q-card v-for="q in qtd_itens" :key="q" class="cartao_esqueleto q-ma-sm" :style="{ 'width': width, 'heigth': height }">
      <q-item>
        <q-item-section avatar>
          <q-skeleton animation="pulse" type="QAvatar"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton animation="pulse" type="text"/>
          </q-item-label>
          <q-item-label caption>
            <q-skeleton animation="pulse" type="text"/>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton :height="height" animation="pulse" square/>

      <q-card-actions align="right" class="q-gutter-md">
        <q-skeleton animation="pulse" type="QBtn"/>
        <q-skeleton animation="pulse" type="QBtn"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CardSkeleton",
  props: {
    qtd_itens: {
      type: Number,
      default: 3
    },
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '200px'
    }
  }
};
</script>

<style lang="scss">
.cartao_esqueleto {
  width: 100%;
  max-width: 350px;
  border-radius: 12px;
}
</style>
