<template>
  <div class="home">
    <ResponsiveNavigation msg="Welcome to Your Vue.js App" />
    <Carousel />
    <b-container class="content-container" fluid="lg">
      <b-row>
        <b-col cols="6">
          <div class="quick-search-box">
            <h1>快速訂票</h1>
            <b-form class="quick-search"> 
              <b-form-group id="select-cinema">
                <b-form-select v-model="cinemas.selected" :options="cinemas.options"></b-form-select>
              </b-form-group>
              <b-form-group id="select-cinema">
                <b-form-select v-model="cinemas.selected" :options="cinemas.options"></b-form-select>
              </b-form-group>
              <b-form-group id="select-cinema">
                <b-form-select v-model="cinemas.selected" :options="cinemas.options"></b-form-select>
              </b-form-group>
              <b-form-group id="select-cinema">
                <b-form-select v-model="cinemas.selected" :options="cinemas.options"></b-form-select>
              </b-form-group>
              <b-button class="m-2" type="submit" variant="primary">Submit</b-button>
              <b-button class="m-2" type="reset" variant="danger">Reset</b-button>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  name: "Home",
  components: {
    ResponsiveNavigation,
    Carousel,
  },
  data() {
    return {
      cinemas: {
        selected: null,
        options: [
          { value: null, text: '請選擇影城' },
          { value: 1, text: '信義威秀' },
          { value: 2, text: '京站威秀' },
        ],
      },
      show: true,
    };
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
@import "./styles/HomeStyles";
</style>