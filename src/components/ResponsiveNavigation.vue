<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container fluid="lg">
    <b-navbar-brand to="/">
      <img src="../assets/vscinemas_logo.png" alt="" />
    </b-navbar-brand>
    <b-navbar-toggle target="navbar-toggle-collapse">
      <!-- <template v-slot:default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template> -->
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" class="justify-content-around" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="影城介紹">
          <b-dropdown-item to="#">威秀影城</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="電影介紹">
          <b-dropdown-item to="/nowplayingmovie">熱售中</b-dropdown-item>
          <b-dropdown-item to="#">即將上映</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="映演品牌">
          <b-dropdown-item to="#">TITAN</b-dropdown-item>
          <b-dropdown-item to="#">MUCROWN</b-dropdown-item>
          <b-dropdown-item to="#">IMAX</b-dropdown-item>
          <b-dropdown-item to="#">4DX</b-dropdown-item>
          <b-dropdown-item to="#">GOLD CLASS</b-dropdown-item>
          <b-dropdown-item to="#">MAPPA</b-dropdown-item>
          <b-dropdown-item to="#">LIVE演唱會</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="餐飲與商品">
          <b-dropdown-item to="#">影城餐飲</b-dropdown-item>
          <b-dropdown-item to="#">UNICORN</b-dropdown-item>
          <b-dropdown-item to="#">CHEF JOHN</b-dropdown-item>
          <b-dropdown-item to="#">WOOD CASE</b-dropdown-item>
          <b-dropdown-item to="#">鳥開</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="活動公告">
          <b-dropdown-item to="#">影城公告</b-dropdown-item>
          <b-dropdown-item to="#">影城活動</b-dropdown-item>
          <b-dropdown-item to="#">中獎名單</b-dropdown-item>
          <b-dropdown-item to="#">合作夥伴</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="#">業務專區</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "ResponsiveNavigation",
  //傳資料
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
