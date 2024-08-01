<template>
  <div class="main__preview">
    <section class="preview">
      <div class="preview__header">
        <div class="preview-header">
          <div class="preview-header__title">Hi, Michael</div>
          <div class="preview-header__coins">
            <IconCoin filled />
            <p>100</p>
          </div>
        </div>
      </div>
      <div class="preview__background">
        <div class="preview__background-blur-white"></div>
        <div class="preview__background-blur-mini"></div>
        <div class="preview__background-blur-big"></div>
      </div>
      <div class="preview__info">
        <article class="preview-info">
          <div class="preview-info__wrapper">
            <div class="preview-info__users">
              <div class="preview-info__users-title">Your position</div>
              <div class="preview-info__users-position">11 451</div>
              <div class="preview-info__users-count">of 1452 users</div>
            </div>
            <div class="preview-info__image">
              <img src="@/app/assets/images/fox.png" alt="fox" />
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
</script>

<style src="./w-profile-preview.scss" lang="scss" scoped></style>
