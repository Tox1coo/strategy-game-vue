<template>
  <NavBar></NavBar>

  <div class="profile">
    <div class="container">
      <div class="profile__inner">
        <div class="profile__top">
          <ProfilePhoto></ProfilePhoto>
          <div class="profile__user">
            <div class="title">никнейм: {{ getUsername }}</div>
            <div class="text text_profile">
              Дата регистрации:
              {{
                new Date(
                  +this.getUserProfile(this.localStorageProfile.name)
                    ?.registerDate
                ).getDate()
              }}/{{
                new Date(
                  +this.getUserProfile(this.localStorageProfile.name)
                    ?.registerDate
                ).getMonth() + 1
              }}/{{
                new Date(
                  +this.getUserProfile(this.localStorageProfile.name)
                    ?.registerDate
                ).getFullYear()
              }}
            </div>
          </div>
        </div>
        <div class="profile__body">
          <ProfileStats :statsItems="getStatsPlayUser"></ProfileStats>
          <div class="profile__img">
            <img src="https://i.postimg.cc/GhPWNprt/rating.webp" alt="rating" />
            <div class="subtitle">
              {{ getRating }} <br />
              Личный рейтинг
            </div>
          </div>
          <ProfileStats :statsItems="getStatsDeckUser"></ProfileStats>
        </div>
        <div class="profile__decks profile-decks">
          <div class="title">Колоды:</div>
          <div v-if="getDecksProfile?.length > 0" class="profile-decks__list">
            <DecksItem
              v-for="(deck, index) in getDecksProfile"
              :key="index"
              :deck="deck"
            ></DecksItem>
          </div>
          <div v-else class="title profile-decks__title">Колод нет</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ProfilePhoto from "@/components/Profile/ProfilePhoto.vue";
import ProfileStats from "@/components/Profile/ProfileStats.vue";
import DecksItem from "@/components/Decks/DecksItem.vue";
export default {
  name: "Profile",
  data() {
    return {
      localStorageProfile: localStorage,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    ...mapGetters({
      getUserProfile: "user/getUserProfile",
    }),
    getRating() {
      return this.getUserProfile(this.$route.params.name)?.rating;
    },
    getUsername() {
      return this.getUserProfile(this.$route.params.name)?.username;
    },
    getDecksProfile() {
      return this.getUserProfile(this.$route.params.name)?.decks.filter(
        (deck) => deck !== ""
      );
    },
    getAllBattles() {
      return (
        this.getUserProfile(this.$route.params.name)?.wins +
        this.getUserProfile(this.$route.params.name)?.defeat
      );
    },
    getProcentWinsUser() {
      let procent = 0;
      if (this.getAllBattles !== 0) {
        procent =
          (this.getUserProfile(this.$route.params.name)?.wins /
            this.getAllBattles) *
          100;
      }

      return procent.toFixed(0);
    },
    getStatsPlayUser() {
      return [
        {
          title: "Процент побед",
          pathName: "winsProcent",
          body: `${this.getProcentWinsUser} %`,
        },
        {
          title: "Бои",
          pathName: "battles",
          body: this.getAllBattles,
        },
        {
          title: "Победы",
          pathName: "wins",
          body: this.getUserProfile(this.$route.params.name)?.wins,
        },
        {
          title: "Поражения",
          pathName: "defeat",
          body: this.getUserProfile(this.$route.params.name)?.defeat,
        },
      ];
    },
    getStatsDeckUser() {
      return [
        {
          title: "Количество колод",
          pathName: "deckCount",
          body: this.getUserProfile(this.$route.params.name)?.decks.filter(
            (deck) => deck !== ""
          ).length,
        },
        {
          title: "Активная колода",
          pathName: "activeDeck",
          body:
            this.getUserProfile(this.$route.params.name)
              ?.decks.filter((deck) => deck !== "")
              .find((deckActive) => deckActive.favorite)?.name || "Не выбрана",
        },
      ];
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.getUserProfile(this.$route.params.name) === undefined) {
        this.$router.push("/notFound");
      }
    }, 1000);
  },
  components: { ProfilePhoto, ProfileStats, DecksItem },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.profile {
  @include custom-scrollbar;

  max-height: 90vh;
  width: 100%;
  margin-top: 50px;
  overflow: auto;
  .title {
    text-align: left;
    font-size: 3.5rem;
  }
  &__img {
    img {
      width: 200px;
    }
    .subtitle {
      color: $poison-color;
    }
  }
  &__inner {
    @include background;
    min-height: 85vh;

    height: 100%;
    padding: 20px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
  }
  &__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__top {
    display: flex;
  }
  &__user {
    margin-left: 15px;
    text-align: left;
  }
  &-decks {
    margin-top: 25px;
    &__list {
      margin-top: 15px;

      &-list {
        @include custom-scrollbar;
        overflow-y: auto;
        max-height: 680px;
        padding-right: 15px;
        margin-top: 25px;
      }
    }
    &__title {
      text-align: center !important;
    }
  }
}
</style>
