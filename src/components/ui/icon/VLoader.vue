<template>
    <VIcon
        :class="[$style.VLoader, 'v-loader']"
        icon="loader"
        v-bind="$attrs"
    />
</template>

<script setup>
// UI Components
import VIcon from '@/components/ui/icon/VIcon.vue';
</script>

<style lang="scss" module>
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.VLoader {
    animation: rotate 1.8s linear infinite;
}
</style>
