<template>
  <q-layout class="cor_questionario">
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
        mode="out-in"
        :duration="1000"
      >
        <router-view/>
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: "LayoutQuestionario"
};
</script>

<style lang="scss">
.cor_questionario {
  background-color: $primary;
}
</style>
