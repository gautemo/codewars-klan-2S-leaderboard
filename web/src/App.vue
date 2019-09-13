<template>
  <div id="app">
    <div id="nav" v-if="$route.path!=='/api-token'">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

html, body{
  margin: 0;
  padding: 0;
}

</style>
