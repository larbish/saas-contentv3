<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

// TODO global nav
// const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
// const { data: files } = useLazyFetch<any[]>('/api/search.json', { default: () => [], server: false })

// provide('navigation', navigation)
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <!-- <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      /> -->
    </ClientOnly>

    <UNotifications />
  </div>
</template>
