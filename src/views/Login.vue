<template>
  <div class="login">
    <ResponsiveNavigation />
    <Breadcrumb />
    <div class="container">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
              v-model="form.email"
              type="email"
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

        <b-button type="submit" variant="primary" class="m-2">登入</b-button>
        <b-button type="reset" variant="danger" class="m-2" to="/registration"
          >註冊</b-button
        >
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
        email: "",
        password: "",
        checked: [],
      },
      show: true,
    };
  },
  methods: {
    onSubmit() {

    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "null";
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./styles/LoginStyles";
</style>