<template>
  <div class="check-out">
    <ResponsiveNavigation />
    <b-container class="text-left mt-5">
      <ShowingDetail :showingid="getShowingId()" />
      <b-row>
        <b-col>
          <b-table :items="items" :fields="fields"> </b-table>
        </b-col>
      </b-row>
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
      console.log(order);
      if(order["adultTicket"]["qty"]!==0){
        this.items.push({
            product: order["adultTicket"]["name"],
            cost: order["adultTicket"]["cost"],
            quantity: order["adultTicket"]["qty"],
            total: order["adultTicket"]["qty"] * order["adultTicket"]["cost"],
      });
      }
      if(order["concesstionTicket"]["qty"]!==0){
        this.items.push({
            product: order["concesstionTicket"]["name"],
            cost: order["concesstionTicket"]["cost"],
            quantity: order["concesstionTicket"]["qty"],
            total: order["concesstionTicket"]["qty"] * order["concesstionTicket"]["cost"],
      });
      }
      if(order["largeCola"]["qty"]!==0){
        this.items.push({
            product: order["largeCola"]["name"],
            cost: order["largeCola"]["cost"],
            quantity: order["largeCola"]["qty"],
            total: order["largeCola"]["qty"] * order["largeCola"]["cost"],
      });
      }
      if(order["mediumCola"]["qty"]!==0){
        this.items.push({
            product: order["mediumCola"]["name"],
            cost: order["mediumCola"]["cost"],
            quantity: order["mediumCola"]["qty"],
            total: order["mediumCola"]["qty"] * order["mediumCola"]["cost"],
      });
      }
      if(order["smallCola"]["qty"]!==0){
        this.items.push({
            product: order["smallCola"]["name"],
            cost: order["smallCola"]["cost"],
            quantity: order["smallCola"]["qty"],
            total: order["smallCola"]["qty"] * order["smallCola"]["cost"],
      });
      }
 
      
    },
  },
};
</script>