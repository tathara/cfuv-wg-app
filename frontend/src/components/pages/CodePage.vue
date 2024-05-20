<template>
  <div class="wrapper code-page">
    <h1 class="code-page__title">Введите код из Telegram</h1>
    <app-input-code
      v-model="code"
      :is-error="isError"
      class="code-page__input"
      @error="updateError"
    >
    </app-input-code>
    <app-message v-show="isError" type="error">
      Неверный или устаревший код!
    </app-message>
    <app-button class="code-page__button_auth" @click="checkCode">
      Авторизоваться
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import AppButton from '@/components/components/AppButton.vue';
import AppInputCode from '@/components/components/AppInputCode.vue';
import { KeyService } from '@/api/KeyService';
import AppMessage from '@/components/components/AppMessage.vue';

export default defineComponent({
  components: { AppMessage, AppInputCode, AppButton },

  setup() {
    const code = ref('');
    const codeUser = ref('');
    const isError = ref(false);
    const route = useRoute();

    onMounted(sendCode);

    function updateError(value: boolean): void {
      isError.value = value;
    }

    async function sendCode() {
      codeUser.value = await KeyService.getCode(route.params.user as string);
    }

    function checkCode() {
      if (codeUser.value === code.value) {
        router.push({
          name: 'UserKeys',
          params: { user: route.params.user },
        });
        return;
      }
      isError.value = true;
    }

    watch(code, () => {
      if (isError.value) {
        isError.value = false;
      }
    });

    return {
      code,
      route,
      isError,
      updateError,
      checkCode,
    };
  },
});
</script>

<style lang="scss" scoped>
.code-page {
  max-width: 600px;
  justify-content: center;
  padding-bottom: 100px;

  &__title {
    align-self: center;
    font-size: 1.3rem;
  }

  &__title,
  &__description {
    margin: 0;
  }

  &__input {
    align-self: center;
    max-width: 400px;
  }

  &__button_auth {
    margin-top: 10px;
  }
}
</style>