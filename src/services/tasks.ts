import { api } from './axios'

export const getTasks = () =>
  api()
    .get('v1/tasks')
    .then(res => res.data)

export const getTaskDetails = (taskId: number) =>
  api()
    .get(`v1/tasks/${taskId}`)
    .then(res => res.data)
