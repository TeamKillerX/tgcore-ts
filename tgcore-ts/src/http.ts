import type { ApiResponse, ClientOptions } from "./types"

export class Http {
  private opts: Required<Pick<ClientOptions, "base_url" | "timeout_ms" | "user_agent">> & ClientOptions

  constructor(opts: ClientOptions) {
    this.opts = {
      base_url: opts.base_url ?? "https://services-pro.ryzenths.dpdns.org",
      timeout_ms: opts.timeout_ms ?? 30_000,
      user_agent: opts.user_agent ?? "tgcore-ts/0.1.0",
      ...opts,
    }
  }

  setHeader(key: string, value: string) {
    this.opts.headers = { ...(this.opts.headers ?? {}), [key]: value }
  }

  setBaseUrl(url: string) {
    this.opts.base_url = url
  }

  async post<T = any>(path: string, body: any): Promise<ApiResponse<T>> {
    const url = this.opts.base_url.replace(/\/$/, "") + path
    const ac = new AbortController()
    const t = setTimeout(() => ac.abort(), this.opts.timeout_ms)

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "user-agent": this.opts.user_agent,
          "x-api-key": this.opts.api_key,
          ...(this.opts.headers ?? {}),
        },
        body: JSON.stringify(body ?? {}),
        signal: ac.signal,
      })

      const json = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        return { ok: false, error: "HTTP_ERROR", detail: json ?? { status: res.status } }
      }
      return json as ApiResponse<T>
    } finally {
      clearTimeout(t)
    }
  }

  async get<T = any>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const qs = params ? "?" + new URLSearchParams(Object.entries(params).map(([k,v]) => [k, String(v)])).toString() : ""
    const url = this.opts.base_url.replace(/\/$/, "") + path + qs

    const ac = new AbortController()
    const t = setTimeout(() => ac.abort(), this.opts.timeout_ms)

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "accept": "application/json",
          "user-agent": this.opts.user_agent,
          "x-api-key": this.opts.api_key,
          ...(this.opts.headers ?? {}),
        },
        signal: ac.signal,
      })

      const json = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        return { ok: false, error: "HTTP_ERROR", detail: json ?? { status: res.status } }
      }
      return json as ApiResponse<T>
    } finally {
      clearTimeout(t)
    }
  }
}
