<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Service {
  name: string
  price: string
  time: string
}

interface DataItem {
  device: string
  services: Service[]
}

const searchQuery = ref('')
const dataList = ref<DataItem[]>([])
const error = ref<string | null>(null)

const filteredList = computed(() => {
  return dataList.value.filter(item =>
    item.device.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const fetchData = async () => {
  try {
    const response = await fetch(`/data/prices-for-devices.json?timestamp=${new Date().getTime()}`)
    if (!response.ok) {
      throw new Error('Nie udało się załadować danych.')
    }
    dataList.value = await response.json()
  } catch (err) {
    error.value = (err as Error).message
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="container max-w-3xl h-full py-12 mx-auto px-4 roboto-condensed space-y-8">
    <header class="w-full">
      <h1 class="text-3xl text-center sm:text-left border-b-2 pb-3">Cennik usług</h1>
    </header>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Szukaj modelu..."
      class="w-full p-2 rounded-md ring-1 ring-gray-400 focus:text-sky-600"
    />

    <div v-if="error" class="py-3">{{ error }}</div>

    <div v-if="dataList.length">
      <div v-if="filteredList.length">
        <table class="table-fixed w-full my-8 select-none" v-for="item in filteredList" :key="item.device">
          <caption class="caption-top text-2xl py-3 bg-black text-slate-100">
            {{ item.device }}
          </caption>
          <thead class="bg-slate-200">
            <tr>
              <th class="text-left p-2">Usługa</th>
              <th class="w-1/4 p-2">Cena</th>
              <th class="w-1/4 p-2">Czas</th></tr>
          </thead>
          <tbody>
            <tr v-for="service in item.services" :key="service.name" class="hover:bg-slate-100 hover:text-sky-600 border-b-2 border-slate-300 sm:border-0">
              <td class="p-1">{{ service.name }}</td>
              <td class="text-center">{{ service.price }}</td>
              <td class="text-center">{{ service.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="mt-4 py-48 text-center text-gray-600">
        Nie znaleziono urządzenia.
      </div>
    </div>
    <div v-else class="mt-4 py-48 text-center text-gray-600">
        Wczytywanie danych...
      </div>
  </div>
</template>