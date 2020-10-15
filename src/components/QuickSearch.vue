<template>
  <div class="quick-search">
    <div class="quick-search-box">
      <h1>快速訂票</h1>
      <b-form class="quick-search mt-3">
        <b-form-group id="select-cinema">
          <div class="select-box">
            <b-icon class="mr-2" font-scale="2" icon="battery-full"></b-icon>
            <b-form-select
              v-model="cinemas.selected"
              :options="cinemas.options"
            ></b-form-select>
          </div>
        </b-form-group>
        <b-form-group id="select-movie">
          <div class="select-box">
            <b-icon class="mr-2" font-scale="2" icon="camera-reels"></b-icon>
            <b-form-select
              v-model="movies.selected"
              :options="movies.options"
            ></b-form-select>
          </div>
        </b-form-group>
        <b-form-group id="select-date">
          <div class="select-box">
            <b-icon class="mr-2" font-scale="2" icon="calendar3"></b-icon>
            <b-form-select
              v-model="dates.selected"
              :options="dates.options"
            ></b-form-select>
          </div>
        </b-form-group>
        <b-form-group id="select-showing">
          <div class="select-box">
            <b-icon class="mr-2" font-scale="2" icon="clock"></b-icon>
            <b-form-select
              v-model="showings.selected"
              :options="showings.options"
            ></b-form-select>
          </div>
        </b-form-group>
        <b-button class="m-2" type="submit" variant="secondary "
          >前往訂票</b-button
        >
        <b-button class="m-2" type="reset" variant="secondary "
          >查看座位</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuickSearch",
  data() {
    return {
      // 日前為假資料
      cinemas: {
        selected: null,
        options: [
          { value: null, text: "請選擇影城" },
          { value: 1, text: "信義威秀" },
          { value: 2, text: "京站威秀" },
        ],
      },
      movies: {
        selected: null,
        options: [
          { value: null, text: "請選擇影片" },
          { value: 1, text: "鬼滅" },
          { value: 2, text: "紫羅蘭" },
        ],
      },
      dates: {
        selected: null,
        options: [
          { value: null, text: "請選擇日期" },
          { value: 1, text: "今天" },
          { value: 2, text: "2020/10/15" },
          { value: 3, text: "2020/10/16" },
        ],
      },
      showings: {
        selected: null,
        options: [
          { value: null, text: "請選擇場次" },
          { value: 1, text: "12:00" },
          { value: 2, text: "15:00" },
        ],
      },
    };
  },
};
</script>

<style scoped lang="scss">
@import "./styles/QuickSearch";
</style>