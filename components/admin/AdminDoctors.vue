<script setup>
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
  import CreateDoctorModal from '../modals/CreateDoctorModal.vue';

  const doctors = ref([]);

  const isLoading = ref(false);
  const isCreateOpen = ref(false);

  const getDoctors = async () => {
    isLoading.value = true;
    const data = await $fetch('/api/doctors');
    isLoading.value = false

    if (data.statusCode === 200) {
      return doctors.value = data.data
    }

    return toast.error('Ошибка', { description: 'Не удалось получить данные' })
  }

  onMounted(async () => {
    await getDoctors();
  })

  const handleDeleteDoctor = async (id) => {
    const data = await $fetch(`/api/doctors/${id}`, { method: 'DELETE' });

    if (data.statusCode === 200) {
      toast.success('Врач удален');
      return await getDoctors();
    }

    return toast.error('Ошибка', { description: 'Не удалось удалить врача' })
  }

</script>

<template>
  <UiLoader :is-loading="isLoading">
    <CreateDoctorModal v-model:is-open="isCreateOpen" @created="getDoctors" />
    <Button @click="isCreateOpen = true" class="bg-ui-primary my-4 px-14 py-5 cursor-pointer text-lg">Добавить
      врача</Button>
    <Table v-if="doctors.length > 0" class="border rounded-lg">
      <TableHeader class="bg-ui-primary">
        <TableRow>
          <TableHead class="text-white rounded-tl-lg">Имя</TableHead>
          <TableHead class="text-white">Квалификация</TableHead>
          <TableHead class="text-white">Опыт работы</TableHead>
          <TableHead class="text-white">Формат работы</TableHead>
          <TableHead class="text-white">Методы</TableHead>
          <TableHead class="text-white">Описание</TableHead>
          <TableHead class="text-white rounded-tr-lg">Удалить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="bg-white">
        <TableRow v-for="item in doctors" :key="item.id">
          <TableCell>{{ item.users.login }}</TableCell>
          <TableCell>{{ item.doctors.specialization }}</TableCell>
          <TableCell>{{ item.doctors.experience }}</TableCell>
          <TableCell>{{ item.doctors.workFormat }}</TableCell>
          <TableCell>{{ item.doctors.method }}</TableCell>
          <TableCell class="max-w-[250px] overflow-hidden" :title="item.doctors.bio">{{ item.doctors.bio }}</TableCell>
          <TableCell>
            <IconDelete @click="handleDeleteDoctor(item.doctors.id)" class="cursor-pointer ml-4" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <template v-else>
      <p class="text-center">Здесь, пока что, нет данных</p>
    </template>
  </UiLoader>
</template>