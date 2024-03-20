<script setup lang="ts">
import { routes } from '@/routes';

defineProps<{
    onClose?: () => void;
}>();
</script>

<template>
    <div
        class="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        @click="onClose"
    >
        <div class="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav class="space-y-3 text-sm divide-y divide-dotted">
                <template v-for="(route, i) in routes" :key="route.label">
                    <div>
                        <p
                            :class="{
                                'text-gray-300 text-xs': true,
                                'mt-2': i > 0,
                            }"
                        >
                            {{ route.label }}
                        </p>
                        <template v-for="(child, i) in route.children" :key="i">
                            <router-link
                                :to="child.to"
                                :class="{
                                    'flex w-full items-center rounded-md p-1': true,
                                    'cursor-not-allowed opacity-60': child.disabled,
                                }"
                            >
                                {{ child.name }}
                            </router-link>
                        </template>
                    </div>
                </template>
            </nav>
            <slot />
        </div>
    </div>
</template>
