<template>
  <div>
    <div v-if="$q.screen.xs || $q.platform.is.mobile">
      <AulasMobile/>
    </div>
    <div v-else>
      <AulasDesktop/>
    </div>
  </div>
</template>

<script>

import AulasMobile from "components/curso/plataform/AulasMobile";
import AulasDesktop from "components/curso/plataform/AulasDesktop";

export default {
  name: "PageAulas",
  components: {AulasDesktop, AulasMobile}
};
</script>
