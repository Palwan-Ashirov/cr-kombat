import { fetchDailyRewardsRating, getDailyRewardsRating } from '@/services/dailyRewards'

export const useDailyRewardsStore = defineStore('dailyRewards', () => {
  const dailyRewardsRating = ref()

  async function FETCH_DAILY_REWARDS_RATING() {
    try {
      const res = await fetchDailyRewardsRating()
      dailyRewardsRating.value = res
    } catch (error) {
      console.error(error)
    }
  }

  const timer = ref()
  function stopTimer() {
    clearInterval(timer.value)
  }
  function startTimer() {
    timer.value = setInterval(() => {
      FETCH_DAILY_REWARDS_RATING()
    }, 5000)
  }
  async function GET_DAILY_REWARDS() {
    try {
      const res = await getDailyRewardsRating()
      stopTimer()
      await FETCH_DAILY_REWARDS_RATING()
    } catch (error) {
      console.error(error)
    }
  }
  return { dailyRewardsRating, FETCH_DAILY_REWARDS_RATING, startTimer, stopTimer, GET_DAILY_REWARDS }
})
