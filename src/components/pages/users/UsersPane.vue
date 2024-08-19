<template>
    <aside :class="[$style.UsersPane, classList]">
        <div :class="$style.back" />

        <div :class="$style.wrapper">
            <div :class="$style.title">Поиск сотрудников</div>

            <VInput
                :value="search"
                :class="$style.search"
                placeholder="Введите id или имя"
                @change="onSearchChange"
            />

            <div :class="[$style.results, $style.title]">Результаты</div>

            <UsersList
                :user="user"
                :users="users"
                :loading="loading"
                :search="search"
                @update:user="onUserChange"
            />
        </div>

        <div :class="$style.buttonWrapper">
            <VButton
                :class="$style.button"
                size="56 48"
                breakpoints="desktop mobile"
                @click="isOpen = !isOpen"
            >
                <transition
                    name="fade"
                    mode="out-in"
                >
                    <span
                        :class="$style.label"
                        :key="buttonLabel"
                    >
                        {{ buttonLabel }}
                    </span>
                </transition>
            </VButton>
        </div>
    </aside>
</template>

<script lang="ts" setup>
// Types
import type { User } from '@/types/api/users-types';

// Vue
import { ref, computed } from 'vue';

// Components
import UsersList from '@/components/pages/users/UsersList.vue';

// UI Components
import VInput from '@/components/ui/input/VInput.vue';
import VButton from '@/components/ui/button/VButton.vue';

// Composables
import { useClassList } from '@/composables/class-list';

// Props
interface IUsersPaneProps {
    search?: string;
    user?: User | null;
    users?: User[];
    loading?: boolean;
}

withDefaults(defineProps<IUsersPaneProps>(), {
    search: '',
    user: null,
    users: () => [],
    loading: false,
});

const $emit = defineEmits<{
    'update:search': [newValue: string];
    'update:user': [user: User];
}>();

// Data
const isOpen = ref<boolean>(false);

// Computed
const classList = computed(() =>
    useClassList({
        opened: isOpen.value,
    }),
);

const buttonLabel = computed<string>(() => {
    if (isOpen.value) return 'Закрыть';

    return 'Поиск сотрудников';
});

// Methods
function onSearchChange(newValue: string): void {
    $emit('update:search', newValue);
}

function onUserChange(user: User): void {
    $emit('update:user', user);
    isOpen.value = false;
}
</script>

<style lang="scss" module>
.UsersPane {
    display: flex;
    width: 28rem;
    border-right: 1px solid $base-200;

    @include respond-to('tablet-sm') {
        position: fixed;
        bottom: 0;
        left: 0;
        justify-content: center;
        width: 100%;
        padding: 2rem;
        border-right: none;

        .wrapper {
            transform: translateY(100%);
        }

        @include modificator(opened) {
            .wrapper {
                transform: none;
            }

            .back {
                visibility: visible;
                opacity: 1;
            }
        }
    }
}

.back {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition:
        visibility $default-transition,
        opacity $default-transition;

    @include respond-to(tablet-sm) {
        display: block;
    }
}

.wrapper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    padding: 3rem 2rem;
    background-color: $base-0;
    transition: transform $default-transition;

    @include respond-to(tablet-sm) {
        position: fixed;
        bottom: 9rem;
        left: 0;
        height: calc(100dvh - 12rem);
        border-radius: 1rem 1rem 0 0;
    }

    @include respond-to(mobile) {
        bottom: 8.2rem;
    }
}

.title {
    @include text(l1, m);

    color: $base-600;
    user-select: none;
}

.search,
.title {
    flex-shrink: 0;
}

.search {
    margin: 1.4rem 0 3rem 0;
}

.results {
    margin-bottom: 1.2rem;
}

.buttonWrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    display: none;
    width: 100%;
    padding: 2rem;
    background-color: $base-0;
    border-radius: 1rem 1rem 0 0;
    border: 1px solid $base-200;

    @include respond-to(tablet-sm) {
        display: block;
    }
}

.button:global(.v-button) {
    width: 100%;
}
</style>
