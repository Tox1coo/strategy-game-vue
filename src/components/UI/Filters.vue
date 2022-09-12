<template>
  <div @click="showDropFilter = !showDropFilter" class="filter">
    {{ activeFilterItem }}
    <div
      :class="{ filter__arrow_active: showDropFilter }"
      ref="filterArrow"
      class="filter__arrow"
    ></div>
    <transition name="drop-effect">
      <div v-if="showDropFilter" class="filter__drop drop">
        <ul class="drop__list">
          <li
            v-for="filterItem in filterList"
            :key="filterItem.name"
            class="drop__item"
            @click="$emit('changeActiveFilter', filterItem)"
          >
            {{ filterItem.name }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      showDropFilter: false,
    };
  },
  props: {
    filterList: {
      type: Array,
      required: true,
      default: () => [{ name: "Все" }],
    },
    activeFilterItem: {
      type: String,
      default: "Все",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.filter {
  cursor: pointer;
  display: inline-block;
  text-transform: uppercase;
  padding: 5px 70px;
  color: $primary-brown-nav;
  font-size: 1.4rem;
  border-radius: 25px;
  border: 1px solid $poison-color;
  position: relative;
  &__arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    border-right: 2px solid $poison-color;
    border-bottom: 2px solid $poison-color;
    border-radius: 2px;
    top: 0;
    transform: rotate(45deg) translateY(5px);
    transition: transform 0.2s ease 0s;
    right: 5px;
    &_active {
      transform: rotate(230deg) translate(-3px, -10px);
    }
  }
}
.drop {
  @include background;
  font-size: 1.6rem;
  text-transform: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1111;
  width: 100%;
  height: fit-content;
  border: 2px solid $poison-color;
  border-radius: 10px;
  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }
  &__item {
    width: 100%;
    text-align: left;
    transition: color 0.1s ease 0s;
    &:hover {
      color: $primary-brown;
    }
  }
}

.drop-effect-enter-active,
.drop-effect-leave-active {
  transform: translateY(100%);

  transition: all 0.5s ease;
}

.drop-effect-enter-to {
  transform: translateY(0);
  visibility: visible;
  opacity: 1;
}
.drop-effect-leave-to {
  transform: translateY(100%);
  visibility: hidden;

  opacity: 0;
}
</style>