<template>
  <transition name="notify-effect">
    <div v-if="notify.visible" class="notify">
      <div class="notify__inner">
        <p class="text">{{ notify.message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ModalNotify",
  computed: {
    ...mapState({
      notify: (state) => state.notify.notify,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.notify {
  position: fixed;
  height: 100%;
  right: 0;
  z-index: 1111;
  top: 0;
  pointer-events: none;
  &__inner {
    @include background;
    display: flex;
    min-width: 10vw;
    min-height: 10vh;
    border-radius: 10px;
    padding: 15px;
    .text {
      margin: auto;
      color: $primary-brown-nav;
    }
  }
}

.notify-effect-enter-active,
.notify-effect-leave-active {
  right: -100%;

  transition: all 2s ease;
}

.notify-effect-enter-to {
  right: 0;

  visibility: visible;
  opacity: 1;
}
.notify-effect-leave-to {
  right: -100%;

  visibility: hidden;
  opacity: 0;
}
</style>
