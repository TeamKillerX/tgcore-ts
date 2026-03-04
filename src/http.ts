type HttpOptions = {
  api_key: string
  base_url: string
  timeout_ms: number
}

export type HttpContext = {
  path: string
  body?: any
}

export class Http {
  constructor(private opts: HttpOptions) {}

  async post(ctx: HttpContext) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.opts.timeout_ms)

    try {
      const res = await fetch(this.opts.base_url + ctx.path, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": this.opts.api_key
        },
        body: JSON.stringify(ctx.body ?? {}),
        signal: controller.signal
      })

      const json = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`)
      }

      return json

    } finally {
      clearTimeout(timeout)
    }
  }
}
