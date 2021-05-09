<template>
  <div class="container_cursos_desktop q-pa-md">
    <div class="container_img_cartao_curso row justify-center">
      <q-card class="q-pa-md">
        <div class="row">
          <div class="col-6">
            <div class="text-h5 text-weight-bold text-white">Encontre seu curso favorito aqui</div>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6">
            <div class="text-subtitle2 text-weight-regular text-grey-3">Já está fazendo algum curso? Clique no botão
              abaixo para ir para os seus cursos!
            </div>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6">
            <q-btn
              color="white"
              text-color="black"
              :to="{ name: 'Meus Cursos'}"
              no-caps
              label="Meus cursos"
            />
          </div>
        </div>
        <img src="~/assets/ilustracoes/cursos.svg" alt="cursos">
      </q-card>
    </div>

    <div class="row titulo_tbl_cursos">
      <div class="col-12">
        <q-table
          title="Todos os cursos"
          title-class="titulo_tbl_cursos"
          ref="table"
          grid
          card-class="tbl_curso_card"
          card-container-class="tbl_curso_card_container"
          :data="serverData"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :pagination.sync="serverPagination"
          :loading="loading"
          :visible-columns="visibleColumns"
          @request="request"
          hide-pagination
        >
          <template v-slot:top-right>
            <q-input
              dense
              rounded
              outlined
              debounce="300"
              v-model="filter"
              placeholder="Procurar cursos"
            >
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
              <q-tooltip>
                Digite pelo menos 3 letras
              </q-tooltip>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-12 tbl_cursos_tr">
              <q-item
                class="tbl_cursos_item"

                clickable
                @click="detalhesCurso(props.row)"

              >
                <q-item-section avatar>
                  <q-avatar size="64px" rounded>
                    <img :src="props.row.imagem" :alt="props.row.nome">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ props.row.nome }}</q-item-label>
                  <q-item-label caption>{{ props.row.descricao | truncarTexto($q.screen.sm ? 80 : 110) }}</q-item-label>
                </q-item-section>
                <q-tooltip>
                  Clique para ver detalhes do curso
                </q-tooltip>
              </q-item>
            </div>
          </template>
        </q-table>

        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="serverPagination.page"
            color="primary"
            :max="pagesNumber"
            rounded
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
            direction-links
            boundary-links
            @input="setPaginacao"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapActions } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "CursosDesktop",
  data() {
    return {
      filter: "",
      loading: false,
      separator: "horizontal",
      visibleColumns: ["nome", "categoria", "criado_em"],
      columns: [
        {
          name: "nome",
          label: "Curso",
          field: "nome",
          sortable: true,
          align: "left"
        },
        {
          name: "categoria",
          label: "Categoria",
          field: "categoria",
          align: "left"
        },
        {
          name: "criado_em",
          label: "Criado em",
          field: "criado_em",
          format: val => date.formatDate(val, "DD/MM/YYYY"),
          align: "left"
        }
      ],
      serverPagination: {
        page: 1,
        rowsNumber: 5,
        rowsPerPage: 5
      },
      serverData: []
    };
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.serverPagination.rowsNumber / this.serverPagination.rowsPerPage);
    }
  },
  methods: {
    ...mapActions("cursos", ["getTodosCursosPaginado"]),
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

    },
    setPaginacao() {
      let paginacao = {
        pagination: this.serverPagination,
        filter: this.filter
      };
      this.request(paginacao);
    },
    async request({pagination, filter}) {
      let params = {
        pagination: pagination,
        query: `page=${ pagination.page }${ pagination.sortBy == null ? "" : "&ordering=" + (pagination.descending ? "" : "-") + pagination.sortBy }&filter=${ filter.length >= 3 ? filter : "" }`
      };

      await this.getTodosCursosPaginado(params);
      this.loading = this.$store.state.cursos.loading;
      this.serverData = Object.assign([], this.$store.state.cursos.cursos);
      this.serverPagination = Object.assign({}, this.$store.state.cursos.serverPagination);
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });
  },
  filters: {
    truncarTexto(value, tamanho) {
      return utils.truncarString(value, tamanho, "...");
    }
  }
}
;
</script>

<style lang="scss" scoped>
.container_cursos_desktop::v-deep {
  .container_img_cartao_curso {
    margin-left: calc(5% - 250px);

    .q-card {
      width: 40vw;
      height: 220px;
      border-radius: 30px;
      box-shadow: none;
      background-color: rgba($primary, 0.8);
      margin-bottom: 20px;
    }

    img {
      width: 35vw;
      height: 280px;
      position: absolute;
      left: 50%;
      top: -20px;
    }
  }

  .q-table__container {
    border-radius: 15px;
    margin-top: 50px;

    .titulo_tbl_cursos {
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  .tbl_cursos_item {
    border: 1px solid $grey-4;
    border-radius: 10px;
    background-color: rgba($primary, .07);
  }

}
</style>
