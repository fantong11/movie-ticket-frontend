<template>
  <div class="breadcrumb">
    <b-container class="breadcrumb-container" fluid="lg">
      <ul>
        <li
          v-for="(breadcrumb, i) in breadcrumbList"
          :key="i"
          @click="routeTo(i)"
          :class="{ linked: !!breadcrumb.link }"
        >
          {{ breadcrumb.name }}
        </li>
      </ul>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: [],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  methods: {
    // 連接到breadcrumb的link
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link)
        this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./styles/BreadcrumbStyles";
</style>