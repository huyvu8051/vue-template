<template>
  <div>
    <v-btn
      fab
      dark
      
      color="primary"
      fixed
      right
      bottom
      class="pa-0"
      @click="rollDice"
      v-if="game.status === 'IN_PROGRESS'"
      :disabled="game.diced || findCurrentPlayerByColor(game.currentPlayer).player.username !== $store.state.username"
    >
      <v-icon dark>3d_rotation</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      color="primary"
      fixed
      right
      bottom
      class="pa-0"
      v-if="game.status === 'WAITING' && game.host.username === $store.state.username"
      @click="startGame"
    >
      <v-icon dark>play_arrow</v-icon>
    </v-btn>
  </div>
</template>

<script>
import PlayerService from "@/services/Game";
export default {
  props: {
    game: Object
  },

  data: () => ({}),
  methods: {
    async rollDice() {
      try {
        var response = await PlayerService.getIDiced();
      } catch (error) {
        this.$eventBus.$emit("nofication", {
          message: "Error " + error,
          status: "error"
        });
      }
    },
    findCurrentPlayerByColor(color) {
      return this.game.players.find(e => e.color === color);
    },
    async startGame() {
      var response = await PlayerService.startGame({
        id: this.$route.query.gameId
      });
    }
  }
};
</script>

<style>
</style>