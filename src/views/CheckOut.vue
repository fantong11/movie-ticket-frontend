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
      <b-form-checkbox
        id="checkbox-1"
        v-model="checked"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        使用優惠碼
      </b-form-checkbox>
      <b-form-group id="coupon-input" label-for="coupon-input">
        <div class="input-box">
          <b-form-input
            id="coupon"
            v-model="coupon"
            required
            placeholder="請輸入優惠卷編號"
          ></b-form-input>
          {{ ErrMessage }}
        </div>
      </b-form-group>
      <b-button
        type="button"
        @click="sendOrderToBackend"
        class="btn btn-secondary btn-lg"
      >
        結帳
      </b-button>
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import ShowingDetail from "@/components/ShowingDetail.vue";
import { mapState } from "vuex";

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
      coupon: "",
      checked: false,
      ErrMessage: "",
      show: true,
    };
  },
  mounted() {
    this.getOrder();
  },
  computed: {
    ...mapState({
      message: (state) => state.order.message,
    }),
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
        } else {
          formattedSeats += seat + ", ";
        }
      });
      return formattedSeats;
    },
    sendOrderToBackend() {
      if (this.checked === false) this.coupon = null;
      this.$store
        .dispatch("order/sendOrder", { coupon: this.coupon })
        .then(() => {
          if (this.message === "Wrong coupon code") {
            this.ErrMessage = "優惠碼不存在";
            return;
          }
          this.$router.push("/member");
        });
    },
  },
};
</script>