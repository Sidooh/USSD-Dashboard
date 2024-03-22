export const CONFIG = {
    app: {
        name: 'USSD',
        version: 2.1,
    },
    sidooh: {
        services: {
            accounts: {
                api: {
                    url: import.meta.env.VITE_ACCOUNTS_API_URL,
                },
                dashboard: {
                    url: import.meta.env.VITE_ACCOUNTS_DASHBOARD_URL,
                },
            },
            enterprise: {
                dashboard: {
                    url: import.meta.env.VITE_ENTERPRISE_DASHBOARD_URL,
                },
            },
            merchants: {
                dashboard: {
                    url: import.meta.env.VITE_MERCHANTS_DASHBOARD_URL,
                },
            },
            products: {
                api: {
                    url: import.meta.env.VITE_PRODUCTS_API_URL,
                },
                dashboard: {
                    url: import.meta.env.VITE_PRODUCTS_DASHBOARD_URL,
                },
            },
            payments: {
                dashboard: {
                    url: import.meta.env.VITE_PAYMENTS_DASHBOARD_URL,
                },
            },
            notify: {
                api: {
                    url: import.meta.env.VITE_NOTIFY_API_URL,
                },
                dashboard: {
                    url: import.meta.env.VITE_NOTIFY_DASHBOARD_URL,
                },
            },
            savings: {
                dashboard: {
                    url: import.meta.env.VITE_SAVINGS_DASHBOARD_URL,
                },
            },
            ussd: {
                api: {
                    url: import.meta.env.VITE_USSD_API_URL,
                },
            },
        },
    },
    tagline: 'Sidooh, Makes You Money with Every Purchase!',
};
