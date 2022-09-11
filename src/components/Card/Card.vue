<template>
  <div @click="rotateCard()" class="card">
    <img
      ref="cardImg"
      class="card__slip"
      width="200"
      src="https://i.postimg.cc/QM2QDD9L/card.webp"
      alt=""
    />

    <img
      ref="personImg"
      class="card__img"
      height="250"
      width="190"
      :src="getImageCard"
      alt=""
    />

    <div v-if="isRotate" class="card__info">
      <p class="text">damage: {{ cardInfo.stats.damage }}</p>
      <p class="text">damage: {{ cardInfo.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      this.isRotate = !this.isRotate;
      const checkRoute = this.$router.currentRoute._rawValue.name !== "Battles";
      if (checkRoute) {
        if (this.isRotate) {
          this.$refs.cardImg.classList.add("card__slip_rotate");
          this.$refs.personImg.classList.add("card__img_rotate");
        } else {
          this.$refs.cardImg.classList.remove("card__slip_rotate");
          this.$refs.personImg.classList.remove("card__img_rotate");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  z-index: 1;

  &__slip {
    position: relative;
    backface-visibility: visible;
    transform: perspective(600px) rotateY(0deg);
    transition: transform 2s ease 0s;

    &_rotate {
      transform: perspective(600px) rotateY(-180deg);
    }
  }

  &__img {
    position: absolute;
    backface-visibility: visible;
    top: 40px;
    left: 50%;
    transform: translateX(-50%) perspective(600px) rotateY(0deg);
    z-index: 1000;
    transition: all 1s ease-in-out 0s;
    &_rotate {
      transform: translateX(-50%) perspective(600px) rotateY(-100deg);

      opacity: 0;
    }
  }
  &__info {
    position: absolute;
    z-index: 1000;
    color: #fff;
    top: 108px;
    left: 18px;
  }
}

@keyframes rotateCard {
  from {
    transform: skew(0deg, 0deg);
  }
  to {
    transform: skew(180deg, 0deg);
  }
}
</style>