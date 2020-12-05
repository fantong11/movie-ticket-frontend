<template>
  <div class="addmovie">
    <b-container>
      <b-row class="py-3">
        <b-col class="" id="sidebar" cols="2">
          <AdminSideBar />
        </b-col>
        <b-col>
          <b-container class="border border-info">
            <b-form-group
              id="input-movie-name"
              label-for="input-movie-name"
              description="Movie name"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-name"
                  v-model="form.name"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-enname"
              label-for="input-movie-enname"
              description="Movie name_en"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-enname"
                  v-model="form.enname"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-file
              v-model="pic"
              class="my-5"
              accept=".jpg, .png"
              placeholder="Choose a picture"
            >
            </b-form-file>

            <b-form-group
              id="input-movie-description"
              label-for="input-movie-description"
              description="Movie description"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-description"
                  v-model="form.description"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-runningtime"
              label-for="input-movie-runningtime"
              description="Movie runningtime"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-runningtime"
                  v-model="form.runningtime"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-director"
              label-for="input-movie-director"
              description="Movie director"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-director"
                  v-model="form.director"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-actors"
              label-for="input-movie-actors"
              description="Movie actors"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-actors"
                  v-model="form.actors"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-type"
              label-for="input-movie-type"
              description="Movie type"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-type"
                  v-model="form.type"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-classification"
              label-for="input-movie-classification"
              description="Movie classification"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-classification"
                  v-model="form.classification"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group
              id="input-movie-date"
              label-for="input-movie-date"
              description="Movie date"
            >
              <div class="input-box mx-5">
                <b-icon class="mr-2" font-scale="2"></b-icon>
                <b-form-input
                  id="movie-date"
                  v-model="form.date"
                  required
                  autocomplete="off"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-button class="mt-4 mb-3" variant="primary" to="">Summit</b-button>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AdminSideBar from "@/components/AdminSideBar.vue";

export default {
  name: "AddMovie",
  components: {
    AdminSideBar,
  },
  data() {
    return {
      form: {
        name: "",
        pic: null,
        description: "",
        runningtime: "",
        director: "",
        actors: "",
        type: "",
        classification: "",
        date: "",
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
