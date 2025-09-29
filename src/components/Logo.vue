<script setup lang="ts">
const linkName = 'home'
const logoUrl = '/pics/logo_web.png'
</script>

<template>
  <RouterLink :to="{ name: linkName }">
    <img :src="logoUrl" class="h-10 sm:h-12">
  </RouterLink>
</template>