<template>
  <div class="min-h-screen bg-default text-default">
    <UHeader title="Applications" />
    <ApplicationPagePreview :components="components" />
  </div>
</template>

<script setup lang="ts">
type PageComponent =
  | { type: 'hero'; title: string; description: string; bannerUrl: string }
  | { type: 'jobs'; title: string; description: string }
  | { type: 'socials'; title: string; description: string; socials: Array<{ platform: 'youtube' | 'instagram' | 'tiktok' | 'discord' | 'email'; handle: string; visible: boolean }> }

const apiBase = 'http://127.0.0.1:3001'
const { data } = await useFetch<{ components: PageComponent[] }>(`${apiBase}/api/application-settings`)
const components = computed(() => data.value?.components ?? [])
</script>
