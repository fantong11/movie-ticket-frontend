<template>
  <div class="registration">
    <ResponsiveNavigation />
    <Breadcrumb />
    <div class="container">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="email-address"
          label="電子郵件:"
          label-for="email-address"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="請輸入電子郵件"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-pw-1" label="密碼:" label-for="input-pw-1">
          <b-form-input
            id="password-1"
            v-model="form.password"
            required
            placeholder="請輸入密碼"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-pw-2" label="確認密碼:" label-for="input-pw-2">
          <b-form-input
            id="password-2"
            v-model="form.password"
            required
            placeholder="請重複輸入密碼"
          ></b-form-input>
        </b-form-group>

        <p>*** 點擊「註冊」即代表您已閱讀並瞭解服務條款及隱私權聲明。 ***</p>

        <b-button
          type="reset"
          variant="danger"
          class="m-2"
          to="/registration"
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
  name: "registration",
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
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
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
@import "./styles/RegistrationStyles";
</style>