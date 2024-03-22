<script setup lang="ts">
import { Setting } from '@/utils/types';
import Tooltip from '@/components/common/Tooltip.vue';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toTypedSchema } from '@vee-validate/yup';
import * as y from 'yup';
import { useForm } from 'vee-validate';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const props = defineProps<{
    setting: Setting;
}>();

const formSchema = toTypedSchema(
    y.object({
        value: y.string().required(),
    })
);
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        value: props.setting.value,
    },
});

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values);
});
</script>

<template>
    <div class="flex items-center gap-2">
        <Dialog>
            <DialogTrigger>
                <Tooltip as-child>
                    <template v-slot:title>Edit {{ setting.name }}</template>
                    <span class="rounded-full p-2 h-7 w-7 hover:bg-accent hover:text-accent-foreground">
                        <font-awesome-icon :icon="faPen" class="h-3 w-3" />
                    </span>
                </Tooltip>
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
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
</template>
