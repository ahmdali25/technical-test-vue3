<script setup>
import { reactive } from "vue";
import router from "@/router";

const steps = reactive([
  {
    step: "1",
    label: "Delivery",
    path: "/delivery",
  },
  {
    step: "2",
    label: "Payment",
    path: "/payment",
  },
  {
    step: "3",
    label: "Finish",
    path: "/finish",
  },
]);

function handleClickStep(props) {
  router.push(props.path);
}
</script>

<template>
  <div class="row justify-center">
    <ul class="step-wizard">
      <li v-for="(step, index) in steps" :key="index" class="step-wizard-list">
        <div
          class="step-wizard-item"
          :class="
            step.path === $route.path ? 'active-link exact-active-link' : ''
          "
          @click="handleClickStep(step)"
        >
          <span class="step-circle">{{ step.step }}</span>
          <span class="step-label">{{ step.label }}</span>
        </div>
        <img
          v-if="steps.length !== index + 1"
          class="icon-right"
          src="../assets/chevron-right.png"
          alt="Icon"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
.row
  display flex
  flex-direction row
  gap 30px

.justify-center
  justify-content: center

.step-wizard
  background-color: #FFFAE6
  border-radius: 60px
  margin-top: 20px
  margin-bottom: -100px
  padding: 15px 30px
  list-style: none
  display: flex
  flex-direction: row
  align-items: center
  gap 20px

  .step-wizard-list
    display flex
    flex-direction: row
    align-items: center

    .step-wizard-item
      display flex
      flex-direction: row
      align-items: center

    .step-circle
      height 40px
      width 40px
      display flex
      align-items center
      justify-content center
      border-radius 50%
      font-weight 600
      margin 0 auto
      margin-right: 10px
      position relative
      background-color #FFE4B8
      color #FF8A00
      cursor pointer

    .step-label
      color #FF8A00
      font-weight 500
      margin-right: 20px

    .active-link
      .step-circle
        background-color #FF8A00
        color #FFFFFF

      .step-label
        font-weight: 600
</style>
