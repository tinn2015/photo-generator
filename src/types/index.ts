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