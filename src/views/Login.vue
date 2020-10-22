<template>
  <div class="login">
    <ResponsiveNavigation />
    <Breadcrumb />
    <div class="container">
      <b-form v-if="show">
        <h3 class="mb-3">會員登入</h3>
        <b-form-group
          id="email-address"
          label-for="email-address"
          description="We'll never share your email with anyone else."
        >
          <div class="input-box">
            <b-icon class="mr-2" font-scale="2" icon="envelope"></b-icon>
            <b-form-input
              id="email"
              v-model="form.name"
              required
              placeholder="請輸入電子郵件"
            ></b-form-input>
          </div>
        </b-form-group>

        <b-form-group id="password-input" label-for="password-input">
          <div class="input-box">
            <b-icon class="mr-2" font-scale="2" icon="lock"></b-icon>
            <b-form-input
              id="password"
              v-model="form.password"
              required
              placeholder="請輸入密碼"
            ></b-form-input>
          </div>
        </b-form-group>

        <b-form-group id="checkbox-input">
          <b-form-checkbox-group v-model="form.checked" id="checkbox-group">
            <b-form-checkbox value="me">記住帳號</b-form-checkbox>
            <b-form-checkbox value="that">保持登入狀態</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button @click="login" variant="primary" class="m-2">登入</b-button>
        <b-button variant="danger" class="m-2" to="/registration"
          >註冊</b-button
        >
        {{form.msg}}
      </b-form>
    </div>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "login",
  components: {
    ResponsiveNavigation,
    Breadcrumb,
  },

  data() {
    return {
      form: {
        name: "",
        password: "",
        checked: [],
        msg: "",
      },
      show: true,
    };
  },
  methods: {
    login() {
      var name = this.form.name;
      var password = this.form.password;
      console.log(name);
      console.log(password);
      this.$http.post("/api/signin", {
        username: name,
        password: password,
      }).then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data == -1) {
          this.form.msg = "使用者名稱不存在";
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./styles/LoginStyles";
</style>