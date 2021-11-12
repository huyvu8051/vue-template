<template>
  <div class="text-center" >
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          class="mx-2"
          active-class="purple white--text"
          :color="toLowerCaseStr(playerGame.color)"
          depressed
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list :color="toLowerCaseStr(playerGame.color)">
          <v-list-item >
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{playerGame.player.username}}</v-list-item-title>
              <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="kick">
            <span>Kick</span>
            <v-icon right>logout</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  props: {
    playerGame: Object
  },
  created() {
  },
  methods: {
    kick() {
      console.log("kick " + this.playerGame.player.username);
    },
    toLowerCaseStr(str) {
      try {
        return str.toLowerCase();
      } catch (e) {
        return "null";
      }
    }
  }
};
</script>

<style>
</style>