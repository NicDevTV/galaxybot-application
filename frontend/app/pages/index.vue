<template>
  <div class="min-h-screen bg-default text-default">
    <UHeader title="Application Customizer">
      <template #right>
        <UBadge color="primary">Demo</UBadge>
      </template>
    </UHeader>

    <div class="container mx-auto py-10">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <h1 class="text-2xl font-bold">Page components</h1>
          </div>
        </template>

        <div class="mb-6 rounded-2xl border border-muted/30 bg-default p-4">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-sm font-medium uppercase tracking-[0.3em] text-primary">Application</p>
              <h2 class="mt-2 text-lg font-semibold">Bewerbungsseite öffnen</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <UButton to="/apply" icon="i-lucide-external-link" color="primary" variant="solid">
                Link öffnen
              </UButton>
              <UButton
                :icon="isLinkCopied ? 'i-lucide-check' : 'i-lucide-copy'"
                :color="isLinkCopied ? 'success' : 'neutral'"
                :variant="isLinkCopied ? 'solid' : 'outline'"
                @click="copyApplyLink"
              >
                {{ isLinkCopied ? 'Kopiert' : 'Link kopieren' }}
              </UButton>
              <UButton icon="i-lucide-share-2" color="neutral" variant="outline" @click="shareApplyLink">
                Link teilen
              </UButton>
            </div>
          </div>
        </div>

        <UModal fullscreen v-model:open="isModalOpen">
          <UButton icon="i-lucide-square-pen" color="primary" variant="outline" @click="openModal">
            Components bearbeiten
          </UButton>

          <template #header>
            <div class="flex w-full items-start justify-between gap-4">
              <div>
                <h2 class="text-xl font-semibold">Bewerbungsportal bearbeiten</h2>
              </div>
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="openLeaveConfirm" />
            </div>
          </template>

          <template #body>
            <div class="grid min-h-[calc(100vh-12rem)] gap-6 p-6 xl:items-stretch xl:grid-cols-[minmax(0,1.1fr)_4px_minmax(0,0.9fr)]">
              <div class="flex flex-col gap-4">
                <div class="flex justify-end">
                  <UButton
                    icon="i-lucide-plus"
                    color="success"
                    variant="outline"
                    @click="addSlideoverOpen = true"
                  >
                    Hinzufügen
                  </UButton>
                </div>

                <div
                  v-for="(component, index) in components"
                  :key="component.type"
                  class="rounded-2xl border border-muted/30 bg-default p-4"
                >
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <div class="font-semibold">
                          {{ component.type === 'hero' ? 'Hero' : 'Jobs' }}<span class="text-error"> *</span>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <UButton icon="i-lucide-arrow-up" color="primary" variant="outline" :disabled="index === 0" @click="moveComponent(index, index - 1)" />
                        <UButton icon="i-lucide-arrow-down" color="primary" variant="outline" :disabled="index === components.length - 1" @click="moveComponent(index, index + 1)" />
                        <UButton icon="i-lucide-trash-2" color="error" variant="outline" disabled />
                    </div>
                  </div>

                  <template v-if="component.type === 'hero'">
                    <div class="grid gap-3 lg:grid-cols-3">
                      <UFormField label="Title" name="heroTitle">
                        <UInput
                          v-model="heroTitle"
                          placeholder="Hero"
                          :maxlength="30"
                          aria-describedby="hero-title-count"
                          :ui="{ trailing: 'pointer-events-none' }"
                        >
                          <template #trailing>
                            <div id="hero-title-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                              {{ heroTitle.length }}/30
                            </div>
                          </template>
                        </UInput>
                      </UFormField>
                      <UFormField label="Description" name="heroDescription">
                        <UTextarea v-model="heroDescription" :rows="3" placeholder="Hero description" :maxlength="100" />
                        <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                          {{ heroDescription.length }}/100
                        </div>
                      </UFormField>
                      <UFormField label="Banner image" name="heroBannerUrl">
                        <UInput v-model="heroBannerUrl" placeholder="https://..." />
                        <div v-if="heroBannerUrl" class="mt-2 overflow-hidden border border-muted/20 lg:hidden">
                          <img :src="heroBannerUrl" alt="Hero banner preview" class="h-32 w-full object-cover" />
                        </div>
                      </UFormField>
                    </div>
                  </template>
                  <template v-else>
                    <div class="grid gap-3 md:grid-cols-2">
                      <UFormField label="Title" name="jobsTitle">
                        <UInput
                          v-model="jobsTitle"
                          placeholder="Jobs"
                          :maxlength="30"
                          aria-describedby="jobs-title-count"
                          :ui="{ trailing: 'pointer-events-none' }"
                        >
                          <template #trailing>
                            <div id="jobs-title-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                              {{ jobsTitle.length }}/30
                            </div>
                          </template>
                        </UInput>
                      </UFormField>
                      <UFormField label="Description" name="jobsDescription">
                        <UTextarea v-model="jobsDescription" :rows="3" placeholder="Jobs description" :maxlength="100" />
                        <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                          {{ jobsDescription.length }}/100
                        </div>
                      </UFormField>
                    </div>
                  </template>
                </div>

                <div
                  v-for="(component, index) in extraComponents"
                  :key="component.type"
                  class="rounded-2xl border border-muted/30 bg-default p-4"
                >
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <div class="font-semibold">{{ component.title }}</div>
                      <div class="text-sm text-muted">Optional component</div>
                    </div>
                    <div class="flex gap-2">
                      <UButton icon="i-lucide-arrow-up" color="primary" variant="outline" :disabled="index === 0" @click="moveExtraComponent(index, index - 1)" />
                      <UButton icon="i-lucide-arrow-down" color="primary" variant="outline" :disabled="index === extraComponents.length - 1" @click="moveExtraComponent(index, index + 1)" />
                      <UButton icon="i-lucide-trash-2" color="error" variant="outline" @click="removeExtraComponent(index)" />
                    </div>
                  </div>

                  <p class="text-sm text-muted">Später kommen hier noch Einstellungen dazu.</p>
                </div>
              </div>

              <div class="hidden min-h-full self-stretch bg-border/80 xl:block" />

              <div class="hidden xl:block">
                <div class="sticky top-6 h-full rounded-2xl border border-muted/30 bg-default p-6">
                  <p class="text-sm uppercase tracking-widest text-muted">Application Page Preview</p>
                  <div class="relative mt-6 overflow-hidden border-b border-muted/20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14" :class="heroBannerUrl ? 'text-white' : ''">
                    <div v-if="heroBannerUrl" class="absolute inset-0">
                      <img :src="heroBannerUrl" alt="Hero banner preview" class="h-full w-full object-cover" />
                      <div class="absolute inset-0 bg-black/45" />
                    </div>
                    <div class="relative z-10 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium uppercase tracking-[0.3em] text-primary">Application</p>
                        <h1 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                          {{ heroTitle }}
                        </h1>
                      </div>
                      <p class="max-w-2xl text-base leading-7 sm:text-right" :class="heroBannerUrl ? 'text-white/85' : 'text-muted'">
                        {{ heroDescription }}
                      </p>
                    </div>
                  </div>
                  <section class="mt-8 space-y-8">
                    <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium uppercase tracking-[0.3em] text-primary">Jobs</p>
                        <h2 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                          {{ jobsTitle }}
                        </h2>
                      </div>
                      <p class="max-w-3xl text-base leading-7 text-muted sm:text-lg lg:text-right">
                        {{ jobsDescription }}
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
                  </section>
                </div>
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex w-full justify-end">
              <UButton
                :icon="isSaved ? 'i-lucide-check' : 'i-lucide-save'"
                :color="isSaved ? 'success' : 'primary'"
                :variant="isSaved ? 'solid' : 'outline'"
                @click="savePage"
              >
                {{ isSaved ? 'Gespeichert' : 'Speichern' }}
              </UButton>
            </div>
          </template>
        </UModal>
      </UCard>
    </div>

    <USlideover v-model:open="addSlideoverOpen" title="Component hinzufügen">
      <template #body>
        <div class="grid gap-3">
          <div v-for="item in availableComponents" :key="item.type" class="rounded-2xl border border-dashed border-muted/40 px-4 py-3">
            <div class="font-medium">{{ item.title }}</div>
            <div class="mt-1 text-sm text-muted">{{ item.description }}</div>
          </div>
        </div>
      </template>
    </USlideover>

    <UModal v-model:open="isLeaveConfirmOpen" title="Verlassen ohne speichern?">
      <template #body>
        <p class="text-sm text-muted">Deine Änderungen sind noch nicht gespeichert.</p>
      </template>
      <template #footer>
        <div class="flex w-full justify-center gap-3">
          <UButton color="neutral" variant="outline" @click="isLeaveConfirmOpen = false">Nein, lieber zurück</UButton>
          <UButton color="error" @click="discardAndClose">Ja, ohne speichern</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

type PageComponent =
  | { type: 'hero'; title: string; description: string; bannerUrl: string }
  | { type: 'jobs'; title: string; description: string }

const apiBase = 'http://127.0.0.1:3001'
const isModalOpen = ref(false)
const addSlideoverOpen = ref(false)
const isLeaveConfirmOpen = ref(false)
const isSaved = ref(false)
const hasUnsavedChanges = ref(false)
const isLinkCopied = ref(false)
const toast = useToast()
// Small timer to flip the copy button back after a short success state.
let copyResetTimer: ReturnType<typeof setTimeout> | undefined
const heroTitle = ref('Hero')
const heroDescription = ref('Build your next application with a clean, modern landing page.')
const heroBannerUrl = ref('')
const jobsTitle = ref('Jobs')
const jobsDescription = ref('Find your next role in our open positions.')
const components = ref<PageComponent[]>([
  { type: 'hero', title: 'Hero', description: 'Build your next application with a clean, modern landing page.', bannerUrl: '' },
  { type: 'jobs', title: 'Jobs', description: 'Find your next role in our open positions.' }
])
const extraComponents = ref<Array<{ type: string; title: string }>>([])
const savedSnapshot = ref('')
const availableComponents = [
  { type: 'available', title: 'Bald', description: '' },
  { type: 'available', title: 'Verfügbar', description: '' }
]

const pageSchema = z.object({
  components: z.array(z.discriminatedUnion('type', [
    z.object({
      type: z.literal('hero'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100),
      bannerUrl: z.string().trim().url().max(500).or(z.literal('')).default('')
    }),
    z.object({
      type: z.literal('jobs'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100)
    })
  ])).min(2)
})

function openModal() {
  // Always load fresh data before the editor opens.
  void loadPage()
    .then((success) => {
      if (!success) {
        return
      }
      isSaved.value = false
      isModalOpen.value = true
    })
}

function getApplyUrl() {
  return `${window.location.origin}/apply`
}

async function copyApplyLink() {
  try {
    if (copyResetTimer) {
      clearTimeout(copyResetTimer)
    }

    await navigator.clipboard.writeText(getApplyUrl())
    isLinkCopied.value = true
    toast.add({
      title: 'Link kopiert',
      description: 'Die Bewerbungsseite liegt jetzt in deiner Zwischenablage.',
      icon: 'i-lucide-copy-check',
      color: 'success'
    })
    // Reset the button so it does not stay green forever.
    copyResetTimer = setTimeout(() => {
      isLinkCopied.value = false
    }, 2000)
  } catch {
    toast.add({
      title: 'Link konnte nicht kopiert werden',
      description: 'Bitte versuche es erneut.',
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
  }
}

async function shareApplyLink() {
  await navigator.share({
    title: 'Bewerbungsportal',
    url: getApplyUrl()
  })
}

onBeforeUnmount(() => {
  if (copyResetTimer) {
    clearTimeout(copyResetTimer)
  }
})

function moveComponent(fromIndex: number, toIndex: number) {
  if (toIndex < 0 || toIndex >= components.value.length) {
    return
  }

  const next = [...components.value]
  const [moved] = next.splice(fromIndex, 1)
  if (!moved) {
    return
  }
  next.splice(toIndex, 0, moved)
  components.value = next
}

function moveExtraComponent(fromIndex: number, toIndex: number) {
  if (toIndex < 0 || toIndex >= extraComponents.value.length) {
    return
  }

  const next = [...extraComponents.value]
  const [moved] = next.splice(fromIndex, 1)
  if (!moved) {
    return
  }
  next.splice(toIndex, 0, moved)
  extraComponents.value = next
}

function removeExtraComponent(index: number) {
  extraComponents.value.splice(index, 1)
}

async function loadPage() {
  try {
    const data = await $fetch<{ components: PageComponent[] }>(`${apiBase}/api/application-settings`)
    const parsed = pageSchema.parse(data)
    components.value = parsed.components
    const hero = parsed.components.find(component => component.type === 'hero')
    const jobs = parsed.components.find(component => component.type === 'jobs')
    heroTitle.value = hero?.title || 'Hero'
    heroDescription.value = hero?.description || ''
    heroBannerUrl.value = hero?.bannerUrl || ''
    jobsTitle.value = jobs?.title || 'Jobs'
    jobsDescription.value = jobs?.description || ''
    savedSnapshot.value = JSON.stringify({
      components: parsed.components,
      heroTitle: heroTitle.value,
      heroDescription: heroDescription.value,
      heroBannerUrl: heroBannerUrl.value,
      jobsTitle: jobsTitle.value,
      jobsDescription: jobsDescription.value
    })
    // This is the value for the unsaved-changes check.
    hasUnsavedChanges.value = false
    return true
  } catch {
    toast.add({
      title: 'Bewerbungsseite konnte nicht geladen werden',
      description: 'Bitte versuche es erneut.',
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
    return false
  }
}

async function savePage() {
  try {
    const payload = {
      components: components.value.map(component => ({
        ...component,
        title: component.type === 'hero' ? heroTitle.value : jobsTitle.value,
        description: component.type === 'hero' ? heroDescription.value : jobsDescription.value,
        ...(component.type === 'hero' ? { bannerUrl: heroBannerUrl.value } : {})
      }))
    }

    const parsed = pageSchema.parse(payload)
    await $fetch(`${apiBase}/api/application-settings`, {
      method: 'PUT',
      body: parsed
    })

    isSaved.value = true
    hasUnsavedChanges.value = false
    savedSnapshot.value = JSON.stringify({
      components: parsed.components,
      heroTitle: heroTitle.value,
      heroDescription: heroDescription.value,
      heroBannerUrl: heroBannerUrl.value,
      jobsTitle: jobsTitle.value,
      jobsDescription: jobsDescription.value
    })
    isModalOpen.value = false
    toast.add({
      title: 'Gespeichert',
      description: 'Die Bewerbungsseite wurde erfolgreich aktualisiert.',
      icon: 'i-lucide-check-circle-2',
      color: 'success'
    })
  } catch {
    toast.add({
      title: 'Speichern fehlgeschlagen',
      description: 'Bitte prüfe deine Eingaben und versuche es erneut.',
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
  }
}

function openLeaveConfirm() {
  if (hasUnsavedChanges.value) {
    isLeaveConfirmOpen.value = true
  } else {
    isModalOpen.value = false
  }
}

function discardAndClose() {
  isLeaveConfirmOpen.value = false
  isModalOpen.value = false
}

watch(
  [components, heroTitle, heroDescription, heroBannerUrl, jobsTitle, jobsDescription],
  () => {
    // Compare the current form with the last saved snapshot.
    hasUnsavedChanges.value = JSON.stringify({
      components: components.value,
      heroTitle: heroTitle.value,
      heroDescription: heroDescription.value,
      heroBannerUrl: heroBannerUrl.value,
      jobsTitle: jobsTitle.value,
      jobsDescription: jobsDescription.value
    }) !== savedSnapshot.value
  },
  { deep: true }
)

onMounted(() => {
  void loadPage()
})
</script>
