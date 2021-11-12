<template>
  <div>
    <Navigation />
    <Header />
    <v-main>
      <v-container fluid fill-height rounded-lg>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md8>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Change Password</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="lock"
                    name="oldPassword"
                    label="oldPassword"
                    type="text"
                    v-model="oldPassword"
                    required
                    v-on:keyup.enter.exact="submit"
                    :error-messages="oldPasswordErrors"
                    @input="$v.oldPassword.$touch()"
                    @blur="$v.oldPassword.$touch()"
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
                  <v-text-field
                    id="confirmPassword"
                    prepend-icon="lock"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    v-model="confirmPassword"
                    required
                    v-on:keyup.enter.exact="submit"
                    :error-messages="confirmPasswordErrors"
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="submit">Submit</v-btn>
              </v-card-actions>
            </v-card>
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
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    oldPassword: {
      required,
      maxLength: maxLength(20),
      minLength: minLength(5)
    },
    password: { required, maxLength: maxLength(20), minLength: minLength(5) },
    confirmPassword: { sameAsPassword: sameAs("password") }
  },
  components: {
    Footer: Footer,
    Header: Header,
    Navigation: Navigation
  },
  computed: {
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.required && errors.push("oldPassword is required");
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
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Confirm Password must be same as password.");
      return errors;
    }
  },
  data: () => ({
    valid: false,
    oldPassword: "",
    password: "",
    confirmPassword: ""
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
      this.oldPassword = "";
      this.password = "";
      this.confirmPassword = "";
    },
    async login() {
      PlayerService.changePassword({
        oldPassword: this.oldPassword,
        password: this.password
      })
        .then(response => {
          this.$eventBus.$emit("nofication", {
            message: "Change password successful!!!"
          });
          this.clear();
          this.$router.push({
            name: "account"
          });
        })
        .catch(error => {
          this.$eventBus.$emit("nofication", {
            message: error.response.data,
            status: "error"
          });
        });
    }
  }
};
</script>
