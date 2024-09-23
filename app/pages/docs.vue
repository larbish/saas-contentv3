<script setup lang="ts">
const { data: navigation } = await useAsyncData('docs-navigation', () => getCollectionNavigation('docs'), { default: () => [] })
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <template #top>
            <!-- <UContentSearchButton
              class="rounded-md"
              size="sm"
            /> -->
          </template>

          <UNavigationTree :links="mapContentNavigation(navigation)" />
        </UAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>
