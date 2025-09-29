<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />
  <div class="flex flex-col min-h-fit">
    <RouterView />
  </div>
  <Footer />
</template>
