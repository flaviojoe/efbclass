<template>
  <div class="row q-gutter-y-md">
    <div class="col-xs-7 col-md-12">
      <span class="text-h6">
        Categorias
      </span>
    </div>

    <div v-if="vertudo" class="col-xs-3 q-ml-lg xs">
      <q-btn
        color="primary"
        dense
        flat
        label="Ver tudo"
        @click="categoriasModal = !categoriasModal"
      />
    </div>

    <q-scroll-area horizontal style="height: 120px; width: 100%">
      <div class="row no-wrap">
        <div
          v-for="(c, index) in categorias"
          :key="'categoria-' + c.id"
          class="q-pa-sm full-width q-gutter-y-md"
        >
          <q-btn
            v-if="index === 0"
            :color="categoria.nome === 'Todas' ? 'primary' : 'grey-1'"
            :text-color="categoria.nome === 'Todas' ? 'white' : 'grey-9'"
            class="full-width"
            label="Todas"
            rounded
            size="sm"
            @click="selecionarCategoria({ id: 0, nome: 'Todas' })"
          />

          <q-btn
            :color="categoria.nome === c.nome ? 'primary' : 'grey-1'"
            :label="c.nome"
            :text-color="categoria.nome === c.nome ? 'white' : 'grey-9'"
            class="full-width"
            rounded
            size="sm"
            @click="selecionarCategoria(c)"
          />
        </div>
      </div>
    </q-scroll-area>

    <q-dialog v-model="categoriasModal">
      <q-card class="q-px-sm q-pb-md" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Categorias</div>
        </q-card-section>

        <q-item v-for="c in categorias" :key="'categoria-' + c.id" clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-bookmark" />
          </q-item-section>
          <q-item-section class="text-grey-8">
            {{ c.nome }}
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CategoriasFiltros",
  props: {
    categorias: {
      type: Array,
      required: true
    },
    vertudo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categoriasModal: false
    };
  },
  methods: {
    ...mapActions("cursos", ["setCategoria"]),
    selecionarCategoria(categoria) {
      this.setCategoria(categoria);
      this.$emit('close')
    }
  },
  computed: {
    ...mapState("cursos", ["categoria"])
  },
  created() {
    this.setCategoria({ id: 0, nome: "Todas" });
  }
};
</script>

<style scoped></style>
