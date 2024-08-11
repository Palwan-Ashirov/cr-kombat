import { resolve } from 'path'

const extendedRoutes = [
  {
    name: 'home',
    path: '/',
    file: '~/src/pages/TheHome/TheHome.vue',
  },
  {
    name: 'waitlist',
    path: '/waitlist',
    file: '~/src/pages/TheQueue/TheQueue.vue',
  },
  {
    name: 'friends',
    path: '/friends',
    file: '~/src/pages/TheFriends/TheFriends.vue',
  },
]

const alias = {
  '@': resolve(__dirname, './src'),
  '@app': resolve(__dirname, './src/app'),
  '@adapters': resolve(__dirname, './src/app/adapters'),
  '@api': resolve(__dirname, './src/app/api'),
  '@composables': resolve(__dirname, './src/app/composables'),
  '@helpers': resolve(__dirname, './src/app/helpers'),
  '@stores': resolve(__dirname, './src/app/stores'),
  '@styles': resolve(__dirname, './src/app/assets/styles'),
  '@app-types': resolve(__dirname, './src/app/types'),
  '@services': resolve(__dirname, './src/app/api/services'),
  '@controllers': resolve(__dirname, './src/app/api/controllers'),
  '@dto': resolve(__dirname, './src/app/api/dto'),
  '@components': resolve(__dirname, './src/components'),
  '@pages': resolve(__dirname, './src/pages'),
  '@layouts': resolve(__dirname, './src/layouts'),
  '@app-assets': resolve(__dirname, './src/app/assets'),
}

const getPostRoutes = () => {
  return extendedRoutes.map(route => route.path)
}

const app = {
  head: {
    title: 'CR Kombat',
    titleTemplate: '%s',
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, height=device-height, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover, maximum-scale=1',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    script: [{ type: 'text/javascript', src: 'https://telegram.org/js/telegram-web-app.js' }],
  },
}

export default defineNuxtConfig({
  ssr: false,

  app: app,

  alias: alias,
  experimental: {
    defaults: {
      nuxtLink: {
        activeClass: 'active',
      },
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      VERCEL_TOKEN: process.env.NUXT_PUBLIC_VERCEL_TOKEN,
    },
  },

  hooks: {
    // async 'nitro:config'(nitroConfig) {
    //   const routes = await getPostRoutes()
    //   nitroConfig?.prerender?.routes?.push(...routes)
    // },
    'pages:extend'(routes) {
      routes.push(...extendedRoutes)
    },
  },

  dir: {
    // pages: 'src/pages',
    layouts: './src/layouts',
    plugins: './src/app/plugins',
    middleware: './src/app/middleware',
  },

  modules: ['@pinia/nuxt', 'nuxt-svgo', 'dayjs-nuxt'],
  svgo: { autoImportPath: '/public/icons/**/*' },
  // vite: {
  //   esbuild: {
  //     tsconfigRaw: {
  //       compilerOptions: {
  //         experimentalDecorators: true,
  //       },
  //     },
  //   },
  // },

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
  devtools: { enabled: true },

  compatibilityDate: '2024-07-09',
})
