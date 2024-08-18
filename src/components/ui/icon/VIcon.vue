<template>
    <svg
        v-html="iconData"
        v-bind="iconAttributes"
        :class="[$style.VIcon, 'v-icon']"
        :style="customSize"
    ></svg>
</template>

<script lang="ts" setup>
// Vue
import { ref, computed, watch, onMounted } from 'vue';

const basePath: string = import.meta.env.BASE_URL || '/';

// Props
interface IVIconProps {
    icon: string;
    srcPath?: string;
    size?: string | number | null;
}

const $props = withDefaults(defineProps<IVIconProps>(), {
    srcPath: 'icons/',
    size: null,
});

const iconData = ref<string>('');
const iconAttributes = ref<Record<string, string>>({});

// Lifecycle hooks
onMounted(updateIcon);

/**
 * Путь к svg файлу иконки
 */
const iconPath = computed<string>(() => `${basePath}${$props.srcPath}${$props.icon}.svg?raw`);

/**
 * Если проп size указан, то width: size в ремах / 10
 */
const customSize = computed<Partial<Record<string, string>>>(() => {
    let formattedSize: number = Number($props.size);

    if (!$props.size || isNaN(formattedSize)) {
        return {};
    }

    formattedSize = formattedSize / 10;

    return {
        width: `${formattedSize}rem`,
        height: `${formattedSize}rem`,
    };
});

watch(() => iconPath?.value, updateIcon);

/**
 * Метод для загрузки и отображения контента svg иконки
 *
 * @throws Бросит ошибку, если iconPath не валидный.
 */
async function updateIcon(): Promise<void> {
    try {
        const icon = await import(/* @vite-ignore */ iconPath.value);
        const data = icon?.default && typeof icon?.default === 'string' ? icon.default : '';

        const iconWrapper = document.createElement('div');
        iconWrapper.innerHTML = data;

        const iconElement = iconWrapper.querySelector('svg');

        if (!iconElement || !iconElement?.attributes) {
            throw new Error('Invalid data');
        }

        const updatedAttributes: Record<string, string> = {};

        for (const attribute of iconElement.attributes) {
            updatedAttributes[attribute.name] = attribute.value;
        }

        iconData.value = iconElement.innerHTML;
        iconAttributes.value = updatedAttributes;
    } catch (err) {
        console.warn(`[VIcon/updateIcon] Failed to load icon: ${$props.icon}`, err);
    }
}
</script>

<style lang="scss" module>
.VIcon {
    color: inherit;
}
</style>
