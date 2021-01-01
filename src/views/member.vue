<template>
  <div class="member">
    <h1>I am a member</h1>
    <b-table :items="orderList" :fields="fields" responsive="sm"> </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "member",
  components: {},
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList,
    }),
  },
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "訂單編號",
        },
        {
          key: "order_time",
          label: "下訂時間",
        },
        {
          key: "price",
          label: "金額",
        },
      ],
    };
  },
  mounted() {
    this.initOrder();
  },
  methods: {
    initOrder() {
      this.$store.dispatch("order/fetchUserOrder").then(() => {
        console.log(this.orderList);
      });
    },
  },
};
</script>