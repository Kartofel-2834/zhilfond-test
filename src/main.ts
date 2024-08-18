// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';
import router from '@/router';

// Plugins
import deviceIsPlugin from './plugins/device-is';
import apiPlugin from './plugins/api';

// Components
import App from '@/App.vue';

const app: Application = createApp(App);

app.use(deviceIsPlugin);
app.use(apiPlugin);

// Router
app.use(router);

app.mount('#app');
