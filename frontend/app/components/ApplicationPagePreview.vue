<template>
  <div class="flex w-full flex-col">
    <section
      v-for="component in components"
      :key="component.type"
      class="w-full border-b border-muted/20"
    >
      <div
        v-if="component.type === 'hero'"
        class="relative min-h-[20rem] overflow-hidden px-4 py-8 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:py-10 lg:pb-16"
        :class="component.bannerUrl ? 'text-white' : ''"
      >
        <div v-if="component.bannerUrl" class="absolute inset-0">
          <img :src="component.bannerUrl" alt="Header banner" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-black/55" />
        </div>
        <div class="relative z-10 flex min-h-[20rem] w-full items-center">
          <div class="flex w-full flex-col gap-4 py-2 sm:py-4 lg:flex-row lg:items-end lg:justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-xs font-medium uppercase tracking-[0.35em] text-primary/90">Application</p>
              <h1 class="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-4xl">
                {{ component.title }}
              </h1>
            </div>
            <p class="max-w-2xl text-base leading-7 sm:text-lg lg:text-right" :class="component.bannerUrl ? 'text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]' : 'text-muted'">
              {{ component.description }}
            </p>
          </div>
        </div>
      </div>

      <div v-else-if="component.type === 'jobs'" class="space-y-8 border-t border-muted/20 px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="min-w-0 flex-1">
            <p class="text-xs font-medium uppercase tracking-[0.35em] text-primary/90">Jobs</p>
            <h2 class="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {{ component.title }}
            </h2>
          </div>
          <p class="max-w-2xl text-base leading-7 text-muted sm:text-lg lg:text-right">
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

      <div v-else class="space-y-6 border-t border-muted/20 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="min-w-0 flex-1">
            <p class="text-xs font-medium uppercase tracking-[0.35em] text-primary/90">Socials</p>
            <h2 class="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {{ component.title }}
            </h2>
          </div>
          <p class="max-w-2xl text-base leading-7 text-muted sm:text-lg lg:text-right">
            {{ component.description }}
          </p>
        </div>

        <UMarquee :speed="18" pause-on-hover class="overflow-hidden">
          <div class="flex min-w-full items-center justify-evenly gap-8 px-8 pr-8">
            <template v-for="social in component.socials" :key="social.platform">
              <a
                v-if="social.visible"
                :href="social.platform === 'youtube' ? `https://youtube.com/@${social.handle}` : social.platform === 'instagram' ? `https://www.instagram.com/${social.handle}` : social.platform === 'tiktok' ? `https://www.tiktok.com/@${social.handle}` : social.platform === 'discord' ? `https://discord.gg/${social.handle}` : `mailto:${social.handle}`"
                target="_blank"
                rel="noreferrer"
                class="inline-flex h-16 w-16 flex-none items-center justify-center text-muted transition hover:text-primary"
                :aria-label="social.platform"
              >
                <UIcon
                  :name="social.platform === 'youtube' ? 'i-simple-icons-youtube' : social.platform === 'instagram' ? 'i-simple-icons-instagram' : social.platform === 'tiktok' ? 'i-simple-icons-tiktok' : social.platform === 'discord' ? 'i-simple-icons-discord' : 'i-lucide-mail'"
                  class="h-8 w-8"
                />
              </a>
            </template>
          </div>
        </UMarquee>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type PageComponent =
  | { type: 'hero'; title: string; description: string; bannerUrl: string }
  | { type: 'jobs'; title: string; description: string }
  | { type: 'socials'; title: string; description: string; socials: Array<{ platform: 'youtube' | 'instagram' | 'tiktok' | 'discord' | 'email'; handle: string; visible: boolean }> }

defineProps<{
  components: PageComponent[]
}>()
</script>
