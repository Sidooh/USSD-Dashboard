<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import * as y from 'yup';
import { useForm } from 'vee-validate';
import { Account, toast } from '@nabcellent/sui-vue';
import { ref } from 'vue';
import { Setting } from '@/utils/types.ts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { MagnifyingGlassIcon, ReloadIcon } from '@radix-icons/vue';
import { Button } from '@/components/ui/button';
import { SAFARICOM_REGEX } from '@/constants';
import { useAccountsStore } from '@/stores/accounts.ts';
import { Input } from '@/components/ui/input';
import { useSettingsStore } from '@/stores/settings.ts';
import moment from 'moment';

const props = defineProps<{
    setting: Setting;
}>();

const accountsStore = useAccountsStore(),
    settingsStore = useSettingsStore();

const isLoading = ref(false),
    isLoadingWhitelisting = ref(false);
const openDialog = ref(false);
const account = ref<Account>();

const formSchema = toTypedSchema(
    y.object({
        phone: y.string().matches(SAFARICOM_REGEX, { message: 'Invalid phone number' }).required('Phone is required.'),
    })
);
const form = useForm({
    validationSchema: formSchema,
    initialValues: { phone: '' },
});

const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true;

    try {
        account.value = await accountsStore.findByPhone(values.phone);

        if (!account.value) throw new Error('Account not found');

        if (props.setting.value.split(',').includes(String(account.value?.id)))
            throw new Error('Account already whitelisted.');

        isLoading.value = false;
    } catch (e: any) {
        account.value = undefined;

        form.setErrors({ phone: e.message });

        isLoading.value = false;
    }
});

const handleWhitelisting = async () => {
    isLoadingWhitelisting.value = true;

    try {
        const value = props.setting.value.split(',');
        value.push(String(account.value?.id));
        value.sort((a, b) => {
            if (Number(a) > Number(b)) return 1;
            if (Number(a) < Number(b)) return -1;
            return 0;
        });

        await settingsStore.setSetting(props.setting.name, value.join(','));

        toast({ titleText: 'Account Whitelisted Successfully' });

        isLoading.value = false;
        openDialog.value = false;
    } catch (e: any) {
        toast({ titleText: e.message, icon: 'error' });

        isLoading.value = false;
    }
};
</script>

<template>
    <Dialog :open="openDialog" @update:open="(val) => (openDialog = val)">
        <DialogTrigger>
            <slot />
        </DialogTrigger>
        <DialogContent>
            <form @submit="onSubmit" class="space-y-3">
                <DialogHeader>
                    <DialogTitle>Whitelist Merchant</DialogTitle>
                    <DialogDescription>Enter phone number to whitelist below.</DialogDescription>
                </DialogHeader>
                <FormField v-slot="{ componentField }" name="phone">
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Enter phone number" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <DialogFooter>
                    <Button type="submit" :disabled="isLoading">
                        <template v-if="isLoading">Searching...</template>
                        <template v-else>Find Merchant</template>

                        <ReloadIcon v-if="isLoading" class="w-4 h-4 ms-2 animate-spin" />
                        <MagnifyingGlassIcon v-else class="w-4 h-4 ms-2" />
                    </Button>
                </DialogFooter>
            </form>

            <template v-if="account">
                <DialogHeader>
                    <DialogTitle>Confirm Merchant Details</DialogTitle>
                    <DialogDescription
                        >Are you sure you wish to whitelist the following merchant?
                    </DialogDescription>
                </DialogHeader>

                <ul class="leaders text-sm text-red-700 font-bold w-full overflow-hidden">
                    <li>
                        <span class="!bg-background">Account ID</span>
                        <span class="!bg-background">{{ account.id }}</span>
                    </li>
                    <li>
                        <span class="!bg-background">Phone Number</span>
                        <span class="!bg-background">{{ account.phone }}</span>
                    </li>
                    <li>
                        <span class="!bg-background">Date Created</span>
                        <span class="!bg-background">{{
                            moment(account.created_at).format('D.M.y \\a\\t hh:mm A')
                        }}</span>
                    </li>
                </ul>

                <DialogFooter>
                    <Button :disabled="isLoadingWhitelisting" @click="handleWhitelisting">
                        <template v-if="isLoadingWhitelisting">Whitelisting...</template>
                        <template v-else>Whitelist</template>

                        <ReloadIcon v-if="isLoadingWhitelisting" class="w-4 h-4 ms-2 animate-spin" />
                        <span v-else class="ms-2">👍</span>
                    </Button>
                </DialogFooter>
            </template>
        </DialogContent>
    </Dialog>
</template>
