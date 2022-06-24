<template>
  <NuxtLayout :name="layout">
    <template #header>
         <div class="mt-6 flex items-center">
            <div class="flex-shrink-0">
              <a>
                <span class="sr-only">{{ posts?.profiles.username }}</span>
                <img class="h-10 w-10 rounded-full" :src="posts?.profiles.avatar_url" alt="">
              </a>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                <a>
                  {{ posts?.profiles.username }}
                </a>
              </p>
              <div class="flex space-x-1 text-sm text-gray-500">
                <time :datetime="posts?.created_at">
                  {{ new Date(posts?.created_at).toLocaleDateString() }}
                </time>
                <span aria-hidden="true"> &middot; </span>
                <span> {{ posts?.read_time }} minutos </span>
              </div>
            </div>
          </div>
    </template>
    <template #content>
      <div class="unreset">
        <ContentRenderer :value="data" />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { User } from '@supabase/supabase-js'
import { Post } from '~/types/post'

definePageMeta({
  layout: 'base'
})

const route = useRoute()
const postName = `articles/${route.params.slug}`
const { data } = await useAsyncData(postName, () => queryContent(postName).findOne())

const user: Ref<User> = useSupabaseUser()
const client = useSupabaseClient()

watchEffect(() => {
  if (user.value?.id == null) {
    navigateTo('/')
  }
})

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await client.from('posts')
    .select(
      'id, title, description, path, read_time, categories, created_at, profiles(username, avatar_url)'
    )
    .eq('user', user.value.id)
    .eq('path', route.params.slug)
    .limit(1)
    .single()
  return data
})
console.log("Tivemos a data +> ", posts)
</script>
<!-- # Import at separate CSS -->
<style>
html {
	box-sizing: content-box;
}

body {
	margin: 8px;
	line-height: normal;
}

p {
	margin: 1em 0;
}

blockquote,
figure {
	margin: 1em 40px;
}

q {
	quotes: "“" "”" "‘" "’";

	&:before {
		content: open-quote;
	}

	&:after {
		content: close-quote;
	}
}

hr {
	border: 1px inset;
	box-sizing: border-box;
	margin: 0.5em auto;
}

h1 {
	font-size: 2em;
	font-weight: bold;
	margin: 0.67em 0;
}

h2 {
	font-size: 1.5em;
	font-weight: bold;
	margin: 0.83em 0;
}

h3 {
	font-size: 1.17em;
	font-weight: bold;
	margin: 1em 0;
}

h4 {
	font-size: 1.00em;
	font-weight: bold;
	margin: 1.33em 0;
}

h5 {
	font-size: 0.83em;
	font-weight: bold;
	margin: 1.67em 0;
}

h6 {
	font-size: 0.67em;
	font-weight: bold;
	margin: 2.33em 0;
}

article, aside, nav, section {

	h1 {
		font-size: 1.5em;
		font-weight: bold;
		margin: 0.83em 0;
	}

	article, aside, nav, section {

		h1 {
			font-size: 1.17em;
			font-weight: bold;
			margin: 1em 0;
		}

		article, aside, nav, section {

			h1 {
				font-size: 1.00em;
				font-weight: bold;
				margin: 1.33em 0;
			}

			article, aside, nav, section {

				h1 {
					font-size: 0.83em;
					font-weight: bold;
					margin: 1.67em 0;
				}

				article, aside, nav, section {

					h1 {
						font-size: 0.67em;
						font-weight: bold;
						margin: 2.33em 0;
					}
				}
			}
		}
	}
}

table {
	border-collapse: separate;
	border-spacing: 2px;
	border-color: gray;
}

thead,
tbody,
tfoot,
tr {
	border-color: inherit;
	vertical-align: middle;
}

td, th {
	padding: 1px;
	vertical-align: inherit;
}

th {
	font-weight: bold
}

caption {
	text-align: center;
}

ul, menu {
	list-style-type: disc;
	margin: 1em 0;
	padding: 0 0 0 40px;
}

ol {
	list-style-type: decimal;
	margin: 1em 0;
	padding: 0 0 0 40px;
}

ul, ol {

	ul {
		list-style-type: circle;
	}

	ul, ol {

		ul {
			list-style-type: square;
		}
	}
}

dd {
	margin: 0 0 0 40px;
}

dl {
	margin: 1em 0;
}

ul, ol, menu, dl {

	ul, ol, menu, dl {
		margin: 0;
	}
}

legend {
	padding: 0 2px;
}

fieldset {
	border-style: groove;
	border-width: 2px;
	border: 2px groove ThreeDFace;
	margin: 0 2px;
	padding: 0 2px 3px;
	-webkit-padding-before: 0.35em;
	-webkit-padding-start: 0.75em;
	-webkit-padding-end: 0.75em;
	-webkit-padding-after: 0.625em;
}

ins {
	background-color: transparent;
	font-weight: inherit;
	text-decoration: underline;
}

b, strong {
	font-weight: bold;
}

i, cite, em, var, address, dfn {
	font-style: italic;
	font-weight: inherit;
}

abbr[title], dfn[title] {
	border-bottom: 0;
	cursor: default;
	font-weight: inherit;
}

tt, code, kbd, samp {
	font-family: monospace;
	font-weight: inherit;
}

pre {
	font-family: monospace;
	margin: 1em 0;
	white-space: pre;
}

mark {
	background-color: yellow;
	color: black;
	font-style: normal;
	font-weight: inherit;
}

big {
	font-size: larger;
	font-weight: inherit;
}

small {
	font-size: smaller;
	font-weight: inherit;
}

sub, sup {
	font-weight: inherit;
	line-height: inherit;
	position: static;
}

sub {
	font-size: smaller;
	bottom: 0;
	vertical-align: sub;
}

sup {
	font-size: smaller;
	top: 0;
	vertical-align: super;
}

ruby {

	> rt {
		font-size: 50%;
	}
}

iframe {
	border: 2px inset;
}
</style>
