<script setup>
  import { reactive, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

  import { Button } from '../ui/button';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { createImageHash } from '~/lib/createImageHash';
  import { createClient } from "@supabase/supabase-js";

  const users = ref([]);
  const selectedUser = ref(undefined)
  const isOpen = defineModel('isOpen');
  const emit = defineEmits(['created']);

  const res = await $fetch('/api/user/find');
  users.value = res.data;

  const form = reactive({ specialization: '', experience: 1, method: 'КПТ', sex: 'Мужчина', workFormat: 'Онлайн', photoUrl: '', bio: '' });
  const isFormLoading = ref(false);

  const handleSubmit = async () => {
    if (selectedUser === undefined || form.specialization.trim() === '' || form.experience <= 0 || form.photoUrl?.trim() === '' || form.bio?.trim() === '') {
      return toast.error('Ошибка', { description: 'Необходимо заполнить все поля' })
    }

    isFormLoading.value = true;
    const res = await $fetch(`/api/doctors`, { method: 'POST', body: { ...form, userId: selectedUser.value.id } });
    isFormLoading.value = false;

    if (res.statusCode !== 200) {
      return toast.error('Ошибка', { description: res.message });
    }

    toast.success("Врач создан");
    emit('created')
    return isOpen.value = false;
  }

  const handleUploadImage = async (e) => {
    const supabaseUrl = "https://gcfxuqbcbbbmsgokgpes.supabase.co"
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZnh1cWJjYmJibXNnb2tncGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjIyNjMsImV4cCI6MjA2MjUzODI2M30.Kp4LsXSj-9VO4gjUwfn50sX3cP32GMhvvXaVgpPL6js"

    const supabase = createClient(supabaseUrl, supabaseKey);

    const file = (e.target).files?.[0];
    if (!file) return;

    const fileName = createImageHash(1000, 9999, file.name);
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);
    if (error) return toast.error('Ошибка', { description: 'Не удалось загрузить изображение' });

    form.photoUrl = fileName;

    return toast.success('Изображение загружено');
  }
</script>

<template>
  <Dialog v-model:open="isOpen" class="p-5">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление врача</DialogTitle>
      </DialogHeader>
      <Label>Выберите врача</Label>
      <Select v-model="selectedUser">
        <SelectTrigger class="w-full border-2 border-ui-primary">
          <SelectValue placeholder="Выберите врача" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="doctor" v-for="doctor in users" :key="doctor.id">
              {{ doctor.login }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label for="spec">Квалификация</Label>
      <Input class="border-2 border-ui-primary" v-model="form.specialization" id="spec" type="text"
        placeholder="Введите специализацию врача" />
      <Label for="experience">Опыт работы</Label>
      <Input class="border-2 border-ui-primary" v-model.number="form.experience" :min="0" id="experience" type="number"
        placeholder="Введите опыт работы" />
      <Label>Методика работы</Label>
      <Select v-model="form.method">
        <SelectTrigger class="w-full border-2 border-ui-primary">
          <SelectValue placeholder="Выберите методику работы" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="КПТ">
              КПТ
            </SelectItem>
            <SelectItem value="Гештальт-терапия">
              Гештальт-терапия
            </SelectItem>
            <SelectItem value="Психоаналитическая терапия">
              Психоаналитическая терапия
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label>Пол врача</Label>
      <Select v-model="form.sex">
        <SelectTrigger class="w-full border-2 border-ui-primary">
          <SelectValue placeholder="Выберите пол врача" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Мужчина">
              Мужчина
            </SelectItem>
            <SelectItem value="Женщина">
              Женщина
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label>Формат работы</Label>
      <Select v-model="form.workFormat">
        <SelectTrigger class="w-full border-2 border-ui-primary">
          <SelectValue placeholder="Выберите формат работы" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Онлайн">
              Онлайн
            </SelectItem>
            <SelectItem value="Очно">
              Очно
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label for="image">Изображение</Label>
      <input @change="handleUploadImage"
        class="flex h-10 w-full rounded-md border-2 border-ui-primary px-3 py-2 text-sm" id="image" type="file"
        accept="image/*" />
      <Label for="bio">Описание</Label>
      <textarea v-model="form.bio" placeholder="Описание врача" name="bio" id="bio"
        class="border-2 border-ui-primary rounded-md p-3"></textarea>
      <DialogFooter>
        <Button @click="handleSubmit" :disabled="isFormLoading"
          class="w-full shadow-lg shadow-slate-400 bg-ui-primary cursor-pointer">
          Создать врача</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>