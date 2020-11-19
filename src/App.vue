<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  created(){
    //判斷是否有本地儲存中是否有isLogin，並更新vuex倉庫
    if(localStorage.getItem('status') == null){
      localStorage.setItem('status','');
    }
    if(localStorage.getItem('user') == null){
      localStorage.setItem('user','');
    }

    this.$store.state.status = localStorage.getItem('status');
    console.log(this.$store.state.status);
    this.$store.state.name = localStorage.getItem('user');
    console.log(this.$store.state.name);
  }
}
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
