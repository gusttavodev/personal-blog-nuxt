
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->
    <Popover as="template" v-slot="{ open }">
      <header :class="[open ? 'fixed inset-0 z-40 overflow-y-auto' : '', 'bg-white shadow-sm lg:static lg:overflow-y-visible']">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
            <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
              <div class="flex-shrink-0 flex items-center">
                <a href="#">
                  <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500" alt="Workflow" />
                </a>
              </div>
            </div>
            <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <div class="w-full">
                  <label for="search" class="sr-only">Search</label>
                  <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input id="search" name="search" class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm" placeholder="Search" type="search" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
              <!-- Mobile menu button -->
              <PopoverButton class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                <span class="sr-only">Open menu</span>
                <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
            <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <a href="#" class="text-sm font-medium text-gray-900 hover:underline"> Go Premium </a>
              <a href="#" class="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </a>

              <!-- Profile dropdown -->
              <Menu as="div" class="flex-shrink-0 relative ml-5">
                <div>
                  <MenuButton class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>

              <a href="#" class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"> New Post </a>
            </div>
          </div>
        </div>

        <PopoverPanel as="nav" class="lg:hidden" aria-label="Global">
          <div class="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
            <a v-for="item in navigation" :key="item.name" :href="item.href" :aria-current="item.current ? 'page' : undefined" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50', 'block rounded-md py-2 px-3 text-base font-medium']">{{ item.name }}</a>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
                <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
              </div>
              <button type="button" class="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
              <a v-for="item in userNavigation" :key="item.name" :href="item.href" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">{{ item.name }}</a>
            </div>
          </div>

          <div class="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
            <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"> New Post </a>

            <div class="mt-6 flex justify-center">
              <a href="#" class="text-base font-medium text-gray-900 hover:underline"> Go Premium </a>
            </div>
          </div>
        </PopoverPanel>
      </header>
    </Popover>
    <div class="py-10 wmax-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <slot name="header" >

    </slot>
    </div>
    <div class="py-10 wmax-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <slot name="content" >

      </slot>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusSmIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/vue/solid'
import { BellIcon, FireIcon, HomeIcon, MenuIcon, TrendingUpIcon, UserGroupIcon, XIcon } from '@heroicons/vue/outline'

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Popular', href: '#', icon: FireIcon, current: false },
  { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const communities = [
  { name: 'PHP', href: '#' },
  { name: 'Laravel', href: '#' },
  { name: 'Nuxt', href: '#' },
  { name: 'Life', href: '#' },
  { name: 'JS', href: '#' }
]
const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
]
const questions = [
  {
    id: '81614',
    likes: '29',
    replies: '11',
    views: '2.7k',
    author: {
      name: 'Dries Vincent',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    date: 'December 9 at 11:43 AM',
    datetime: '2020-12-09T11:43:00',
    href: '#',
    title: 'What would you have done differently if you ran Jurassic Park?',
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  // More questions...
]
const whoToFollow = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
    comments: 291,
  },
  // More posts...
]
</script>
