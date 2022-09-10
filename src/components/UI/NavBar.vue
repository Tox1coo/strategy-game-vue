<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <img
          class="nav__logo"
          src="https://i.postimg.cc/0NGdz1Kv/logo.webp"
          alt="logo"
        />
        <router-link to="/">home</router-link>
        <!-- <router-link to="/battle">Play</router-link> -->
        <router-link to="/ratings">Ratings</router-link>
        <a @click="exitUser()">exit</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  methods: {
    ...mapActions({
      signOutUser: "user/signOutUser",
    }),
    exitUser() {
      const logout = this.signOutUser();

      logout
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: 6rem;
  width: 100%;
  border-bottom: 2px solid $poison-color;
  background-color: rgba(#111, 0.2);
  backdrop-filter: blur(5px) saturate(70%);
  &__list {
    display: flex;
  }
}
</style>