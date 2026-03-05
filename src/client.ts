import { Http } from "./http"
import { RawMethods } from "./raw/methods"
import { CallMethods } from "./calls"
import { OrWebMethods } from "./orweb"
import { ClientOptions } from "./types/ClientOptions"
import { Middleware } from "./types/Middleware"

export function tgcore(options: ClientOptions): Client {
  return new Client(options)
}

export class Client {
  private http: Http
  private middlewares: Middleware[] = []

  public raw: RawMethods
  public calls: CallMethods
  public x: OrWebMethods

  use(mw: Middleware) {
    this.middlewares.push(mw)
    return this
  }

  constructor(opts: ClientOptions) {

    if (!opts?.api_key) {
      throw new Error("tgcore-ts: api_key is required")
    }

    this.http = new Http({
      api_key: opts.api_key,
      base_url: opts.base_url ?? "https://tgcore.ryzenths.dpdns.org",
      timeout_ms: opts.timeout_ms ?? 30000
    })

    this.calls = new CallMethods(this)
    this.raw = new RawMethods(this)
    this.x = new OrWebMethods(this)
  }

  async request(path: string, body?: any) {
    return this.http.post(path, body)
  }

}
