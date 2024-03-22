import { h } from 'vue';
import { ColumnDef } from '@tanstack/vue-table';
import { Setting } from '@/utils/types';
import Actions from '@/pages/settings/table/Actions.vue';

export const columns: ColumnDef<Setting>[] = [
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Value',
        accessorKey: 'value',
        cell: ({ row }) =>
            row.original.name === 'MERCHANT_BETA_ACCOUNTS'
                ? row.original.value.split(',').join(', ')
                : row.original.value,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const setting = row.original;

            return h(
                'div',
                { class: 'flex items-center gap-2' },
                h(Actions, {
                    setting,
                })
            );
        },
    },
];
