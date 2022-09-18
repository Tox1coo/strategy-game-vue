<template>
  <div
    @click.stop="$emit('eventCard')"
    :class="{
      card__button_star: path === 'star',
      card__button_delete: path === 'remove',
      card__button_add: path === 'add',
    }"
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
    filter: brightness(0.7);
    transform: translateX(-50%);
    transition: filter 0.1s ease 0s;
    &_star {
      position: relative;
      top: 0;
      left: 0;
      transform: translateX(0);
    }
    &_delete {
      left: 40%;
      transform: translateX(-60%);
    }
    &_add {
      left: 60%;
      transform: translateX(-40%);
    }
    &:hover {
      filter: brightness(1);
    }
  }
  &__icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
