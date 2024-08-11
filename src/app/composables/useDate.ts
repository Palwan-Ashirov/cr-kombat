import { useDayjs } from '#dayjs'

export function useGetDifferenceByUntilLockedTime(lockedUntilTime: string | null) {
  const dayjs = useDayjs()
  const localedLockedUntilTime = ref('')

  const targetDate = dayjs(lockedUntilTime)

  const updateDifference = () => {
    const now = dayjs()
    const diff = targetDate.diff(now)
    localedLockedUntilTime.value = dayjs.utc(diff).format('HH:mm:ss')
  }

  updateDifference()
  const interval = setInterval(updateDifference, 1000)
  function clear() {
    clearInterval(interval)
  }

  return { localedLockedUntilTime: localedLockedUntilTime || '', clear }
}
