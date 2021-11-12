<template>
  <v-main>
    <v-container fluid fill-height rounded-lg>
      <v-layout align-center justify-center cyan rounded-xl>
        <v-flex xs12 sm8 md6 lg8 xl8 rounded-lg>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="3" xl="3">
              <v-row align="center" justify="center">
                <div v-for="item in game.players" :key="item.player.id">
                  <v-col
                    cols="12"
                    v-if="item.player.username !== $store.state.username"
                  >
                    <PlayerInGame :playerGame="item" />
                  </v-col>
                </div>
              </v-row>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
              <div
                id="table"
                :class="toLowerCaseStr(game.currentPlayer) + ' rounded-xl'"
                ref="table"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="3" xl="3">
              <Dice />
            </v-col>
          </v-row>
        </v-flex>
        <ScoreBoard v-if="isGameEnded()" :players="game.players" />
        <GameSpeedDial />
        <DiceFloatButton :game="game" />
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import Dice from "./Dice";

import PlayerService from "@/services/Game";
import PlayerInGame from "@/components/PlayerInGame";
import ScoreBoard from "@/components/ScoreBoard";
import GameSpeedDial from "@/components/GameSpeedDial";
import DiceFloatButton from "@/components/DiceFloatButton";
export default {
  name: "App",
  components: {
    Dice: Dice,
    PlayerInGame: PlayerInGame,
    GameSpeedDial: GameSpeedDial,
    DiceFloatButton: DiceFloatButton,
    ScoreBoard: ScoreBoard
  },
  data: () => ({
    aGameFields: [
      {
        x: 150,
        y: 150,
        color: "RED",
        radius: 40,
        homepoint: 3
      },
      {
        x: 850,
        y: 150,
        color: "BLUE",
        radius: 40,
        homepoint: 1
      },
      {
        x: 50,
        y: 250,
        color: "RED",
        radius: 40,
        homepoint: 1
      },
      {
        x: 50,
        y: 150,
        color: "RED",
        radius: 40,
        homepoint: 2
      },
      {
        x: 350,
        y: 150,
        color: "WHITE",
        radius: 40,
        waypoint: 30
      },
      {
        x: 450,
        y: 150,
        color: "WHITE",
        radius: 40,
        waypoint: 31
      },
      {
        x: 550,
        y: 150,
        color: "WHITE",
        radius: 40,
        waypoint: 0
      },
      {
        x: 750,
        y: 150,
        color: "BLUE",
        radius: 40,
        homepoint: 2
      },
      {
        x: 850,
        y: 250,
        color: "BLUE",
        radius: 40,
        homepoint: 3
      },
      {
        x: 350,
        y: 250,
        color: "WHITE",
        radius: 40,
        waypoint: 29
      },
      {
        x: 450,
        y: 250,
        color: "BLUE",
        radius: 40,
        finishpoint: 1
      },
      {
        x: 550,
        y: 250,
        color: "WHITE",
        radius: 40,
        waypoint: 1
      },
      {
        x: 350,
        y: 350,
        color: "WHITE",
        radius: 40,
        waypoint: 28
      },
      {
        x: 450,
        y: 350,
        color: "BLUE",
        radius: 40,
        finishpoint: 2
      },
      {
        x: 550,
        y: 350,
        color: "WHITE",
        radius: 40,
        waypoint: 2
      },
      {
        x: 50,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 24
      },
      {
        x: 150,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 25
      },
      {
        x: 250,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 26
      },
      {
        x: 350,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 27
      },
      {
        x: 450,
        y: 450,
        color: "BLUE",
        radius: 40,
        finishpoint: 3
      },
      {
        x: 550,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 3
      },
      {
        x: 650,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 4
      },
      {
        x: 750,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 5
      },
      {
        x: 850,
        y: 450,
        color: "WHITE",
        radius: 40,
        waypoint: 6
      },
      {
        x: 50,
        y: 550,
        color: "WHITE",
        radius: 40,
        waypoint: 23
      },
      {
        x: 150,
        y: 550,
        color: "RED",
        radius: 40,
        finishpoint: 1
      },
      {
        x: 250,
        y: 550,
        color: "RED",
        radius: 40,
        finishpoint: 2
      },
      {
        x: 350,
        y: 550,
        color: "RED",
        radius: 40,
        finishpoint: 3
      },
      {
        x: 550,
        y: 550,
        color: "GREEN",
        radius: 40,
        finishpoint: 3
      },
      {
        x: 650,
        y: 550,
        color: "GREEN",
        radius: 40,
        finishpoint: 2
      },
      {
        x: 750,
        y: 550,
        color: "GREEN",
        radius: 40,
        finishpoint: 1
      },
      {
        x: 850,
        y: 550,
        color: "WHITE",
        radius: 40,
        waypoint: 7
      },
      {
        x: 50,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 22
      },
      {
        x: 150,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 21
      },
      {
        x: 250,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 20
      },
      {
        x: 350,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 19
      },
      {
        x: 450,
        y: 650,
        color: "YELLOW",
        radius: 40,
        finishpoint: 3
      },
      {
        x: 550,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 11
      },
      {
        x: 650,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 10
      },
      {
        x: 750,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 9
      },
      {
        x: 850,
        y: 650,
        color: "WHITE",
        radius: 40,
        waypoint: 8
      },
      {
        x: 350,
        y: 750,
        color: "WHITE",
        radius: 40,
        waypoint: 18
      },
      {
        x: 450,
        y: 750,
        color: "YELLOW",
        radius: 40,
        finishpoint: 2
      },
      {
        x: 550,
        y: 750,
        color: "WHITE",
        radius: 40,
        waypoint: 12
      },
      {
        x: 350,
        y: 850,
        color: "WHITE",
        radius: 40,
        waypoint: 17
      },
      {
        x: 450,
        y: 850,
        color: "YELLOW",
        radius: 40,
        finishpoint: 1
      },
      {
        x: 550,
        y: 850,
        color: "WHITE",
        radius: 40,
        waypoint: 13
      },
      {
        x: 50,
        y: 950,
        color: "YELLOW",
        radius: 40,
        homepoint: 3
      },
      {
        x: 50,
        y: 850,
        color: "YELLOW",
        radius: 40,
        homepoint: 2
      },
      {
        x: 350,
        y: 950,
        color: "WHITE",
        radius: 40,
        waypoint: 16
      },
      {
        x: 450,
        y: 950,
        color: "WHITE",
        radius: 40,
        waypoint: 15
      },
      {
        x: 550,
        y: 950,
        color: "WHITE",
        radius: 40,
        waypoint: 14
      },
      {
        x: 750,
        y: 950,
        color: "GREEN",
        radius: 40,
        homepoint: 2
      },
      {
        x: 850,
        y: 850,
        color: "GREEN",
        radius: 40,
        homepoint: 1
      },
      {
        x: 150,
        y: 950,
        color: "YELLOW",
        radius: 40,
        homepoint: 1
      },
      {
        x: 850,
        y: 950,
        color: "GREEN",
        radius: 40,
        homepoint: 3
      }
    ],
    game: {},
    ratio: 0.5
  }),
  // end data
  async created() {
    window.addEventListener("resize", this.resizeWindowEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeWindowEventHandler);
  },
  mounted() {
    this.start();
  },

  methods: {
    toLowerCaseStr(str) {
      try {
        return str.toLowerCase();
      } catch (e) {
        return "null";
      }
    },
    resizeWindowEventHandler(e) {
      this.create();
    },
    async start() {
      await this.loadGame();
      this.create();
      this.connectToSocketIo();
    },
    calculateWidth() {
      this.ratio = this.$refs.table.clientWidth / 900;
      console.log(this.ratio);
    },
    connectToSocketIo() {
      var socketurl = this.$baseurl + ":8082?gameId=";
      var socket = io.connect(socketurl + this.$route.query.gameId);
      var that = this;
      socket.on("action", function(data) {
        that.game = data;
        that.reloadAllToken(data);
        that.players = data.players;
        that.$eventBus.$emit("nofication", {
          message:
            "Current player is " +
            that.findCurrentPlayerByColor(data.currentPlayer).player.username +
            " (" +
            data.currentPlayer +
            ")"
        });
      });

      socket.on("startGame", function(data) {
        that.game = data;
        that.players = data.players;
        that.create();
        that.$eventBus.$emit("nofication", {
          message: "Start game!!!"
        });
      });

      socket.on("dice", function(data) {
        that.game = data;
        that.$eventBus.$emit("dice", data.diceValue);
        that.reloadAllToken(data);
        setTimeout(() => {
          that.$eventBus.$emit("nofication", {
            message: "Dice value " + data.diceValue
          });
        }, 1000);
      });

      socket.on("join", function(data) {
        that.game = data;
        that.$eventBus.$emit("nofication", {
          message:
            "New player join game " + that.game.players.at(-1).player.username
        });
      });
    },
    findCurrentPlayerByColor(color) {
      return this.game.players.find(e => e.color === color);
    },
    reloadAllToken(data) {
      var that = this;

      data.tokens.forEach(e => {
        that.jump(e);
      });
    },
    async loadGame() {
      try {
        var response = await PlayerService.loadGame({
          id: this.$route.query.gameId
        });
        this.game = response.data;
        this.$eventBus.$emit("dice", this.game.diceValue);
      } catch (e) {
        console.log(e);
      }
    },

    // on click own token
    async action(oToken) {
      try {
        var response = await PlayerService.action({
          id: oToken.id
        });
      } catch (e) {
        this.$eventBus.$emit("nofication", {
          message: "Error " + e.response.data,
          status: "error"
        });
      }
    },

    isGameEnded() {
      return this.game.status === "CLOSED";
    },

    // oToken must have id
    // oDestination must have color, fieldtype and fieldnumber
    jump(oToken) {
      var ratio = this.ratio;
      var gamefield = this.getGameField(
        oToken.color,
        oToken.fieldtype,
        oToken.fieldnumber
      );

      oToken.x = gamefield.x;
      oToken.y = gamefield.y;

      d3.select(".id" + oToken.id)
        .transition()
        .ease("back")
        .duration(500)
        .attr("transform", function(d) {
          return "translate(" + oToken.x * ratio + "," + oToken.y * ratio + ")";
        });
    },
    create() {
      this.calculateWidth();
      var svg = d3.selectAll("svg").remove();

      var ratio = this.ratio;

      var width = 900 * ratio,
        height = 1000 * ratio;

      var x = d3.scale.identity().domain([0, width]);

      var y = d3.scale.identity().domain([0, height]);

      var svg = d3
        .select("#table")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      var field = svg.append("g").attr("class", "field");

      var oGroupSelection = field
        .selectAll("circle")
        .data(this.aGameFields)
        .enter()
        .append("g")
        .attr("transform", function(d) {
          return "translate(" + d.x * ratio + "," + d.y * ratio + ")";
        });

      oGroupSelection
        .append("circle")
        .attr("r", function(d) {
          return d.radius * ratio;
        })
        .style("fill", function(d) {
          return d.color;
        })
        .style("stroke-width", d => {
          switch (d.waypoint) {
            case 0:
            case 8:
            case 16:
            case 24:
              return 6 * ratio;
              break;

            default:
              return 2 * ratio;
              break;
          }
        })
        .style("stroke", d => {
          switch (d.waypoint) {
            case 0:
              return "blue";
              break;
            case 8:
              return "green";
              break;
            case 16:
              return "yellow";
              break;
            case 24:
              return "red";
              break;

            default:
              return "grey";
              break;
          }
        });

      /*oGroupSelection
        .append("text")
        .attr("cx", 50)
        .attr("cy", 50)
        .text(function(d) {
          return d.waypoint || d.homepoint || d.finishpoint || 0;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", 20 * ratio + "px")
        .attr("fill", "grey")
        .style("text-anchor", "middle")
        .attr("dominant-baseline", "central");*/
      // ============= end create table =================
      var that = this;

      field
        .selectAll("token")
        .data(this.game.tokens)
        .enter()
        .append("g")
        .attr("class", function(d) {
          return "id" + d.id;
        })
        .attr("transform", function(d) {
          var gamefield = that.getGameField(
            d.color,
            d.fieldtype,
            d.fieldnumber
          );
          // console.log(gamefield);
          return (
            "translate(" + gamefield.x * ratio + "," + gamefield.y * ratio + ")"
          );
        })
        .on("click", function(d) {
          if (d.playerGame.player.username === that.$store.state.username) {
            $.proxy(that.action, that, d)();
          } else {
            that.$eventBus.$emit("nofication", {
              message: "Not your chess",
              status: "error"
            });
          }
        })
        .append("circle")
        .attr("x", 0)
        .attr("y", 0)
        .attr("r", 30 * ratio)
        .style("fill", function(d) {
          return d.playerGame.color;
        })
        .style("stroke-width", 5 * ratio)
        .style("stroke", "black")
        .select(function() {
          return this.parentNode;
        })
        .append("image")
        .attr("xlink:href", "https://freesvg.org/img/Chess-Knight.png")
        .attr("x", -50 * ratio)
        .attr("y", -80 * ratio)
        .attr("width", 100 * ratio)
        .attr("height", 100 * ratio);

      // append player circle
    },
    getGameField(color, fieldtype, fieldnumber) {
      var gamefield = null;

      this.aGameFields.forEach(e => {
        if (
          e[fieldtype.toLowerCase()] !== undefined &&
          e.color === color &&
          e[fieldtype.toLowerCase()] === fieldnumber
        ) {
          gamefield = e;
          return;
        }
      });
      return gamefield;
    }
  }
};
</script>

<style></style>
