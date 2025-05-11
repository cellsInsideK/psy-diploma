import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import type { SelectUsers } from '~/server/database/schema';

export const useUserStore = defineStore('user', () => {
  const user = ref<SelectUsers | undefined>(undefined);
  const isAuthenticated = computed(() => user.value !== undefined);

  const logout = async () => {
    const res = await $fetch('/api/logout');

    if (res.statusCode === 200)
      return user.value = undefined;
  }

  const session = async () => {
    const res = await $fetch('/api/session');
    user.value = res?.user as SelectUsers;
  }

  return { user, isAuthenticated, logout, session }
})