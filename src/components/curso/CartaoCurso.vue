<template>
  <q-card bordered class="cartao_curso" flat @click="aulasCurso(curso)">
    <q-img :alt="curso.nome" :src="curso.imagem" />

    <q-card-section>
      <div class="text-subtitle1 q-mt-sm q-mb-xs">
        {{ curso.nome | truncarTexto(45) }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "CartaoCurso",
  props: {
    curso: {
      type: Object,
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
    },
    aulasCurso(curso) {
      this.setCurso(curso);
      this.$router
        .push({ name: "Aulas", params: { id: curso.id } })
        .catch(err => {});
    },
    tratarURL(url) {
      return utils.alterarUrlWatchParaEmbedYoutube(url);
    }
  },
  filters: {
    truncarTexto(value, tamanho) {
      return utils.truncarString(value, tamanho, "...");
    }
  }
};
</script>

<style lang="scss">
.cartao_curso {
  width: 100%;
  max-width: 250px;
  border-radius: 20px;
  max-height: 250px;
}
</style>
