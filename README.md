<h1 align="center">TGCore TS SDK</h1>
<p align="center">
Enterprise Telegram Bot Framework • Secure • Scalable • Zero-Trust Ready
</p>

<p align="center">
<img src="https://img.shields.io/badge/Framework-TGCore-black?style=for-the-badge">
<img src="https://img.shields.io/badge/API-Services%20Pro-purple?style=for-the-badge">
<img src="https://img.shields.io/badge/Security-AES--256%20GCM-green?style=for-the-badge">
</p>

![Maintained](https://img.shields.io/badge/maintained-yes-success?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
![Security](https://img.shields.io/badge/security-audited-blue?style=flat-square)
![Architecture](https://img.shields.io/badge/architecture-clean-lightgrey?style=flat-square)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-05998b?style=flat-square)
![MongoDB](https://img.shields.io/badge/database-MongoDB-4ea94b?style=flat-square)
![Async](https://img.shields.io/badge/async-native-orange?style=flat-square)
![Webhook](https://img.shields.io/badge/webhook-supported-blueviolet?style=flat-square)
![tgcore](https://img.shields.io/badge/TGCore-SDK-black)

[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)

![npm](https://img.shields.io/npm/v/@xtsea/tgcore-ts)
![downloads](https://img.shields.io/npm/dm/@xtsea/tgcore-ts)
![license](https://img.shields.io/npm/l/@xtsea/tgcore-ts)

## Install

```bash
npm install @xtsea/tgcore-ts
```

## Getting started

```ts
import { tgcore, KeyboardBuilder } from "@xtsea/tgcore-ts"

// old version: 0.1.9 new Client({})

const tg = tgcore({ api_key: "fw_live_xxx" }) // latest version

await tg.raw.sendMessage({
  chat_id: -1001234567890,
  text: "Hello from tgcore-ts"
})


const keyboard = KeyboardBuilder
  .inline()
  .callback("Yes", "yes")
  .callback("No", "no")
  .build()

await tg.calls
  .sendMessage()
  .chatId(123)
  .text("Confirm?")
  .replyMarkup(keyboard)
  .execute()
```

## Reference Backend (FastAPI)
**Optional features**

☐ Proxy support  
☐ Webhook support  
☐ TypeScript full-stack integration  
☐ Multi bot token support  
☐ Web-based API key management  
☐ Security audit logging  
☐ AES-256-GCM encryption

**Optional:** AES-256-GCM encryption for sensitive tokens
```py
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

async def get_database_from_mongodb(public_id: str):
    # You need to add a database for example (mongodb, redis)
    # Optional: AES-256-GCM
    pass

class SendMessageBody(BaseModel):
    # your own code
    chat_id: int
    text: str

@router.post("/api/v2/sendMessage")
async def send_message(body: SendMessageBody):
    token = await get_database_from_mongodb("public_id_here")
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.post(
                url,
                json=body.model_dump(exclude_none=True)
            )
        data = r.json() if r.headers.get("content-type", "").startswith("application/json") else {"raw": r.text}
        return {"ok": bool(data.get("ok", False)) and r.status_code == 200, "data": data}

    except httpx.HTTPError as e:
        raise HTTPException(502, f"Telegram request failed: {e}")
    except Exception as e:
        raise HTTPException(500, str(e))
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
