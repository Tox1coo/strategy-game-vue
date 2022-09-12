<template>
  <div @click="rotateCard()" class="card">
    <div class="card__images">
      <img
        :class="{ card__slip_rotate: isRotate }"
        ref="cardImg"
        class="card__slip"
        width="200"
        src="https://i.postimg.cc/QM2QDD9L/card.webp"
        alt=""
      />
      <img
        :class="{ card__img_rotate: isRotate }"
        ref="personImg"
        class="card__img"
        height="250"
        width="190"
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
    </div>

    <div :class="{ card__info_rotate: !isRotate }" class="card__info info">
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
import { mapState } from "vuex";
import CardInfoBlock from "@/components/Card/CardInfoBlock.vue";
import CardInfoStats from "@/components/Card/CardInfoStats.vue";
export default {
  data() {
    return {
      isRotate: false,
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
    }),
    getImageCard() {
      return `${this.IMAGE_LINK}${this.cardInfo.photo}`;
    },
  },
  methods: {
    rotateCard() {
      const checkRoute = this.$router.currentRoute._rawValue.name !== "Battles";
      if (checkRoute) {
        this.isRotate = !this.isRotate;
      }
    },
  },
  components: { CardInfoBlock, CardInfoStats },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.card {
  position: relative;
  z-index: 1;
  cursor: pointer;

  &__images {
    .card__slip {
      @include rotate-card;
    }

    .card__img {
      @include rotate-card(opacity, 0, -50%);
    }
    .subtitle_name {
      @include rotate-card(opacity, 0);

      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      color: #fff;
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
</style>