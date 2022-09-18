<template>
  <div :data-deck="deck.name" class="decks__user-item user-deck">
    <div @click="visibleCards = !visibleCards" class="user-deck__block">
      <div class="subtitle subtitle__name">{{ getTitlesCardsInDeck }}</div>
      <div
        v-if="$route.name !== 'Profile'"
        class="user-deck__block-favorite favorite"
      >
        <p class="text">{{ getCardsInDeck.length }}/9</p>

        <CardButtonSetting
          @eventCard="addToFavorite"
          :viewBoxSetting="'0 0 55 55'"
          :path="'star'"
          :fillIcon="getFavoriteColor"
        ></CardButtonSetting>
      </div>
    </div>

    <DecksUserDropCards
      :visibleDropCards="visibleCards"
      :deckCards="getCardsInDeck"
      :deck="deck"
    ></DecksUserDropCards>
  </div>
</template>

<script>
import DecksUserDropCards from "@/components/Decks/DecksUserDropCards.vue";
import { icons } from "@/utils/icons";
import CardButtonSetting from "@/components/Card/CardButtonSetting.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      visibleCards: false,
    };
  },
  props: {
    deck: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getCardsInDeck() {
      return this.deck.cards.filter((card) => card !== "");
    },
    getTitlesCardsInDeck() {
      return this.deck.name;
    },
    getFavoritePath() {
      return icons["star"];
    },
    getFavoriteColor() {
      let color = "#000";
      if (this.deck.favorite) {
        color = "#FFCA28";
      }
      return color;
    },
  },
  methods: {
    ...mapActions({
      addFavoriteDecks: "decks/addFavoriteDecks",
    }),
    addToFavorite() {
      this.addFavoriteDecks(this.deck);
    },
  },
  components: { DecksUserDropCards, CardButtonSetting },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.user-deck {
  margin-bottom: 15px;
  &__block {
    @include background;
    position: relative;
    cursor: pointer;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-radius: 10px;
    .text {
      color: #fff;
    }
  }
}

.favorite {
  display: flex;
  align-items: center;
  gap: 10px;
  &__icon {
    width: 10px;
    height: 10px;
  }
}
</style>
