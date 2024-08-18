<template>
    <label :class="[$style.VInput, 'v-input', classList]">
        <slot name="preicon">
            <VIcon
                v-if="preicon"
                :size="iconSize"
                :icon="preicon"
                :class="[$style.icon, $style._left, 'v-input__icon']"
            />
        </slot>

        <input
            :class="$style.target"
            :value="currentValue"
            :placeholder="placeholder"
            :disabled="disabled"
            spellcheck="false"
            @input="onInput"
        />

        <slot name="icon">
            <VIcon
                v-if="icon"
                :class="[$style.icon, $style._right, 'v-input__icon']"
                :icon="icon"
                :size="iconSize"
            />
        </slot>
    </label>
</template>

<script lang="ts" setup>
// Vue
import { computed } from 'vue';

// Composables
import { useDeviceProperties } from '@/composables/device-properties';
import { useClassList } from '@/composables/class-list';

// Components
import VIcon from '@/components/ui/icon/VIcon.vue';

interface IVInputProps {
    value: string | null;
    modelValue: string | null;
    size: string | string[];
    breakpoints: string | string[];
    icon: string;
    iconSize: string | number | null;
    preicon: string;
    disabled: boolean;
    placeholder: string;
}

const $props = withDefaults(defineProps<Partial<IVInputProps>>(), {
    value: null,
    modelValue: null,
    size: '48',
    breakpoints: 'desktop tablet mobile',
    icon: '',
    iconSize: null,
    preicon: '',
    disabled: false,
    placeholder: '',
});

const $emit = defineEmits<{
    change: [value: string];
    'update:modelValue': [value: string];
}>();

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties({
        devices: $props.breakpoints,
        properties: { size: $props.size },
    });
});

/**
 * Классы модификаторы компонента
 */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        disabled: $props.disabled,
    }),
);

const currentValue = computed(() => ($props.value ?? $props.modelValue) || '');

// Methods
function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;

    $emit('change', newValue);
    $emit('update:modelValue', newValue);
}
</script>

<style lang="scss" module>
.VInput {
    display: flex;
    flex-wrap: nowrap;
    border: 2px solid;
    border-color: $base-100;
    border-radius: 0.8rem;
    cursor: text;
    transition:
        color $default-transition,
        border-color $default-transition;

    /* --- Sizes --- */
    @include modificator(size, 48) {
        height: 4.8rem;
        font-size: 1.4rem;
        padding: 0 1.2rem;
    }

    &:has(.target:focus) {
        border-color: currentColor;
    }
}

.target {
    font-size: inherit;
    font-weight: inherit;
}
</style>
