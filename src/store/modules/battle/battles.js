/* eslint-disable no-unused-vars */
export const battles = {
	state() {
		return {
			cardAttack: {
				user: null,
				cardHealing: null,
				opponent: null,
			},
			activeTurn: "user",
			activeTakeCard: 'user',
			activeEventCard: '',
			opponentsCard: { cards: [] }
		}
	},
	getters: {
		getOpponentCards(state) {
			return state.opponentsCard
		},
		getActiveTakeCard(state) {
			return state.activeTakeCard
		}
	},
	mutations: {
		updateCardAttack(state, { key, card }) {
			state.cardAttack[key] = card
		},
		changeActiveTurn(state, activeTurn) {
			state.activeTurn = activeTurn
		},
		updateActiveTakeCard(state, activeTakeCard) {
			state.activeTakeCard = activeTakeCard
		},
		updateOpponentsCards(state, opponentCards) {
			state.opponentsCard = opponentCards
		},
		updateActiveEventCard(state, activeEventCard) {
			state.activeEventCard = activeEventCard
		},
		zeroingCardAttack(state) {
			state.cardAttack = {
				user: null,
				cardHealing: null,
				opponent: null,
			}
		}
	},
	actions: {
		// createEventCard({ commit, state }, event) {

		// },
		takeCardEventCard({ commit, dispatch, state, rootGetters, rootState }, { board, event, card = null }) {
			commit('updateActiveEventCard', event)
			console.log();
			console.log(board, event, card);
			if (state.activeEventCard === 'damage' && card !== null) {
				commit('updateCardAttack', { key: board, card: card })
				if (board === 'opponent') {
					const cards = state.opponentsCard
					const cardIndex = cards.cards.findIndex(opponent => opponent.name === card.name);
					cards.cards.at(cardIndex).stats.health = cards.cards.at(cardIndex).stats.health - state.cardAttack['user'].stats.damage;
					console.log(cards.cards.at(cardIndex));
					console.log(cards);
					commit('updateOpponentsCards', cards);
					commit('updateActiveTakeCard', 'opponent')
					commit('changeActiveTurn', 'opponent');
					commit('zeroingCardAttack');
					commit('updateActiveEventCard', '')
					return
				}
				if (board === 'user') {
					const rootCards = rootState.decks.decksList
					const deckIndex = rootCards.findIndex(deck => deck.name === rootGetters['decks/getFavoriteDeck'].name)
					console.log(deckIndex);
					const cardIndex = rootCards.at(deckIndex).cards.findIndex(user => user.name === card.name);
					console.log(cardIndex);
					rootCards.at(deckIndex).cards.at(cardIndex).stats.health = rootCards.at(deckIndex).cards.at(cardIndex).stats.health - state.cardAttack['opponent'].stats.damage;
					console.log(rootCards.at(deckIndex).cards.at(cardIndex).stats.health);

					commit('decks/updateDecksUser', rootCards, { root: true })
					commit('updateActiveTakeCard', 'user')
					commit('changeActiveTurn', 'user');
					commit('zeroingCardAttack');
					commit('updateActiveEventCard', '')
					return
				}
			}
			if (event === 'damage') {
				commit('notify/updateNotify', { visible: true, message: 'Кликните на карту оппонента, которую хотите атаковать' }, { root: true })
				if (board === 'user') {
					commit('updateActiveTakeCard', 'opponent')
				} else {
					commit('updateActiveTakeCard', 'user')
				}
				return
			}
			if (event === 'spell') {
				commit('notify/updateNotify', { visible: true, message: 'Кликните на карту оппонента, которую хотите атаковать' }, { root: true })
				if (board === 'user') {
					commit('updateActiveTakeCard', 'opponent')
				} else {
					commit('updateActiveTakeCard', 'user')
				}
				return
			}
			if (state.activeEventCard !== 'healing') {
				commit('updateCardAttack', { key: board, card: card })

			} else if (state.activeEventCard === 'healing') {
				commit('updateCardAttack', { key: 'cardHealing', card: card })

			}
			// dispatch('createEventCard', event)

		},

	},
	namespaced: true
}