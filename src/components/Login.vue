<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="username"
              label="Username"
              type="text"
              v-model="username"
              required
              v-on:keyup.enter.exact="submit"
              :error-messages="usernameErrors"
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
              required
              v-on:keyup.enter.exact="submit"
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <a href="/forgot-password">Forgot password?</a>
          <v-spacer />
          <v-btn color="primary" :to="{ name: 'signup' }">Sign Up</v-btn>
          <v-btn color="green" @click="submit" class="white--text">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    
    username: { required, email },
    password: { required, maxLength: maxLength(20), minLength: minLength(5) }
  },
  computed: {
    
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.email && errors.push("Must be valid Username/e-mail");
      !this.$v.username.required && errors.push("Username/E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 20 characters long");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  data: () => ({
    valid: false,
    username: "",
    password: ""
  }),
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.login();
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
    login() {
      AuthenticationService.login({
        username: this.username,
        password: this.password
      })
        .then(response => {
          this.$store.dispatch("setToken", "Bearer " + response.data.token);
          this.$store.dispatch("setUsername", response.data.username);
          this.$store.dispatch("setUserLogin", true);

          // console.log(this.$store.state.token);
          // console.log(this.$store.state.isUserLoggedIn);
          // console.log(this.$store.state.username);

          this.$router.push({
            name: "game"
          });
        })
        .catch(error => {
          this.$eventBus.$emit("nofication", {
            message: "Username or password incorrect!!!",
            status: "error"
          });
        });
    }
  }
};
</script>
