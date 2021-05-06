<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <CardSkeleton v-if="loading" :qtd_itens="1" height="150px" width="250px" class="q-ma-sm"/>
    <template v-else>
      <CartaoCurso v-for="curso in cursos" :key="curso.id" :curso="curso"/>
    </template>
  </div>
</template>

<script>
import CartaoCurso from "./CartaoCurso.vue";
import CardSkeleton from "components/skeletons/CardSkeleton";
import {mapState} from "vuex";

export default {
  components: {CardSkeleton, CartaoCurso},
  name: "GradeCursos",
  props: {
    cursos: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState("cursos", ["loading"])
  }
};
</script>
