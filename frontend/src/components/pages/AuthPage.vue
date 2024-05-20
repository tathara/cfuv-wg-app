<template>
  <div class="wrapper auth-page">
    <h1 class="auth-page__title">Авторизация через Telegram</h1>
    <p class="auth-page__description">Введите имя пользователя:</p>
    <app-input
      id="input"
      v-model="username"
      :readonly="false"
      filename="user-icon.svg"
    >
    </app-input>
    <app-message v-show="isError" type="error">
      Пользователь не зарегистрирован!
    </app-message>
    <app-button class="auth-page__button_auth" @click="checkUser">
      Авторизоваться
    </app-button>
    <p class="auth-page__note">
      Примечание: Напишите
      <a href="https://t.me/CFUV_VPN_Bot">Telegram-боту</a>, чтобы
      зарегистрироваться.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import router from '@/router';
import AppInput from '@/components/components/AppInput.vue';
import AppButton from '@/components/components/AppButton.vue';
import AppMessage from '@/components/components/AppMessage.vue';
import { KeyService } from '@/api/KeyService';

const username = ref('');
const isError = ref(false);

async function checkUser() {
  const isUser = await KeyService.getUser(username.value);
  if (isUser) {
    await router.push({
      name: 'Code',
      params: { user: username.value },
    });
    return;
  }
  isError.value = true;
}

watch(username, () => {
  if (isError.value) {
    isError.value = false;
  }
});
</script>

<style lang="scss" scoped>
.auth-page {
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

  &__button_auth {
    margin-top: 10px;
  }

  &__button {
    max-width: 80px;
  }

  &__link {
    height: 100%;
    width: 100%;
  }

  &__icon {
    height: 100%;
  }

  &__note {
    color: lightcoral;
  }
}
</style>
