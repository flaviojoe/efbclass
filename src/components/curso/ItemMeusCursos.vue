<template>
  <q-item
    v-ripple
    clickable
    @click="$router.push({ name: 'Aulas', params: { id: curso.id } })"
  >
    <q-item-section avatar top>
      <q-avatar rounded size="72px">
        <q-img :alt="curso.nome" :src="curso.imagem" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ curso.nome }}</q-item-label>
      <q-item-label
        v-if="curso.hasOwnProperty('criado_por')"
        caption
        class="text-weight-medium"
      >
        {{ curso.criado_por.first_name }} {{ curso.criado_por.last_name }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: "ItemMeusCursos",
  props: {
    curso: {
      type: Object,
      required: true,
      validator: function (value) {
        return (typeof value !== 'undefined' && value !== null)
      }
    }
  }
};
</script>
<style lang=""></style>
