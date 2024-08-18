// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';
import { store } from '@/store';
import router from '@/router';

// Plugins
import deviceIsPlugin from '@/plugins/device-is';
import apiPlugin from '@/plugins/api';

// Components
import App from '@/App.vue';

const app: Application = createApp(App);

app.use(deviceIsPlugin);
app.use(apiPlugin);

// Router
app.use(router);

// Vuex
app.use(store);

app.mount('#app');
