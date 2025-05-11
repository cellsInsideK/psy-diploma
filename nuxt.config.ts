import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
    }
  },

  css: ['./assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
})