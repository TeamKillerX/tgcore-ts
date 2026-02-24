import { Http } from "./http.js"
import { RawMethods } from "./raw/methods.js"
import { CallMethods } from "./calls"

export type ClientOptions = {
  api_key: string
  base_url?: string
  timeout_ms?: number
}

export class Client {
  private http: Http
  public raw: RawMethods
  public calls: CallMethods

  constructor(opts: ClientOptions) {
    if (!opts?.api_key) {
      throw new Error("tgcore-ts: api_key is required")
    }

    this.http = new Http({
      api_key: opts.api_key,
      base_url: opts.base_url ?? "https://services-pro.ryzenths.dpdns.org",
      timeout_ms: opts.timeout_ms ?? 30000
    })

    this.calls = new CallMethods(this.http)
    this.raw = new RawMethods(this.http)
  }
}
