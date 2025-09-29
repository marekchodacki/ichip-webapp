<script setup lang="ts">
import contactInfo from '@/_data/contactInfo'

const helpCenter = {
  name: 'Centrum pomocy',
  links: [
    { name: 'Jak do nas dojechać?', to: 'location' },
    { name: 'Jak przesłać urządzenie?', to: 'how-to-send-device' },
  ],
}
const information = {
  name: 'Informacje',
  links: [
    {
      name: 'Warunki i regulamin',
      to: '/docs/ichip_regulamin.pdf',
      target: '_blank',
    },
    {
      name: 'Polityka prywatności',
      to: '/docs/ichip_polityka-prywatnosci.pdf',
      target: '_blank',
    },
  ],
}
</script>

<template>
  <div class="bg-gray-950 border-t-4 border-neutral-800">
    <div class="container max-w-6xl mx-auto flex flex-wrap p-4">
      <div
        class="w-full sm:w-1/2 lg:w-1/3 text-neutral-500 p-4 space-y-4 text-center lg:text-left"
      >
        <p class="text-xl mb-4">{{ contactInfo.name }}</p>
        <p class="text-lg text-white mb-4 whitespace-nowrap">
          {{ contactInfo.street }}<br />{{ contactInfo.postcode }}
          {{ contactInfo.city }}
        </p>
        <p class="text-lg text-white">
          <a
            :href="contactInfo.emailSend"
            class="text-sky-200 hover:underline"
            >{{ contactInfo.emailText }}</a
          ><br />
          <a
            :href="contactInfo.phoneCall"
            class="text-sky-400 hover:underline"
            >{{ contactInfo.phoneText }}</a
          >
        </p>
        <p class="text-lg text-white whitespace-nowrap">
          <b>{{ contactInfo.workingHours.name }}</b
          ><br />
          {{ contactInfo.workingHours.weekNames }}
          <span class="ps-2 font-bold">{{
            contactInfo.workingHours.weekHours
          }}</span
          ><br />
          {{ contactInfo.workingHours.weekendNames }}
          <span class="ps-2 font-bold">{{
            contactInfo.workingHours.weekendHours
          }}</span>
        </p>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 text-neutral-500 p-4 text-center">
        <p class="text-xl mb-4">{{ helpCenter.name }}</p>
        <ul class="text-lg text-white tracking-wide space-y-2">
          <li v-for="link in helpCenter.links" :key="link.name">
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
      <div
        class="flex-1 w-full sm:w-1/2 lg:w-1/3 text-neutral-500 p-4 text-center lg:text-right"
      >
        <p class="text-xl mb-4">{{ information.name }}</p>
        <ul class="text-lg text-white space-y-2">
          <li v-for="link in information.links" :key="link.name">
            <a
              :href="link.to"
              :target="link.target"
              class="group relative text-white pb-1"
            >
              {{ link.name }}
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
