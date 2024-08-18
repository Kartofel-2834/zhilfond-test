<template>
    <component
        :is="tag"
        :class="$style.UserDetail"
    >
        <div :class="$style.imageWrapper">
            <img src="/images/default-image.png" />
        </div>

        <VScroll curtain>
            <div :class="$style.info">
                <!-- User's name -->
                <div
                    v-if="user?.name"
                    :class="$style.name"
                >
                    {{ user.name }}
                </div>

                <!-- Details -->
                <ul
                    v-if="Object.keys(details).length"
                    :class="$style.detailsList"
                >
                    <li
                        v-for="(value, property) in details"
                        :key="`UserDetail_${property}`"
                        :class="$style.detail"
                    >
                        <span :class="$style.label"> {{ property }}: </span>

                        {{ value }}
                    </li>
                </ul>

                <!-- About -->
                <div :class="$style.about">О себе</div>

                <div :class="$style.aboutText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </VScroll>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { User } from '@/types/api/users-types';

// Vue
import { computed } from 'vue';

// Components
import VScroll from '@/components/ui/scroll/VScroll.vue';

// Props
interface IUserDetailProps {
    tag?: string;
    user: User;
}

const $props = withDefaults(defineProps<IUserDetailProps>(), {
    tag: 'div',
});

// Computed
const details = computed<Record<string, string>>(() => {
    const result: Record<string, string> = {};

    if ($props.user?.email) result.email = $props.user.email;
    if ($props.user?.phone) result.phone = $props.user.phone;

    return result;
});
</script>

<style lang="scss" module>
.UserDetail {
    display: flex;
    gap: 6rem;
    width: 100%;
    padding: 3rem;

    @include respond-to(tablet) {
        flex-direction: column;
        align-items: center;
        gap: 3rem;
    }

    @include respond-to(tablet-sm) {
        padding: 3rem 1rem;
    }
}

.imageWrapper {
    overflow: hidden;
    flex-shrink: 0;
    width: 42.4rem;
    height: auto;
    max-width: 100%;
    max-height: 100%;

    img {
        width: 100%;
        object-fit: cover;
    }

    @include respond-to(tablet) {
        width: 36.4rem;
    }
}

.info {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include respond-to(tablet) {
        max-width: 50rem;
    }

    @include respond-to(tablet-sm) {
        max-width: none;
    }
}

.name,
.about {
    @include text(l1, m);

    color: $base-600;
}

.name {
    margin-bottom: 1rem;
}

.about {
    margin-bottom: 2.4rem;
    user-select: none;
}

.detailsList {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 2.2rem;
}

.detail {
    @include text(t1);

    display: flex;
    flex-wrap: nowrap;
    gap: 0.6rem;

    .label {
        font-weight: 600;
        color: $base-600;
        user-select: none;
    }
}

.aboutText {
    @include text(t1);
}
</style>
