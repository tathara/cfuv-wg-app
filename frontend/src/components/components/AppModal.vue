<template>
  <transition name="modal-fade">
    <div class="modal-window_back" @click.self="$emit('exit', false)">
      <div
        :class="{
          'modal-window_message': message,
        }"
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal-window"
        role="dialog"
      >
        <div class="modal-window__header">
          <h1 class="modal-window__title">
            <slot name="title"></slot>
          </h1>
          <div
            aria-label="Close modal"
            class="modal-window__button_close"
            @click="$emit('exit', false)"
          >
            <img
              alt=""
              class="modal-window__icon_close"
              src="@/assets/img/cross-icon.svg"
            />
          </div>
        </div>
        <div
          :class="{
            'modal-window_message__body': message,
          }"
          class="modal-window__body"
        >
          <slot></slot>
        </div>
        <div class="modal-window__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{
  message: boolean;
}>();
</script>

<style lang="scss" scoped>
.modal-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 60%;
  min-height: 500px;
  background: white;
  border-radius: 15px;
  overflow: hidden;

  &_back {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 35px;
  }

  &__title {
    padding: 12px 12px 0;
    font: {
      size: 1.2rem;
      weight: 600;
    }
    margin: 0;
  }

  &__button_close {
    padding: 10px 10px 0;
    height: 100%;
    cursor: pointer;
  }

  &__icon_close {
    height: 100%;
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: 12px;
    font-size: 1rem;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  &_message {
    max-width: 600px;
    height: 20%;
    min-height: 150px;

    &__body {
      font-size: 1.1rem;
      padding: 30px 12px;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 60px;
    margin-top: auto;
    padding: 0 12px;
    background: $red-main;
  }
}

/* ------  Анимация модульного окна  ------ */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
