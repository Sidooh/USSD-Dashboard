<script setup lang="ts">
import { CONFIG } from '@/config';
</script>

<template>
    <div class="flex justify-center items-center min-h-screen p-6">
        <div class="flex items-center justify-center mb-4 flex-col relative">
            <img
                class="hidden lg:block absolute end-[-8.75rem] top-[-5.125rem]"
                src="/images/icons/spot-illustrations/bg-shape.png"
                alt=""
                width="250"
            />
            <img
                class="hidden lg:block absolute start-[-6.75rem] bottom-[-2.4375rem]"
                src="/images/icons/spot-illustrations/shape-1.png"
                alt=""
                width="150"
            />
            <img class="me-2" src="/logo.png" alt="Logo" width="120" />

            <h6 class="font-semibold text-[10pt]" style="margin: -0.48rem 0 2rem">{{ CONFIG.app.name }}</h6>

            <!--  Content -->
            <router-view />
        </div>
    </div>
</template>
