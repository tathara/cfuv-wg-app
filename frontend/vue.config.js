// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line no-undef
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/styles.module.scss";`,
      },
    },
  },
  pwa: {
    name: 'WireGuard VPN Keys',
    themeColor: '#AE373A',
    msTileColor: '#FFFFFF',
    iconPaths: {
      faviconSVG: 'img/icons/wireguard-icon-logo.svg',
      favicon32: 'img/icons/wireguard-icon-logo32.png',
      favicon16: 'img/icons/wireguard-icon-logo16.png',
      appleTouchIcon: 'img/icons/wireguard-icon-logo.png',
      maskIcon: 'img/icons/wireguard-icon-logo.svg',
      msTileImage: 'img/icons/wireguard-icon-logo144.png',
    },
  },
});
