// Types
import type { App } from 'vue';
import type { IVuePlugin, Api } from '@/types';

// Composables
import { useRequest } from '@/composables/request';

// Api parts
import users from '@/api/users';

const apiParts = {
    users,
};

function apiPluginInit(app: App): void {
    const $request = useRequest();
    const $api: Api = {};

    for (const [apiKey, apiGetter] of Object.entries(apiParts)) {
        $api[apiKey] = apiGetter($request);
    }

    app.provide('api', $api);
    app.config.globalProperties.$api = $api;
}

const apiPlugin: IVuePlugin = { install: apiPluginInit };

export default apiPlugin;
