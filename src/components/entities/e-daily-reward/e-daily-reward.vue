<template>
  <div class="w-daily-reward-info__user">
    <div class="w-daily-reward-info__info">
      <IconInfo filled />
    </div>
    <div class="w-daily-reward-info__user-earn">
      <p>You earn</p>
      <div class="w-daily-reward-info__user-earn-count">
        <IconCoin filled />
        <p>{{ localedEarnValue }}</p>
      </div>
    </div>
    <div class="w-daily-reward-info__title">for 1 people after you</div>
    <button
      class="w-daily-reward-info__daily-revard"
      :disabled="!dailyRewardsAvailable"
      @click="$emit('getDailyRewards')"
    >
      <p v-if="dailyRewardsAvailable">Get Daily reward</p>
      <p v-else>Before opening {{ localedLockedUntilTime }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import IconInfo from '@/app/assets/icons/actions/icon-info.svg'
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'
import { useGetDifferenceByUntilLockedTime } from '@composables/useDate.js'
import { useNumberWithSpaces } from '@composables/useDigit.js'

interface Props {
  earnValue: number
  dailyRewardsAvailable: boolean
  lockedUntilTime: string
}

const props = withDefaults(defineProps<Props>(), { dailyRewardsAvailable: true })

defineEmits(['getDailyRewards'])
const localedLockedUntilTime = ref('')

onMounted(() => {
  localedLockedUntilTime.value = useGetDifferenceByUntilLockedTime()
})
const localedEarnValue = computed(() => useNumberWithSpaces(props.earnValue))
</script>

<style src="./e-daily-reward.scss" lang="scss" scoped />
