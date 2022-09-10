/* eslint-disable no-unused-vars */
import { linkFirebase, firebaseConfig } from "@/store/config/firebase";
import axios from "axios"
console.log(linkFirebase);
export const images = {
	state() {
		return {
			IMAGE_LINK: 'https://i.postimg.cc/',
			backgroundPageList: null,
			backgroundBattleList: null
		}
	},

	mutations: {
		updateBackgroundPageImage(state, backgroundPageList) {
			state.backgroundPageList = backgroundPageList
		},
		updateBackgroundBattleImage(state, backgroundBattleList) {
			state.backgroundBattleList = backgroundBattleList
		}
	},

	getters: {
		getRandomBackgroundPage(state) {
			return `${state.IMAGE_LINK}${state.backgroundPageList[Math.floor(1 + Math.random() * (state.backgroundPageList.length - 1))].key}`
		},
		getRandomBackgroundBattles(state) {
			return `${state.IMAGE_LINK}${state.backgroundBattleList[Math.floor(1 + Math.random() * (state.backgroundBattleList.length - 1))].key}`
		}
	},

	actions: {
		async getAllImages({ commit }) {
			await axios.get(`${linkFirebase}settingGame.json`).then((images) => {
				commit('updateBackgroundPageImage', images.data.backgroundPage)
				commit('updateBackgroundBattleImage', images.data.backgroundBattles)

			}).catch(error => {
				console.log(error);
			})
		}
	},

	namespaced: true
}