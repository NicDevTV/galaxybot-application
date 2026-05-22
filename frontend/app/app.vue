<template>
  <UApp :toaster="{ expand: false }">
    <div class="min-h-screen bg-default text-default">

      <UHeader title="Nuxt UI Seite mal gebastelt um wieder reinzukommen">
        <template #right>
          <UBadge color="primary">
            Online(logischerweise)
          </UBadge>
        </template>
      </UHeader>

      <div class="container mx-auto py-10">

        <div class="grid gap-6 md:grid-cols-2">

          <UCard>
            <template #header>
              <h1 class="text-2xl font-bold">
                Dashboard
              </h1>
            </template>

            <p class="text-muted mb-4">
              Ganz basic Nuxt UI wurde integriert, um zukünftig damit zu arbeiten
            </p>

            <UButton
              icon="i-lucide-rocket"
              color="primary"
              variant="outline"
              @click="showToast"
            >
              Geiler Button
            </UButton>
          </UCard>

          <UCard>
            <template #header>
              Mal ne Progressbar reingeknallt
            </template>

            <UProgress
              color="primary"
              :model-value="90"
            />

            <div class="mt-4 text-sm text-muted">
              Progress meiner Test Bar: 90%
            </div>
          </UCard>

        </div>

      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Krass ey',
    description: 'Du weißt, wie man einen Button drückt.',
    color: 'primary',
    icon: 'i-lucide-rocket',
    avatar: {src: 'https://avatars.githubusercontent.com/u/130746231?v=4'}
  })
}
</script>