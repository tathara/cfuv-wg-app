<template>
  <label :for="id" class="input-group">
    <img
      v-if="filename"
      :src="require(`@/assets/img/${filename}`)"
      alt=""
      class="input-group__icon"
    />
    <input
      :id="id"
      :readonly="readonly"
      :value="modelValue"
      class="input-group__input"
      tabindex="-1"
      type="text"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  modelValue: string;
  filename: string;
  readonly: boolean;
}>();
const emit = defineEmits<{
  'update:modelValue': [modelValue: string];
}>();
</script>

<style lang="scss" scoped>
.input-group {
  @extend %ui-component;
  border: 3px solid $red-main;

  &__icon {
    height: 100%;
  }

  &__input {
    border: none;
    outline: none;
    width: 100%;
    cursor: pointer;
    pointer-events: none;
  }
}
</style>
