<script setup lang="ts">
  import { toast } from 'vue-sonner';

  const answer = ref([0, 0, 0, 0, 0, 0]);
  const type = ref<'answer' | 'quest'>('quest');

  const score = computed(() => {
    return answer.value.reduce((acc, val) => {
      return acc += val;
    }, 0)
  });

  const handleSubmit = () => {
    if (answer.value.findIndex(val => val === 0) !== -1) {
      return toast.error('Ошибка', { description: 'Необходимо ответить на все вопросы!' })
    }

    window.scrollTo(0, 0);

    return type.value = 'answer'
  }

  useHead({ title: 'Тест на эмоциональное выгорание' })
</script>

<template>
  <UISection :radial="type === 'answer'" class="min-h-dvh">
    <UISection first>
      <div v-if="type === 'quest'" class="flex flex-col gap-7 text-ui-primary font-medium">
        <h1 class="text-2xl md:text-3xl">Тест на эмоциональное выгорание</h1>
        <h2 class="text-xl md:text-2xl">Как вы чувствуете себя после рабочего дня?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.1" @click="answer[0] = 1">
            <input type="radio" name="1" id="1.1">
            Почти не устаю, день прошёл продуктивно.
          </label>
          <label class="flex gap-3 text-lg" for="1.2" @click="answer[0] = 2">
            <input type="radio" name="1" id="1.2">
            Усталость накапливается, но терпимо.
          </label>
          <label class="flex gap-3 text-lg" for="1.3" @click="answer[0] = 3">
            <input type="radio" name="1" id="1.3">
            Чувствую полное опустошение, даже если день был не напряжённым.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Насколько вы вовлечены в свою деятельность?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="2.1" @click="answer[1] = 1">
            <input type="radio" name="2" id="2.1">
            Мне действительно интересно то, чем я занимаюсь.
          </label>
          <label class="flex gap-3 text-lg" for="2.2" @click="answer[1] = 2">
            <input type="radio" name="2" id="2.2">
            Иногда теряю интерес, но стараюсь сохранять мотивацию.
          </label>
          <label class="flex gap-3 text-lg" for="2.3" @click="answer[1] = 3">
            <input type="radio" name="2" id="2.3">
            Часто думаю, что всё это не имеет смысла.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как вы реагируете на просьбы других людей о помощи или общении?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="3.1" @click="answer[2] = 1">
            <input type="radio" name="3" id="3.1">
            С радостью помогаю, если могу.
          </label>
          <label class="flex gap-3 text-lg" for="3.2" @click="answer[2] = 2">
            <input type="radio" name="3" id="3.2">
            Иногда раздражаюсь, но всё равно стараюсь быть на связи.
          </label>
          <label class="flex gap-3 text-lg" for="3.3" @click="answer[2] = 3">
            <input type="radio" name="3" id="3.3">
            Устал(а) от людей, хочу, чтобы меня никто не трогал.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как часто вы ощущаете, что работаете "на автомате"?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="4.1" @click="answer[3] = 1">
            <input type="radio" name="4" id="4.1">
            Очень редко, стараюсь быть в моменте.
          </label>
          <label class="flex gap-3 text-lg" for="4.2" @click="answer[3] = 2">
            <input type="radio" name="4" id="4.2">
            Иногда ловлю себя на этом, особенно под конец недели.
          </label>
          <label class="flex gap-3 text-lg" for="4.3" @click="answer[3] = 3">
            <input type="radio" name="4" id="4.3">
            Почти всегда — всё как будто в тумане.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Что вы думаете о своих результатах и успехах?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="5.1" @click="answer[4] = 1">
            <input type="radio" name="5" id="5.1">
            Горжусь собой, даже если есть неудачи.
          </label>
          <label class="flex gap-3 text-lg" for="5.2" @click="answer[4] = 2">
            <input type="radio" name="5" id="5.2">
            Иногда сомневаюсь, достаточно ли я хорош(а).
          </label>
          <label class="flex gap-3 text-lg" for="5.3" @click="answer[4] = 3">
            <input type="radio" name="5" id="5.3">
            Чувствую, что ничего не добился(лась), и это обесценивает мои старания.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как часто вы чувствуете, что не справляетесь с нагрузкой?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="6.1" @click="answer[5] = 1">
            <input type="radio" name="6" id="6.1">
            Почти не бывает, я умею организовывать себя.
          </label>
          <label class="flex gap-3 text-lg" for="6.2" @click="answer[5] = 2">
            <input type="radio" name="6" id="6.2">
            Периодически чувствую перегруз, особенно при дедлайнах.
          </label>
          <label class="flex gap-3 text-lg" for="6.3" @click="answer[5] = 3">
            <input type="radio" name="6" id="6.3">
            Очень часто, даже простые дела кажутся тяжёлыми.
          </label>
        </div>
        <Button @click="handleSubmit" class="bg-ui-accent cursor-pointer w-fit px-12 py-6">Отправить</Button>
      </div>
      <div v-else>
        <h2 class="text-2xl md:text-3xl text-ui-primary font-medium mb-3">Ваш результат</h2>
        <div class="flex flex-col gap-4 text-xl text-ui-primary font-medium">
          <template v-if="score <= 6">
            <p>
              Вы находитесь в хорошем эмоциональном состоянии.
            </p>
            <p>
              У вас есть энергия, интерес к деятельности и здоровое отношение к нагрузке. Усталость бывает, но вы умеете
              восстанавливаться и сохранять
              внутренний ресурс.
            </p>
            <p>
              Рекомендации: Продолжайте заботиться о себе, находите время для отдыха, чередуйте нагрузку и расслабление.
              Это инвестиция в долгосрочное благополучие.
            </p>
          </template>
          <template v-else-if="score <= 12">
            <p>
              Вы находитесь в зоне риска эмоционального выгорания.
            </p>
            <p>
              Могут проявляться первые признаки: усталость, отстранённость, снижение мотивации, раздражение. Пока вы ещё
              справляетесь, но важно не игнорировать сигналы организма и психики.
            </p>
            <p>
              Рекомендации: Проверьте, что истощает вас больше всего — физическая перегрузка, эмоциональные ожидания,
              внутренний перфекционизм. Постарайтесь включать в свою неделю больше приятного, делегировать, сказать
              «нет»
              там, где нужно. Поддержка психолога поможет предотвратить усугубление.
            </p>
          </template>
          <template v-else>
            <p>
              Вы испытываете серьёзное эмоциональное истощение.
            </p>
            <p>
              Возможно, вы чувствуете пустоту, потерю смысла, нежелание общаться и работать. Обычные вещи вызывают
              раздражение, а даже отдых не приносит облегчения. Это признаки выгорания, и это не «лень» или «слабость».
            </p>
            <p>
              Рекомендации: Вам необходима перезагрузка — физическая и психологическая. Постарайтесь снизить нагрузку,
              восстановить режим сна, и обязательно обратитесь за поддержкой: специалист поможет восстановить
              ресурсность,
              снизить давление и вернуть вам вкус к жизни.
            </p>
          </template>
        </div>
      </div>
    </UISection>
  </UISection>
</template>