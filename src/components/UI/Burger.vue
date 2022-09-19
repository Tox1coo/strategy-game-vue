<template>
  <div
    :class="{ burger_active: showBurger }"
    @click="showBurger = !showBurger"
    class="burger"
  >
    <span></span>
  </div>
  <div v-if="showBurger" class="burger-menu">
    <div
      v-for="link in linkList"
      :key="link.linkTitle"
      class="burger-menu__item"
    >
      <router-link v-if="link?.link != undefined" :to="link?.link">{{
        link.linkTitle
      }}</router-link>
      <a v-else @click="link.linkFunction()">{{ link.linkTitle }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Burger",
  data() {
    return {
      showBurger: false,
    };
  },
  props: {
    linkList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" >
@import "@/styles/mixins.scss";
%pseudo-block {
  content: "";
  display: block;
  position: absolute;
  top: -12px;
  width: 100%;
  height: 4px;
  background-color: $poison-color;
  border-radius: 50px;
}
.burger {
  width: 50px;
  height: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
  @media (max-width: 550px) {
    display: flex;
  }
  span {
    display: block;
    width: 50px;
    position: relative;

    height: 4px;
    border-radius: 50px;

    background-color: $poison-color;
    &::before {
      @extend %pseudo-block;
    }
    &:after {
      @extend %pseudo-block;
      top: auto;
      bottom: -12px;
    }
  }
  &-menu {
    display: none;
    position: fixed;
    bottom: -100vh;
    background-color: rgba(#111, 0.8);
    flex-direction: column;
    padding-top: 50px;
    gap: 100px;
    width: 100%;
    height: 100vh;
    &__item {
      font-size: 1.8rem;
      opacity: 1;
      cursor: pointer;
      text-transform: uppercase;
      position: relative;
      z-index: 2;
      a {
        display: block;
        color: $poison-color;
        text-decoration: none;
      }
    }
    @media (max-width: 550px) {
      display: flex;
    }
  }
}
</style>