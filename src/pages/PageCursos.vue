<template>
  <div>
    <div v-if="$q.platform.is.mobile || $q.screen.xs">
      <CursosMobile/>
    </div>
    <div v-else>
      <CursosDesktop/>
    </div>
  </div>
</template>

<script>
import CursosMobile from "components/curso/plataform/CursosMobile";
import CursosDesktop from "components/curso/plataform/CursosDesktop";

const nextMorphStepCategoria = {
  btnCategoria: "cartaoCategorias",
  cartaoCategorias: "btnCategoria"
};

export default {
  name: "PageCursos",
  components: {CursosDesktop, CursosMobile}
};
</script>

<style lang="scss">
.cartao_categorias_cursos {
  top: 150px !important;
  height: 250px;
  width: 95%;
  border-radius: 20px;
  left: 2.5%;

}
</style>
