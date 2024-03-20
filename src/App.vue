<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import DefaultLayout from './layouts/Master.vue';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const route = useRoute();
const router = useRouter();

// Computed
const layout = computed(() => route.meta.layout || DefaultLayout);

onMounted(() => {
    const authStore = useAuthStore();
    authStore.checkLocalAuth();
});
</script>

<template>
    <!--  <ReloadPWA/>-->
    <component :is="layout" />
</template>
