<template>
  <div class="ratings__item rating-info">
    <h3 class="subtitle">{{ ratingItem.title }}</h3>
    <div
      v-for="infoItem in ratingItem.info"
      :key="infoItem"
      class="rating-info__item"
      :class="{ 'rating-info_link': ratingItem.title === 'Никнеймы' }"
    >
      <router-link
        v-if="ratingItem.title === 'Никнеймы'"
        :to="`/profile/${infoItem}`"
      >
        {{ infoItem }}
      </router-link>
      <span v-else>{{ infoItem }}</span>
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
  &_link {
    a {
      color: $poison-color;
      opacity: 0.7;
      transition: opacity 0.1s ease 0s;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
