<template>
  <div class="text-grey-10">
    <div class="container_ilustracao no-scroll">
      <img alt="ilus_informativo" src="~/assets/ilustracoes/informativo2.svg">
    </div>
    <div class="q-pa-md">
      <ListSkeleton v-if="loading"/>
      <q-card v-else class="cartao_informativos fit">
        <q-card-section>
          <div class="row items-center q-pt-xs">
            <div class="col-10 q-px-md">
              <div class="text-subtitle1 text-weight-bold">Informativos da empresa</div>
            </div>
            <div class="col-2">
              <q-fab
                class="btn_acoes_cartao"
                color="primary"
                direction="up"
                icon="fas fa-ellipsis-v"
                round
                vertical-actions-align="right"
              >
                <q-fab-action
                  color="primary"
                  external-label
                  icon="fas fa-sync-alt"
                  label="Recarregar"
                  label-class="bg-grey-3 text-grey-8"
                  label-position="left"
                  @click="init"
                />
                <q-fab-action
                  v-morph:btn:mygroup:300.resize="morphGroupModel"
                  color="primary"
                  external-label
                  icon="fas fa-search"
                  label="Pesquisar"
                  label-class="bg-grey-3 text-grey-8"
                  label-position="left"
                  @click="nextMorph"
                />
              </q-fab>
            </div>
          </div>
        </q-card-section>

        <div
          v-if="!Object.keys(informativosFiltrados).length"
          class="q-pa-md text-center">
          <div class="text-h5 text-grey-10">Sem dados cadastrados</div>
          <q-icon size="lg" color="grey-6" name="fas fa-book-open" class="q-pa-md" />
        </div>

        <q-list v-else padding separator>
          <q-item
            v-for="informativo in informativosFiltrados"
            :key="informativo.id"
            v-ripple
            clickable
            @click="mostrarInformativo(informativo)"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-file-alt"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-regular">{{ informativo.nome }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>

    <q-card
      v-morph:card1:mygroup:500.resize="morphGroupModel"
      class="cartao_pesquisa absolute-top absolute-center fixed-top"
    >
      <q-card-section class="q-pt-md">
        <q-input
          v-model="searchField"
          autofocus
          outlined
          placeholder="Pesquisar informativo"
          rounded
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-search"/>
          </template>
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="close" @click="searchField = ''"/>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Fechar" @click="nextMorph"/>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="mostrarPDF" full-height full-width>
      <q-pdfviewer
        v-model="mostrarPDF"
        :src="informativoSelecionado.arquivo"
        content-class="fit container_pdf"
        inner-content-class="fit container_pdf"
        type="pdfjs"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ListSkeleton from "components/skeletons/ListSkeleton";

const nextMorphStep = {
  btn: "card1",
  card1: "btn"
};

export default {
  name: "PageInformativos",
  components: {ListSkeleton},
  data() {
    return {
      mostrarPDF: false,
      informativoSelecionado: {},
      morphGroupModel: "btn"
    };
  },
  methods: {
    ...mapActions("informativos", ["getInformativos", "setSearch"]),
    async init() {
      await this.getInformativos();
    },
    mostrarInformativo(item) {
      this.informativoSelecionado = item;
      this.mostrarPDF = true;
    },
    nextMorph() {
      this.morphGroupModel = nextMorphStep[this.morphGroupModel];
    }
  },
  computed: {
    ...mapState("informativos", ["search", "loading"]),
    ...mapGetters("informativos", ["informativosFiltrados"]),
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
.cartao_informativos {
  position: absolute;
  top: 250px;
  width: 91% !important;
  border: 1px solid $grey-4;
  border-radius: 50px 50px 0 0;
  height: calc(100% - 130px) !important;
}

.container_ilustracao {
  margin-left: -40px;
  margin-top: -48px;

  img {
    width: 450px;
    height: 280px;
  }
}

.btn_acoes_cartao {
  .q-btn--fab .q-btn__wrapper {
    padding: 8px !important;
    min-height: 36px !important;
    min-width: 36px !important;
  }

  .q-btn--fab .q-icon, .q-btn--fab-mini .q-icon {
    font-size: 18px !important;
  }
}

.cartao_pesquisa {
  width: 300px;
  top: 15%;
  border-radius: 20px;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
