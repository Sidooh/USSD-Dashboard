<script setup lang="ts">
import {useSessionsStore} from "../stores/sessions";
import {computed, onMounted} from "vue";
import Grid from "../components/core/grid.vue";

const store = useSessionsStore();

const sessions = computed(() => store.sessions)

const columns = computed(() => [
  {
    name: 'id',
    title: '#'
  },
  {
    name: 'session_id',
    title: 'SessionId'
  },
  {
    name: 'code',
    title: 'Code'
  },
  {
    name: 'phone',
    title: 'Phone'
  },
  {
    name: 'product',
    title: 'Product'
  },
  {
    name: 'status',
    title: 'Status'
  },
  {
    name: 'screen_path',
    title: 'ScreenPath'
  },
  {
    name: 'vars',
    title: 'Vars'
  },
])

const gridColumns = columns.value.map((c) => {
  const {name: field, title: headerName} = c

  return {
    field,
    headerName
  }
})

onMounted(() => store.fetchSessions())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <!--      <Table-->
      <!--          key="sessions"-->
      <!--          table-name="Sessions"-->
      <!--          :columns="columns"-->
      <!--          :rows="sessions"-->
      <!--      />-->

      <Grid
          :columns="gridColumns"
          :rows="sessions"
      />
    </div>
  </div>

</template>
