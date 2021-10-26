import {action, computed, observable} from 'mobx'


export class SelectPhoto {
  @observable photoPath: string
  @observable size: string
  // @computed get fullName () {
  //   return this.name + '这是一个fullname'
  // }
  @action setPhotoPath (path: string) {
    this.photoPath = path
  }
}

export default new SelectPhoto()