<template>
  <q-card
    bordered
    class="cartao_curso_categoria q-mr-md"
    flat
    @click="detalhesCurso(curso)"
  >
    <q-img :alt="curso.nome" :src="curso.imagem" class="imagem_curso_categoria"/>

    <q-card-section>
      <div class="text-subtitle1">{{ curso.nome | truncarTexto(45) }}</div>
      <div
        v-if="curso.hasOwnProperty('criado_por')"
        class="text-caption text-grey-8 text-weight-medium"
      >
        {{ curso.criado_por }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "CartaoCursoCategoria",
  props: {
    curso: {
      type: [Object, Array],
      required: true,
      validator: function (value) {
        return typeof value !== "undefined" && value !== null;
      }
    }
  },
  data() {
    return {
      mostrarDescricao: false
    };
  },
  methods: {
    ...mapActions("cursos", ["getCurso"]),
    detalhesCurso(curso) {
      const payload = {
        id: curso.id
      };
      this.getCurso(payload);
      setTimeout(() => {
        this.$router
          .push({name: "Detalhes Curso", params: {id: curso.id}})
          .catch(err => {
          });
      }, 800);

    }
  },
  filters: {
    truncarTexto(value, tamanho) {
      return utils.truncarString(value, tamanho, "...");
    }
  }
};
</script>

<style lang="scss" scoped>
.cartao_curso_categoria {
  width: 100%;
  max-width: 250px;
  border-radius: 20px;
  max-height: 250px;
}

.imagem_curso_categoria {
  max-height: 140px;
  max-width: 250px;
  width: 100%;
}
</style>
