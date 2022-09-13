import { decks } from "@/store/modules/decks/decks";

const deckList = [
	{
		name: "Моя колода",
		cards: [],
		favorite: false
	},
	{
		name: "Моя новая колода",
		cards: [],
		favorite: true
	},
]

const deck =
{
	name: "Моя колода",
	cards: [],
	favorite: false
};

const deck2 =
{
	name: "dsaads",
	cards: [],
	favorite: true
}

const state = {
	deckList
}
describe('Decks', () => {
	it("Возвращает нужный объект", () => {
		const actual = decks.actions.addDecksUser({ state: state }, deck)
		expect(actual).toEqual(deckList[0])
	});

	it("Возвращает пустой массив", () => {
		const actual = decks.actions.addDecksUser({ state: state }, deck2)
		expect(actual).toEqual(undefined)
	});


})