import { Http } from "../http"

export class RawMethods {
  constructor(private http: Http) {}

  sendMessage(params: {
    chat_id: string | number
    text: string
    parse_mode?: string
    reply_markup?: any
  }) {
    return this.http.post({
      path: "/api/v2/sendMessage",
      body: params
    })
  }

  getMe() {
    return this.http.post({
      path: "/api/v2/getMe",
      body: {}
    })
  }
}
