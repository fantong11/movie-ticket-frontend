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
        <div class="login d-flex" v-if="status === 'login'">
          <b-nav-item to="/user">{{name}}</b-nav-item>
          <b-nav-item to="/" @click="logout">登出</b-nav-item>
        </div>
        <div class="not-login d-flex" v-if="status != 'login'">
          <b-nav-item to="/login">登入</b-nav-item>
          <b-nav-item to="/registration">註冊</b-nav-item>
        </div>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
    {{this.$store.state.status}}
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ResponsiveNavigation",
  //傳資料
  props: {
    msg: String,
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      status: (state) => state.user.status,
    }),
  },
  mounteds: {

  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");

    }
  }
};
</script>

<style scoped lang="scss">
// @import "./styles/ResponsiveNavigation";
</style>
