// Types
import type { App, Plugin } from 'vue';

// Composables
import { useApi } from '@/composables/api';

function apiPluginInit(app: App): void {
    const $api = useApi();

    app.provide('api', $api);
    app.config.globalProperties.$api = $api;
}

const apiPlugin: Plugin = { install: apiPluginInit };

export default apiPlugin;
