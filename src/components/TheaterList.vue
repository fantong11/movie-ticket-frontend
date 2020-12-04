<template>
  <div class="theaterlist">
    <b-list-group>
      <b-list-group-item button v-for="(theater, idx) in theaterList" :key="idx">
        {{ theater.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "TheaterList",
  data() {
    return {
      theaterList: [
        {
          id: 1,
          name: "台北哭啊影城"
        },
        {
          id: 2,
          name: "台中哭啊影城"
        },
        {
          id: 3,
          name: "台難哭啊影城"
        }
      ],
    }
  },
};
</script>