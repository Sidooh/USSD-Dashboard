import { h } from 'vue';
import { CellContext, ColumnDef } from '@tanstack/vue-table';
import { Session } from '@/utils/types';
import { PhoneNumber, TableDate } from '@nabcellent/sui-vue';
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

export const columns: ColumnDef<Session>[] = [
    {
        header: '#',
        accessorKey: 'id',
    },
    {
        header: 'Session ID',
        accessorKey: 'session_id',
    },
    {
        header: 'Product',
        accessorKey: 'product',
    },
    {
        header: 'Phone',
        accessorKey: 'phone',
        cell: (info) => h(PhoneNumber, { phone: info.getValue() }),
    },
    {
        header: 'Created',
        accessorKey: 'created_at',
        cell: ({ row }: CellContext<Session, string>) => h(TableDate, { date: row.original.created_at }),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row: { original } }: CellContext<Session, string>) =>
            h('div', { class: 'd-flex justify-content-evenly' }, [
                h(RouterLink, { to: { name: 'sessions.show', params: { id: original.id } } }, () =>
                    h(FontAwesomeIcon, { icon: faEye })
                ),
            ]),
    },
];
