<template>
  <div class="member">
    <ResponsiveNavigation msg="Welcome to Your Vue.js App" />
    <b-container class="border border-info text-left" fluid="lg">
      <b-table :items="orderList" :fields="fields" responsive> </b-table>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
export default {
  name: "member",
  components: {
    ResponsiveNavigation,
  },
  data() {
    return {
      fields: [
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
      this.$store.dispatch("order/fetchUserOrder").then(() => {
        console.log(this.orderList);
      });
    },
  },
};
</script>