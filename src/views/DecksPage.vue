<template>
  <NavBar></NavBar>
  <div class="decks">
    <div class="decks__sidebar sidebar">
      <ul class="sidebar__list">
        <li
          v-for="sidebarItem in sidebarInfo"
          :key="sidebarItem.name + '-' + sidebarItem.type"
          class="sidebar__item"
          @click="acitveDecksPage = sidebarItem.type"
        >
          <img :src="require(`@/assets/${sidebarItem.photo}.png`)" alt="" />
          {{ sidebarItem.name }}
        </li>
      </ul>
    </div>
    <DecksBody v-if="acitveDecksPage === 'cards'" :decksTitle="'Все карты'">
      <DecksCardsList :cardsList="getSortedCardsList"></DecksCardsList>
    </DecksBody>
    <DecksBody
      v-else-if="acitveDecksPage === 'decks'"
      :decksTitle="'Ваши колоды'"
    >
      <DecksUser></DecksUser>
    </DecksBody>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DecksCardsList from "@/components/Decks/DecksCardsList.vue";
import DecksBody from "@/components/Decks/DecksBody.vue";
import DecksUser from "@/components/Decks/DecksUser.vue";

export default {
  data() {
    return {
      sidebarInfo: [
        {
          name: "Карты",
          type: "cards",
          photo: "icon-card",
        },
        {
          name: "Колоды",
          type: "decks",
          photo: "icon-cards",
        },
      ],
      acitveDecksPage: "cards",
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
  components: { DecksCardsList, DecksBody, DecksUser },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.decks {
  display: flex;
  gap: 20px;
}

.sidebar {
  border-right: 2px solid $poison-color;
  &__list {
    @include background;
    list-style: none;
    width: 60px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-top: 50px;
    color: $primary-brown-nav;
    font-size: 1.5rem;
  }
  &__item {
    cursor: pointer;
    transition: transform 0.2s ease 0s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>