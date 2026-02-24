type HttpOptions = {
    api_key: string;
    base_url: string;
    timeout_ms: number;
};
declare class Http {
    private opts;
    constructor(opts: HttpOptions);
    post(path: string, body: any): Promise<any>;
}

declare class RawMethods {
    private http;
    constructor(http: Http);
    sendMessage(params: {
        chat_id: string | number;
        text: string;
        parse_mode?: string;
        reply_markup?: any;
    }): Promise<any>;
    getMe(): Promise<any>;
}

declare abstract class BaseCallBuilder<T = any> {
    protected http: any;
    protected path: string;
    protected params: Record<string, any>;
    constructor(http: any, path: string);
    protected set(key: string, value: any): this;
    execute(): Promise<T>;
    throw(): Promise<T>;
    build(): Record<string, any>;
}

declare class SendMessageBuilder extends BaseCallBuilder {
    chatId(id: string | number): this;
    text(text: string): this;
    parseMode(mode: "HTML" | "Markdown" | "MarkdownV2"): this;
    disableNotification(value: boolean): this;
    protectContent(value: boolean): this;
    replyMarkup(markup: any): this;
    linkPreviewOptions(options: any): this;
}

declare class CallMethods {
    private http;
    constructor(http: any);
    sendMessage(): SendMessageBuilder;
}

type ClientOptions = {
    api_key: string;
    base_url?: string;
    timeout_ms?: number;
};
declare class Client {
    private http;
    raw: RawMethods;
    calls: CallMethods;
    constructor(opts: ClientOptions);
}

export { Client, type ClientOptions };
