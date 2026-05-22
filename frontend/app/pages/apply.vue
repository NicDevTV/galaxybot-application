<template>
  <div class="min-h-screen bg-default text-default">
    <UHeader title="Application" />

    <main class="flex w-full flex-col">
      <section
        v-for="component in components"
        :key="component.type"
        class="w-full border-b border-muted/20 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div
          v-if="component.type === 'hero'"
          class="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
          :class="component.bannerUrl ? 'text-white' : ''"
        >
          <div v-if="component.bannerUrl" class="absolute inset-0">
            <img :src="component.bannerUrl" alt="Header banner" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-black/45" />
          </div>
          <div class="relative z-10 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium uppercase tracking-[0.3em] text-primary">Application</p>
              <h1 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {{ component.title }}
              </h1>
            </div>
            <p class="max-w-2xl text-base leading-7 sm:text-right" :class="component.bannerUrl ? 'text-white/85' : 'text-muted'">
              {{ component.description }}
            </p>
          </div>
        </div>

        <div v-else class="space-y-8">
          <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium uppercase tracking-[0.3em] text-primary">Jobs</p>
              <h2 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {{ component.title }}
              </h2>
            </div>
            <p class="max-w-3xl text-base leading-7 text-muted sm:text-lg lg:text-right">
              {{ component.description }}
            </p>
          </div>

          <div class="grid gap-0 border-t border-muted/20 md:grid-cols-2">
            <div class="border-b border-muted/20 px-0 py-8 md:border-b-0 md:border-r md:px-6 lg:px-8">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-semibold tracking-tight">Supporter m/w/d</h3>
                  <p class="mt-3 max-w-xl text-sm leading-6 text-muted">
                    Du unterstützt das Team im Alltag und sorgst für einen reibungslosen Ablauf.
                  </p>
                </div>
                <UBadge color="success" variant="soft">Geöffnet</UBadge>
              </div>
              <p class="mt-6 max-w-xl text-sm leading-6 text-muted">
                Perfekt für motivierte Leute, die gerne helfen und Verantwortung übernehmen.
              </p>
            </div>

            <div class="px-0 py-8 md:px-6 lg:px-8">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-semibold tracking-tight">Helfer m/w/d</h3>
                  <p class="mt-3 max-w-xl text-sm leading-6 text-muted">
                    Du packst mit an, unterstützt Projekte und hältst dem Team den Rücken frei.
                  </p>
                </div>
                <UBadge color="neutral" variant="soft">Geschlossen</UBadge>
              </div>
              <p class="mt-6 max-w-xl text-sm leading-6 text-muted">
                Ein einfacher Einstieg mit klaren Aufgaben und direktem Teamkontakt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
type PageComponent =
  | { type: 'hero'; title: string; description: string; bannerUrl: string }
  | { type: 'jobs'; title: string; description: string }

const apiBase = 'http://127.0.0.1:3001'
const { data } = await useFetch<{ components: PageComponent[] }>(`${apiBase}/api/application-settings`)
const components = computed(() => data.value?.components ?? [])
</script>
