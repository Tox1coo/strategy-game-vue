<template>
  <div
    @click.stop="$emit('eventCard')"
    :class="{ card__button_star: path === 'star' }"
    class="card__button"
  >
    <svg
      class="card__icon"
      :fill="fillIcon"
      :viewBox="viewBoxSetting"
      xmlns="http://www.w3.org/2000/svg"
      v-html="getPath"
    ></svg>
  </div>
</template>

<script>
import { icons } from "@/utils/icons";
export default {
  props: {
    path: String,
    viewBoxSetting: String,
    fillIcon: {
      type: String,
      default: "",
    },
  },

  computed: {
    getPath() {
      return icons[this.path];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.card {
  &__button {
    @include background;
    cursor: pointer;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    z-index: 1000;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    &_star {
      position: relative;
      top: 0;
      left: 0;
      transform: translateX(0);
    }
  }
  &__icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>