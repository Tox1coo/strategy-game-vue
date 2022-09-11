<template>
  <div class="decks__cards cards">
    <div class="cards__filter">
      <Filters
        :filterList="filtersType"
        :activeFilterItem="filterItemType"
      ></Filters>
      <Filters
        :filterList="filtersRange"
        :activeFilterItem="filterItemRange"
      ></Filters>
    </div>
    <div class="cards__list">
      <Card
        v-for="cardItem in cardsList"
        :key="`${cardItem.name}-${cardItem.typeCard.type}`"
        :cardInfo="cardItem"
      ></Card>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Card from "@/components/Card/Card.vue";
export default {
  data() {
    return {
      filtersType: [
        {
          name: "Все",
        },
        {
          name: "Стрелок",
        },
        {
          name: "Боец",
        },
        {
          name: "Тяжелый боец",
        },
        {
          name: "Маг",
        },
      ],
      filtersRange: [
        {
          name: "Все",
        },
        {
          name: "Средний",
        },
        {
          name: "Ближний",
        },
        {
          name: "Дальний",
        },
      ],
    };
  },
  props: {
    cardsList: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({}),
  },
  components: { Card },
};
</script>

<style lang="scss" scoped>
.cards {
  &__list {
    height: 500px;
    overflow-y: scroll;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>