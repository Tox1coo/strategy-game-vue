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
  position: absolute;
  height: 100%;
  right: 0;
  z-index: 1111;
  top: 0;
  display: flex;
  align-items: flex-end;
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
  transform: translateX(100%);

  transition: all 2s ease;
}

.notify-effect-enter-to {
  transform: translateX(0);
  visibility: visible;
  opacity: 1;
}
.notify-effect-leave-to {
  transform: translateX(100%);
  visibility: hidden;
  opacity: 0;
}
</style>