<template>
  <div class="select-seat">
    <ResponsiveNavigation />
    <b-container class="mt-5">
      <b-row>
        <b-col md="12">
          <v-stage :config="configKonva">
            <v-layer>
              <v-rect
                v-for="(seat, idx) in seatList"
                :key="idx"
                :config="{
                  x: seat.x,
                  y: seat.y,
                  width: seat.width,
                  height: seat.height,
                  fill: seat.fill,
                }"
              ></v-rect>
            </v-layer>
          </v-stage>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";

export default {
  name: "SelectSeat",
  components: {
    ResponsiveNavigation,
  },
  data() {
    return {
      selectedTickets: null,
      configKonva: {
        width: 1000,
        height: 800,
      },
      seatList: [],
      row: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        if (j > 15) {
          this.seatList.push({
            row: this.row[i],
            col: j + 1,
            x: 37 * j + 50,
            y: 50 * i,
            width: 30,
            height: 30,
            fill: "red",
          });
        } else if (j > 3) {
          this.seatList.push({
            row: this.row[i],
            col: j + 1,
            x: 37 * j + 20,
            y: 50 * i,
            width: 30,
            height: 30,
            fill: "red",
          });
        } else {
          this.seatList.push({
            row: this.row[i],
            col: j + 1,
            x: 37 * j,
            y: 50 * i,
            width: 30,
            height: 30,
            fill: "red",
          });
        }
      }
    }
    console.log(this.seatList);
  },
};
</script>