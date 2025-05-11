<script setup lang="ts">
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import type { SelectUsers } from '~/server/database/schema';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
  import EditUserModal from '../modals/EditUserModal.vue';
  import CreateUserModal from '../modals/CreateUserModal.vue';

  const userType = {
    "admin": 'Администратор',
    "doctor": 'Доктор',
    "user": 'Пациент',
  }

  const users = ref<SelectUsers[]>([]);

  const isLoading = ref(false);
  const isOpen = ref(false);
  const isCreateOpen = ref(false);
  const selectedUser = ref<SelectUsers>({} as SelectUsers);

  const getUsers = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/user');
    isLoading.value = false

    if (data.statusCode === 200) {
      return users.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  onMounted(async () => {
    await getUsers();
  })

  const handleDeleteUser = async (id: string) => {
    const data = await $fetch<{ statusCode: number }>(`/api/user/${id}`, { method: 'DELETE' });

    if (data.statusCode === 200) {
      toast.success('Пользователь удален');
      return await getUsers();
    }

    return toast.error('Ошибка', { description: 'Не удалось удалить пользователя' })
  }

  const handleEditUser = async (user: SelectUsers) => {
    selectedUser.value = user;
    isOpen.value = true;
  }
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <CreateUserModal v-model:is-open="isCreateOpen" @created="getUsers" />
    <EditUserModal :user="selectedUser" v-model:is-open="isOpen" @updated="getUsers" />
    <Button @click="isCreateOpen = true" class="bg-ui-primary my-4 px-14 py-5 cursor-pointer text-lg">Добавить
      пользователя</Button>
    <Table v-if="users.length > 0" class="border rounded-lg">
      <TableHeader class="bg-ui-primary">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg">Имя</TableHead>
          <TableHead class="text-white">Email</TableHead>
          <TableHead class="text-white w-[100px]">Пароль</TableHead>
          <TableHead class="text-white">Роль</TableHead>
          <TableHead class="text-white">Удалить</TableHead>
          <TableHead class="text-white w-fit rounded-tr-lg">Изменить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="bg-white">
        <TableRow v-for="item in users" :key="item.id">
          <TableCell>{{ item.login }}</TableCell>
          <TableCell>{{ item.email }}</TableCell>
          <TableCell class=" max-w-[250px] overflow-hidden" :title="item.passwordHash">{{ item.passwordHash }}
          </TableCell>
          <TableCell>{{ userType[item.type!] }}</TableCell>
          <TableCell>
            <IconDelete @click="handleDeleteUser(item.id)" class="cursor-pointer ml-4" />
          </TableCell>
          <TableCell>
            <img @click="handleEditUser(item)" src="/edit.svg" class="cursor-pointer ml-4" alt="">
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>