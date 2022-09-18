<template>
  <div
    v-for="(cardInfoItem, index) in getBlock"
    :key="index"
    class="info__block"
  >
    <div class="subtitle subtitle_info">{{ cardBlockTitle[index] }}</div>
    <ul v-if="typeof cardInfoItem === 'object'" class="info__list">
      <li
        v-for="(cardInfoType, key, index) in cardInfoItem"
        :key="`${cardInfoType}-${index}`"
        class="info__item"
      >
        <p class="text">{{ getInfo(key) }}: {{ cardInfoType }}</p>
      </li>
    </ul>
    <ul v-else class="info__list">
      <li class="info__item">
        <p class="text">Восстановление: {{ cardInfoItem }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    cardInfo: {
      type: Array,
      required: true,
    },
    cardBlockTitle: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getBlock() {
      return this.cardInfo.filter((item) => item !== undefined);
    },
  },
  methods: {
    getInfo(info) {
      if (info === "type") return "Тип";
      else if (info === "typeRange") return "Дальность";
      else if (info === "damageSpell") return "Урон за раунд";
      else if (info === "rounds") return "Длительность";
      else if (info === "healing") return "Восстановление";
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: flex-start;
    padding-left: 10px;
  }
}
</style>
