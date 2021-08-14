export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '#お前らのPCデスク周り晒していけ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/common.scss',
    '@/assets/sass/header.scss',
    '@/assets/sass/footer.scss',
    '@/assets/sass/cards.scss',
    '@/assets/sass/error.scss',
  ],

  loading: '~/components/Loading.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-localStorage.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],
  mode: 'universal',
  target: 'static',
  build: {
    babel: {
      babelrc: false,
      compact: false
    }
  }
}
