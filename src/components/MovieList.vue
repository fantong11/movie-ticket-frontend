<template>
  <div class="movielist">
    <b-container>
      <b-row>
        <!-- 印出電影的迴圈 -->
        <b-col v-for="(movie, idx) in paginatedItems" :key="idx" md="3">
          <b-card
            no-body
            img-top
            class="text-left mt-5 card"
            :title="movie.name"
          >
            <b-link
              :to="{
                name: 'Movie',
                params: {
                  movieId: movie.id,
                  movieName: transferName(movie.name_en),
                },
              }"
            >
              <img
                class="movie-img"
                :src="require(`../assets/${movie.pic_path}`)"
                alt=""
              />
            </b-link>
            <b-card-body>
              <b-link
                class="movie-link"
                :to="{
                  name: 'Movie',
                  params: {
                    movieId: movie.id,
                    movieName: transferName(movie.name_en),
                  },
                }"
              >
                <h5>{{ movie.name }}</h5>
              </b-link>
              <b-card-text>
                {{ movie.name_en }}
                <br />
                {{ getMovieTime(movie) }}
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
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import store from "../store/index";

export default {
  name: "MovieList",
  props: {
    release: String,
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
  beforeRouteEnter(to, from, next) {
    console.log("32094857093");
    next();
    // store
    //   .dispatch("movie/fetchMovieByRelease", { release: "now" })
    //   .then(() => {
    //     console.log(to.meta.release);
    //     next((vm) => vm.setData());
    //   })
    //   .catch((err) => {
    //     next();
    //     console.log(err);
    //   });
  },
  mounted() {
    //每次進頁面時都要向後端請求電影資料
    this.$store
      .dispatch("movie/fetchMovieByRelease", { release: this.release })
      .then(() => {
        this.initPaginatedItems();
        this.paginate(this.perPage, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapState({
      movieList: (state) => state.movie.movieList,
    }),
    pageCount() {
      return Math.floor(this.totalRows / this.perPage);
    },
  },
  methods: {
    setData() {
      this.initPaginatedItems();
      this.paginate(this.perPage, 0);
    },
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
    // 拿電影日期
    getMovieTime(movie) {
      let date = new Date(movie.release_date);
      return (
        date.getFullYear() + " - " + (date.getMonth() + 1) + " - " + date.getDate()
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "./styles/MovieList.scss";
</style>