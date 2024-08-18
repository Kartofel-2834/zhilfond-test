export type RequestContext = {
    method?: string;
};

export type RequestDataSerializer = (v: any) => any;

export type RequestOptions = {
    options?: RequestInit;
    dataSerializer?: RequestDataSerializer | null;
    params?: Record<string, unknown>;
};

export type RequestOptionsParsed = {
    options: RequestInit;
    dataSerializer: RequestDataSerializer;
    params: string;
};

export type Request = (
    this: RequestContext,
    endpoint: string,
    requestOptions?: RequestOptions,
) => Promise<Response>;

export type RequestBinded = (
    endpoint: string,
    requestOptions?: RequestOptions,
) => Promise<Response>;

export type RequestBaseMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RequestHelper = {
    get: RequestBinded;
    post: RequestBinded;
    put: RequestBinded;
    patch: RequestBinded;
    delete: RequestBinded;
};
