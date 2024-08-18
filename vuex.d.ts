import type { Store } from 'vuex';

declare module 'vuex' {
    type IStore<T> = T & {
        state: T;
        commit(mutationName: string, payload: unknown): void;
        dispatch(actionName: string, payload: unknown): void | Promise<void>;
    };

    type Mutation<TState extends Object> = (store: IStore<TState>, payload: unknown) => void;

    type Action<TState extends Object> = (
        state: IStore<TState>,
        payload: unknown,
    ) => void | Promise<void>;

    interface Module<TState extends Object> {
        state: () => TState;
        mutations?: Record<string, Mutation<TState>>;
        actions?: Record<string, Action<TState>>;
    }

    interface StoreOptions<TState extends Object> extends Module<TState> {
        modules?: Record<string, Module<TState>>;
    }

    function createStore<TState extends Object>(options: StoreOptions<TState>): Store<TState>;
    function useStore<TState>(): IStore<TState>;
}
