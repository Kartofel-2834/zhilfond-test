<template>
    <TheHeader />

    <main>
        <router-view v-slot="{ Component }">
            <transition
                name="fade"
                mode="out-in"
            >
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script setup>
// Components
import TheHeader from '@/components/layouts/TheHeader.vue';
</script>

<style lang="scss" src="@/assets/scss/default.scss" />
<style lang="scss" src="@/assets/scss/reset.scss" />
