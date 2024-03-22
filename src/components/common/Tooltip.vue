<script setup lang="ts">
import { Tooltip as BaseTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

defineProps<{
    asChild?: boolean;
    placement?: 'top' | 'left' | 'bottom' | 'right';
}>();
</script>

<template>
    <TooltipProvider>
        <BaseTooltip>
            <TooltipTrigger :as-child="asChild"><slot /></TooltipTrigger>
            <TooltipContent :side="placement"><slot name="title" /></TooltipContent>
        </BaseTooltip>
    </TooltipProvider>
</template>
