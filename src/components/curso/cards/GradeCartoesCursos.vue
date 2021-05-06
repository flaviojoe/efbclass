<template>
  <div>
    <div
      v-for="categoria in cursos"
      :key="'categoria_curso-' + categoria.id"
    >
      <template v-if="categoria.hasOwnProperty('cursos') && Object.keys(categoria.cursos).length">
        <div class="col-xs-12 col-md-12 q-my-md">
          <span class="text-h6">{{ categoria.nome }}</span>
        </div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          class="full-width"
          horizontal
          style="height: 270px;"
        >
          <div class="row no-wrap q-gutter-x-sm">
            <div v-for="curso in categoria.cursos" :key="'curso-' + curso.id">
              <template v-if="Object.keys(curso).length">
                <CartaoCursoCategoria :curso="curso" style="width: 300px"/>
              </template>
            </div>
          </div>
        </q-scroll-area>
      </template>
    </div>
  </div>
</template>

<script>
import CartaoCursoCategoria from "components/curso/cards/CartaoCursoCategoria";

export default {
  name: "GradeCartoesCursos",
  components: {CartaoCursoCategoria},
  props: {
    cursos: {
      type: [Object, Array],
      required: true,
      validator: function (value) {
        return (typeof value !== "undefined" && value !== null && (Array.isArray(value) && value.length > 0));
      }
    }
  },
  data() {
    return {
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#235474",
        width: "5px",
        opacity: 0.75
      }
    };
  }
};
</script>

<style scoped></style>
