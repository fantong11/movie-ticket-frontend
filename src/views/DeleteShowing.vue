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
              :items="showingList"
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
  name: "DeleteShowing",
  components: {
    AdminSideBar,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        "selected",
        {
          key: "name",
          sortable: true,
        },
        {
          key: "location",
          label: "location",
          sortable: false,
        },
        {
          key: "show_time",
          sortable: false,
        },
        {
          key:"audio"
        },
      ],
      selectShowings: [],
    };
  },
  computed: {
    ...mapState({
      showingList: (state) => state.showing.showingList,
    }),
  },
  mounted() {
    this.adminCheck();
    this.initShowing();
  },

  methods: {
    initShowing() {
      // 每次進頁面時都要向後端請求電影資料
      this.$store.dispatch("showing/GetShowingDetail");
    },
    adminCheck() {
      this.$store.dispatch("user/adminBoard", {
        token: localStorage.getItem("token"),
      });
    },
    onRowSelected(showings) {
      this.selectShowings = showings;
    },
    onDelete() {
      this.$store
        .dispatch("showing/deleteShowings", {
          token: localStorage.getItem("token"),
          deleteId: this.convertSelectedShowings(),
        })
        .then(() => {
          this.initShowing();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.selectShowings);
      console.log(this.convertSelectedShowings(),"fuck");
    },
    convertSelectedShowings() {
      let selectedShowingId = [];
      this.selectShowings.forEach((showing) => {
        selectedShowingId.push({ id: showing.showing_id });
      });
      return selectedShowingId;
    },
  },
};
</script>