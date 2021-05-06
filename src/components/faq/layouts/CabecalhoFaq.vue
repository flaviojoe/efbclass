<template>
  <q-header :class="[class_cor_fundo, class_cor_texto]">
    <q-toolbar>
      <q-avatar class="cursor-pointer" size="64px" @click="$router.push({name: 'Home'})">
        <img :src="getImagem(nome_img_logo)" alt="logo_efbclass"/>
        <q-tooltip content-class="text-center">
          Ir para pagina principal
        </q-tooltip>
      </q-avatar>

      <q-toolbar-title class="text-weight-bold">
        {{ titulo }}
      </q-toolbar-title>

      <q-btn
        class="absolute-right"
        flat
        icon-right="account_circle"
        label="Sair"
        @click="logout"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CabecalhoFaq",
  props: {
    titulo: {
      type: String,
      required: true
    },
    class_cor_fundo: {
      type: String,
      default: 'bg-transparent'
    },
    class_cor_texto: {
      type: String,
      default: 'text-white'
    },
    nome_img_logo: {
      type: String,
      default: 'logo_branca.png'
    }
  },
  methods: {
    ...mapActions("usuarios", ["logout"]),
    getImagem: imagem => {
      var img = require.context("assets/", false, /\.png$/);
      return img("./" + imagem);
    }
  },
}
</script>

<style scoped>

</style>
