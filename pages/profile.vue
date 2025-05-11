<script setup>
  import { toast } from 'vue-sonner';
  import { getLocaleDate } from '~/lib/toLocaleDate';

  const userStore = useUserStore();
  const isLoading = ref(true);
  const data = ref([]);

  const getData = async () => {
    const res = await $fetch('/api/appointment/find', {
      body: { id: userStore.user?.id, type: userStore.user?.type },
      method: 'POST'
    })

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message })
    }
    data.value = res.data;
    isLoading.value = false
  }

  const handleDeleteAppointment = async (id) => {
    const data = await $fetch(`/api/appointment/${id}`, { method: 'DELETE' });

    if (data.statusCode === 200) {
      toast.success('Запись удалена');
      return await getAppointments();
    }

    return toast.error('Ошибка', { description: 'Не удалось удалить запись' })
  }

  onMounted(async () => {
    await getData()
  })

  useHead({ title: 'Личный кабинет' });
  definePageMeta({ middleware: 'auth' });
</script>

<template>
  <UISection first>
    <h2 class="text-3xl font-medium text-ui-primary">
      Мои записи
    </h2>
    <UiLoader :is-loading="isLoading">
      <Table v-if="data.length > 0" class="border rounded-lg mt-4">
        <TableHeader class="bg-ui-primary">
          <TableRow>
            <TableHead class="text-white rounded-tl-lg">{{ userStore.user.type === 'doctor' ? 'Пациент' : 'Врач' }}
            </TableHead>
            <TableHead class="text-white">Дата</TableHead>
            <TableHead class="text-white">Время</TableHead>
            <TableHead class="text-white">Темы</TableHead>
            <TableHead class="text-white rounded-tr-lg">Удалить</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="bg-white">
          <TableRow v-for="item in data" :key="item?.appointments?.id">
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
  </UISection>
</template>