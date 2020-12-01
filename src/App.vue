<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    //判斷是否有本地儲存中是否有token，並更新vuex倉庫

    if (localStorage.getItem("user") == null) {
      localStorage.setItem("user", "");
    }
    if (localStorage.getItem("token") == null) {
      localStorage.setItem("token", "");
    }
    if (localStorage.getItem("role") == null) {
      localStorage.setItem("role", "");
    }

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    this.$store.state.name = username;
    console.log(this.$store.state.name);
    this.$store.state.token = token;
    console.log(this.$store.state.token);
    this.$store.state.role = role;
    console.log(this.$store.state.role);

    // 每次刷新頁面都要向後端請求token是否合法，不合法就登出
    this.$store
      .dispatch("user/userAuth", { token: this.$store.state.token })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
