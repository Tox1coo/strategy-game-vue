<template>
  <NavBar></NavBar>

  <div class="home">
    <img
      width="300"
      src="https://i.postimg.cc/HxwVBkRL/pngegg.webp"
      alt="play"
    />
    <div class="subtitle">
      Нажмите на кнопку, чтобы начать игру! Не забудьте составить колоду и
      выбрать ее как основную(на странице с колодами)
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>


<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    cursor: pointer;
    filter: saturate(50%);
    transition: filter 0.2s ease 0s;
    &:hover {
      filter: saturate(100%);
    }
  }
  .subtitle {
    width: 70rem;
  }
}
</style>
