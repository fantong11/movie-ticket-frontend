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
                  x: 30,
                  y: 10,
                  width: 800,
                  height: 40,
                  stroke: 'black',
                  cornerRadius: 15,
                }"
              ></v-rect>
              <v-text
                :config="{
                  x: 370,
                  y: 20,
                  text: '螢幕 Screen',
                  fontSize: 25,
                  fontFamily: 'Calibri',
                }"
              ></v-text>
              <v-text
                v-for="(row, idx) in rowField"
                :key="'C' + idx"
                :config="{
                  x: row.x,
                  y: row.y,
                  text: row.name,
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
              <v-text
                v-for="(seat, idx) in seatList"
                :key="'B' + idx"
                @mousedown="selectSeat"
                :config="{
                  name: seat.name,
                  x: seat.x + 3,
                  y: seat.y + 3,
                  text: convertToSeatNumber(idx),
                  fontSize: 25,
                  fontFamily: 'Calibri',
                }"
              ></v-text>
            </v-layer>
          </v-stage>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md="10"></b-col>
        <b-col md="2">
          <b-button v-b-modal.modal-center :disabled="buttonDisable" size="lg">
            下一步
          </b-button>
        </b-col>
      </b-row>
      <b-modal
        id="modal-center"
        centered
        title="座位選擇"
        ok-title="確認"
        @ok="saveSeatInSessionStorage"
        cancel-title="取消"
      >
        <p class="my-4">
          {{ showSelectedSeat() }}
        </p>
      </b-modal>
    </b-container>
    <Footer />
  </div>
</template>

<script>
// import Konva from 'konva'
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Footer from "@/components/Footer.vue";

// 取得上一頁填的清單
const order = JSON.parse(sessionStorage.getItem("order"));
export default {
  name: "SelectSeat",
  components: {
    ResponsiveNavigation,
    Footer
  },
  data() {
    return {
      currentTicket: 0,
      maxTicket: order.adultTicket + order.concesstionTicket,
      selectedSeat: [],
      configKonva: {
        width: 1000,
        height: 600,
      },
      seatList: [],
      rowField: [], // 欄位名稱
      row: 10,
      col: 20,
      soldSeat: ["A7", "G4", "D4", "E8", "B19"], // 賣出的座位
      buttonDisable: true,
    };
  },
  mounted() {
    console.log(order.adultTicket + order.concesstionTicket);
    this.initSeatMap();
    this.initSoldSeatMap();
  },
  watch: {
    // 按鈕防呆，小於購買票數不給按
    selectedSeat: function () {
      if (this.currentTicket < this.maxTicket) {
        this.buttonDisable = true;
      } else this.buttonDisable = false;
    },
  },
  methods: {
    // 畫出座位圖
    initSeatMap() {
      for (let i = 0; i < this.row; i++) {
        this.rowField.push({
          name: String.fromCharCode(65 + i),
          x: 0,
          y: 50 * i + 73,
        });
        for (let j = 0; j < this.col; j++) {
          if (j > 15) {
            this.seatList.push({
              name: this.rowField[i].name + (j + 1),
              x: 37 * j + 90,
              y: 50 * i + 70,
              width: 30,
              height: 30,
              fill: "",
            });
          } else if (j > 3) {
            this.seatList.push({
              name: this.rowField[i].name + (j + 1),
              x: 37 * j + 60,
              y: 50 * i + 70,
              width: 30,
              height: 30,
              fill: "",
            });
          } else {
            this.seatList.push({
              name: this.rowField[i].name + (j + 1),
              x: 37 * j + 30,
              y: 50 * i + 70,
              width: 30,
              height: 30,
              fill: "",
            });
          }
        }
      }
    },
    // 畫出已經賣出的座位
    initSoldSeatMap() {
      this.soldSeat.forEach((seatName) => {
        const seat = this.seatList.find((s) => s.name === seatName);
        console.log(seat.name);
        seat.fill = "rgb(247, 89, 123)";
      });
    },
    // 索引轉成座位號碼
    convertToSeatNumber(idx) {
      return (idx % this.col) + 1;
    },
    // 座位選擇事件
    selectSeat(e) {
      // 選擇的座位已賣出
      const name = e.target.name();
      if (this.seatIsSold(name)) return;

      const seat = this.seatList.find((s) => s.name === name);
      // 點擊已經選擇的座位來取消座位
      if (this.seatIsSelected(name)) {
        this.currentTicket--;
        seat.fill = "";
        this.selectedSeat = this.selectedSeat.filter((seat) => seat !== name);
        return;
      }

      // 超過購買的票
      if (this.currentTicket >= this.maxTicket) return;

      // 選擇座位
      this.currentTicket++;
      seat.fill = "rgb(39, 153, 221)";
      this.selectedSeat.push(seat.name);
    },
    // 座位是否已經賣出
    seatIsSold(name) {
      return this.soldSeat.includes(name);
    },
    // 座位是否已經選擇
    seatIsSelected(name) {
      return this.selectedSeat.includes(name);
    },
    // 把選擇的座位存在sessionStorage
    saveSeatInSessionStorage() {
      sessionStorage.setItem("seat", JSON.stringify(this.selectedSeat));
      console.log(JSON.parse(sessionStorage.getItem("seat")));
    },
    // 顯示選擇的座位在modal
    showSelectedSeat() {
      let sortSelectedSeat = "";
      this.selectedSeat.forEach(seat => {
        sortSelectedSeat = sortSelectedSeat + seat + ", "
      });
      return sortSelectedSeat;
    }
  },
};
</script>