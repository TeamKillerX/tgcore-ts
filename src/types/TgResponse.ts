export type TgResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}
