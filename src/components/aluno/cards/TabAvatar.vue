<template>
  <div>
    <CabecalhoCartao subtitulo="Alterar foto de perfil" titulo="Avatar" />

    <q-separator />

    <q-uploader
      :factory="anexoFactoryFn"
      auto-upload
      class="uploadAnexo q-mt-md"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import CabecalhoCartao from "./CabecalhoCartao.vue";
export default {
  name: "TabAvatar",
  components: { CabecalhoCartao },
  props: {
    aluno: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("alunos", ["alterarFotoPerfil"]),
    async anexoFactoryFn(file) {
      let formData = new FormData();
      formData.append("foto_perfil", file[0]);
      let formFotoPerfil = {
        id: this.aluno.id,
        formData: formData
      };
      console.log(formFotoPerfil);
      try {
        let retorno = await this.alterarFotoPerfil(formFotoPerfil);
        console.log("Retorno => ", retorno);
        this.carregarArquivos();
        return {
          url: retorno.file,
          method: "GET"
        };
      } catch (e) {
        console.log(e);
        return {
          url: "",
          method: "GET"
        };
      }
    }
  }
};
</script>
<style lang="scss">
.uploadAnexo {
  max-height: 300px !important;
  height: 250px;
}
</style>
