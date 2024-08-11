<template>
  <div class="w-daily-reward-info__user">
    <div class="w-daily-reward-info__info">
      <IconInfo filled />
    </div>
    <div class="w-daily-reward-info__user-earn">
      <p>You earn</p>
      <div class="w-daily-reward-info__user-earn-count">
        <IconCoin filled />
        <p>{{ earnValue }}</p>
      </div>
    </div>
    <div class="w-daily-reward-info__title">for 1 people after you</div>
    <button
      class="w-daily-reward-info__daily-revard"
      :disabled="!dailyRewardsAvailable"
      @click="$emit('getDailyRewards')"
    >
      <p v-if="dailyRewardsAvailable">Get Daily reward</p>
      <p v-else>{{ localedLockedUntilTime }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import IconInfo from '@/app/assets/icons/actions/icon-info.svg'
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'
import { useDayjs } from '#dayjs'

interface Props {
  earnValue: number
  dailyRewardsAvailable: boolean
  lockedUntilTime: string
}

withDefaults(defineProps<Props>(), { dailyRewardsAvailable: true })

defineEmits(['getDailyRewards'])

const localedLockedUntilTime = ref('')

function getDifferenceByUntilTime() {
  const dayjs = useDayjs()

  const targetDate = dayjs('2024-08-12T00:00:00+04:00')

  const updateDifference = () => {
    const now = dayjs()
    const diff = targetDate.diff(now)
    localedLockedUntilTime.value = dayjs.utc(diff).format('HH:mm:ss')
  }

  updateDifference()
  const interval = setInterval(updateDifference, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })
}

onMounted(() => {
  getDifferenceByUntilTime()
})
</script>

<style src="./e-daily-reward.scss" lang="scss" scoped />
