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

import { BaseCallBuilder } from "../calls/base"

export class PinteRestBuilder extends BaseCallBuilder {

  query(text: string) {
    return this.set("query", text)
  }

  limit(limit: number = 10) {
    return this.set("limit", limit)
  }
}
