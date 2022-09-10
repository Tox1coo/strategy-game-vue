import { createStore } from "vuex";
import { user } from "@/store/modules/users/user"
import { images } from "@/store/modules/get-images/images"
import { cards } from "@/store/modules/cards/cards"

export default createStore({
  modules: { images, user, cards },
});
