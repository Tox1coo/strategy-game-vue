<template>
  <transition name="modal-effect">
    <div v-if="show" @click.stop="hideModal" class="modal">
      <div @click.stop class="modal__inner">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "Modal",
  props: {},
  mixins: [toggleMixin],
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 1000;
  left: 0;
  display: flex;
  &__inner {
    min-width: 30vw;
    height: fit-content;
    min-height: 20vh;
    padding: 15px;
    border-radius: 20px;
    background-color: #fff;
    margin: auto;
    z-index: 100;
    border: 2px solid $poison-color;
  }
}
.modal-effect-enter-active,
.modal-effect-leave-active {
  transform: translateX(100%) perspective(600px) rotateY(180deg);

  transition: all 1.2s ease;
}

.modal-effect-enter-to {
  transform: translateX(0) perspective(600px) rotateY(0deg);
  visibility: visible;
  opacity: 1;
}
.modal-effect-leave-to {
  transform: translateX(100%) perspective(600px) rotateY(180deg);
  visibility: hidden;

  opacity: 0;
}
</style>
