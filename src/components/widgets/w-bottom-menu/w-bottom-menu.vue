<template>
  <footer class="w-bottom-menu">
    <nav class="w-bottom-menu__nav">
      <nuxt-link :to="{ name: 'home' }" class="w-bottom-menu__nav-item">
        <div class="w-bottom-menu__nav-item--icon"><IconHome /></div>
        <div class="w-bottom-menu__nav-item--name">Home</div>
      </nuxt-link>
      <nuxt-link :to="{ name: 'queue' }" class="w-bottom-menu__nav-item">
        <div class="w-bottom-menu__nav-item--icon"><IconQueue /></div>
        <div class="w-bottom-menu__nav-item--name">Queue</div>
      </nuxt-link>
      <nuxt-link :to="{ name: 'friends' }" class="w-bottom-menu__nav-item">
        <div class="w-bottom-menu__nav-item--icon"><IconFriends /></div>
        <div class="w-bottom-menu__nav-item--name">Friends</div>
      </nuxt-link>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import IconHome from '@/app/assets/icons/contents/icon-home.svg'
import IconQueue from '@/app/assets/icons/contents/icon-queue.svg'
import IconFriends from '@/app/assets/icons/contents/icon-friends.svg'
</script>

<style src="./w-bottom-menu.scss" lang="scss" scoped />
