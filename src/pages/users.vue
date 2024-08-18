<template>
    <div :class="[$style.UsersPage, 'container']">
        <section :class="$style.wrapper">
            <UsersPane
                v-model:search="search"
                :class="$style.usersPane"
                :user="currentUser"
                :users="usersList"
                :loading="isLoading"
                @update:user="onUserUpdate"
            />

            <transition
                name="fade"
                mode="out-in"
            >
                <UserDetail
                    v-if="currentUser"
                    :key="currentUser.id"
                    :user="currentUser"
                    tag="article"
                />

                <div
                    v-else
                    :class="$style.nodata"
                >
                    Выберите сотрудника, чтобы посмотреть его профиль
                </div>
            </transition>
        </section>
    </div>
</template>

<script lang="ts" setup>
// Types
import type { User } from '@/types/api/users-types';
// import type { Api } from '@/types/composables/api-types';
import type { IUsersState } from '@/store';

// Vue
import { ref, watch, computed } from 'vue';

// Vuex
import { useStore } from 'vuex';

// Utils
import { sleep } from '@/assets/ts/utils/common-utils';

// Components
import UsersPane from '@/components/pages/users/UsersPane.vue';
import UserDetail from '@/components/pages/users/UserDetail.vue';

// const $api = inject<Api>('api');
const $store = useStore<IUsersState>();

// Data
const search = ref<string>('');
const prevSearch = ref<string | null>(null);

const timeoutId = ref<number>(NaN);
const isLoading = ref<boolean>(false);

// Watchers
watch(() => search.value, onSearchUpdate);

// Computed
const currentUser = computed<User | null>(() => $store.state.currentUser);
const usersList = computed<User[]>(() => $store.state.users);

// Methods
function onSearchUpdate(newValue: string, oldValue: string): void {
    if (prevSearch.value === null) prevSearch.value = oldValue;

    clearTimeout(timeoutId.value);

    timeoutId.value = setTimeout(() => {
        if (prevSearch.value !== search.value) fetchUsers();

        prevSearch.value = null;
    }, 500);
}

function onUserUpdate(user: User): void {
    $store.dispatch('setCurrentUser', user);
}

async function fetchUsers(): Promise<void> {
    const start = Date.now();

    try {
        isLoading.value = Boolean(search.value);

        const params = getSearchParams();
        await $store.dispatch('fetchUsers', params);

        const loadingTime = Date.now() - start;

        if (loadingTime < 600 && isLoading.value) await sleep(600 - loadingTime);
    } catch (err) {
        console.warn('[UsersPage/fetchUsers] request error:', err);
    } finally {
        isLoading.value = false;
    }
}

function getSearchParams(): Record<string, string[]> {
    let value = search.value.split(',');
    value = value.map(item => item.trim());
    value = value.filter(Boolean);

    let property: string = 'username';

    if (value.every(item => /^[0-9]+$/.test(item))) {
        property = 'id';
    }

    return { [property]: value };
}
</script>

<style lang="scss" module>
.UsersPage {
    display: flex;
    width: 100%;
    height: calc(100dvh - 11.2rem);
    padding-bottom: 2rem;

    @include respond-to(tablet-sm) {
        height: auto;
        min-height: calc(100dvh - 11.2rem);
        padding-bottom: 11rem;
    }
}

.wrapper {
    display: flex;
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 0 10px 0 #0000001a;
}

.usersPane {
    z-index: 10;
    flex-shrink: 0;
}

.nodata {
    @include text(t1);

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    pointer-events: none;
}
</style>
