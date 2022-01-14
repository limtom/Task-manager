<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <task-edit />
    </v-col>
  </v-row>
</template>

<script>
import TaskEdit from '~/components/TaskEdit.vue'

export default {
  components: {
    TaskEdit,
  },
  head() {
    return {
      title: 'TASK EDIT',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Task preview and edit task page' },
      ],
    }
  },
  layout: 'tasks',
  middleware:'auth'
}
</script>
