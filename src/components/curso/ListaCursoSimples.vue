<template>
  <div>
    <ListSkeleton v-if="loading" :qtd_itens="8" />

    <q-list v-else bordered class="lista_cursos" padding>
      <q-item-label header>Disponíveis</q-item-label>

      <q-item
        v-for="curso in cursos"
        :key="curso.id"
        v-ripple
        clickable
        @click="detalhesCurso(curso)"
      >
        <q-item-section avatar top>
          <q-avatar
            color="primary"
            icon="fas fa-play-circle"
            text-color="white"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ curso.nome }}</q-item-label>
          <q-item-label caption class="ellipsis"
            >{{ curso.descricao }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListSkeleton from "src/components/skeletons/ListSkeleton.vue";

export default {
  name: "ListaCursoSimples",
  components: { ListSkeleton },
  props: {
    cursos: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions("cursos", ["setCurso"]),
    detalhesCurso(curso) {
      this.setCurso(curso);
      this.$router
        .push({ name: "Detalhes Curso", params: { id: curso.id } })
        .catch(err => {});
    }
  },
  computed: {
    ...mapState("cursos", ["loading"])
  }
};
</script>

<style lang="scss">
.lista_cursos {
  border-radius: 30px !important;
}
</style>
