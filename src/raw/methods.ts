import { Http } from "../http"

export class RawMethods {
  constructor(private http: Http) {}

  sendMessage(params: {
    chat_id: string | number
    text: string
    parse_mode?: string
    reply_markup?: any
  }) {
    return this.http.post("/api/v2/sendMessage", params)
  }

  getMe() {
    return this.http.post("/api/v2/getMe", {})
  }
}
