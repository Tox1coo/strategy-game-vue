<template>
  <div class="battle">
    <BattleBoard
      :activeTakeCard="getActiveTakeCard"
      :activeTurn="activeTurn"
      :boardType="'opponent'"
      :cards="getOpponentCards"
    ></BattleBoard>
    <hr />
    <BattleBoard
      :activeTakeCard="getActiveTakeCard"
      :activeTurn="activeTurn"
      :boardType="'user'"
      :cards="getFavoriteDeck"
    ></BattleBoard>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

import BattleBoard from "@/components/Battles/BattleBoard.vue";
export default {
  data() {
    return {
      opponentCards: {
        cards: [],
      },
    };
  },
  components: { BattleBoard },
  computed: {
    ...mapGetters({
      getFavoriteDeck: "decks/getFavoriteDeck",
      getOpponentCards: "battles/getOpponentCards",
      getActiveTakeCard: "battles/getActiveTakeCard",
    }),
    ...mapState({
      activeTurn: (state) => state.battles.activeTurn,
      activeTakeCard: (state) => state.battles.activeTakeCard,
      cardList: (state) => state.cards.cardList,
    }),
  },
  methods: {
    ...mapMutations({
      updateOpponentsCards: "battles/updateOpponentsCards",
    }),
    createOpponentsCards() {
      const card = this.cardList.at(
        Math.floor(1 + Math.random() * this.cardList.length - 1)
      );
      const check = this.opponentCards.cards.find(
        (cardItem) => cardItem.name === card.name
      );
      console.log(check);
      if (this.opponentCards.cards.length < 9) {
        if (check === undefined) {
          this.opponentCards.cards.push(card);
          this.createOpponentsCards();
        } else {
          this.createOpponentsCards();
        }
      } else {
        this.updateOpponentsCards(this.opponentCards);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.createOpponentsCards();
    }, 200);
  },
};
</script>

<style lang="scss" scoped>
.battle {
  display: flex;
  height: 100%;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>