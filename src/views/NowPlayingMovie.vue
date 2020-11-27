<template>
  <div class="nowplayingmovie">
    <ResponsiveNavigation />
    <Breadcrumb />
    <b-container>
      <div class="text-left">
        <h2 class="m-0 mt-4">熱售中</h2>
      </div>
      <div :v-show="wait">
        <b-row>
          <!-- 印出電影的迴圈 -->
          <b-col v-for="(movie, idx) in paginatedItems" :key="idx" md="3">
            <b-card
              no-body
              class="text-left mt-5 card"
              :title="movie.name"
              :img-src="require(`../assets/${movie.picPath}`)"
            >
              <b-card-body>
                <b-link class="movie-link" :to="{ name: 'Movie', params: { movieId: movie.id, movieName: transferName(movie.nameEN) }}">
                  <h5>{{ movie.name }}</h5>
                </b-link>
                <b-card-text>
                  {{ movie.nameEN }}
                  <br />
                  {{ movie.date }}
                </b-card-text>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-pagination
            class="mt-5"
            @change="onPageChanged"
            @click.native="scrollToTop"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
          />
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
      items: [],
      paginatedItems: [],
      perPage: 8,
      totalRows: 0,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
      wait: (state) => state.movie.wait,
    }),
    pageCount() {
      return Math.floor(this.totalRows / this.perPage);
    },
  },
  mounted() {
    // 每次進頁面時都要向後端請求電影資料
    this.$store
      .dispatch("movie/fetchAllMovie")
      .then(() => {
        this.initPaginatedItems();
        this.paginate(this.perPage, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // 初始化變數
    initPaginatedItems() {
      this.items = this.movieList;
      this.paginatedItems = this.movieList;
      this.totalRows = this.movieList.length;
    },
    // 分頁
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    // 回到頁面最上方
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    // 轉換電影名字 ex. Demon Slayer ---> demon-slayer
    transferName(movieName) {
      return movieName.toLowerCase().replaceAll(" ", "-");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./styles/NowPlayingMovie.scss";
</style>