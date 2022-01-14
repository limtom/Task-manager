<template>
  <div>
    <v-card width="450" class="mx-auto">
      <v-card-title
        class="text-h5 pt-6 pb-6 justify-center font-weight-light d-flex flex-column black--text"
      >
        Task Manager
      </v-card-title>
      <v-card-text class="pa-3 pa-sm-6 pb-0 pt-0">
        <v-form ref="form" v-model="valid" lazy-validation class="d-flex">
          <v-text-field
            filled
            outlined
            dense
            v-model="task"
            :rules="taskRules"
            label="Task"
            placeholder="e.g. wash dishes"
            class="rounded-r-0 rounded-l-lg"
            required
          ></v-text-field>
          <v-card-actions class="pa-0 align-start">
            <v-btn
              dark
              color="purple darken-4"
              @click="addTask"
              height="40"
              width="100"
              class="rounded-l-0 rounded-r-lg text-capitalize font-weight-light"
            >
              Add-Task
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-container class="pa-2 text-center">
      <v-row class="d-flex flex-column" align="center" justify="center">
        <template v-for="(task, i) in paginatedTasks.data">
          <v-col :key="i" cols="12" sm="12" md="12">
            <v-hover v-slot="{ hover }">
              <v-card
                height="60"
                width="450"
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                class="pl-0 pr-0 mx-auto task-card"
              >
                <v-card-title
                  class="text-h6 text-subtitle-1 font-weight-light mx-auto"
                >
                  <v-icon
                    color="green"
                    small
                    v-if="!task.completed"
                    class="mr-5"
                    >mdi-checkbox-blank-outline</v-icon
                  >

                  <v-icon color="green" small v-else class="mr-5"
                    >mdi-checkbox-marked</v-icon
                  >
                  {{ task.name }}
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    nuxt
                    :to="`tasks/${task.task_id}`"
                    icon
                    class="mr-2"
                  >
                    <v-icon
                      color="green darken-4"
                      small
                      @click.prevent="edit(task.task_id)"
                      >mdi-pencil</v-icon
                    ></v-btn
                  >
                  <v-btn small nuxt icon class="mr-sm-2">
                    <v-icon
                      color="red darken-4"
                      small
                      @click.prevent="deleteTask(task.task_id)"
                      >mdi-delete</v-icon
                    >
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <v-pagination
      :length="paginatedTasks.totalPages"
      v-model="paginatedTasks.page"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      @input="handlePageChange"
    ></v-pagination>
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
import { mapGetters, mapState } from 'vuex'
import { paginator } from '../assets/utils/utils'
export default {
  name: 'createTask',
  data() {
    return {
      valid: true,
      task: '',
      taskRules: [(value) => !!value || 'Task field is required'],
      snackbar: false,
      text: '',
      color: '',
      paginatedTasks: [],
    }
  },
  methods: {
    async addTask() {
      try {
        if (this.$refs.form.validate()) {
          const res = await this.$axios.$post(
            '/tasks',
            { name: this.task, completed: false },
            {
              withCredentials: true,
              headers: {
                authorization: `Bearer ${this.accessToken}`,
              },
            }
          )
          this.color = 'success'
          this.text = res.msg
          this.snackbar = true
          // Update the task by dispatching an action
          await this.$store.dispatch('updateTasks')

          this.$refs.form.reset()
        }
      } catch (error) {
        this.color = 'error'
        this.text = error.response.data.msg
        this.snackbar = true
      }
    },
    //Edit a task
    edit(task_id) {
      this.$store.dispatch('setTaskToEdit', task_id)
      this.$router.push(`tasks/${task_id}`)
    },

    //Delete a task
    async deleteTask(task_id) {
      try {
        const res = await this.$axios.$delete(`/tasks/${task_id}`, {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${this.accessToken}`,
          },
        })
        this.color = 'success'
        this.text = res.msg
        this.snackbar = true
        // Update the task by dispatching an action
        this.$store.dispatch('updateTasks')
      } catch (error) {
        this.color = 'error'
        this.text = error.response.data.msg
        this.snackbar = true
      }
    },

    //Handle page change
    handlePageChange(value) {
      this.paginatedTasks = paginator(this.tasks, value, 4)
    },
  },
  computed: {
    ...mapState(['tasks', 'accessToken']),
  },

  mounted() {
    this.paginatedTasks = paginator(this.tasks, 1, 4)
  },
}
</script>
<style lang="css" scoped>
.task-card {
  transition: opacity 0.4s ease-in-out;
}

.task-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
