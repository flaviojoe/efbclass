<template>
  <q-select
    ref="menu_perguntas"
    v-model="buscar"
    :options="opcoes"
    bg-color="white"
    class="col-xs-10 col-sm-7 col-md-6 col-lg-4 campo_busca"
    emit-value
    hide-dropdown-icon
    input-debounce="0"
    label="Buscar perguntas"
    map-options
    option-label="pergunta"
    option-value="id"
    outlined
    rounded
    use-input
    @filter="filterPerguntas"
  >
    <template v-slot:prepend>
      <q-icon color="primary" name="fas fa-search"/>
    </template>
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-clipboard-list"/>
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.pergunta"/>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nada encontrado =(
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'SearchSelect',
  data() {
    return {
      buscar: '',
      opcoes: []
    }
  },
  computed: {
    ...mapGetters('faqs', ['faqsFiltradas']),
    ...mapState('faqs', ['search']),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('faqs', ['getFAQs', 'setSearch']),
    filterPerguntas(val, update, abort) {
      if (val.length > 2) {
        update(() => {
          console.log(val)
          this.setSearch(val)
        })
      }
      abort()
      return
    },
  },
  created() {
    this.getFAQs()
    this.opcoes = this.faqsFiltradas
  }
};
</script>

<style></style>
