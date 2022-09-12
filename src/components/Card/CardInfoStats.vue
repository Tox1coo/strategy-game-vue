<template>
  <div
    v-for="(stats, key, index) in newStatsInfo"
    :key="`${stats}-${index}`"
    :class="{
      card__stats_damage: key === 'damage',
      card__stats_health: key === 'health',
      card__stats_rotate: isRotating,
    }"
    class="card__stats stats"
  >
    <div v-if="key !== 'healing' && key !== 'spell'" class="stats__block">
      <span>
        {{ stats }}
      </span>

      <img
        v-if="key === 'damage'"
        :src="require(`@/assets/sword.svg`)"
        alt=""
      />
      <img
        v-if="key === 'health'"
        :src="require(`@/assets/heart.svg`)"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardStats: {
      type: Object,
      required: true,
    },
    isRotating: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  computed: {
    newStatsInfo() {
      const card = JSON.parse(JSON.stringify(this.cardStats));

      delete card.healing;
      delete card.spell;

      return card;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.card__stats {
  @include rotate-card();

  &_damage {
    top: -5px;
    left: 0px;
    span {
      color: $error-color;
    }
    img {
      bottom: -8px !important;
      left: 55% !important;
    }
  }
  &_health {
    top: -5px;
    right: 0px;
    span {
      color: $poison-color;
    }
  }
}
.stats {
  position: absolute;
  color: #fff;
  width: 50px;
  height: 50px;
  background-color: rgba(#111, 0.5);
  border-radius: 50%;
  border: 1px double $poison-color;
  &__block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    span {
      font-size: 1.5rem;
    }
    img {
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>