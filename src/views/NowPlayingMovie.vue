<template>
  <div class="nowplayingmovie">
    <ResponsiveNavigation />
    <Breadcrumb />
    <b-container>
      <div class="text-left">
        <h2 class="m-0 mt-4">熱售中</h2>
      </div>
      <div>
        <b-row>
          <b-col 
            v-for="(movie, idx) in movieList" 
            :key="idx" 
            md="3"
          >
            <b-card
              class="text-left mt-5"
              :title="movie.title"
              :img-src="require('../assets/film1.jpg')"
            >
              <b-card-text>
                {{ movie.titleEN }}
                <br />
                {{ movie.date }}
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "nowplayingmovie",
  components: {
    ResponsiveNavigation,
    Breadcrumb,
    Footer,
  },
  data() {
    return {
      movieList: [
        {
          title: "電影1",
          titleEN: "one",
          img: "film1.jpg",
          text: "87",
          date: "2000/10/1",
        },
        {
          title: "電影2",
          titleEN: "one2",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/2",
        },
        {
          title: "電影3",
          titleEN: "one3",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/3",
        },
        {
          title: "電影4",
          titleEN: "one4",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/4",
        },
        {
          title: "電影5",
          titleEN: "one5",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/5",
        },
        {
          title: "電影6",
          titleEN: "one6",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/6",
        },
        {
          title: "電影6",
          titleEN: "one6",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/6",
        },
        {
          title: "電影6",
          titleEN: "one6",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/6",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
    }),
  },
  mounted() {
    // 每次進頁面時都要向後端請求電影資料
    this.$store.dispatch("movie/fetchMovie").then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
};
</script>

<style scoped lang="scss">
@import "./styles/NowPlayingMovie.scss";
</style>