import { api } from './axios'

export const getUserDetails = () =>
  api()
    .get('v1/users/me')
    .then(res => res.data)

export const getUserPosition = () =>
  api()
    .get('v1/users/me/position')
    .then(res => res.data)

export const getUserBalance = () =>
  api()
    .get('v1/users/me/balance')
    .then(res => res.data)
