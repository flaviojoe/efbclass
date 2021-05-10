<template>
  <div>
    <div v-if="$q.screen.xs || $q.platform.is.mobile">
      <CursoMobile/>
    </div>
    <div v-else>
      <CursoDesktop/>
    </div>
  </div>
</template>

<script>
import CursoMobile from "components/curso/plataform/CursoMobile";
import CursoDesktop from "components/curso/plataform/CursoDesktop";

export default {
  name: "PageCurso",
  components: {CursoDesktop, CursoMobile}
};
</script>

