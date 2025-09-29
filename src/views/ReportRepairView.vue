<script setup lang="ts">
import { ref, computed } from 'vue'
import PatternLock from '@/components/PatternLock.vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import emailjs from '@emailjs/browser'
import {
  flattenClasses,
  radio,
  input,
  checkbox,
  section,
  h2,
  badge,
  link,
  error,
} from '@/utils/css-classes'
import { setPattern } from '@/utils/form-helpers'
import { validationSchema } from '@/utils/validation-schema'

const radioClasses = computed(() => Object.values(radio).join(' '))
const inputClasses = computed(() => flattenClasses(input))
const checkboxClasses = computed(() => Object.values(checkbox).join(' '))
const sectionClasses = computed(() => flattenClasses(section))
const h2Classes = computed(() => flattenClasses(h2))
const badgeClasses = computed(() => flattenClasses(badge))
const linkClasses = computed(() => flattenClasses(link))
const errorClasses = computed(() => flattenClasses(error))

const formData = ref<any>({
  identifyType: '',
  identifyImeiNumber: '',
  identifySerialNumber: '',
  repairType: '',
  description: '',
  backupOption: '',
  lockType: '',
  lockPattern: '',
  lockValue: '',
  businessClient: false,
  companyNumber: '',
  companyName: '',
  firstName: '',
  lastName: '',
  street: '',
  buildingNo: '',
  apartmentNo: '',
  postcode: '',
  city: '',
  phoneNumber: '',
  email: '',
  deliveryType: '',
  shippingMethod: '',
  differentShippingAddress: false,
  differentFirstName: '',
  differentLastName: '',
  differentStreet: '',
  differentBuildingNo: '',
  differentApartmentNo: '',
  differentPostcode: '',
  differentCity: '',
  differentPhoneNumber: '',
  differentEmail: '',
  statuteAccepted: false,
  dataProcessingAccepted: false,
})

function handlePattern(pattern: number[]) {
  setPattern(pattern, formData)
}

const formRef = ref<HTMLFormElement | null>(null)
const successMessage = ref('')
const isProcessing = ref(false)

function onSubmit(values: any, { resetForm }: any) {
  isProcessing.value = true

  if (formRef.value) {
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.value,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        successMessage.value = 'Formularz został wysłany! Dziękujemy.'
        resetForm()
        isProcessing.value = false
      })
      .catch(() => {
        successMessage.value = 'Wystąpił błąd podczas wysyłania.'
      })
  }
}
</script>

<template>
  <div class="container max-w-3xl pt-12 mx-auto px-4">
    <header class="w-full">
      <h1 class="text-3xl text-center sm:text-left border-b-2 pb-3">
        Zgłoszenie naprawy
      </h1>
    </header>
    <VeeForm
      :validationSchema="validationSchema"
      v-slot="{ handleSubmit }"
      as="div"
    >
      <form ref="formRef" @submit.prevent="handleSubmit($event, onSubmit)">
        <div class="py-8 space-y-8 w-full">
          <div class="w-fit mx-auto md:mx-0">
            <h2 :class="h2Classes" class="text-center md:text-left">Marka:</h2>

            <div
              class="flex items-center justify-center sm:justify-end space-y-2"
            >
              <h2 class="text-3xl font-bold text-center sm:text-right">
                Apple
              </h2>
            </div>
          </div>

          <hr />

          <div
            class="grid grid-cols-3 gap-4 p-4 outline outline-1 outline-gray-300 bg-gray-50 rounded-lg"
          >
            <div class="col-span-3">
              <h2 :class="h2Classes">Nr identyfikacyjny produktu:</h2>
            </div>

            <div class="col-span-3 sm:col-span-1">
              <label class="cursor-pointer">
                <Field
                  type="radio"
                  name="identifyType"
                  value="IMEI"
                  class="hidden peer"
                  v-model="formData.identifyType"
                />
                <div :class="radioClasses">IMEI</div>
              </label>
            </div>
            <div class="col-span-3 sm:col-span-1">
              <label class="cursor-pointer">
                <Field
                  type="radio"
                  name="identifyType"
                  value="Nr seryjny"
                  class="hidden peer"
                  v-model="formData.identifyType"
                />
                <div :class="radioClasses">Nr seryjny</div>
              </label>
            </div>
            <div class="col-span-3 sm:col-span-1">
              <label class="cursor-pointer">
                <Field
                  type="radio"
                  name="identifyType"
                  value="Brak"
                  class="hidden peer"
                  v-model="formData.identifyType"
                />
                <div :class="radioClasses">Brak</div>
              </label>
            </div>

            <ErrorMessage
              name="identifyType"
              :class="errorClasses"
              class="col-span-3 pt-0"
            />

            <div v-if="formData.identifyType === 'IMEI'" class="col-span-3">
              <div class="w-full text-gray-600 pb-4">
                <p>
                  <b>IMEI</b> to unikalny numer, który identyfikuje Twoje
                  urządzenie. Możesz go sprawdzić na kilka sposobów:
                </p>
                <ul class="list-disc space-y-4 p-4">
                  <li>
                    "telefonując" pod numer:
                    <span :class="badgeClasses">*#06#</span>,
                  </li>
                  <li>
                    wchodząc w: <span :class="badgeClasses">Ustawienia</span> →
                    <span :class="badgeClasses">Ogólne</span> →
                    <span :class="badgeClasses">To urządzenie...</span> →
                    <span :class="badgeClasses">IMEI</span>,
                  </li>
                  <li>na oryginalnym pudełku urządzenia.</li>
                </ul>
              </div>
              <Field
                type="text"
                name="identifyImeiNumber"
                placeholder="Wprowadź 15-cyfrowy numer IMEI"
                :class="inputClasses"
                v-model="formData.identifyImeiNumber"
                :validateOnInput="true"
              />
              <ErrorMessage name="identifyImeiNumber" :class="errorClasses" />
            </div>

            <div
              v-if="formData.identifyType === 'Nr seryjny'"
              class="col-span-3"
            >
              <div class="w-full text-gray-600 pb-4">
                <p>
                  <b>Numer seryjny (MEID)</b> służy do identyfikacji Twojego
                  urządzenie. Możesz go sprawdzić na kilka sposobów:
                </p>
                <ul class="list-disc space-y-4 p-4">
                  <li>
                    "telefonując" pod numer:
                    <span :class="badgeClasses">*#06#</span>,
                  </li>
                  <li>
                    wchodząc w: <span :class="badgeClasses">Ustawienia</span> →
                    <span :class="badgeClasses">Ogólne</span> →
                    <span :class="badgeClasses">To urządzenie...</span> →
                    <span :class="badgeClasses">MEID</span>,
                  </li>
                  <li>na oryginalnym pudełku urządzenia.</li>
                </ul>
              </div>
              <Field
                type="text"
                name="identifySerialNumber"
                placeholder="Wprowadź numer seryjny"
                :class="inputClasses"
                v-model="formData.identifySerialNumber"
                :validateOnInput="true"
              />
              <ErrorMessage name="identifySerialNumber" :class="errorClasses" />
            </div>
          </div>

          <hr />

          <div :class="sectionClasses">
            <div class="col-span-2">
              <h2 :class="h2Classes">Rodzaj naprawy:</h2>
            </div>
            <label class="cursor-pointer">
              <Field
                type="radio"
                name="repairType"
                value="Gwarancyjna"
                class="hidden peer"
                v-model="formData.repairType"
              />
              <div :class="radioClasses">Gwarancyjna</div>
            </label>
            <label class="cursor-pointer">
              <Field
                type="radio"
                name="repairType"
                value="Pogwarancyjna"
                class="hidden peer"
                v-model="formData.repairType"
              />
              <div :class="radioClasses">Pogwarancyjna</div>
            </label>
            <div class="col-span-2">
              <ErrorMessage name="repairType" :class="errorClasses" />
            </div>
          </div>

          <hr />

          <div :class="sectionClasses">
            <div class="col-span-2">
              <h2 :class="h2Classes">Usterka:</h2>
            </div>
            <div class="col-span-2">
              <Field
                as="textarea"
                name="description"
                placeholder="Opisz usterkę urządzenia"
                class="min-h-64"
                :class="inputClasses"
                v-model="formData.description"
                :validateOnInput="true"
              />
              <p class="pt-2 text-gray-500">
                {{ formData.description.length }} / 500
              </p>
              <ErrorMessage name="description" :class="errorClasses" />
            </div>
          </div>

          <hr />

          <div :class="sectionClasses">
            <div class="col-span-2">
              <h2 :class="h2Classes">Blokada ekranu i Twoje dane:</h2>
            </div>

            <div class="col-span-2 space-y-2 text-gray-600">
              <p class="font-bold underline">UWAGA!</p>
              <p>
                Podczas procesu serwisowego wszystkie dane z urządzenia mogą
                zostać usunięte, w szczególności przy naprawach gwarancyjnych.
                Aby uniknąć utraty ważnych informacji, zalecamy wykonanie kopii
                zapasowej danych we własnym zakresie.
              </p>
              <p>Oto dostępne opcje:</p>
              <ul class="list-disc space-y-2 px-4 pb-4">
                <li>
                  <span class="font-bold">Samsung Cloud</span> - Pozwala na
                  automatyczne tworzenie kopii zapasowych. Szczegółowe
                  instrukcje znajdziesz tutaj:
                  <a
                    href="https://www.samsung.com/pl/support/mobile-devices/czym-jest-samsung-cloud-i-jak-z-niej-korzystac/"
                    rel="nofollow noreferrer noopener"
                    target="_blank"
                    :class="linkClasses"
                  >
                    [Czym jest Samsung Cloud i jak z niej korzystać?]
                  </a>
                </li>
                <li class="font-bold">Kopia na komputer / zewnętrzny nośnik</li>
              </ul>

              <p class="font-bold underline">Dodatkowe kroki</p>
              <p>
                Aby zabezpieczyć dostęp do urządzenia i przyspieszyć proces
                serwisowy, zalecamy włączenie trybu konserwacji:
              </p>
              <ul class="list-disc space-y-2 px-4">
                <li>
                  <span class="font-bold"
                    >Wyłącz automatyczną blokadę urządzenia</span
                  >
                  <ul class="space-y-1">
                    <li class="pt-2">Wejdź w:</li>
                    <li>→ <span :class="badgeClasses">Ustawienia</span></li>
                    <li>
                      →
                      <span :class="badgeClasses"
                        >Bezpieczeństwo i prywatność</span
                      >
                      lub
                      <span :class="badgeClasses"
                        >Ekran blokady i bezpieczeństwo</span
                      >
                    </li>
                    <li>
                      → <span :class="badgeClasses">Automatyczna blokada</span>
                    </li>
                    <li class="pt-2">Następnie wybierz opcję:</li>
                    <li>
                      → <span :class="badgeClasses">Wyłącz</span> lub ustaw
                      <span :class="badgeClasses">Nigdy</span>.
                    </li>
                  </ul>
                </li>
                <li>
                  <span class="font-bold">Włącz tryb konserwacji</span>
                  <p>
                    Szczegółowe instrukcje znajdziesz tutaj:
                    <a
                      href="https://www.samsung.com/pl/support/mobile-devices/jak-korzystac-z-trybu-konserwacji-na-smartfonie-lub-tablecie-samsung-galaxy/"
                      rel="nofollow noreferrer noopener"
                      target="_blank"
                      :class="linkClasses"
                    >
                      [Jak korzystać z trybu konserwacji na smartfonie lub
                      tablecie Samsung Galaxy?]
                    </a>
                  </p>
                </li>
              </ul>
              <p class="pb-6">
                Jeśli preferujesz płatną kopię zapasową, musisz podać kod
                blokady urządzenia.
              </p>
            </div>

            <label class="col-span-2 cursor-pointer">
              <Field
                type="radio"
                name="backupOption"
                value="Tak, poproszę o kopię zapasową (100 zł)."
                class="hidden peer"
                v-model="formData.backupOption"
              />
              <div :class="radioClasses">
                Tak, poproszę o wykonanie odpłatnej kopii zapasowej
                <b>w cenie 100 zł</b>.
              </div>
            </label>

            <label class="col-span-2 cursor-pointer">
              <Field
                type="radio"
                name="backupOption"
                value="Nie potrzebuję kopii zapasowej. Wyrażam zgodę na usunięcie danych."
                class="hidden peer"
                v-model="formData.backupOption"
              />
              <div :class="radioClasses">
                Nie potrzebuję kopii zapasowej.
                <b>Wyrażam zgodę na usunięcie danych</b>.
              </div>
              <ErrorMessage name="backupOption" :class="errorClasses" />
            </label>

            <div
              class="col-span-2"
              v-if="
                formData.backupOption ===
                'Tak, poproszę o kopię zapasową (100 zł).'
              "
            >
              <div :class="sectionClasses">
                <div class="col-span-2">
                  <h2 class="text-center" :class="h2Classes">
                    Aby umożliwić nam utworzenie kopii zapasowej, pamiętaj o
                    wyłączeniu blokady - albo daj nam dostęp:
                  </h2>
                </div>
                <div>
                  <label class="cursor-pointer">
                    <Field
                      type="radio"
                      name="lockType"
                      value="Brak"
                      class="hidden peer"
                      v-model="formData.lockType"
                    />
                    <div :class="radioClasses">Brak</div>
                  </label>
                </div>
                <div>
                  <label class="cursor-pointer">
                    <Field
                      type="radio"
                      name="lockType"
                      value="Wzór"
                      class="hidden peer"
                      v-model="formData.lockType"
                    />
                    <div :class="radioClasses">Wzór</div>
                  </label>
                </div>
                <div>
                  <label class="cursor-pointer">
                    <Field
                      type="radio"
                      name="lockType"
                      value="PIN"
                      class="hidden peer"
                      v-model="formData.lockType"
                    />
                    <div :class="radioClasses">PIN</div>
                  </label>
                </div>
                <div>
                  <label class="cursor-pointer">
                    <Field
                      type="radio"
                      name="lockType"
                      value="Hasło"
                      class="hidden peer"
                      v-model="formData.lockType"
                    />
                    <div :class="radioClasses">Hasło</div>
                  </label>
                </div>
                <div class="col-span-2">
                  <ErrorMessage name="lockType" :class="errorClasses" />
                </div>

                <div class="col-span-2" v-if="formData.lockType === 'Wzór'">
                  <PatternLock :badgeClasses @pattern="handlePattern" />
                  <Field
                    type="hidden"
                    name="lockPattern"
                    v-model="formData.lockPattern"
                  />
                  <ErrorMessage name="lockPattern" :class="errorClasses" />
                </div>

                <div
                  class="col-span-2"
                  v-if="
                    formData.lockType === 'PIN' || formData.lockType === 'Hasło'
                  "
                >
                  <Field
                    type="text"
                    name="lockValue"
                    placeholder="Wprowadź PIN lub hasło"
                    :class="inputClasses"
                    v-model="formData.lockValue"
                  />
                  <ErrorMessage name="lockValue" :class="errorClasses" />
                </div>
              </div>
            </div>
          </div>

          <div :class="sectionClasses">
            <div class="col-span-2">
              <h2 :class="h2Classes">Dane Klienta:</h2>
            </div>
            <div class="col-span-2">
              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="businessClient"
                  class="hidden peer"
                  v-model="formData.businessClient"
                />
                <div :class="checkboxClasses"></div>
                <span class="ms-3 text-gray-700">Zgłaszam jako Firma</span>
              </label>
            </div>

            <div v-if="formData.businessClient" class="col-span-2">
              <Field
                type="text"
                name="companyName"
                placeholder="Nazwa firmy"
                :class="inputClasses"
                v-model="formData.companyName"
              />
              <ErrorMessage name="companyName" :class="errorClasses" />
            </div>

            <div v-if="formData.businessClient" class="col-span-2">
              <Field
                type="text"
                name="companyNumber"
                placeholder="NIP firmy"
                :class="inputClasses"
                v-model="formData.companyNumber"
                :validateOnInput="true"
              />
              <ErrorMessage name="companyNumber" :class="errorClasses" />
            </div>

            <hr v-if="formData.businessClient" class="col-span-2" />

            <div class="col-span-2 md:col-span-1">
              <Field
                type="text"
                name="firstName"
                placeholder="Imię"
                :class="inputClasses"
                v-model="formData.firstName"
              />
              <ErrorMessage name="firstName" :class="errorClasses" />
            </div>
            <div class="col-span-2 md:col-span-1">
              <Field
                type="text"
                name="lastName"
                placeholder="Nazwisko"
                :class="inputClasses"
                v-model="formData.lastName"
              />
              <ErrorMessage name="lastName" :class="errorClasses" />
            </div>
            <div class="col-span-2">
              <Field
                type="text"
                name="street"
                placeholder="Ulica"
                :class="inputClasses"
                v-model="formData.street"
              />
              <ErrorMessage name="street" :class="errorClasses" />
            </div>
            <div>
              <Field
                type="text"
                name="buildingNo"
                placeholder="Nr budynku"
                :class="inputClasses"
                v-model="formData.buildingNo"
              />
              <ErrorMessage name="buildingNo" :class="errorClasses" />
            </div>
            <div>
              <Field
                type="text"
                name="apartmentNo"
                placeholder="Nr lokalu"
                :class="inputClasses"
                v-model="formData.apartmentNo"
              />
              <ErrorMessage name="apartmentNo" :class="errorClasses" />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <Field
                type="text"
                name="postcode"
                placeholder="Kod pocztowy"
                :class="inputClasses"
                v-model="formData.postcode"
              />
              <ErrorMessage name="postcode" :class="errorClasses" />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <Field
                type="text"
                name="city"
                placeholder="Miasto"
                :class="inputClasses"
                v-model="formData.city"
              />
              <ErrorMessage name="city" :class="errorClasses" />
            </div>
            <div class="col-span-2 md:col-span-1">
              <Field
                type="text"
                name="phoneNumber"
                placeholder="Nr telefonu"
                :class="inputClasses"
                v-model="formData.phoneNumber"
              />
              <ErrorMessage name="phoneNumber" :class="errorClasses" />
            </div>
            <div class="col-span-2 md:col-span-1">
              <Field
                type="text"
                name="email"
                placeholder="E-mail"
                :class="inputClasses"
                v-model="formData.email"
              />
              <ErrorMessage name="email" :class="errorClasses" />
            </div>
          </div>

          <hr />

          <div :class="sectionClasses">
            <div class="col-span-2">
              <h2 :class="h2Classes">Jak dostarczysz swoje urządzenie?</h2>
            </div>

            <p class="col-span-2">
              Przeczytaj o tym,
              <RouterLink
                :to="{ name: 'how-to-send-device' }"
                target="_blank"
                :class="linkClasses"
              >
                jak przesłać urządzenie
              </RouterLink>
              i jak wygląda proces realizacji zgłoszenia naprawy.
            </p>

            <label class="col-span-2 cursor-pointer">
              <Field
                type="radio"
                name="deliveryType"
                value="Paczkomat InPost"
                class="hidden peer"
                v-model="formData.deliveryType"
              />
              <div :class="radioClasses">Paczkomat InPost</div>
            </label>

            <label class="col-span-2 cursor-pointer">
              <Field
                type="radio"
                name="deliveryType"
                value="Dostawa osobista"
                class="hidden peer"
                v-model="formData.deliveryType"
              />
              <div :class="radioClasses">Własny kurier / Dostawa osobista</div>
              <ErrorMessage name="deliveryType" :class="errorClasses" />
            </label>

            <div
              v-if="formData.deliveryType === 'Paczkomat InPost'"
              class="col-span-2 space-y-2 text-gray-600"
            >
              <p class="">Nie musisz drukować żadnej etykiety.</p>
              <ul class="list-disc space-y-2 px-4 pb-4">
                <li>
                  <span class="font-bold">Otrzymasz od nas kod</span> → nanieś
                  go na karton wyraźnym mazakiem.
                </li>
                <li>
                  <span class="font-bold">Nadaj przesyłkę</span> → umieść ją w
                  dowolnym Paczkomacie InPost.
                </li>
              </ul>
            </div>
            <div
              v-if="formData.deliveryType === 'Kurier DPD'"
              class="col-span-2 space-y-2 text-gray-600"
            >
              <p class="">Otrzymasz od nas gotową etykietę.</p>
              <ul class="list-disc space-y-2 px-4 pb-4">
                <li>
                  <span class="font-bold">Wydrukuj ją</span> i przyklej na
                  karton.
                </li>
                <li>
                  <span class="font-bold">Kurier odbierze paczką</span> lub
                  nadaj ją w najbliższym punkcie DPD.
                </li>
              </ul>
            </div>
          </div>

          <hr />

          <div :class="sectionClasses">
            <div class="col-span-2">
              <h2 :class="h2Classes">Gdzie mamy zwrócić urządzenie?</h2>
            </div>

            <label class="col-span-2 cursor-pointer">
              <Field
                type="radio"
                name="shippingMethod"
                value="Kurier DPD"
                class="hidden peer"
                v-model="formData.shippingMethod"
              />
              <div :class="radioClasses">Kurier DPD</div>
            </label>

            <label class="col-span-2 cursor-pointer">
              <Field
                type="radio"
                name="shippingMethod"
                value="Odbiór osobisty"
                class="hidden peer"
                v-model="formData.shippingMethod"
              />
              <div :class="radioClasses">Odbiór osobisty</div>
              <ErrorMessage name="shippingMethod" :class="errorClasses" />
            </label>

            <div
              v-if="formData.shippingMethod === 'Kurier DPD'"
              class="col-span-2 text-gray-600"
            >
              <div class="pb-4">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="differentShippingAddress"
                    class="hidden peer"
                    v-model="formData.differentShippingAddress"
                  />
                  <div :class="checkboxClasses"></div>
                  <span class="ms-3 text-gray-700"
                    >Wprowadź inne dane do zwrotu</span
                  >
                </label>
              </div>
              <div
                v-if="formData.differentShippingAddress"
                class="grid grid-cols-2 gap-4"
              >
                <div class="col-span-2 md:col-span-1">
                  <Field
                    type="text"
                    name="differentFirstName"
                    placeholder="Imię"
                    :class="inputClasses"
                    v-model="formData.differentFirstName"
                  />
                  <ErrorMessage
                    name="differentFirstName"
                    :class="errorClasses"
                  />
                </div>
                <div class="col-span-2 md:col-span-1">
                  <Field
                    type="text"
                    name="differentLastName"
                    placeholder="Nazwisko"
                    :class="inputClasses"
                    v-model="formData.differentLastName"
                  />
                  <ErrorMessage
                    name="differentLastName"
                    :class="errorClasses"
                  />
                </div>
                <div class="col-span-2">
                  <Field
                    type="text"
                    name="differentStreet"
                    placeholder="Ulica"
                    :class="inputClasses"
                    v-model="formData.differentStreet"
                  />
                  <ErrorMessage name="differentStreet" :class="errorClasses" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="differentBuildingNo"
                    placeholder="Nr budynku"
                    :class="inputClasses"
                    v-model="formData.differentBuildingNo"
                  />
                  <ErrorMessage
                    name="differentBuildingNo"
                    :class="errorClasses"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="differentApartmentNo"
                    placeholder="Nr lokalu"
                    :class="inputClasses"
                    v-model="formData.differentApartmentNo"
                  />
                  <ErrorMessage
                    name="differentApartmentNo"
                    :class="errorClasses"
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <Field
                    type="text"
                    name="differentPostcode"
                    placeholder="Kod pocztowy"
                    :class="inputClasses"
                    v-model="formData.differentPostcode"
                  />
                  <ErrorMessage
                    name="differentPostcode"
                    :class="errorClasses"
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <Field
                    type="text"
                    name="differentCity"
                    placeholder="Miasto"
                    :class="inputClasses"
                    v-model="formData.differentCity"
                  />
                  <ErrorMessage name="differentCity" :class="errorClasses" />
                </div>
                <div class="col-span-2 md:col-span-1">
                  <Field
                    type="text"
                    name="differentPhoneNumber"
                    placeholder="Nr telefonu"
                    :class="inputClasses"
                    v-model="formData.differentPhoneNumber"
                  />
                  <ErrorMessage
                    name="differentPhoneNumber"
                    :class="errorClasses"
                  />
                </div>
                <div class="col-span-2 md:col-span-1">
                  <Field
                    type="text"
                    name="differentEmail"
                    placeholder="E-mail"
                    :class="inputClasses"
                    v-model="formData.differentEmail"
                  />
                  <ErrorMessage name="differentEmail" :class="errorClasses" />
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div :class="sectionClasses">
            <div class="col-span-2 space-y-2 text-gray-600">
              <div class="pb-4">
                <Field
                  type="checkbox"
                  name="statuteAccepted"
                  class="hidden peer"
                  :value="true"
                  :unchecked-value="false"
                  v-model="formData.statuteAccepted"
                >
                  <label class="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="statuteAccepted"
                      class="hidden peer"
                      :value="true"
                      v-model="formData.statuteAccepted"
                    />
                    <div :class="checkboxClasses" class="px-2 mx-2"></div>
                    <span class="ms-3 text-gray-700">
                      Oświadczam, że zapoznałem/am się i akceptuje regulamin
                      serwisu, którego aktualna wersja znajduje się na stronie
                      internetowej:
                      <a
                        href="/docs/ichip_regulamin.pdf"
                        :class="linkClasses"
                        target="_blank"
                      >
                        Regulamin
                      </a>
                      lub do wglądu w punkcie przyjęć.
                    </span>
                    <div class="flex-none"></div>
                  </label>
                </Field>
                <ErrorMessage name="statuteAccepted" :class="errorClasses" />
              </div>
              <div class="pb-4">
                <Field
                  type="checkbox"
                  name="dataProcessingAccepted"
                  class="hidden peer"
                  :value="true"
                  :unchecked-value="false"
                  v-model="formData.dataProcessingAccepted"
                >
                  <label class="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="dataProcessingAccepted"
                      class="hidden peer"
                      v-model="formData.dataProcessingAccepted"
                    />
                    <div :class="checkboxClasses" class="px-2 mx-2"></div>
                    <span class="ms-3 text-gray-700">
                      Wyrażam zgodę na przetwarzanie przez administratora moich
                      danych osobowych na potrzeby obsługi serwisowej naprawy
                      urządzeń na podstawie ustawy z dnia 10 maja 2018 r. o
                      ochronie danych osobowych (Dz. U. z 2017 r., poz. 1000) i
                      Rozporządzenia Parlamentu Europejskiego i Rady (UE)
                      2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
                      fizycznych w związku z przetwarzaniem danych osobowych i w
                      sprawie swobodnego przeływu takich danych oraz uchylenia
                      dyrektywy 95/46/WE. Z polityką prywatności można zapoznać
                      się na stronie internetowej:
                      <a
                        href="/docs/ichip_polityka-prywatnosci.pdf"
                        :class="linkClasses"
                        target="_blank"
                      >
                        Polityka prywatności</a
                      >.
                    </span>

                    <div class="flex-none"></div>
                  </label>
                </Field>
                <ErrorMessage
                  name="dataProcessingAccepted"
                  :class="errorClasses"
                />
              </div>
            </div>
          </div>

          <button
            class="cursor-pointer bg-sky-800 hover:bg-sky-600 py-2 px-4 w-full text-white transition-all ease-in-out duration-300 rounded-lg disabled:opacity-50 disabled:cursor-default"
            :disabled="isProcessing"
          >
            Wyślij
          </button>
        </div>

        <div
          class="flex items-center justify-center w-full my-8 h-20 bg-green-50 border ring-2 ring-green-400 rounded-lg"
          v-if="successMessage"
        >
          <p class="text-green-600">{{ successMessage }}</p>
        </div>
      </form>
    </VeeForm>
  </div>
</template>
