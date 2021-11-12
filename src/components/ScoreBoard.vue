<template>
  <v-dialog v-model="dialog" width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">Game Finish</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          hide-default-header
          hide-default-footer
          class="elevation-1"
          :custom-sort="customSort"
        >
          <template v-slot:[`item.player.id`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.finishDate`]="{ item }">{{
            formatDate(item.finishDate)
          }}</template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="returnToListGame()">
          Exist
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    players: Array,
  },
  data() {
    return {
      dialog: true,
      headers: [
        { text: "id", value: "player.id" },
        { text: "Color", value: "color" },
        { text: "Name", value: "player.username" },

        {
          text: "Time",
          align: "start",
          value: "finishDate",
        },
      ],
      desserts: this.players,
    };
  },
  methods: {
    returnToListGame() {
      this.$router.push({
        name: "game",
      });
    },
    formatDate(s) {
      if (s === null) {
        return "Not finish";
      }

      var date = new Date(s);

      return date.toLocaleString();
    },
    customSort: function (items) {
      items.sort((a, b) => {
        if (a.finishDate === null) {
          return 1;
        }
        if (b.finishDate === null) {
          return -1;
        }
        return new Date(a.finishDate) - new Date(b.finishDate);
      });
      return items;
    },
  },
};
</script>