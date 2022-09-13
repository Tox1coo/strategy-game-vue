<template>
  <div class="decks__cards cards">
    <div class="cards__filter">
      <Filters
        @changeActiveFilter="changeActiveFilter"
        :filterList="filtersType"
        :activeFilterItem="filterItemType"
      ></Filters>
      <Filters
        @changeActiveFilter="changeActiveFilter"
        :filterList="filtersRange"
        :activeFilterItem="filterItemRange"
      ></Filters>
      <div v-if="getFavoriteDeck" class="title">
        Активная колода: {{ getFavoriteDeck.name }}
        <!-- <span>{{ getCountCardsInActiveDeck }}/9</span> -->
      </div>
    </div>
    <div v-if="cardsList.length > 0" class="cards__list">
      <Card
        v-for="cardItem in cardsList"
        :key="`${cardItem.name}-${cardItem.typeCard.type}`"
        :cardInfo="cardItem"
      ></Card>
    </div>
    <div v-else class="title">По таким параметрам, карт не нашлось :(</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import Card from "@/components/Card/Card.vue";
export default {
  data() {
    return {
      filtersType: [
        {
          name: "Все",
          type: "type",
        },
        {
          name: "Стрелок",
          type: "type",
        },
        {
          name: "Боец",
          type: "type",
        },
        {
          name: "Тяжелый боец",
          type: "type",
        },
        {
          name: "Маг",
          type: "type",
        },
      ],
      filtersRange: [
        {
          name: "Все",
          type: "range",
        },
        {
          name: "Средний",
          type: "range",
        },
        {
          name: "Ближний",
          type: "range",
        },
        {
          name: "Дальний",
          type: "range",
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
    ...mapMutations({
      updateFilterItemRange: "cards/updateFilterItemRange",
      updateFilterItemType: "cards/updateFilterItemType",
    }),
    changeActiveFilter(filterItem) {
      if (filterItem.type === "range")
        this.updateFilterItemRange(filterItem.name);
      else if (filterItem.type === "type")
        this.updateFilterItemType(filterItem.name);
    },
  },
  components: { Card },
  computed: {
    ...mapState({
      filterItemType: (state) => state.cards.filterItemType,
      filterItemRange: (state) => state.cards.filterItemRange,
    }),
    ...mapGetters({
      getFavoriteDeck: "decks/getFavoriteDeck",
    }),
  },
};
</script>
    /*     getCountCardsInActiveDeck() {
      return this.getFavoriteDeck.cards.filter((card) => card !== "").length;
    }, */
<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.cards {
  min-width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  &__list {
    @include custom-scrollbar;
    max-height: 680px;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    padding-right: 15px;
    padding-top: 5px;
  }
  &__filter {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    .title {
      font-size: 2rem;
    }
  }
  .title {
    flex: 0 1 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>