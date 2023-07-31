export const get = (key: string) => {
  const value = localStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value)
}

export const save = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const remove = (key: string) => {
  localStorage.removeItem(key)
}

export const ImageTransform = (image: string) => {
  const Base64 = 'data:image/jpg;base64,'
  return `${Base64}${image}`
}
