<template>
    <div class="flex min-h-screen flex-col space-y-6">
        <!--  Header -->
        <Header />

        <div
            class="px-3 lg:px-0 lg:container lg:grid flex-1 gap-12 md:grid-cols-[200px_1fr] pb-6"
            data-layout="container"
        >
            <!--  Sidebar -->
            <aside class="hidden md:block">
                <Sidebar v-if="store.navbarPosition === 'vertical' || store.navbarPosition === 'combo'" />
            </aside>

            <div class="content">
                <!--  Content -->
                <ComponentLoader>
                    <router-view />
                </ComponentLoader>

                <!--  Footer? -->
                <Footer service-name="USSD" :version="CONFIG.sidooh.version" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { computed } from 'vue';
import { useCoreStore } from '@/stores/core';
import Footer from '@/components/layout/Footer.vue';
import { CONFIG } from '@/config';
import ComponentLoader from '@/components/loaders/ComponentLoader.vue';

const store = useCoreStore();

const containerStyle = computed(() => (store.isFluid ? 'container-fluid' : 'container'));
</script>
