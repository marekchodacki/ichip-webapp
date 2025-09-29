<script setup lang="ts">
const googleMapLink =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.98227830112!2d20.89661433095087!3d52.23288709560504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1759145961693!5m2!1spl!2spl'
</script>

<template>
  <div class="w-full h-screen">
    <iframe
      :src="googleMapLink"
      width="100%"
      height="100%"
      style="border: 0"
      allowfullscreen="true"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>
