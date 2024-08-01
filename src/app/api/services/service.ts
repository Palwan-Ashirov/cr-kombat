import { UnwrapRef, ref } from "vue";

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'

interface ResponseDataError {
  timestamp: EpochTimeStamp;
  status: number;
  error: string;
  path: string | null;
}

interface ResponseAsyncData<
  DataT = any,
  DataE = ResponseDataError,
  DataS = Exclude<AsyncDataRequestStatus, "idle" | "pending">
> {
  data: globalThis.Ref<UnwrapRef<DataT> | null>;
  error: globalThis.Ref<DataE | null>;
  status: globalThis.Ref<DataS>;
}

interface ResponseData<
  DataT = any,
  DataE = ResponseDataError,
  DataS = AsyncDataRequestStatus
> extends ResponseAsyncData<DataT, DataE, DataS> {}

class Service {
  protected defaultJson<DataT>(
    request: Promise<any>,
    key: string
  ): ResponseData<DataT> {
    const nuxtApp = useNuxtApp();
    const _data = nuxtApp.payload.data[key];
    const _error = nuxtApp.payload._errors[key]?.data as ResponseDataError;

    const data = ref<DataT | null>(_data ?? null);
    const error = ref<ResponseDataError | null>(_error ?? null);
    const status = ref<AsyncDataRequestStatus>(
      _error ? "error" : _data ? "success" : "pending"
    );

    (async () => {
      const res = await request;

      data.value = res.data.value as UnwrapRef<DataT> | null;
      error.value = res.error.value?.data ?? null;
      status.value = res.status.value;
    })();

    return { data, error, status };
  }

  protected async defaultAsyncJson<DataT>(
    request: Promise<any>
  ): Promise<ResponseAsyncData<DataT>> {
    const { data, error, status } = await request;

    return {
      data,
      error: ref(error.value?.data),
      status,
    };
  }
}

export { Service };
export type { ResponseData, ResponseAsyncData, ResponseDataError };
