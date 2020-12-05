<template>
  <div class="admin">
    <b-container>
      <b-row class="py-3">
        <b-col class="" id="sidebar" cols="2">
          <AdminSideBar />
        </b-col>
        <b-col>
          <b-container class="border border-info">
            <b-form-group
              id="input-showing-movie"
              label-for="input-showing-movie"
              description="Showing movie"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="showing-movie"
                  v-model="form.movie"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-showing-theater"
              label-for="input-showing-theater"
              description="Showing theater"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="showing-theater"
                  v-model="form.theater"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-datepicker id="datepicker" v-model="form.showing_date" class="mb-2 mt-5"></b-form-datepicker>

            <b-form-timepicker v-model="form.showing_time" show-seconds class="mb-2 mt-5" hour12="false"></b-form-timepicker>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar.vue";

export default {
  name: "AddShowing",
  components: {
    AdminSideBar,
  },
  data() {
    return {
      form: {
        movie: "",
        theater: "",
        showing_date: "",
        showing_time: "",
      },
      show: true,
    };
  },
  mounted() {
    this.$store.dispatch("user/adminBoard", {
      token: localStorage.getItem("token"),
    });
  },
};
</script>
