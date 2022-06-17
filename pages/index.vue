<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Faça seu login
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="mt-6">
          <div class="relative">
            <div class="relative flex justify-center text-sm">
              <button
                type="button"
                class="
                flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md
                shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500
              "
                @click="auth.signIn({ provider: 'github' })"
              >
                Entrar com GitHub
              </button>
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

const user: Ref<User> = useSupabaseUser()
const { auth } = useSupabaseClient()
watchEffect(() => {
  if (user.value) {
    navigateTo('/posts')
  }
})
</script>
