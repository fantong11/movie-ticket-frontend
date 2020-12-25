<template>
  <div class="select-seat">
    <ResponsiveNavigation />
    <b-container class="mt-5">
      <b-row>
        <h3>選擇座位</h3>
      </b-row>
      <b-row>
        <b-col md="12">
          <v-stage :config="configKonva">
            <v-layer>
              <v-rect
                :config="{
                  x: 10,
                  y: 10,
                  width: 800,
                  height: 40,
                  stroke: 'black',
                  cornerRadius: 15,
                }"
              ></v-rect>
              <v-text
                :config="{
                  x: 350,
                  y: 20,
                  text: '螢幕 Screen',
                  fontSize: 25,
                  fontFamily: 'Calibri',
                }"
              ></v-text>
              <v-text
                v-for="(seat, idx) in seatList"
                :key="'B' + idx"
                :config="{
                  x: seat.x + 3,
                  y: seat.y + 3,
                  text: convertToSeatNumber(idx),
                  fontSize: 25,
                  fontFamily: 'Calibri',
                }"
              ></v-text>
              <v-rect
                v-for="(seat, idx) in seatList"
                :key="'A' + idx"
                @mousedown="selectSeat"
                :config="{
                  name: seat.name,
                  x: seat.x,
                  y: seat.y,
                  width: seat.width,
                  height: seat.height,
                  fill: seat.fill,
                  stroke: 'black',
                  cornerRadius: 7,
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
      rowField: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], // 欄位名稱
      row: 10,
      col: 20,
    };
  },
  mounted() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (j > 15) {
          this.seatList.push({
            name: this.rowField[i] + (j + 1),
            x: 37 * j + 70,
            y: 50 * i + 70,
            width: 30,
            height: 30,
            fill: '',
          });
        } else if (j > 3) {
          this.seatList.push({
            name: this.rowField[i] + (j + 1),
            x: 37 * j + 40,
            y: 50 * i + 70,
            width: 30,
            height: 30,
            fill: '',
          });
        } else {
          this.seatList.push({
            name: this.rowField[i] + (j + 1),
            x: 37 * j + 20,
            y: 50 * i + 70,
            width: 30,
            height: 30,
            fill: '',
          });
        }
      }
    }
    console.log(this.seatList);
  },
  methods: {
    convertToSeatNumber(idx) {
      return (idx % this.col) + 1;
    },
    // 座位選擇事件
    selectSeat(e) {
      console.log(e);
      const name = e.target.name();
      const rect = this.seatList.find((r) => r.name === name);
      rect.fill = "red";
      console.log(rect);
    }
  },
};
</script>