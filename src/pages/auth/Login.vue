<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import router from '../../router';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import { toast } from '@nabcellent/sui-vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CONFIG } from '@/config';
import SubmitButton from '@/components/common/SubmitButton.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import * as y from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { Input } from '@/components/ui/input';

const isLoading = ref(false);

const formSchema = toTypedSchema(
    y.object({
        email: y.string().max(100).required('Email is required.'),
        password: y.string().max(20).required('Password is required.'),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        email: '',
        password: '',
    },
});

const submit = handleSubmit(async (values) => {
    isLoading.value = true;

    try {
        await useAuthStore().authenticate(values.email, values.password);

        const intended = localStorage.getItem('urlIntended');

        await router.push({ path: intended ?? '/' });

        localStorage.removeItem('urlIntended');
    } catch (err: any) {
        isLoading.value = false;

        toast({ titleText: err.message, icon: 'warning' });
    }
});
</script>

<template>
    <form @submit="submit">
        <Card class="p-5 h-full lg:max-w-3xl lg:min-w-[30rem] relative shadow-xl border-0">
            <CardHeader>
                <CardTitle class="text-end text-primary">
                    Welcome Back
                    <hr class="mt-3 w-1/2 ms-auto" />
                </CardTitle>
            </CardHeader>
            <CardContent class="space-y-5">
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem v-auto-animate>
                        <FormControl>
                            <Input type="email" placeholder="Email address" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem v-auto-animate>
                        <FormControl>
                            <Input type="password" placeholder="Password" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </CardContent>
            <CardFooter class="flex-col">
                <SubmitButton
                    text="Sign In"
                    loading-text="Signing in..."
                    :is-loading="isLoading"
                    :disabled="isLoading"
                    :icon="faUnlockKeyhole"
                    class="w-full"
                />

                <div class="mt-5">
                    <div class="relative mt-4">
                        <hr class="bg-300" />
                        <div
                            class="absolute -translate-x-2/4 -translate-y-2/4 bg-card text-[0.8333333333rem] text-[#9da9bb] whitespace-nowrap px-2 left-2/4 top-2/4"
                        >
                            🌟
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="text-center text-stone-400">
                            <i>
                                <small>{{ CONFIG.tagline }}</small>
                            </i>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </form>
</template>
