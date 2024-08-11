import { useDayjs } from '#dayjs'

export function useGetDifferenceByUntilLockedTime() {
  const dayjs = useDayjs()
  const localedLockedUntilTime = ref('')

  const targetDate = dayjs('2024-08-12T00:00:00+04:00')

  const updateDifference = () => {
    const now = dayjs()
    const diff = targetDate.diff(now)
    localedLockedUntilTime.value = dayjs.utc(diff).format('HH:mm:ss')
  }

  updateDifference()
  const interval = setInterval(updateDifference, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })

  return localedLockedUntilTime.value
}
