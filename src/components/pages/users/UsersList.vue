<template>
    <transition-group
        :class="$style.UsersList"
        tag="div"
        name="fade"
        mode="out-in"
    >
        <VScroll
            v-show="!loading && users.length"
            key="list"
            curtain
        >
            <ul :class="$style.list">
                <UserCard
                    v-for="listUser of users"
                    :key="`UserCard_${listUser.id}`"
                    :class="$style.userCard"
                    :user="listUser"
                    :active="!!user && listUser.id === user.id"
                    tag="li"
                    @click="onUserClick(listUser)"
                />
            </ul>
        </VScroll>

        <div
            v-show="loading"
            key="loader"
            :class="$style.loader"
        >
            <VLoader size="40" />
        </div>

        <div
            v-show="!loading && !users.length"
            key="nodata"
            :class="$style.nodata"
        >
            <transition
                name="fade"
                mode="out-in"
            >
                <span :key="nodataLabel">
                    {{ nodataLabel }}
                </span>
            </transition>
        </div>
    </transition-group>
</template>

<script lang="ts" setup>
// Types
import type { User } from '@/types/api/users-types';

// Vue
import { computed } from 'vue';

// Components
import UserCard from '@/components/pages/users/UserCard.vue';

// UI Components
import VScroll from '@/components/ui/scroll/VScroll.vue';
import VLoader from '@/components/ui/icon/VLoader.vue';

// Props
interface IUsersListProps {
    user: User | null;
    users?: User[];
    search?: string;
    loading?: boolean;
}

const $props = withDefaults(defineProps<IUsersListProps>(), {
    users: () => [],
    search: '',
    loading: false,
});

const $emit = defineEmits<{
    'update:user': [user: User];
}>();

// Computed
const nodataLabel = computed<string>(() => ($props.search ? 'ничего не найдено' : 'начните поиск'));

// Methods
function onUserClick(user: User) {
    $emit('update:user', user);
}
</script>

<style lang="scss" module>
.UsersList {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    flex-basis: 100%;

    & > * {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
    }
}

.list {
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    flex-basis: 100%;
}

.loader {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: $base-0;

    :global(.v-loader) {
        flex-shrink: 0;
        width: 4rem;
    }
}

.userCard {
    flex-shrink: 0;
}
</style>
