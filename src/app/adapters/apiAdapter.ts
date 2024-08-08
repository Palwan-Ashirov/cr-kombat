type RequestParams = Record<string, string | number> | string

interface IRequest {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'PATCH'
  headers?: HeadersInit
  cache?: RequestCache
  mode?: RequestMode
  body?: BodyInit
}

interface Payload extends IRequest {
  url?: string
  params?: RequestParams
}
const TELEGRAM_TOKEN =
  'query_id=AAEOiBtAAAAAAA6IG0Cx7MY7&user=%7B%22id%22%3A1075546126%2C%22first_name%22%3A%22Palwan%22%2C%22last_name%22%3A%22P.%22%2C%22username%22%3A%22palwanP%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722596636&hash=8578a67a57cd830a5f3761fefe6a9fa0dc110f93bdd88063c247395af2c611b1'

class ApiAdapter {
  public defaultRequest: Pick<IRequest, 'cache' | 'headers' | 'mode'> = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Tg-Auth': TELEGRAM_TOKEN,
    },
  }

  readonly hostname: string | null = null

  constructor() {
    this.hostname = useRuntimeConfig().public.BASE_URL
  }

  public async fetch<DataT>(endpoint: string, payload: IRequest, headers?: HeadersInit) {
    const request: IRequest = payload

    request.headers = {
      ...headers,
      ...this.defaultRequest.headers,
    }
    console.log('headers', headers)
    return $fetch<DataT>(endpoint, request)
  }

  public getUrl(url: string, _params?: RequestParams): string {
    let params: Record<string, string> = {}

    let paramsStr: string = ''

    if (_params && typeof _params !== 'string') {
      Object.keys(_params).forEach(key => {
        params[key] = String(_params[key])
      })

      paramsStr = new URLSearchParams(params).toString()
    } else if (_params && typeof _params === 'string') {
      paramsStr = _params
    }

    if (url.includes('http')) {
      return `${url}?${paramsStr}`
    } else {
      return `${this.hostname}${url}?${paramsStr}`
    }
  }

  public get<DataT>(payload: Payload) {
    const request: IRequest = {
      method: 'GET',
      ...this.defaultRequest,
      ...(payload.cache ? { cache: payload.cache } : {}),
      ...(payload.mode ? { mode: payload.mode } : {}),
    }
    const url = this.getUrl(payload.url ?? '', payload.params)
    console.log('defHeaders', this.defaultRequest.headers)
    return this.fetch<DataT>(url, request, this.defaultRequest.headers)
  }

  public post(payload: Payload) {
    const request: IRequest = {
      method: 'POST',
      ...this.defaultRequest,
      ...(payload.cache ? { cache: payload.cache } : {}),
      ...(payload.mode ? { mode: payload.mode } : {}),
      ...(payload.body ? { body: payload.body } : {}),
    }

    const url = this.getUrl(payload.url ?? '')

    return this.fetch(url, request, payload.headers)
  }
}

export { ApiAdapter }
export type { Payload }
