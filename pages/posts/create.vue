<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div id="my-item" />
  <button @click="onSend">
    Envie se form
  </button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const textEditor = ref()

useHead({
  title: 'Account',
  script: [
    { src: 'https://cdn.quilljs.com/1.3.6/quill.js' },
    { src: 'https://cdn.quilljs.com/1.3.6/quill.min.js' },
    { src: 'https://cdn.jsdelivr.net/npm/quilljs-markdown@latest/dist/quilljs-markdown.js' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css' },
    { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.3.6/quill.bubble.css' },

    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/quilljs-markdown@latest/dist/quilljs-markdown-common-style.css' }
  ]
})

onMounted(() => {
  const options = {
    placeholder: 'Escreva o seu post...',
    readOnly: false,
    theme: 'snow'
  }
  textEditor.value = new Quill('#my-item', options)
  new QuillMarkdown(textEditor.value)
  // textEditor.value = new SimpleMDE({ element: document.getElementById('my-item') })
})

const onSend = () => {
  console.log('textEditor => ', textEditor.value)
}

watchEffect(() => {
  if (user.value?.id == null) {
    navigateTo('/')
  }
})

const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#', color: 'bg-orange-100 text-orange-800' },
    description:
      'Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Paul York',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    readingTime: '6 min'
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    category: { name: 'Video', href: '#', color: 'bg-blue-100 text-blue-800' },
    description:
      'Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    author: {
      name: 'Dessie Ryan',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    readingTime: '4 min'
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#', color: 'bg-green-100 text-green-800' },
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iure iusto fugiat commodi sequi.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    author: {
      name: 'Easer Collins',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    readingTime: '11 min'
  }
]
</script>
