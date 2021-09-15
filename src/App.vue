<template>
  <div id="app">
    <div id="nav">
      <div class="container">
        <router-link to="/">文章列表</router-link>
        <router-link to="/add">新增文章</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'scss/common.scss';
</style>
