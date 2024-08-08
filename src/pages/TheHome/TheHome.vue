<template>
  <div class="main">
    <w-profile-preview>
      <e-daily-reward />
    </w-profile-preview>
    <div class="main__wait-list">
      <div class="wait-list">
        <h3 class="wait-list__name">Get up in the wait list</h3>
        <div class="wait-list__items">
          <a-wait-item v-for="index in 3" />
        </div>
      </div>
    </div>
    <a-button-link />
  </div>
</template>

<script setup lang="ts">
import WProfilePreview from '@/components/widgets/w-profile-preview/w-profile-preview.vue'
import EDailyReward from '@/components/entities/e-daily-reward/e-daily-reward.vue'
import AWaitItem from '@/components/atoms/a-wait-item/a-wait-item.vue'
import AButtonLink from '@/components/atoms/a-button-link/a-button-link.vue'
import { useUserStore } from '@stores/user'

const userStore = useUserStore()

Promise.all([userStore.FETCH_USER_DETAILS(), userStore.FETCH_USER_POSITION(), userStore.FETCH_USER_BALANCE()])
</script>

<style src="./TheHome.scss" lang="scss" />
