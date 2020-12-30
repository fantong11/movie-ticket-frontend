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
      <p class="my-4" v-show="selected.adultTicket.qty">
        全票 X {{ selected.adultTicket.qty }}
      </p>
      <p class="my-4" v-show="selected.concesstionTicket.qty">
        優待票 X {{ selected.concesstionTicket.qty }}
      </p>
      <p class="my-4" v-show="selected.largeCola.qty">
        大可樂 X {{ selected.largeCola.qty }}
      </p>
      <p class="my-4" v-show="selected.mediumCola.qty">
        中可樂 X {{ selected.mediumCola.qty }}
      </p>
      <p class="my-4" v-show="selected.smallCola.qty">
        小可樂 X {{ selected.smallCola.qty }}
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
      selected: {
        adultTicket: {
          name: "全票",
          qty: 0,
          cost: 300,
        },
        concesstionTicket: {
          name: "優待票",
          qty: 0,
          cost: 270,
        },
        largeCola: {
          name: "大可樂",
          qty: 0,
          cost: 70,
        },
        mediumCola: {
          name: "中可樂",
          qty: 0,
          cost: 60,
        },
        smallCola: {
          name: "小可樂",
          qty: 0,
          cost: 50,
        },
      },
      totalCost: 0,
    };
  },
  methods: {
    // 按下一部按鈕的時候，顯示購買資訊
    showInfo() {
      this.selected.adultTicket.qty = this.$refs[
        "ticket"
      ].items[0].qty.selected;
      this.selected.concesstionTicket.qty = this.$refs[
        "ticket"
      ].items[1].qty.selected;

      this.selected.largeCola.qty = this.$refs["drink"].selected.large;
      this.selected.mediumCola.qty = this.$refs["drink"].selected.medium;
      this.selected.smallCola.qty = this.$refs["drink"].selected.small;

      this.totalCost =
        this.selected.largeCola.qty * this.selected.largeCola.cost +
        this.selected.mediumCola.qty * this.selected.mediumCola.cost +
        this.selected.smallCola.qty * this.selected.smallCola.cost +
        this.$refs["ticket"].items[0].subtotal +
        this.$refs["ticket"].items[1].subtotal;
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