/**
 * Store logic
 */

//State
export const state = () => ({
  accessToken: '',
  user: '',
  tasks: [],
  taskToEdit: {},
})

//Getters
export const getters = {
  getUser(state) {
    return state.user
  },

  getUserTasks(state) {
    return state.tasks
  },

  getTaskToEdit(state) {
    return state.taskToEdit
  },
}

//Mutations
export const mutations = {
  SET_ACCESS_TOKEN(state, payload) {
    state.accessToken = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },

  SET_TASKS(state, payload) {
    state.tasks = payload
  },

  SET_TASK_TO_EDIT(state, payload) {
    //filter the tasks array
    const taskSelected = state.tasks.find((task) => {
      return task.task_id === payload
    })
    state.taskToEdit = taskSelected
  },

  //Edit the task
  EDIT_TASK_TO_EDIT(state, payload) {
    //edit the value of the completed property of the task to edit
    state.taskToEdit.completed = payload
  },

  //Reset the store
  RESET_STORE(state) {
    state.user = ''
    state.accessToken = ''
    ;(state.tasks = []), (state.taskToEdit = {})
  },
}

//Actions
export const actions = {
  //Set the user
  async setUser({ commit, state }, payload) {
    try {
      //All tasks that belongs to that user
      const tasks = await this.$axios.$get('/tasks', {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${state.accessToken}`,
        },
      })
      commit('SET_USER', payload)
      commit('SET_TASKS', tasks.data)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  },

  //Set accesstoken
  setAccessToken({ commit }, payload) {
    commit('SET_ACCESS_TOKEN', payload)
  },

  //Edit task
  setTaskToEdit({ commit }, payload) {
    commit('SET_TASK_TO_EDIT', payload)
  },

  //Reset tasks
  async updateTasks({ commit, state }) {
    try {
      //All tasks that belongs to that user
      const tasks = await this.$axios.$get('/tasks', {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${state.accessToken}`,
        },
      })
      commit('SET_TASKS', tasks.data)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  },

  //Edit task to edit
  editTaskToEdit({ commit }, payload) {
    commit('EDIT_TASK_TO_EDIT', payload)
  },

  //Reset store
  resetStore({ commit }) {
    commit('RESET_STORE')
  },
}
