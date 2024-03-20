<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ref } from 'vue';
import { IMAGES } from '@/constants/images';

const props = defineProps<{
    src?: string;
    serviceName?: string;
    at?: 'navbar-vertical' | 'navbar-top' | 'auth';
    width?: number;
    className?: string;
}>();

const width = ref(props.width || 78);
const src = ref(props.src || IMAGES.logos.sidooh);
</script>

<template>
    <div
        :class="
            cn(
                'flex',
                {
                    'items-center py-3': at === 'navbar-vertical',
                    'items-center': at === 'navbar-top',
                    'flex-col': serviceName,
                },
                className
            )
        "
    >
        <img class="me-2" :src="src" alt="Logo" :width="width" />
        <h6
            v-if="serviceName"
            :class="`font-extrabold text-[${width * 0.1}pt]`"
            :style="{
                fontFamily: `'Avenir Regular', sans-serif`,
                margin: `-.${width * 0.4}rem 0 0`,
            }"
        >
            {{ serviceName }}
        </h6>
    </div>
</template>
