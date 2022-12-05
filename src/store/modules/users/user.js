/* eslint-disable no-unused-vars */

import { firebaseConfig, linkFirebase } from "@/store/config/firebase";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
const auth = getAuth();
export const user = {
  state() {
    return {
      user: null,
      isLoading: false,
      error: false,
      errorMessage: "",
      allUsers: [],
    };
  },

  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    updateErrorStatus(state, { error, errorMessage }) {
      state.error = error;
      state.errorMessage = errorMessage;
    },
    clearInfo(state) {
      state.user = null;
      state.error = false;
      state.errorMessage = "";
    },
    updateAllUsers(state, allUsers) {
      state.allUsers = allUsers;
    },
  },

  getters: {
    sortUsersForRating(state) {
      return state.allUsers.sort((user1, user2) => {
        if (user1.rating < user2.rating) {
          return 1;
        } else if (user2.rating < user1.rating) {
          return -1;
        } else return 0;
      });
    },
    getUserProfile: (state) => (username) => {
      return state.allUsers.find((user) => user.username === username);
    },
  },

  actions: {
    async getLoginUser({ commit, dispatch }, { email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          commit("updateUser", userCredential.user);
          dispatch("decks/getDecksUser", user.uid, { root: true });
          dispatch("cards/getCardList", null, { root: true });
        })
        .catch((error) => {
          console.dir(error);
          commit("updateErrorStatus", {
            error: true,
            errorMessage: error.code,
          });
        });
    },

    async getRegisterUser({ commit, dispatch }, { email, password, name }) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          commit("updateUser", userCredential.user);
          dispatch("setUserInfo", { user: userCredential.user, name: name });
          dispatch("decks/getDecksUser", user.uid, { root: true });
          dispatch("cards/getCardList", null, { root: true });
        })
        .catch((error) => {
          commit("updateErrorStatus", {
            error: true,
            errorMessage: error.code,
          });
        });
    },

    async setUserInfo({ commit, dispatch }, { user, name }) {
      const userInfo = {
        decks: [""],
        rating: 0,
        wins: 0,
        defeat: 0,
        username: name,
        registerDate: user.metadata.createdAt,
      };
      await axios.put(`${linkFirebase}users/${user.uid}.json`, userInfo);
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          commit("updateUser", user);
          dispatch("decks/getDecksUser", user.uid, { root: true });
          dispatch("cards/getCardList", null, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateUserRating({ commit, state }, status) {
      let rating = 0;
      axios.get(`${linkFirebase}users.json`).then((user) => {

        if (status === "victory") {
          let wins = 0;

          rating = user.data[state.user.uid].rating + 25;
          wins = user.data[state.user.uid].wins + 1;
          axios.put(
            `${linkFirebase}users/${state.user.uid}/rating.json`,
            rating
          );
          axios.put(`${linkFirebase}users/${state.user.uid}/wins.json`, wins);
        } else if (status === "defeat") {
          let defeat = 0;
          rating = user.data[state.user.uid].rating - 25;
          if (rating <= 0) {
            rating = '0';
          }
          defeat = user.data[state.user.uid].defeat + 1;
          axios.put(
            `${linkFirebase}users/${state.user.uid}/rating.json`,
            rating
          );
          axios.put(
            `${linkFirebase}users/${state.user.uid}/defeat.json`,
            defeat
          );
        }
        commit('battles/restarRound', null, { root: true })
      });
    },

    loggedUser({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            commit("updateUser", user);
            dispatch("decks/getDecksUser", user.uid, { root: true });

            dispatch("cards/getCardList", null, { root: true });
            const allUsers = [];
            axios.get(`${linkFirebase}users.json`).then((response) => {
              for (const key in response.data) {
                allUsers.push(response.data[key]);
              }
              commit("updateAllUsers", allUsers);
            });
            resolve("access");
          } else {
            reject("Пользователь не зашёл");
            commit("updateIsLoading", true);
          }
        });
      });
    },
    signOutUser({ commit }) {
      return new Promise((resolve, reject) => {
        signOut(auth)
          .then(() => {
            commit("clearInfo");
            resolve("Вы вышли с аккаунта");
          })
          .catch((error) => {
            reject("Не получилось выйти");
          });
      });
    },
  },

  namespaced: true,
};
