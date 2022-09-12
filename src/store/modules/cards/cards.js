import axios from "axios"
import { linkFirebase } from "@/store/config/firebase"
export const cards = {
	state() {
		return {
			cardList: [],
			filterItemType: "Все",
			filterItemRange: "Все",
			decksList: [],
			activeDeck: ''
		}
	},

	mutations: {
		updateCardList(state, cardList) {
			state.cardList = cardList
		},
		updateFilterItemType(state, filterItemType) {
			state.filterItemType = filterItemType
		},
		updateFilterItemRange(state, filterItemRange) {
			state.filterItemRange = filterItemRange
		},
		updateDecksUser(state, decksList) {
			state.decksList = decksList
		}
	},
	getters: {
		getSortedCardsList(state) {
			return [...state.cardList].filter(card => {
				if (state.filterItemType === "Все" && state.filterItemRange === 'Все') return state.cardList;
				else if (state.filterItemType === "Все") return card.typeCard.typeRange.includes(state.filterItemRange)
				else if (state.filterItemRange === 'Все') return card.typeCard.type.includes(state.filterItemType)
				else return card.typeCard.type.includes(state.filterItemType) && card.typeCard.typeRange.includes(state.filterItemRange)
			})
		},


	},
	actions: {
		getCardList({ commit }) {
			axios.get(`${linkFirebase}settingGame/cardsList.json`).then((cards) => {
				commit('updateCardList', cards.data)
			}).catch((error) => console.log(error))
		},
		getDecksUser({ commit }, uid) {
			console.log(uid);
			axios.get(`${linkFirebase}/users/${uid}/decks.json`).then((decks) => {
				commit('updateDecksUser', decks.data)
			}).catch((error) => console.log(error))
		}
	},

	namespaced: true

}