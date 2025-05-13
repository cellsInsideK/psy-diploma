import { defineNuxtRouteMiddleware, navigateTo, useUserStore } from "#imports";
import { toast } from "vue-sonner";

export default defineNuxtRouteMiddleware((to)=> {
  const userStore = useUserStore();

  if (userStore.user?.type !== 'admin' && to.path === '/admin') {
    return navigateTo('/')
  }

  if (!userStore.isAuthenticated) {
    toast.error('Ошибка', {description: 'Необходимо авторизироваться'})
    return navigateTo('/');
  }

  if (userStore.user?.type === 'admin' && to.path === '/profile') {
    return navigateTo('/admin');
  }
})