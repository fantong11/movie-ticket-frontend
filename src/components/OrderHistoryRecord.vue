<template>
  <div class="order-history-record">
    <h3>訂單紀錄</h3>
    <b-table :items="items" :fields="fields">
      <template v-slot:cell(orderContent)="row">
        <p class="mb-0">取票序號：{{ row.item.orderContent.uid }}</p>
        <br />
        <p class="mb-0">
          影城：{{
            row.item.orderContent.theater +
              " " +
              row.item.orderContent.audio +
              "廳"
          }}
        </p>
        <br />
        <p class="mb-0">電影：{{ row.item.orderContent.movie }}</p>
        <br />
        <p class="mb-0">場次：{{ row.item.orderContent.showingTime }}</p>
        <br />
        <p class="mb-0">總計金額：${{ row.item.orderContent.totalCost }}</p>
      </template>
      <template v-slot:cell(details)="row">
        <b-button v-b-modal="row.item.detailId" size="md">詳細內容</b-button>
        <b-modal :id="row.item.detailId" centered title="訂單內容" ok-only ok-title="取消">
          <p class="mb-3">取票序號：{{ row.item.orderContent.uid }}</p>
          <p class="mb-3">
            影城：{{
              row.item.orderContent.theater +
                " " +
                row.item.orderContent.audio +
                "廳"
            }}
          </p>
          <p class="mb-3">電影：{{ row.item.orderContent.movie }}</p>
          <p class="mb-3">場次：{{ row.item.orderContent.showingTime }}</p>
          <p class="mb-3">票：{{ row.item.orderContent.seat.length }}</p>
          <p class="mb-3">餐飲：{{ getOrderedDrink(row.item.orderContent.drink) }}</p>
          <p class="mb-3">座位：{{ getOrderedSeat(row.item.orderContent.seat) }}</p>
          <p class="mb-3">總計金額：${{ row.item.orderContent.totalCost }}</p>
        </b-modal>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderHistoryRecord",
  data() {
    return {
      fields: [
        {
          key: "orderTime",
          label: "訂購時間",
        },
        {
          key: "orderContent",
          label: "訂單內容",
        },
        {
          key: "details",
          label: "詳細內容",
        },
      ],
      items: [],
    };
  },
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList,
    }),
  },
  mounted() {
    this.initOrder();
  },
  methods: {
    initOrder() {
      this.$store.dispatch("order/fetchUserOrderSeat").then(() => {
        console.log(this.orderList);
        this.items = this.orderList;
      });
    },
    getOrderedSeat(seatList) {
      let formattedSeats = "";

      seatList.forEach((seat, i, array) => {
        if (i === array.length - 1) {
          formattedSeats += seat;
        } else {
          formattedSeats += seat + ", ";
        }
      });
      return formattedSeats;
    },
    getOrderedDrink(drinkList) {
      let formattedDrinks = "";

      drinkList.forEach((drink, i, array) => {
        if (i === array.length - 1) {
          formattedDrinks += drink.drinkName + " X " + drink.amount;
        } else {
          formattedDrinks += drink.drinkName + " X " + drink.amount + ", ";
        }
      });
      return formattedDrinks;
    },
  },
};
</script>