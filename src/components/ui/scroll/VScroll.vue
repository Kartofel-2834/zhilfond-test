<template>
    <component
        :class="[$style.VScroll, classList]"
        :is="tag"
    >
        <div
            ref="target"
            :class="$style.content"
            @scroll="calculateScrollProgress"
        >
            <slot />
        </div>
    </component>
</template>

<script lang="ts" setup>
// Vue
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';

// Props
interface IVScrollProps {
    tag?: string;
    curtain?: boolean;
}

const $props = withDefaults(defineProps<IVScrollProps>(), {
    tag: 'div',
    curtain: false,
});

// Data
const target = ref<HTMLElement | null>(null);
const observer = ref<ResizeObserver | null>(null);
const progress = ref<number>(NaN);
const isScrollable = ref<boolean>(false);

// Lifcycle hooks
onMounted(setupResizeObserver);
onUnmounted(clearResizeObserver);

// Computed
const classList = computed(() =>
    useClassList({
        scrollable: isScrollable.value,
        curtain: $props.curtain,
        start: isScrollable.value && progress.value <= 3,
        end: isScrollable.value && progress.value >= 97,
    }),
);

// Methods
function calculateScrollProgress(): void {
    if (!$props.curtain || !target.value) return;

    const { scrollHeight, clientHeight, scrollTop } = target.value;

    isScrollable.value = scrollHeight !== clientHeight;

    const scrollRealHeight = scrollHeight - clientHeight;
    let scrollPercentage = Math.round((scrollTop / scrollRealHeight) * 100);
    scrollPercentage = scrollPercentage > 100 ? 100 : scrollPercentage;

    progress.value = scrollPercentage;
}

function setupResizeObserver(): void {
    if (!target.value) return;

    observer.value = new ResizeObserver(calculateScrollProgress);
    observer.value.observe(target.value);
}

function clearResizeObserver(): void {
    if (!observer.value) return;

    observer.value.disconnect();
    observer.value = null;
}
</script>

<style lang="scss" module>
.VScroll {
    position: relative;
    overflow: hidden;
    display: flex;

    &:before,
    &:after {
        position: absolute;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 4rem;
        background: $base-0;
        background: linear-gradient(180deg, $base-0 0%, #fff0 100%);
        pointer-events: none;
        transition:
            visibility $default-transition,
            opacity $default-transition;
    }

    &:before {
        top: 0;
    }

    &:after {
        bottom: 0;
        transform: rotate(180deg);
    }

    /* --- Flags --- */
    @include modificator(scrollable) {
        .content {
            padding: 0.6rem;
        }
    }

    @include modificator(curtain) {
        &:before,
        &:after {
            content: '';
        }

        @include exclude-modificators(scrollable) {
            &:before,
            &:after {
                opacity: 0;
                visibility: hidden;
            }
        }
    }

    @include modificator(start) {
        &:before {
            opacity: 0;
            visibility: hidden;
        }
    }

    @include modificator(end) {
        &:after {
            opacity: 0;
            visibility: hidden;
        }
    }
}

.content {
    overflow: auto;
    z-index: 1;
    width: 100%;
    padding: 0.2rem;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $base-500;
        border-radius: 100rem;
    }
}
</style>
