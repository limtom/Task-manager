<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="pa-1">
      <create-task />
    </v-col>
  </v-row>
</template>

<script>
import CreateTask from '~/components/CreateTask.vue'

export default {
  name:'Create-Task',
  middleware:'auth',
  components: {
    CreateTask,
  },
  head() {
    return {
      title: 'CREATE TASK',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tasks and task creation page' },
      ],
    }
  },
  layout: 'tasks',
}
</script>
