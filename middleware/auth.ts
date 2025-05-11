import { defineNuxtRouteMiddleware, navigateTo, useUserStore } from "#imports";

export default defineNuxtRouteMiddleware((to)=> {
  const userStore = useUserStore();

  if (userStore.user?.type !== 'admin' && to.path === '/admin') {
    return navigateTo('/')
  }

  if (!userStore.isAuthenticated) {
    return navigateTo('/');
  }

  if (userStore.user?.type === 'admin' && to.path === '/profile') {
    return navigateTo('/admin');
  }
})