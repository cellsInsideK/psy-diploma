<script setup lang="ts">
  import { toast } from 'vue-sonner';
  import { Input } from '~/components/ui/input';
  import { validateEmail } from '~/lib/validation';
  import type { SelectUsers } from '~/server/database/schema';

  const form = reactive({ login: '', email: '', password: '', confirmPassword: '' });
  const loading = ref(false);
  const userStore = useUserStore();
  const router = useRouter();

  const handleRegister = async () => {
    if (form.login === '' || form.email === '' || form.password === '' || form.confirmPassword === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    if (!validateEmail(form.email))
      return toast.error('Ошибка', { description: 'Неверно указана почта' })

    if (form.password.length < 6)
      return toast.error('Ошибка', { description: 'Длина пароля должна быть от 6 символов' })

    if (form.password !== form.confirmPassword)
      return toast.error('Ошибка', { description: 'Пароли не совпадают' })

    loading.value = true;
    const data = await $fetch('/api/register', { body: form, method: 'POST' })
    loading.value = false;

    if (data.statusCode !== 200) {
      return toast.error('Ошибка', { description: data.message })
    }

    userStore.user = data.data as SelectUsers;

    toast.success(data.message);
    return router.push('/')
  }

  useHead({ title: 'Регистрация' })
</script>

<template>
  <UISection radial class="h-dvh">
    <UISection class="flex flex-col h-full justify-center">
      <h2 class="text-3xl font-medium text-ui-primary">
        Регистрация
      </h2>
      <div class="flex flex-col gap-5 mt-4">
        <Input v-model="form.email" placeholder="E-mail" type="email"
          class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
        <Input v-model="form.login" placeholder="Ваше имя" type="text" id="name"
          class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
        <Input v-model="form.password" type="password" placeholder="Пароль"
          class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
        <Input v-model="form.confirmPassword" type="password" placeholder="Повторите пароль"
          class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
        <Button @click="handleRegister" :disabled="loading"
          class="w-fit bg-ui-accent px-14 py-6 text-lg cursor-pointer">Готово</Button>
      </div>
    </UISection>
  </UISection>
</template>