<template>
  <div class="select-ticket">
    <ResponsiveNavigation />
    <b-container class="text-left mt-5">
      <ShowingDetail :showingid="this.$route.query.showingid.toString()" />
      <Ticket @change.native="buttonEnable" ref="ticket" />
      <Drink ref="drink" />
      <b-row class="mt-5">
        <b-col md="10"></b-col>
        <b-col md="2">
          <b-button
            v-b-modal.modal-center
            @click="showInfo"
            :disabled="buttonDisable"
            size="lg"
          >
            下一步
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
    <b-modal
      id="modal-center"
      centered
      title="購物清單"
      ok-title="確認"
      @ok="saveOrderInSessionStorage"
      cancel-title="取消"
    >
      <p class="my-4" v-show="selected[0].qty">
        全票 X {{ selected[0].qty }}
      </p>
      <p class="my-4" v-show="selected[1].qty">
        優待票 X {{ selected[1].qty }}
      </p>
      <p class="my-4" v-show="selected[2].qty">
        大可樂 X {{ selected[2].qty }}
      </p>
      <p class="my-4" v-show="selected[3].qty">
        中可樂 X {{ selected[3].qty }}
      </p>
      <p class="my-4" v-show="selected[4].qty">
        小可樂 X {{ selected[4].qty }}
      </p>
      <p class="my-4" v-show="totalCost">合計：{{ totalCost }}</p>
    </b-modal>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import ShowingDetail from "@/components/ShowingDetail.vue";
import Ticket from "@/components/Ticket.vue";
import Drink from "@/components/Drink.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "SelectTicket",
  components: {
    ResponsiveNavigation,
    ShowingDetail,
    Ticket,
    Drink,
    Footer,
  },
  data() {
    return {
      buttonDisable: true,
      showModal: false,
      selected: [
        {
          name: "全票",
          qty: 0,
          cost: 300,
        },
        {
          name: "優待票",
          qty: 0,
          cost: 270,
        },
        {
          name: "大可樂",
          qty: 0,
          cost: 70,
        },
        {
          name: "中可樂",
          qty: 0,
          cost: 60,
        },
        {
          name: "小可樂",
          qty: 0,
          cost: 50,
        },
      ],
      totalCost: 0,
    };
  },
  methods: {
    // 按下一部按鈕的時候，顯示購買資訊
    showInfo() {
      this.selected[0].qty = this.$refs["ticket"].items[0].qty.selected;
      this.selected[1].qty = this.$refs["ticket"].items[1].qty.selected;

      this.selected[2].qty = this.$refs["drink"].selected.large;
      this.selected[3].qty = this.$refs["drink"].selected.medium;
      this.selected[4].qty = this.$refs["drink"].selected.small;

      this.totalCost =
        this.selected[0].qty * this.selected[0].cost +
        this.selected[1].qty * this.selected[1].cost +
        this.selected[2].qty * this.selected[2].cost +
        this.selected[3].qty * this.selected[3].cost +
        this.selected[4].qty * this.selected[4].cost;
    },
    // 當有選擇的時候按鈕打開
    buttonEnable() {
      this.buttonDisable = false;
    },
    saveOrderInSessionStorage() {
      console.log("save");
      sessionStorage.setItem("order", JSON.stringify(this.selected));
      sessionStorage.setItem("showingId", this.$route.query.showingid);
      console.log(JSON.parse(sessionStorage.getItem("order")));
      this.$router.push("/nowplayingmovie/selectseat");
    },
  },
};
</script>