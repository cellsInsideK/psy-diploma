<script setup lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

  useHead({ title: 'Админ-панель' });
  definePageMeta({ middleware: 'auth' });
</script>

<template>
  <UISection first>
    <Tabs default-value="user">
      <TabsList class="grid w-full grid-cols-4 gap-5">
        <TabsTrigger value="user"
          class="bg-ui-primary border-2 border-ui-primary p-2 text-white rounded-md text-md cursor-pointer data-[state=active]:text-ui-primary">
          Пользователи
        </TabsTrigger>
        <TabsTrigger value="doctor"
          class="bg-ui-primary border-2 border-ui-primary p-2 text-white rounded-md text-md cursor-pointer data-[state=active]:text-ui-primary">
          Врачи
        </TabsTrigger>
        <TabsTrigger value="app"
          class="bg-ui-primary border-2 border-ui-primary p-2 text-white rounded-md text-md cursor-pointer data-[state=active]:text-ui-primary">
          Записи
        </TabsTrigger>
        <TabsTrigger value="feedback"
          class="bg-ui-primary border-2 border-ui-primary p-2 text-white rounded-md text-md cursor-pointer data-[state=active]:text-ui-primary">
          Обратная связь
        </TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <AdminUsers />
      </TabsContent>
      <TabsContent value="doctor">
        <AdminDoctors />
      </TabsContent>
      <TabsContent value="app">
        Таблица записей
      </TabsContent>
      <TabsContent value="feedback">
        <AdminFeedback />
      </TabsContent>
    </Tabs>
  </UISection>
</template>