<template>
    <div class="card">
        <div class="card-body">
            <DataTable :title="title??'Sessions'" :data="sessions" :columns="columns"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DataTable from "@/components/datatable/DataTable.vue";
import { Session } from "@/utils/types";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { h } from "vue";
import Phone from "@/components/Phone.vue";
import TableDate from "@/components/TableDate.vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

defineProps<{ title?: string, sessions: Session[] }>()

const columnHelper = createColumnHelper<Session>(),
    columns = [
        columnHelper.accessor('id', {
            header: '#',
        }),
        columnHelper.accessor('session_id', {
            header: 'Session ID',
        }),
        columnHelper.accessor('code', {
            header: 'Code',
        }),
        columnHelper.accessor('product', {
            header: 'Product',
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: info => h(Phone, { phone: info.getValue() })
        }),
        columnHelper.accessor('created_at', {
            header: 'Created',
            cell: ({ row }: CellContext<Session, string>) => h(TableDate, { date: row.original.created_at })
        }),
        {
            id: 'actions',
            header: '',
            cell: ({ row: { original } }: CellContext<Session, string>) => h('div', { class: 'd-flex justify-content-evenly' }, [
                h(
                    RouterLink,
                    { to: { name: 'sessions.show', params: { id: original.id } } },
                    () => h(FontAwesomeIcon, { icon: faEye })
                ),
            ])
        },
    ]
</script>

<style scoped>

</style>