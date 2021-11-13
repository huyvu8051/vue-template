<template>
  <v-app>
    <Navigation />
    <Header />
    <v-main>
      <div id="particles-js"></div>
      <!-- stats - count particles -->
      <div class="count-particles">
        <span class="js-count-particles">--</span> particles
      </div>
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

export default {
  name: "App",
  components: {
    GameNofication: GameNofication,
    Navigation: Navigation,
    Header: Header,
    Footer: Footer,
  },
  created(){

  }
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

 /* ---- reset ---- */

  body {
    margin: 0;
    font: normal 75% Arial, Helvetica, sans-serif;
  }

  canvas {
    display: block;
    vertical-align: bottom;
  }

  /* ---- particles.js container ---- */

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #464141;
    background-image: url("");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  /* ---- stats.js ---- */

  .count-particles {
    background: #000022;
    position: absolute;
    top: 48px;
    left: 0;
    width: 80px;
    color: #13e8e9;
    font-size: 0.8em;
    text-align: left;
    text-indent: 4px;
    line-height: 14px;
    padding-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
  }

  .js-count-particles {
    font-size: 1.1em;
  }

  #stats,
  .count-particles {
    -webkit-user-select: none;
  }

  #stats {
    border-radius: 3px 3px 0 0;
    overflow: hidden;
  }

  .count-particles {
    border-radius: 0 0 3px 3px;
  }
</style>
