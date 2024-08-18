// Types
import type { User } from '@/types/api/users-types';

// Vuex
import { createStore } from 'vuex';

// Composables
import { useApi } from '@/composables/api';

export interface IUsersState {
    currentUser: User | null;
    users: User[];
}

const $api = useApi();

export const store = createStore<IUsersState>({
    state: () => ({
        currentUser: null,
        users: [],
    }),

    actions: {
        async fetchUsers({ commit }, params): Promise<void> {
            if (!$api) throw new Error('$api is not provided');

            const res = await $api.users.list(params);
            const data = await res.json();

            commit('SET_CURRENT_USER', null);
            commit('SET_USERS', Array.isArray(data) ? data : []);
        },

        setCurrentUser(store, payload) {
            store.commit('SET_CURRENT_USER', payload);
        },
    },

    mutations: {
        SET_USERS(state, payload) {
            if (!Array.isArray(payload)) return payload;

            state.users = payload;
        },

        SET_CURRENT_USER(state, payload) {
            state.currentUser = payload as User;
        },
    },
});
