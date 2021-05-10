<template>
  <div class="container_curso_desktop">
    <div class="container_img_curso full-width ">
      <div class="row">
        <div class="col-12">
          <img :src="cursoLocal.imagem" :alt="cursoLocal.nome"/>
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row">
        <div class="col-10">
          <div class="text-h4 text-weight-medium">
            {{ cursoLocal.nome }}
          </div>
        </div>
      </div>

      <div class="row text-grey-7 items-center q-pt-sm">
        <div class="col-sm-2 col-md-2">
          <q-icon name="fas fa-tags" class="q-pr-sm"/>
          {{ cursoLocal.categoria }}
          <q-tooltip>
            Categoria
          </q-tooltip>
        </div>
        <div class="col-sm-2 col-md-2">
          <q-icon name="fas fa-calendar" class="q-pr-sm"/>
          {{ cursoLocal.criado_em | formataData }}
          <q-tooltip>
            Criado em
          </q-tooltip>
        </div>
        <div class="col-sm-2 col-md-2">
          <q-icon name="fas fa-calendar-check" class="q-pr-sm"/>
          {{ cursoLocal.modificado_em | formataData }}
          <q-tooltip>
            Última atualização
          </q-tooltip>
        </div>
        <div class="col-sm-2 col-md-2">
          <q-icon name="fas fa-eye" class="q-pr-sm"/>
          {{ cursoLocal.topicos.length }}
          <q-tooltip>
            Quantidade de tópicos
          </q-tooltip>
        </div>
      </div>

      <div class="row q-my-md">
        <div class="col-12">
          <div class="text-h5 text-weight-medium">Sobre o curso</div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="text-body1 text-grey-9">{{ cursoLocal.descricao }}</div>
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-12">
          <q-markup-table class="tb_topicos_curso no-shadow">
            <thead>
            <tr class="text-left">
              <th>Tópico</th>
              <th>Nome</th>
              <th>Qtd Aulas</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="topico in cursoLocal.topicos"
              :key="`topico-${topico.id}`"
            >
              <td>{{ topico.numero }}</td>
              <td>{{ topico.nome }}</td>
              <td>{{ topico.aulas.length }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="animated bounce slow"
      leave-active-class="animated bounce slow"
    >
      <q-page-sticky v-if="!curso.e_matriculado" position="top-right" :offset="[25, 35]">
        <q-btn fab icon="fas fa-user-graduate" color="primary" @click="processarFormMatricula">
          <q-tooltip>
            Efetuar matricula
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </transition>

    <q-page-sticky v-if="curso.e_matriculado" position="top-right" :offset="[25, 35]">
    <q-btn fab icon="fas fa-play-circle" color="primary" @click="aulasCurso">
      <q-tooltip>
        Ir para aulas
      </q-tooltip>
    </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { date } from "quasar";

export default {
  name: "CursoDesktop",
  data() {
    return {};
  },
  computed: {
    ...mapState("cursos", ["curso", "loading"]),
    cursoLocal: {
      get() {
        return this.curso;
      }
    }
  },
  methods: {
    ...mapActions("cursos", ["getCurso"]),
    // ...mapActions("cursos", ["getAulasCurso"]),
    ...mapActions("alunos", ["matricularAluno"]),
    async processarFormMatricula() {
      let formMatricula = {
        curso: this.curso.id
      };
      await this.matricularAluno(formMatricula);
    },
    async init() {
      await this.getCurso({id: this.curso.id});
      // await this.getAulasCurso({id: this.curso.id});
    },
    aulasCurso() {
      this.$router
        .push({name: "Aulas"})
        .catch(err => {
        });
    }
  },
  filters: {
    formataData(value) {
      return date.formatDate(value, "MM/YYYY");
    }
  },
  created() {
    this.init();
    if (!Object.keys(this.curso).length) {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.container_img_curso {
  img {
    width: 100%;
    height: 350px;
  }
}

.tb_topicos_curso {
  border: 1px solid $grey-3;
  border-radius: 15px;

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
}
</style>
