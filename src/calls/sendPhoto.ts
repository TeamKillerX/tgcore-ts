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

import { BaseCallBuilder } from "./base"

export class SendPhotoBuilder extends BaseCallBuilder {

  chatId(id: string | number) {
    return this.set("chat_id", id)
  }

  photo(url: string) {
    return this.set("photo", url)
  }

  caption(caption: string) {
    return this.set("caption", caption)
  }

  parseMode(mode: "HTML" | "Markdown" | "MarkdownV2") {
    return this.set("parse_mode", mode)
  }

  disableNotification(value: boolean) {
    return this.set("disable_notification", value)
  }

  protectContent(value: boolean) {
    return this.set("protect_content", value)
  }

  replyMarkup(markup: any) {
    return this.set("reply_markup", markup)
  }
}
