<template>
  <div class="error">
    <h3 class="title">你所访问的页面不存在！</h3>
    <img src="/img/404.png" @click="gotoHome" style="cursor: pointer" alt="" />
  </div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
</style>
