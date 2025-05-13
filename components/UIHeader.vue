<script setup lang="ts">
  import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

  const userStore = useUserStore();
  const open = ref(false);
  const profileName = computed(() => {
    if (!userStore.isAuthenticated) {
      return ''
    }

    if (userStore.user?.type === 'admin') {
      return 'администратора'
    } else if (userStore.user?.type === 'doctor') {
      return 'психолога'
    } else {
      return 'пользователя'
    }
  })
</script>

<template>
  <nav class="container mx-auto bg-transparent z-1 flex justify-between items-center py-8 px-2 max-h-[104px]">
    <NuxtLink to="/" class="font-medium text-2xl text-ui-primary">Equilibra</NuxtLink>
    <div class="hidden lg:flex items-center gap-28">
      <NuxtLink class="text-ui-primary font-medium text-lg" :to="{ path: '/', hash: '#faq' }">FAQ</NuxtLink>
      <NuxtLink class="text-ui-primary font-medium text-lg" to="/tests">Тесты</NuxtLink>
      <NuxtLink class="text-ui-primary font-medium text-lg" to="/appointment">Запись</NuxtLink>
      <NuxtLink v-if="userStore.isAuthenticated" class="text-ui-primary font-medium text-lg" to="/profile">Личный
        кабинет {{ profileName }}</NuxtLink>
    </div>
    <div class="hidden lg:block">
      <NuxtLink v-if="!userStore.isAuthenticated" to="/login"
        class="bg-ui-accent text-white rounded-md font-medium text-lg px-14 py-2 cursor-pointer">Войти</NuxtLink>
      <NuxtLink @click="userStore.logout" v-else
        class="bg-ui-accent text-white rounded-md font-medium text-lg px-14 py-2 cursor-pointer">Выйти</NuxtLink>
    </div>
    <div class="block lg:hidden">
      <Popover v-model:open="open">
        <PopoverTrigger class="cursor-pointer">
          <img src="/burger.svg" alt="">
        </PopoverTrigger>
        <PopoverContent class="flex flex-col gap-3">
          <NuxtLink class="text-ui-primary font-medium text-lg" :to="{ path: '/', hash: '#faq' }">FAQ</NuxtLink>
          <NuxtLink @click="open = false" class="text-ui-primary font-medium text-lg" to="/tests">Тесты</NuxtLink>
          <NuxtLink @click="open = false" class="text-ui-primary font-medium text-lg" to="/appointment">Запись
          </NuxtLink>
          <NuxtLink @click="open = false" v-if="userStore.isAuthenticated" class="text-ui-primary font-medium text-lg"
            to="/profile">Личный кабинет {{ profileName }}</NuxtLink>
          <NuxtLink @click="open = false" v-if="!userStore.isAuthenticated" to="/login"
            class="text-ui-primary font-medium text-lg">Войти
          </NuxtLink>
          <NuxtLink @click="userStore.logout" v-else class="text-ui-primary font-medium text-lg cursor-pointer">Выйти
          </NuxtLink>
        </PopoverContent>
      </Popover>
    </div>
  </nav>
</template>