<template>
    <div class="card">
        <div class="card-body">
            <DataTable title="Sessions" :data="store.sessions" :columns="columns"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSessionsStore } from "@/stores/sessions"
import { computed, h, onMounted } from "vue"
import { RouterLink, useRouter } from "vue-router";
import DataTable from "@/components/datatable/DataTable.vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { Session } from "@/utils/types";
import Phone from "@/components/Phone.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import TableDate from "@/components/TableDate.vue";

const store = useSessionsStore()
const router = useRouter()

const sessions = computed(() => store.sessions)

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

onMounted(() => store.fetchSessions())
</script>
