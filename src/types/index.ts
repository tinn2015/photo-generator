import {Demo} from './store/demo'

export interface IndexStore {
  demoStore: Demo
}

export interface InjectStores {
  store: IndexStore
}

export type EmptyValue = undefined | null

export type Json = Array<Record<string, string>>

export interface HomeData {
  'banner_bg': Json,
  'banner-btn': Json,
  'search-tips': string,
  'search_hotkeys': Array<string>,
  'goods': Json
}

// 拍照详情页
export interface PhotoDetailType {
  'example_show': {
    img: string,
    icon: string,
    desc: Array<string>
  },
  'title': string,
  'desc': Array<string>,
  'bg_color': Array<string>
}

export interface Good {
  img: string,
  id: string,
  title: string,
  desc: Array<string>
}

export interface Ad {
  img: string,
  title: string,
  desc: string,
  url: string,
  name: string,
  icon: string
}
export interface LoginResult {
  code: string
}