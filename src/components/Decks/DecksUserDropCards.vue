<template>
  <transition name="drop-card_effect">
    <div v-if="visibleDropCards" class="user-deck__drop">
      <div v-if="deckCards.length > 0" class="user-deck__drop-cards">
        <Card
          @removeCard="removeCard"
          v-for="card in deckCards"
          :key="`${card.name}-${card.typeCard.type}`"
          :cardInfo="card"
        ></Card>
      </div>
      <div v-else class="subtitle">
        У вас нет карт, добавьте их на вкладке "Карты"
      </div>
    </div>
  </transition>
</template>

<script>
import Card from "@/components/Card/Card.vue";
import { mapActions } from "vuex";
export default {
  props: {
    deckCards: {
      type: Array,
      required: true,
    },
    visibleDropCards: {
      type: Boolean,
      default: false,
    },
    deck: {
      type: Object,
    },
  },
  methods: {
    ...mapActions({
      removeInDecks: "decks/removeInDecks",
    }),
    removeCard(card) {
      this.removeInDecks({ card: card, deckCard: this.deck });
    },
  },
  components: { Card },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.user-deck__drop {
  @include background;
  width: 100%;
  max-height: 50rem;
  top: -2px;
  border-radius: 10px;
  display: flex;
  &-cards {
    width: 100%;
    max-height: 50rem;
    @include custom-scrollbar;

    overflow-y: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px 0;
    padding: 10px;
  }

  .subtitle {
    margin: auto;
  }
}

.drop-card_effect-enter-active,
.drop-card_effect-leave-active {
  max-height: 0;

  transition: all 1s ease-in-out;
}

.drop-card_effect-enter-to {
  max-height: 50rem;

  visibility: visible;
  opacity: 1;
}
.drop-card_effect-leave-to {
  max-height: 0;

  visibility: hidden;
  opacity: 0;
}
</style>