<template>
    <Suspense>
        <slot />

        <template #fallback>
            <Skeleton :class="$attrs.class" />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';

defineProps<{ classes?: string }>();
</script>
