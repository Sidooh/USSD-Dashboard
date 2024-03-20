import { RouteType } from '@nabcellent/sui-vue';
import { faGear, faGroupArrowsRotate, faPieChart } from '@fortawesome/free-solid-svg-icons';

export const routes: RouteType[] = [
    {
        children: [
            {
                to: '/',
                name: 'Dashboard',
                icon: faPieChart,
            },
        ],
    },
    {
        label: 'App',
        children: [{ to: '/sessions', name: 'Sessions', icon: faGroupArrowsRotate }],
    },
    {
        label: 'Admin',
        children: [{ to: '/settings', name: 'Settings', icon: faGear }],
    },
];
