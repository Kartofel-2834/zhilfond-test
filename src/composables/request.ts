// Types
import type {
    RequestHelper,
    RequestContext,
    RequestOptions,
    RequestOptionsParsed,
} from '@/types/composables/request-types';

export function useRequest(): RequestHelper {
    const requestUrl = import.meta.env.VITE_API_URL;

    async function request(
        this: RequestContext,
        endpoint: string,
        requestOptions = {} as RequestOptions,
    ): Promise<Response> {
        const method: string = this.method || 'GET';
        const { options, params, dataSerializer } = parseRequestOptions(requestOptions);

        const fetchOptions: RequestInit = {
            method,
            ...options,
            body: dataSerializer(options.body),
        };

        const res = await fetch(getFullUrl(endpoint, params), fetchOptions);

        if (!res.ok) {
            throw new Error(`request failed (${endpoint}|${method}) with status ${res.status}`);
        }

        return res;
    }

    function parseRequestOptions(requestOptions: RequestOptions): RequestOptionsParsed {
        const { params } = requestOptions;
        let { options, dataSerializer } = requestOptions;

        options = options || {};

        if (dataSerializer === null) {
            dataSerializer = v => v;
        } else if (dataSerializer === undefined) {
            dataSerializer = JSON.stringify;
        }

        return {
            options,
            dataSerializer,
            params: getQueryString(params || {}),
        };
    }

    function getQueryString(params: Record<string, unknown>): string {
        const result = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (!Array.isArray(value)) {
                result.append(key, `${value}`);
                continue;
            }

            value.forEach(item => result.append(key, `${item}`));
        }

        return result.toString();
    }

    function getFullUrl(endpoint: string, params: string): string {
        if (!requestUrl || typeof requestUrl !== 'string') {
            throw new Error('API base URL is not defined');
        }

        let result: string[] = [requestUrl, endpoint];
        result = result.map(urlPart => urlPart.replace(/(^\/)|(\/$)/g, ''));

        return result.join('/') + (params ? `?${params}` : '/');
    }

    return {
        get: request.bind({ method: 'GET' }),
        post: request.bind({ method: 'POST' }),
        put: request.bind({ method: 'GET' }),
        patch: request.bind({ method: 'PUT' }),
        delete: request.bind({ method: 'DELETE' }),
    };
}
