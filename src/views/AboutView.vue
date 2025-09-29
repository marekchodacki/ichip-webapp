<script setup lang="ts">
import contactInfo from '@/_data/contactInfo'
import page from '@/_data/aboutPage'
</script>

<template>
  <div
    class="container mx-auto flex flex-col md:flex-row pt-8 px-4 roboto-condensed"
  >
    <div class="flex-1 space-y-8 w-full h-fit p-4">
      <h1 class="text-3xl text-center sm:text-left border-b-2 pb-3">
        {{ page.title }}
      </h1>
      <h2 class="text-2xl text-center sm:text-left">{{ page.subTitle }}</h2>
      <p
        v-for="p in page.paragraphs"
        :key="p"
        class="text-lg text-center sm:text-left"
      >
        <span v-html="p"></span>
      </p>
      <ul class="space-y-8 sm:space-y-4">
        <li
          v-for="task in page.weDo"
          :key="task.name"
          class="flex justify-between pb-2 font-bold border-b-4 border-sky-500"
        >
          <span v-html="task.name"></span>
          <span class="text-sky-500">{{ task.rate }}</span>
        </li>
      </ul>
    </div>

    <div
      class="flex flex-1 justify-center lg:justify-end items-center pt-16 lg:pt-0 p-4"
    >
      <img :src="page.imgSrc" class="w-auto h-11/12 p-1 rounded-xl border-2" />
    </div>
  </div>

  <div class="container mx-auto p-8 pb-16">
    <h2 class="text-xl text-center">
      Postaramy rozwiązać każdy problem związany z&nbsp;Twoim telefonem,
      w&nbsp;razie pytań prosimy o&nbsp;kontakt:
      <p class="pt-4">
        <a
          :href="contactInfo.emailSend"
          class="font-bold text-sky-500 hover:underline"
        >
          {{ contactInfo.emailText }}
        </a>
        lub
        <a
          :href="contactInfo.phoneCall"
          class="font-bold text-sky-500 whitespace-nowrap hover:underline"
        >
          {{ contactInfo.phoneText }} </a
        >.
      </p>
    </h2>
  </div>
</template>
