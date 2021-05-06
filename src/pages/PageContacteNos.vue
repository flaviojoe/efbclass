<template>
  <q-layout view="hhh Lpr lfr">
    <CabecalhoFaq class_cor_fundo="bg-white" class_cor_texto="text-black" nome_img_logo="logo_sem fundo.png"
                  titulo="Ajuda"/>
    <div class="row flex flex-center full-width">
      <q-card class="col-xs-10 col-sm-8 col-md-6 cartao_ajuda shadow-1  q-ma-md">
        <q-card-section class="text-h4 q-pa-md">
          Contate-nos
        </q-card-section>

        <q-card-section>
          <q-input
            ref="pergunta"
            v-model="pergunta"
            :rules="[val => !!val || 'Campo obrigatório']"
            class="full-width pergunta"
            label="Pergunta"
            lazy-rules
            outlined
            rounded
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-mr-sm">
          <q-btn color="primary" flat label="Voltar" @click="$router.push({name: 'Home'})"/>
          <q-btn color="primary" icon="fas fa-envelope" label="Enviar" @click="processarPergunta"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
import CabecalhoFaq from "components/faq/layouts/CabecalhoFaq";
import {mapActions} from "vuex";

export default {
  name: "PageContateNos",
  components: {CabecalhoFaq},
  data() {
    return {
      pergunta: '',
      toolbar: [],
      fonts: {}
    }
  },
  methods: {
    ...mapActions('faqs', ['criarPergunta']),
    processarPergunta() {
      this.$refs.pergunta.validate();
      if (!this.$refs.pergunta.hasError) {
        let form = {
          pergunta: this.pergunta
        }
        this.criarPergunta(form)
      }
    }
  },
}
</script>

<style lang="scss">
.cartao_ajuda {
  height: 500px !important;
  border: 1px solid $grey-4;
  margin-top: 150px;
  border-radius: 20px;
  padding: 20px;

  .pergunta {
    textarea {
      min-height: 200px !important;
      height: 250px;
    }

  }
}
</style>
