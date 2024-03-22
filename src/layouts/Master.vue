<template>
    <div class="flex min-h-screen flex-col space-y-6">
        <!--  Header -->
        <Header />

        <div class="px-3 lg:px-0 lg:container lg:grid flex-1 gap-12 md:grid-cols-[200px_1fr] pb-6">
            <!--  Sidebar -->
            <aside class="hidden md:block">
                <Sidebar v-if="store.navbarPosition === 'vertical' || store.navbarPosition === 'combo'" />
            </aside>

            <main class="min-h-screen relative pb-12">
                <!--  Content -->
                <ComponentLoader>
                    <router-view />
                </ComponentLoader>

                <!--  Footer? -->
                <Footer />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { useCoreStore } from '@/stores/core';
import Footer from '@/components/layout/Footer.vue';
import ComponentLoader from '@/components/loaders/ComponentLoader.vue';

const store = useCoreStore();
</script>
