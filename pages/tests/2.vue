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

  useHead({ title: 'Тест на уровень тревожности' })
</script>

<template>
  <UISection :radial="type === 'answer'" class="min-h-dvh">
    <UISection first>
      <div v-if="type === 'quest'" class="flex flex-col gap-7 text-ui-primary font-medium">
        <h1 class="text-2xl md:text-3xl">Тест на уровень тревожности</h1>
        <h2 class="text-xl md:text-2xl">Как часто вы прокручиваете в голове негативные сценарии будущего?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.1" @click="answer[0] = 1">
            <input type="radio" name="1" id="1.1">
            Почти не думаю о будущем, живу «здесь и сейчас».
          </label>
          <label class="flex gap-3 text-lg" for="1.2" @click="answer[0] = 2">
            <input type="radio" name="1" id="1.2">
            Иногда появляется тревога, но я быстро возвращаюсь в реальность.
          </label>
          <label class="flex gap-3 text-lg" for="1.3" @click="answer[0] = 3">
            <input type="radio" name="1" id="1.3">
            Постоянно — обдумываю, что может пойти не так, даже по мелочам.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как вы реагируете на неопределённость или отсутствие чёткого плана?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="2.1" @click="answer[1] = 1">
            <input type="radio" name="2" id="2.1">
            Спокойно, стараюсь адаптироваться по ситуации.
          </label>
          <label class="flex gap-3 text-lg" for="2.2" @click="answer[1] = 2">
            <input type="radio" name="2" id="2.2">
            Становлюсь немного раздражительным(ой), пока не пойму, что делать.
          </label>
          <label class="flex gap-3 text-lg" for="2.3" @click="answer[1] = 3">
            <input type="radio" name="2" id="2.3">
            Это вызывает у меня напряжение, панику или ступор.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Что вы чувствуете, если кто-то долго не отвечает на сообщение?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="3.1" @click="answer[2] = 1">
            <input type="radio" name="3" id="3.1">
            Ничего особенного, понимаю, что у всех бывают дела.
          </label>
          <label class="flex gap-3 text-lg" for="3.2" @click="answer[2] = 2">
            <input type="radio" name="3" id="3.2">
            Начинаю немного переживать, проверяю, не прочитано ли.
          </label>
          <label class="flex gap-3 text-lg" for="3.3" @click="answer[2] = 3">
            <input type="radio" name="3" id="3.3">
            В голове появляются мысли, что я сделал(а) что-то не так.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как часто у вас возникают сомнения в правильности своих решений?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="4.1" @click="answer[3] = 1">
            <input type="radio" name="4" id="4.1">
            Очень редко, если что — принимаю последствия.
          </label>
          <label class="flex gap-3 text-lg" for="4.2" @click="answer[3] = 2">
            <input type="radio" name="4" id="4.2">
            Часто думаю: «А вдруг я ошибся(лась)?» — и возвращаюсь к этим мыслям.
          </label>
          <label class="flex gap-3 text-lg" for="4.3" @click="answer[3] = 3">
            <input type="radio" name="4" id="4.3">
            Почти всегда — каждое решение вызывает тревогу.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Бывает ли у вас ощущение тревоги «без причины»?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="5.1" @click="answer[4] = 1">
            <input type="radio" name="5" id="5.1">
            Нет, всегда могу понять, почему я волнуюсь.
          </label>
          <label class="flex gap-3 text-lg" for="5.2" @click="answer[4] = 2">
            <input type="radio" name="5" id="5.2">
            Иногда чувствую беспокойство, хотя не знаю точно почему.
          </label>
          <label class="flex gap-3 text-lg" for="5.3" @click="answer[4] = 3">
            <input type="radio" name="5" id="5.3">
            Да, регулярно — вроде всё нормально, но внутри будто что-то не так.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как вы воспринимаете своё тело в моменты тревоги?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="6.1" @click="answer[5] = 1">
            <input type="radio" name="6" id="6.1">
            Почти не ощущаю телесных проявлений.
          </label>
          <label class="flex gap-3 text-lg" for="6.2" @click="answer[5] = 2">
            <input type="radio" name="6" id="6.2">
            Замечаю учащённое сердцебиение или напряжение.
          </label>
          <label class="flex gap-3 text-lg" for="6.3" @click="answer[5] = 3">
            <input type="radio" name="6" id="6.3">
            Часто возникают одышка, ком в горле, потливость или дрожь.
          </label>
        </div>
        <Button @click="handleSubmit" class="bg-ui-accent cursor-pointer w-fit px-12 py-6">Отправить</Button>
      </div>
      <div v-else>
        <h2 class="text-2xl md:text-3xl text-ui-primary font-medium mb-3">Ваш результат</h2>
        <div class="flex flex-col gap-4 text-xl text-ui-primary font-medium">
          <template v-if="score <= 6">
            <p>
              Вы демонстрируете хороший уровень эмоционального равновесия. Тревожные мысли не захватывают вас, а
              возникающие волнения — краткосрочны и поддаются контролю. Вы умеете жить в настоящем, справляться с
              неопределённостью и доверяете себе. Это отличный ресурс, который стоит сохранять и развивать.
            </p>
            <p>
              Рекомендации: Продолжайте наблюдать за собой, поддерживайте баланс между активностью и отдыхом. Техники
              осознанности, телесные практики и общение с поддерживающими людьми помогут сохранить этот уровень
              спокойствия.
            </p>
          </template>
          <template v-else-if="score <= 12">
            <p>
              Вы часто сталкиваетесь с беспокойством и внутренним напряжением. Оно может проявляться как сомнения,
              постоянный анализ ситуаций, стремление всё контролировать или сложности с расслаблением. Это ещё не
              критично, но сигнал, что психика нуждается в передышке.
            </p>
            <p>
              Рекомендации: Обратите внимание на источники тревоги: это внешние обстоятельства или внутренние установки?
              Попробуйте техники дыхания, ограничение новостного фона, медитации. Также может быть полезна консультация
              психолога для выработки более устойчивых стратегий реагирования.
            </p>
          </template>
          <template v-else>
            <p>
              Ваш уровень тревожности довольно высок и может серьёзно мешать качеству жизни.
            </p>
            <p>
              Возможно, вы живёте в режиме постоянного внутреннего напряжения, прокручиваете тревожные сценарии, с
              трудом расслабляетесь. Это утомляет и эмоционально, и физически.
            </p>
            <p>
              Рекомендации: Тревожность — не ваш «характер», а состояние, с которым можно и нужно работать. Психотерапия
              (особенно когнитивно-поведенческая) помогает выявить и проработать глубинные страхи, научиться
              регулировать эмоции, выстроить границы и вернуть контроль над состоянием.
            </p>
          </template>
        </div>
      </div>
    </UISection>
  </UISection>
</template>