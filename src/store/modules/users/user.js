/* eslint-disable no-unused-vars */

import { firebaseConfig, linkFirebase } from "@/store/config/firebase"
import axios from "axios"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth"
const auth = getAuth()
export const user = {
	state() {
		return {
			user: null,
			isLoading: false,
			error: false,
			errorMessage: ""
		}
	},

	mutations: {
		updateUser(state, user) {
			state.user = user
		},
		updateIsLoading(state, isLoading) {
			state.isLoading = isLoading
		},
		updateErrorStatus(state, { error, errorMessage }) {
			state.error = error;
			state.errorMessage = errorMessage
		},
		clearInfo(state) {
			state.user = null;
			state.error = false;
			state.errorMessage = ''
		}
	},

	getters: {},

	actions: {
		async getLoginUser({ commit }, { email, password }) {
			await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
				commit('updateUser', userCredential.user)
			}).catch((error) => {
				console.dir(error);
				commit('updateErrorStatus', { error: true, errorMessage: error.code })
			})
		},
		async getRegisterUser({ commit, dispatch }, { email, password, name }) {
			await createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
				commit('updateUser', userCredential.user)
				dispatch('setUserInfo', { user: userCredential.user, name: name })
			}).catch((error) => {
				commit('updateErrorStatus', { error: true, errorMessage: error.code })
			})
		},

		async setUserInfo({ commit, rootState }, { user, name }) {
			console.log(rootState.cards.cardList);
			const userInfo = {
				cards: rootState.cards.cardList,
				decks: [''],
				rating: 0,
				wins: 0,
				defeat: 0,
				ratingCount: 0
			}
			await axios.put(`${linkFirebase}users/${user.uid}.json`, userInfo);
			updateProfile(user, {
				displayName: name,
			}).then(() => {
				commit('updateUser', user)
			}).catch((error) => {
			});
		},
		loggedUser({ commit }) {

			return new Promise((resolve, reject) => {
				onAuthStateChanged(auth, user => {
					if (user) {
						commit('updateUser', user)
						commit('updateIsLoading', true)
						resolve('access')
					}
					else {
						reject('Пользователь не зашёл')
					}
				})
			})
		},
		signOutUser({ commit }) {
			return new Promise((resolve, reject) => {
				signOut(auth).then(() => {
					commit('clearInfo')
					resolve('Вы вышли с аккаунта')
				}).catch(error => {
					reject('Не получилось выйти')
				})
			})
		}
	},

	namespaced: true
}