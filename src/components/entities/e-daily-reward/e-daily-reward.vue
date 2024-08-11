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
      <p>Get Daily reward</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import IconInfo from '@/app/assets/icons/actions/icon-info.svg'
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'

interface Props {
  earnValue: number
  dailyRewardsAvailable: boolean
}

withDefaults(defineProps<Props>(), { dailyRewardsAvailable: true })

defineEmits(['getDailyRewards'])
</script>

<style src="./e-daily-reward.scss" lang="scss" scoped />
