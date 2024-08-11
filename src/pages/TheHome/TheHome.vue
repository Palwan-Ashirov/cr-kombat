<template>
  <div class="main">
    <w-profile-preview
      :user-name="userStore.userDetails?.userName"
      :balance="userStore.userBalance?.value"
      :user-position="userStore.userPosition?.position"
      :users-count="userStore.userPosition?.total"
    >
      <e-daily-reward
        :earnValue="dailyRewardsStore.dailyRewardsRating?.amount?.value"
        :dailyRewardsAvailable="dailyRewardsStore.dailyRewardsRating?.available"
        @getDailyRewards="dailyRewardsStore.GET_DAILY_REWARDS"
      />
    </w-profile-preview>
    <w-waitlist :tasks="tasksStore.tasks" />
    <a-button-link />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'

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

useAsyncData(() =>
  Promise.all([
    userStore.FETCH_USER_DETAILS(),
    userStore.FETCH_USER_POSITION(),
    userStore.FETCH_USER_BALANCE(),
    tasksStore.FETCH_TASKS(),
    dailyRewardsStore.FETCH_DAILY_REWARDS_RATING(),
  ]),
)

onMounted(() => {
  dailyRewardsStore.startTimer()
})
onUnmounted(() => {
  dailyRewardsStore.stopTimer()
})
</script>

<style src="./TheHome.scss" lang="scss" />
