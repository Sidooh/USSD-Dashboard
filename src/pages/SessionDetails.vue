<script setup lang="ts">
import {useSessionsStore} from "../stores/sessions"
import {computed, onMounted, watch} from "vue"

import {useRoute} from "vue-router";

const store = useSessionsStore();

const session = computed(() => store.session)

const sessionDetails = computed(() => {
  return {
    ...session.value,
    screen_path: undefined,
    vars: undefined
  }
})

// type Option = {
//   id: string,
//   label: string,
//   value: string
// }

const screens = computed(() => {
  const screens = []
  let screen: any = session.value.screen_path

  while (screen) {
    screen.formatted = `<p class="text-900">${screen.title}</p>`
    if (screen.options) {
      for (const option in screen.options) {
        screen.formatted += `<h5 class="fs--1">${screen.options[option].value}. ${screen.options[option].label}</h5>`
      }
    }
    screens.push({...screen, previous: undefined})
    screen = screen.previous
  }

  return screens.reverse()
})

const route = useRoute()
watch(
    () => route.params.id,
    newId => {
      store.setSessionFromId(`${newId}`)
    })

onMounted(() => {
  store.setSessionFromId(`${route.params.id}`)
})
</script>

<template>
  <div class="row g-0">
    <div class="col-lg-6 mb-3 pe-lg-2 mb-3">
      <div class="card h-lg-100">
        <div class="card-body d-flex">

          <div class="row h-100 justify-content-between g-0">
            <h6 class="mt-1">Session Details</h6>
            <div class="fs--2 mt-3">

              <div class="d-flex flex-between-center mb-1" v-for="(session, index) in sessionDetails">
                <div class="d-flex align-items-center">
                  <span class="dot bg-primary"></span>
                  <span class="fw-semi-bold">{{ index }}</span>
                </div>
                <div>{{ session }}</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="col-lg-6 mb-3 ps-lg-2">
      <div class="card h-lg-100">
        <div class="card-body d-flex">

          <div class="row h-100 justify-content-between g-0">
            <h6 class="mt-1">Session Vars</h6>
            <div class="fs--2 mt-3">

              <div class="d-flex flex-between-center mb-1" v-for="(vars, index) in session.vars">
                <div class="d-flex align-items-center">
                  <span class="dot bg-primary"></span>
                  <span class="fw-semi-bold">{{ index }}</span>
                </div>
                <div>{{ vars }}</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="row g-0">
    <div class="col-m-6 col-lg-3 mb-3 pe-lg-2 mb-3" v-for="screen in screens">
      <div class="card h-lg-100">
        <div class="card-body d-flex align-items-center">
          <div class="row h-100 justify-content-between g-0">

            <span v-html="screen.formatted"></span>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>
