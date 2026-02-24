/*
# Copyright 2026 Randy W
# Licensed under the Apache License, Version 2.0

# Github Author: https://github.com/TeamKillerX/
# Code: @zxyeor

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

# http://www.apache.org/licenses/LICENSE-2.0
*/

export type InlineKeyboardButton = {
  text: string
  url?: string
  style?: string
  callback_data?: string
  web_app?: { url: string }
  login_url?: {
    url: string
    forward_text?: string
    bot_username?: string
    request_write_access?: boolean
  }
  switch_inline_query?: string
  switch_inline_query_current_chat?: string
  switch_inline_query_chosen_chat?: {
    query?: string
    allow_user_chats?: boolean
    allow_bot_chats?: boolean
    allow_group_chats?: boolean
    allow_channel_chats?: boolean
  }
  copy_text?: { text: string }
}

export type InlineKeyboardMarkup = {
  inline_keyboard: InlineKeyboardButton[][]
}

export class KeyboardBuilder {
  private keyboard: InlineKeyboardButton[][] = [[]]
  private _maxPerRow: number | null = null

  static inline() {
    return new KeyboardBuilder()
  }

  maxPerRow(n: number) {
    if (!Number.isInteger(n) || n <= 0) throw new Error("maxPerRow must be a positive integer")
    this._maxPerRow = n
    return this
  }

  private currentRow() {
    return this.keyboard[this.keyboard.length - 1]
  }

  row() {
    if (this.currentRow().length === 0) return this
    this.keyboard.push([])
    return this
  }

  private push(btn: InlineKeyboardButton) {
    if (!btn.text?.trim()) throw new Error("Button text is required")
    if (btn.text.length > 64) throw new Error("Button text too long (max 64 chars)")

    const actionKeys = [
      "url",
      "style",
      "callback_data",
      "web_app",
      "login_url",
      "switch_inline_query",
      "switch_inline_query_current_chat",
      "switch_inline_query_chosen_chat",
      "copy_text",
    ] as const

    const used = actionKeys.filter(k => (btn as any)[k] != null)
    if (used.length !== 1) {
      throw new Error(`InlineKeyboardButton must have exactly 1 action field, got: ${used.join(", ") || "none"}`)
    }

    if (btn.callback_data && btn.callback_data.length > 64) {
      throw new Error("callback_data too long (max 64 chars)")
    }

    if (this._maxPerRow && this.currentRow().length >= this._maxPerRow) {
      this.row()
    }

    this.currentRow().push(btn)
    return this
  }

  url(text: string, url: string) {
    return this.push({ text, url })
  }

  style(text: string, style: string, url: string) {
    return this.push({ text, style, url })
  }

  callback(text: string, data: string) {
    return this.push({ text, callback_data: data })
  }

  webApp(text: string, url: string) {
    return this.push({ text, web_app: { url } })
  }

  loginUrl(
    text: string,
    url: string,
    opts?: Omit<NonNullable<InlineKeyboardButton["login_url"]>, "url">
  ) {
    return this.push({ text, login_url: { url, ...(opts ?? {}) } })
  }

  switchInline(text: string, query: string) {
    return this.push({ text, switch_inline_query: query })
  }

  switchInlineCurrentChat(text: string, query: string) {
    return this.push({ text, switch_inline_query_current_chat: query })
  }

  switchInlineChosenChat(text: string, opts: InlineKeyboardButton["switch_inline_query_chosen_chat"]) {
    if (!opts) throw new Error("switch_inline_query_chosen_chat options required")
    return this.push({ text, switch_inline_query_chosen_chat: opts })
  }

  copyText(text: string, copy: string) {
    return this.push({ text, copy_text: { text: copy } })
  }

  build(): InlineKeyboardMarkup {
    const cleaned = this.keyboard.filter(r => r.length > 0)
    if (cleaned.length === 0) throw new Error("Keyboard is empty")
    return { inline_keyboard: cleaned }
  }
}
