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
              striped
              hover
              :items="movieList"
              :fields="fields"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
            >
              <template #cell(select)="row">
                <b-form-checkbox v-model="row.detailsShowing"></b-form-checkbox>
              </template>
            </b-table>
          </div>
          <div class="text-center">
            <b-button class="mt-4 mb-3 btn btn-default" variant="primary" to="">
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
        "select",
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
      checkedArray: [],
    };
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
    }),
  },
  mounted() {
    this.$store.dispatch("user/adminBoard", {
      token: localStorage.getItem("token"),
    });
    // 每次進頁面時都要向後端請求電影資料
    this.$store
      .dispatch("movie/fetchMovieByRelease", { release: "all" })
      .then(() => {
        this.items = this.movieList;
        this.initCheckboxArray();
        console.log(this.checkedArray);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    initCheckboxArray() {
      for (let i = 0; i < this.movieList.length; i++) {
        this.checkedArray.push({ checked: false });
      }
    },
    onRowSelected(items) {
      console.log(items);
    },
  },
};
</script>