<template>

  <SettingsTable title="Settings" :settings="settings"/>

</template>

<script setup lang="ts">
import {computed, onMounted} from "vue"
import {useRouter} from "vue-router";
import {useSettingsStore} from "@/stores/settings";
import SettingsTable from "@/components/tables/SettingsTable.vue";

const store = useSettingsStore()
const router = useRouter()

const settings = computed(() => store.settings)

onMounted(() => store.fetchSettings())
</script>
