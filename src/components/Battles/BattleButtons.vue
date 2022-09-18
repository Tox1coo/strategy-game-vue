<template>
  <div v-if="typeButton !== 'health'" class="battle-button">
    <div
      :class="{ 'battle-button__img_active': typeButton === activeEventCard }"
      @click="$emit('eventBattleCard', typeButton)"
      class="battle-button__button battle-button__img"
    >
      <img width="40" :src="require(`@/assets/${typeButton}.svg`)" alt="" />
    </div>
    <div class="battle-button__title">{{ getTitleButton.title }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleButtons: [
        {
          title: "Атака",
          type: "damage",
        },
        {
          title: "Исцеление",
          type: "healing",
        },
        {
          title: "Заклинание",
          type: "spell",
        },
      ],
    };
  },
  computed: {
    getTitleButton() {
      return this.titleButtons.find(
        (button) => button.type === this.typeButton
      );
    },
  },
  props: {
    typeButton: String,
    activeEventCard: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.battle-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  &__img {
    @include background;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: filter 0.4s ease 0s;
    filter: brightness(0.7);
    &_active {
      filter: brightness(1);
    }
  }
  &__title {
    color: $primary-brown-nav;
    font-size: 2rem;
  }
}
</style>
