<script setup>
  import { toast } from 'vue-sonner';
  import { getImageUrl } from '~/lib/getImageUrl';


  const id = useRoute().params.id;
  const isLoading = ref(true);
  const doctor = ref({});

  onMounted(async () => {
    const res = await $fetch(`/api/doctors/${id}`);

    if (res.statusCode !== 200) {
      return toast.error(res.message);
    }
    isLoading.value = false;
    doctor.value = res.data;

    useHead({ title: doctor.value.users.login })
  })
</script>

<template>
  <UiLoader :is-loading="isLoading">
    <UISection first>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4 md:gap-12">
          <img :src="getImageUrl(doctor.doctors.photoUrl)" class="md:max-h-[260px] md:max-w-[310px] object-contain"
            alt="">
          <div class="flex flex-col gap-4">
            <h2 class="text-ui-primary font-medium text-3xl">{{ doctor.users.login }}</h2>
            <p class="text-ui-primary text-lg font-medium">Квалификация: {{ doctor.doctors.specialization }}</p>
            <p class="text-ui-primary text-lg font-medium">Опыт работы: {{ doctor.doctors.experience }} лет</p>
            <p class="text-ui-primary text-lg font-medium">Формат работы: {{ doctor.doctors.workFormat }}</p>
            <p class="text-ui-primary text-lg font-medium">Методики: {{ doctor.doctors.method }}</p>
          </div>
        </div>
        <div>
          <h3 class="text-ui-primary font-medium text-2xl">О специалисте:</h3>
          <p>{{ doctor.doctors.bio }}</p>
        </div>
        <Button @click="$router.push('/appointment')"
          class="bg-ui-accent w-fit px-12 py-5 cursor-pointer">Записаться</Button>
      </div>
    </UISection>
  </UiLoader>

</template>