<template>
  <div class="input-code">
    <label
      v-for="label in 6"
      :key="label"
      :class="{
        'input-code__label_focused': isFocused === label,
        'input-code__label_error': isError,
      }"
      :for="'input' + label"
      class="input-code__label"
    >
      <input
        :id="'input' + label"
        ref="inputs"
        :value="codeInput[label - 1]"
        class="input-code__input"
        maxlength="1"
        placeholder="0"
        @blur="isFocused = null"
        @focus="focusInput($event, label)"
        @input="handleInput($event, label)"
        @keydown="clearInput($event, label)"
        @select.prevent
        @paste.prevent="correctPaste"
      >
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'app-input-code',

  props: {
    isError: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const isFocused = ref<number | null>(null);
    const inputs = ref<any[]>([]);
    const codeInput = ref(['', '', '', '', '', '']);
    const codeRaw = computed(() => codeInput.value.join(''));

    function focusInput(event: Event, label: number): void {
      isFocused.value = label;
      if (props.isError) {
        codeInput.value = ['', '', '', '', '', ''];
        emit('error', false);
      }
    }

    function handleInput(event: Event, inputIndex: number): void {
      const input = inputs.value[inputIndex - 1];
      const value = (event.target as HTMLInputElement).value;
      codeInput.value[inputIndex - 1] = value;

      if (!/^\d$/.test(value)) {
        (event.target as HTMLInputElement).value = '';
      }

      if (value && value.length === 1) {
        if (inputIndex < inputs.value.length) {
          inputs.value[inputIndex].focus();
        } else {
          inputs.value[inputIndex - 1].blur();
        }
      }

      if (input.value.length === 1) {
        input.value = value;
      }
    }

    function clearInput(event: KeyboardEvent, inputIndex: number): void {
      const value = inputs.value[inputIndex - 1].value;
      if (event.key === 'Backspace' && inputIndex > 1 && !value) {
        inputs.value[inputIndex - 2].focus();
      }
      if (+event.key >= 0 && +event.key <= 9) {
        (event.target as HTMLInputElement).value = '';
      }
    }

    function correctPaste(event: ClipboardEvent): void {
      for (let i = 0; i < codeInput.value.length; i++) {
        codeInput.value[i] =
          event?.clipboardData?.getData('text/plain')[i] || '';
      }
    }

    watch(codeRaw, value => {
      emit('update:modelValue', value);
    });

    return {
      isFocused,
      inputs,
      codeInput,
      codeRaw,
      focusInput,
      handleInput,
      clearInput,
      correctPaste,
    };
  },
});
</script>
<style lang="scss" scoped>
.input-code {
  display: flex;
  width: 100%;
  gap: 3px;

  &__input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
    text-align: center;
    background: transparent;
    caret-color: transparent;
  }

  &__label {
    @extend %ui-component;
    border: 3px solid $red-main;
    height: auto;
    position: relative;
    min-width: 16%;
    aspect-ratio: 1/1;
    background: var(--light-gray);
    border-radius: 1.05rem;

    &_error {
      background: #fbe5e580;

      .input-group__input {
        color: $red-main;
      }
    }

    &::after {
      content: '';
      width: 0;
      transition: all 0.2s ease;
    }

    &_focused::after {
      content: '';
      display: block;
      height: 2px;
      width: 65%;
      background: $red-main;
      border-radius: 2px;

      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>