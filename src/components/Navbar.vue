<script setup lang="ts">
import { ref } from 'vue'
import Logo from './Logo.vue'

const links = [
  { name: 'O nas', to: 'about-us' },
  { name: 'Cennik usług', to: 'service-price-list' },
  { name: 'Kontakt', to: 'contact' },
]

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () =>
  (isMobileMenuOpen.value = !isMobileMenuOpen.value)
</script>

<template>
  <div
    class="sticky top-0 z-30 flex items-center justify-around h-14 sm:h-16 px-0 sm:px-16 bg-black text-slate-100"
  >
    <div class="flex flex-none lg:flex-1 justify-start user-select-none">
      <Logo />
    </div>

    <div class="flex shrink md:flex-none lg:flex-1 justify-center">
      <RouterLink
        :to="{ name: 'report-repair' }"
        class="w-fit hidden md:flex sm:items-center bg-sky-800 rounded-lg hover:bg-sky-600 py-1 px-6 text-lg tracking-wide transition-all ease-in-out duration-300"
      >
        Zgłoś naprawę
      </RouterLink>
    </div>

    <div class="flex flex-none lg:flex-1 justify-end">
      <ul class="hidden md:flex roboto-condensed gap-10">
        <li
          v-for="link in links"
          :key="link.name"
          class="text-xl tracking-wide whitespace-nowrap"
        >
          <RouterLink
            :to="{ name: link.to }"
            class="group relative text-white pb-1"
          >
            {{ link.name }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"
            ></span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 md:hidden cursor-pointer"
      @click="toggleMobileMenu"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </div>

  <div
    class="flex flex-col items-center justify-center gap-10 sticky z-20 top-14 left-0 w-full h-[calc(100dvh-56px)] bg-black opacity-100 transition-all duration-300 ease-in-out"
    v-if="isMobileMenuOpen"
  >
    <RouterLink
      :to="{ name: 'report-repair' }"
      class="flex-none w-fit h-fit bg-sky-800 rounded-lg hover:bg-sky-600 text-white py-1 px-6 text-lg tracking-wide transition-all ease-in-out duration-300"
      @click="toggleMobileMenu"
    >
      Zgłoś naprawę
    </RouterLink>

    <ul class="flex flex-col roboto-condensed gap-10">
      <li
        v-for="link in links"
        :key="link.name"
        class="text-xl text-center tracking-wide"
      >
        <RouterLink
          :to="{ name: link.to }"
          class="group relative text-white pb-1"
          @click="toggleMobileMenu"
        >
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
