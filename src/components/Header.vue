<template>
  <v-app-bar app flat hide-on-scroll>
    <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
      <span>Pacheesi</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <AccountPanel />
    
  </v-app-bar>
</template>

<script>

import AccountPanel from "@/components/AccountPanel";
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
  }),
  components: {
 
    AccountPanel: AccountPanel
  },
  methods: {
    drawer() {
      this.$eventBus.$emit("drawer");
    }
  }
};
</script>

<style></style>
