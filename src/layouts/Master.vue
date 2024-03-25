<template>
    <div class="flex flex-col">
        <div class="px-3 lg:px-0 lg:container">
            <!--  Sidebar -->
            <aside class="hidden md:block">
                <Sidebar v-if="store.navbarPosition === 'vertical' || store.navbarPosition === 'combo'" />
            </aside>

            <main class="min-h-screen relative pb-6">
                <!--  Header -->
                <Header />

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
