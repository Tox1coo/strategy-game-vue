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
		},
		getOpponentsDeadCard(state, getters) {
			return getters.getOpponentCards?.cards.filter(card => card?.dead)
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
		getCardAndDeckPlayers({ rootState, rootGetters, state, getters }, { board, card }) {
			let cards = (board === 'opponent') ? state.opponentsCard : rootState.decks.decksList;
			let deckIndex = (board === 'opponent') ? "" : cards?.findIndex(deck => deck.name === rootGetters['decks/getFavoriteDeck'].name);

			let cardIndex = (board === 'opponent') ? cards.cards.findIndex(opponent => opponent.name === card.name) : cards.at(deckIndex).cards.findIndex(user => user.name === card.name);

			return { cards: cards, deckIndex: deckIndex, cardIndex: cardIndex, allCards: rootState.cards.cardList }
		},
		damageAttack({ commit, state, dispatch }, { board, card, }) {
			commit('updateCardAttack', { key: board, card: card })
			const promise = dispatch('getCardAndDeckPlayers', { board: board, card: card });

			promise.then((response) => {
				let { cards, deckIndex, cardIndex } = response
				if (board === 'opponent') {
					cards.cards.at(cardIndex).stats.health = cards.cards.at(cardIndex).stats.health - state.cardAttack['user'].stats.damage;

					if (cards.cards.at(cardIndex).stats.health < 0 || cards.cards.at(cardIndex).stats.health === 0) {
						cards.cards.at(cardIndex).stats.health = 0
						cards.cards.at(cardIndex).dead = true
					}
					commit('updateOpponentsCards', cards);
					commit('updateActiveTakeCard', 'opponent')
					commit('changeActiveTurn', 'opponent');
				}
				if (board === 'user') {
					cards.at(deckIndex).cards.at(cardIndex).stats.health = cards.at(deckIndex).cards.at(cardIndex).stats.health - state.cardAttack['opponent'].stats.damage;
					if (cards.at(deckIndex).cards.at(cardIndex).stats.health < 0 || cards.at(deckIndex).cards.at(cardIndex).stats.health === 0) {
						cards.at(deckIndex).cards.at(cardIndex).stats.health = 0
						cards.at(deckIndex).cards.at(cardIndex).dead = true
					}
					commit('decks/updateDecksUser', cards, { root: true })
					commit('updateActiveTakeCard', 'user')
					commit('changeActiveTurn', 'user');
				}
				commit('zeroingCardAttack');
				commit('updateActiveEventCard', '')
			})
		},

		healingCard({ commit, state, rootGetters, rootState, dispatch }, { board, card }) {
			const promise = dispatch('getCardAndDeckPlayers', { board: board, card: card });
			promise.then((response) => {
				let { cards, deckIndex, cardIndex, allCards } = response
				let sameCard = allCards.find((cardPlayer) => cardPlayer.name === card.name)
				let fullhp = allCards.find((cardPlayer) => cardPlayer.name === card.name)
				if (sameCard.name === state.cardAttack[board].name) {
					commit('notify/updateNotify', { visible: true, message: 'Нельзя лечить самого себя' }, { root: true })
					return
				}
				if (fullhp.stats.health === card.stats.health) {
					commit('notify/updateNotify', { visible: true, message: 'У этой карты полное здоровье' }, { root: true })
					return
				}

				if (board === 'user') {
					cards.at(deckIndex).cards.at(cardIndex).stats.health = cards.at(deckIndex).cards.at(cardIndex).stats.health + state.cardAttack[board].stats.healing;
					if (cards.at(deckIndex).cards.at(cardIndex).stats.health >= fullhp.stats.health) {
						cards.at(deckIndex).cards.at(cardIndex).stats.health = fullhp.stats.health
					}
					commit('decks/updateDecksUser', cards, { root: true })
					commit('updateActiveTakeCard', 'opponent')
					commit('changeActiveTurn', 'opponent');
				}
				if (board === 'opponent') {
					cards.cards.at(cardIndex).stats.health = cards.cards.at(cardIndex).stats.health + state.cardAttack[board].stats.healing;
					if (cards.cards.at(cardIndex).stats.health >= fullhp.stats.health) {
						cards.cards.at(cardIndex).stats.health = fullhp.stats.health
					}
					commit('updateOpponentsCards', cards);
					commit('updateActiveTakeCard', 'user')
					commit('changeActiveTurn', 'user');
				}

				commit('zeroingCardAttack');
				commit('updateActiveEventCard', '')
			})


		},

		takeCardEventCard({ commit, dispatch, state }, { board, event, card = null }) {
			commit('updateActiveEventCard', event)
			console.log(board, event, card);
			if (state.activeEventCard === 'damage' && card !== null) {
				dispatch('damageAttack', { board: board, card: card })
				return
			}
			if (state.activeEventCard === 'healing' && card !== null) {
				dispatch('healingCard', { board: board, card: card })
				return
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
			if (event === 'healing') {
				commit('notify/updateNotify', { visible: true, message: 'Кликните на карту из вашей колоды, которую хотите излечить' }, { root: true })
				return
			}
			if (state.activeEventCard !== 'healing') {
				commit('updateCardAttack', { key: board, card: card })

			} else if (state.activeEventCard === 'healing') {
				commit('updateCardAttack', { key: 'cardHealing', card: card })
			}

		},
		// попробовать сделать через функции
	},
	namespaced: true
}