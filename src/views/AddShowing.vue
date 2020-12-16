<template>
  <div class="admin">
    <b-container>
      <b-row class="py-3">
        <b-col class="" id="sidebar" cols="2">
          <AdminSideBar />
        </b-col>
        <b-col>
          <b-container class="border border-info text-left">
            <b-form-group
              id="input-showing-movie"
              label-for="input-showing-movie"
            >
              <h4>Showing Movie</h4>
              <div class="input-box">
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
            >
              <h4>Showing Theater</h4>
              <div class="input-box">
                <b-form-input
                  id="showing-theater"
                  v-model="form.theater"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>
            <h4>Select Date</h4>
            <b-form-datepicker id="datepicker" v-model="form.showing_date"></b-form-datepicker>
            <br>
            <h4>Select Time</h4>
            <b-form-timepicker v-model="form.showing_time" show-seconds :hour12="false"></b-form-timepicker>
            <br>
            <div class="text-center">
              <b-button class="mt-4 mb-3 btn btn-default" variant="primary" to="">Add</b-button>
            </div>
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
