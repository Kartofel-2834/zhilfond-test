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

// Props
interface IVIconProps {
    icon: string;
    size?: string | number | null;
}

const $props = withDefaults(defineProps<IVIconProps>(), {
    size: null,
});

const iconData = ref<string>('');
const iconAttributes = ref<Record<string, string>>({});

// Lifecycle hooks
onMounted(updateIcon);

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

watch(() => $props.icon, updateIcon);

/**
 * Метод для загрузки и отображения контента svg иконки
 */
async function updateIcon(): Promise<void> {
    try {
        const icon = await import(`../../../assets/icons/${$props.icon}.svg`);
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
