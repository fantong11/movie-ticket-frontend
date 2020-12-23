<template>
  <div class="select-ticket">
    <ResponsiveNavigation />
    <b-container class="text-left mt-5">
      <b-row>
        <b-col md="6">
          <h3>XX電影</h3>
          <h5>XX Movie</h5>
        </b-col>
        <b-col md="6">
          <p>2020-03-25</p>
          <p>XX影城</p>
          <p>XX聽</p>
        </b-col>
      </b-row>
      <b-row>
        <h2>選擇電影票</h2>
      </b-row>
      <b-row>
        <b-col>
          <Ticket />
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <Drink />
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md="11"></b-col>
        <b-col md="1">
          <b-button disabled size="lg">Next</b-button>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Ticket from "@/components/Ticket.vue"
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
  computed: {
    ...mapState({
      movieName: (state) => state.showing.movieName,
      theaterName: (state) => state.showing.theaterName,
    }),
  },
};
</script>