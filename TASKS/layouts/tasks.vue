<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 text-center">
            <v-avatar>
              <img :src="require('../static/v.png')" alt="App logo" />
            </v-avatar>
          </v-list-item-title>
          <v-list-item-title
            class="text-center font-weight-thin text--darken-4"
          >
            Task Manager
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item>
          <v-list-item-title class="d-flex">
            <v-avatar size="36" color="primary" v-if="user !== ''">
              {{
                (
                  user.user.user_name.split('')[0] +
                  user.user.user_name.split('')[1]
                ).toUpperCase()
              }}
            </v-avatar>
            <p class="text-h6 mx-auto" v-if="user !== ''">
              {{ user.user.user_name }}
            </p>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 text-capitalize">
          <v-btn block outlined elevation="0" @click.prevent="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app fixed elevation="1">
      <v-avatar>
        <img :src="require('../static/v.png')" alt="App logo" />
      </v-avatar>

      <v-toolbar-title class="container">Task Manager</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-avatar
        size="36"
        color="primary"
        class="mr-3 hidden-xs-and-down hidden-xs-only"
        v-if="user !== ''"
      >
        {{
          (
            user.user.user_name.split('')[0] + user.user.user_name.split('')[1]
          ).toUpperCase()
        }}
      </v-avatar>
      <v-btn
        class="mr-8 user-name text-capitalize hidden-xs-and-down hidden-xs-only"
        text
        depressed
        v-if="user !== ''"
      >
        {{ user.user.user_name }}
      </v-btn>

      <v-btn
        class="text-capitalize hidden-xs-and-down hidden-xs-only"
        outlined
        elevation="0"
        @click.prevent="logout"
      >
        Logout
      </v-btn>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'task',
  data() {
    return {
      userName: '',
      userAbr: '',
      drawer: false,
    }
  },
  methods: {
    async logout() {
      try {
        const res = await this.$axios.$post('/auth/logout', {
          withCredentials: true,
        })
        if (res.msg === 'User logged out') {
          this.$router.push('/')
          //Clear the store
          this.$store.dispatch('resetStore')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>
<style scoped>
.user-name {
  pointer-events: none;
}
</style>
