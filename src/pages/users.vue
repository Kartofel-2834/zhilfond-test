<template>
    <div :class="[$style.UsersPage, 'container']">
        <section :class="$style.wrapper">
            <UsersPane
                v-model:user="currentUser"
                v-model:search="search"
                :class="$style.usersPane"
                :users="usersPane"
                :loading="isLoading"
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
import type { Api } from '@/types/';

// Vue
import { ref, inject, watch, onMounted } from 'vue';

// Utils
import { sleep } from '@/assets/ts/utils/common-utils';

// Components
import UsersPane from '@/components/pages/users/UsersPane.vue';
import UserDetail from '@/components/pages/users/UserDetail.vue';

const $api = inject<Api>('api');

// Data
const usersPane = ref<User[]>([]);
const currentUser = ref<User | null>(null);

const search = ref<string>('');
const prevSearch = ref<string | null>(null);

const timeoutId = ref<number>(NaN);
const isLoading = ref<boolean>(false);

// Lifecycle hooks
onMounted(fetchUsers);

// Watchers
watch(() => search.value, onSearchUpdate);

// Methods
function onSearchUpdate(newValue: string, oldValue: string): void {
    if (prevSearch.value === null) prevSearch.value = oldValue;

    clearTimeout(timeoutId.value);

    timeoutId.value = setTimeout(() => {
        if (prevSearch.value !== search.value) fetchUsers();

        prevSearch.value = null;
    }, 1000);
}

async function fetchUsers(): Promise<void> {
    const start = Date.now();

    try {
        if (!$api) throw new Error('$api is not provided');

        isLoading.value = true;

        const params = getSearchParams();
        const res = await $api.users.list(params);

        const data = await res.json();
        const loadingTime = Date.now() - start;

        if (loadingTime < 600) await sleep(600 - loadingTime);

        currentUser.value = null;
        usersPane.value = Array.isArray(data) ? data : [];
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
