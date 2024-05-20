<template>
  <button class="button">
    <span class="button__icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.button {
  @extend %ui-component;
  justify-content: center;
  border: none;
  background: $red-main;
  color: white;
  font: {
    size: 1.1rem;
    weight: 600;
  }
}
</style>
