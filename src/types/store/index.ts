import {Demo} from './demo'

export interface IndexStore {
  demoStore: Demo
}

export interface InjectStores {
  store: IndexStore
}

export type EmptyValue = undefined | null