<template>
  <div class="decks">
    <div class="decks__sidebar sidebar">
      <ul class="sidebar__list">
        <li
          v-for="sidebarItem in sidebarInfo"
          :key="sidebarItem.title + '-' + sidebarItem.type"
          class="sidebar__item"
        >
          {{ sidebarItem.title }}
        </li>
      </ul>
    </div>
    <DecksCardsList :cardsList="getSortedCardsList"></DecksCardsList>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DecksCardsList from "@/components/Decks/DecksCardsList.vue";
export default {
  data() {
    return {
      sidebarInfo: [
        {
          name: "Карты",
          type: "cards",
        },
        {
          name: "Колоды",
          type: "decks",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      cardList: (state) => state.cards.cardLists,
    }),
    ...mapGetters({
      getSortedCardsList: "cards/getSortedCardsList",
    }),
  },
  components: { DecksCardsList },
};
</script>

<style lang="scss" scoped>
</style>