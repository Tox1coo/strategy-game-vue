<template>
  <div
    :class="{
      'battle-board_notclick': activeTakeCard !== boardType,
    }"
    class="battle-board"
  >
    <BattleBoardCell
      v-for="card in getCards"
      :key="card.name"
      :boardTypeCard="boardType"
      :card="card"
    >
    </BattleBoardCell>
    <div
      v-if="cardAttack[activeTurn] != null && activeTurn === boardType"
      class="battle-buttons"
    >
      <BattleButtons
        v-for="(button, key, index) in cardAttack[activeTurn]?.stats"
        :key="index + key"
        :buttonEffect="button"
        :typeButton="key"
        @eventBattleCard="eventBattleCard"
      ></BattleButtons>
    </div>

    <div v-if="activeTurn === boardType" class="battle-board-turn">
      Твой ход
    </div>
  </div>
</template>

<script>
import BattleBoardCell from "@/components/Battles/BattleBoardCell.vue";
import BattleButtons from "./BattleButtons.vue";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    cards: {
      type: Object,
      required: true,
    },
    activeTakeCard: String,
    activeTurn: String,
    boardType: String,
  },
  computed: {
    getCards() {
      return this.cards?.cards
        ?.filter((card) => card !== "")
        ?.sort(() => Math.random() - 0.5);
    },
    ...mapState({
      cardAttack: (state) => state.battles.cardAttack,
    }),
  },
  methods: {
    ...mapActions({
      takeCardEventCard: "battles/takeCardEventCard",
    }),
    eventBattleCard(event) {
      this.takeCardEventCard({
        board: this.boardType,
        event: event,
      });
    },
  },

  components: { BattleBoardCell, BattleButtons },
};
</script>

<style lang="scss">
.battle-board {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: calc((8vw * 3) + 15px);
  height: calc((18vh * 3) + 20px);
  gap: 10px 0;
  justify-content: space-between;
  position: relative;
  &_notclick {
    pointer-events: none;
  }
  &-turn {
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding: 20px;
    background-color: $error-color;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.2rem;
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }
}
.battle-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top: 50px;
}
</style>