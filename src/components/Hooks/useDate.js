export const createUtcDateIso = () => {
  const offset = new Date().getTimezoneOffset()
  const myDate = Date.parse(Date()) - offset * 60 * 1000
  const dateIso = new Date(myDate).toISOString()
  return dateIso.slice(0, 10)
}
