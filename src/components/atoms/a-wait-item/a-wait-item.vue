<template>
  <a href="#" class="wait-list__item">
    <div class="wait-list__icon">
      <img :src="task.imageUrl" alt="list" />
    </div>
    <div class="wait-list__info">
      <div class="wait-list__title">{{ task.title }}</div>
      <div class="wait-list__earn">
        <div class="wait-list__earn-icon">
          <IconCoin filled />
        </div>
        <p>{{ task.reward?.value }}</p>
      </div>
    </div>
    <div class="wait-list__append-icon">
      <IconArrow v-if="!task.completed" filled />
      <IconChecked v-else filled />
    </div>
  </a>
</template>

<script setup lang="ts">
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'
import IconArrow from '@/app/assets/icons/actions/icon-arrow.svg'
import IconChecked from '@/app/assets/icons/actions/icon-checked.svg'

interface Props {
  task: any
}

withDefaults(defineProps<Props>(), {})
</script>

<style src="./a-wait-item.scss" lang="scss"></style>
