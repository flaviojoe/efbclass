<template>
  <div>
    <div v-if="!($q.screen.xs || $q.platform.is.mobile)">
      <div class="row">
        <div class="col-md-12 q-pa-md">
          <q-card class="cartao_conta_1 q-pa-md no-shadow">
            <q-card-section class="row">
              <div class="col-md-4">
                <div class="row justify-center items-center">
                  <div class="col-md-5">
                    <AvatarAluno :aluno="aluno" com_modal/>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="text-subtitle1 text-weight-medium">{{ aluno.nome }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <q-separator vertical/>
              <div class="col-md-4">
                <div class="row">
                  <q-list>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="far fa-envelope" size="xs" color="primary"/>
                      </q-item-section>
                      <q-item-section>
                        {{ aluno.usuario.email }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="far fa-calendar-alt" size="xs" color="primary"/>
                      </q-item-section>
                      <q-item-section>
                        {{ aluno.dta_nasc ? aluno.dta_nasc : "Não informado" }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="far fa-building" size="xs" color="primary"/>
                      </q-item-section>
                      <q-item-section>
                        {{ aluno.empresa }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
              <q-separator vertical/>
              <div class="col-md-3">
                <div class="row">
                  <q-list>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="far fa-envelope" size="xs" color="primary"/>
                      </q-item-section>
                      <q-item-section>
                        {{ aluno.usuario.email }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!--  Mobile  -->
    <div v-else>
      <div class="q-pa-md">
        <div class="row items-center justify-center q-mb-md">
          <AvatarAluno :aluno="aluno"/>
        </div>
        <div class="column q-gutter-y-sm items-center">
          <div class="col">
            <q-avatar icon="fas fa-user" text-color="primary" size="md">
            </q-avatar>
            <span class="text-subtitle1 text-weight-regular">{{
                aluno.nome
              }}</span>
          </div>
          <div class="col">
            <q-avatar icon="fas fa-envelope" text-color="primary" size="md">
            </q-avatar>
            <span class="text-body2">{{ aluno.usuario.email }}</span>
          </div>
        </div>
      </div>

      <div class="q-my-md q-px-md">
        <div class="row justify-center">
          <q-expansion-item
            class="shadow-1 overflow-hidden full-width text-center"
            style="border-radius: 30px"
            icon="explore"
            label="Ações"
            header-class="bg-grey-3"
          >
            <q-list class="links_acoes text-left text-grey-9">
              <q-item clickable v-ripple @click="tab = 'avatar'">
                <q-item-section avatar>
                  <q-icon name="fas fa-user-circle"/>
                </q-item-section>
                <q-item-section>Alterar foto</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="tab = 'perfil'">
                <q-item-section avatar>
                  <q-icon name="fas fa-portrait"/>
                </q-item-section>
                <q-item-section>Alterar perfil</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="tab = 'dados_acesso'">
                <q-item-section avatar>
                  <q-icon name="fas fa-id-card"/>
                </q-item-section>
                <q-item-section>Alterar dados de acesso</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                @click="$router.push({ name: 'fale_conosco' })"
              >
                <q-item-section avatar>
                  <q-icon name="fas fa-comments"/>
                </q-item-section>
                <q-item-section>Fale conosco</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon color="red-7" name="fas fa-power-off"/>
                </q-item-section>
                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </div>
      </div>

      <div class="row items-start q-gutter-y-md q-gutter-x-md ">
        <q-card class="col-xs-12 col-md-8">
          <q-tabs
            v-model="tab"
            active-color="primary"
            align="justify"
            class="text-grey q-mt-sm"
            dense
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab label="Avatar" name="avatar"/>
            <q-tab label="Perfil" name="perfil"/>
            <q-tab label="Acesso" name="dados_acesso"/>
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="avatar">
              <TabAvatar :aluno="aluno"/>
            </q-tab-panel>

            <q-tab-panel name="perfil">
              <TabPerfilPublico v-bind:aluno="aluno"/>
            </q-tab-panel>

            <q-tab-panel name="dados_acesso">
              <TabDadosAcesso v-bind:aluno="aluno"/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AvatarAluno from "src/components/aluno/avatar/AvatarAluno.vue";
import TabPerfilPublico from "components/aluno/cards/TabPerfilPublico";
import TabDadosAcesso from "components/aluno/cards/TabDadosAcesso";
import TabAvatar from "src/components/aluno/cards/TabAvatar.vue";

export default {
  components: {AvatarAluno, TabDadosAcesso, TabPerfilPublico, TabAvatar},
  name: "PageAluno",
  data() {
    return {
      tab: "avatar"
    };
  },
  computed: {
    ...mapState("alunos", ["aluno"])
  },
  methods: {
    ...mapActions("alunos", ["getAluno"]),
    ...mapActions("usuarios", ["logout"]),
    async init() {
      await this.getAluno();
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
.cartao_conta_1 {
  border: 1px solid $grey-3;
  border-radius: 10px;

  .avatar_profile {
    .btn_alterarfoto {
      position: absolute;
      top: 6rem;
      border-radius: 100px;
      padding: 5px;

      i {
        font-size: 16px;
        padding: 5px;
      }
    }
  }
}
</style>
