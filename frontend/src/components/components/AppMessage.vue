<template>
  <div class="message">
    <img :src="iconSrc" alt="" class="message__icon" />
    <span
      class="message__text"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app-message',
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import iconError from '@/assets/img/error-icon.svg';
import iconCorrect from '@/assets/img/check-icon.svg';

const props = defineProps<{
  type: string;
}>();

const iconSrc = computed(() =>
  props.type === 'error' ? iconError : iconCorrect,
);
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding-left: 15px;
  gap: 5px;

  font: {
    size: 1rem;
    weight: 600;
  }

  &__text {
    padding-top: 2px;
    color: $red-main;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
