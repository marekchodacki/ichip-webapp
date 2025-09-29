import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const validationSchema = toTypedSchema(
  z.object({
    identifyType: z.enum(['IMEI', 'Nr seryjny', 'Brak'], {
      errorMap: (issue, ctx) => {
        return { message: 'Musisz wybrać rodzaj identyfikacji.' }
      },
    }),

    identifyImeiNumber: z
      .string({ required_error: '' })
      .length(15, 'IMEI musi mieć dokładnie 15 cyfr')
      .refine((value) => {
        let sum = 0
        for (let i = 0; i < 14; i++) {
          let digit = parseInt(value[i])
          if (i % 2 !== 0) {
            digit *= 2
            if (digit > 9) digit -= 9
          }
          sum += digit
        }
        const checkDigit = (10 - (sum % 10)) % 10
        return checkDigit === parseInt(value[14])
      }, 'Nieprawidłowy numer IMEI')
      .optional(),

    identifySerialNumber: z
      .string({ required_error: '' })
      .min(4, 'Nr seryjny musi mieć co najmniej 4 znaki.')
      .max(32, 'Nr seryjny nie może mieć więcej niż 32 znaki.')
      .optional(),

    repairType: z.enum(['Gwarancyjna', 'Pogwarancyjna'], {
      errorMap: (issue, ctx) => {
        return { message: 'Musisz wybrać rodzaj naprawy.' }
      },
    }),

    description: z
      .string({ required_error: '' })
      .min(10, 'Opis musi mieć conajmniej 10 znaków.')
      .max(500, 'Opis nie może mieć więcej niż 500 znaków.')
      .regex(
        /^[0-9A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ .,'"()[\]!\/?%:-]+$/,
        'Pole zawiera niedozwolone znaki.'
      ),

    backupOption: z.enum(
      [
        'Tak, poproszę o kopię zapasową (100 zł).',
        'Nie potrzebuję kopii zapasowej. Wyrażam zgodę na usunięcie danych.',
      ],
      {
        errorMap: (issue, ctx) => {
          return { message: 'Musisz wybrać opcję wykonania kopii zapasowej.' }
        },
      }
    ),

    lockType: z
      .enum(['Brak', 'Wzór', 'PIN', 'Hasło'], {
        errorMap: (issue, ctx) => {
          return { message: 'Musisz wybrać rodzaj blokady ekranu.' }
        },
      })
      .optional(),

    lockValue: z
      .string({ required_error: '' })
      .min(4, 'PIN lub Hasło nie mogą być krótsze niż 4 znaki.')
      .max(32, 'PIN lub Hasło nie mogą być dłuższe niż 32 znaki.')
      .optional(),

    lockPattern: z
      .string({ required_error: '' })
      .min(7, 'Wzór nie może być krótszy niż 4 znaki.')
      .optional(),

    companyName: z
      .string({ required_error: '' })
      .min(3, 'Nazwa firmy nie może mieć mniej niż 3 znaki.')
      .max(64, 'Nazwa firmy nie może mieć więcej niż 64 znaki.')
      .optional(),

    companyNumber: z
      .string()
      .length(10, 'NIP musi mieć dokładnie 10 cyfr')
      .refine((value) => {
        const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]
        let sum = 0
        for (let i = 0; i < 9; i++) {
          sum += parseInt(value[i]) * weights[i]
        }
        const checkDigit = sum % 11
        return checkDigit === parseInt(value[9])
      }, 'Nieprawidłowy numer NIP')
      .optional(),

    firstName: z
      .string({ required_error: '' })
      .min(2, 'Imię nie może mieć mniej niż 2 znaki.')
      .max(16, 'Imię nie może mieć więcej niż 16 znaków.')
      .regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, 'Możesz używać tylko liter.'),
    lastName: z
      .string({ required_error: '' })
      .min(2, 'Nazwisko nie może mieć mniej niż 2 znaki.')
      .max(48, 'Nazwisko nie może mieć więcej niż 48 znaków.')
      .regex(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ-]+$/,
        'Możesz używać tylko liter i myślnika.'
      ),
    street: z
      .string({ required_error: '' })
      .min(3, 'Ulica nie może mieć mniej niż 3 znaki.')
      .max(80, 'Ulica nie może mieć więcej niż 80 znaków.')
      .regex(
        /^[0-9A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ."'-]+$/,
        'Możesz używać tylko liter, cyfr i znaków: . - " \''
      ),
    buildingNo: z
      .string({ required_error: '' })
      .min(1, 'Nr budynku nie może być pusty.')
      .max(4, 'Nr budynku nie może mieć więcej niż 4 znaki.')
      .regex(/^[0-9A-Za-z]+$/, 'Nieprawidłowy format nr budynku.'),
    apartmentNo: z
      .string({ required_error: '' })
      .max(4, 'Nr lokalu nie może mieć więcej niż 4 znaki.')
      .regex(/^[0-9A-Za-z]+$/, 'Nieprawidłowy format nr lokalu.')
      .optional()
      .or(z.literal('')),
    postcode: z
      .string({ required_error: '' })
      .regex(
        /^\d{2}-\d{3}$/,
        'Nieprawidłowy kod pocztowy. Prawidłowy format to: XX-XXX.'
      ),
    city: z
      .string({ required_error: '' })
      .min(2, 'Miasto nie może mieć mniej niż 2 znaki.')
      .max(32, 'Miasto nie może mieć więcej niż 32 znaki.')
      .regex(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ -]+$/,
        'Możesz używać tylko liter, spacji i myślnika.'
      ),
    phoneNumber: z
      .string({ required_error: '' })
      .regex(
        /^\d{9}$/,
        'Podano nieprawidłowy nr telefonu (wpisz dokładnie 9 cyfr np. 321112233 lub 111222333'
      ),
    email: z
      .string({ required_error: '' })
      .email('Podano nieprawidłowy adres e-mail.'),

    deliveryType: z.enum(['Paczkomat InPost', 'Dostawa osobista'], {
      errorMap: (issue, ctx) => {
        return {
          message: 'Musisz wybrać opcję dostarczenia urządzenia do serwisu.',
        }
      },
    }),

    shippingMethod: z.enum(['Kurier DPD', 'Odbiór osobisty'], {
      errorMap: (issue, ctx) => {
        return { message: 'Musisz wybrać opcję zwrócenia urządzenia.' }
      },
    }),

    differentShippingAddress: z.boolean().optional(),

    differentFirstName: z
      .string({ required_error: '' })
      .min(2, 'Imię nie może mieć mniej niż 2 znaki.')
      .max(16, 'Imię nie może mieć więcej niż 16 znaków.')
      .regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, 'Możesz używać tylko liter.')
      .optional(),
    differentLastName: z
      .string({ required_error: '' })
      .min(2, 'Nazwisko nie może mieć mniej niż 2 znaki.')
      .max(48, 'Nazwisko nie może mieć więcej niż 48 znaków.')
      .regex(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ-]+$/,
        'Możesz używać tylko liter i myślnika.'
      )
      .optional(),
    differentStreet: z
      .string({ required_error: '' })
      .min(3, 'Ulica nie może mieć mniej niż 3 znaki.')
      .max(80, 'Ulica nie może mieć więcej niż 80 znaków.')
      .regex(
        /^[0-9A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ."'-]+$/,
        'Możesz używać tylko liter, cyfr i znaków: . - " \''
      )
      .optional(),
    differentBuildingNo: z
      .string({ required_error: '' })
      .min(1, 'Nr budynku nie może być pusty.')
      .max(4, 'Nr budynku nie może mieć więcej niż 4 znaki.')
      .regex(/^[0-9A-Za-z]+$/, 'Nieprawidłowy format nr budynku.')
      .optional(),
    differentApartmentNo: z
      .string({ required_error: '' })
      .max(4, 'Nr lokalu nie może mieć więcej niż 4 znaki.')
      .regex(/^[0-9A-Za-z]+$/, 'Nieprawidłowy format nr lokalu.')
      .optional()
      .or(z.literal('')),
    differentPostcode: z
      .string({ required_error: '' })
      .regex(/^\d{2}-\d{3}$/, 'Kod pocztowy powinien mieć format XX-XXX.')
      .optional(),
    differentCity: z
      .string({ required_error: '' })
      .min(2, 'Miasto nie może mieć mniej niż 2 znaki.')
      .max(32, 'Miasto nie może mieć więcej niż 32 znaki.')
      .regex(
        /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ -]+$/,
        'Możesz używać tylko liter, spacji i myślnika.'
      )
      .optional(),
    differentPhoneNumber: z
      .string({ required_error: '' })
      .regex(/^\d{9}$/, 'Podano nieprawidłowy nr telefonu.')
      .optional(),
    differentEmail: z
      .string({ required_error: '' })
      .email('Podano nieprawidłowy adres e-mail.')
      .optional(),

    statuteAccepted: z.boolean().refine((value) => value === true, {
      message: 'Musisz zaakceptować regulamin.',
    }),
    dataProcessingAccepted: z.boolean().refine((value) => value === true, {
      message: 'Musisz zaakceptować politykę prywatności.',
    }),
  })
)