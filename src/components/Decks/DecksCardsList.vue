<template>
  <div class="decks__cards cards">
    <div class="cards__filter">
      <div>
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
      </div>
      <div v-if="getFavoriteDeck" class="title">
        Активная колода: {{ getFavoriteDeck.name }}
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
<!-- TODO: Лагает из за display flex -->
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

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__list {
    @include custom-scrollbar;
    max-height: 800px;
    overflow-y: auto;
    max-width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding-right: 15px;
    padding-top: 5px;
    flex: 1 0;
    @media (max-width: 930px) {
      max-width: 80%;
    }
    @media (max-width: 585px) {
      max-width: 80%;
    }
  }
  &__filter {
    align-items: center;
    width: 100%;
    justify-content: center;
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    flex-wrap: wrap;
    div {
      display: flex;
      gap: 15px;
      order: 1;
      @media (max-width: 385px) {
        flex-direction: column;
      }
    }
    .title {
      font-size: 2rem;
      @media (max-width: 810px) {
        order: 0;
      }
    }
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
