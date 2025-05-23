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

  useHead({ title: 'Тест на уровень стресса' })
</script>

<template>
  <UISection :radial="type === 'answer'" class="min-h-dvh">
    <UISection first>
      <div v-if="type === 'quest'" class="flex flex-col gap-7 text-ui-primary font-medium">
        <h1 class="text-2xl md:text-3xl">Тест на уровень стресса</h1>
        <h2 class="text-xl md:text-2xl">Если бы вам предложили неделю отдыха, как бы вы ее провели?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="1.1" @click="answer[0] = 3">
            <input type="radio" name="1" id="1.1">
            Лежать, есть, спать, выключить телефон. Подальше от всех, возможно даже близких.
          </label>
          <label class="flex gap-3 text-lg" for="1.2" @click="answer[0] = 1">
            <input type="radio" name="1" id="1.2">
            Потрачу на курс по развитию новых компетенций, навыков, проведу время с объективной пользой.
          </label>
          <label class="flex gap-3 text-lg" for="1.3" @click="answer[0] = 2">
            <input type="radio" name="1" id="1.3">
            Тревожно. Возможно, я вообще не умею полностью расслабляться и отключаться от мира.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Вы обнаружили, что у одного из старых знакомых дела резко пошли в гору без
          видимых причин. Какие мысли?
        </h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="2.1" @click="answer[1] = 3">
            <input type="radio" name="2" id="2.1">
            Все остальные словно движутся вперед, а я стою на месте, у меня ничего не происходит…
          </label>
          <label class="flex gap-3 text-lg" for="2.2" @click="answer[1] = 2">
            <input type="radio" name="2" id="2.2">
            Почему я до сих пор не достиг(ла) такого же успеха? Кажется, я плохо стараюсь.
          </label>
          <label class="flex gap-3 text-lg" for="2.3" @click="answer[1] = 1">
            <input type="radio" name="2" id="2.3">
            Радуюсь за него, наверняка это благодаря хорошей поддержке или нужным связям.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Насколько вам легко переключаться между задачами и ролями?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="3.1" @click="answer[2] = 1">
            <input type="radio" name="3" id="3.1">
            Я не включаюсь эмоционально в эти роли и задачи, поэтому все более или менее удается.
          </label>
          <label class="flex gap-3 text-lg" for="3.2" @click="answer[2] = 3">
            <input type="radio" name="3" id="3.2">
            Я как жонглер, дрессировщик и акробат в одном лице: ничего не успеваю, постоянно что-то вылетает из головы.
          </label>
          <label class="flex gap-3 text-lg" for="3.3" @click="answer[2] = 2">
            <input type="radio" name="3" id="3.3">
            Не могу сказать, что я как-то «переключаюсь», все происходит само собой: одновременно или очень хаотично.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как часто вы замечаете, что ваше тело напряжено?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="4.1" @click="answer[3] = 1">
            <input type="radio" name="4" id="4.1">
            Более или менее всю жизнь чувствую какое-то неясное напряжение, но хожу на массаж, занимаюсь йогой.
          </label>
          <label class="flex gap-3 text-lg" for="4.2" @click="answer[3] = 3">
            <input type="radio" name="4" id="4.2">
            Замечаю, если болит, но в основном это не в фокусе, очень много дел.
          </label>
          <label class="flex gap-3 text-lg" for="4.3" @click="answer[3] = 2">
            <input type="radio" name="4" id="4.3">
            Периодами: то все болит, напряжено, то наоборот. От чего это зависит — не понятно.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Что мешает вам расслабиться и заснуть в конце дня?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="5.1" @click="answer[4] = 3">
            <input type="radio" name="5" id="5.1">
            Когда я слышу посторонний шум или кто-то меня отвлекает, мне сложно расслабиться и уснуть.
          </label>
          <label class="flex gap-3 text-lg" for="5.2" @click="answer[4] = 1">
            <input type="radio" name="5" id="5.2">
            Тревожат мысли о будущем и ощущение неопределенности.
          </label>
          <label class="flex gap-3 text-lg" for="5.3" @click="answer[4] = 2">
            <input type="radio" name="5" id="5.3">
            Мысли о возможных ошибках мешают мне отключиться.
          </label>
        </div>
        <h2 class="text-xl md:text-2xl">Как вы воспринимаете ожидания и требования?</h2>
        <div class="flex flex-col gap-4">
          <label class="flex gap-3 text-lg" for="6.1" @click="answer[5] = 3">
            <input type="radio" name="6" id="6.1">
            Чувствую давление и необходимость оправдать чужие ожидания, даже если это тяжело.
          </label>
          <label class="flex gap-3 text-lg" for="6.2" @click="answer[5] = 1">
            <input type="radio" name="6" id="6.2">
            Воспринимаю их как стимул, стараюсь соответствовать, если это помогает мне расти.
          </label>
          <label class="flex gap-3 text-lg" for="6.3" @click="answer[5] = 2">
            <input type="radio" name="6" id="6.3">
            Не всегда обращаю внимание, но иногда эти ожидания вызывают у меня чувство напряжения и беспокойства.
          </label>
        </div>
        <Button @click="handleSubmit" class="bg-ui-accent cursor-pointer w-fit px-12 py-6">Отправить</Button>
      </div>
      <div v-else>
        <h2 class="text-2xl md:text-3xl text-ui-primary font-medium mb-3">Ваш результат</h2>
        <div class="flex flex-col gap-4 text-xl text-ui-primary font-medium">
          <template v-if="score <= 6">
            <p>
              Похоже, вы умеете справляться с жизненными трудностями и сохранять внутреннее равновесие. Стресс
              присутствует в вашей жизни, как и у всех, но вы находите способы с ним справляться — будь то через отдых,
              поддержку близких или внутреннюю устойчивость.
            </p>
            <p>
              Вы осознаёте свои границы, умеете вовремя притормозить и позаботиться о себе. Это важный навык, который
              стоит развивать дальше. Даже в периоды сильной нагрузки вы, скорее всего, находите опору в себе и не
              теряете контакт с настоящим моментом.
            </p>
            <p>
              Рекомендации: продолжайте бережно относиться к себе, следите за балансом между работой и отдыхом,
              укрепляйте ресурсные привычки — они ваш лучший щит от будущих стрессов.
            </p>
          </template>
          <template v-else-if="score <= 12">
            <p>
              Вы справляетесь с повседневными задачами, но, похоже, находитесь в состоянии постоянной внутренней
              мобилизации. Возможно, вы часто ощущаете напряжение, но уже почти не замечаете его, потому что оно стало
              привычным фоном.
            </p>
            <p>
              Такое состояние может привести к эмоциональному выгоранию, если не обратить на него внимания. Ваши
              ресурсы не безграничны, и сейчас особенно важно научиться не только «тянуть» повседневность, но и
              позволять себе отдыхать, восстанавливаться, перезагружаться.
            </p>
            <p>
              Рекомендации: прислушивайтесь к своему телу, отмечайте моменты, когда вы чувствуете переутомление.
              Подумайте о том, что помогает вам восстанавливаться — и сделайте это регулярной частью своей жизни.
              Возможно, вам будет полезна поддержка специалиста, чтобы научиться распознавать свои тревожные шаблоны и
              работать с ними.
            </p>
          </template>
          <template v-else>
            <p>
              Ваша жизнь наполнена постоянным стрессом, и он уже стал для вас чем-то привычным. Возможно, вы давно не
              ощущали стабильности и уверенности в завтрашнем дне — все вокруг кажется зыбким и непредсказуемым, а то,
              что вас поддерживает, может исчезнуть в любой момент.
            </p>
            <p>
              Это может быть очень пугающим сценарием. Но… это всего лишь мысли. Правда в том, что основная опора
              всегда находится внутри нас самих. Самая большая трудность — найти ее и «узнать в лицо». Если опора
              внутри, ее не отнимет никто и ничто, даже в самых сложных обстоятельствах. Опорой могут быть знания о
              себе, ощущение собственной целостности, ценности, чувство свободы, независимости и уникальности,
              профессиональные навыки и достижения. Видите, сколько опор? И это только верхушка.
            </p>
            <p>
              Рекомендации: искать опору внутри себя всеми возможными способами, в частности — с помощью
              психотерапии. Работа с психологом помогает структурировать образ настоящего и будущего, расчистить путь от
              тревоги и неопределенности и понять, на что всегда можно опереться внутри себя.
            </p>
          </template>
        </div>
      </div>
    </UISection>
  </UISection>
</template>