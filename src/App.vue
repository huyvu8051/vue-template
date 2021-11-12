<template>
  <v-app>
    <router-view></router-view>
    <GameNofication />
  </v-app>
</template>

<script>
import GameNofication from "@/components/GameNofication";
export default {
  name: "App",
  components: {
    GameNofication: GameNofication
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
