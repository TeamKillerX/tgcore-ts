export type ClientOptions = {
  api_key: string
  base_url?: string
  timeout_ms?: number
  user_agent?: string
  headers?: Record<string, string>
}

export type ApiResponse<T = any> = {
  ok: boolean
  data?: T
  error?: string
  detail?: any
}
