<template>
  <v-container fluid fill-height rounded-lg>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <v-parallax
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-parallax>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="text-h2">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-card>
    <v-toolbar
      color="pink"
      dark
      dense
      flat
    >
      <v-toolbar-title class="text-body-2">
        Upcoming Changes
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon
        large
        @click="next"
      >
        mdi-chevron-right
      </v-icon>
    </v-card-actions>
  </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
    methods:{
      next(){

      }
    }
  }
</script>
