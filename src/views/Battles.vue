<template>
  <div class="battle">
    <h1 class="title">{{ getRounds }} раунд</h1>
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
  <transition name="result">
    <div
      v-if="getOpponentsDeadCard?.length === 9 || getUserDeadCard?.length === 9"
      class="result"
    >
      <div class="result-block">
        <img :src="getResults" alt="" class="result-battle" />
        <MyButton @click="$router.push('/')"
          >Вернуться на главную страницу</MyButton
        >
      </div>
    </div>
  </transition>
  <MyButton @click="$router.push('/')" id="exit">Выйти из боя</MyButton>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import BattleBoard from "@/components/Battles/BattleBoard.vue";
export default {
  data() {
    return {
      opponentCards: {
        cards: [],
      },
      results: {
        user: "YqzHmScd/victory-user.webp",
        opponent: "2y4fGk18/defeat-user.webp",
      },
    };
  },
  components: { BattleBoard },
  computed: {
    ...mapGetters({
      getFavoriteDeck: "decks/getFavoriteDeck",
      getOpponentCards: "battles/getOpponentCards",
      getActiveTakeCard: "battles/getActiveTakeCard",
      getOpponentsDeadCard: "battles/getOpponentsDeadCard",
      getUserDeadCard: "decks/getUserDeadCard",
      getRounds: "battles/getRounds",
    }),
    ...mapState({
      activeTurn: (state) => state.battles.activeTurn,
      activeTakeCard: (state) => state.battles.activeTakeCard,
      cardList: (state) => state.cards.cardList,
      user: (state) => state.user.user,
      IMAGE_LINK: (state) => state.images.IMAGE_LINK,
    }),
    getResults() {
      let result;
      if (this.getUserDeadCard.length === 9) {
        result = "opponent";
      } else if (this.getOpponentsDeadCard.length === 9) {
        result = "user";
      }
      return `${this.IMAGE_LINK}${this.results[result]}`;
    },
  },
  methods: {
    ...mapMutations({
      updateOpponentsCards: "battles/updateOpponentsCards",
    }),
    ...mapActions({
      updateUserRating: "user/updateUserRating",
    }),
    createOpponentsCards() {
      const list = JSON.parse(JSON.stringify(this.cardList));
      let card = list
        .filter((card) => card !== "")
        .at(Math.round(1 + Math.random() * this.cardList.length - 1));
      if (card === undefined) {
        card = this.cardList.at(
          Math.round(1 + Math.random() * this.cardList.length - 1)
        );
      }
      const check = this.opponentCards.cards.find(
        (cardItem) => cardItem.name === card.name
      );
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
    }, 400);
  },
  watch: {
    getOpponentsDeadCard(opponnentDeadCards) {
      if (opponnentDeadCards.length === 9) {
        this.updateUserRating("victory");
      }
    },
    getUserDeadCard(userDeadCards) {
      if (userDeadCards.length === 9) {
        this.updateUserRating("defeat");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.battle {
  display: flex;
  height: 100%;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
.result {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 1111;
  background-color: rgba(#171717, 0.5);
  &-block {
    pointer-events: all;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
.result-enter-active,
.result-leave-active {
  transform: scale(0);

  transition: transform 0.4s ease-in;
}

.result-enter-to {
  transform: scale(1);
}
.result-leave-to {
  transform: scaleY(0);
}

#exit {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>