<template>
  <NavBar></NavBar>

  <div class="ratings">
    <div class="container">
      <div class="ratings__inner">
        <h1 class="title">Рейтинг</h1>

        <div class="ratings__body">
          <RatingProfile
            v-for="ratingItem in ratingsInfoList"
            :key="ratingItem.title"
            :ratingItem="ratingItem"
          ></RatingProfile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import RatingProfile from "@/components/Ratings/RatingProfile.vue";
export default {
  name: "Ratings",
  data() {
    return {
      ratingsInfoList: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    ...mapGetters({
      sortUsersForRating: "user/sortUsersForRating",
    }),

    getusernamesUsers() {
      const users = [];
      this.sortUsersForRating.forEach((user) => {
        users.push(user.username);
      });
      return users;
    },
    getRatingsUsers() {
      const users = [];
      this.sortUsersForRating.forEach((user) => {
        users.push(user.rating);
      });
      return users;
    },
    getWinsUsers() {
      const users = [];
      this.sortUsersForRating.forEach((user) => {
        users.push(user.wins);
      });
      return users;
    },
    getDefeatUsers() {
      const users = [];
      this.sortUsersForRating.forEach((user) => {
        users.push(user.defeat);
      });
      return users;
    },
    getallBattlesUsers() {
      const users = [];
      this.sortUsersForRating.forEach((user) => {
        users.push(user.defeat + user.wins);
      });
      return users;
    },
  },
  mounted() {
    setTimeout(() => {
      this.ratingsInfoList.push(
        {
          title: "Никнеймы",
          info: this.getusernamesUsers,
        },
        {
          title: "Рейтинг",
          info: this.getRatingsUsers,
        },
        {
          title: "Победы",
          info: this.getWinsUsers,
        },
        {
          title: "Поражения",
          info: this.getDefeatUsers,
        },
        {
          title: "Битвы",
          info: this.getallBattlesUsers,
        }
      );
    }, 500);
  },
  components: { RatingProfile },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.ratings {
  height: 100vh;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;

  &__inner {
    @include background;
    height: 100%;
    border-radius: 25px;
  }
  &__body {
    @include custom-scrollbar;
    display: flex;
    align-items: center;
    overflow: auto;
    gap: 20px;
    padding: 0 20px;
  }
}
</style>
