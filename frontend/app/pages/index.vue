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
                  <UButton icon="i-lucide-plus" color="success" variant="outline" @click="addSlideoverOpen = true">
                    Komponente hinzufügen
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
                          {{ component.type === 'hero' ? 'Hero' : component.type === 'jobs' ? 'Jobs' : component.type === 'socials' ? 'Socials' : component.type === 'images' ? 'Images' : 'Grid' }}
                          <span v-if="component.type === 'hero' || component.type === 'jobs'" class="text-error"> *</span>
                        </div>
                    </div>
                    <div class="flex gap-2">
                      <UButton icon="i-lucide-arrow-up" color="primary" variant="outline" :disabled="index === 0" @click="moveComponent(index, index - 1)" />
                      <UButton icon="i-lucide-arrow-down" color="primary" variant="outline" :disabled="index === components.length - 1" @click="moveComponent(index, index + 1)" />
                      <UButton
                        icon="i-lucide-trash-2"
                        color="error"
                        variant="outline"
                        :disabled="component.type === 'hero' || component.type === 'jobs'"
                        @click="removeComponent(index)"
                      />
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
                  <template v-else-if="component.type === 'jobs'">
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
                  <template v-else-if="component.type === 'socials'">
                    <div class="space-y-4">
                      <div class="grid gap-3 md:grid-cols-2">
                        <UFormField label="Title" name="socialsTitle">
                          <UInput
                            v-model="socialsTitle"
                            placeholder="Socials"
                            :maxlength="30"
                            aria-describedby="socials-title-count"
                            :ui="{ trailing: 'pointer-events-none' }"
                          >
                            <template #trailing>
                              <div id="socials-title-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                                {{ socialsTitle.length }}/30
                              </div>
                            </template>
                          </UInput>
                        </UFormField>
                        <UFormField label="Description" name="socialsDescription">
                          <UTextarea v-model="socialsDescription" :rows="3" placeholder="Folge uns auf unseren Plattformen." :maxlength="100" />
                          <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                            {{ socialsDescription.length }}/100
                          </div>
                        </UFormField>
                      </div>

                      <div class="space-y-3">
                        <div class="rounded-2xl border border-muted/30 bg-muted/10 p-4">
                          <div class="mb-4 flex items-center justify-between gap-3">
                            <div class="font-semibold">Socials</div>
                          </div>

                          <div class="space-y-3">
                            <div
                              v-for="(social, socialIndex) in socialEntries"
                              :key="social.id"
                              class="rounded-xl border border-muted/20 bg-default p-3"
                            >
                              <div class="mb-3 flex items-center justify-between gap-3">
                                <div class="font-medium capitalize">{{ social.platform }}</div>
                                <div class="flex items-center gap-2">
                                  <UButton icon="i-lucide-arrow-up" size="xs" color="neutral" variant="ghost" :disabled="socialIndex === 0" @click="moveSocialEntry(socialIndex, socialIndex - 1)" />
                                  <UButton icon="i-lucide-arrow-down" size="xs" color="neutral" variant="ghost" :disabled="socialIndex === socialEntries.length - 1" @click="moveSocialEntry(socialIndex, socialIndex + 1)" />
                                  <UButton icon="i-lucide-trash-2" size="xs" color="error" variant="ghost" @click="removeSocialEntry(socialIndex)" />
                                </div>
                              </div>

                              <UFormField label="Link" :name="`socialHandle-${social.id}`">
                                <div class="flex overflow-hidden rounded-lg border border-muted/30">
                                  <span class="flex items-center border-r border-muted/30 bg-muted/20 px-3 text-xs text-muted whitespace-nowrap">
                                    {{
                                      social.platform === 'youtube'
                                        ? 'https://youtube.com/@'
                                        : social.platform === 'instagram'
                                          ? 'https://instagram.com/'
                                          : social.platform === 'tiktok'
                                            ? 'https://tiktok.com/@'
                                            : social.platform === 'discord'
                                              ? 'https://discord.gg/'
                                              : 'mailto:'
                                    }}
                                  </span>
                                  <UInput v-model="social.handle" class="flex-1 rounded-none border-0" placeholder="galaxybot" :maxlength="60" />
                                </div>
                                <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                                  {{ social.handle.length }}/60
                                </div>
                              </UFormField>
                            </div>

                            <UDropdownMenu :items="availableSocialEntries" :ui="{ content: 'min-w-52' }">
                              <button
                                type="button"
                                :disabled="!hasAvailableSocialEntries"
                                class="flex w-full items-center justify-center gap-3 rounded-xl border border-dashed border-muted/35 px-4 py-5 text-sm text-muted transition hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:border-muted/20 disabled:text-muted/40"
                              >
                                <UIcon name="i-lucide-plus" class="h-5 w-5" />
                                Social hinzufügen
                              </button>
                            </UDropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="component.type === 'images'">
                    <div class="space-y-4">
                      <div class="rounded-2xl border border-muted/30 bg-muted/10 p-4 space-y-4">
                        <div class="grid gap-3 md:grid-cols-2">
                        <UFormField label="Title" name="imagesTitle">
                          <UInput
                            v-model="imagesTitle"
                            placeholder="Images"
                            :maxlength="30"
                            aria-describedby="images-title-count"
                            :ui="{ trailing: 'pointer-events-none' }"
                          >
                            <template #trailing>
                              <div id="images-title-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                                {{ imagesTitle.length }}/30
                              </div>
                            </template>
                          </UInput>
                        </UFormField>
                        <UFormField label="Description" name="imagesDescription">
                          <UTextarea v-model="imagesDescription" :rows="3" placeholder="Ein paar Eindrücke aus dem Team." :maxlength="100" />
                          <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                            {{ imagesDescription.length }}/100
                          </div>
                        </UFormField>
                      </div>
                      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <UFormField label="Items pro Seite" name="imageItemsPerPage">
                          <UInputNumber
                            v-model="imageItemsPerPage"
                            :min="1"
                            :max="3"
                            :ui="{ base: 'h-9' }"
                          />
                        </UFormField>
                        <UFormField label="Pfeile" name="imageShowArrows"><USwitch v-model="imageShowArrows" /></UFormField>
                        <UFormField label="Dots" name="imageShowDots"><USwitch v-model="imageShowDots" /></UFormField>
                        <UFormField label="Autoplay" name="imageAutoplay"><USwitch v-model="imageAutoplay" /></UFormField>
                      </div>
                      </div>
                      <div class="space-y-3">
                        <UButton icon="i-lucide-plus" :disabled="imageEntries.length >= 10" @click="addImageEntry">Bild hinzufügen</UButton>
                        <div v-for="(image, imageIndex) in imageEntries" :key="image.id" class="rounded-xl border border-muted/20 bg-default p-3 space-y-3">
                          <div class="flex justify-end"><UButton icon="i-lucide-trash-2" size="xs" color="error" variant="ghost" @click="removeImageEntry(imageIndex)" /></div>
                          <UFormField label="Bild-URL">
                            <UInput v-model="image.imageUrl" placeholder="https://..." :maxlength="100" />
                            <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                              {{ image.imageUrl.length }}/100
                            </div>
                          </UFormField>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="space-y-4">
                      <div class="rounded-2xl border border-muted/30 bg-muted/10 p-4 space-y-4">
                        <div class="grid gap-3 md:grid-cols-2">
                          <UFormField label="Title" name="gridTitle">
                            <UInput
                              v-model="gridTitle"
                              :maxlength="30"
                              aria-describedby="grid-title-count"
                              :ui="{ trailing: 'pointer-events-none' }"
                            >
                              <template #trailing>
                                <div id="grid-title-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                                  {{ gridTitle.length }}/30
                                </div>
                              </template>
                            </UInput>
                          </UFormField>
                          <UFormField label="Description" name="gridDescription">
                            <UTextarea v-model="gridDescription" :rows="3" :maxlength="100" />
                            <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                              {{ gridDescription.length }}/100
                            </div>
                          </UFormField>
                        </div>
                        <div class="grid gap-3 md:grid-cols-2">
                          <UFormField label="Spalten" name="gridColumns">
                            <UInputNumber v-model="gridColumns" :min="2" :max="4" />
                          </UFormField>
                          <UFormField label="Reihen" name="gridRows">
                            <UInputNumber v-model="gridRows" :min="1" :max="3" />
                          </UFormField>
                        </div>
                      </div>
                      <div class="space-y-3">
                        <div
                          v-for="(item, itemIndex) in gridItems"
                          :key="item.id"
                          class="rounded-xl border border-muted/20 bg-default p-3 space-y-3"
                        >
                          <div class="text-xs font-medium uppercase tracking-wide text-muted">Item {{ itemIndex + 1 }}</div>
                          <div class="grid gap-3 md:grid-cols-2">
                            <UFormField label="Icon">
                              <UInputMenu
                                v-model="item.icon"
                                :items="gridIconSuggestions"
                                placeholder="i-lucide-star"
                                :search-input="{ placeholder: 'Icon suchen...' }"
                              />
                            </UFormField>
                            <UFormField label="Head">
                              <UInput
                                v-model="item.head"
                                :maxlength="60"
                                :aria-describedby="`grid-head-count-${item.id}`"
                                :ui="{ trailing: 'pointer-events-none' }"
                              >
                                <template #trailing>
                                  <div :id="`grid-head-count-${item.id}`" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                                    {{ item.head.length }}/60
                                  </div>
                                </template>
                              </UInput>
                            </UFormField>
                          </div>
                          <UFormField label="Body">
                            <UTextarea v-model="item.body" :rows="2" :maxlength="160" />
                            <div class="mt-1 text-right text-xs text-muted tabular-nums" aria-live="polite" role="status">
                              {{ item.body.length }}/160
                            </div>
                          </UFormField>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="hidden min-h-full self-stretch bg-border/80 xl:block" />

              <div class="hidden xl:block">
                <div class="sticky top-6 h-full rounded-2xl border border-muted/30 bg-default p-6">
                  <p class="text-sm uppercase tracking-widest text-muted">Application Page Preview</p>
                  <ApplicationPageRenderer class="mt-6" :components="previewComponents" />
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

        <USlideover v-model:open="addSlideoverOpen" title="Komponente hinzufügen">
          <template #body>
            <div class="space-y-4">
              <div
                v-for="item in addableComponentItems"
                :key="item.type"
                class="rounded-2xl border border-muted/30 bg-default p-4"
              >
                <div class="font-medium">{{ item.title }}</div>
                <div class="mt-1 text-sm text-muted">{{ item.description }}</div>
                <UButton
                  class="mt-4"
                  color="success"
                  icon="i-lucide-plus"
                  :disabled="item.disabled"
                  @click="addComponentByType(item.type)"
                >
                  Hinzufügen
                </UButton>
              </div>
            </div>
          </template>
        </USlideover>
      </UCard>
    </div>

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
  | { type: 'socials'; title: string; description: string; socials: Array<{ platform: 'youtube' | 'instagram' | 'tiktok' | 'discord' | 'email'; handle: string; visible: boolean }> }
  | { type: 'images'; title: string; description: string; images: Array<{ imageUrl: string }>; carousel: { itemsPerPage: number; showArrows: boolean; showDots: boolean; autoplay: boolean } }
  | { type: 'grid'; title: string; description: string; columns: number; rows: number; items: Array<{ icon: string; head: string; body: string }> }

type ImageEditorEntry = { id: string; imageUrl: string }

const socialPlatformItems = [
  { label: 'YouTube', value: 'youtube' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Discord', value: 'discord' },
  { label: 'Email', value: 'email' },
] as const
const gridIconSuggestions = [
  'i-lucide-star',
  'i-lucide-rocket',
  'i-lucide-shield',
  'i-lucide-zap',
  'i-lucide-sparkles',
  'i-lucide-badge-check',
  'i-lucide-circle-help',
  'i-lucide-code-2',
  'i-lucide-briefcase',
  'i-lucide-users'
]

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
const heroTitle = ref('')
const heroDescription = ref('')
const heroBannerUrl = ref('')
const jobsTitle = ref('')
const jobsDescription = ref('')
const socialsTitle = ref('')
const socialsDescription = ref('')
const imagesTitle = ref('')
const imagesDescription = ref('')
const imageEntries = ref<ImageEditorEntry[]>([])
const imageItemsPerPage = ref(3)
const imageShowArrows = ref(true)
const imageShowDots = ref(true)
const imageAutoplay = ref(false)
const gridTitle = ref('')
const gridDescription = ref('')
const gridColumns = ref(2)
const gridRows = ref(1)
const gridItems = ref<Array<{ id: string; icon: string; head: string; body: string }>>([])
const socialEntries = ref<Array<{ id: string; platform: 'youtube' | 'instagram' | 'tiktok' | 'discord' | 'email'; handle: string; visible: boolean }>>([
  { id: 'social-1', platform: 'youtube', handle: 'galaxybot', visible: true },
  { id: 'social-2', platform: 'tiktok', handle: 'galaxybot', visible: true },
  { id: 'social-3', platform: 'discord', handle: 'discord.gg/galaxybot', visible: true }
])
const components = ref<PageComponent[]>([
  { type: 'hero', title: 'Hero', description: 'Build your next application with a clean, modern landing page.', bannerUrl: '' },
  { type: 'jobs', title: 'Jobs', description: 'Find your next role in our open positions.' },
  {
    type: 'socials',
    title: 'Socials',
    description: 'Folge uns auf YouTube.',
    socials: [
      { platform: 'youtube', handle: 'galaxybot', visible: true },
      { platform: 'tiktok', handle: 'galaxybot', visible: true },
      { platform: 'discord', handle: 'discord.gg/galaxybot', visible: true }
    ]
  }
])
const savedSnapshot = ref('')
const pageSchema = z.object({
  components: z.array(z.discriminatedUnion('type', [
    z.object({
      type: z.literal('hero'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100),
      bannerUrl: z.string().trim().url().max(250).or(z.literal('')).default('')
    }),
    z.object({
      type: z.literal('jobs'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100)
    }),
    z.object({
      type: z.literal('socials'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100),
      socials: z.array(z.object({
        platform: z.enum(['youtube', 'instagram', 'tiktok', 'discord', 'email']),
        handle: z.string().trim().min(1).max(60),
        visible: z.boolean()
      })).min(1).max(12).superRefine((socials, ctx) => {
        const seen = new Set<string>()
        for (const [index, social] of socials.entries()) {
          if (seen.has(social.platform)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [index, 'platform'],
              message: 'Platform darf nur einmal vorkommen.'
            })
          }
          seen.add(social.platform)
        }
      })
    }),
    z.object({
      type: z.literal('images'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100),
      images: z.array(z.object({
        imageUrl: z.string().trim().url().max(100)
      })).min(1).max(10),
      carousel: z.object({
        itemsPerPage: z.number().int().min(1).max(3),
        showArrows: z.boolean(),
        showDots: z.boolean(),
        autoplay: z.boolean()
      })
    }),
    z.object({
      type: z.literal('grid'),
      title: z.string().trim().min(1).max(30),
      description: z.string().trim().min(1).max(100),
      columns: z.number().int().min(2).max(4),
      rows: z.number().int().min(1).max(3),
      items: z.array(z.object({
        icon: z.string().trim().min(1),
        head: z.string().trim().min(1).max(60),
        body: z.string().trim().min(1).max(160)
      })).max(12)
    }).superRefine((grid, ctx) => {
      if (grid.items.length !== grid.columns * grid.rows) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['items'],
          message: 'Grid-Inhalte müssen zu Spalten x Reihen passen.'
        })
      }
    })
  ])).min(2)
})

const availableSocialEntries = computed(() => {
  const usedPlatforms = new Set(socialEntries.value.map(entry => entry.platform))
  return socialPlatformItems
    .filter(item => !usedPlatforms.has(item.value))
    .map(item => ({
      label: item.label,
      icon: item.value === 'youtube'
        ? 'i-simple-icons-youtube'
        : item.value === 'instagram'
          ? 'i-simple-icons-instagram'
          : item.value === 'tiktok'
            ? 'i-simple-icons-tiktok'
            : item.value === 'discord'
              ? 'i-simple-icons-discord'
              : item.value === 'email'
                ? 'i-lucide-mail'
                : 'i-lucide-globe',
      onSelect: () => addSocialEntry(item.value)
    }))
})

const hasAvailableSocialEntries = computed(() => availableSocialEntries.value.length > 0)
const addableComponentItems = computed(() => {
  const usedTypes = new Set(components.value.map(component => component.type))
  return [
    {
      type: 'socials' as const,
      title: 'Socials',
      description: 'Social-Links wie YouTube, TikTok oder Discord.',
      disabled: usedTypes.has('socials')
    },
    {
      type: 'images' as const,
      title: 'Images',
      description: 'Bild-Carousel mit optionalen Ziel-Links.',
      disabled: usedTypes.has('images')
    },
    {
      type: 'grid' as const,
      title: 'Grid',
      description: 'Mehrspaltiges Inhaltsraster.',
      disabled: usedTypes.has('grid')
    }
  ].sort((a, b) => Number(a.disabled) - Number(b.disabled))
})

const previewComponents = computed<PageComponent[]>(() => {
  return components.value.map(component => ({
    ...component,
    title: component.type === 'hero' ? heroTitle.value : component.type === 'jobs' ? jobsTitle.value : component.type === 'socials' ? socialsTitle.value : component.type === 'images' ? imagesTitle.value : gridTitle.value,
    description: component.type === 'hero' ? heroDescription.value : component.type === 'jobs' ? jobsDescription.value : component.type === 'socials' ? socialsDescription.value : component.type === 'images' ? imagesDescription.value : gridDescription.value,
    ...(component.type === 'hero' ? { bannerUrl: heroBannerUrl.value } : {}),
    ...(component.type === 'socials' ? { socials: socialEntries.value.map(({ platform, handle, visible }) => ({ platform, handle, visible })) } : {}),
    ...(component.type === 'images' ? { title: imagesTitle.value, description: imagesDescription.value, images: imageEntries.value.map(({ imageUrl }) => ({ imageUrl })), carousel: { itemsPerPage: imageItemsPerPage.value, showArrows: imageShowArrows.value, showDots: imageShowDots.value, autoplay: imageAutoplay.value } } : {}),
    ...(component.type === 'grid' ? { title: gridTitle.value, description: gridDescription.value, columns: gridColumns.value, rows: gridRows.value, items: gridItems.value.map(({ icon, head, body }) => ({ icon, head, body })) } : {})
  })) as PageComponent[]
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

function removeComponent(index: number) {
  const component = components.value[index]
  if (!component || component.type === 'hero' || component.type === 'jobs') {
    return
  }

  components.value.splice(index, 1)
}

function addSocialComponent() {
  if (components.value.some(component => component.type === 'socials')) {
    return
  }

  socialsTitle.value = ''
  socialsDescription.value = ''
  socialEntries.value = []
  components.value.push({
    type: 'socials',
    title: '',
    description: '',
    socials: []
  })
  addSlideoverOpen.value = false
}

function addComponentByType(type: 'hero' | 'jobs' | 'socials' | 'images' | 'grid') {
  if (components.value.some(component => component.type === type)) {
    return
  }

  if (type === 'hero') {
    heroTitle.value = ''
    heroDescription.value = ''
    heroBannerUrl.value = ''
    components.value.push({
      type: 'hero',
      title: '',
      description: '',
      bannerUrl: ''
    })
    addSlideoverOpen.value = false
    return
  }

  if (type === 'jobs') {
    jobsTitle.value = ''
    jobsDescription.value = ''
    components.value.push({
      type: 'jobs',
      title: '',
      description: ''
    })
    addSlideoverOpen.value = false
    return
  }

  if (type === 'socials') {
    addSocialComponent()
    return
  }

  if (type === 'grid') {
    gridTitle.value = ''
    gridDescription.value = ''
    gridColumns.value = 2
    gridRows.value = 1
    gridItems.value = []
    syncGridItems()
    components.value.push({
      type: 'grid',
      title: '',
      description: '',
      columns: gridColumns.value,
      rows: gridRows.value,
      items: gridItems.value.map(({ icon, head, body }) => ({ icon, head, body }))
    })
    addSlideoverOpen.value = false
    return
  }
  imagesTitle.value = ''
  imagesDescription.value = ''
  imageEntries.value = []
  imageItemsPerPage.value = 3
  imageShowArrows.value = true
  imageShowDots.value = true
  imageAutoplay.value = false
  components.value.push({
    type: 'images',
    title: '',
    description: '',
    images: [],
    carousel: {
      itemsPerPage: imageItemsPerPage.value,
      showArrows: imageShowArrows.value,
      showDots: imageShowDots.value,
      autoplay: imageAutoplay.value
    }
  })
  addSlideoverOpen.value = false
}

function syncGridItems() {
  const needed = gridColumns.value * gridRows.value
  if (gridItems.value.length < needed) {
    for (let i = gridItems.value.length; i < needed; i++) {
      gridItems.value.push({ id: `grid-${crypto.randomUUID()}`, icon: '', head: '', body: '' })
    }
  } else if (gridItems.value.length > needed) {
    gridItems.value = gridItems.value.slice(0, needed)
  }
}

function addImageEntry() {
  if (imageEntries.value.length >= 10) return
  imageEntries.value.push({ id: `image-${crypto.randomUUID()}`, imageUrl: '' })
}

function removeImageEntry(index: number) {
  imageEntries.value.splice(index, 1)
}

function addSocialEntry(platform: 'youtube' | 'instagram' | 'tiktok' | 'discord' | 'email') {
  if (socialEntries.value.some(entry => entry.platform === platform)) {
    return
  }

  socialEntries.value = [
    ...socialEntries.value,
    {
      id: `social-${crypto.randomUUID()}`,
      platform,
      handle: '',
      visible: true
    }
  ]
}

function removeSocialEntry(index: number) {
  if (socialEntries.value.length <= 1) {
    return
  }

  socialEntries.value.splice(index, 1)
}

function moveSocialEntry(fromIndex: number, toIndex: number) {
  if (toIndex < 0 || toIndex >= socialEntries.value.length) {
    return
  }

  const next = [...socialEntries.value]
  const [moved] = next.splice(fromIndex, 1)
  if (!moved) {
    return
  }
  next.splice(toIndex, 0, moved)
  socialEntries.value = next
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

async function loadPage() {
  try {
    const data = await $fetch<{ components: PageComponent[] }>(`${apiBase}/api/application-settings`)
    const parsed = pageSchema.parse(data)
    components.value = parsed.components
    const hero = parsed.components.find(component => component.type === 'hero')
    const jobs = parsed.components.find(component => component.type === 'jobs')
    const socials = parsed.components.find(component => component.type === 'socials')
    const images = parsed.components.find(component => component.type === 'images')
    const grid = parsed.components.find(component => component.type === 'grid')
    heroTitle.value = hero?.title || ''
    heroDescription.value = hero?.description || ''
    heroBannerUrl.value = hero?.bannerUrl || ''
    jobsTitle.value = jobs?.title || ''
    jobsDescription.value = jobs?.description || ''
    socialsTitle.value = socials?.title || ''
    socialsDescription.value = socials?.description || ''
    imagesTitle.value = images?.title || ''
    imagesDescription.value = images?.description || ''
    imageEntries.value = images?.images.map((image, index) => ({
      id: `image-${index + 1}`,
      imageUrl: image.imageUrl
    })) ?? []
    imageItemsPerPage.value = images?.carousel.itemsPerPage ?? 3
    imageShowArrows.value = images?.carousel.showArrows ?? true
    imageShowDots.value = images?.carousel.showDots ?? true
    imageAutoplay.value = images?.carousel.autoplay ?? false
    gridTitle.value = grid?.title ?? ''
    gridDescription.value = grid?.description ?? ''
    gridColumns.value = grid?.columns ?? 2
    gridRows.value = grid?.rows ?? 1
    gridItems.value = grid?.items.map((item, index) => ({ id: `grid-${index + 1}`, icon: item.icon, head: item.head, body: item.body })) ?? []
    socialEntries.value = socials?.socials.map((social, index) => ({
      id: `social-${index + 1}`,
      platform: social.platform,
      handle: social.handle,
      visible: social.visible
    })) ?? [
      { id: 'social-1', platform: 'youtube', handle: '', visible: true }
    ]
    savedSnapshot.value = JSON.stringify({
      components: parsed.components,
      heroTitle: heroTitle.value,
      heroDescription: heroDescription.value,
      heroBannerUrl: heroBannerUrl.value,
      jobsTitle: jobsTitle.value,
      jobsDescription: jobsDescription.value,
      socialsTitle: socialsTitle.value,
      socialsDescription: socialsDescription.value,
      socialEntries: socialEntries.value,
      imagesTitle: imagesTitle.value,
      imagesDescription: imagesDescription.value,
      imageEntries: imageEntries.value,
      imageItemsPerPage: imageItemsPerPage.value,
      imageShowArrows: imageShowArrows.value,
      imageShowDots: imageShowDots.value,
      imageAutoplay: imageAutoplay.value,
      gridTitle: gridTitle.value,
      gridDescription: gridDescription.value,
      gridColumns: gridColumns.value,
      gridRows: gridRows.value,
      gridItems: gridItems.value
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
        title: component.type === 'hero' ? heroTitle.value : component.type === 'jobs' ? jobsTitle.value : socialsTitle.value,
        description: component.type === 'hero' ? heroDescription.value : component.type === 'jobs' ? jobsDescription.value : socialsDescription.value,
        ...(component.type === 'hero' ? { bannerUrl: heroBannerUrl.value } : {}),
        ...(component.type === 'socials' ? { socials: socialEntries.value.map(({ platform, handle, visible }) => ({ platform, handle, visible })) } : {}),
        ...(component.type === 'images' ? { title: imagesTitle.value, description: imagesDescription.value, images: imageEntries.value.map(({ imageUrl }) => ({ imageUrl })), carousel: { itemsPerPage: imageItemsPerPage.value, showArrows: imageShowArrows.value, showDots: imageShowDots.value, autoplay: imageAutoplay.value } } : {}),
        ...(component.type === 'grid' ? { title: gridTitle.value, description: gridDescription.value, columns: gridColumns.value, rows: gridRows.value, items: gridItems.value.map(({ icon, head, body }) => ({ icon, head, body })) } : {})
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
      jobsDescription: jobsDescription.value,
      socialsTitle: socialsTitle.value,
      socialsDescription: socialsDescription.value,
      socialEntries: socialEntries.value,
      imagesTitle: imagesTitle.value,
      imagesDescription: imagesDescription.value,
      imageEntries: imageEntries.value,
      imageItemsPerPage: imageItemsPerPage.value,
      imageShowArrows: imageShowArrows.value,
      imageShowDots: imageShowDots.value,
      imageAutoplay: imageAutoplay.value,
      gridTitle: gridTitle.value,
      gridDescription: gridDescription.value,
      gridColumns: gridColumns.value,
      gridRows: gridRows.value,
      gridItems: gridItems.value
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
  [components, heroTitle, heroDescription, heroBannerUrl, jobsTitle, jobsDescription, socialsTitle, socialsDescription, socialEntries, imagesTitle, imagesDescription, imageEntries, imageItemsPerPage, imageShowArrows, imageShowDots, imageAutoplay, gridTitle, gridDescription, gridColumns, gridRows, gridItems],
  () => {
    // Compare the current form with the last saved snapshot.
    hasUnsavedChanges.value = JSON.stringify({
      components: components.value,
      heroTitle: heroTitle.value,
      heroDescription: heroDescription.value,
      heroBannerUrl: heroBannerUrl.value,
      jobsTitle: jobsTitle.value,
      jobsDescription: jobsDescription.value,
      socialsTitle: socialsTitle.value,
      socialsDescription: socialsDescription.value,
      socialEntries: socialEntries.value,
      imagesTitle: imagesTitle.value,
      imagesDescription: imagesDescription.value,
      imageEntries: imageEntries.value,
      imageItemsPerPage: imageItemsPerPage.value,
      imageShowArrows: imageShowArrows.value,
      imageShowDots: imageShowDots.value,
      imageAutoplay: imageAutoplay.value,
      gridTitle: gridTitle.value,
      gridDescription: gridDescription.value,
      gridColumns: gridColumns.value,
      gridRows: gridRows.value,
      gridItems: gridItems.value
    }) !== savedSnapshot.value
  },
  { deep: true }
)

watch([gridColumns, gridRows], () => {
  syncGridItems()
})

onMounted(() => {
  void loadPage()
})
</script>
