<script setup lang="ts">
import { CONFIG } from '@/config';
</script>

<template>
    <footer class="footer">
        <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
            <div class="col-auto">
                <p class="mb-0 text-600">
                    {{ CONFIG.app.name }} | <a href="/public">Sidooh</a> <br class="d-sm-none" />
                    &copy; {{ new Date().getFullYear() }}
                </p>
            </div>
            <div class="col-auto">
                <p class="mb-0 text-600">v{{ CONFIG.app.version }}</p>
            </div>
        </div>
    </footer>
</template>
