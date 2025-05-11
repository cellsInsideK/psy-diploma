<script setup>

  useHead({ title: 'Тесты' })
</script>

<template>
  <UISection first>
    <div class="flex flex-col gap-8">
      <div class="bg-white rounded-md flex flex-col gap-5 p-5 md:p-14">
        <h2 class="text-ui-primary text-lg md:text-5xl font-medium">Тест на уровень стресса</h2>
        <NuxtLink to="/tests/1" class="bg-ui-accent w-fit px-12 py-3 text-white rounded-md cursor-pointer">Пройти тест
        </NuxtLink>
      </div>
      <div class="bg-white rounded-md flex flex-col gap-5 p-5 md:p-14">
        <h2 class="text-ui-primary text-lg md:text-5xl font-medium">Тест на уровень тревожности</h2>
        <NuxtLink to="/tests/2" class="bg-ui-accent w-fit px-12 py-3 text-white rounded-md cursor-pointer">Пройти тест
        </NuxtLink>
      </div>
      <div class="bg-white rounded-md flex flex-col gap-5 p-5 md:p-14">
        <h2 class="text-ui-primary text-lg md:text-5xl font-medium">Тест на эмоциональное выгорание</h2>
        <NuxtLink to="/tests/3" class="bg-ui-accent w-fit px-12 py-3 text-white rounded-md cursor-pointer">Пройти тест
        </NuxtLink>
      </div>
    </div>
  </UISection>
</template>