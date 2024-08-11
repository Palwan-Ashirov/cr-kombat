import axios from 'axios'

const TELEGRAM_TOKEN =
  'query_id=AAEOiBtAAAAAAA6IG0DSwfk4&user=%7B%22id%22%3A1075546126%2C%22first_name%22%3A%22Palwan%22%2C%22last_name%22%3A%22P.%22%2C%22username%22%3A%22palwanP%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1723404573&hash=1ac07a11207ced680751f038854d5c5ad016f0977d045a782ff782d4f8af70f4'

export const api = () => {
  const { $config } = useNuxtApp()
  const axiosInstance = axios.create({
    baseURL: $config.public.BASE_URL,
    headers: {
      'TG-Auth': Telegram?.WebView.initParams.tgWebAppData || TELEGRAM_TOKEN,
      Cookies: $config.public.VERCEL_TOKEN,
    },
  })
  axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error?.response?.status === 503) {
        console.log('if works')
        showError({ fatal: true, statusCode: 503, statusMessage: 'Maintenance Works' })
      }
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const accountApi = async (path: string, options?: any) => {
  const { $config } = useNuxtApp()
  const request = $fetch(`${$config.public.BASE_URL}${path}`, {
    ...options,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'TG-Auth': TELEGRAM_TOKEN,
      ...options?.headers,
    },
  })
  request.catch(error => {
    if (error?.response?.status === 503) {
      showError({ fatal: true, statusCode: 503, statusMessage: 'Maintenance Works' })
    }
  })
  const response = await request
  return response
}

export const getServerRequest = async (path: string, options?: any) => {
  const { $config } = useNuxtApp()
  return await useFetch(() => `${$config.public.BASE_URL}${path}`, {
    ...options,
    headers: {
      'tg-auth': TELEGRAM_TOKEN,
      Cookies: $config.public.VERCEL_TOKEN,
      ...(options && options.headers),
    },
  })
}
