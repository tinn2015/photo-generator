import {action, computed, observable} from 'mobx'

class IndexStore {
  @observable name = 'aa'
  @computed get fullName () {
    return this.name + '这是一个fullname'
  }
  @action setName (name: string) {
    this.name = name
  }
}

export default new IndexStore()