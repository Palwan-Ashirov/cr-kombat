import { Controller } from './controller'

class UserController extends Controller {
  public async getProfileDetails<DataT>(key: string) {
    return await useAsyncData<DataT>(key, () => this.api.get<DataT>({ url: 'users/me' }))
  }
}

export { UserController }
