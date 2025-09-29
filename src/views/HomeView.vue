<script setup lang="ts">
import { ref } from 'vue'
import page from '@/_data/homePage'

const loaded = ref(false)
</script>

<template>
  <div
    class="relative w-full bg-slate-800 border-y-2 overflow-hidden aspect-video"
  >
    <div
      v-if="!loaded"
      class="absolute inset-0 flex items-center justify-center bg-slate-700 animate-pulse"
    >
      <span class="text-slate-400">Ładowanie...</span>
    </div>

    <img
      :src="page.imgSrc"
      alt="Hero image"
      class="w-full h-full object-cover transition-opacity duration-700"
      :class="{ 'opacity-0': !loaded, 'opacity-100': loaded }"
      @load="loaded = true"
    />
  </div>
</template>
