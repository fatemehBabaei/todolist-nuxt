import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "D:/WEB/git/todolist-nuxt/todolist/app-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}