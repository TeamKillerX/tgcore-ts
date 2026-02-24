# Getting started
```ts
import { Client } from "@xtsea/tgcore-ts"

const tg = new Client({ api_key: "fw_live_xxx" })

await tg.raw.sendMessage({
  chat_id: -1001234567890,
  text: "Hello from tgcore-ts"
})
```

## Why TGCore?

Unlike traditional Telegram SDKs, TGCore is built as a **secure middleware layer** that prevents token leaks, enforces API-key auth, and supports enterprise-grade scaling.

Designed for production, not demos.

## Compared to Native Telegram API

| Feature | Telegram API | TGCore |
|-------|--------------|--------|
Token Exposure | Yes | No |
Auth Layer | None | API Key + Secret |
Proxy Support | Manual | Built-in |
Multi Bot | Limited | Yes |
Webhook Security | Basic | Zero-Trust |

## 🧾 License

Licensed under Apache License 2.0

You may:

- use commercially
- modify
- distribute
- sublicense

---

## 🤝 Contributing

Pull requests welcome.
For major changes, open an issue first to discuss what you would like to change.

---

* Source: https://github.com/TeamKillerX/tgcore
