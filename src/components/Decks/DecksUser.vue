<template>
  <div class="decks__user">
    <MyButton @click="showModal = true">Создать колоду</MyButton>

    <div v-if="decksUser.length > 0" class="decks__user-list">
      <DecksItem v-for="(deck, index) in decksUser" :key="index" :deck="deck">
      </DecksItem>
      <!-- написать obserber для постепенной загрузки -->
    </div>

    <div v-else class="title">У вас нет колод. Добавьте их</div>
  </div>

  <Modal v-model:show="showModal">
    <div class="decks__modal">
      <MyInput
        v-model="nameDecks"
        :placeholderInput="'Введите название колоды'"
        :error="{
          errorStatus: errorInput.error,
          errorMessage: errorInput.errorMessage,
        }"
      ></MyInput>

      <MyButton @click="addDecks">Добавить колоду</MyButton>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import DecksItem from "@/components/Decks/DecksItem.vue";
import { messages } from "@/utils/messages";
export default {
  data() {
    return {
      showModal: false,
      nameDecks: "",
      errorInput: {
        error: false,
        errorMessage: "",
      },
    };
  },
  props: {
    decksUser: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      addDecksUser: "decks/addDecksUser",
    }),
    addDecks() {
      this.errorInput.error = false;
      this.errorInput.errorMessage = "";
      if (this.nameDecks.length > 15) {
        this.errorInput.error = true;
        this.errorInput.errorMessage = messages["long-name-deck"];
        return;
      }
      if (this.nameDecks) {
        const deck = this.addDecksUser({
          name: this.nameDecks,
          cards: [""],
          favorite: false,
        });
        deck
          .then(() => {
            this.showModal = false;
          })
          .catch((error) => {
            this.errorInput.error = true;
            this.errorInput.errorMessage = messages[error];
          });
      } else {
        this.errorInput.error = true;
        this.errorInput.errorMessage = messages["empty-name-deck"];
      }
    },
  },

  components: { DecksItem },
};
</script>

<style lang="scss">
@import "@/styles/mixins.scss";

.decks {
  &__modal {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      margin-top: 40px;
    }
  }
  &__user {
    .title {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-list {
      @include custom-scrollbar;
      overflow-y: auto;
      max-height: 680px;
      padding-right: 15px;
      margin-top: 25px;
    }
  }
}
</style>
