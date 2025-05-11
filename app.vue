<script setup lang="ts">
  import { Toaster } from './components/ui/sonner';

  const router = useRouter();
  const userStore = useUserStore();
  const res = await userStore.session();

  watch(() => userStore.isAuthenticated, (newVal, oldVal) => {
    if (oldVal === true && newVal === false) {
      return router.push('/')
    }
  })
</script>

<template>
  <ClientOnly>
    <Toaster />
  </ClientOnly>
  <UIHeader />
  <main class="flex flex-col flex-1 -mt-[104px]">
    <NuxtPage />
  </main>
  <UIFooter />
</template>

<style>
  body {
    font-family: 'Manrope';
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    color: black;
    background-color: rgb(237, 238, 231);
  }

  body>#__nuxt {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
</style>