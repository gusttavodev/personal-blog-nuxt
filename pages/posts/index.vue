<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <button
        type="button"
        class="
          flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md
          shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-indigo-500 my-5
        "
        @click="auth.signOut()"
      >
        Sair
      </button>
      <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Ultimas publicações
        </h2>
        <p class="mt-3 text-xl text-gray-500 sm:mt-4">
          Seja bem vindo ao meu blog, aqui falo sobre Tech, Vida, Cripto e Magick.
        </p>
      </div>
      <div class="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
        <div v-for="post in posts" :key="post.title">
          <div class="flex gap-3">
            <div v-for="category in post.categories" :key="category.name">
              <a :href="category.href" class="inline-block">
                <span :class="[category.color, 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium']">
                  {{ category.name }}
                </span>
              </a>
            </div>
          </div>

          <a :href="post.path" class="block mt-4">
            <p class="text-xl font-semibold text-gray-900">
              {{ post.title }}
            </p>
            <p class="mt-3 text-base text-gray-500">
              {{ post.description }}
            </p>
          </a>
          <div class="mt-6 flex items-center">
            <div class="flex-shrink-0">
              <a>
                <span class="sr-only">{{ post.profiles.username }}</span>
                <img class="h-10 w-10 rounded-full" :src="post.profiles.avatar_url" alt="">
              </a>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                <a>
                  {{ post.profiles.username }}
                </a>
              </p>
              <div class="flex space-x-1 text-sm text-gray-500">
                <time :datetime="post.created_at">
                  {{ new Date(post.created_at).toLocaleDateString() }}
                </time>
                <span aria-hidden="true"> &middot; </span>
                <span> {{ post.read_time }} minutos </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { User } from '@supabase/supabase-js'
import { Post } from '~/types/post'

const user: Ref<User> = useSupabaseUser()
const client = useSupabaseClient()

watchEffect(() => {
  if (user.value?.id == null) {
    navigateTo('/')
  }
})

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await client.from<Post>('posts')
    .select(
      'id, title, description, path, read_time, categories, created_at, profiles(username, avatar_url)'
    )
    .eq('user', user.value.id)
    .order('created_at')
  return data
})

</script>
