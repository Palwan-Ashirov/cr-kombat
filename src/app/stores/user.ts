import { getUserDetails, getUserPosition, getUserBalance } from '@/services/user'

export const useUserStore = defineStore('user', () => {
  const userDetails = ref()

  async function FETCH_USER_DETAILS() {
    try {
      const response = await getUserDetails()
      userDetails.value = response
    } catch (error) {
      console.error(error)
    }
  }

  const userPosition = ref()

  async function FETCH_USER_POSITION() {
    try {
      const response = await getUserPosition()
      userPosition.value = response
    } catch (error) {
      console.error(error)
    }
  }

  const userBalance = ref()

  async function FETCH_USER_BALANCE() {
    try {
      const response = await getUserBalance()
      userBalance.value = response
    } catch (error) {
      console.error(error)
    }
  }
  return { userDetails, FETCH_USER_DETAILS, userPosition, FETCH_USER_POSITION, userBalance, FETCH_USER_BALANCE }
})
