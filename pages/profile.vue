<script setup lang="ts">

  useHead({ title: 'Личный кабинет' });
  definePageMeta({ middleware: 'auth' });
</script>

<template>
  <UISection first>
    profile page
  </UISection>
</template>