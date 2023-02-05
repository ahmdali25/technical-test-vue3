<script setup>
import StepWizard from "./components/BaseStepWizard.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <StepWizard />
    <RouterView />
  </div>
</template>

<style scoped></style>
