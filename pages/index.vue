<script setup>
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
  import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
  import Autoplay from 'embla-carousel-autoplay';
  import { toast } from 'vue-sonner';
  import { validateEmail } from '~/lib/validation';
  import { getImageUrl } from '~/lib/getImageUrl';

  const form = reactive({ name: '', email: '', comment: '' });
  const loading = ref(false);
  const doctors = ref([])

  const getDoctors = async () => {
    const res = await $fetch('/api/doctors');
    if (res?.statusCode !== 200) {
      return toast.error(res?.message);
    }
    doctors.value = res.data;
    doctors.value = doctors.value.slice(0, 4);
  }

  onMounted(async () => {
    await getDoctors();
  })

  const handleSubmit = async () => {
    if (form.comment.trim() === '' || form.name.trim() === '' || form.email.trim() === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    if (!validateEmail(form.email))
      return toast.error('Ошибка', { description: 'Неверно указана почта' })

    loading.value = true;
    const data = await $fetch('/api/feedback', { body: form, method: 'POST' })
    loading.value = false;
    form.comment = '';
    form.name = '';
    form.email = '';

    if (data.statusCode !== 200) {
      return toast.error('Ошибка', { description: data.message })
    }

    return toast.success(data.message);
  }

  useHead({ title: 'Equilibra' })
</script>

<template>
  <UISection radial class="h-dvh">
    <div class="container mx-auto px-2 h-full flex items-center justify-center">
      <div class="flex flex-col gap-12 items-center">
        <h2 class="text-3xl text-center font-medium text-ui-primary max-w-[650px]">
          Ваш первый шаг к гармонии и душевному спокойствию
        </h2>
        <NuxtLink to="/appointment" class="w-fit px-12 py-3 rounded-md bg-ui-accent text-white cursor-pointer">
          Записаться
        </NuxtLink>
      </div>
    </div>
  </UISection>
  <UISection>
    <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-12">Почему выбирают нас?</h2>
    <div class="flex flex-col md:flex-row flex-wrap gap-7 items-stretch justify-center text-ui-primary">
      <div class="flex flex-col border border-ui-primary rounded-md gap-4 p-6 w-full max-w-[380px]">
        <h3 class="text-2xl">Проверенные<br>специалисты</h3>
        <p>Только сертифицированные психотерапевты с опытом.</p>
      </div>
      <div class="flex flex-col border border-ui-primary rounded-md gap-4 p-6 w-full max-w-[380px]">
        <h3 class="text-2xl">Удобное<br>расписание</h3>
        <p>Выбирайте время, подходящее именно вам.</p>
      </div>
      <div class="flex flex-col border border-ui-primary rounded-md gap-4 p-6 w-full max-w-[380px]">
        <h3 class="text-2xl">Безопасность<br>и анонимность</h3>
        <p>Ваши данные надежно защищены.</p>
      </div>
    </div>
    <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-12">С чем мы можем помочь?</h2>
    <div class="flex flex-col md:flex-row flex-wrap gap-7 items-stretch justify-center text-ui-primary">
      <div class="flex flex-col border border-ui-primary rounded-md gap-4 p-6 w-full max-w-[380px]">
        <h3 class="text-2xl">Стресс<br>и выгорание</h3>
        <p>Мы поможем восстановить баланс.</p>
      </div>
      <div class="flex flex-col border border-ui-primary rounded-md gap-4 p-6 w-full max-w-[380px]">
        <h3 class="text-2xl">Тревожность<br>и панические атаки</h3>
        <p>Избавьтесь от чувства страха и найдите спокойствие.</p>
      </div>
      <div class="flex flex-col border border-ui-primary rounded-md gap-4 p-6 w-full max-w-[380px]">
        <h3 class="text-2xl">Депрессия<br>и подавленность</h3>
        <p>Психотерапия помогает справляться с грустью.</p>
      </div>
    </div>
  </UISection>
  <UISection linear>
    <UISection>
      <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-8">Выберите своего психотерапевта</h2>
      <p class="font-medium text-lg text-ui-primary max-w-2xl">
        В Equilibra представлены лучшие специалисты, которые готовы помочь вам разобраться в себе и своих чувствах.
      </p>
      <div class="flex flex-wrap gap-5 justify-center mt-4 items-center">
        <template v-for="doctor in doctors">
          <NuxtLink :to="`/doctors/${doctor.doctors.id}`" class="flex flex-col rounded-md bg-transparent">
            <img :src="getImageUrl(doctor.doctors.photoUrl)" class="max-h-[310px] max-w-[260px] object-contain" alt="">
            <div class=" p-3 flex flex-col gap-3 bg-white">
              <h2 class="font-medium text-xl text-ui-primary">{{ doctor.users.login }}</h2>
              <p class="text-ui-primary">{{ doctor.doctors.specialization }}</p>
              <p class="text-ui-primary">Опыт: {{ doctor.doctors.experience }} лет</p>
              <p class="text-ui-primary">Формат работы: {{ doctor.doctors.workFormat }}</p>
            </div>
          </NuxtLink>
        </template>

      </div>
    </UISection>
  </UISection>
  <UISection>
    <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-8">Отзывы</h2>
    <Carousel class="w-full" :plugins="[Autoplay()]">
      <CarouselContent>
        <CarouselItem>
          <div class="flex flex-col gap-5 border border-ui-primary rounded-md p-6">
            <div class="flex gap-4 items-center text-base text-ui-primary">
              <img src="/review1.png" class="size-16 rounded-full" alt="">
              <p>Ольга, 35 лет</p>
            </div>
            <p class="text-ui-primary text-lg">
              Сначала я сомневалась, стоит ли обращаться к психотерапевту,
              но консультации помогли мне вернуть спокойствие и уверенность.
              Я однозначно буду продолжать терапию в Equilibra.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="flex flex-col gap-5 border border-ui-primary rounded-md p-6">
            <div class="flex gap-4 items-center text-base text-ui-primary">
              <img src="/review2.png" class="size-16 rounded-full" alt="">
              <p>Елена, 28 лет</p>
            </div>
            <p class="text-ui-primary text-lg">
              После рождения ребёнка я чувствовала усталость, тревогу и одиночество,
              хотя всё вокруг говорили, что это "самое счастливое время". Благодаря терапии в Equilibra я научилась
              заботиться о себе.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="flex flex-col gap-5 border border-ui-primary rounded-md p-6">
            <div class="flex gap-4 items-center text-base text-ui-primary">
              <img src="/review3.png" class="size-16 rounded-full" alt="">
              <p>Кирилл, 39 лет</p>
            </div>
            <p class="text-ui-primary text-lg">
              Я долго держал всё в себе, думая, что «мужчина должен справляться сам». Но боль от утраты не проходила.
              Терапия в Equilibra помогла мне прожить горе, и найти силы жить дальше.
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </UISection>
  <UISection>
    <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-8">Мы готовы поделиться знаниями</h2>
    <p class="font-medium text-lg text-ui-primary max-w-2xl">
      Читайте наши статьи, чтобы узнать больше о психотерапии, методах
      самопомощи и важности заботы о своем ментальном здоровье.
    </p>
    <div class="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-4">
      <NuxtLink to="/articles/1" class="bg-white p-6 rounded-md max-w-[370px]">
        <h3 class="font-medium text-ui-primary">10 мифов о психотерапии, в которые пора перестать верить</h3>
      </NuxtLink>
      <NuxtLink to="/articles/2" class="bg-white p-6 rounded-md max-w-[370px]">
        <h3 class="font-medium text-ui-primary">Как понять, что вам нужен психотерапевт?</h3>
      </NuxtLink>
      <NuxtLink to="/articles/3" class="bg-white p-6 rounded-md max-w-[370px]">
        <h3 class="font-medium text-ui-primary">Эффективные методы борьбы с тревожностью</h3>
      </NuxtLink>
    </div>
  </UISection>
  <UISection id="faq">
    <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-8">Ответы на ваши вопросы</h2>
    <Accordion type="single" class="w-full" collapsible default-value="1">
      <AccordionItem value="1">
        <AccordionTrigger class="border-b-2 border-ui-accent rounded-none font-medium text-xl text-ui-primary">Как
          выбрать
          психотерапевта?</AccordionTrigger>
        <AccordionContent class=" mt-6 font-medium text-lg text-ui-primary flex flex-col gap-4">
          <p>Выбор психотерапевта — важный шаг к улучшению психоэмоционального состояния. Вот несколько советов от
            Equilibra:
          </p>
          <p>
            1. Определите свою проблему: тревожность, депрессия, личностный рост и т.д. <br>
            2. Узнайте методы работы: важно выбрать специалиста с подходом, который вам близок.<br>
            3. Проверьте опыт и отзывы: читайте реальную информацию о специалисте и его работе.<br>
            4. Оцените комфорт и доверие: важно, чтобы вам было легко открыться.<br>
            4. Уточните стоимость и формат: выбирайте подходящий формат — онлайн или очно.
          </p>
          <p>В Equilibra мы поможем найти специалиста, который поддержит вас на пути к внутреннему гармонии.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger class="border-b-2 border-ui-accent rounded-none font-medium text-xl text-ui-primary">Как
          записаться на
          консультацию?</AccordionTrigger>
        <AccordionContent class=" mt-6 font-medium text-lg text-ui-primary flex flex-col gap-4">
          <p>Чтобы записаться на консультацию, следуйте этим шагам:
          </p>
          <p>
            1. Заполните анкету: выберите, что вы хотите обсудить на сеансе — ваше состояние, отношения с семьёй или
            партнёром, работа, учёба или другие жизненные события. <br>
            2. Выберите психолога: укажите предпочтения по полу специалиста и подходу в психотерапии (например,
            когнитивно-поведенческая терапия, гештальт-терапия и другие). <br>
            3. Выберите удобную дату и время: выберите подходящее время для консультации. <br>
            4. Подтверждение: после отправки анкеты с вами свяжется наш менеджер для подтверждения записи.
          </p>
          <p>Все просто и удобно — в Equilibra мы поможем вам найти подходящего специалиста и начать терапию в удобное
            для вас время.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionTrigger class="border-b-2 border-ui-accent rounded-none font-medium text-xl text-ui-primary">Как
          проходят
          онлайн-консультации?
        </AccordionTrigger>
        <AccordionContent class=" mt-6 font-medium text-lg text-ui-primary flex flex-col gap-4">
          <p>
            Онлайн-консультации в Equilibra — это удобный и эффективный способ работать с психотерапевтом, не выходя
            из дома. Вот как это происходит:
          </p>
          <p>
            1. Запись на консультацию: Запишитесь через сайт, выбрав психолога, подходящий метод психотерапии и удобное
            время. <br>
            2. Получение ссылки: После подтверждения записи вы получите ссылку на онлайн-встречу на выбранную платформу
            (Zoom, Skype или другую). <br>
            3. Встреча с психологом: В назначенное время подключитесь по ссылке. Консультация проходит в формате видео-
            или аудио-сессии, в зависимости от ваших предпочтений. <br>
            4. Работа в комфортной обстановке: Психолог создаст пространство для открытого общения и поможет вам
            проработать ваши вопросы — будь то тревожность, отношения или жизненные трудности. <br>
            5. Завершение и поддержка: После сеанса психолог может дать рекомендации, предложить дальнейшие шаги или
            запланировать последующие консультации.
          </p>
          <p>
            Онлайн-консультации — это удобно, доступно и позволяет работать с лучшими специалистами, не выходя из дома.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </UISection>
  <UISection>
    <h2 class="font-medium text-2xl md:text-3xl text-ui-primary my-8">Свяжитесь с нами</h2>
    <p class="font-medium text-lg text-ui-primary max-w-2xl">
      Если у вас остались вопросы, наша команда поддержки всегда готова помочь.
    </p>
    <div class="flex flex-col gap-4 mt-4">
      <Input v-model="form.name" placeholder="Ваше имя" type="text" id="name"
        class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
      <Input v-model="form.email" placeholder="E-mail" type="email" id="email"
        class="p-5 text-lg rounded-md max-w-md border-ui-primary border" />
      <textarea v-model="form.comment" placeholder="Комментарий"
        class="p-4 text-lg rounded-md max-w-md min-h-[150px] border-ui-primary border" id="comment"></textarea>
      <Button @click="handleSubmit" :disabled="loading"
        class="w-fit bg-ui-accent px-14 py-6 text-lg cursor-pointer">Отправить</Button>
    </div>
  </UISection>
</template>