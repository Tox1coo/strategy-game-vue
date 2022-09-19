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
      :class="{
        'battle-buttons_opponent': boardType === 'opponent',
        'battle-buttons_user': boardType === 'user',
      }"
    >
      <BattleButtons
        v-for="(button, key, index) in cardAttack[activeTurn]?.stats"
        :key="index + key"
        :typeButton="key"
        :activeEventCard="activeEventCard"
        :boardType="boardType"
        @eventBattleCard="eventBattleCard"
      ></BattleButtons>
    </div>

    <div
      :class="{ 'battle-board__title_opponent': boardType === 'opponent' }"
      class="battle-board__title title"
    >
      {{ boardType }}
    </div>
  </div>
  <transition name="turn">
    <div
      v-if="activeTurn === boardType"
      class="battle-board__turn"
      :class="{
        'battle-board__turn_user': boardType === 'user',
        'battle-board__turn_opponent': boardType === 'opponent',
      }"
    >
      Твой ход
    </div>
  </transition>
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
        ?.filter((card) => card !== "" && card !== "'")
        ?.sort(() => Math.random() - 0.5);
    },
    ...mapState({
      cardAttack: (state) => state.battles.cardAttack,
      activeEventCard: (state) => state.battles.activeEventCard,
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

<style lang="scss" scoped>
.battle-board {
  display: flex;
  flex-wrap: wrap;
  width: calc((8vw * 3) + 15px);
  height: calc((18vh * 3) + 20px);
  gap: 10px 0;
  justify-content: space-between;
  position: relative;
  @media (min-width: 320px) and (max-width: 800px) {
    width: calc((24vw * 3) + 15px);
  }
  @media (min-width: 801px) and (max-width: 1000px) {
    width: calc((35vw * 3) + 15px);
  }
  &_notclick {
    pointer-events: none;
  }
  &__turn {
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding: 0 15px 15px 15px;
    background-color: $error-color;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.1rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    &_user {
      left: 65%;
    }
    &_opponent {
      left: 35%;
    }
    @media (min-width: 320px) and (max-width: 800px) {
      &_user {
        padding: 8px;
        transform: translate(-50%, -50%);

        top: 50%;
        left: 19px;
        font-size: 1rem;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 0;
      }
      &_opponent {
        padding: 8px;
        transform: translate(-50%, -50%);

        top: 34%;
        left: 19px;
        font-size: 1rem;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 0;
      }
    }
  }
  &__title {
    writing-mode: vertical-rl;
    text-orientation: upright;
    color: $poison-color !important;
    line-height: 1.5;
    position: absolute;
    top: 50%;
    right: -100px;
    transform: translateY(-50%);
    @media (min-width: 320px) and (max-width: 800px) {
      right: -50px;
      left: auto;
      &_opponent {
        right: -50px !important;
        left: auto !important;
      }
    }
    &_opponent {
      right: auto;
      left: -100px;
    }
  }
}
.battle-buttons {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  top: 50px;
  &_user {
    @media (min-width: 320px) and (max-width: 800px) {
      position: absolute;
      top: -80px;
    }
  }
  &_opponent {
    @media (min-width: 320px) and (max-width: 800px) {
      position: absolute;
      top: auto;
      bottom: -80px;
    }
  }
}
.turn-enter-active,
.turn-leave-active {
  transform: translateX(-50%) scaleY(0);

  transition: transform 0.4s ease-in;
}

.turn-enter-to {
  transform: translateX(-50%) scaleY(1);
}
.turn-leave-to {
  transform: translateX(-50%) scaleY(0);
}
</style>
