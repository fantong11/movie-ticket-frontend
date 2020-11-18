<template>
  <div class="registration">
    <ResponsiveNavigation />
    <Breadcrumb />
    <div class="container">
      <b-form v-if="show">
        <h3 class="mb-3">會員註冊</h3>
        <b-form-group
          id="email-address"
          label-for="email-address"
        >
          <div class="input-box">
            <b-icon class="mr-2" font-scale="2" icon="envelope"></b-icon>
            <b-form-input
              id="email"
              v-model="form.name"
              required
              autocomplete="off"
              placeholder="請輸入電子郵件"
            ></b-form-input>
          </div>
          <p>{{this.form.nameInputDesription}}</p>
        </b-form-group>

        <b-form-group id="password-input" label-for="password-input">
          <div class="input-box">
            <b-icon class="mr-2" font-scale="2" icon="lock"></b-icon>
            <b-form-input
              id="password"
              v-model="form.password"
              required
              type="password"
              placeholder="請輸入密碼"
            ></b-form-input>
          </div>
        </b-form-group>

        <b-form-group id="password-reinput" label-for="password-reinput">
          <div class="input-box">
            <b-icon class="mr-2" font-scale="2" icon="lock"></b-icon>
            <b-form-input
              id="retype-password"
              v-model="form.reTypePassword"
              required
              type="password"
              placeholder="請重複輸入密碼"
            ></b-form-input>
          </div>
        </b-form-group>

        <p>*** 點擊「註冊」即代表您已閱讀並瞭解服務條款及隱私權聲明。 ***</p>
        {{ this.form.msg }} <br>
        <b-button
          @click="checkPassword"
          variant="danger"
          class="m-2"
          to="/registration"
          >註冊
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "Registration",
  components: {
    ResponsiveNavigation,
    Breadcrumb,
  },

  data() {
    return {
      form: {
        name: "",
        password: "",
        reTypePassword: "",
        msg: "",
        nameInputDesription: "",
      },
      show: true,
    };
  },
  computed: {
    ...mapState({
      wait: (state) => state.user.wait,
      responseMsg: (state) => state.user.responseMsg,
    }),
  },
  watch: {
    // 輸入的時候向後端請求判斷名稱是否存在
    "form.name": function () {
      this.checkUsernameWhileTyping();
    },
  },
  methods: {
    checkPassword() {
      // 密碼一樣才能給註冊
      if (this.form.password === this.form.reTypePassword) {
        this.signUp();
        return;
      }
      // 不一樣的話就清空輸入
      this.form.password = "";
      this.form.reTypePassword = "";
      this.form.msg = "密碼輸入不同，請重新輸入密碼";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    signUp() {
      var name = this.form.name;
      var password = this.form.password;
      console.log(name);
      console.log(password);
      this.$store.dispatch("user/sendSignUpInfo", {
        username: name,
        password: password,
      }).then(() => {
        console.log(this.responseMsg);
        if (this.responseMsg === -1) {
          this.form.msg = "名稱已存在";
        }
      });
    },
    // lodash裡的套件, debounce可以delay在watcher裡的function, 打完字後500ms才請求後端
    checkUsernameWhileTyping: _.debounce(function() {
      this.$store.dispatch("user/sendUsernameInfo", {
        username: this.form.name,
      }).then(() => {
        console.log(this.responseMsg);
        if (this.responseMsg === -1) {
          this.form.nameInputDesription = "名稱可以使用";
        } else if (this.responseMsg === 1){
          this.form.nameInputDesription = "名稱已存在";
        }
      });
    }, 500),
  },
};
</script>

<style scoped lang="scss">
@import "./styles/RegistrationStyles";
</style>
