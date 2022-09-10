import axios from "axios"
import { linkFirebase } from "@/store/config/firebase"
export const cards = {
	state() {
		return { cardList: [] }
	},

	mutations: {
		updateCardList(state, cardList) {
			state.cardList = cardList
		}
	},
	getters: {

	},
	actions: {
		getCardList({ commit }) {
			axios.get(`${linkFirebase}settingGame/cardsList.json`).then((cards) => {
				commit('updateCardList', cards.data)
			}).catch((error) => console.log(error))
		}
	},

	namespaced: true

}