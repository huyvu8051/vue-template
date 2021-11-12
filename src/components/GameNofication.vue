<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
    :top="true"
    :multi-line="true"
  >
    <v-layout align-center pr-4>
      <v-icon class="pr-3" dark large>{{icon}}</v-icon>
      <v-layout column>
        <div>
          <strong>{{message}}</strong>
        </div>
      </v-layout>
    </v-layout>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      message: "",
      timeout: 5000,
      color: "success",
      icon: "check_circle"
    };
  },
  created() {
    this.$eventBus.$on("nofication", data => {
      this.message = data.message;
      this.snackbar = true;

      switch (data.status) {
        case "error":
          this.color = "red";
          this.icon = "error";
          break;
        case "warning":
          this.color = "yellow";
          this.icon = "warning";
          break;
        default:
          this.color = "success";
          this.icon = "check_circle";
          break;
      }
    });
  }
};
</script>

<style>
</style>