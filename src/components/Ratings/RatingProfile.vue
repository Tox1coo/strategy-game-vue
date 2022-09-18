<template>
  <div class="ratings__item rating-info">
    <h3 class="subtitle">{{ ratingItem.title }}</h3>
    <div
      v-for="infoItem in ratingItem.info"
      :key="infoItem"
      class="rating-info__item"
    >
      {{ infoItem }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ratingItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.rating-info {
  flex: 0 1 25%;
  &__item {
    color: #fff;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
}
</style>
