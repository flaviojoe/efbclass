<template>
  <div>
    <div class="container_dashboard"
         :class="($q.screen.xs || $q.platform.is.mobile) ? '' : ['q-pa-md', 'container-dashboard-ds']">
      <div class="row"
           v-if="Object.keys(topRanks).length"
      >
        <template v-if="($q.screen.xs || $q.platform.is.mobile)">
          <Rank :tops="topRanks" :demais="demaisRanks"/>
        </template>
        <template v-else-if="Object.keys(topRanks).length">
          <RankDesktop :tops="topRanks" :demais="demaisRanks"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Rank from "src/components/ranks/Rank.vue";
import { mapActions, mapGetters } from "vuex";
import RankDesktop from "components/ranks/desktop/RankDesktop";


export default {
  name: "PageDashboard",
  components: {RankDesktop, Rank},
  methods: {
    ...mapActions("dashboards", ["getRanks"]),
    async init() {
      await this.getRanks();
    }
  },
  computed: {
    ...mapGetters("dashboards", ["topRanks", "demaisRanks"])
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss">
.container_dashboard {
  margin-top: -1px;
}
</style>
