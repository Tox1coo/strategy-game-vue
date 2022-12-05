<template>
  <div @drop="onDropCards($event, 'boardUser')" class="drop-battle">
    <div
      @dragstart="onDropStartCard($event)"
      v-for="userCard in userCards"
      :key="userCard.name"
      class="drop-battle__items"
    >
      <Card :cardInfo="userCard"></Card>
    </div>
  </div>
</template>

<script>
import Card from "../Card/Card.vue";
export default {
  props: {
    userCards: {
      type: Array,
    },
  },

  methods: {},
  components: { Card },
};
</script>

<style></style>
