"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Client: () => Client
});
module.exports = __toCommonJS(index_exports);

// src/http.ts
var Http = class {
  constructor(opts) {
    this.opts = opts;
  }
  async post(path, body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.opts.timeout_ms);
    try {
      const res = await fetch(this.opts.base_url + path, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": this.opts.api_key
        },
        body: JSON.stringify(body ?? {}),
        signal: controller.signal
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
      }
      return json;
    } finally {
      clearTimeout(timeout);
    }
  }
};

// src/raw/methods.ts
var RawMethods = class {
  constructor(http) {
    this.http = http;
  }
  sendMessage(params) {
    return this.http.post("/api/v2/sendMessage", params);
  }
  getMe() {
    return this.http.post("/api/v2/getMe", {});
  }
};

// src/calls/base.ts
var BaseCallBuilder = class {
  constructor(http, path) {
    this.http = http;
    this.path = path;
    this.params = {};
  }
  set(key, value) {
    if (value !== void 0) {
      this.params[key] = value;
    }
    return this;
  }
  async execute() {
    return this.http.post(this.path, this.params);
  }
  async throw() {
    const res = await this.execute();
    if (!res?.ok) {
      throw new Error(JSON.stringify(res));
    }
    return res;
  }
  build() {
    return this.params;
  }
};

// src/calls/sendMessage.ts
var SendMessageBuilder = class extends BaseCallBuilder {
  chatId(id) {
    return this.set("chat_id", id);
  }
  text(text) {
    return this.set("text", text);
  }
  parseMode(mode) {
    return this.set("parse_mode", mode);
  }
  disableNotification(value) {
    return this.set("disable_notification", value);
  }
  protectContent(value) {
    return this.set("protect_content", value);
  }
  replyMarkup(markup) {
    return this.set("reply_markup", markup);
  }
  linkPreviewOptions(options) {
    return this.set("link_preview_options", options);
  }
};

// src/calls/index.ts
var CallMethods = class {
  constructor(http) {
    this.http = http;
  }
  sendMessage() {
    return new SendMessageBuilder(
      this.http,
      "/api/v2/sendMessage"
    );
  }
};

// src/client.ts
var Client = class {
  constructor(opts) {
    if (!opts?.api_key) {
      throw new Error("tgcore-ts: api_key is required");
    }
    this.http = new Http({
      api_key: opts.api_key,
      base_url: opts.base_url ?? "https://services-pro.ryzenths.dpdns.org",
      timeout_ms: opts.timeout_ms ?? 3e4
    });
    this.calls = new CallMethods(this.http);
    this.raw = new RawMethods(this.http);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Client
});
