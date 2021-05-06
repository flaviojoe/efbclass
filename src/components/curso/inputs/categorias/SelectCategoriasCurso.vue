<template>
  <div>
    <InputRoundedSkeleton v-if="loading" />

    <q-select
      v-else
      rounded
      outlined
      transition-show="flip-up"
      transition-hide="flip-down"
      v-model="categoriaSelecionada"
      :options="todasCategorias"
      label="Categorias"
      map-options
      emit-value
      option-label="nome"
      placeholder="Categorias"
      :behavior="$q.screen.xs ? 'dialog' : 'default'"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click.stop="clearCategoria"
          class="cursor-pointer"
        />
      </template>
    </q-select>
  </div>
</template>

<script>
import InputRoundedSkeleton from "src/components/skeletons/InputRoundedSkeleton.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: { InputRoundedSkeleton },
  name: "SelectCategoriasCurso",
  methods: {
    ...mapActions("categorias", [
      "getCategorias",
      "setCategoria",
      "clearCategoria"
    ]),
    async init() {
      await this.getCategorias();
    }
  },
  computed: {
    ...mapGetters("categorias", ["todasCategorias"]),
    ...mapState("categorias", ["loading", "categoria"]),
    categoriaSelecionada: {
      get() {
        return this.categoria;
      },
      set(value) {
        this.setCategoria(value);
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style></style>
