<template>
  <div class="drink">
    <b-card-group>
      <b-card no-body img-top>
        <img
          class="cola-img"
          :src="require(`../assets/cola.jpeg`)"
          alt="Image"
        />
        <b-card-body>
          <h4>大可樂</h4>
          <b-card-text> ${{ drink.largeCola.cost }} </b-card-text>
          <b-form-select
            class="select-option"
            v-model="selected.large"
            :options="options"
          ></b-form-select>
        </b-card-body>
      </b-card>

      <b-card no-body img-top>
        <img
          class="cola-img"
          :src="require(`../assets/cola.jpeg`)"
          alt="Image"
        />
        <b-card-body>
          <h4>中可樂</h4>
          <b-card-text> ${{ drink.mediumCola.cost }} </b-card-text>
          <b-form-select
            class="select-option"
            v-model="selected.medium"
            :options="options"
          ></b-form-select>
        </b-card-body>
      </b-card>

      <b-card no-body img-top>
        <img
          class="cola-img"
          :src="require(`../assets/cola.jpeg`)"
          alt="Image"
        />
        <b-card-body>
          <h4>小可樂</h4>
          <b-card-text> ${{ drink.smallCola.cost }} </b-card-text>
          <b-form-select
            class="select-option"
            v-model="selected.small"
            :options="options"
          ></b-form-select>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "Drink",
  data() {
    return {
      selected: {
        large: 0,
        medium: 0,
        small: 0,
      },
      drink: {
        largeCola: {
          cost: 70,
          subtotal: 0,
        },
        mediumCola: {
          cost: 60,
          subtotal: 0,
        },
        smallCola: {
          cost: 50,
          subtotal: 0,
        }
      },
      options: [
        { value: 0, text: "0" },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
      ],
    };
  },
};
</script>

<style scoped lang="sass">
@import "./styles/Drink"
</style>