export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // 애플리케이션에 대한 모든 기본 메타 태그를 정의할 수 있다.
    title: 'nuxt-tuto',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      // 아이폰 사파리 -> 숫자를 전화번호로 자동 인식 -> 자동링크 해제
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // 루트 Vue.js 애플리케이션을 인스턴스화 하기 전에 실행해야 하는 JavaScript 플러그인을 정의 가능.
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/customPlugin.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios'],
  },
  env: {
    SERVER_URL: `https://my-json-server.typicode.com/geunheejung/nuxt-hello-api`,
  },
  //  server setup
  server: {
    port: process.env.NODE_ENV === 'production' ? null : 8080,
  },
}
