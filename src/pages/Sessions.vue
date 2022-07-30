<script setup lang="ts">
import {useSessionsStore} from "../stores/sessions"
import {computed, onMounted} from "vue"
import {createColumnHelper} from "@tanstack/vue-table";
import Table from "../components/core/table.vue";
import router from "../routes";

const store = useSessionsStore()

const sessions = computed((): Session[] => store.sessions)

const columnHelper = createColumnHelper<Session>()

const columns = [
  columnHelper.accessor(row => row.id, {
    header: '#',
    id: 'id'
  }),
  columnHelper.accessor(row => row.session_id, {
    header: () => 'Session',
    id: 'session_id'
  }),
  columnHelper.accessor(row => row.phone, {
    header: () => 'Phone',
    id: 'phone'
  }),
  columnHelper.accessor(row => row.product, {
    header: () => 'Product',
    id: 'product'
  }),
  columnHelper.accessor(row => row.status, {
    header: () => 'Status',
    id: 'status'
  }),
  columnHelper.accessor(row => row.code, {
    header: () => 'Code',
    id: 'code'
  }),
]

const rowClickedEvent = (session: Session) => {
  store.session = session
  router.push(`/sessions/${session.id}`)
}

onMounted(() => store.fetchSessions())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <Table
          title="Sessions"
          :columns="columns"
          :data="sessions"
          @row-clicked="rowClickedEvent"
      />
    </div>
  </div>

</template>
