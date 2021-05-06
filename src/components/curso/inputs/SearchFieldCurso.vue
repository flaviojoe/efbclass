<template>
  <div>
    <InputRoundedSkeleton v-if="loading"/>

    <q-input
      v-else
      v-model="searchField"
      outlined
      placeholder="Buscar curso..."
      rounded
    >
      <template v-slot:prepend>
        <q-avatar>
          <q-icon name="fas fa-search" size="sm"/>
        </q-avatar>
      </template>
      <template v-slot:append>
        <q-icon class="cursor-pointer" name="close" @click="searchField = ''"/>
      </template>
    </q-input>
  </div>
</template>

<script>
import InputRoundedSkeleton from "src/components/skeletons/InputRoundedSkeleton.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {InputRoundedSkeleton},
  name: "SearchFieldCurso",
  methods: {
    ...mapActions("cursos", ["setSearch", "setCurso"])
  },
  computed: {
    ...mapState("cursos", ["search", "loading"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  }
};
</script>

<style></style>
