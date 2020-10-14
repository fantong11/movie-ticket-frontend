<template>
  <div class="home">
    <ResponsiveNavigation msg="Welcome to Your Vue.js App" />
    <Carousel />
    <b-container class="content-container" fluid="lg">
      <b-row>
        <b-col cols="6">
          <div>
            <b-form>
              <b-form-group
                id="input-group-1"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
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
      show: true,
    }
  }
};
</script>
