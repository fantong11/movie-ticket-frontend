<template>
  <div class="ticket">
    <b-card header="一般票種" header-tag="header">
      <b-table striped hover :items="items" :fields="fields">
        <template v-slot:cell(qty)="row">
          <b-form-group>
            <b-form-select
              class="w-50"
              v-model="row.item.qty.selected"
              :options="row.item.qty.options"
            >
            </b-form-select>
          </b-form-group>
        </template>
        <template v-slot:cell(subtotal)="row">
          {{ calTotal(row.item.cost, row.item.qty.selected) }}
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Ticket",
  data() {
    return {
      fields: [
        { key: "ticket_type", label: "票種" },
        { key: "cost", label: "價格" },
        { key: "qty", label: "數量" },
        { key: "subtotal", label: "合計" },
      ],
      items: [
        {
          ticket_type: "全票",
          cost: 300,
          qty: this.qtyOptions(),
          subtotal: 0,
        },
        {
          ticket_type: "優待票",
          cost: 270,
          qty: this.qtyOptions(),
          subtotal: 0,
        },
      ],
    };
  },
  methods: {
    qtyOptions() {
      return {
        selected: 0,
        options: [
          { value: 0, text: "0" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
        ],
      };
    },
    calTotal(cost, qty) {
      return cost * qty;
    },
  },
}
</script>