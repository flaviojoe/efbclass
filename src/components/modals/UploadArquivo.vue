<template>
  <q-card class="modalUpload">
    <modal-header>Alterar foto perfil</modal-header>
    <q-card-section>
      <div class="row">
        <q-uploader
          :factory="anexoFactoryFn"
          :auto-upload="carregamento_automatico"
          class="uploadAnexo"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import ModalHeader from "./share/ModalHeader";

export default {
  props: {
    aluno_id: {
      type: [String, Number],
      required: true
    },
    carregamento_automatico: {
      type: Boolean,
      default: true
    }
  },
  name: "UploadArquivo",
  components: {
    ModalHeader
  },
  methods: {
    ...mapActions("alunos", ["alterarFotoPerfil"]),
    async anexoFactoryFn(file) {
      let formData = new FormData();
      formData.append("foto_perfil", file[0]);
      let formFotoPerfil = {
        id: this.aluno_id,
        formData: formData
      };
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
    },
    carregarArquivos() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.modalUpload {
  height: 50vh;
  width: 50vw;

  .uploadAnexo {
    height: 40vh !important;
    width: 40vw;
  }
}
</style>
