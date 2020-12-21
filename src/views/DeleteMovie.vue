<template>
  <b-container>
    <b-row class="py-3">
      <b-col class="" id="sidebar" cols="2">
        <AdminSideBar />
      </b-col>
      <b-col>
        <b-container class="border border-info text-left">
          <div>
            <b-table striped hover :items="items" :fields="fields">
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
          key: "moviename",
          sortable: false,
        },
        {
          key: "type",
          label: "Person age",
          sortable: true,
        },
      ],
      items: [],
    };
  },
  mounted() {
    this.$store.dispatch("user/adminBoard", {
      token: localStorage.getItem("token"),
    });
    // 每次進頁面時都要向後端請求電影資料
    this.$store
      .dispatch("movie/fetchAllMovie", {})
      .then(() => {
        this.items=this.movieList;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>