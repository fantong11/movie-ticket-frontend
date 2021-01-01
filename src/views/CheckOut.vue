<template>
  <div class="check-out">
    <ResponsiveNavigation />
    <b-container class="text-left mt-5">
      <ShowingDetail :showingid="getShowingId()" />
      <b-row>
        <p>{{ getSelectedSeat() }}</p>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <b-table striped hover :items="items" :fields="fields"> </b-table>
        </b-col>
      </b-row>
      <b-button type="button" @click="sendOrderToBackend" class="btn btn-secondary btn-lg">結帳</b-button>
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import ShowingDetail from "@/components/ShowingDetail.vue";

export default {
  name: "CheckOut",
  components: {
    ResponsiveNavigation,
    ShowingDetail,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "product",
          label: "商品",
        },
        {
          key: "cost",
          label: "價格",
        },
        {
          key: "quantity",
          label: "數量",
        },
        {
          key: "total",
          label: "合計",
        },
      ],
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getShowingId() {
      return sessionStorage.getItem("showingId");
    },
    getOrder() {
      let order = JSON.parse(sessionStorage.getItem("order"));
      let total_many = 0;
      console.log(order);
      order.forEach((thing) => {
        if (thing.qty !== 0) {
          this.items.push({
            product: thing.name,
            cost: thing.cost,
            quantity: thing.qty,
            total: thing.qty * thing.cost,
          });
          total_many += thing.qty * thing.cost;
        }
      });
      this.items.push({
        product: "總價",
        cost: "",
        quantity: "",
        total: total_many,
      });
    },
    getSelectedSeat() {
      const seats = JSON.parse(sessionStorage.getItem("seat"));
      let formattedSeats = "座位：";

      seats.forEach((seat, i, array) => {
        if (i === array.length - 1) {
          formattedSeats += seat;
        }
        else {
          formattedSeats += seat + ", ";
        }
      });
      return formattedSeats;
    },
    sendOrderToBackend() {
      this.$store.dispatch("order/sendOrder");
    }
  },
};
</script>