<script setup lang="ts">
// const { data: files } = useLazyFetch<any[]>('/api/search.json', { default: () => [], server: false })

// provide('navigation', navigation)
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <slot />
    </UMain>

    <AppFooter />

    <ClientOnly>
      <!-- <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      /> -->
    </ClientOnly>
  </div>
</template>
