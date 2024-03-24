<script setup lang="ts">
import { useSessionsStore } from '@/stores/sessions';
import { computed, onMounted, watch } from 'vue';

import { useRoute } from 'vue-router';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const store = useSessionsStore();

const session = computed(() => store.session);

const sessionDetails = computed(() => {
    return {
        ...session.value,
        screen_path: undefined,
        vars: undefined,
    };
});

const screens = computed(() => {
    const screens = [];
    let screen: any = session.value.screen_path;

    while (screen) {
        screen.formatted = `<p class="text-sm text-primary font-bold mb-3">${screen.title}</p>`;
        if (screen.options) {
            for (const option in screen.options) {
                screen.formatted += `<h5 class="text-sm text-primary/70">${screen.options[option].value}. ${screen.options[option].label}</h5>`;
            }
        }
        screens.push({ ...screen, previous: undefined });
        screen = screen.previous;
    }

    return screens.reverse();
});

const route = useRoute();
watch(
    () => route.params.id,
    (newId) => {
        store.setSessionFromId(`${newId}`);
    }
);

onMounted(() => {
    store.setSessionFromId(`${route.params.id}`);
});
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
        <Card>
            <CardHeader>Session Details</CardHeader>
            <CardContent>
                <ul class="leaders">
                    <li class="text-sm" v-for="(session, index) in sessionDetails" :key="index">
                        <span class="text-primary font-bold">{{ index }}</span>
                        <span class="text-primary/70">{{ session }}</span>
                    </li>
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>Session Vars</CardHeader>
            <CardContent>
                <ul class="leaders">
                    <li class="text-sm" v-for="(vars, index) in session.vars" :key="index">
                        <span class="text-primary font-bold">{{ index }}</span>
                        <span class="text-primary/70">{{ vars }}</span>
                    </li>
                </ul>
            </CardContent>
        </Card>
    </div>

    <div class="grid grid-cols-4 gap-3">
        <Card class="p-6" v-for="screen in screens" :key="screen">
            <span v-if="screen" v-html="screen.formatted"></span>
            <span v-else>No session found</span>
        </Card>
    </div>
</template>
