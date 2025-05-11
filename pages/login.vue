<script setup lang="ts">
  import { toast } from 'vue-sonner';
  import { Input } from '~/components/ui/input';
  import { validateEmail } from '~/lib/validation';
  import type { SelectUsers } from '~/server/database/schema';

  const form = reactive({ email: '', password: '' });
  const loading = ref(false);
  const userStore = useUserStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (form.email === '' || form.password === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    if (!validateEmail(form.email))
      return toast.error('Ошибка', { description: 'Неверно указана почта' })

    if (form.password.length < 6)
      return toast.error('Ошибка', { description: 'Длина пароля должна быть от 6 символов' })

    loading.value = true;
    const data = await $fetch('/api/login', { body: form, method: 'POST' })
    loading.value = false;

    if (data.statusCode !== 200) {
      return toast.error('Ошибка', { description: data.message })
    }

    userStore.user = data.user as SelectUsers;

    toast.success(data.message);
    return router.push('/')
  }

  useHead({ title: 'Авторизация' })
</script>

<template>
  <UISection radial class="h-dvh">
    <UISection class="flex flex-col h-full justify-center">
      <h2 class="text-3xl font-medium text-ui-primary">
        Авторизация
      </h2>
      <div class="flex flex-col gap-5 mt-4">
        <Input v-model="form.email" placeholder="E-mail" type="email"
          class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
        <Input v-model="form.password" placeholder="Пароль" type="password"
          class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
        <p class="text-ui-accent">Нет учетной записи?
          <span class="font-bold">
            <NuxtLink to="register">Зарегистрироваться</NuxtLink>
          </span>
        </p>
        <Button @click="handleLogin" :disabled="loading"
          class="w-fit bg-ui-accent px-14 py-6 text-lg cursor-pointer">Войти</Button>
      </div>
    </UISection>
  </UISection>
</template>