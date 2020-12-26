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
      <p class="my-4" v-show="selected.adultTicket">
        全票 X {{ selected.adultTicket }}
      </p>
      <p class="my-4" v-show="selected.concesstionTicket">
        優待票 X {{ selected.concesstionTicket }}
      </p>
      <p class="my-4" v-show="selected.largeCola">
        大可樂 X {{ selected.largeCola }}
      </p>
      <p class="my-4" v-show="selected.mediumCola">
        中可樂 X {{ selected.mediumCola }}
      </p>
      <p class="my-4" v-show="selected.smallCola">
        小可樂 X {{ selected.smallCola }}
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
        adultTicket: 0,
        concesstionTicket: 0,
        largeCola: 0,
        mediumCola: 0,
        smallCola: 0,
      },
      totalCost: 0,
    };
  },
  methods: {
    // 按下一部按鈕的時候，顯示購買資訊
    showInfo() {
      this.selected.adultTicket = this.$refs["ticket"].items[0].qty.selected;
      this.selected.concesstionTicket = this.$refs[
        "ticket"
      ].items[1].qty.selected;

      let largeColaCost = this.$refs["drink"].drink.largeCola.cost;
      let mediumColaCost = this.$refs["drink"].drink.mediumCola.cost;
      let smallColaCost = this.$refs["drink"].drink.smallCola.cost;

      this.selected.largeCola = this.$refs["drink"].selected.large;
      this.selected.mediumCola = this.$refs["drink"].selected.medium;
      this.selected.smallCola = this.$refs["drink"].selected.small;

      this.totalCost =
        this.selected.largeCola * largeColaCost +
        this.selected.mediumCola * mediumColaCost +
        this.selected.smallCola * smallColaCost +
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