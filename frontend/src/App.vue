<template>
  <div class="app">
    <header class="header">
      <div class="header__inner">
        <p class="header__title">WireGuard VPN Keys</p>
        <img
          alt="WireGuard Logo"
          class="header__logo"
          src="@/assets/img/wireguard-icon-logo.svg"
        />
      </div>
    </header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss">
@import '@/assets/css/styles.module';

@include scrollbars(0.7rem, $red-main);

.header {
  padding: 0 30px;
  width: 100%;
  height: 100px;
  background: $red-main;
  box-shadow: rgba(0, 0, 0, 0.15) 0 4px 4px;
  font: {
    size: 1.5rem;
    weight: 600;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  &__title {
    color: white;
  }

  &__logo {
    width: 75px;
    height: 75px;
  }
}
</style>
