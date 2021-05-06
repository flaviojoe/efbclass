<template>
  <q-layout view="hhh Lpr lfr">

    <CabecalhoFaq titulo="Fale conosco" />

    <div class="cabecalho">
      <div class="imagem_cabecalho">
        <img
          alt="cabecalho_efbclass"
          class="img_fundo"
          src="~assets/logo_branca.png"
        />
      </div>
      <div class="imagem_cabecalho_avatar full-width">
        <q-btn class="cursor-none" color="white" round>
          <q-avatar class="img_fundo_avatar" size="80px">
            <img
              alt="cabecalho_efbclass_avatar"
              src="~assets/logo_sem fundo.png"
            />
          </q-avatar>
        </q-btn>
      </div>
      <span class="subtitulo text-h5 text-white text-weight-medium full-width">
        Como podemos ajudá-lo?
      </span>
    </div>

    <div class="row flex flex-center">
      <SearchSelect />
    </div>

    <q-separator color="white" size="25px"/>

    <div class="q-pa-md container_faleconosco">
      <div class="row q-mb-md flex justify-center">
        <div class="col-xs-10 col-sm-7 col-md-6 col-lg-4">
          <q-list class="ultimas_perguntas full-width">
            <q-expansion-item group="ult_perguntas" label="Corrija um problema">
              <q-list class="topicos bg-teal-1" padding separator>
                <q-item v-ripple clickable>
                  <q-item-section
                  >Nos enviei um e-mail para verificarmos
                  </q-item-section
                  >
                </q-item>
              </q-list>
            </q-expansion-item>

            <q-expansion-item group="ult_perguntas" label="Veja vídeos">
              <q-card class="bg-teal-1">
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              group="ult_perguntas"
              label="Como fazer as provas"
            >
              <q-card class="bg-teal-1">
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              group="ult_perguntas"
              label="Enviar dúvida para professor"
            >
              <q-card class="bg-teal-1">
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <q-separator size="1px"/>
      <div class="row q-mt-md flex justify-center">
        <CabecalhoCartao
          subtitulo="Entre em contato, veja as opções abaixo:"
          titulo="Precisa de mais ajuda?"
        />
      </div>
      <div class="row q-mt-md flex justify-center">
        <q-card class="cartao_ajuda cursor-pointer">
          <q-item :to="{ name: 'ajuda' }">
            <q-item-section avatar top>
              <q-avatar
                color="primary"
                icon="fas fa-envelope"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-medium"
              >Contacte-nos
              </q-item-label
              >
              <q-item-label caption class="text-weight-regular"
              >Forneça-nos mais informações e iremos ajudá-lo a encontrar o
                que procura.
              </q-item-label
              >
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

  </q-layout>
</template>

<script>
import CabecalhoCartao from "components/aluno/cards/CabecalhoCartao";
import SearchSelect from "components/faq/inputs/SearchSelect";
import CabecalhoFaq from "components/faq/layouts/CabecalhoFaq";

export default {
  components: {CabecalhoFaq, SearchSelect, CabecalhoCartao},
  name: "PageFaleConosco",
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
body {
  overflow-x: hidden !important;
}

.cartao_ajuda {
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.ultimas_perguntas {
  .q-expansion-item:first-child {
    border: 1px solid $grey-5;
    border-radius: 10px 10px 0 0 !important;

    .q-focus-helper {
      border-radius: 10px 10px 0 0 !important;
    }
  }

  .q-expansion-item:last-child {
    border: 1px solid $grey-5;
    border-radius: 0 0 10px 10px !important;

    .q-focus-helper {
      border-radius: 0 0 10px 10px !important;
    }
  }

  .q-expansion-item:not(last-child):not(first-child) {
    border: 1px solid $grey-5;
  }
}

.campo_busca {
  margin-top: -30px;

  .q-field__control {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 50%),
    0 1px 3px 1px rgb(60 64 67 / 25%);
  }
}

.cabecalho {
  height: 270px;
  background-color: $primary;
  width: 100%;

  .subtitulo {
    position: absolute;
    margin-top: 100px !important;
    margin-left: 38% !important;
    font-size: 30px;
  }

  .imagem_cabecalho {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin-right: -55vh;
    margin-top: -40px;

    .img_fundo {
      width: 50%;
    }
  }

  .imagem_cabecalho_avatar {
    visibility: hidden;
  }
}

@media (max-width: 992px) {
  .cabecalho {
    .imagem_cabecalho_avatar {
      visibility: hidden;
    }

    .subtitulo {
      position: absolute;
      margin-top: 100px !important;
      margin-left: 28% !important;
      font-size: 30px;
    }
  }
}

@media (max-width: 768px) {
  .cabecalho {
    .imagem_cabecalho {
      visibility: hidden;
    }

    .imagem_cabecalho_avatar {
      visibility: visible;
      position: absolute;
      top: 70px;
      right: 50%;
      left: 45%;
      bottom: 0;
    }

    .subtitulo {
      position: absolute;
      margin-top: 180px !important;
      right: 0;
      left: -2%;
    }
  }
}

@media (max-width: 576px) {
  .cabecalho {
    .imagem_cabecalho {
      visibility: hidden;
    }

    .imagem_cabecalho_avatar {
      visibility: visible;
      position: absolute;
      top: 70px;
      right: 50%;
      left: 40%;
      bottom: 0;
    }

    .subtitulo {
      position: absolute;
      margin-top: 180px !important;
      right: 0;
      left: -60px;
    }
  }
}

@media (max-width: 480px) {
  .cabecalho {
    .imagem_cabecalho {
      visibility: hidden;
    }

    .imagem_cabecalho_avatar {
      visibility: visible;
      position: absolute;
      top: 70px;
      right: 50%;
      left: 40%;
      bottom: 0;
    }

    .subtitulo {
      position: absolute;
      margin-top: 180px !important;
      right: 0;
      left: -60px;
      font-size: 25px;
    }
  }
}
</style>
