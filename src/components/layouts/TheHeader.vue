<template>
    <header :class="$style.TheHeader">
        <div :class="[$style.wrapper, 'container']">
            <VIcon
                :class="$style.logo"
                icon="logo"
            />

            <span :class="$style.label"> Пользователь </span>
        </div>
    </header>
</template>

<script lang="ts" setup>
// Components
import VIcon from '@/components/ui/icon/VIcon.vue';
</script>

<style lang="scss" module>
.TheHeader {
    width: 100%;
}

.wrapper {
    display: flex;
    justify-content: space-between;
    padding-top: 5.2rem;
    padding-bottom: 2rem;

    @include respond-to(tablet-sm) {
        align-items: center;
    }
}

.label {
    pointer-events: none;
}

.logo {
    width: 17rem;
    height: 4rem;

    @include respond-to(tablet-sm) {
        width: 14rem;
        height: 3rem;
    }
}
</style>
