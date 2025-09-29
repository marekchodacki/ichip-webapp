export const setPattern = (pattern: Array<number>, formData: any) => {
  formData.value.lockPattern = pattern.join('-')
}