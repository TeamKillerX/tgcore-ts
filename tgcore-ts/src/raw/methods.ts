import type { ApiResponse } from "../types"
import type { Http } from "../http"

export type SendMessageParams = {
  chat_id: string | number
  text: string
  parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
  disable_notification?: boolean
  protect_content?: boolean
  reply_markup?: any
  link_preview_options?: any
}

export class RawMethods {
  constructor(private http: Http) {}

  sendMessage(params: SendMessageParams): Promise<ApiResponse<any>> {
    return this.http.post("/api/v2/sendMessage", params)
  }

  getMe(): Promise<ApiResponse<any>> {
    return this.http.get("/api/v2/getMe")
  }
}
