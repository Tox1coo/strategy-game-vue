<template>
  <nav class="nav">
    <ul class="nav__list">
      <img
        width="100"
        height="60"
        class="nav__logo"
        src="https://i.postimg.cc/NjJV04yY/logo-app.webp"
        alt="logo"
      />
      <li v-for="link in links" :key="link.linkTitle" class="nav__item">
        <router-link v-if="link?.link != undefined" :to="link?.link">{{
          link.linkTitle
        }}</router-link>
        <a v-else @click="link.linkFunction()">{{ link.linkTitle }}</a>
        <div class="decoration"></div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      links: [
        {
          linkTitle: "Home",
          link: "/",
        },
        {
          linkTitle: "Profile",
          link: "/profile",
        },
        {
          linkTitle: "Ratings",
          link: "/ratings",
        },
        {
          linkTitle: "Decks",
          link: "/decks",
        },
        {
          linkTitle: "Exit",
          linkFunction: this.exitUser,
        },
      ],
    };
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
};
</script>

<style lang="scss" scoped>
.decoration {
  content: "";
  display: block;
  position: absolute;
  margin-top: 5px;
  padding-top: 5px;
  height: 2px;
  width: 100%;
  background-color: $primary-brown-nav;
  border-radius: 10px;
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 0.2s ease 0s;
}
.nav {
  height: 6rem;
  width: 100%;
  border-bottom: 2px solid $poison-color;
  background-color: rgba(#111, 0.1);
  backdrop-filter: blur(5px) saturate(5%);
  &__list {
    display: flex;
    align-items: center;
    gap: 100px;
    list-style: none;
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
      color: $primary-brown-nav;
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