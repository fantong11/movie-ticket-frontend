<template>
  <div class="select-ticket">
    <ResponsiveNavigation />
    <b-container class="text-left mt-5">
      <b-row>
        <b-col md="6">
          <h3>XX電影</h3>
          <h5>XX Movie</h5>
        </b-col>
        <b-col md="6">
          <p>2020-03-25</p>
          <p>XX影城</p>
          <p>XX聽</p>
        </b-col>
      </b-row>
      <b-row>
        <h2>選擇電影票</h2>
      </b-row>
      <b-row>
        <b-col>
          <b-card header="一般票種" header-tag="header">
            <b-table striped hover :items="items" :fields="fields">
              <template v-slot:cell(options)="row">
                <b-form-group>
                  <b-select-option :options="row.options" /> { row }
                </b-form-group>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import { mapState } from "vuex";

export default {
  name: "SelectTicket",
  components: {
    ResponsiveNavigation,
  },
  data() {
    return {
      fields: [
        {
          key: "ticket_type",
          label: "票種",
        },
        {
          key: "cost",
          label: "價格",
        },
        {
          key: "qty",
          label: "數量",
        },
        {
          key: "subtotal",
          label: "合計",
        },
      ],
      items: [
        { ticket_type: "全票", cost: 300, qty: this.options, subtotal: 0 },
        { ticket_type: "優待票", cost: 270, qty: this.options, subtotal: 0 },
      ],
      options: [
        {
          value: 0,
          text: "0",
        },
        {
          value: 1,
          text: "1",
        },
        {
          value: 2,
          text: "2",
        },
        {
          value: 3,
          text: "3",
        },
        {
          value: 4,
          text: "4",
        },
        {
          value: 5,
          text: "5",
        },
        {
          value: 6,
          text: "6",
        },
        {
          value: 7,
          text: "7",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      movieName: (state) => state.showing.movieName,
      theaterName: (state) => state.showing.theaterName,
    }),
  },
};
</script>