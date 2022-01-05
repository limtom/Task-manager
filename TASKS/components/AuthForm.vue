<template>
  <div class="d-flex">
    <v-card width="350" class="mx-auto" v-if="action === 'Login'">
      <v-card-title
        class="text-h5 pt-6 pb-6 justify-center font-weight-light d-flex flex-column"
      >
        <v-avatar class="mb-4">
          <img :src="require('../static/v.png')" alt="Logo image" />
        </v-avatar>
        Sign-In
      </v-card-title>
      <v-card-text class="pa-6 pb-0 pt-0">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            dense
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            class="mb-4"
            required
          ></v-text-field>
          <v-text-field
            outlined
            dense
            v-model="password"
            @click:append="show = !show"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            label="Password"
            required
            :type="show ? 'text' : 'password'"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 d-flex flex-column justify-center">
        <v-btn
          :disabled="!valid"
          outlined
          color="success"
          width="100"
          @click.prevent="submit"
          class="text-capitalize"
        >
          Login
        </v-btn>
        <p class="text-caption mt-4">
          Don't have an account <a @click="action = 'Sign-up'">Sign-up</a>
        </p>
      </v-card-actions>
    </v-card>
    <v-card width="350" class="mx-auto" v-else>
      <v-card-title
        class="text-h5 pt-6 pb-6 justify-center font-weight-light d-flex flex-column"
      >
        <v-avatar class="mb-4">
          <img :src="require('../static/v.png')" alt="Logo image" />
        </v-avatar>
        Sign-Up
      </v-card-title>
      <v-card-text class="pa-6 pb-0 pt-0">
        <v-form ref="form2" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            dense
            v-model="userName"
            :rules="userNameRules"
            label="User-name"
            class="mb-4"
            required
          ></v-text-field>
          <v-text-field
            outlined
            dense
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            class="mb-4"
            required
          ></v-text-field>
          <v-text-field
            outlined
            dense
            v-model="password"
            @click:append="show = !show"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            label="Password"
            required
            :type="show ? 'text' : 'password'"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 d-flex flex-column justify-center">
        <v-btn
          :disabled="!valid"
          outlined
          color="success"
          width="100"
          @click.prevent="submit2"
          class="text-capitalize"
        >
          Sign-up
        </v-btn>
        <p class="text-caption mt-4">
          Already have an account <a @click="action = 'Login'">Sign-in</a>
        </p>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: 'Login',
      valid: true,
      show: false,
      password: '',
      passwordRules: [
        (value) => !!value || 'Password is required',
        (value) =>
          (value && value.length >= 6) ||
          'password cannot be less than 6 characters',
      ],
      userName: '',
      userNameRules: [(value) => !!value || 'Username is required'],
      email: '',
      emailRules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      ],
      snackbar: false,
      text: '',
      color: '',
    }
  },
  methods: {
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          const userInput = {
            email: this.email,
            password: this.password,
          }
          const res = await this.$axios.$post('/auth/login', userInput, {
            withCredentials: true,
          })
          //Show the snackbar
          this.text = res.msg
          this.color = 'success'
          this.snackbar = true

          //Get user method
          this.getUser(res.data.accessToken)
        }
      } catch (error) {
        //Set up the snackbar
        this.text = error.response.data.msg
        this.color = 'error'
        this.snackbar = true
      }
    },
    async submit2() {
      try {
        if (this.$refs.form2.validate()) {
          const userInput = {
            userName: this.userName,
            email: this.email,
            password: this.password,
          }
          const res = await this.$axios.$post('/auth/register', userInput)
          //Show the snackbar
          this.text = res.msg
          this.color = 'success'
          this.snackbar = true
          //Log the user in authomatically
          const logInfo = await this.$axios.$post(
            '/auth/login',
            {
              email: userInput.email,
              password: userInput.password,
            },
            { withCredentials: true }
          )

          //Set the authorization header
          this.$axios.setToken(logInfo.data.accessToken, 'Bearer')

          //ckear thr form
          this.$refs.form2.reset()

          //change the page
          this.$router.push('/tasks')
        }
      } catch (error) {
        this.text = error.response.data.msg
        this.color = 'error'
        this.snackbar = true
      }
    },

    async getUser(accessToken) {
      try {
        const res = await this.$axios.$get('/auth/user', {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })

        const { updated_at, created_at, ...user } = res.msg

        // @TODO:Set the user details on the store
        this.$store.dispatch('setAccessToken', accessToken)
        this.$store.dispatch('setUser', { isLoggedIn: true, user })

        //Redirect to the route page
        this.$router.push('/tasks')
      } catch (error) {
        this.text = 'Error trying to login'
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
