<script setup lang="ts">
import page from '@/_data/contactPage'
import contactInfo from '@/_data/contactInfo'
</script>

<template>
  <div
    class="container mx-auto flex flex-col md:flex-row pt-8 px-4 pb-16 roboto-condensed"
  >
    <div class="space-y-8 w-full md:w-1/3 p-4 sm:pe-8">
      <h1 class="text-3xl text-center sm:text-left border-b-2 pb-3">
        {{ page.title }}
      </h1>

      <div class="flex flex-col justify-center sm:justify-end space-y-2">
        <div class="mx-auto sm:mx-0 sm:ms-auto w-auto h-9">
          <img :src="page.logoSrc" class="h-9" />
        </div>
        <h2 class="text-2xl text-center sm:text-right">
          <span v-html="page.subTitle"></span>
        </h2>
      </div>

      <div class="space-y-2 text-xl text-center sm:text-right">
        <h3>TELEFON KONTAKTOWY:</h3>
        <p class="font-bold whitespace-nowrap">
          <a
            :href="contactInfo.phoneCall"
            class="font-bold text-sky-500 hover:underline"
            >{{ contactInfo.phoneText }}</a
          >
        </p>
      </div>
      <div class="space-y-2 text-xl text-center sm:text-right">
        <h3>ADRES E-MAIL:</h3>
        <p class="font-bold">
          <a
            :href="contactInfo.emailSend"
            class="font-bold text-sky-500 hover:underline"
            >{{ contactInfo.emailText }}</a
          >
        </p>
      </div>

      <div class="space-y-2 text-xl text-center sm:text-right">
        <h3>LOKALIZACJA:</h3>
        <p class="font-bold whitespace-nowrap">
          {{ contactInfo.street }}<br />{{ contactInfo.postcode }}
          {{ contactInfo.city }}
        </p>
      </div>

      <div class="space-y-2 text-xl text-center sm:text-right">
        <h3>GODZINY OTWARCIA:</h3>
        <p class="font-bold whitespace-nowrap">
          {{ contactInfo.workingHours.weekNames }}
          <span class="ps-2 font-bold">{{
            contactInfo.workingHours.weekHours
          }}</span
          ><br />
          {{ contactInfo.workingHours.weekendNames
          }}<span class="ps-2 font-bold">{{
            contactInfo.workingHours.weekendHours
          }}</span>
        </p>
      </div>
    </div>

    <div class="flex w-full sm:h-auto md:w-2/3">
      <img
        :src="page.imgSrc"
        class="self-center w-full mt-8 md:mt-0 p-1 rounded-xl border-2"
      />
    </div>
  </div>
</template>
