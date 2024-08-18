export type ApiPart = Record<string, (...args: any[]) => Promise<Response>>;

export type Api = Record<string, ApiPart>;
