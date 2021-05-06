<template>
  <div class="text-grey-10">
    <div class="container_ilustracao no-scroll">
      <div class="buscar_mensagens relative-position">
        <div class="row justify-center">
          <div class="col-8">
            <q-input
              v-model="busca"
              rounded
              placeholder="Pesquisar mensagens"
              standout="bg-grey-1"
              clearable
              @clear="busca = ''"
              bg-color="white"
              :disable="!Object.keys(notificacoes).length"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-search" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>

    <q-card class="cartao_mensagens fit">
      <div
        v-if="!Object.keys(notificacoes).length"
        class="sem_dados_mensagem absolute-center text-center">
        <div class="text-h5 text-grey-10">Sem dados cadastrados</div>
        <q-icon size="lg" color="grey-6" name="fas fa-book-open" class="q-pa-md" />
      </div>

      <div v-else class="q-mt-md">
        <q-list padding>
          <q-item
            class="item_notificacao q-pa-md q-ma-sm"
            v-for="notificacao in notificacoes"
            :key="'mensagens-' + notificacao.id"
            v-ripple
            clickable
            @click="setNotificacao(notificacao)"
          >
            <q-item-section avatar>
              <q-avatar
                :icon="getIcon(notificacao)"
                color="primary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ notificacao.notificacao.criado_por.nome }}
              </q-item-label>
              <q-item-label caption>
                {{ notificacao.notificacao.mensagem | truncarTexto(38) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>

    <q-dialog
      v-model="mostrarNotificacao"
      ref="mostrarNotificacao"
      position="bottom"
      content-class="modal_notificacao"
    >
      <q-card
        v-if="Object.keys(notificacaoSelecionada).length"
        class="cartao_mensagem q-pa-md"
      >
        <q-card-section class="row items-center">
          <div class="col-3">
            <q-avatar
              :icon="getIcon(notificacaoSelecionada)"
              color="primary"
              text-color="white"
              round
            />
          </div>
          <div class="col-8">
            <div class="row">
              <div class="text-h6 col-12">
                {{ notificacaoSelecionada.notificacao.criado_por.nome }}
              </div>
              <div class="text-h6 col-12">
                <div class="text-caption text-weight-medium text-grey-7">
                  {{ getIcon(notificacaoSelecionada, true) }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          {{ notificacaoSelecionada.notificacao.mensagem }}
        </q-card-section>
        <q-card-section v-if="notificacaoSelecionada.notificacao.imagem">
          <q-img
            :src="notificacaoSelecionada.notificacao.imagem"
            class="img_cartao_mensagem"
            :alt="'notificacao-' + notificacaoSelecionada.id"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utils from "src/libs/utils";

export default {
  name: "PageMensagens",
  data() {
    return {
      busca: "",
      notificacaoSelecionada: {},
      mostrarNotificacao: false
    };
  },
  computed: {
    ...mapGetters("notificacoes", ["notificacoes"])
  },
  methods: {
    ...mapActions("notificacoes", ["getNotificacoes"]),
    async init() {
      await this.getNotificacoes();
    },
    getIcon(valor, e_texto = false) {
      if (valor.is_empresa) return e_texto ? "Empresa" : "fas fa-building";
      if (valor.is_curso) return e_texto ? "Curso" : "fas fa-swatchbook";
      return e_texto ? "Usuario" : "fas fa-user-tag";
    },
    setNotificacao(valor) {
      this.notificacaoSelecionada = valor;
      this.mostrarNotificacao = true;
    }
  },
  created() {
    this.init();
  },
  filters: {
    truncarTexto(value, tamanho) {
      return utils.truncarString(value, tamanho, "...");
    }
  }
};
</script>

<style lang="scss">
.cartao_mensagens {
  position: absolute;
  top: 150px;
  border: 1px solid $grey-4;
  border-radius: 50px 50px 0 0;
  height: calc(100% - 130px) !important;

  .item_notificacao {
    border-radius: 20px;
    background-color: rgba(239, 239, 239, 0.9);
  }
}

.container_ilustracao {
  margin-top: -50px;
  width: 100vw;
  height: 100vh;
  background-color: $primary;
}

.buscar_mensagens {
  top: 70px;

  .q-field__control.bg-white {
    opacity: 0.45;
  }

  .q-field__control.bg-grey-1 {
    .q-field__prepend {
      color: #1d1d1d;
    }

    .q-field__control-container {
      input {
        color: #1d1d1d;
      }
    }
  }
}

.modal_notificacao {
  .q-dialog__inner {
    width: 100%;
    height: calc(100% - 150px) !important;
  }

  .cartao_mensagem {
    border-radius: 50px 50px 0 0 !important;

    .img_cartao_mensagem {
      border-radius: 20px;
    }
  }
}

.sem_dados_mensagem {
  margin-top: -50px;
}
</style>
