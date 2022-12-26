import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "D:/WEB/git/todolist-nuxt/todolist/app-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}