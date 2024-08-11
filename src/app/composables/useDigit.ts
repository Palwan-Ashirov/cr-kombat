export function useNumberWithSpaces(event: string | number): string {
  if (!event || (typeof event != 'number' && typeof event != 'string')) {
    return ''
  }
  const price = event.toString().replaceAll(' ', '')
  const parts = price.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  if (parts.length <= 2) {
    return parts.join('.')
  } else {
    return [parts[0], parts[1]].join('.')
  }
}
