<template>
  <div>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9 q-mb-md q-px-md">
          <div class="text-h6">Encontre seu curso favorito aqui</div>
        </div>
      </div>
      <div class="row justify-center items-center">
        <div class="col-9 q-mr-md">
          <q-input
            v-model="searchField"
            bg-color="white"
            clearable
            color="black"
            placeholder="Pesquisar Curso"
            rounded
            standout="bg-primary"
            @clear="searchField = ''"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-search"/>
            </template>
          </q-input>
        </div>
        <div class="col-2">
          <q-btn
            v-morph:btnCategoria:mygroup:300.resize="morphGroupModelCategoria"
            class="q-pa-xs"
            color="primary"
            icon="fas fa-filter"
            round
            @click="nextMorphCategoria"
          />
        </div>
      </div>
      <GradeCartoesCursos :cursos="cursosPorCategoria"/>
    </div>

    <q-dialog v-model="modalCategorias" persistent/>

    <q-card v-morph:cartaoCategorias:mygroup:500.resize="morphGroupModelCategoria"
            :class="['cartao_categorias_cursos', modalCategorias ? ['absolute', 'z-top'] : '']"
    >
      <q-card-section class="q-pt-md">
        <CategoriasFiltros :categorias="todasCategorias" @close="nextMorphCategoria"/>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Fechar" @click="nextMorphCategoria"/>
      </q-card-actions>
    </q-card>
    <q-page-scroller :offset="[18, 60]" :scroll-offset="150" position="bottom-right">
      <q-btn color="primary" fab icon="keyboard_arrow_up"/>
    </q-page-scroller>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import GradeCartoesCursos from "components/curso/cards/GradeCartoesCursos";
import CategoriasFiltros from "components/curso/CategoriasFiltros";

const nextMorphStepCategoria = {
  btnCategoria: "cartaoCategorias",
  cartaoCategorias: "btnCategoria"
};

export default {
  name: "PageCursos",
  components: {CategoriasFiltros, GradeCartoesCursos},
  data() {
    return {
      morphGroupModelCategoria: "btnCategoria",
      modalCategorias: false
    };
  },
  methods: {
    ...mapActions("cursos", ["getTodosCursosPorCategorias", "getCategorias", "setCategoria", "setSearch"]),
    async init() {
      await this.getCategorias();
      this.setSearch("");
      await this.getTodosCursosPorCategorias();
    },
    nextMorphCategoria() {
      this.modalCategorias = !this.modalCategorias;
      this.morphGroupModelCategoria = nextMorphStepCategoria[this.morphGroupModelCategoria];
    }
  },
  computed: {
    ...mapState("cursos", ["search"]),
    ...mapGetters("cursos", ["cursosPorCategoria", "todasCategorias"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  created() {
    this.init();
  }
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
