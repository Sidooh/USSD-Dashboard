<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import * as y from 'yup';
import { useForm } from 'vee-validate';
import { toast } from '@nabcellent/sui-vue';
import { ref } from 'vue';
import { useSettingsStore } from '@/stores/settings.ts';
import { Setting } from '@/utils/types.ts';
import {
    Dialog,
    DialogTrigger,
    DialogTitle,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ReloadIcon } from '@radix-icons/vue';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const props = defineProps<{
    setting: Setting;
}>();

const store = useSettingsStore();
const isLoading = ref(false);
const openDialog = ref(false);

const formSchema = toTypedSchema(
    y.object({
        name: y.string().required(),
        value: y.string().required(),
    })
);
const form = useForm({
    validationSchema: formSchema,
    initialValues: props.setting,
});

const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true;

    try {
        await store.setSetting(values.name, values.value);

        toast({ titleText: 'Setting Updated Successfully!' });

        isLoading.value = false;
        openDialog.value = false;
    } catch (e: any) {
        toast({ titleText: e.message, icon: 'error' });

        isLoading.value = false;
    }
});
</script>

<template>
    <Dialog :open="openDialog" @update:open="(val) => (openDialog = val)">
        <DialogTrigger>
            <slot />
        </DialogTrigger>
        <DialogContent>
            <form @submit="onSubmit" class="space-y-3">
                <DialogHeader>
                    <DialogTitle>Edit Setting</DialogTitle>
                    <DialogDescription>
                        {{ setting.name }}
                    </DialogDescription>
                </DialogHeader>
                <FormField v-slot="{ componentField }" name="value">
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="Enter new setting value"
                                class="resize-none"
                                rows="7"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <DialogFooter>
                    <Button type="submit" :disabled="isLoading">
                        <template v-if="isLoading">Saving...</template>
                        <template v-else>Save</template>

                        <ReloadIcon v-if="isLoading" class="w-4 h-4 ms-2 animate-spin" />
                        <span v-else class="ms-2">👍</span>
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
