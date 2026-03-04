export type MiddlewareContext = {
  method: string
  payload?: any
}

export type Middleware = (
  ctx: MiddlewareContext,
  next: () => Promise<any>
) => Promise<any>
