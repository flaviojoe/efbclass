<template>
  <div>
    <div class="q-pa-md">
      <div class="q-pa-sm">
        <div class="row q-gutter-y-md q-gutter-x-sm">
          <SearchFieldCurso class="col-xs-12 col-md-5 col-4" />
        </div>
      </div>
    </div>
    <q-list class="lista_cursos">
      <template v-if="Object.keys(cursosFiltrados).length">
        <ItemMeusCursos
          v-for="curso in cursosFiltrados"
          :key="curso.id"
          :curso="curso"
        />
      </template>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchFieldCurso from "src/components/curso/inputs/SearchFieldCurso.vue";
import ItemMeusCursos from "src/components/curso/ItemMeusCursos.vue";

export default {
  components: {
    SearchFieldCurso,
    ItemMeusCursos
  },
  name: "PageMeusCursos",
  data() {
    return {
      meusCursosLocal: []
    };
  },
  methods: {
    ...mapActions("cursos", ["getMeusCursos"]),
    async init() {
      await this.getMeusCursos();
      this
    }
  },
  computed: {
    ...mapGetters("cursos", ["cursosFiltrados"])
  },
  created() {
    this.init();
  }
};
</script>
