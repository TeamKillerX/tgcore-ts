export class RawMethods {
  constructor(private client: any) {}

  sendMessage(params: {
    chat_id: string | number
    text: string
    parse_mode?: string
    reply_markup?: any
  }) {
    return this.client.request("/api/v2/sendMessage", params)
  }

  getMe() {
    return this.client.request("/api/v2/getMe", {})
  }
}
