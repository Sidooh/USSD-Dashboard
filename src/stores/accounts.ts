import { defineStore } from 'pinia';
import { Account } from '@nabcellent/sui-vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.ts';

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        account: <Account>{},
    }),

    actions: {
        async findByPhone(phone: string | number) {
            try {
                const {
                    data: { data },
                } = await axios.get(`/accounts/phone/${phone}`);

                this.account = data;

                return data;
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    if (
                        err.response?.status &&
                        [400, 422].includes(err.response?.status) &&
                        Boolean(err.response?.data)
                    ) {
                        if (Array.isArray(err.response?.data.errors))
                            throw new Error(err.response?.data.errors[0].message);

                        throw new Error(err.response?.data.errors.message);
                    } else if (err.response?.status === 401 && err.response.data) {
                        useAuthStore().logout();
                    } else if (err.response?.status === 429) {
                        throw new Error('Sorry! We failed to sign you in. Please try again in a few minutes.');
                    } else if (err.code === 'ERR_NETWORK') {
                        throw new Error('Network Error! Service unavailable.');
                    } else {
                        throw new Error('Something went wrong!');
                    }
                } else if (err instanceof Error) {
                    throw new Error(err.message);
                } else {
                    throw new Error('Something went wrong!');
                }
            }
        },
    },
});
