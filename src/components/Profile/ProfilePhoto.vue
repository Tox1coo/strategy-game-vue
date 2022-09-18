<template>
  <div class="profile__photo">
    <img
      width="200"
      height="200"
      src="https://i.postimg.cc/W39Ng06J/notFound.webp"
      alt="profile"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.profile__photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  border: 1px solid $poison-color;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
  }
}
</style>
