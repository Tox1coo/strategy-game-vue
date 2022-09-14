<template>
  <div v-if="isLoading" class="block">
    <router-view />
    <ModalNotify></ModalNotify>
  </div>
  <IsLoading v-else></IsLoading>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  async created() {
    await this.getAllImages();

    this.loggedUser()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setBodyImage();
        this.updateIsLoading(true);
      });
  },
  methods: {
    ...mapMutations({
      updateIsLoading: "user/updateIsLoading",
    }),
    ...mapActions({
      getAllImages: "images/getAllImages",
      loggedUser: "user/loggedUser",
      getCardList: "cards/getCardList",
    }),
    setBodyImage() {
      const body = document.getElementsByTagName("body")[0];
      body.style.backgroundImage = `url(${this.getRandomBackgroundPage})`;
    },
  },
  computed: {
    ...mapGetters({
      getRandomBackgroundPage: "images/getRandomBackgroundPage",
      getRandomBackgroundBattles: "images/getRandomBackgroundBattles",
    }),
    ...mapState({
      backgroundPageList: (state) => state.images.backgroundPageList,
      isLoading: (state) => state.user.isLoading,
    }),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.block {
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
