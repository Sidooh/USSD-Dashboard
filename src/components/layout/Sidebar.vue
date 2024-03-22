<template>
    <nav class="pb-12 fixed w-[12.625rem]">
        <div class="space-y-4 py-4">
            <template v-for="r in routes" :key="r.label">
                <div class="px-3 py-2">
                    <h2 class="mb-2 text-sm tracking-tight text-gray-400">{{ r.label }}</h2>
                    <div class="space-y-1">
                        <router-link
                            v-for="child in r.children"
                            class="group flex items-center py-2 text-sm font-medium hover:text-gray-500"
                            aria-expanded="false"
                            :to="child.to"
                            :key="child.name"
                        >
                            <div class="d-flex align-items-center">
                                <span class="mr-2 h-4 w-4"><font-awesome-icon :icon="child.icon ?? ''" /></span>
                                {{ child.name }}
                            </div>
                        </router-link>
                    </div>
                </div>
            </template>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { routes } from '@/routes';
</script>
