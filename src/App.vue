<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/create-place">Create Place</router-link> |
    <router-link to="/view-place">View Place</router-link> |
    <router-link to="/my-places">My Places</router-link> |
    <router-link to="/list-places">List Places</router-link> |
    <router-link to="/my-bookings">My Bookings</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
