type HttpOptions = {
  api_key: string
  base_url: string
  timeout_ms: number
}

export class Http {
  constructor(private opts: HttpOptions) {}

  async post(path: string, body: any) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.opts.timeout_ms)

    try {
      const res = await fetch(this.opts.base_url + path, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": this.opts.api_key
        },
        body: JSON.stringify(body ?? {}),
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
