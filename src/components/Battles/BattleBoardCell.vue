<template>
  <div
    @click="attackCard"
    :class="{
      cell_active: getActiveCard,
      cell_dead: card.stats.health === 0,
    }"
    class="battle-board__cell cell"
  >
    <Card :cardInfo="card"></Card>
  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  props: {
    card: Object,
    boardTypeCard: String,
  },
  methods: {
    ...mapActions({
      takeCardEventCard: "battles/takeCardEventCard",
      getCardAndDeckPlayers: "battles/getCardAndDeckPlayers",
      updateCards: "battles/updateCards",
    }),

    attackCard() {
      this.takeCardEventCard({
        board: this.boardTypeCard,
        event: this.activeEventCard,
        card: this.card,
      });
    },
    spellAttackPassive() {
      console.log(this.boardTypeCard);
      const promise = this.getCardAndDeckPlayers({
        board: this.boardTypeCard,
        card: this.card,
      });
      promise
        .then((result) => {
          const { cards, deckIndex, cardIndex } = result;
          const damage = this.card.effectAttack.damageCard;
          let cardItem;
          let pathDispatch = "updateOpponentsCards";
          let root = false;
          if (this.boardTypeCard === "user") {
            cardItem = cards.at(deckIndex).cards.at(cardIndex);
            pathDispatch = "decks/updateDecksUser";
            root = true;
          } else {
            cardItem = cards.cards.at(cardIndex);
          }
          if (this.card.effectAttack.roundEnd > this.round) {
            cardItem.stats.health = cardItem.stats.health - damage;
            if (cardItem.stats.health <= 0) {
              cardItem.stats.health = 0;
              cardItem.dead = true;
              delete cardItem.effectAttack;
            }
          } else {
            delete cardItem.effectAttack;
          }
          this.updateCards({
            cards: cards,
            deck: pathDispatch,
            root: root,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      getRounds: "battles/getRounds",
    }),
    ...mapState({
      cardAttack: (state) => state.battles.cardAttack,
      activeEventCard: (state) => state.battles.activeEventCard,
      round: (state) => state.battles.round,
    }),
    getActiveCard() {
      return this.card.name === this.cardAttack[this.boardTypeCard]?.name;
    },
  },
  watch: {
    getRounds() {
      if ("effectAttack" in this.card) {
        this.spellAttackPassive();
      }
    },
  },
  components: { Card },
};
</script>

<style lang="scss" >
.cell {
  height: 18vh;
  width: 8vw;
  transition: transform 0.5s ease 0s, filter 0.5s linear;
  .card {
    height: 100%;
  }
  &-card {
    .card__images {
      height: 100%;
    }
    .card__slip {
      height: 100%;
      width: 100%;
    }
    .card__img {
      height: 64%;
    }
    .subtitle {
      font-size: 1.5rem;
    }
  }
  &_dead {
    pointer-events: none;
    filter: grayscale(100%);
  }
  &_active {
    transform: scale(1.1);
    border: 1px solid $poison-color;
  }
}
</style>