import { Service } from './service'
import { UserController } from '@controllers'
import { ResponseData, ResponseAsyncData } from './service'

class UserService extends Service {
  protected readonly controller = new UserController()

  public getProfileDetails<DataT>(): ResponseData<DataT> {
    const key = 'user-details'
    return this.defaultJson<DataT>(this.controller.getProfileDetails<DataT>(key), key)
  }

  public getAsyncProfileDetails<DataT>(): Promise<ResponseAsyncData<DataT>> {
    const key = 'user-details'
    return this.defaultAsyncJson<DataT>(this.controller.getProfileDetails<DataT>(key))
  }
}

export { UserService }
