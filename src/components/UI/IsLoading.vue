<template>
  <div class="loading">
    <div class="loading__item"></div>
  </div>
</template>

<script>
export default {
  name: "IsLoading",
};
</script>

<style lang="scss" scoped>
.loading {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__item {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid rgba(0, 0, 0, 0.2);
    border-right-color: $error-color;
    animation: loading 1s linear infinite;
    border-style: dotted;
  }
}

@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
