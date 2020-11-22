<template>
  <div class="nowplayingmovie">
    <ResponsiveNavigation />
    <Breadcrumb />
    <b-container>
      <div class="text-left">
        <h2>熱售中</h2>
      </div>
      <b-row>
        <div v-for="movie in MovieList" :key="movie">
          <b-col class="movie">
            <b-card
              :title="movie.title"
              img-src="https://picsum.photos/600/300/?image=25"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
              style="max-width: 12.25rem"
            >
              <b-card-text>
                {{ movie.titleEN }}
                <br />
                {{ movie.date }}
              </b-card-text>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "nowplayingmovie",
  components: {
    ResponsiveNavigation,
    Breadcrumb,
  },
  data() {
    return {
      MovieList: [
        {
          title: "1",
          titleEN: "one",
          img: "https://picsum.photos/600/300/?image=25",
          text: "87",
          date: "2000/10/1",
        },
        {
          title: "2",
          titleEN: "one2",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/2",
        },
        {
          title: "3",
          titleEN: "one3",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/3",
        },
        {
          title: "4",
          titleEN: "one4",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/4",
        },
        {
          title: "5",
          titleEN: "one5",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/5",
        },
        {
          title: "6",
          titleEN: "one6",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/6",
        },
        {
          title: "6",
          titleEN: "one6",
          img: "https://picsum.photos/600/300/?image=25",
          date: "2000/10/6",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "./styles/NowPlayingMovie.scss";
</style>