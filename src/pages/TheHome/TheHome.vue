<template>
  <div class="main">
    <w-profile-preview
      :user-name="userStore.userDetails?.userName || userStore.userDetails?.firstName"
      :balance="userStore.userBalance?.value"
      :user-position="userStore.userPosition?.position"
      :users-count="userStore.userPosition?.total"
    >
      <e-daily-reward
        :earn-value="dailyRewardsStore.dailyRewardsRating?.amount?.value"
        :daily-rewards-available="dailyRewardsStore.dailyRewardsRating?.available"
        :locked-until-time="dailyRewardsStore.dailyRewardsRating?.lockedUntil"
        :loader="isLoading"
        @getDailyRewards="getDailyRewards"
      />
    </w-profile-preview>
    <w-waitlist :tasks="tasksStore.tasks" />
    <a-button-link />
  </div>
</template>

<script setup lang="ts">
import WProfilePreview from '@/components/widgets/w-profile-preview/w-profile-preview.vue'
import EDailyReward from '@/components/entities/e-daily-reward/e-daily-reward.vue'
import WWaitlist from '@/components/widgets/w-waitlist/w-waitlist.vue'
import AButtonLink from '@/components/atoms/a-button-link/a-button-link.vue'

import { useUserStore } from '@stores/user'
import { useTasksStore } from '@stores/tasks'
import { useDailyRewardsStore } from '@stores/dailyRewards'

const userStore = useUserStore()
const tasksStore = useTasksStore()
const dailyRewardsStore = useDailyRewardsStore()

const isLoading = ref(false)

async function getDailyRewards() {
  try {
    isLoading.value = true
    await dailyRewardsStore.GET_DAILY_REWARDS()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

await Promise.all([
  userStore.FETCH_USER_DETAILS(),
  userStore.FETCH_USER_POSITION(),
  userStore.FETCH_USER_BALANCE(),
  tasksStore.FETCH_TASKS(),
  dailyRewardsStore.FETCH_DAILY_REWARDS_RATING(),
]),
  onUnmounted(() => {
    dailyRewardsStore.stopTimer()
  })
</script>

<style src="./TheHome.scss" lang="scss" />
