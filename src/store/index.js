import { createStore } from "vuex";
import { user } from "@/store/modules/users/user";
import { images } from "@/store/modules/get-images/images";
import { cards } from "@/store/modules/cards/cards";
import { notify } from "@/store/modules/notify/notify";
import { decks } from "@/store/modules/decks/decks";
import { battles } from "@/store/modules/battle/battles";

export default createStore({
  modules: { images, user, cards, decks, notify, battles },
});
