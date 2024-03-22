<script setup lang="ts">
import { CONFIG } from '@/config';
</script>

<template>
    <footer className="absolute bottom-0 flex justify-between text-xs container">
        <p class="text-600 flex gap-1">
            {{ CONFIG.app.name }} |
            <a href="/public" class="text-primary"> Sidooh </a>
            &copy; {{ new Date().getFullYear() }}
        </p>
        <p class="text-600">v{{ CONFIG.app.version }}</p>
    </footer>
</template>
