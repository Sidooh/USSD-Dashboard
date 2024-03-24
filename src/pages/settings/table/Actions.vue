<script setup lang="ts">
import { Setting } from '@/utils/types';
import Tooltip from '@/components/common/Tooltip.vue';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import UpdateSettingDialog from '@/pages/settings/components/UpdateSettingDialog.vue';
import SearchByPhoneDialog from '@/pages/settings/components/SearchByPhoneDialog.vue';

defineProps<{
    setting: Setting;
}>();
</script>

<template>
    <div class="flex items-center gap-2">
        <SearchByPhoneDialog :setting="setting" v-if="setting.name === 'MERCHANT_BETA_ACCOUNTS'">
            <Tooltip as-child>
                <template v-slot:title>Edit {{ setting.name }}</template>
                <span class="rounded-full p-2 h-7 w-7 hover:bg-accent hover:text-accent-foreground">
                    <font-awesome-icon :icon="faPen" class="h-3 w-3" />
                </span>
            </Tooltip>
        </SearchByPhoneDialog>
        <UpdateSettingDialog :setting="setting" v-else>
            <Tooltip as-child>
                <template v-slot:title>Edit {{ setting.name }}</template>
                <span class="rounded-full p-2 h-7 w-7 hover:bg-accent hover:text-accent-foreground">
                    <font-awesome-icon :icon="faPen" class="h-3 w-3" />
                </span>
            </Tooltip>
        </UpdateSettingDialog>
    </div>
</template>
