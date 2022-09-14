<template>
  <div
    @click="attackCard"
    :class="{ cell_active: getActiveCard }"
    class="battle-board__cell cell"
  >
    <Card :cardInfo="card"></Card>
  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue";
import { mapActions, mapState } from "vuex";

export default {
  props: {
    card: Object,
    boardTypeCard: String,
  },
  methods: {
    ...mapActions({
      takeCardEventCard: "battles/takeCardEventCard",
    }),

    attackCard() {
      this.takeCardEventCard({
        board: this.boardTypeCard,
        event: this.activeEventCard,
        card: this.card,
      });
    },
  },
  computed: {
    ...mapState({
      cardAttack: (state) => state.battles.cardAttack,
      activeEventCard: (state) => state.battles.activeEventCard,
    }),
    getActiveCard() {
      return this.card.name === this.cardAttack[this.boardTypeCard]?.name;
    },
  },

  components: { Card },
};
</script>

<style lang="scss" >
.cell {
  height: 18vh;
  width: 8vw;
  transition: transform 0.5s ease 0s;
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
  &_active {
    transform: scale(1.1);
    border: 1px solid $poison-color;
  }
}
</style>