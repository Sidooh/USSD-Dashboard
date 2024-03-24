<template>
    <Button ref="buttonRef" type="submit" :disabled="disabled" :class="cn('bg-primary')">
        <template v-if="isLoading">
            {{ loadingText }}
            <ReloadIcon class="ms-2 h-4 w-4 animate-spin" />
        </template>
        <template v-else>
            {{ text }}
            <component :is="icon" class="ms-2 h-4 w-4" />
        </template>
    </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';
import { Button } from '@/components/ui/button'; // Assuming Button component is in a separate file
import { ReloadIcon } from '@radix-icons/vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    text: string;
    loadingText?: string;
    isLoading: boolean;
    disabled: boolean;
    icon: Component;
}>();

const buttonRef = ref(null);
const loadingText = ref(props.loadingText ?? 'Loading...');
</script>
