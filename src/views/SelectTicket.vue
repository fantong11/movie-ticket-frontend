<template>
  <div class="select-ticket">
    <ResponsiveNavigation />
    <b-container class="text-left mt-5">
      <b-row>
        <b-col md="6">
          <h3>{{ movieName }}</h3>
          <h5>{{ movieNameEn }}</h5>
        </b-col>
        <b-col md="6">
          <p>時間：{{ getDatetime(showTime) }}</p>
          <p>影城：{{ theaterName }}</p>
          <p>影廳：{{ theaterAudio }}廳</p>
        </b-col>
      </b-row>
      <b-row>
        <h2>選擇電影票</h2>
      </b-row>
      <b-row>
        <b-col>
          <Ticket @change.native="buttonEnable" ref="ticket" />
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <Drink ref="drink" />
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md="11"></b-col>
        <b-col md="1">
          <b-button
            v-b-modal.modal-center
            @click="showInfo"
            :disabled="buttonDisable"
            size="lg"
          >
            Next
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
    <b-modal id="modal-center" centered title="購物清單">
      <p class="my-4" v-show="adultTicket">全票 X {{ adultTicket }}</p>
      <p class="my-4" v-show="concesstionTicket">
        優待票 X {{ concesstionTicket }}
      </p>
      <p class="my-4" v-show="largeCola">大可樂 X {{ largeCola }}</p>
      <p class="my-4" v-show="mediumCola">中可樂 X {{ mediumCola }}</p>
      <p class="my-4" v-show="smallCola">小可樂 X {{ smallCola }}</p>
      <p class="my-4" v-show="totalCost">合計：{{ totalCost }}</p>
    </b-modal>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Ticket from "@/components/Ticket.vue";
import Drink from "@/components/Drink.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  name: "SelectTicket",
  components: {
    ResponsiveNavigation,
    Ticket,
    Drink,
    Footer,
  },
  data() {
    return {
      buttonDisable: true,
      showModal: false,
      adultTicket: 0,
      concesstionTicket: 0,
      largeCola: 0,
      mediumCola: 0,
      smallCola: 0,
      totalCost: 0,
    };
  },
  computed: {
    ...mapState({
      movieName: (state) => state.showing.movieName,
      movieNameEn: (state) => state.showing.movieNameEn,
      theaterName: (state) => state.showing.theaterName,
      showTime: (state) => state.showing.showTime,
      theaterAudio: (state) => state.showing.theaterAudio,
    }),
  },
  mounted() {
    this.initDetail();
  },
  methods: {
    initDetail() {
      this.$store.dispatch("showing/fetchDetailByShowingId", {
        showingId: this.$route.query.showingid,
      });
    },
    showInfo() {
      let largeColaCost = this.$refs["drink"].drink.largeCola.cost;
      let mediumColaCost = this.$refs["drink"].drink.mediumCola.cost;
      let smallColaCost = this.$refs["drink"].drink.smallCola.cost;

      this.largeCola = this.$refs["drink"].selected.large;
      this.mediumCola = this.$refs["drink"].selected.medium;
      this.smallCola = this.$refs["drink"].selected.small;

      this.totalCost =
        this.largeCola * largeColaCost +
        this.mediumCola * mediumColaCost +
        this.smallCola * smallColaCost +
        this.$refs["ticket"].items[0].subtotal +
        this.$refs["ticket"].items[1].subtotal;

      console.log(this.totalCost);
    },
    buttonEnable() {
      this.adultTicket = this.$refs["ticket"].items[0].qty.selected;
      this.concesstionTicket = this.$refs["ticket"].items[1].qty.selected;
      console.log(this.adultTicket);
      console.log(this.concesstionTicket);
      if (this.adultTicket !== 0 || this.concesstionTicket !== 0)
        this.buttonDisable = false;
    },
    getDatetime(datetime) {
      let date = new Date(datetime);
      return (
        date.getFullYear() +
        "/" +
        date.getMonth() +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
  },
};
</script>