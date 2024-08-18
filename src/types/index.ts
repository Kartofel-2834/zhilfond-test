// Types
import type { App } from 'vue';

/**
 * Интерфейс для плагинов Vue
 */
export interface IVuePlugin<T = unknown> {
    install: (app: App, options?: T) => void;
}

export type ApiPart = Record<string, (...args: any[]) => Promise<Response>>;

export type Api = Record<string, ApiPart>;
