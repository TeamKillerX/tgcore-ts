/*
# Copyright 2026 Randy W
# Licensed under the Apache License, Version 2.0

# Github Author: https://github.com/TeamKillerX/
# Code: @zxyeor

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

# http://www.apache.org/licenses/LICENSE-2.0
*/

export abstract class BaseCallBuilder<T = any> {
  protected params: Record<string, any> = {}

  constructor(
    protected http: any,
    protected path: string
  ) {}

  protected set(key: string, value: any) {
    if (value !== undefined) {
      this.params[key] = value
    }
    return this
  }

  async execute(): Promise<T> {
    return this.http.post(this.path, this.params)
  }

  async throw(): Promise<T> {
    const res: any = await this.execute()
    if (!res?.ok) {
      throw new Error(JSON.stringify(res))
    }
    return res
  }

  build() {
    return this.params
  }
}
