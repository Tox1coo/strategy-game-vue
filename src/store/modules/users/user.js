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


	actions: {
		async getLoginUser({ commit, dispatch }, { email, password }) {
			await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
				commit('updateUser', userCredential.user)
				dispatch('decks/getDecksUser', user.uid, { root: true })
				dispatch('cards/getCardList', null, { root: true })

			}).catch((error) => {
				console.dir(error);
				commit('updateErrorStatus', { error: true, errorMessage: error.code })
			})
		},

		async getRegisterUser({ commit, dispatch }, { email, password, name }) {
			await createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
				commit('updateUser', userCredential.user)
				dispatch('setUserInfo', { user: userCredential.user, name: name })
				dispatch('decks/getDecksUser', user.uid, { root: true })
				dispatch('cards/getCardList', null, { root: true })
			}).catch((error) => {
				commit('updateErrorStatus', { error: true, errorMessage: error.code })
			})
		},

		async setUserInfo({ commit, dispatch }, { user, name }) {
			const userInfo = {
				decks: [''],
				rating: 0,
				wins: 0,
				defeat: 0,
				ratingCount: 0,
				username: name
			}
			await axios.put(`${linkFirebase}users/${user.uid}.json`, userInfo);
			updateProfile(user, {
				displayName: name,
			}).then(() => {
				commit('updateUser', user);
				dispatch('decks/getDecksUser', user.uid, { root: true })
				dispatch('cards/getCardList', null, { root: true })

			}).catch((error) => {
				console.log(error);
			});
		},
		loggedUser({ commit, dispatch }) {
			return new Promise((resolve, reject) => {
				onAuthStateChanged(auth, user => {
					if (user) {
						commit('updateUser', user)
						dispatch('decks/getDecksUser', user.uid, { root: true })

						dispatch('cards/getCardList', null, { root: true })
						resolve('access')
					}
					else {
						reject('Пользователь не зашёл')
						commit('updateIsLoading', true)

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