<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <auth-form />
    </v-col>
  </v-row>
</template>

<script>
import AuthForm from '../components/AuthForm.vue'

export default {
  name: 'Main-page',
  components: {
    AuthForm,
  },
  head() {
    return {
      title: 'A TASK MANAGER APPLICATION',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Authentication form' },
      ],
    }
  },
}
</script>
