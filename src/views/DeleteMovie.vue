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
                <b-form-checkbox v-model="row.detailsShowing">
                  Delete
                </b-form-checkbox>
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
          key: "last_name",
          sortable: true,
        },
        {
          key: "first_name",
          sortable: false,
        },
        {
          key: "age",
          label: "Person age",
          sortable: true,
        },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>