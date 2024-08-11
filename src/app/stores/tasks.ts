import { getTasks } from '@/services/tasks'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])

  async function FETCH_TASKS() {
    try {
      const res = await getTasks()
      tasks.value = res
    } catch (error) {
      console.error(error)
    }
  }

  return { tasks, FETCH_TASKS }
})
