<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(`/${route.params.slug}`).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// TODO fix surround
// const { data: surround } = await useAsyncData('surround' + route.params.slug, () => {
//   return getSurroundingCollectionItems('docs', `/${route.params.slug}`, {
//     before: 1,
//     after: 1
//   })
// })

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImageComponent(
  'OgImageSaas',
  {
    title: page.value.title,
    description: page.value.description
  }
)

const headline = computed(() => findPageHeadline(page.value))
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :headline="headline"
    />

    <UPageBody prose>
      <MDCRenderer
        v-if="page"
        :body="page.body"
      />

      <!-- <hr v-if="surround?.length">

      <UContentSurround :surround="surround" /> -->
    </UPageBody>

    <template
      v-if="page.toc !== false"
      #right
    >
      <UContentToc :links="page.body?.toc?.links" />
    </template>
  </UPage>
</template>
