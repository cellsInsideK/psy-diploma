<script setup>
  import { toast } from 'vue-sonner';
  import { Calendar } from '~/components/ui/calendar';
  import { getImageUrl } from '~/lib/getImageUrl';
  import { getLocalTimeZone, today, isWeekday } from '@internationalized/date'

  const themes = ref([]);
  const sex = ref('Мужчина');
  const type = ref('КПТ');
  const format = ref('Онлайн');
  const step = ref('quest');
  const doctors = ref([]);
  const isOpen = ref(false);
  const value = ref(today(getLocalTimeZone()));
  const time = ref();
  const selected = ref({});
  const userStore = useUserStore();
  const router = useRouter();

  const handleSubmit = async () => {
    if (themes.value.length === 0) {
      return toast.error('Ошибка', { description: 'Необходимо выбрать тему обсуждения' })
    }

    const res = await $fetch('/api/doctors/find', { method: 'POST', body: { sex: sex.value, type: type.value, format: format.value } });
    if (res?.statusCode !== 200) {
      return toast.error(res?.message);
    }
    doctors.value = res.data;
    step.value = 'res'
  }

  const handleApp = async (id) => {
    selected.value = id;
    isOpen.value = true;
  }

  const handleSubmitApp = async () => {
    if (time.value.split(':')[0] >= 19 && time.value.split(':')[0] >= 9) {
      return toast.error('Ошибка', { description: 'Часы работы с 10 до 18' })
    }

    const res = await $fetch(`/api/appointment/${selected.value}`, {
      method: 'POST',
      body: {
        userId: userStore.user.id,
        themes: themes.value.join(';'),
        date: new Date(new Date(value.value).toISOString()),
        time: time.value
      }
    })

    if (res.statusCode !== 200) {
      return toast.error(res.message)
    }

    toast.success(res.message)
    return router.push('/')
  }

  definePageMeta({ middleware: 'auth' });
  useHead({ title: 'Форма записи' })
</script>

<template>
  <Dialog v-model:open="isOpen" class="p-5">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Выберите день записи</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4 w-full items-center justify-center">
        <Calendar locale="ru-RU" v-model="value" :weekday-format="'short'"
          :is-date-unavailable="(e) => !isWeekday(e, 'ru-RU')" :min-value="today(getLocalTimeZone())"
          class="rounded-md w-fit border" />
        <input v-model="time" type="time">
        <Button @click="handleSubmitApp" class="w-fit bg-ui-primary px-12 py-5 cursor-pointer">Записаться</Button>
      </div>
    </DialogContent>
  </Dialog>
  <UISection first>
    <template v-if="step === 'quest'">
      <h2 class="text-3xl font-medium text-ui-primary">
        Заполните анкету для записи к психологу
      </h2>
      <h3 class="text-xl font-medium text-ui-primary mt-3">
        Что бы вы хотели обсудить в первую очередь?
      </h3>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        Ваше состояние
      </h3>
      <div class="flex flex-col md:flex-row gap-3 md:justify-between max-w-3xl mt-3">
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.1">
            <input v-model="themes" value="стресс" type="checkbox" name="1" id="1.1">
            стресс
          </label>
          <label class="flex gap-3 text-lg" for="1.2">
            <input v-model="themes" value="нестабильная самооценка" type="checkbox" name="1" id="1.2">
            нестабильная самооценка
          </label>
          <label class="flex gap-3 text-lg" for="1.3">
            <input v-model="themes" value="перепады настроения" type="checkbox" name="1" id="1.3">
            перепады настроения
          </label>
        </div>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.4">
            <input v-model="themes" value="упадок сил" type="checkbox" name="1" id="1.4">
            упадок сил
          </label>
          <label class="flex gap-3 text-lg" for="1.5">
            <input v-model="themes" value="приступы страха и  тревоги" type="checkbox" name="1" id="1.5">
            приступы страха и тревоги
          </label>
          <label class="flex gap-3 text-lg" for="1.22">
            <input v-model="themes" value="раздражительность" type="checkbox" name="1" id="1.22">
            раздражительность
          </label>
        </div>
      </div>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        отношения
      </h3>
      <div class="flex flex-col md:flex-row gap-3 md:justify-between max-w-3xl mt-3">
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.6">
            <input v-model="themes" value="с партнером" type="checkbox" name="1" id="1.6">
            с партнером
          </label>
          <label class="flex gap-3 text-lg" for="1.7">
            <input v-model="themes" value="с родственниками" type="checkbox" name="1" id="1.7">
            с родственниками
          </label>
          <label class="flex gap-3 text-lg" for="1.8">
            <input v-model="themes" value="с окружающими" type="checkbox" name="1" id="1.8">
            с окружающими
          </label>
        </div>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.9">
            <input v-model="themes" value="с детьми" type="checkbox" name="1" id="1.9">
            с детьми
          </label>
          <label class="flex gap-3 text-lg" for="1.10">
            <input v-model="themes" value="с коллегами" type="checkbox" name="1" id="1.10">
            с коллегами
          </label>
          <label class="flex gap-3 text-lg" for="1.11">
            <input v-model="themes" value="сложности с социализацией" type="checkbox" name="1" id="1.11">
            сложности с социализацией
          </label>
        </div>
      </div>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        работа и учеба
      </h3>
      <div class="flex flex-col md:flex-row gap-3 md:justify-between max-w-3xl mt-3">
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.12">
            <input v-model="themes" value="недостаток мотивации" type="checkbox" name="1" id="1.12">
            недостаток мотивации
          </label>
          <label class="flex gap-3 text-lg" for="1.13">
            <input v-model="themes" value="трудности с концентрацией" type="checkbox" name="1" id="1.13">
            трудности с концентрацией
          </label>
          <label class="flex gap-3 text-lg" for="1.14">
            <input v-model="themes" value="отсутствие цели" type="checkbox" name="1" id="1.14">
            отсутствие цели
          </label>
        </div>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.15">
            <input v-model="themes" value="выгорание" type="checkbox" name="1" id="1.15">
            выгорание
          </label>
          <label class="flex gap-3 text-lg" for="1.200">
            <input v-model="themes" value="прокрастинация" type="checkbox" name="1" id="1.200">
            прокрастинация
          </label>
          <label class="flex gap-3 text-lg" for="1.17">
            <input v-model="themes" value="смена или потеря работы" type="checkbox" name="1" id="1.17">
            смена или потеря работы
          </label>
        </div>
      </div>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        жизненные события
      </h3>
      <div class="flex flex-col md:flex-row gap-3 md:justify-between max-w-3xl mt-3">
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.18">
            <input v-model="themes" value="переезд, эмиграция" type="checkbox" name="1" id="1.18">
            переезд, эмиграция
          </label>
          <label class="flex gap-3 text-lg" for="1.19">
            <input v-model="themes" value="разрыв отношений" type="checkbox" name="1" id="1.19">
            разрыв отношений
          </label>
          <label class="flex gap-3 text-lg" for="1.20">
            <input v-model="themes" value="утрата близкого человека" type="checkbox" name="1" id="1.20">
            утрата близкого человека
          </label>
        </div>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.21">
            <input v-model="themes" value="беременность, родительство" type="checkbox" name="1" id="1.21">
            беременность, родительство
          </label>
          <label class="flex gap-3 text-lg" for="1.2431">
            <input v-model="themes" value="финансовые изменения" type="checkbox" name="1" id="1.2431">
            финансовые изменения
          </label>
          <label class="flex gap-3 text-lg" for="1.23">
            <input v-model="themes" value="болезни" type="checkbox" name="1" id="1.23">
            болезни
          </label>
        </div>
      </div>
      <h3 class="text-xl font-medium text-ui-primary mt-3">
        Предпочтения к специалисту
      </h3>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        пол
      </h3>
      <div class="flex flex-col gap-3">
        <label class="flex gap-3 text-lg" for="2.1">
          <input v-model="sex" value="Мужчина" type="radio" name="2" id="2.1">
          Мужчина
        </label>
        <label class="flex gap-3 text-lg" for="2.2">
          <input v-model="sex" value="Женщина" type="radio" name="2" id="2.2">
          Женщина
        </label>
      </div>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        методики работы
      </h3>
      <div class="flex flex-col gap-3">
        <label class="flex gap-3 text-lg" for="2.3">
          <input v-model="type" value="КПТ" type="radio" name="3" id="2.3">
          КПТ
        </label>
        <label class="flex gap-3 text-lg" for="2.4">
          <input v-model="type" value="Гештальт-терапия" type="radio" name="3" id="2.4">
          Гештальт-терапия
        </label>
        <label class="flex gap-3 text-lg" for="2.5">
          <input v-model="type" value="Психоаналитическая терапия" type="radio" name="3" id="2.5">
          Психоаналитическая терапия
        </label>
      </div>
      <h3 class="text-lg font-medium text-ui-primary mt-3">
        формат встреч
      </h3>
      <div class="flex flex-col gap-3">
        <label class="flex gap-3 text-lg" for="2.6">
          <input v-model="format" value="Онлайн" type="radio" name="4" id="2.6">
          Онлайн
        </label>
        <label class="flex gap-3 text-lg" for="2.7">
          <input v-model="format" value="Очно" type="radio" name="4" id="2.7">
          Очно
        </label>
      </div>
      <Button @click="handleSubmit" class="w-fit bg-ui-accent px-14 py-5 mt-4 cursor-pointer">Отправить</Button>
    </template>
    <template v-else>
      <h2 class="text-3xl font-medium text-ui-primary">
        На основании ваших требований подобрали специалиста:
      </h2>
      <div class="flex flex-row flex-wrap mt-4 gap-5">
        <template v-if="doctors.length > 0">
          <template v-for="doctor in doctors">
            <NuxtLink :to="`/doctors/${doctor.doctors.id}`" class="flex flex-col rounded-md bg-transparent">
              <img :src="getImageUrl(doctor.doctors.photoUrl)" class="max-h-[310px] max-w-[260px] object-contain"
                alt="">
              <div class=" p-3 flex flex-col gap-3 bg-white">
                <h2 class="font-medium text-xl text-ui-primary">{{ doctor.users.login }}</h2>
                <p class="text-ui-primary">{{ doctor.doctors.specialization }}</p>
                <p class="text-ui-primary">Опыт: {{ doctor.doctors.experience }} лет</p>
                <p class="text-ui-primary">Формат работы: {{ doctor.doctors.workFormat }}</p>
                <Button @click.prevent="handleApp(doctor.doctors.id)"
                  class="bg-ui-accent w-fit px-12 py-5 cursor-pointer">Записаться</Button>
              </div>
            </NuxtLink>
          </template>
        </template>
        <template v-else>
          <p>Ничего не нашлось</p>
        </template>
      </div>
    </template>
  </UISection>
</template>