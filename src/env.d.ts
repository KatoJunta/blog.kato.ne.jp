/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Pagefind UI モジュールの型定義
declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: {
      element: string
      showImages?: boolean
      resetStyles?: boolean
      showSubResults?: boolean
      autofocus?: boolean
      bundlePath?: string
      baseUrl?: string
      highlightParam?: string
      mergeIndex?: boolean
      translations?: {
        placeholder?: string
        clear_search?: string
        load_more?: string
        search_label?: string
        filters_label?: string
        zero_results?: string
        many_results?: string
        one_result?: string
        searching?: string
        search_suggestion?: string
        searching_for?: string
        search_results?: string
        alt_search?: string
        [key: string]: string | undefined
      }
      [key: string]: any
    })
  }
}
