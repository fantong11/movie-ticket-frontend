<template>
  <b-navbar type="dark" variant="dark">
    <img src="../assets/vscinemas_logo.png" alt="">
    <b-navbar-nav>
      <b-nav-item-dropdown text="影城介紹">
        <b-dropdown-item href="#">威秀影城</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="電影介紹"> 
        <b-dropdown-item href="#">熱售中</b-dropdown-item>
        <b-dropdown-item href="#">即將上映</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="映演品牌">
        <b-dropdown-item href="#">TITAN</b-dropdown-item>
        <b-dropdown-item href="#">MUCROWN</b-dropdown-item>
        <b-dropdown-item href="#">IMAX</b-dropdown-item>
        <b-dropdown-item href="#">4DX</b-dropdown-item>
        <b-dropdown-item href="#">GOLD CLASS</b-dropdown-item>
        <b-dropdown-item href="#">MAPPA</b-dropdown-item>
        <b-dropdown-item href="#">LIVE演唱會</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="餐飲與商品"> 
        <b-dropdown-item href="#">影城餐飲</b-dropdown-item>
        <b-dropdown-item href="#">UNICORN</b-dropdown-item>
        <b-dropdown-item href="#">CHEF JOHN</b-dropdown-item>
        <b-dropdown-item href="#">WOOD CASE</b-dropdown-item>
        <b-dropdown-item href="#">鳥開</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="活動公告"> 
        <b-dropdown-item href="#">影城公告</b-dropdown-item>
        <b-dropdown-item href="#">影城活動</b-dropdown-item>
        <b-dropdown-item href="#">中獎名單</b-dropdown-item>
        <b-dropdown-item href="#">合作夥伴</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item href="#">業務專區</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "HelloWorld",
  //傳資料
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
