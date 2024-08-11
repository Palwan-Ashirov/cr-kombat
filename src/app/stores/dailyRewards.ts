import { fetchDailyRewardsRating, getDailyRewardsRating } from '@/services/dailyRewards'
import { useUserStore } from './user'

export const useDailyRewardsStore = defineStore('dailyRewards', () => {
  const userStore = useUserStore()

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
      await getDailyRewardsRating()
      stopTimer()
      startTimer()
      await userStore.FETCH_USER_BALANCE()
    } catch (error) {
      console.error(error)
    }
  }
  return { dailyRewardsRating, FETCH_DAILY_REWARDS_RATING, startTimer, stopTimer, GET_DAILY_REWARDS }
})
