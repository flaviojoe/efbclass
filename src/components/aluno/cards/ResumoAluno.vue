<template>
  <q-card class="col-xs-12 col-md-3">
    <div class="col flex flex-center">
      <div class="row">
        <q-item>
          <q-item-section avatar>
            <q-avatar
              class="avatar_profile cursor-pointer"
              size="120px"
              title="Clique para alterar foto de perfil."
              @click="mostrarModalUpload = true"
            >
              <q-img :src="getAvatar()" spinner-color="white" />
            </q-avatar>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <div class="flex flex-center">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-medium text-body1">{{
              aluno.nome
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-list>
      <q-separator inset spaced />

      <q-item>
        <q-item-section>
          <q-item-label class="text-body2 text-weight-medium"
            >Criado em</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ aluno.criado_em | formataData }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset spaced />

      <q-item>
        <q-item-section>
          <q-item-label class="text-body2 text-weight-medium"
            >Modificado em</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label class="">{{
            aluno.modificado_em | formataData
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="mostrarModalUpload">
      <UploadArquivo :aluno_id="aluno.id" @close="mostrarModalUpload = false" />
    </q-dialog>
  </q-card>
</template>

<script>
import utils from "src/libs/utils";
import UploadArquivo from "components/modals/UploadArquivo";

export default {
  name: "ResumoAluno",
  components: { UploadArquivo },
  props: {
    aluno: {
      type: Object,
      required: true
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
  },
  filters: {
    formataData(value) {
      return utils.formataData(value);
    }
  }
};
</script>

<style lang="sass" scoped>
.avatar_profile
  margin-top: 20px !important
</style>
