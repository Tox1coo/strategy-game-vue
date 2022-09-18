<template>
  <NavBar></NavBar>
  <div class="decks">
    <div class="decks__sidebar sidebar">
      <ul class="sidebar__list">
        <li
          v-for="sidebarItem in sidebarInfo"
          :key="sidebarItem.name + '-' + sidebarItem.type"
          class="sidebar__item"
          @click="updateActiveDecksPage(sidebarItem.type)"
        >
          <img :src="require(`@/assets/${sidebarItem.photo}.png`)" alt="" />
          {{ sidebarItem.name }}
        </li>
      </ul>
    </div>
    <DecksBody v-show="acitveDecksPage === 'cards'" :decksTitle="'Все карты'">
      <DecksCardsList :cardsList="getSortedCardsList"></DecksCardsList>
    </DecksBody>
    <DecksBody v-show="acitveDecksPage === 'decks'" :decksTitle="'Ваши колоды'">
      <DecksUser :decksUser="getDecksUser"></DecksUser>
    </DecksBody>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
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
      cardList: null,
    };
  },
  mounted() {
    if (!localStorage.cardList) {
      this.cardList = this.getSortedCardsList;
      localStorage.cardList = this.cardList;
    } else {
      this.cardList = localStorage.cardList;
    }
  },
  computed: {
    ...mapGetters({
      getSortedCardsList: "cards/getSortedCardsList",
      getDecksUser: "decks/getDecksUser",
    }),
    ...mapState({
      acitveDecksPage: (state) => state.decks.acitveDecksPage,
    }),
  },
  methods: {
    ...mapMutations({
      updateActiveDecksPage: "decks/updateActiveDecksPage",
    }),
    makeFavoriteDeck(deck, favorite) {
      console.log(deck, favorite);
    },
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
    border: none;
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
