<template>
  <div>
    <v-card width="450" class="mx-auto">
      <v-card-title
        class="text-h5 pt-6 pb-6 justify-center font-weight-light d-flex flex-column black--text text--darken-4"
      >
        Edit Task
      </v-card-title>
      <v-card-text class="pa-6 pb-0 pt-0">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="d-flex flex-column"
        >
          <v-row dense>
            <v-col cols="12" sm="3" md="3">
              <v-list-item-content class="black--text text--darken-4"
                >Task ID</v-list-item-content
              >
              <v-list-item-content class="black--text text--darken-4"
                >Name</v-list-item-content
              >
              <v-list-item-content class="black--text text--darken-4"
                >Completed</v-list-item-content
              >
            </v-col>
            <v-col cols="12" sm="9" md="9">
              <v-list-item-content class="black--text text--darken-4">{{
                getTaskToEdit.task_id
              }}</v-list-item-content>
              <v-list-item-content class="pa-0 black--text text--darken-4"
                ><v-text-field
                  filled
                  outlined
                  dense
                  disabled
                  v-model="getTaskToEdit.name"
                  :rules="taskRules"
                  placeholder="e.g. wash dishes"
                  required
                  hide-details
                ></v-text-field
              ></v-list-item-content>
              <v-list-item-content class="black--text text--darken-4">
                <v-checkbox
                  dense
                  hide-details
                  class="ma-0"
                  :value="getTaskToEdit.completed"
                  @change="editTask($event)"
                ></v-checkbox
              ></v-list-item-content>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="">
        <v-btn
          dark
          color="purple darken-4"
          @click.prevent="submitEdit"
          height="40"
          width="100"
          class="font-weight-light"
          block
        >
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-container class="">
      <v-row>
        <v-col justify="center" align="center">
          <v-btn
            dark
            color=""
            class="ma-12 text-capitalize font-weight-light"
            width="150"
            nuxt
            to="/tasks"
            >Back To Tasks</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
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
export default {
  data() {
    return {
      valid: true,
      task: '',
      completed: '',
      taskRules: [(value) => !!value || 'Task field is required'],
      snackbar: false,
      text: '',
      color: '',
    }
  },
  methods: {
    async submitEdit() {
      try {
        const res = await this.$axios.$patch(
          `/tasks/${this.getTaskToEdit.task_id}`,
          { completed: this.getTaskToEdit.completed },
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
        this.$store.dispatch('updateTasks')
      } catch (error) {
        this.color = 'error'
        this.text = error.response.data.msg
        this.snackbar = true
      }
    },
    editTask(event) {
      //Dispatch an action to edit the task
      this.$store.dispatch('editTaskToEdit', event)
      // !!event == true
      //   ? this.$store.dispatch('editTaskToEdit', event)
      //   : this.$store.dispatch('editTaskToEdit', false)
      console.log(event)
    },
  },
  computed: {
    ...mapGetters(['getTaskToEdit']),
    ...mapState(['accessToken']),
  },
}
</script>

<style lang="css" scoped></style>
