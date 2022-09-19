<template>
  <nav class="nav">
    <img
      width="100"
      height="60"
      class="nav__logo"
      src="https://i.postimg.cc/NjJV04yY/logo-app.webp"
      alt="logo"
    />
    <ul class="nav__list">
      <li v-for="link in links" :key="link.linkTitle" class="nav__item">
        <router-link v-if="link?.link != undefined" :to="link?.link">{{
          link.linkTitle
        }}</router-link>
        <a v-else @click="link.linkFunction()">{{ link.linkTitle }}</a>
        <div class="decoration"></div>
      </li>
    </ul>
    <Burger :linkList="links"></Burger>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      links: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    getUsername() {
      return this.user.displayName;
    },
  },
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
  mounted() {
    this.links = [
      {
        linkTitle: "Home",
        link: "/",
      },
      {
        linkTitle: "Profile",
        link: `/profile/${this.getUsername}`,
      },
      {
        linkTitle: "Ratings",
        link: `/ratings`,
      },
      {
        linkTitle: "Decks",
        link: "/decks",
      },
      {
        linkTitle: "Exit",
        linkFunction: this.exitUser,
      },
    ];
  },
};
</script>

<style lang="scss">
@import "@/styles/mixins.scss";

.decoration {
  content: "";
  display: block;
  position: absolute;
  margin-top: 5px;
  padding-top: 5px;
  height: 2px;
  width: 100%;
  background-color: $poison-color;
  border-radius: 10px;
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 0.2s ease 0s;
}
.nav {
  @include background;
  height: 6rem;
  width: 100%;
  z-index: 2;
  border: none;
  display: flex;
  align-items: center;
  border-bottom: 2px solid $poison-color;
  position: relative;
  gap: 20px;
  &__logo {
    @media (max-width: 700px) {
    }
  }
  &__list {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 100px;
    list-style: none;
    height: 100%;
    @media (max-width: 880px) {
      gap: 50px;
    }
    @media (max-width: 700px) {
      justify-content: space-around;
      gap: 0;
    }
    @media (max-width: 550px) {
      display: none;
    }
  }

  &__item {
    font-size: 1.8rem;
    opacity: 0.7;
    transform: opacity 0.1s linear;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    a {
      display: block;
      color: $poison-color;
      text-decoration: none;
    }
    &:hover {
      opacity: 1;
      a {
        animation: decoration-nav 0.4s ease-in-out;
      }
      .decoration {
        transform: translate(0, 0);
        opacity: 1;
      }
    }
  }
}

@keyframes decoration-nav {
  0% {
    transform: translate(0, 0px);
  }
  25% {
    transform: translate(0, -5px);
  }
  50% {
    transform: translate(0, -10px);
  }
  60% {
    transform: translate(0, 5px);
  }

  100% {
    transform: translate(0, 0px);
  }
}
</style>
