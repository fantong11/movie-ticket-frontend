<template>
  <b-container>
    <b-row class="py-3">
      <b-col class="" id="sidebar" cols="2">
        <AdminSideBar />
      </b-col>
      <b-col>
        <b-container class="border border-info text-left">
          <div>
            <b-table
              :items="movieList"
              :fields="fields"
              select-mode="multi"
              responsive="sm"
              ref="selectableTable"
              selectable
              @row-selected="onRowSelected"
            >
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
            </b-table>
          </div>
          <div class="text-center">
            <b-button
              @click="onDelete"
              class="mt-4 mb-3 btn btn-default"
              variant="primary"
              to=""
            >
              Delete
            </b-button>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
import AdminSideBar from "@/components/AdminSideBar.vue";
export default {
  name: "DeleteMovie",
  components: {
    AdminSideBar,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        "selected",
        {
          key: "id",
          sortable: true,
        },
        {
          key: "name",
          label: "moviename",
          sortable: false,
        },
        {
          key: "movie_type",
          sortable: true,
        },
      ],
      selectMovies: [],
    };
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
    }),
  },
  mounted() {
    this.adminCheck();
    this.initMovie();
  },

  methods: {
    initMovie() {
      // 每次進頁面時都要向後端請求電影資料
      this.$store.dispatch("movie/fetchMovieByRelease", { release: "all" });
    },
    adminCheck() {
      this.$store.dispatch("user/adminBoard", {
        token: localStorage.getItem("token"),
      });
    },
    onRowSelected(movies) {
      this.selectMovies = movies;
    },
    onDelete() {
      this.$store
        .dispatch("movie/deleteMovie", {
          deleteId: this.convertSelectedMovies(),
        })
        .then(() => {
          this.initMovie();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.selectMovies);
      console.log(this.convertSelectedMovies());
    },
    convertSelectedMovies() {
      let selectedMovieId = [];
      this.selectMovies.forEach((movie) => {
        selectedMovieId.push({ id: movie.id });
      });
      return selectedMovieId;
    },
  },
};
</script>