<template>
  <div
    @click="rotateCard()"
    :class="{
      'cell-card': !checkRoute,
      card_favorite:
        cardInFavoriteDeck !== -1 &&
        cardInFavoriteDeck !== undefined &&
        acitveDecksPage === 'cards' &&
        checkRoute &&
        $route.name !== 'Profile',
    }"
    class="card"
  >
    <div class="card__images">
      <img
        :class="{ card__slip_rotate: isRotate }"
        ref="cardImg"
        class="card__slip"
        src="https://i.postimg.cc/QM2QDD9L/card.webp"
        alt=""
      />
      <img
        :class="{ card__img_rotate: isRotate }"
        ref="personImg"
        class="card__img"
        :src="getImageCard"
        alt=""
      />
      <div
        :class="{ subtitle_name_rotate: isRotate }"
        class="subtitle subtitle_name"
      >
        {{ cardInfo.name }}
      </div>
      <CardInfoStats
        :cardStats="cardInfo.stats"
        :isRotating="isRotate"
      ></CardInfoStats>
      <CardButtonSetting
        v-if="checkRoute && $route.name !== 'Profile'"
        @eventCard="removeCardInDecks"
        :viewBoxSetting="'0 0 500 500'"
        :path="'remove'"
      ></CardButtonSetting>
      <CardButtonSetting
        v-if="
          acitveDecksPage === 'cards' && checkRoute && $route.name !== 'Profile'
        "
        @eventCard="addCardInDecks"
        :viewBoxSetting="'0 0 42 42'"
        :path="'add'"
      ></CardButtonSetting>
      <transition name="spell-effect">
        <img
          v-if="cardInfo?.effectAttack != undefined"
          :src="`${IMAGE_LINK}${cardInfo.effectAttack.effect}`"
          alt=""
          class="card__images-spell"
        />
      </transition>
    </div>

    <div
      v-if="checkRoute"
      :class="{ card__info_rotate: !isRotate }"
      class="card__info info"
    >
      <CardInfoBlock
        :cardInfo="[
          cardInfo.typeCard,
          cardInfo.stats?.spell,
          cardInfo.stats.healing,
        ]"
        :cardBlockTitle="['Характеристики', 'Заклинания', 'Умения']"
      ></CardInfoBlock>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CardInfoBlock from "@/components/Card/CardInfoBlock.vue";
import CardButtonSetting from "@/components/Card/CardButtonSetting.vue";

import CardInfoStats from "@/components/Card/CardInfoStats.vue";
export default {
  data() {
    return {
      isRotate: false,
      checkRoute: "",
    };
  },
  props: {
    cardInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      IMAGE_LINK: (state) => state.images.IMAGE_LINK,
      acitveDecksPage: (state) => state.decks.acitveDecksPage,
    }),
    ...mapGetters({
      getFavoriteDeck: "decks/getFavoriteDeck",
    }),
    getImageCard() {
      return `${this.IMAGE_LINK}${this.cardInfo.photo}`;
    },
    cardInFavoriteDeck() {
      return this.getFavoriteDeck?.cards.findIndex(
        (card) => card.name === this.cardInfo.name
      );
    },
  },
  methods: {
    ...mapActions({
      addInDecks: "decks/addInDecks",
      removeInDecks: "decks/removeInDecks",
    }),
    rotateCard() {
      this.checkRoute = this.$router.currentRoute._rawValue.name !== "Battles";
      if (this.checkRoute) {
        this.isRotate = !this.isRotate;
      }
    },
    removeCardInDecks() {
      this.$emit("removeCard", this.cardInfo);
      this.removeInDecks({
        card: this.cardInfo,
        deckCard: this.getFavoriteDeck,
      });
    },
    addCardInDecks() {
      this.addInDecks(this.cardInfo);
    },
  },
  mounted() {
    this.checkRoute = this.$router.currentRoute._rawValue.name !== "Battles";
  },
  components: { CardInfoBlock, CardInfoStats, CardButtonSetting },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.card {
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.1s ease;
  &__images {
    height: 300px;
    position: relative;
    .card__slip {
      @include rotate-card;
      height: 100%;
    }

    .card__img {
      @include rotate-card(opacity, 0, -50%);
      height: 70%;
    }
    .subtitle_name {
      @include rotate-card(opacity, 0);

      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      color: #fff;
    }
    &-spell {
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 1000;
      opacity: 0.5;
      height: 100%;
    }
  }
  &__slip {
    position: relative;
    backface-visibility: visible;
  }

  &__img {
    position: absolute;
    backface-visibility: visible;
    top: 40px;
    left: 50%;
    z-index: 1000;
  }
  &__info {
    @include rotate-card(opacity, 0);
    width: 100%;
    position: absolute;
    z-index: 1000;
    color: #fff;
    top: 55px;
  }
  &_favorite {
    transform: scale(1.03);
    border: 2px solid $primary-brown-nav;
  }
}

// v-if="isRotate"
@keyframes rotateCard {
  from {
    transform: skew(0deg, 0deg);
  }
  to {
    transform: skew(180deg, 0deg);
  }
}

.spell-effect-enter-active,
.spell-effect-leave-active {
  visibility: hidden;
  opacity: 0;

  transition: visibility 1s ease-in, opacity 1s ease-in;
}
.spell-effect-enter-to {
  visibility: visible;
  opacity: 0.5;
}
.spell-effect-leave-to {
  visibility: hidden;
  opacity: 0;
}
</style>
