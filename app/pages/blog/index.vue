<script setup lang="ts">
const { fetchPosts } = usePosts()

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: posts } = useAsyncData('posts', () => fetchPosts())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogList>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :title="post.title"
          :description="post.description"
          :to="`/blog${post.path}`"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :image="{ ...post.image, crossorigin: 'anonymous' }"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2'
          }"
        >
          <template #image>
            <NuxtImg
              v-if="post.image"
              class="object-cover object-top w-full h-full transform transition-transform duration-200 group-hover:scale-105"
              :src="post.image.src"
              :alt="post.image.alt"
              crossorigin="anonymous"
            />
          </template>
        </UBlogPost>
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>
