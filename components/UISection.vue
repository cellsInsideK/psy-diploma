<script setup lang="ts">
  interface Props {
    radial?: boolean,
    linear?: boolean,
    first?: boolean,
  }

  const props = defineProps<Props>();

  const styles = computed(() => {
    let base = ['container', 'mx-auto', 'px-2', 'py-4'];

    if (props.radial) {
      base = [];
      base.push('bg-radial from-[rgb(254,251,225)] to-[rgb(208,218,239)]')
    }

    if (props.linear) {
      base = [];
      base.push('bg-linear-[90deg,rgb(208,218,239)_50%,rgb(254,251,225)]')
    }

    if (props.first) {
      base.push('mt-26')
    }

    return base.join(' ');
  })
</script>

<template>
  <section :class="styles">
    <slot />
  </section>
</template>