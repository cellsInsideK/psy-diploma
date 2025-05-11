<script setup>
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
  import { getLocaleDate } from '~/lib/toLocaleDate';

  const appointments = ref([]);
  const isLoading = ref(false);

  const getAppointments = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/appointment');
    isLoading.value = false

    if (data.statusCode === 200) {
      return appointments.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  onMounted(async () => {
    await getAppointments();
  })

  const handleDeleteAppointment = async (id) => {
    const data = await $fetch(`/api/appointment/${id}`, { method: 'DELETE' });

    if (data.statusCode === 200) {
      toast.success('Запись удалена');
      return await getAppointments();
    }

    return toast.error('Ошибка', { description: 'Не удалось удалить запись' })
  }
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <Table v-if="appointments.length > 0" class="border rounded-lg mt-4">
      <TableHeader class="bg-ui-primary">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg">Пациент</TableHead>
          <TableHead class="text-white">Врач</TableHead>
          <TableHead class="text-white">Дата</TableHead>
          <TableHead class="text-white">Время</TableHead>
          <TableHead class="text-white">Темы</TableHead>
          <TableHead class="text-white rounded-tr-lg">Удалить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="bg-white">
        <TableRow v-for="item in appointments" :key="item?.appointments?.id">
          <TableCell>{{ item.users.login }}</TableCell>
          <TableCell>{{ item.doctorInfo.login }}</TableCell>
          <TableCell>{{ getLocaleDate(new Date(item.appointments.date)) }}</TableCell>
          <TableCell>{{ item.appointments.time }}</TableCell>
          <TableCell>{{ item.appointments.themes }}</TableCell>
          <TableCell>
            <IconDelete @click="handleDeleteAppointment(item.id)" class="cursor-pointer ml-4" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>