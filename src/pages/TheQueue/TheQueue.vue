<template>
  <div>Queue Page</div>
  <p v-text="telegramToken"></p>
</template>

<script setup lang="ts">
const telegramToken = computed(() => Telegram?.WebView.initParams.tgWebAppData || 'empty')
</script>

<style scoped></style>
