import { api } from './axios'

export const fetchDailyRewardsRating = () =>
  api()
    .get('/v1/rewards/rating')
    .then(res => res.data)

export const getDailyRewardsRating = () =>
  api()
    .post('/v1/rewards/rating')
    .then(res => res.data)
