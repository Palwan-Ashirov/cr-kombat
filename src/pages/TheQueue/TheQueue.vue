<template>
  <div>Queue Page</div>
  <p v-text="telegramToken"></p>
  <p v-text="userStore.userDetails"></p>
</template>

<script setup lang="ts">
import { useUserStore } from '../../app/stores/user'
const telegramToken = computed(() => Telegram?.WebView.initParams.tgWebAppData || 'empty')

const userStore = useUserStore()
</script>

<style scoped></style>
