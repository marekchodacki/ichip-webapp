export function flattenClasses(obj: Record<string, any>): string {
  const classes: string[] = []

  Object.values(obj).forEach((value) => {
    if (typeof value === 'string') {
      classes.push(value)
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === 'string') {
          classes.push(item)
        } else if (typeof item === 'object') {
          classes.push(flattenClasses(item))
        }
      })
    } else if (typeof value === 'object') {
      classes.push(flattenClasses(value))
    }
  })
  return classes.join(' ')
}

export const radio = {
  width: 'w-full',
  padding: 'p-5',
  background: 'bg-gray-100',
  text: 'text-center text-gray-600',
  rounded: 'rounded-md',
  hover: 'hover:shadow',
  ring: 'ring-1 ring-gray-400',
  transition: 'transition-all',
  ringChecked: 'peer-checked:ring-sky-400 peer-checked:ring-off',
  textChecked: 'peer-checked:text-sky-600',
  bgChecked: 'peer-checked:bg-sky-100',
}

export const input = {
  width: 'w-full',
  padding: 'p-2',
  rounded: 'rounded-md',
  ring: 'ring-1 ring-gray-400',
  transition: 'transition-all delay:300',
  focus: 'focus:text-sky-600',
  invalid: 'invalid:ring-red-400',
}

export const checkbox = {
  width: 'w-4',
  height: 'h-4',
  background: 'bg-gray-100',
  rounded: 'rounded',
  ring: 'ring-1 ring-gray-400',
  ringChecked: 'peer-checked:ring-sky-800 peer-checked:ring-off',
  bgChecked: 'peer-checked:bg-sky-800',
  transition: 'transition-all duration-300',
}

export const section = {
  grid: 'grid grid-cols-2',
  gap: 'gap-4',
  padding: 'p-4',
  outline: 'outline outline-1 outline-gray-300',
  background: 'bg-gray-50',
  rounded: 'rounded-lg',
}

export const h2 = {
  text: 'text-xl text-gray-600 font-semibold',
  padding: 'pb-2',
  transform: 'uppercase',
}

export const badge = {
  wrap: 'text-nowrap',
  margin: 'mx-1',
  padding: 'px-2',
  outline: 'outline outline-1 outline-gray-500',
  background: 'bg-gray-100',
  rounded: 'rounded-lg',
}

export const link = {
  text: 'text-sky-500 font-semibold',
  hover: 'hover:underline hover:text-sky-400',
}

export const error = {
  display: 'block',
  padding: 'pt-2',
  text: 'text-red-600',
}
