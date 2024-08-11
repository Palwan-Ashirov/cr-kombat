<template>
  <div class="main__wait-list">
    <div class="wait-list">
      <h3 class="wait-list__name">Boost the rank</h3>
      <div class="wait-list__items">
        <a-wait-item v-for="task in tasks" :key="task.id" :task />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AWaitItem from '@/components/atoms/a-wait-item/a-wait-item.vue'

interface Props {
  tasks: any[]
}

withDefaults(defineProps<Props>(), {})
</script>

<style src="./w-waitlist.scss" scoped></style>
