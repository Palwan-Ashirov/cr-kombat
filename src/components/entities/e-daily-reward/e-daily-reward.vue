<template>
  <div class="w-daily-reward-info__user">
    <div class="w-daily-reward-info__info">
      <IconInfo filled />
    </div>
    <div class="w-daily-reward-info__user-earn">
      <p>Get</p>
      <div class="w-daily-reward-info__user-earn-count">
        <IconCoin filled />
        <p>{{ localedEarnValue }}</p>
      </div>
    </div>
    <div class="w-daily-reward-info__title">for those 12 players after you</div>
    <button
      class="w-daily-reward-info__daily-revard"
      :disabled="!dailyRewardsAvailable || loader"
      @click="$emit('getDailyRewards')"
    >
      <p v-if="loader" class="loader"><IconLoader filled /></p>
      <p v-else-if="dailyRewardsAvailable">Get Daily reward</p>
      <p v-else>Before opening {{ untilTime.localedLockedUntilTime }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import IconInfo from '@/app/assets/icons/actions/icon-info.svg'
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'
import IconLoader from '@/app/assets/icons/actions/icon-loader.svg'

import { useGetDifferenceByUntilLockedTime } from '@composables/useDate.js'
import { useNumberWithSpaces } from '@composables/useDigit.js'

interface Props {
  earnValue: number
  dailyRewardsAvailable: boolean
  lockedUntilTime: string | null
  loader?: boolean
}

const props = withDefaults(defineProps<Props>(), { dailyRewardsAvailable: true, loader: false })

defineEmits(['getDailyRewards'])

const untilTime = computed(() => {
  const { localedLockedUntilTime, clear } = useGetDifferenceByUntilLockedTime(props.lockedUntilTime)
  return { localedLockedUntilTime, clear }
})

const localedEarnValue = computed(() => useNumberWithSpaces(props.earnValue))

onUnmounted(() => {
  untilTime.value.clear()
})
</script>

<style src="./e-daily-reward.scss" lang="scss" scoped />
