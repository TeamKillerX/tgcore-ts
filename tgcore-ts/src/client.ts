import { Http } from "./http"
import type { ClientOptions } from "./types"
import { RawMethods } from "./raw/methods"

export class Client {
  private http: Http
  public raw: RawMethods

  constructor(opts: ClientOptions) {
    if (!opts?.api_key) throw new Error("tgcore-ts: api_key is required")
    this.http = new Http(opts)
    this.raw = new RawMethods(this.http)
  }

  setBaseUrl(url: string) {
    this.http.setBaseUrl(url)
    return this
  }

  setHeader(key: string, value: string) {
    this.http.setHeader(key, value)
    return this
  }
}
