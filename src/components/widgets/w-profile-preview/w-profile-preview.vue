<template>
  <div class="main__preview">
    <section class="preview">
      <div class="preview__header">
        <div class="preview-header">
          <div class="preview-header__title">Hi, {{ userName }}</div>
          <div class="preview-header__coins">
            <IconCoin filled />
            <p v-text="localedBalance"></p>
          </div>
        </div>
      </div>
      <div class="preview__background">
        <div class="preview__background-blur-big"></div>
      </div>
      <div class="preview__info">
        <article class="preview-info">
          <div class="preview-info__wrapper">
            <div class="preview-info__users">
              <div class="preview-info__users-title">You're ranked</div>
              <div class="preview-info__users-position" :style="`font-size: ${userPositionFontSize}px`">
                {{ localedUserPosition }}
              </div>
              <div class="preview-info__users-count">out of {{ localedUsersCount }} players</div>
            </div>
            <div class="preview-info__image">
              <img src="@/app/assets/images/fox-2.png" alt="fox" />
            </div>
            <slot />
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import IconCoin from '@/app/assets/icons/contents/icon-coin.svg'
import { useNumberWithSpaces } from '@composables/useDigit.js'

interface Props {
  userName: string
  balance: number
  userPosition: number
  usersCount: number
}

const props = withDefaults(defineProps<Props>(), { userName: '' })

const localedBalance = computed(() => useNumberWithSpaces(props.balance))
const localedUserPosition = computed(() => useNumberWithSpaces(props.userPosition))
const localedUsersCount = computed(() => useNumberWithSpaces(props.usersCount))

const userPositionFontSize = computed(() => {
  const userPositionLength = String(props.userPosition).length
  if (userPositionLength < 6) {
    return 54
  } else if (userPositionLength < 8) {
    return 36
  } else {
    return 32
  }
})
</script>

<style src="./w-profile-preview.scss" lang="scss" scoped></style>
