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

class ApiAdapter {
  public defaultRequest: Pick<IRequest, 'cache' | 'headers' | 'mode'> = {
    cache: 'no-cache',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Tg-Auth': useRuntimeConfig().public.USER_ID,
    },
  }

  readonly hostname: string | null = null

  constructor() {
    this.hostname = useRuntimeConfig().public.API
  }

  public async fetch<DataT>(endpoint: string, payload: IRequest, headers?: HeadersInit) {
    const request: IRequest = payload

    request.headers = {
      ...headers,
      ...this.defaultRequest.headers,
    }

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
