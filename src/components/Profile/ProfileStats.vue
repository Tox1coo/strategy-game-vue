<template>
  <div class="ratings__stats stats">
    <div
      v-for="statsItem in statsItems"
      :key="statsItem.name"
      class="stats-item"
    >
      <svg width="15" height="15" class="stats-item__img">
        {{ statsItem.pathName }}
      </svg>
      <div class="stats-item__body">
        {{ statsItem.body }}
      </div>
      <div class="stats-item__title">
        {{ statsItem.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statsItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  color: $poison-color;
  font-size: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 0;
  @media (max-width: 800px) {
    order: 1;
    width: 100%;
  }
  &-item {
    flex: 0 1 50%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
