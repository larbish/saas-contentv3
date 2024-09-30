<script setup lang="ts">
import { joinURL, isRelative } from 'ufo'

const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, async () => {
  const post = await queryCollection('posts').path(`/${route.params.slug}`).first()
  console.log('post :', post)
  if (Array.isArray(post.authors) && post.authors.length) {
    post.authors = await Promise.all(post.authors.map((author) => {
      return queryCollection('authors').where('slug', '=', author).first() || []
    }))
  }

  return post
})
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

// TODO fix surround
// const { data: surround } = await useAsyncData('surround' + route.params.slug, () => {
//   return getSurroundingCollectionItems('posts', `/${route.params.slug}`, {
//     before: 1,
//     after: 1
//   })
// })

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (post.value.image?.src) {
  const site = useSiteConfig()

  const url = isRelative(post.value.image.src) ? joinURL(site.url, post.value.image.src) : post.value.image.src
  useSeoMeta({
    ogImage: url,
    twitterImage: url
  })
} else {
  defineOgImageComponent(
    'OgImageSaas',
    {
      title,
      description,
      headline: 'Blog'
    }
  )
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time class="text-gray-500 dark:text-gray-400">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            :alt="author.name"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody prose>
        <MDCRenderer
          v-if="post"
          :body="post.body"
        />

        <!-- <hr v-if="surround?.length">

        <UContentSurround :surround="surround" /> -->
      </UPageBody>

      <!-- <template #right>
        <UContentToc
          v-if="post.body && post.body.toc"
          :links="post.body.toc.links"
        />
      </template> -->
    </UPage>
  </UContainer>
</template>
