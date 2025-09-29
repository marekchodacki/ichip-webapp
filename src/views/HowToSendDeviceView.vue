<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface DataItem {
  name: string
  price: string
}

const dataList = ref<DataItem[]>([])
const error = ref<string | null>(null)

const fetchData = async () => {
  try {
    const response = await fetch(
      `/data/prices-for-services.json?timestamp=${new Date().getTime()}`
    )
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
  <div class="container max-w-3xl py-12 mx-auto px-4 roboto-condensed">
    <header class="w-full">
      <h1 class="text-3xl text-center sm:text-left border-b-2 pb-3">
        Jak przesłać urządzenie do naprawy?
      </h1>
    </header>
    <div class="p-8">
      <ol class="list-decimal text-lg space-y-4">
        <li>
          Wypełnij
          <RouterLink
            :to="{ name: 'report-repair' }"
            class="text-sky-600 hover:underline"
          >
            formularz zgłoszenia naprawy
          </RouterLink>
          dostępny na naszej stronie.
        </li>
        <li>Wydrukuj formularz otrzymany na Twój adres E-mail.</li>
        <li>Odpowiednio zapakuj i zabezpiecz telefon.</li>
        <li>
          <p class="pb-2">Prześlij na swój koszt na nasz adres:</p>
          <p class="text-center font-bold whitespace-nowrap pb-4">
            iChip Serwis<br />ul. Przykładowa 7<br />00-000 Warszawa
          </p>
        </li>
        <li>Po otrzymaniu urządzenia technicy ustalają koszt naprawy.</li>
        <li>
          Urządzenia objęte gwarancją, które nie posiadają uszkodzeń powstałych
          z winy Klienta, są naprawiane na koszt producenta (urządzenie jest
          odsyłane bezpłatnie).
        </li>
        <li>
          Jeżeli cena naprawy mieści się w limicie, jaki został przez Ciebie
          zaakceptowany w formularzu, traktujemy to jako zgodę na naprawę.
          Urządzenie zostaje naprawione.
        </li>
        <li>
          Jeżeli okaże się, że koszt naprawy jest wyższy, przesyłamy kosztorys
          naprawy.
        </li>
        <li>
          <p class="pb-2">
            Kiedy otrzymamy zgodę na zaproponowany kosztorys, naprawiamy i
            odsyłamy urządzenie (dokument sprzedaży będzie w paczce wraz z
            telefonem). Urządzenie może zostać wysłane za pobraniem lub możesz
            dokonać płatności na konto:
          </p>
          <p class="text-center font-bold whitespace-nowrap pb-4">
            Bank:<br />00 0000 0000 0000 0000 0000 0000
          </p>
        </li>
        <li>
          <p class="pb-2">
            Jeżeli nie zaakceptujesz kwoty w przesłanym kosztorysie lub naprawa
            nie będzie możliwa, odeślemy telefon kurierem. Do zapłaty pozostanie
            kwota ekspertyzy technicznej wg cennika:
          </p>

          <div v-if="error" class="py-3">{{ error }}</div>

          <ul v-else class="list-disc space-y-4 text-lg px-0 sm:px-2 pt-4">
            <li
              v-for="item in dataList"
              :key="item.name"
              class="flex items-center justify-between space-x-4 pb-2 font-bold border-b-2 border-sky-500"
            >
              <span>{{ item.name }}</span>
              <span class="text-sky-500 whitespace-nowrap">{{
                item.price
              }}</span>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
</template>
