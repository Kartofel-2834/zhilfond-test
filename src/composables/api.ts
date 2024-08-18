// Types
import type { Api, ApiPart } from '@/types/composables/api-types';
import type { RequestHelper } from '@/types/composables/request-types';

// Composables
import { useRequest } from '@/composables/request';

// Api parts
import users from '@/api/users';

const apiParts: Record<string, ($request: RequestHelper) => ApiPart> = {
    users,
};

export function useApi(): Api {
    const $request = useRequest();
    const $api: Api = {};

    for (const [apiKey, apiGetter] of Object.entries(apiParts)) {
        $api[apiKey] = apiGetter($request);
    }

    return $api;
}
