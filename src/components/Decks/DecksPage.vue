<template>
  <div class="decks__body">
    <div class="title">{{ decksTitle }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    decksTitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.decks__body {
  flex: 1 1;
}
</style>