<template>
  <div class="order-history-record">
    <h3>訂單紀錄</h3>
    <b-table :items="items" :fields="fields">
      <template v-slot:cell(orderContent)>
        取票序號：1111111111111111111111111111111111111111111111111111
        <br>
        影城：
        <br>
        電影：
        <br>
        場次：
        <br>
        總計金額：
      </template>
      <template v-slot:cell(details)>
        <b-button size="md">詳細內容</b-button>
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
          label: "詳細內容"
        }
      ],
      items: [
        {
          orderTime: "2020-1-1",
        },
        {
          orderTime: "2020-1-1",
        },
        {
          orderTime: "2020-1-1",
        }
      ]
    };
  },
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList,
    }),
  },
  mounted() {
    //this.initOrder();
  },
  methods: {
    initOrder() {
      this.$store.dispatch("order/fetchUserOrder").then(() => {
        console.log(this.orderList);
      });
    },
  },
}
</script>