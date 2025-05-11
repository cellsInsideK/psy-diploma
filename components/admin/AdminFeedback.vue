<script setup lang="ts">
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import type { SelectFeedback, } from '~/server/database/schema';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

  const feedbacks = ref<SelectFeedback[]>([]);

  const isLoading = ref(false);

  const getFeedbacks = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/feedback');
    isLoading.value = false

    if (data.statusCode === 200) {
      return feedbacks.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  onMounted(async () => {
    await getFeedbacks();
  })

  const handleDeleteFeedback = async (id: string) => {
    const data = await $fetch(`/api/feedback/${id}`, { method: 'DELETE' });

    if (data.statusCode === 200) {
      toast.success('Пользователь удален');
      return await getFeedbacks();
    }

    return toast.error('Ошибка', { description: 'Не удалось удалить пользователя' })
  }
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <Table v-if="feedbacks.length > 0" class="border rounded-lg mt-4">
      <TableHeader class="bg-ui-primary">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg">Имя</TableHead>
          <TableHead class="text-white">Email</TableHead>
          <TableHead class="text-white w-[100px]">Текст</TableHead>
          <TableHead class="text-white rounded-tr-lg">Удалить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="bg-white">
        <TableRow v-for="item in feedbacks" :key="item.id">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.email }}</TableCell>
          <TableCell>{{ item.comment }}</TableCell>
          <TableCell>
            <IconDelete @click="handleDeleteFeedback(item.id)" class="cursor-pointer ml-4" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>