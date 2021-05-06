<template>
  <div>
    <q-avatar
      class="avatar_profile"
      size="120px"
      title="Clique para alterar foto de perfil."

    >
      <q-img :src="getAvatar()" spinner-color="white" />
      <q-badge
        v-if="com_modal"
        @click="mostrarModalUpload = true"
        class="btn_alterarfoto cursor-pointer"
        color="primary"
        floating
      >
        <q-icon size="16px" name="fas fa-camera" />
      </q-badge>
    </q-avatar>
    <q-dialog v-if="com_modal" v-model="mostrarModalUpload">
      <UploadArquivo :aluno_id="aluno.id" @close="mostrarModalUpload = false" :carregamento_automatico="false" />
    </q-dialog>
  </div>
</template>

<script>
import utils from "src/libs/utils";
import UploadArquivo from "src/components/modals/UploadArquivo.vue";

export default {
  components: { UploadArquivo },
  name: "AvatarAluno",
  props: {
    aluno: {
      type: Object,
      required: true
    },
    com_modal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mostrarModalUpload: false
    };
  },
  methods: {
    getAvatar() {
      return utils.getAvatar(this.aluno);
    }
  }
};
</script>

<style></style>
