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

import { PinterestBuilder } from "./pinterest"

export class OrWebMethods {
  constructor(private client: any) {}

  pinterest() {
    return new PinterestBuilder(
      this.client,
      "/api/web/pinterest"
    )
  }
}
