<template>
    <component
        :is="tag"
        :class="[$style.UserCard, classList]"
    >
        <div :class="$style.imageWrapper">
            <img src="/images/default-image.png" />
        </div>

        <div :class="$style.content">
            <div
                v-if="user?.username"
                :class="$style.username"
            >
                {{ user.username }}
            </div>

            <div
                v-if="user?.email"
                :class="$style.email"
            >
                {{ user.email }}
            </div>
        </div>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { User } from '@/types/api/users-types';

// Vue
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';

// Props
interface IUserCardProps {
    tag?: string;
    user: User;
    active?: boolean;
}

const $props = withDefaults(defineProps<IUserCardProps>(), {
    tag: 'div',
    active: false,
});

// Computed
const classList = computed(() =>
    useClassList({
        active: $props.active,
    }),
);
</script>

<style lang="scss" module>
.UserCard {
    overflow: hidden;
    display: flex;
    border-radius: 1rem;
    border: 1px solid transparent;
    box-shadow: $base-shadow;
    user-select: none;
    cursor: pointer;
    transition: border-color $default-transition;

    /* --- Flags --- */
    @include modificator(active) {
        border-color: $base-200;
        pointer-events: none;

        .content {
            background-color: $base-200;
        }
    }

    &:hover {
        border-color: $base-100;

        .content {
            background-color: $base-100;
        }
    }
}

.imageWrapper {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 7rem;
    height: 7rem;
    border-right: 1px solid $base-200;

    img {
        height: 100%;
        object-fit: cover;
    }
}

.content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    padding: 1.4rem;
    transition: background-color $default-transition;
}

.username,
.email {
    @include text-ellipsis(1);
    @include text(t1);

    display: block;
}

.username {
    color: $base-600;
    font-weight: 600;
}
</style>
