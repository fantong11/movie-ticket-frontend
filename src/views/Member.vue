<template>
  <div class="member">
    <ResponsiveNavigation msg="Welcome to Your Vue.js App" />
    <b-container class="text-left mt-5" fluid="lg">
      <OrderHistoryRecord />
    </b-container>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation.vue";
import OrderHistoryRecord from "@/components/OrderHistoryRecord.vue";
export default {
  name: "member",
  components: {
    ResponsiveNavigation,
    OrderHistoryRecord,
  },
  
};
</script>
