/* eslint-disable no-unused-vars */
import axios from "axios";
import { linkFirebase } from "@/store/config/firebase";
export const decks = {
  state() {
    return {
      decksList: [],
      activeDeck: "",
      checkNameInDecks: undefined,
      acitveDecksPage: "cards",
      playerDeck: null,
      opponentDeck: null,
    };
  },

  mutations: {
    updateDecksUser(state, decksList) {
      state.decksList = decksList;
    },
    addDeck(state, deck) {
      state.decksList.push(deck);
    },
    removeDeck(state, indexDeck) {
      state.decksList.splice(indexDeck, 1);
    },
    updateCheckName(state, checkNameInDecks) {
      state.checkNameInDecks = checkNameInDecks;
    },
    updateActiveDecksPage(state, acitveDecksPage) {
      state.acitveDecksPage = acitveDecksPage;
    },
    changeFavoriteDecks(state, newFavoriteDeck) {
      state.decksList
        .filter((card) => card !== "")
        .map((deck) => {
          if (deck?.name === newFavoriteDeck.name) {
            deck.favorite = true;
          } else {
            deck.favorite = false;
          }
        });
    },
    addCardsInDeck(state, { favoriteDeckIndex, card }) {
      state.decksList.at(favoriteDeckIndex).cards.push(card);
    },
    removeCardsInDeck(state, { deckIndex, card }) {
      const indexCard = state.decksList
        .at(deckIndex)
        .cards.findIndex((cards) => cards.name === card.name);
      if (indexCard !== -1) {
        state.decksList.at(deckIndex).cards.splice(indexCard, 1);
      }
    },
  },
  getters: {
    getDecksUser(state) {
      return [...state.decksList].filter((deck) => deck !== "");
    },
    getFavoriteDeck(state, getters) {
      return getters.getDecksUser.find((deck) => deck.favorite);
    },
    getIndexFavoriteDecks(state) {
      return state.decksList.findIndex((deck) => deck.favorite);
    },
    getCountCardsInFavoriteDeck(state, getters) {
      return getters.getFavoriteDeck?.cards.filter((card) => card !== "")
        ?.length;
    },
    getUserDeadCard(state, getters) {
      return getters.getFavoriteDeck?.cards.filter((card) => card?.dead);
    },
  },

  actions: {
    getDecksUser({ commit }, uid) {
      axios
        .get(`${linkFirebase}users/${uid}/decks.json`)
        .then((decks) => {
          commit("updateDecksUser", decks.data);
        })
        .catch((error) => console.log(error));
    },

    getNameInDecks({ commit, state }, deckName) {
      commit(
        "updateCheckName",
        state.decksList.find((deckItem) => deckItem.name === deckName.name)
      );
    },

    addDecksUser({ commit, dispatch, rootState, state }, deck) {
      dispatch("getNameInDecks", deck);
      return new Promise((resolve, reject) => {
        if (state.checkNameInDecks === undefined) {
          commit("addDeck", deck);
          dispatch("fetchDecksList", "Вы успешно добавили колоду").catch(
            (err) => {
              reject("error-put-in-decks");
            }
          );
          resolve();
        } else {
          reject("name-already-in-decks");
        }
      });
    },

    addFavoriteDecks({ commit, state, rootState, dispatch }, deck) {
      deck.favorite = true;
      commit("changeFavoriteDecks", deck);
      dispatch("fetchDecksList", "Вы успешно поменяли колоду");
    },

    fetchDecksList({ commit, state, rootState }) {
      axios
        .put(
          `${linkFirebase}users/${rootState.user.user.uid}/decks.json`,
          state.decksList
        )
        .then((response) => {
          commit("updateDecksUser", response.data);
        });
    },

    checkCard({ commit, getters }, newCard) {
      return getters.getFavoriteDeck.cards.find(
        (card) => card?.name === newCard.name
      );
    },

    addInDecks({ commit, dispatch, getters }, card) {
      if (getters.getFavoriteDeck === undefined) {
        commit(
          "notify/updateNotify",
          {
            visible: true,
            message: "Добавьте колоду в избранное",
          },
          { root: true }
        );
        return;
      }
      const checkCard = dispatch("checkCard", card);

      checkCard
        .then((resultCard) => {
          if (
            getters.getFavoriteDeck.cards.length - 1 == 9 &&
            resultCard === undefined
          ) {
            throw "Максимальное количество карточек в колоде равно 9";
          }

          if (resultCard === undefined) {
            commit("addCardsInDeck", {
              favoriteDeckIndex: getters.getIndexFavoriteDecks,
              card: card,
            });
            dispatch("fetchDecksList");
          } else if (resultCard !== undefined) {
            throw "Карточка уже была добавлена в колоду";
          }
        })
        .catch((errorMessage) => {
          commit(
            "notify/updateNotify",
            {
              visible: true,
              message: errorMessage,
            },
            { root: true }
          );
        });
    },
    removeInDecks({ commit, dispatch, getters, state }, { card, deckCard }) {
      const indexDeck = state.decksList?.findIndex(
        (deck) => deck?.name === deckCard.name
      );
      commit("removeCardsInDeck", { deckIndex: indexDeck, card: card });
      dispatch("fetchDecksList");
    },
  },

  namespaced: true,
};
