<template>
  <div>
    <Navigation />
    <Header />
    <v-main>
      <v-container fluid fill-height rounded-lg>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md8>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              sort-by="calories"
              class="elevation-1"
            >
              <template v-slot:[`item.status`]="{ item }">
                <v-chip
                  class="ma-2"
                  color="orange"
                  text-color="white"
                  v-if="item.status === 'IN_PROGRESS'"
                >
                  In progress
                  <v-icon right>done</v-icon>
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                  v-if="item.status === 'WAITING'"
                >
                  Waiting
                  <v-icon right>mdi-checkbox-marked-circle</v-icon>
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="red"
                  text-color="white"
                  v-if="item.status === 'CLOSED'"
                >
                  Closed
                  <v-icon right>unpublished</v-icon>
                </v-chip>
              </template>
              <template v-slot:[`item.createdDate`]="{ item }">{{
                formatDate(item.createdDate)
              }}</template>
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>LIST GAME</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >New game</v-btn
                      >
                    </template>

                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Game name"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close"
                          >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="save"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogPlay" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to join this game?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closePlay"
                          >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="playConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="play(item)"
                  >play_arrow</v-icon
                >
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>
<script>
import PlayerService from "@/services/Player";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
export default {
  components: {
    Footer: Footer,
    Header: Header,
    Navigation: Navigation
  },
  data: () => ({
    search: "",
    dialog: false,
    dialogPlay: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id"
      },
      { text: "Name", value: "name" },
      { text: "Host", value: "host.username" },
      { text: "Created date", value: "createdDate" },
      { text: "Players", value: "players.length" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return "New Game";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogPlay(val) {
      val || this.closePlay();
    }
  },

  created() {
    this.initialize();
    this.setDefaultGameName();
  },

  methods: {
    async initialize() {
      try {
        var result = await PlayerService.findAllGame();
        this.desserts = result.data;
      } catch (e) {
        console.log(e);
      }
    },

    setDefaultGameName() {
      this.editedItem.name = "New game by " + this.$store.state.username;
      this.defaultItem.name = "New game by " + this.$store.state.username;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closePlay() {
      this.dialogPlay = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // create a game
    save() {
      PlayerService.createGame({
        name: this.editedItem.name
      })
        .then(response => {
          this.$router.push({
            name: "parcheesi",
            params: { game: response.data },
            query: { gameId: response.data.id }
          });
        })
        .catch(error => {
          this.$eventBus.$emit("nofication", {
            message: error.response.data,
            status: "error"
          });
        });

      this.close();
    },
    // play an available game
    playConfirm() {
      // join a game

      PlayerService.join({
        id: this.editedItem.id
      })
        .then(response => {
          this.$router.push({
            name: "parcheesi",
            params: { game: response.data },
            query: { gameId: response.data.id }
          });
        })
        .catch(error => {
          this.$eventBus.$emit("nofication", {
            message: error.response.data,
            status: "error"
          });
        });

      this.dialogPlay = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    play(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogPlay = true;
    },
    formatDate(s) {
      var date = new Date(s);

      return date.toLocaleString();
    }
  }
};
</script>
