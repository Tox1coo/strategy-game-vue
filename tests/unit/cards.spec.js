
import { cards } from "@/store/modules/cards/cards.js"


const cardList = [
  {
    "name": "Miss Fortune",
    "photo": "DZQR1Q0F/Miss-card.webp",
    "stats": {
      "health": 115,
      "damage": 45
    },
    "typeCard": {
      "typeRange": "Средний",
      "type": "Cтрелок"
    },
    "effect": {
      "photoEffect": {
        "key": ""
      }
    }
  },
  {
    "name": "Ekko",
    "photo": "NfCS8jsy/Ekko-card.webp",
    "stats": {
      "health": 137,
      "damage": 37
    },
    "typeCard": {
      "typeRange": "Ближний",
      "type": "Боец"
    },
    "effect": {
      "photoEffect": {
        "key": ""
      }
    }
  },

]
const filterItemType = "Боец"
const filterItemRange = "Все"
const state = {
  cardList,
  filterItemType,
  filterItemRange
}
describe("Cards", () => {
  it("Возвращает бойцов", () => {
    const actual = cards.getters.getSortedCardsList(state)
    expect(actual).toEqual([cardList[1]])
  });

  it("Возвращает стрелков", () => {
    state.filterItemType = "Cтрелок"
    const actual = cards.getters.getSortedCardsList(state)
    expect(actual).toEqual([cardList[0]])
  });

  it("Возвращает пустой массив", () => {
    state.filterItemType = "Боец"
    state.filterItemRange = "Средний"
    console.log(state);
    const actual = cards.getters.getSortedCardsList(state)
    expect(actual).toEqual([])
  });
});
