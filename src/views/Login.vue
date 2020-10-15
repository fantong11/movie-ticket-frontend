<template>
  <div class="login">
    <ResponsiveNavigation />
    <Breadcrumb />
    <b-container fluid="sm">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="email-address"
          label="Email address:"
          label-for="email-address"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="name"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Food:" label-for="input-3">
          <b-form-input
            id="password"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <b-form-checkbox value="me">記住帳號</b-form-checkbox>
            <b-form-checkbox value="that">保持登入狀態</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">登入</b-button>
        <b-button type="reset" variant="danger">註冊</b-button>
      </b-form>
    </b-container>
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
        name: "",
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
      this.form.name = "";
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