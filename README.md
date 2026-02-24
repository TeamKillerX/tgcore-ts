# Getting started
```ts
import { Client } from "@xtsea/tgcore-ts"

const tg = new Client({ api_key: "fw_live_xxx" })

await tg.raw.sendMessage({
  chat_id: -1001234567890,
  text: "Hello from tgcore-ts"
})
```

* Source: https://github.com/TeamKillerX/tgcore
