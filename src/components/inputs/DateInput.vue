<template>
  <q-input
    v-model="dataLocal"
    :label="labelData"
    :rules="[val => !!val || 'Campo obrigatório']"
    outlined
    @click="() => $refs.dataProxy.show()"
  >
    <template v-slot:append>
      <q-icon class="cursor-pointer" name="event">
        <q-popup-proxy
          ref="dataProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="dataLocal"
            :locale="dateLocale"
            mask="DD/MM/YYYY"
            @input="$emit('update:data', $event)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Fechar" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import utils from "src/libs/utils";

export default {
  name: "DateInput",
  props: ["data", "labelData"],
  data() {
    return {
      dataLocal: this.data,
      dateLocale: utils.dateLocale
    };
  },
  watch: {
    data: {
      handler: function() {
        this.dataLocal = this.data;
      },
      immediate: true
    }
  }
};
</script>
