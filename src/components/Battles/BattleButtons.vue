<template>
  <div v-if="typeButton !== 'health'" class="battle-buttons__button">
    <div
      @click="$emit('eventBattleCard', typeButton)"
      class="battle-buttons__button-img"
    >
      <img width="40" :src="require(`@/assets/${typeButton}.svg`)" alt="" />
    </div>
    <div class="battle-buttons__button-title">{{ getTitleButton.title }}</div>
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
    buttonEffect: {
      type: [Number, Object],
    },
    typeButton: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.battle-buttons__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-img {
    @include background;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &-title {
    color: $primary-brown-nav;
    font-size: 2rem;
  }
}
</style>