<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { toast } from 'vue-sonner';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import type { SelectUsers } from '~/server/database/schema';
  import { validateEmail } from '~/lib/validation';

  const isOpen = defineModel<boolean>('isOpen');
  const emit = defineEmits<{
    (e: 'created'): void
  }>();

  const form = reactive({ login: '', email: '', password: '', type: 'user' });
  const isFormLoading = ref(false);

  const handleSubmit = async () => {
    if (form.login === '' || form.email === '' || form.password === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    if (!validateEmail(form.email))
      return toast.error('Ошибка', { description: 'Неверно указана почта' })

    if (form.password.length < 6)
      return toast.error('Ошибка', { description: 'Длина пароля должна быть от 6 символов' })

    isFormLoading.value = true;
    const res = await $fetch(`/api/register?admin=true`, { method: 'POST', body: { ...form } });
    isFormLoading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    toast.success("Пользователь создан");
    emit('created')
    return isOpen.value = false;
  }
</script>

<template>
  <Dialog v-model:open="isOpen" class="p-5">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление пользователя</DialogTitle>
        <DialogDescription>
          Заполните все поля для добавления пользвоателя
        </DialogDescription>
      </DialogHeader>
      <Label for="login">Логин</Label>
      <Input class="border-2 border-ui-primary" v-model="form.login" id="login" type="text"
        placeholder="Введите логин пользователя" />

      <Label for="email">Email</Label>
      <Input class="border-2 border-ui-primary" v-model="form.email" id="email" type="text"
        placeholder="Введите email пользователя" />

      <Label for="passwordHash">Пароль</Label>
      <Input class="border-2 border-ui-primary" v-model="form.password" id="passwordHash" type="text"
        placeholder="Введите пароль пользователя" />

      <Label>Роль</Label>
      <Select v-model="form.type">
        <SelectTrigger class="w-full border-2 border-ui-primary">
          <SelectValue placeholder="Выберите роль пользователя" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="admin">
              Администратор
            </SelectItem>
            <SelectItem value="user">
              Пациент
            </SelectItem>
            <SelectItem value="doctor">
              Доктор
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <DialogFooter>
        <Button @click="handleSubmit" :disabled="isFormLoading"
          class="w-full shadow-lg shadow-slate-400 bg-ui-primary cursor-pointer">
          Создать пользователя</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>