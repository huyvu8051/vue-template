<template>
  <v-app>
    <Navigation />
    <Header />
    <v-main>
      <Particles />
      <router-view></router-view>
    </v-main>
    <Footer />
    <GameNofication />
  </v-app>
</template>

<script>
import GameNofication from "@/components/GameNofication";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

export default {
  name: "App",
  components: {
    GameNofication: GameNofication,
    Navigation: Navigation,
    Header: Header,
    Footer: Footer,
    Particles: Particles,
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
