<template>
    <component
        :class="[$style.VLink, 'v-link', classList]"
        :is="tag"
        :target="currentTarget"
        :[toAttribute]="currentLink"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
// Components
import { computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';

// Props
interface IVLinkProps {
    tag: string;
    link: string | null;
    toAttribute: string;
    target: string | null;
    color: string | string[];
    breakpoints: string | string[];
    icon: string;
    preicon: string;
    disabled: boolean;
    underline: boolean;
}

const $props = withDefaults(defineProps<IVLinkProps>(), {
    tag: 'a',
    link: null,
    target: null,
    toAttribute: 'href',
    color: 'base-600',
    breakpoints: 'desktop tablet mobile',
    icon: '',
    preicon: '',
    disabled: false,
    underline: false,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: { color: $props.color },
    });
});

/**
 * Классы модификаторы компонента
 */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        disabled: $props.disabled,
        underline: $props.underline,
    }),
);

/**
 * Вычисляет и возвращает атрибут target для ссылки на основе свойств link и target.
 *
 * Для target: null работают следующие правила:
 * Если ссылка внешняя, атрибут target будет '_blank'
 * Если ссылка внутренняя, атрибут target будет '_self'.
 */
const currentTarget = computed<string | null>(() => {
    if (!$props.link || $props.disabled) return null;

    if ($props.target) return $props.target;

    const isLinkExternal = /^https?:\/\//.test($props.link);

    return isLinkExternal ? '_blank' : '_self';
});

/**
 * Url ссылки передаваемый в атрибут [toAttribute], если ссылка не пустая и не отключена.
 */
const currentLink = computed<string | null>(() => {
    if (!$props.link || $props.disabled) return null;

    return $props.link;
});
</script>

<style lang="scss" module>
.VLink {
    position: relative;
    font-size: inherit;
    user-select: none;
    cursor: pointer;
    transition:
        opacity $default-transition,
        color $default-transition;

    /* --- Colors --- */
    @include modificator(color, 'base-600') {
        @include exclude-modificators(disabled) {
            &:hover {
                color: $base-600;
            }
        }
    }
    // Todo: Add colors;

    /* --- Flags --- */
    @include modificator(underline) {
        &:after {
            content: '';
        }
    }

    @include modificator(disabled) {
        cursor: not-allowed;
    }

    @include exclude-modificators(disabled) {
        &:hover {
            &:after {
                transform: translateY(100%) scaleX(1);
            }
        }

        &:active {
            opacity: 0.8;
        }
    }

    &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: currentColor;
        transform-origin: left;
        transform: translateY(100%) scaleX(0);
        transition: transform $default-transition;
    }
}
</style>
