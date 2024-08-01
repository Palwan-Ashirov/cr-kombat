<template>
  <a href="#" class="wait-list__item">
    <div class="wait-list__icon">
      <!-- <img src="/images/list-2.png" alt="list" /> -->
    </div>
    <div class="wait-list__info">
      <div class="wait-list__title">Invite your friends</div>
      <div class="wait-list__earn">
        <div class="wait-list__earn-icon">
          <IconCoin filled />
        </div>
        <p>25 000</p>
      </div>
    </div>
    <div class="wait-list__append-icon">
      <IconArrow filled />
    </div>
  </a>
</template>

<script setup lang="ts">
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'
import IconArrow from '@/app/assets/icons/actions/icon-arrow.svg'
import IconChecked from '@/app/assets/icons/actions/icon-checked.svg'
</script>

<style src="./a-wait-item.scss" lang="scss"></style>
