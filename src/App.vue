<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
  text-decoration: none;
}
.flex {
  display: flex;
}
.j-c {
  justify-content: center;
}
.j-s {
  justify-content: space-between;
}
.a-c {
  align-items: center;
}
body {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "microsoft yahei",
    arial, STHeiTi, sans-serif;
}
</style>
